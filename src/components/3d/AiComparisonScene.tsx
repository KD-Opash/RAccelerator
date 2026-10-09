"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Box } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "../ThemeProvider";

function GenericAiMesh() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime()) * 0.2;
      groupRef.current.rotation.y = Math.cos(state.clock.getElapsedTime()) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Unanchored Floating Nodes with No Traceability Lines */}
      {[
        [-0.8, 0.6, 0],
        [0.7, -0.4, 0.3],
        [-0.3, -0.7, -0.4],
        [0.6, 0.7, -0.2],
      ].map((pos, idx) => (
        <Box key={idx} position={pos as any} args={[0.3, 0.3, 0.3]} rotation={[0.4, 0.2, 0]}>
          <meshStandardMaterial color="#ff4b4b" roughness={0.4} />
        </Box>
      ))}
    </group>
  );
}

function DeterministicEngineMesh() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const mintColor = isDark ? "#6effce" : "#0284c7";
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        state.pointer.x * 0.3,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* Anchored Rule Matrix: 3 Connected Pillars representing Rule -> Evidence -> Determination */}
      {[-0.8, 0, 0.8].map((x, idx) => (
        <group key={idx} position={[x, 0, 0]}>
          <Box args={[0.6, 1.8, 0.2]}>
            <meshStandardMaterial
              color={isDark ? "#0a1b2e" : "#0f2342"}
              emissive={isDark ? "#050e1a" : "#1e3a8a"}
              emissiveIntensity={0.25}
              roughness={0.2}
              metalness={0.4}
            />
          </Box>
          <Box args={[0.6, 0.08, 0.21]} position={[0, 0.86, 0]}>
            <meshStandardMaterial color={mintColor} emissive={mintColor} emissiveIntensity={0.6} />
          </Box>
        </group>
      ))}
    </group>
  );
}

export default function AiComparisonScene({ type }: { type: "chaotic" | "structured" }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div style={{ width: "100%", height: "180px", position: "relative" }}>
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} style={{ background: "transparent" }}>
        <ambientLight intensity={isDark ? 0.9 : 1.3} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color={type === "chaotic" ? "#ff4b4b" : (isDark ? "#6effce" : "#0284c7")} />
        {type === "chaotic" ? <GenericAiMesh /> : <DeterministicEngineMesh />}
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.2} />
      </Canvas>
    </div>
  );
}
