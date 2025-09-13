import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { Html } from "@react-three/drei";
// Commented out temporarily for grid mapping phase
// import { GridManager } from "./GridManager";
// import { BuildingComponent } from "./Buildings";
// import { VehicleComponent } from "./Vehicles";

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[40, 40]} />
      <meshLambertMaterial color="lightgreen" />
    </mesh>
  );
}

function GridSystem() {
  const gridRef = useRef<THREE.GridHelper>(null);
  
  return (
    <>
      <gridHelper 
        ref={gridRef}
        args={[80, 20, '#ffffff', '#ffffff']} 
        position={[0, 0.01, 0]}
        material-opacity={0.5}
        material-transparent={true}
      />
      <GridLabels />
    </>
  );
}

function GridLabels() {
  const labels = [];
  const gridSize = 4; // Same as GridManager
  const gridExtent = 10; // 10x10 grid (-5 to +5 in each direction)
  
  // Create grid cells with 3D HTML text labels
  for (let row = 0; row < gridExtent; row++) {
    for (let col = 0; col < gridExtent; col++) {
      const x = (col - gridExtent/2 + 0.5) * gridSize;
      const z = (row - gridExtent/2 + 0.5) * gridSize;
      const rowNumber = row + 1;
      const colLetter = String.fromCharCode(97 + col); // a, b, c, d...
      const cellId = `${rowNumber}${colLetter}`;
      
      labels.push(
        <group key={cellId} position={[x, 0.02, z]}>
          
          {/* 3D positioned HTML text label */}
          <Html
            position={[0, 0.1, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            transform
            occlude
            distanceFactor={5}
            center
          >
            <div className="text-black opacity-25 text-6xl font-bold px-10 py-10 pointer-events-none">
              {cellId}
            </div>
          </Html>
        </group>
      );
    }
  }
  
  return <>{labels}</>;
}

// Temporarily commented out for grid mapping phase
/*
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
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1, 1, 1.5, 6]} />
        <meshLambertMaterial color="#fbbf24" />
      </mesh>
    </group>
  );
}
*/

function DynamicLighting() {
  const sunRef = useRef<THREE.DirectionalLight>(null);
  const moonRef = useRef<THREE.DirectionalLight>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * 0.01;
    
    // Sun position - circular path around the scene
    const sunX = Math.cos(time) * 30;
    const sunY = Math.sin(time) * 20 + 8;
    const sunZ = Math.sin(time) * 30;
    
    // Moon position - opposite to sun
    const moonX = -sunX;
    const moonY = -sunY;
    const moonZ = -sunZ;
    
    if (sunRef.current) {
      sunRef.current.position.set(sunX, sunY, sunZ);
      sunRef.current.target.position.set(0, 0, 0);
      sunRef.current.target.updateMatrixWorld();
      
      // Sun intensity based on height (day/night cycle)
      const sunIntensity = Math.max(0, sunY / 20);
      sunRef.current.intensity = sunIntensity * 1.0;
      
      // Sun color changes throughout day
      const sunColor = new THREE.Color();
      if (sunY > 15) {
        // Noon - bright white
        sunColor.setRGB(1, 1, 0.95);
      } else if (sunY > 0) {
        // Dawn/Dusk - warm orange
        sunColor.setRGB(1, 0.7, 0.4);
      } else {
        // Below horizon - no light
        sunColor.setRGB(0, 0, 0);
      }
      sunRef.current.color = sunColor;
    }
    
    if (moonRef.current) {
      moonRef.current.position.set(moonX, Math.max(moonY, 3), moonZ);
      moonRef.current.target.position.set(0, 0, 0);
      moonRef.current.target.updateMatrixWorld();
      
      // Moon intensity when sun is down
      const moonIntensity = sunY < 0 ? Math.max(0, -sunY / 20) : 0;
      moonRef.current.intensity = moonIntensity * 0.25;
      
      // Moon color - cool blue-white
      moonRef.current.color.setRGB(0.7, 0.8, 1);
    }
  });

  return (
    <>
      {/* Ambient light changes with time of day */}
      <ambientLight intensity={0.3} color="#e6f3ff" />
      
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
  // const gridManager = useMemo(() => new GridManager(), []);
  // const allCells = gridManager.getAllCells();

  return (
    <>
      {/* Dynamic Lighting System */}
      <DynamicLighting />

      {/* Ground - larger field */}
      <Ground />
      
      {/* Grid System for building placement with labels */}
      <GridSystem />

      {/* Path System - Roads where vehicles and bees will move */}
      <PathSystem />

      {/* Buildings and objects temporarily disabled for grid mapping */}
      {/* 
      {allCells.map((cell) => {
        const [x, y, z] = cell.position;
        
        switch (cell.type) {
          case 'hive':
            return <Hive key={cell.id} position={[x, y, z]} />;
          
          case 'lab':
            return (
              <BuildingComponent 
                key={cell.id}
                buildingType="research_lab"
                position={[x, y, z]}
                level={cell.level}
              />
            );
          
          case 'depot':
            return (
              <BuildingComponent 
                key={cell.id}
                buildingType="honey_extractor"
                position={[x, y, z]}
                level={cell.level}
              />
            );
          
          case 'storage':
            return (
              <BuildingComponent 
                key={cell.id}
                buildingType="honey_extractor"
                position={[x, y, z]}
                level={cell.level}
              />
            );
          
          case 'colony':
            return (
              <BuildingComponent 
                key={cell.id}
                buildingType="basic_hive"
                position={[x, y, z]}
                level={cell.level}
              />
            );
          
          case 'environment':
            return (
              <Building 
                key={cell.id}
                position={[x, y + 0.5, z]}
                size={[0.8, 1.5, 0.8]}
                color="#22c55e"
              />
            );
          
          case 'path':
            // Path cells can have vehicles
            return cell.objectIds.length > 0 ? (
              <VehicleComponent 
                key={cell.id}
                vehicleType="honey_truck"
                position={[x, y, z]}
              />
            ) : null;
          
          default:
            return null;
        }
      })}
      */}
    </>
  );
}

export function GameScene() {
  const isDragging = useRef(false);
  const previousMouse = useRef({ x: 0, y: 0 });
  const cameraPosition = useRef({ x: 0, z: 0 });

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
    isDragging.current = true;
    previousMouse.current = { x: event.clientX, y: event.clientY };
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isDragging.current) return;
    event.preventDefault();

    const deltaX = event.clientX - previousMouse.current.x;
    const deltaY = event.clientY - previousMouse.current.y;

    // Pan the camera with correct direction mapping
    const panSpeed = 0.03;
    const maxPan = 12;

    // Fix direction: mouse right = camera moves right, mouse up = camera moves up (negative Z)
    cameraPosition.current.x = Math.max(-maxPan, Math.min(maxPan, 
      cameraPosition.current.x + deltaX * panSpeed));
    cameraPosition.current.z = Math.max(-maxPan, Math.min(maxPan, 
      cameraPosition.current.z + deltaY * panSpeed));

    previousMouse.current = { x: event.clientX, y: event.clientY };
  };

  const handleMouseUp = (event: React.MouseEvent) => {
    event.preventDefault();
    isDragging.current = false;
  };

  // Touch events for mobile support
  const handleTouchStart = (event: React.TouchEvent) => {
    if (event.touches.length === 1) {
      event.preventDefault();
      isDragging.current = true;
      const touch = event.touches[0];
      previousMouse.current = { x: touch.clientX, y: touch.clientY };
    }
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    if (!isDragging.current || event.touches.length !== 1) return;
    event.preventDefault();

    const touch = event.touches[0];
    const deltaX = touch.clientX - previousMouse.current.x;
    const deltaY = touch.clientY - previousMouse.current.y;

    const panSpeed = 0.03;
    const maxPan = 12;

    // Fix direction for touch as well
    cameraPosition.current.x = Math.max(-maxPan, Math.min(maxPan, 
      cameraPosition.current.x - deltaX * panSpeed));
    cameraPosition.current.z = Math.max(-maxPan, Math.min(maxPan, 
      cameraPosition.current.z - deltaY * panSpeed));

    previousMouse.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    event.preventDefault();
    isDragging.current = false;
  };

  return (
    <div 
      className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: 'none' }}
    >
      <Canvas
        shadows
        camera={{ 
          position: [0, 8, 0], // x is left/right, y is up/down, z is forward/back
          fov: 80,
          near: 0.5,
          far: 50
        }}
        style={{ background: '#87CEEB' }}
        onCreated={({ camera, gl }) => {
          // Disable zoom and rotation completely
          gl.domElement.addEventListener('wheel', (e) => e.preventDefault(), { passive: false });
          gl.domElement.addEventListener('touchstart', (e) => {
            if (e.touches.length > 1) e.preventDefault();
          }, { passive: false });
          gl.domElement.addEventListener('touchmove', (e) => {
            if (e.touches.length > 1) e.preventDefault();
          }, { passive: false });
          
          // Fixed camera that only moves position, not rotation
          const updateCamera = () => {
            camera.position.x = 0 + cameraPosition.current.x;
            camera.position.z = 5 + cameraPosition.current.z;
            // Always look at the offset center of the scene
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

// Path Components
function PathI({ position, rotation = 0 }: { position: [number, number, number], rotation?: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Straight road segment - half cell width, full cell length */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <planeGeometry args={[1.5, 4]} /> {/* Half width (1.8), full length (3.6) */}
        <meshLambertMaterial color="#f0ccb1" /> {/* Light brown road color */}
      </mesh>
    </group>
  );
}

function PathT({ position, rotation = 0 }: { position: [number, number, number], rotation?: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Base cell - entire cell is road colored */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <planeGeometry args={[4, 4]} /> {/* Full cell size */}
        <meshLambertMaterial color="#f0ccb1" />
      </mesh>
      
      {/* Green cutout objects to shape the T */}
      {/* Top-left corner cutout - quarter circle */}
      <mesh position={[-2, 0.011, -2]} rotation={[-Math.PI / 2, 0, 3 * Math.PI / 2]} castShadow receiveShadow>
        <circleGeometry args={[1.25, 16, 0, Math.PI / 2]} />
        <meshLambertMaterial color="lightgreen" />
      </mesh>
      
      {/* Top-right corner cutout - quarter circle */}
      <mesh position={[2, 0.015, -2]} rotation={[-Math.PI / 2, 0, 2 * Math.PI / 2]} castShadow receiveShadow>
        <circleGeometry args={[1.25, 16, 0, Math.PI / 2]} />
        <meshLambertMaterial color="lightgreen" />
      </mesh>
      
      {/* Bottom cutout - rectangular area */}
      <mesh position={[0, 0.011, 1.375]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <planeGeometry args={[4, 1.25]} />
        <meshLambertMaterial color="lightgreen" />
      </mesh>
    </group>
  );
}

function PathSystem() {
  const gridSize = 4; // Same as GridManager
  const gridExtent = 10; // 10x10 grid
  
  // Helper function to convert grid coordinate to world position
  const getGridPosition = (row: number, col: number): [number, number, number] => {
    const x = (col - gridExtent/2 + 0.5) * gridSize;
    const z = (row - gridExtent/2 + 0.5) * gridSize;
    return [x, 0, z];
  };
  
  // Helper function to convert grid letter to column number (a=0, b=1, etc.)
  const letterToCol = (letter: string): number => letter.charCodeAt(0) - 97;
  
  const paths = [];
  
  // Horizontal line: 9a-9j (row 9, columns a through j)
  for (let col = 0; col < 10; col++) { // a=0 to j=9
    const position = getGridPosition(8, col); // row 9 is index 8 (0-based)
    const cellId = `9${String.fromCharCode(97 + col)}`;
    
    // T shapes at intersections (9f where vertical line connects)
    if (col === letterToCol('f')) {
      paths.push(<PathT key={cellId} position={position} rotation={0} />);
    } else {
      paths.push(<PathI key={cellId} position={position} rotation={Math.PI / 2} />); // Horizontal orientation
    }
  }
  
  // Horizontal line: 6a-6j (row 6, columns a through j)
  for (let col = 0; col < 10; col++) { // a=0 to j=9
    const position = getGridPosition(5, col); // row 6 is index 5 (0-based)
    const cellId = `6${String.fromCharCode(97 + col)}`;
    
    // T shapes at intersections (6f where vertical line connects)
    if (col === letterToCol('f')) {
      paths.push(<PathT key={cellId} position={position} rotation={Math.PI} />); // Rotated T
    } else {
      paths.push(<PathI key={cellId} position={position} rotation={Math.PI / 2} />); // Horizontal orientation
    }
  }
  
  // Vertical line: 6f-9f (column f, rows 6 through 9)
  for (let row = 6; row <= 9; row++) {
    // Skip 6f and 9f since they're already T intersections
    if (row === 6 || row === 9) continue;
    
    const position = getGridPosition(row - 1, letterToCol('f')); // Convert to 0-based
    const cellId = `${row}f`;
    paths.push(<PathI key={cellId} position={position} rotation={0} />); // Vertical orientation
  }
  
  return <>{paths}</>;
}