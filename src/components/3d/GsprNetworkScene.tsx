"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Box } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "../ThemeProvider";

function GsprGrid() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const mintColor = isDark ? "#6effce" : "#0284c7";
  const emeraldColor = isDark ? "#34d399" : "#059669";
  const groupRef = useRef<THREE.Group>(null!);

  // Generate 23 requirement nodes representing the 23 EU MDR GSPRs arranged cleanly
  const gsprGrid = useMemo(() => {
    const items = [];
    const cols = 5;
    for (let i = 0; i < 23; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const x = (col - 2) * 0.7;
      const y = (1.5 - row) * 0.7;
      items.push({ x, y, id: i + 1, passed: i !== 13 });
    }
    return items;
  }, []);

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
      {gsprGrid.map((item) => (
        <group key={item.id} position={[item.x, item.y, 0]}>
          <Box args={[0.55, 0.55, 0.08]}>
            <meshStandardMaterial
              color={item.passed ? (isDark ? "#0a1b2e" : "#ffffff") : (isDark ? "#2a1515" : "#fef2f2")}
              roughness={0.3}
            />
          </Box>
          <Box args={[0.55, 0.08, 0.09]} position={[0, 0.235, 0]}>
            <meshStandardMaterial
              color={item.passed ? emeraldColor : "#ff4b4b"}
              emissive={item.passed ? emeraldColor : "#ff4b4b"}
              emissiveIntensity={0.5}
            />
          </Box>
        </group>
      ))}
    </group>
  );
}

export default function GsprNetworkScene() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div style={{ width: "100%", height: "240px", position: "relative" }}>
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} style={{ background: "transparent" }}>
        <ambientLight intensity={isDark ? 0.9 : 1.3} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color={isDark ? "#6effce" : "#0284c7"} />
        <GsprGrid />
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.2} />
      </Canvas>
    </div>
  );
}
