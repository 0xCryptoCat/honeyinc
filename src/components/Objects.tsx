import { forwardRef, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface ObjectType {
  id: string;
  name: string;
  category: 'bee' | 'wasp' | 'item' | 'box' | 'effect';
  size: [number, number, number];
  color: string;
  animated: boolean;
  speed?: number;
  lifespan?: number; // in seconds
}

export const OBJECT_TYPES: Record<string, ObjectType> = {
  worker_bee: {
    id: 'worker_bee',
    name: 'Worker Bee',
    category: 'bee',
    size: [0.2, 0.15, 0.3],
    color: '#fbbf24',
    animated: true,
    speed: 3,
    lifespan: 60
  },
  wasp: {
    id: 'wasp',
    name: 'Wasp',
    category: 'wasp',
    size: [0.25, 0.2, 0.4],
    color: '#dc2626',
    animated: true,
    speed: 5,
    lifespan: 30
  },
  honey_jar: {
    id: 'honey_jar',
    name: 'Honey Jar',
    category: 'item',
    size: [0.3, 0.4, 0.3],
    color: '#fbbf24',
    animated: false
  },
  pollen_ball: {
    id: 'pollen_ball',
    name: 'Pollen Ball',
    category: 'item',
    size: [0.15, 0.15, 0.15],
    color: '#facc15',
    animated: false
  },
  shipping_box: {
    id: 'shipping_box',
    name: 'Shipping Box',
    category: 'box',
    size: [0.8, 0.6, 0.8],
    color: '#a16207',
    animated: false
  },
  honey_flow: {
    id: 'honey_flow',
    name: 'Honey Flow Effect',
    category: 'effect',
    size: [0.1, 0.5, 0.1],
    color: '#fbbf24',
    animated: true,
    speed: 1,
    lifespan: 3
  },
  sparkle: {
    id: 'sparkle',
    name: 'Sparkle Effect',
    category: 'effect',
    size: [0.05, 0.05, 0.05],
    color: '#fde047',
    animated: true,
    speed: 2,
    lifespan: 2
  }
};

interface GameObjectProps {
  objectType: ObjectType;
  position: [number, number, number];
  targetPosition?: [number, number, number];
  isMoving?: boolean;
  animationOffset?: number;
  onLifespanEnd?: () => void;
}

export const GameObject = forwardRef<THREE.Group, GameObjectProps>(
  ({ objectType, position, targetPosition, isMoving = false, animationOffset = 0, onLifespanEnd }, _ref) => {
    const groupRef = useRef<THREE.Group>(null);
    const currentPos = useRef(new THREE.Vector3(...position));
    const targetPos = useRef(targetPosition ? new THREE.Vector3(...targetPosition) : null);
    const timeAlive = useRef(0);
    const bobOffset = useRef(Math.random() * Math.PI * 2);

    useFrame((state, delta) => {
      if (!groupRef.current) return;

      timeAlive.current += delta;

      // Handle lifespan
      if (objectType.lifespan && timeAlive.current >= objectType.lifespan && onLifespanEnd) {
        onLifespanEnd();
        return;
      }

      // Handle movement
      if (isMoving && targetPos.current && objectType.speed) {
        const direction = targetPos.current.clone().sub(currentPos.current);
        const distance = direction.length();
        
        if (distance > 0.1) {
          direction.normalize();
          const moveSpeed = objectType.speed * delta;
          currentPos.current.add(direction.multiplyScalar(moveSpeed));
          groupRef.current.position.copy(currentPos.current);
        }
      }

      // Handle animations
      if (objectType.animated) {
        const time = state.clock.getElapsedTime() + animationOffset;
        
        switch (objectType.category) {
          case 'bee':
          case 'wasp':
            // Flying animation - figure-8 pattern and bobbing
            const bobHeight = Math.sin(time * 4 + bobOffset.current) * 0.1;
            const wingFlap = Math.sin(time * 20) * 0.1;
            groupRef.current.position.y = currentPos.current.y + bobHeight;
            groupRef.current.rotation.z = wingFlap;
            break;
            
          case 'effect':
            if (objectType.id === 'honey_flow') {
              // Flowing animation
              groupRef.current.scale.y = 1 + Math.sin(time * 3) * 0.3;
            } else if (objectType.id === 'sparkle') {
              // Twinkling animation
              const twinkle = Math.sin(time * 8) * 0.5 + 0.5;
              groupRef.current.scale.setScalar(twinkle);
            }
            break;
        }
      }
    });

    const getObjectShape = () => {
      switch (objectType.category) {
        case 'bee':
        case 'wasp':
          return (
            <group>
              {/* Body */}
              <mesh position={[0, 0, 0]} castShadow receiveShadow>
                <sphereGeometry args={[objectType.size[0], 8, 6]} />
                <meshLambertMaterial color={objectType.color} />
              </mesh>
              {/* Stripes for bees */}
              {objectType.category === 'bee' && (
                <>
                  <mesh position={[0, 0, objectType.size[2] * 0.1]} castShadow receiveShadow>
                    <sphereGeometry args={[objectType.size[0] * 1.05, 6, 4]} />
                    <meshLambertMaterial color="#000000" />
                  </mesh>
                  <mesh position={[0, 0, -objectType.size[2] * 0.1]} castShadow receiveShadow>
                    <sphereGeometry args={[objectType.size[0] * 1.05, 6, 4]} />
                    <meshLambertMaterial color="#000000" />
                  </mesh>
                </>
              )}
              {/* Wings */}
              <mesh position={[objectType.size[0] * 0.7, objectType.size[1] * 0.3, 0]} castShadow>
                <planeGeometry args={[objectType.size[0] * 0.8, objectType.size[2] * 0.6]} />
                <meshLambertMaterial color="#ffffff" transparent opacity={0.7} />
              </mesh>
              <mesh position={[-objectType.size[0] * 0.7, objectType.size[1] * 0.3, 0]} castShadow>
                <planeGeometry args={[objectType.size[0] * 0.8, objectType.size[2] * 0.6]} />
                <meshLambertMaterial color="#ffffff" transparent opacity={0.7} />
              </mesh>
            </group>
          );

        case 'item':
          if (objectType.id === 'honey_jar') {
            return (
              <group>
                {/* Jar body */}
                <mesh position={[0, 0, 0]} castShadow receiveShadow>
                  <cylinderGeometry args={[objectType.size[0] * 0.8, objectType.size[0], objectType.size[1], 8]} />
                  <meshLambertMaterial color={objectType.color} transparent opacity={0.8} />
                </mesh>
                {/* Jar lid */}
                <mesh position={[0, objectType.size[1] * 0.4, 0]} castShadow receiveShadow>
                  <cylinderGeometry args={[objectType.size[0] * 0.9, objectType.size[0] * 0.9, objectType.size[1] * 0.1, 8]} />
                  <meshLambertMaterial color="#a16207" />
                </mesh>
              </group>
            );
          } else if (objectType.id === 'pollen_ball') {
            return (
              <mesh position={[0, 0, 0]} castShadow receiveShadow>
                <sphereGeometry args={[objectType.size[0], 8, 6]} />
                <meshLambertMaterial color={objectType.color} />
              </mesh>
            );
          }
          break;

        case 'box':
          return (
            <group>
              {/* Box body */}
              <mesh position={[0, 0, 0]} castShadow receiveShadow>
                <boxGeometry args={objectType.size} />
                <meshLambertMaterial color={objectType.color} />
              </mesh>
              {/* Box tape/straps */}
              <mesh position={[0, objectType.size[1] * 0.5, 0]} castShadow receiveShadow>
                <boxGeometry args={[objectType.size[0] * 1.05, 0.02, objectType.size[2] * 1.05]} />
                <meshLambertMaterial color="#92400e" />
              </mesh>
            </group>
          );

        case 'effect':
          if (objectType.id === 'honey_flow') {
            return (
              <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[objectType.size[0], objectType.size[0] * 0.5, objectType.size[1], 6]} />
                <meshLambertMaterial color={objectType.color} transparent opacity={0.6} />
              </mesh>
            );
          } else if (objectType.id === 'sparkle') {
            return (
              <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[objectType.size[0], 6, 4]} />
                <meshBasicMaterial color={objectType.color} />
              </mesh>
            );
          }
          break;

        default:
          return (
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
              <boxGeometry args={objectType.size} />
              <meshLambertMaterial color={objectType.color} />
            </mesh>
          );
      }
    };

    return (
      <group ref={groupRef} position={position}>
        {getObjectShape()}
      </group>
    );
  }
);

GameObject.displayName = 'GameObject';

// Component that takes objectType as string ID
interface ObjectComponentProps {
  objectType: string;
  position: [number, number, number];
  isAnimated?: boolean;
}

export function ObjectComponent({ objectType, position }: Omit<ObjectComponentProps, 'isAnimated'>) {
  const objectTypeObj = getObjectTypeById(objectType);
  
  if (!objectTypeObj) {
    console.warn(`Object type "${objectType}" not found`);
    return null;
  }
  
  return <GameObject objectType={objectTypeObj} position={position} />;
}

export function getObjectTypeById(id: string): ObjectType | null {
  return OBJECT_TYPES[id] || null;
}

export function getObjectsByCategory(category: ObjectType['category']): ObjectType[] {
  return Object.values(OBJECT_TYPES).filter(obj => obj.category === category);
}
