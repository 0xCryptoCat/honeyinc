import { forwardRef } from 'react';
import * as THREE from 'three';

export interface BuildingType {
  id: string;
  name: string;
  category: 'hive' | 'lab' | 'depot' | 'storage' | 'colony';
  maxLevel: number;
  baseSize: [number, number, number];
  baseColor: string;
  upgradeable: boolean;
}

export const BUILDING_TYPES: Record<string, BuildingType> = {
  // Hives
  basic_hive: {
    id: 'basic_hive',
    name: 'Basic Hive',
    category: 'hive',
    maxLevel: 5,
    baseSize: [1.5, 1.5, 1.5],
    baseColor: '#fbbf24',
    upgradeable: true
  },
  royal_hive: {
    id: 'royal_hive',
    name: 'Royal Hive',
    category: 'hive',
    maxLevel: 3,
    baseSize: [2, 2.5, 2],
    baseColor: '#f59e0b',
    upgradeable: true
  },

  // Labs
  research_lab: {
    id: 'research_lab',
    name: 'Research Laboratory',
    category: 'lab',
    maxLevel: 8,
    baseSize: [2.5, 2, 2.5],
    baseColor: '#8b5cf6',
    upgradeable: true
  },

  // Storage
  honey_extractor: {
    id: 'honey_extractor',
    name: 'Honey Extractor',
    category: 'storage',
    maxLevel: 6,
    baseSize: [2, 3, 2],
    baseColor: '#06b6d4',
    upgradeable: true
  },

  // Depot
  shipping_depot: {
    id: 'shipping_depot',
    name: 'Shipping Depot',
    category: 'depot',
    maxLevel: 4,
    baseSize: [3, 1.5, 3],
    baseColor: '#ef4444',
    upgradeable: true
  },

  // Colonies
  bee_colony: {
    id: 'bee_colony',
    name: 'Bee Colony',
    category: 'colony',
    maxLevel: 7,
    baseSize: [1.8, 1.2, 1.8],
    baseColor: '#22c55e',
    upgradeable: true
  }
};

interface BuildingProps {
  buildingType: BuildingType;
  level: number;
  position: [number, number, number];
  onClick?: () => void;
}

