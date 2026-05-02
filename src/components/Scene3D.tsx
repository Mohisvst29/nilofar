"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function FloatingShapes() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-2, 1, -2]} scale={1.2}>
          <torusKnotGeometry args={[1, 0.3, 100, 16]} />
          <MeshDistortMaterial
            color="#0048A0"
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.6}
            roughness={0.2}
            distort={0.2}
            speed={2}
          />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={2} floatIntensity={1.5}>
        <mesh position={[3, -1, -1]} scale={1.5}>
          <icosahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial
            color="#7CC242"
            transmission={0.5}
            thickness={1}
            roughness={0}
            metalness={0.5}
          />
        </mesh>
      </Float>

      <Float speed={1} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={[1.5, 2, -3]} scale={0.8}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#B3B4B4" roughness={0.1} metalness={0.8} />
        </mesh>
      </Float>
      
      <Float speed={2.5} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[-3, -2, -4]} scale={1}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            color="#0048A0"
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.8}
            roughness={0.1}
            distort={0.4}
            speed={3}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full opacity-60">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#blue" />
        
        <FloatingShapes />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
