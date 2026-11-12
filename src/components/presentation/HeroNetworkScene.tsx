'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Line } from '@react-three/drei';
import * as THREE from 'three';

interface HeroNetworkSceneProps {
  reducedMotion?: boolean;
  isMobile?: boolean;
}

export function HeroNetworkScene({
  reducedMotion = false,
  isMobile = false,
}: HeroNetworkSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const outerWireRef = useRef<THREE.Mesh>(null);

  // Satellite tool node coordinates in 3D world space
  const nodeCoords = useMemo(() => {
    const scale = isMobile ? 0.75 : 1.0;
    return {
      center: [0, 0, 0] as [number, number, number],
      database: [2.1 * scale, 1.2 * scale, 0.2] as [number, number, number],
      filesystem: [-2.1 * scale, 1.2 * scale, -0.2] as [number, number, number],
      cli: [-2.1 * scale, -1.2 * scale, 0.2] as [number, number, number],
      webApi: [2.1 * scale, -1.2 * scale, -0.2] as [number, number, number],
    };
  }, [isMobile]);

  // Subtle breathing and slow rotational drift
  useFrame((state, delta) => {
    if (reducedMotion) return;

    if (groupRef.current) {
      // Gentle overall rotational drift
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.12;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.08;
    }

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.35;
      coreRef.current.rotation.x += delta * 0.15;
    }

    if (outerWireRef.current) {
      outerWireRef.current.rotation.y -= delta * 0.2;
      outerWireRef.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Restrained Lighting Setup */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 5, 4]} intensity={1.2} color="#22D3EE" />
      <pointLight position={[-4, -3, 2]} intensity={1.5} color="#6366F1" />

      {/* ============================================================== */}
      {/* 1. CENTRAL AI / MCP PROTOCOL HUB                              */}
      {/* ============================================================== */}
      <Float
        speed={reducedMotion ? 0 : 1.5}
        rotationIntensity={reducedMotion ? 0 : 0.2}
        floatIntensity={reducedMotion ? 0 : 0.4}
      >
        <group position={nodeCoords.center}>
          {/* Inner solid glowing core */}
          <mesh ref={coreRef}>
            <icosahedronGeometry args={[0.7, 1]} />
            <meshStandardMaterial
              color="#4F46E5"
              roughness={0.2}
              metalness={0.8}
              emissive="#3730A3"
              emissiveIntensity={0.6}
            />
          </mesh>

          {/* Outer translucent wireframe shell */}
          <mesh ref={outerWireRef}>
            <icosahedronGeometry args={[0.95, 1]} />
            <meshStandardMaterial
              color="#22D3EE"
              wireframe
              transparent
              opacity={0.35}
            />
          </mesh>
        </group>
      </Float>

      {/* ============================================================== */}
      {/* 2. SATELLITE TOOL NODES                                        */}
      {/* ============================================================== */}

      {/* NODE A: Database (Top Right) */}
      <Float
        speed={reducedMotion ? 0 : 1.8}
        rotationIntensity={reducedMotion ? 0 : 0.3}
        floatIntensity={reducedMotion ? 0 : 0.5}
      >
        <group position={nodeCoords.database}>
          <mesh>
            <cylinderGeometry args={[0.35, 0.35, 0.45, 16]} />
            <meshStandardMaterial
              color="#0E7490"
              emissive="#06B6D4"
              emissiveIntensity={0.4}
              roughness={0.3}
              metalness={0.7}
            />
          </mesh>
          <mesh position={[0, 0.25, 0]}>
            <torusGeometry args={[0.38, 0.03, 8, 24]} />
            <meshStandardMaterial color="#22D3EE" emissive="#22D3EE" emissiveIntensity={0.8} />
          </mesh>
        </group>
      </Float>

      {/* NODE B: Filesystem (Top Left) */}
      <Float
        speed={reducedMotion ? 0 : 1.6}
        rotationIntensity={reducedMotion ? 0 : 0.25}
        floatIntensity={reducedMotion ? 0 : 0.4}
      >
        <group position={nodeCoords.filesystem}>
          <mesh>
            <boxGeometry args={[0.55, 0.55, 0.55]} />
            <meshStandardMaterial
              color="#3730A3"
              emissive="#4F46E5"
              emissiveIntensity={0.4}
              roughness={0.4}
              metalness={0.6}
            />
          </mesh>
          <mesh scale={[1.1, 1.1, 1.1]}>
            <boxGeometry args={[0.55, 0.55, 0.55]} />
            <meshStandardMaterial color="#818CF8" wireframe transparent opacity={0.3} />
          </mesh>
        </group>
      </Float>

      {/* NODE C: CLI / Tools (Bottom Left) */}
      <Float
        speed={reducedMotion ? 0 : 1.7}
        rotationIntensity={reducedMotion ? 0 : 0.3}
        floatIntensity={reducedMotion ? 0 : 0.45}
      >
        <group position={nodeCoords.cli}>
          <mesh>
            <octahedronGeometry args={[0.4, 0]} />
            <meshStandardMaterial
              color="#B45309"
              emissive="#F59E0B"
              emissiveIntensity={0.35}
              roughness={0.3}
              metalness={0.6}
            />
          </mesh>
          <mesh scale={[1.2, 1.2, 1.2]}>
            <octahedronGeometry args={[0.4, 0]} />
            <meshStandardMaterial color="#FCD34D" wireframe transparent opacity={0.25} />
          </mesh>
        </group>
      </Float>

      {/* NODE D: Web / APIs (Bottom Right) */}
      <Float
        speed={reducedMotion ? 0 : 1.9}
        rotationIntensity={reducedMotion ? 0 : 0.25}
        floatIntensity={reducedMotion ? 0 : 0.5}
      >
        <group position={nodeCoords.webApi}>
          <mesh>
            <torusGeometry args={[0.38, 0.12, 12, 28]} />
            <meshStandardMaterial
              color="#0284C7"
              emissive="#0EA5E9"
              emissiveIntensity={0.4}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.18, 12, 12]} />
            <meshStandardMaterial color="#38BDF8" emissive="#38BDF8" emissiveIntensity={0.8} />
          </mesh>
        </group>
      </Float>

      {/* ============================================================== */}
      {/* 3. CONNECTION BEAMS (Vectors linking Hub to External Tools)    */}
      {/* ============================================================== */}
      <Line
        points={[nodeCoords.center, nodeCoords.database]}
        color="#22D3EE"
        lineWidth={1.5}
        dashed
        dashScale={2}
        dashSize={0.2}
        dashOffset={0.1}
        transparent
        opacity={0.6}
      />
      <Line
        points={[nodeCoords.center, nodeCoords.filesystem]}
        color="#818CF8"
        lineWidth={1.5}
        dashed
        dashScale={2}
        dashSize={0.2}
        dashOffset={0.1}
        transparent
        opacity={0.6}
      />
      <Line
        points={[nodeCoords.center, nodeCoords.cli]}
        color="#F59E0B"
        lineWidth={1.5}
        dashed
        dashScale={2}
        dashSize={0.2}
        dashOffset={0.1}
        transparent
        opacity={0.5}
      />
      <Line
        points={[nodeCoords.center, nodeCoords.webApi]}
        color="#38BDF8"
        lineWidth={1.5}
        dashed
        dashScale={2}
        dashSize={0.2}
        dashOffset={0.1}
        transparent
        opacity={0.6}
      />
    </group>
  );
}