export const Building = forwardRef<THREE.Group, BuildingProps>(
  ({ buildingType, level, position, onClick }, ref) => {
    const sizeMultiplier = 1 + (level - 1) * 0.2; // Grow by 20% per level
    const size: [number, number, number] = [
      buildingType.baseSize[0] * sizeMultiplier,
      buildingType.baseSize[1] * sizeMultiplier,
      buildingType.baseSize[2] * sizeMultiplier
    ];

    const adjustedPosition: [number, number, number] = [
      position[0],
      position[1] + size[1] / 2, // Sit on ground
      position[2]
    ];

    const getBuildingShape = () => {
      switch (buildingType.category) {
        case 'hive':
          return (
            <group>
              {/* Main hive body */}
              <mesh position={[0, 0, 0]} castShadow receiveShadow onClick={onClick}>
                <cylinderGeometry args={[size[0] * 0.8, size[0], size[1] * 0.8, 6]} />
                <meshLambertMaterial color={buildingType.baseColor} />
              </mesh>
              {/* Hive top */}
              <mesh position={[0, size[1] * 0.6, 0]} castShadow receiveShadow>
                <coneGeometry args={[size[0] * 0.9, size[1] * 0.4, 6]} />
                <meshLambertMaterial color={new THREE.Color(buildingType.baseColor).multiplyScalar(0.8)} />
              </mesh>
              {/* Level indicator stripes */}
              {Array.from({ length: level }, (_, i) => (
                <mesh key={i} position={[0, -size[1] * 0.3 + i * 0.1, 0]} castShadow receiveShadow>
                  <cylinderGeometry args={[size[0] * 1.1, size[0] * 1.1, 0.05, 6]} />
                  <meshLambertMaterial color="#f59e0b" />
                </mesh>
              ))}
            </group>
          );

        case 'lab':
          return (
            <group>
              {/* Main lab building */}
              <mesh position={[0, 0, 0]} castShadow receiveShadow onClick={onClick}>
                <boxGeometry args={size} />
                <meshLambertMaterial color={buildingType.baseColor} />
              </mesh>
              {/* Lab equipment on top */}
              <mesh position={[0, size[1] * 0.6, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[size[0] * 0.3, size[0] * 0.3, size[1] * 0.2]} />
                <meshLambertMaterial color="#a855f7" />
              </mesh>
              {/* Level indicator windows */}
              {Array.from({ length: Math.min(level, 4) }, (_, i) => (
                <mesh key={i} position={[size[0] * 0.4, -size[1] * 0.2 + i * 0.3, size[2] * 0.5]} castShadow receiveShadow>
                  <boxGeometry args={[0.1, 0.2, 0.1]} />
                  <meshLambertMaterial color="#60a5fa" emissive="#1e40af" emissiveIntensity={0.2} />
                </mesh>
              ))}
            </group>
          );

        case 'depot':
          return (
            <group>
              {/* Main depot building */}
              <mesh position={[0, 0, 0]} castShadow receiveShadow onClick={onClick}>
                <boxGeometry args={size} />
                <meshLambertMaterial color={buildingType.baseColor} />
              </mesh>
              {/* Loading dock */}
              <mesh position={[size[0] * 0.6, -size[1] * 0.3, 0]} castShadow receiveShadow>
                <boxGeometry args={[size[0] * 0.4, size[1] * 0.4, size[2] * 0.8]} />
                <meshLambertMaterial color={new THREE.Color(buildingType.baseColor).multiplyScalar(0.9)} />
              </mesh>
            </group>
          );

        case 'storage':
          return (
            <group>
              {/* Main storage silo */}
              <mesh position={[0, 0, 0]} castShadow receiveShadow onClick={onClick}>
                <cylinderGeometry args={[size[0], size[0], size[1], 8]} />
                <meshLambertMaterial color={buildingType.baseColor} />
              </mesh>
              {/* Storage levels */}
              {Array.from({ length: Math.min(level, 6) }, (_, i) => (
                <mesh key={i} position={[0, -size[1] * 0.4 + i * (size[1] * 0.8 / 6), 0]} castShadow receiveShadow>
                  <cylinderGeometry args={[size[0] * 1.05, size[0] * 1.05, 0.02, 8]} />
                  <meshLambertMaterial color="#374151" />
                </mesh>
              ))}
            </group>
          );

        case 'colony':
          return (
            <group>
              {/* Main colony structure */}
              <mesh position={[0, 0, 0]} castShadow receiveShadow onClick={onClick}>
                <sphereGeometry args={[size[0], 8, 6]} />
                <meshLambertMaterial color={buildingType.baseColor} />
              </mesh>
              {/* Colony nodes */}
              {Array.from({ length: Math.min(level, 4) }, (_, i) => {
                const angle = (i / 4) * Math.PI * 2;
                const x = Math.cos(angle) * size[0] * 0.7;
                const z = Math.sin(angle) * size[0] * 0.7;
                return (
                  <mesh key={i} position={[x, size[1] * 0.2, z]} castShadow receiveShadow>
                    <sphereGeometry args={[size[0] * 0.3, 6, 4]} />
                    <meshLambertMaterial color={new THREE.Color(buildingType.baseColor).multiplyScalar(1.2)} />
                  </mesh>
                );
              })}
            </group>
          );

        default:
          return (
            <mesh position={[0, 0, 0]} castShadow receiveShadow onClick={onClick}>
              <boxGeometry args={size} />
              <meshLambertMaterial color={buildingType.baseColor} />
            </mesh>
          );
      }
    };

    return (
      <group ref={ref} position={adjustedPosition}>
        {getBuildingShape()}
        {/* Hover glow effect could be added here */}
      </group>
    );
  }
);

Building.displayName = 'Building';

// Component that takes buildingType as string ID
interface BuildingComponentProps {
  buildingType: string;
  level: number;
  position: [number, number, number];
  onClick?: () => void;
}

export function BuildingComponent({ buildingType, level, position, onClick }: BuildingComponentProps) {
  const buildingTypeObj = getBuildingTypeById(buildingType);
  
  if (!buildingTypeObj) {
    console.warn(`Building type "${buildingType}" not found`);
    return null;
  }
  
  return <Building buildingType={buildingTypeObj} level={level} position={position} onClick={onClick} />;
}

export function getBuildingTypeById(id: string): BuildingType | null {
  return BUILDING_TYPES[id] || null;
}

export function getBuildingsByCategory(category: BuildingType['category']): BuildingType[] {
  return Object.values(BUILDING_TYPES).filter(building => building.category === category);
}
