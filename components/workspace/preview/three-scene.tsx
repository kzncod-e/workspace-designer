"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, PerspectiveCamera, Box, Cylinder, PivotControls } from "@react-three/drei";
import { useWorkspaceStore } from "@/lib/store";
import { Product } from "@/types/product";

// --- PLACEHOLDER COMPONENTS ---
// These will be replaced by useGLTF when the user provides the models

const PlaceholderDesk = ({ product, isSelected }: { product: Product | null; isSelected: boolean }) => {
  if (!product) return null;
  const color = product.colorHex || "#d4b895"; // Default wood color
  return (
    <group position={[0, 0.75, 0]}>
      {/* Table top */}
      <Box args={[1.5, 0.05, 0.8]} position={[0, 0, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={color} roughness={0.8} />
      </Box>
      {/* Legs */}
      <Cylinder args={[0.02, 0.02, 0.75]} position={[-0.7, -0.375, -0.35]} castShadow>
        <meshStandardMaterial color="#333" />
      </Cylinder>
      <Cylinder args={[0.02, 0.02, 0.75]} position={[0.7, -0.375, -0.35]} castShadow>
        <meshStandardMaterial color="#333" />
      </Cylinder>
      <Cylinder args={[0.02, 0.02, 0.75]} position={[-0.7, -0.375, 0.35]} castShadow>
        <meshStandardMaterial color="#333" />
      </Cylinder>
      <Cylinder args={[0.02, 0.02, 0.75]} position={[0.7, -0.375, 0.35]} castShadow>
        <meshStandardMaterial color="#333" />
      </Cylinder>
      {/* Selection outline */}
      {isSelected && (
        <Box args={[1.55, 0.1, 0.85]} position={[0, 0, 0]}>
          <meshBasicMaterial color="#10b981" wireframe />
        </Box>
      )}
    </group>
  );
};

const PlaceholderChair = ({ product, isSelected }: { product: Product | null; isSelected: boolean }) => {
  if (!product) return null;
  const color = product.colorHex || "#333333";
  return (
    <group position={[0, 0.45, 0.6]}>
      {/* Seat */}
      <Box args={[0.5, 0.1, 0.5]} position={[0, 0, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={color} roughness={0.9} />
      </Box>
      {/* Backrest */}
      <Box args={[0.5, 0.5, 0.1]} position={[0, 0.3, 0.2]} castShadow receiveShadow>
        <meshStandardMaterial color={color} roughness={0.9} />
      </Box>
      {/* Base cylinder */}
      <Cylinder args={[0.05, 0.05, 0.45]} position={[0, -0.25, 0]} castShadow>
        <meshStandardMaterial color="#555" />
      </Cylinder>
      {/* Selection outline */}
      {isSelected && (
        <Box args={[0.55, 0.7, 0.55]} position={[0, 0.15, 0.1]}>
          <meshBasicMaterial color="#10b981" wireframe />
        </Box>
      )}
    </group>
  );
};

const PlaceholderMonitor = ({ product, isSelected }: { product: Product | null; isSelected: boolean }) => {
  if (!product) return null;
  
  const content = (
    <group position={[0, 0.8, -0.2]}>
      {/* Screen */}
      <Box args={[0.8, 0.45, 0.05]} position={[0, 0.3, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#111" />
      </Box>
      {/* Stand */}
      <Box args={[0.05, 0.25, 0.05]} position={[0, 0.1, -0.05]} castShadow>
        <meshStandardMaterial color="#333" />
      </Box>
      <Box args={[0.3, 0.02, 0.2]} position={[0, 0, -0.05]} castShadow>
        <meshStandardMaterial color="#333" />
      </Box>
      {/* Selection outline */}
      {isSelected && (
        <Box args={[0.85, 0.5, 0.1]} position={[0, 0.3, 0]}>
          <meshBasicMaterial color="#10b981" wireframe />
        </Box>
      )}
    </group>
  );

  return isSelected ? (
    <PivotControls
      depthTest={false}
      lineWidth={2}
      axisColors={['#ff4b4b', '#10b981', '#3b82f6']}
      scale={0.5}
      anchor={[0, -0.3, 0]}
    >
      {content}
    </PivotControls>
  ) : content;
};

// --- SCENE COMPONENT ---

export function ThreeScene() {
  const { desk, chair, accessories, lightingMode, selectedPreviewItem, setSelectedPreviewItem, setActiveCategory } = useWorkspaceStore();
  const monitors = accessories.filter((a) => a.category === "monitor");
  const plants = accessories.filter((a) => a.category === "plant");

  const handlePointerDown = (e: any, category: any, id: string) => {
    e.stopPropagation();
    setSelectedPreviewItem(id);
    setActiveCategory(category);
  };

  const handlePointerMissed = () => {
    setSelectedPreviewItem(null);
  };

  // Determine lighting based on mode
  const envPreset = lightingMode === "daylight" ? "apartment" : lightingMode === "sunset" ? "sunset" : "night";
  const lightIntensity = lightingMode === "daylight" ? 1.5 : lightingMode === "sunset" ? 0.8 : 0.2;

  return (
    <div className="w-full h-full relative">
      <Canvas shadows onPointerMissed={handlePointerMissed}>
        <PerspectiveCamera makeDefault position={[0, 1.5, 3]} fov={45} />
        
        {/* Environment & Lighting */}
        <ambientLight intensity={lightIntensity * 0.5} />
        <directionalLight 
          castShadow 
          position={[5, 5, 5]} 
          intensity={lightIntensity} 
          shadow-mapSize={[1024, 1024]}
        />
        <Environment preset={envPreset} background blur={0.5} />
        
        {/* Floor Shadows */}
        <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={5} blur={2} far={2} />

        {/* 3D Elements */}
        <Suspense fallback={null}>
          <group onPointerDown={(e) => desk && handlePointerDown(e, "desk", desk.id)}>
            <PlaceholderDesk product={desk} isSelected={selectedPreviewItem === desk?.id} />
          </group>

          <group onPointerDown={(e) => chair && handlePointerDown(e, "chair", chair.id)}>
            <PlaceholderChair product={chair} isSelected={selectedPreviewItem === chair?.id} />
          </group>
          
          {monitors.map((monitor, i) => {
            // Offset x position if multiple: -0.9, 0, 0.9
            const xOffset = monitors.length === 1 ? 0 : (i - (monitors.length - 1) / 2) * 0.85;
            // Angle them slightly towards the center
            const yRotation = monitors.length === 1 ? 0 : -xOffset * 0.3;
            
            return (
              <group 
                key={`${monitor.id}-${i}`} 
                position={[xOffset, 0, 0]} 
                rotation={[0, yRotation, 0]}
                onPointerDown={(e) => handlePointerDown(e, "monitor", monitor.id)}
              >
                <PlaceholderMonitor product={monitor} isSelected={selectedPreviewItem === monitor?.id} />
              </group>
            );
          })}

          {plants.map((plant, i) => {
            // Place plants on the sides of the desk
            const xOffset = i % 2 === 0 ? -1.2 - (i * 0.1) : 1.2 + (i * 0.1);
            return (
              <group 
                key={`${plant.id}-${i}`} 
                position={[xOffset, 0.8, 0.2]} 
                onPointerDown={(e) => handlePointerDown(e, "plant", plant.id)}
              >
                <mesh castShadow receiveShadow>
                  <cylinderGeometry args={[0.1, 0.08, 0.2]} />
                  <meshStandardMaterial color="#8B4513" />
                </mesh>
                <mesh position={[0, 0.2, 0]} castShadow>
                  <sphereGeometry args={[0.15]} />
                  <meshStandardMaterial color="#2E8B57" />
                </mesh>
                {selectedPreviewItem === plant.id && (
                  <Box args={[0.35, 0.5, 0.35]} position={[0, 0.15, 0]}>
                    <meshBasicMaterial color="#10b981" wireframe />
                  </Box>
                )}
              </group>
            );
          })}
        </Suspense>

        {/* Controls */}
        <OrbitControls 
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2 - 0.05}
          minDistance={1.5}
          maxDistance={5}
        />
      </Canvas>
      <div className="absolute bottom-2 right-2 text-[10px] text-muted-foreground bg-background/50 backdrop-blur-md px-2 py-1 rounded-md pointer-events-none">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
}
