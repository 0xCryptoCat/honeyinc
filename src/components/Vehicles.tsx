import { forwardRef, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface VehicleType {
  id: string;
  name: string;
  purpose: 'delivery' | 'transport' | 'maintenance' | 'collection';
  speed: number;
  capacity: number;
  size: [number, number, number];
  color: string;
  maxLevel: number;
}

export const VEHICLE_TYPES: Record<string, VehicleType> = {
  honey_truck: {
    id: 'honey_truck',
    name: 'Honey Delivery Truck',
    purpose: 'delivery',
    speed: 2,
    capacity: 100,
    size: [2, 1, 4],
    color: '#fbbf24',
    maxLevel: 5
  },
  cargo_drone: {
    id: 'cargo_drone',
    name: 'Cargo Drone',
    purpose: 'transport',
    speed: 4,
    capacity: 50,
    size: [1.5, 0.5, 1.5],
    color: '#06b6d4',
    maxLevel: 3
  },
  maintenance_bot: {
    id: 'maintenance_bot',
    name: 'Maintenance Robot',
    purpose: 'maintenance',
    speed: 1,
    capacity: 20,
    size: [1, 1, 1],
    color: '#8b5cf6',
    maxLevel: 4
  },
  honey_collector: {
    id: 'honey_collector',
    name: 'Honey Collector',
    purpose: 'collection',
    speed: 1.5,
    capacity: 75,
    size: [1.5, 1.2, 2],
    color: '#f59e0b',
    maxLevel: 6
  }
};

interface VehicleProps {
  vehicleType: VehicleType;
  level: number;
  position: [number, number, number];
  targetPosition?: [number, number, number];
  isMoving?: boolean;
  onReachTarget?: () => void;
}

export const Vehicle = forwardRef<THREE.Group, VehicleProps>(
  ({ vehicleType, level, position, targetPosition, isMoving = false, onReachTarget }, _ref) => {
    const groupRef = useRef<THREE.Group>(null);
    const currentPos = useRef(new THREE.Vector3(...position));
    const targetPos = useRef(targetPosition ? new THREE.Vector3(...targetPosition) : null);

    useFrame((_state, delta) => {
      if (isMoving && targetPos.current && groupRef.current) {
        const direction = targetPos.current.clone().sub(currentPos.current);
        const distance = direction.length();
        
        if (distance > 0.1) {
          direction.normalize();
          const moveSpeed = vehicleType.speed * delta;
          currentPos.current.add(direction.multiplyScalar(moveSpeed));
          groupRef.current.position.copy(currentPos.current);
          
          // Rotate to face movement direction
          groupRef.current.lookAt(targetPos.current);
        } else if (onReachTarget) {
          onReachTarget();
        }
      }
    });

    const sizeMultiplier = 1 + (level - 1) * 0.15;
    const size: [number, number, number] = [
      vehicleType.size[0] * sizeMultiplier,
      vehicleType.size[1] * sizeMultiplier,
      vehicleType.size[2] * sizeMultiplier
    ];

    const getVehicleShape = () => {
      switch (vehicleType.purpose) {
        case 'delivery':
          return (
            <group>
              {/* Truck body */}
              <mesh position={[0, 0, 0]} castShadow receiveShadow>
                <boxGeometry args={[size[0], size[1], size[2] * 0.6]} />
                <meshLambertMaterial color={vehicleType.color} />
              </mesh>
              {/* Truck cab */}
              <mesh position={[0, size[1] * 0.3, size[2] * 0.3]} castShadow receiveShadow>
                <boxGeometry args={[size[0] * 0.8, size[1] * 0.6, size[2] * 0.4]} />
                <meshLambertMaterial color={new THREE.Color(vehicleType.color).multiplyScalar(0.9)} />
              </mesh>
              {/* Wheels */}
              {[-size[0] * 0.4, size[0] * 0.4].map((x, i) =>
                [-size[2] * 0.25, size[2] * 0.25].map((z, j) => (
                  <mesh key={`${i}-${j}`} position={[x, -size[1] * 0.4, z]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                    <cylinderGeometry args={[size[1] * 0.3, size[1] * 0.3, 0.2]} />
                    <meshLambertMaterial color="#374151" />
                  </mesh>
                ))
              )}
            </group>
          );

        case 'transport':
          return (
            <group>
              {/* Drone body */}
              <mesh position={[0, 0, 0]} castShadow receiveShadow>
                <sphereGeometry args={[size[0] * 0.6, 8, 6]} />
                <meshLambertMaterial color={vehicleType.color} />
              </mesh>
              {/* Propellers */}
              {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([x, z], i) => (
                <group key={i} position={[x * size[0] * 0.8, size[1] * 0.3, z * size[2] * 0.8]}>
                  <mesh castShadow>
                    <cylinderGeometry args={[0.05, 0.05, 0.3]} />
                    <meshLambertMaterial color="#374151" />
                  </mesh>
                  <mesh position={[0, 0.2, 0]} castShadow>
                    <cylinderGeometry args={[size[0] * 0.3, size[0] * 0.3, 0.02]} />
                    <meshLambertMaterial color="#6b7280" />
                  </mesh>
                </group>
              ))}
            </group>
          );

        case 'maintenance':
          return (
            <group>
              {/* Robot body */}
              <mesh position={[0, 0, 0]} castShadow receiveShadow>
                <boxGeometry args={size} />
                <meshLambertMaterial color={vehicleType.color} />
              </mesh>
              {/* Robot arms */}
              <mesh position={[size[0] * 0.6, size[1] * 0.2, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
                <cylinderGeometry args={[0.1, 0.1, size[0] * 0.4]} />
                <meshLambertMaterial color="#6366f1" />
              </mesh>
              {/* Robot treads */}
              <mesh position={[0, -size[1] * 0.4, 0]} castShadow>
                <boxGeometry args={[size[0] * 1.2, size[1] * 0.2, size[2] * 1.1]} />
                <meshLambertMaterial color="#374151" />
              </mesh>
            </group>
          );

        case 'collection':
          return (
            <group>
              {/* Collector body */}
              <mesh position={[0, 0, 0]} castShadow receiveShadow>
                <boxGeometry args={[size[0], size[1], size[2]]} />
                <meshLambertMaterial color={vehicleType.color} />
              </mesh>
              {/* Collection tank */}
              <mesh position={[0, size[1] * 0.4, -size[2] * 0.2]} castShadow receiveShadow>
                <cylinderGeometry args={[size[0] * 0.4, size[0] * 0.4, size[1] * 0.6]} />
                <meshLambertMaterial color={new THREE.Color(vehicleType.color).multiplyScalar(1.2)} />
              </mesh>
              {/* Wheels */}
              {[-size[0] * 0.4, size[0] * 0.4].map((x, i) => (
                <mesh key={i} position={[x, -size[1] * 0.4, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                  <cylinderGeometry args={[size[1] * 0.3, size[1] * 0.3, 0.2]} />
                  <meshLambertMaterial color="#374151" />
                </mesh>
              ))}
            </group>
          );

        default:
          return (
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
              <boxGeometry args={size} />
              <meshLambertMaterial color={vehicleType.color} />
            </mesh>
          );
      }
    };

    return (
      <group ref={groupRef} position={position}>
        {getVehicleShape()}
        {/* Level indicator */}
        <mesh position={[0, size[1] * 0.8, 0]}>
          <sphereGeometry args={[0.1]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
    );
  }
);

Vehicle.displayName = 'Vehicle';

// Component that takes vehicleType as string ID
interface VehicleComponentProps {
  vehicleType: string;
  position: [number, number, number];
  level?: number;
  isMoving?: boolean;
}

export function VehicleComponent({ vehicleType, position, level = 1, isMoving = false }: VehicleComponentProps) {
  const vehicleTypeObj = getVehicleTypeById(vehicleType);
  
  if (!vehicleTypeObj) {
    console.warn(`Vehicle type "${vehicleType}" not found`);
    return null;
  }
  
  return <Vehicle vehicleType={vehicleTypeObj} position={position} level={level} isMoving={isMoving} />;
}

export function getVehicleTypeById(id: string): VehicleType | null {
  return VEHICLE_TYPES[id] || null;
}

export function getVehiclesByPurpose(purpose: VehicleType['purpose']): VehicleType[] {
  return Object.values(VEHICLE_TYPES).filter(vehicle => vehicle.purpose === purpose);
}
