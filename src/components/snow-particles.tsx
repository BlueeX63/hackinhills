"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Snow({ count = 3000 }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate random positions and velocities for the snow particles
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Spread the snow across a wide area: X(-15 to 15), Y(-10 to 10), Z(-10 to 5)
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;

      // Velocity: X (wind sway), Y (falling speed), Z (sway)
      vel[i * 3] = (Math.random() - 0.5) * 0.5;
      vel[i * 3 + 1] = Math.random() * 2 + 1; // Falling speed
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    }

    return [pos, vel];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Add subtle sine wave sway based on time
      pos[i3] += Math.sin(state.clock.elapsedTime * 0.5 + i) * delta * 0.2 + (velocities[i3] * delta * 0.1);
      
      // Make it fall
      pos[i3 + 1] -= velocities[i3 + 1] * delta * 0.8;
      
      // Reset position if it falls below the screen
      if (pos[i3 + 1] < -10) {
        pos[i3 + 1] = 10;
        pos[i3] = (Math.random() - 0.5) * 30; // reset X
      }
    }
    
    // Tell ThreeJS the geometry needs to be updated
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#a5c4e3" // Cinematic cold blueish white
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

export function SnowParticles() {
  return (
    <div className="absolute inset-0 z-40 pointer-events-none mix-blend-screen">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Snow />
      </Canvas>
    </div>
  );
}
