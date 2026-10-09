"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Box } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "../ThemeProvider";

function SecurityVault() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const mintColor = isDark ? "#6effce" : "#059669";
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        state.pointer.x * 0.4,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer Encrypted Vault Layer (21 CFR Part 11 Audit Lock) */}
      <Box args={[2.4, 1.8, 0.4]}>
        <meshStandardMaterial
          color={isDark ? "#0a1b2e" : "#ffffff"}
          roughness={0.2}
          metalness={0.3}
        />
      </Box>

      {/* Vault Cryptographic Seal Badge */}
      <Box args={[0.8, 0.8, 0.45]}>
        <meshStandardMaterial
          color={mintColor}
          emissive={mintColor}
          emissiveIntensity={0.6}
        />
      </Box>
    </group>
  );
}

export default function SecurityShieldScene() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div style={{ width: "100%", height: "200px", position: "relative" }}>
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} style={{ background: "transparent" }}>
        <ambientLight intensity={isDark ? 0.9 : 1.3} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color={isDark ? "#6effce" : "#059669"} />
        <SecurityVault />
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.2} />
      </Canvas>
    </div>
  );
}
