import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Float, Environment, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import styles from './AnotherTry.module.css';

const PARTICLE_COUNT = 15000;

function ParticleGalaxy() {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Mathematical distribution for a twisting vortex/galaxy
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        // Golden ratio spiral distribution
        const r = Math.pow(Math.random(), 0.5) * 20; // Radius
        const theta = Math.random() * 2 * Math.PI; // Angle
        const y = (Math.random() - 0.5) * 4 * (1 - r/20); // Thickness tapers at edges
        
        // Swirl offset
        const swirl = r * 0.5; 
        
        const x = r * Math.cos(theta + swirl);
        const z = r * Math.sin(theta + swirl);

        // Store base info
        temp.push({ 
            baseX: x, baseY: y, baseZ: z, 
            r, theta, swirl,
            speed: 0.05 + Math.random() * 0.1,
            size: Math.random() * 0.15 + 0.05
        });
    }
    return temp;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const mouseX = (state.mouse.x * state.viewport.width) / 2;
    const mouseY = (state.mouse.y * state.viewport.height) / 2;

    particles.forEach((p, i) => {
      // Rotation logic
      const currentTheta = p.theta + p.swirl + (t * p.speed / (p.r + 1));
      let currentX = p.r * Math.cos(currentTheta);
      let currentZ = p.r * Math.sin(currentTheta);
      let currentY = p.baseY + Math.sin(t * 2 + p.r) * 0.5;

      // Mouse repulsion wrapper (approximate distance in 2D plane relative to camera)
      // For a true 3D raycast repulsion we'd need Raycaster, but simple fake works beautifully
      const dx = currentX - mouseX * 2; 
      const dy = currentY - mouseY * 2;
      const dist = Math.sqrt(dx*dx + dy*dy);

      if (dist < 4) {
          const force = (4 - dist) / 4;
          currentX += (dx / dist) * force * 2;
          currentY += (dy / dist) * force * 2;
          currentZ += force; 
      }

      dummy.position.set(currentX, currentY, currentZ);
      dummy.scale.set(p.size, p.size, p.size);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.rotation.z = Math.sin(t * 0.2) * 0.1;
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, PARTICLE_COUNT]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshPhysicalMaterial 
        color="#0055ff" 
        emissive="#1E40AF" 
        emissiveIntensity={2} 
        roughness={0.1}
        transmission={0.9} 
      />
    </instancedMesh>
  );
}

function GlassTypography() {
  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
      <Text
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZJhjp-Ek-_EeA.woff"
        fontSize={3}
        letterSpacing={-0.1}
        position={[0, 0.5, 5]}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#050505"
      >
        ADIV
      </Text>
      <Text
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZJhjp-Ek-_EeA.woff"
        fontSize={1}
        letterSpacing={0.5}
        position={[0, -1.8, 5]}
        color="#aaaaaa"
      >
        CREATIVE DEVELOPER
      </Text>
    </Float>
  );
}

export default function AnotherTry() {
  return (
    <div className={styles.masterpieceContainer}>
      
      <div className={styles.uiOverlay}>
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className={styles.header}
        >
            <div className={styles.logo}>A//S</div>
            <nav className={styles.nav}>
                <a href="#work">Work</a>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
            </nav>
        </motion.div>
        
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1 }}
            className={styles.footer}
        >
            <p>Drag to rotate. Hover to repel.</p>
            <p>Made with Three.js & Math</p>
        </motion.div>
      </div>

      <Canvas camera={{ position: [0, 8, 25], fov: 45 }} className={styles.canvas}>
        <color attach="background" args={['#020202']} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#ff0055" />
        <pointLight position={[-10, -10, -10]} intensity={2} color="#0055ff" />
        
        <Environment preset="city" />
        <Sparkles count={100} scale={20} size={10} speed={0.4} color="#ffffff" opacity={0.2} />
        
        <ParticleGalaxy />
        <GlassTypography />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}
