"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Box, Cylinder } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "../ThemeProvider";

function MedicalDeviceMesh() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const mintColor = isDark ? "#6effce" : "#059669";
  const amberColor = isDark ? "#fdb813" : "#d97706";

  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        state.pointer.x * 0.5,
        0.05
      );
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef}>
        {/* Central Device Main Body (SaMD Control Module) */}
        <Box args={[1.8, 1.2, 0.8]}>
          <meshStandardMaterial
            color={isDark ? "#0a1b2e" : "#ffffff"}
            roughness={0.2}
            metalness={0.2}
          />
        </Box>

        {/* Rule 11 Software Interface Ring */}
        <Cylinder args={[0.5, 0.5, 0.85, 32]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial
            color={mintColor}
            emissive={mintColor}
            emissiveIntensity={0.4}
            wireframe
          />
        </Cylinder>

        {/* Rule 9 Active Therapeutic Sensor Hub */}
        <Box args={[2.0, 0.1, 1.0]} position={[0, 0.65, 0]}>
          <meshStandardMaterial color={amberColor} emissive={amberColor} emissiveIntensity={0.5} />
        </Box>
      </group>
    </Float>
  );
}

export default function DeviceModelScene() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div style={{ width: "100%", height: "240px", position: "relative" }}>
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} style={{ background: "transparent" }}>
        <ambientLight intensity={isDark ? 0.9 : 1.3} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color={isDark ? "#6effce" : "#059669"} />
        <MedicalDeviceMesh />
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.2} />
      </Canvas>
    </div>
  );
}
