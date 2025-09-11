import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[40, 40]} />
      <meshLambertMaterial color="#4ade80" />
    </mesh>
  );
}

function Building({ position, size, color }: { position: [number, number, number], size: [number, number, number], color: string }) {
  const meshRef = useRef<any>(null);
  
  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshLambertMaterial color={color} />
    </mesh>
  );
}

function Hive({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Main hive structure */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.8, 1, 1.5, 6]} />
        <meshLambertMaterial color="#fbbf24" />
      </mesh>
      {/* Hive roof */}
      <mesh position={[0, 1.4, 0]} castShadow receiveShadow>
        <coneGeometry args={[1, 0.6, 6]} />
        <meshLambertMaterial color="#f59e0b" />
      </mesh>
    </group>
  );
}

function DynamicLighting() {
  const sunRef = useRef<THREE.DirectionalLight>(null);
  const moonRef = useRef<THREE.DirectionalLight>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * 0.2; // Slow down the cycle
    
    // Sun position - circular path around the scene
    const sunX = Math.cos(time) * 25;
    const sunY = Math.sin(time) * 15 + 5;
    const sunZ = Math.sin(time) * 25;
    
    // Moon position - opposite to sun
    const moonX = -sunX;
    const moonY = -sunY;
    const moonZ = -sunZ;
    
    if (sunRef.current) {
      sunRef.current.position.set(sunX, sunY, sunZ);
      sunRef.current.target.position.set(0, 0, 0);
      sunRef.current.target.updateMatrixWorld();
      
      // Sun intensity based on height (day/night cycle)
      const sunIntensity = Math.max(0, sunY / 15);
      sunRef.current.intensity = sunIntensity * 1.2;
      
      // Sun color changes throughout day
      const sunColor = new THREE.Color();
      if (sunY > 10) {
        // Noon - bright white
        sunColor.setRGB(1, 1, 0.9);
      } else if (sunY > 0) {
        // Dawn/Dusk - orange
        sunColor.setRGB(1, 0.6, 0.3);
      } else {
        // Below horizon - no light
        sunColor.setRGB(0, 0, 0);
      }
      sunRef.current.color = sunColor;
    }
    
    if (moonRef.current) {
      moonRef.current.position.set(moonX, Math.max(moonY, 2), moonZ);
      moonRef.current.target.position.set(0, 0, 0);
      moonRef.current.target.updateMatrixWorld();
      
      // Moon intensity when sun is down
      const moonIntensity = sunY < 0 ? Math.max(0, -sunY / 15) : 0;
      moonRef.current.intensity = moonIntensity * 0.3;
      
      // Moon color - blue-ish white
      moonRef.current.color.setRGB(0.8, 0.9, 1);
    }
  });

  return (
    <>
      {/* Ambient light changes with time of day */}
      <ambientLight intensity={0.2} color="#87CEEB" />
      
      {/* Sun */}
      <directionalLight
        ref={sunRef}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      
      {/* Moon */}
      <directionalLight
        ref={moonRef}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
    </>
  );
}

function Scene() {
  return (
    <>
      {/* Dynamic Lighting System */}
      <DynamicLighting />

      {/* Ground - larger field */}
      <Ground />

      {/* Buildings/Structures - sitting properly on ground */}
      <Building position={[-8, 0.5, -6]} size={[1.5, 1, 2]} color="#8b5cf6" />
      <Building position={[6, 0.75, -8]} size={[2, 1.5, 1.5]} color="#ef4444" />
      <Building position={[-4, 0.25, 4]} size={[1, 0.5, 1]} color="#06b6d4" />
      <Building position={[8, 1, 4]} size={[1.8, 2, 1.2]} color="#f97316" />
      <Building position={[-10, 0.4, 0]} size={[1.2, 0.8, 1]} color="#a855f7" />
      <Building position={[0, 0.15, -10]} size={[0.8, 0.3, 0.8]} color="#22c55e" />
      <Building position={[10, 0.3, -2]} size={[1, 0.6, 1.5]} color="#ec4899" />

      {/* Hives - sitting properly on ground */}
      <Hive position={[-2, 0, -2]} />
      <Hive position={[3, 0, 2]} />
      <Hive position={[-6, 0, 2]} />
      <Hive position={[4, 0, -4]} />
      <Hive position={[0, 0, 6]} />
      <Hive position={[-8, 0, -4]} />

      {/* Additional decorative elements */}
      <Building position={[12, 0.2, 6]} size={[0.6, 0.4, 0.6]} color="#fbbf24" />
      <Building position={[-12, 0.3, -8]} size={[0.8, 0.6, 0.8]} color="#f97316" />
    </>
  );
}

export function GameScene() {
  const isDragging = useRef(false);
  const previousMouse = useRef({ x: 0, y: 0 });
  const cameraPosition = useRef({ x: 0, z: 0 });

  const handleMouseDown = (event: React.MouseEvent) => {
    isDragging.current = true;
    previousMouse.current = { x: event.clientX, y: event.clientY };
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isDragging.current) return;

    const deltaX = event.clientX - previousMouse.current.x;
    const deltaY = event.clientY - previousMouse.current.y;

    // Pan the camera (limit the range)
    const panSpeed = 0.02;
    const maxPan = 8;

    cameraPosition.current.x = Math.max(-maxPan, Math.min(maxPan, 
      cameraPosition.current.x - deltaX * panSpeed));
    cameraPosition.current.z = Math.max(-maxPan, Math.min(maxPan, 
      cameraPosition.current.z - deltaY * panSpeed));

    previousMouse.current = { x: event.clientX, y: event.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div 
      className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <Canvas
        shadows
        camera={{ 
          position: [12, 8, 12], 
          fov: 45,
          near: 0.1,
          far: 100
        }}
        style={{ background: 'transparent' }}
        onCreated={({ camera }) => {
          const updateCamera = () => {
            camera.position.x = 12 + cameraPosition.current.x;
            camera.position.z = 12 + cameraPosition.current.z;
            camera.lookAt(cameraPosition.current.x, 0, cameraPosition.current.z);
          };
          
          const animate = () => {
            updateCamera();
            requestAnimationFrame(animate);
          };
          animate();
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}