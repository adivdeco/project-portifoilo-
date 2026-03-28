import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Stars, Environment } from '@react-three/drei';

function NodeElement({ position, color, label }) {
  const mesh = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.position.y = position[1] + Math.sin(t + position[0]) * 0.5;
    mesh.current.rotation.x = Math.sin(t / 4) / 2;
    mesh.current.rotation.y = t / 4;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh position={position} ref={mesh}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshPhysicalMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          metalness={0.5}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  );
}

function CentralSun() {
  const mesh = useRef();
  
  useFrame((state) => {
    mesh.current.rotation.y += 0.005;
    mesh.current.rotation.x += 0.002;
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[2.5, 1]} />
      <meshStandardMaterial 
        color="#1E40AF" 
        emissive="#1E40AF"
        emissiveIntensity={0.8}
        wireframe 
      />
    </mesh>
  );
}

export default function GravityCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
      <ambientLight intensity={1.5} />
      <pointLight position={[10, 10, 10]} intensity={2.5} />
      <spotLight position={[-10, -10, -10]} color="#ff0055" intensity={2} />
      
      <Environment preset="city" />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <CentralSun />
      <NodeElement position={[-5, 2, -2]} color="#61DAFB" label="React" />
      <NodeElement position={[5, -2, 2]} color="#68A063" label="Node" />
      <NodeElement position={[0, 4, 3]} color="#47A248" label="MongoDB" />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate 
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2 + 0.2}
        minPolarAngle={Math.PI / 2 - 0.2}
      />
    </Canvas>
  );
}
