"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Box, Torus, Sphere, Cylinder, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "../ThemeProvider";

// 3D Glowing Remediation Checklist Document + 4 Security Badges (Matching Brand Logo Colors)
function GlowingRemediationChecklistDoc() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Green & Light Green Theme Palette:
  const logoGreen = isDark ? "#6effce" : "#059669";
  const lightGreen = isDark ? "#34d399" : "#10b981";
  const whiteColor = "#ffffff";

  const mainGroupRef = useRef<THREE.Group>(null!);
  const docGroupRef = useRef<THREE.Group>(null!);
  const glitterGroupRef = useRef<THREE.Group>(null!);

  // 220 Swirling Glitter Particles
  const glitterParticles = useMemo(() => {
    const pos = new Float32Array(220 * 3);
    for (let i = 0; i < 220; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 1.8 + Math.random() * 1.3;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  // 3D Shield Shape Path for surrounding badges
  const shieldGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.45);
    shape.lineTo(0.25, 0.52);
    shape.bezierCurveTo(0.42, 0.45, 0.45, 0.25, 0.45, 0.1);
    shape.bezierCurveTo(0.45, -0.2, 0.25, -0.42, 0, -0.55);
    shape.bezierCurveTo(-0.25, -0.42, -0.45, -0.2, -0.45, 0.1);
    shape.bezierCurveTo(-0.45, 0.25, -0.42, 0.45, -0.25, 0.52);
    shape.lineTo(0, 0.45);

    const extrudeSettings = {
      depth: 0.08,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.03,
      bevelThickness: 0.03,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (mainGroupRef.current) {
      mainGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        mainGroupRef.current.rotation.y,
        state.pointer.x * 0.45 + Math.sin(t * 0.4) * 0.1,
        0.05
      );
      mainGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        mainGroupRef.current.rotation.x,
        -state.pointer.y * 0.3,
        0.05
      );
    }

    if (docGroupRef.current) {
      docGroupRef.current.position.y = Math.sin(t * 1.2) * 0.06;
    }

    if (glitterGroupRef.current) {
      glitterGroupRef.current.rotation.y = t * 0.2;
    }
  });

  const checklistRows = [0.65, 0.22, -0.22, -0.65];

  return (
    <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.32}>
      <group ref={mainGroupRef}>
        {/* CENTRAL 3D GLOWING REMEDIATION CHECKLIST DOCUMENT (TRANSPARENT GLASS) */}
        <group ref={docGroupRef}>
          {/* Main Document Board Base - Transparent Glass */}
          <Box args={[1.5, 2.1, 0.08]}>
            <meshStandardMaterial
              color={isDark ? "#052e23" : "#064e3b"}
              emissive={logoGreen}
              emissiveIntensity={0.25}
              transparent
              opacity={0.18}
              roughness={0.15}
              metalness={0.8}
            />
          </Box>

          {/* Bright Glowing Neon Border Frame (Brand Logo Emerald Green) */}
          <Box args={[1.56, 2.16, 0.09]}>
            <meshStandardMaterial
              color={logoGreen}
              emissive={logoGreen}
              emissiveIntensity={1.05}
              wireframe
            />
          </Box>

          {/* 4 CHECKBOX ACTION ITEM ROWS ON DOCUMENT */}
          {checklistRows.map((y, idx) => (
            <group key={idx} position={[0, y, 0.05]}>
              {/* Checkbox Frame Box */}
              <Box args={[0.22, 0.22, 0.04]} position={[-0.45, 0, 0]}>
                <meshStandardMaterial color={logoGreen} emissive={logoGreen} emissiveIntensity={0.95} wireframe />
              </Box>

              {/* Glowing Checkmark Tick Symbol inside Checkbox */}
              <group position={[-0.45, 0, 0.03]} rotation={[0, 0, -Math.PI / 4]}>
                <Box args={[0.04, 0.12, 0.03]} position={[0.02, 0, 0]}>
                  <meshStandardMaterial color={logoGreen} emissive={logoGreen} emissiveIntensity={1.2} />
                </Box>
                <Box args={[0.07, 0.04, 0.03]} position={[-0.03, -0.04, 0]}>
                  <meshStandardMaterial color={logoGreen} emissive={logoGreen} emissiveIntensity={1.2} />
                </Box>
              </group>

              {/* Action Item Clause Lines */}
              <Box args={[0.62, 0.04, 0.03]} position={[0.1, 0.04, 0]}>
                <meshStandardMaterial color={logoGreen} emissive={logoGreen} emissiveIntensity={0.9} />
              </Box>
              <Box args={[0.42, 0.03, 0.03]} position={[0.0, -0.04, 0]}>
                <meshStandardMaterial color={lightGreen} emissive={lightGreen} emissiveIntensity={0.8} />
              </Box>
            </group>
          ))}
        </group>

        {/* 4 SURROUNDING FLOATING SECURITY/COMPLIANCE BADGES (GREEN & LIGHT GREEN) */}
        {/* 1. Top-Left: Lock Badge in Dashed Ring */}
        <group position={[-1.85, 0.85, 0.2]}>
          <Torus args={[0.42, 0.018, 16, 48]}>
            <meshStandardMaterial color={logoGreen} emissive={logoGreen} emissiveIntensity={1.0} wireframe />
          </Torus>
          {/* Lock Body */}
          <Box args={[0.24, 0.18, 0.08]} position={[0, -0.04, 0]}>
            <meshStandardMaterial color={logoGreen} emissive={logoGreen} emissiveIntensity={0.9} />
          </Box>
          {/* Lock Shackle */}
          <Torus args={[0.08, 0.02, 12, 24]} position={[0, 0.07, 0]} rotation={[0, 0, 0]}>
            <meshStandardMaterial color={whiteColor} emissive={logoGreen} emissiveIntensity={1.0} />
          </Torus>
        </group>

        {/* 2. Top-Right: Keyhole Shield Badge */}
        <group position={[1.85, 0.85, 0.2]}>
          <mesh geometry={shieldGeometry}>
            <meshStandardMaterial color={logoGreen} emissive={logoGreen} emissiveIntensity={0.95} wireframe />
          </mesh>
          <Sphere args={[0.07, 16, 16]} position={[0, 0.08, 0.06]}>
            <meshStandardMaterial color={logoGreen} emissive={logoGreen} emissiveIntensity={1.1} />
          </Sphere>
          <Cylinder args={[0.03, 0.06, 0.12, 8]} position={[0, -0.04, 0.06]}>
            <meshStandardMaterial color={logoGreen} emissive={logoGreen} emissiveIntensity={1.1} />
          </Cylinder>
        </group>

        {/* 3. Bottom-Left: Laptop Audit Screen Badge */}
        <group position={[-1.85, -0.75, 0.2]}>
          {/* Screen */}
          <Box args={[0.5, 0.35, 0.04]} position={[0, 0.08, 0]}>
            <meshStandardMaterial color={lightGreen} emissive={lightGreen} emissiveIntensity={0.9} wireframe />
          </Box>
          {/* Base */}
          <Box args={[0.58, 0.04, 0.22]} position={[0, -0.1, 0]}>
            <meshStandardMaterial color={logoGreen} emissive={logoGreen} emissiveIntensity={0.8} />
          </Box>
        </group>

        {/* 4. Bottom-Right: Checkmark Shield Badge */}
        <group position={[1.85, -0.75, 0.2]}>
          <mesh geometry={shieldGeometry}>
            <meshStandardMaterial color={logoGreen} emissive={logoGreen} emissiveIntensity={0.95} wireframe />
          </mesh>
          <group position={[0, 0, 0.06]} rotation={[0, 0, -Math.PI / 4]}>
            <Box args={[0.04, 0.16, 0.03]} position={[0.03, 0, 0]}>
              <meshStandardMaterial color={logoGreen} emissive={logoGreen} emissiveIntensity={1.2} />
            </Box>
            <Box args={[0.09, 0.04, 0.03]} position={[-0.04, -0.06, 0]}>
              <meshStandardMaterial color={logoGreen} emissive={logoGreen} emissiveIntensity={1.2} />
            </Box>
          </group>
        </group>

        {/* SWIRLING 3D GLITTER SPARKLE DUST CLOUD (GREEN & GOLD STARLIGHT) */}
        <group ref={glitterGroupRef}>
          <Points positions={glitterParticles} stride={3} frustumCulled={false}>
            <PointMaterial
              transparent
              color={logoGreen}
              size={0.065}
              sizeAttenuation={true}
              depthWrite={false}
              opacity={0.9}
            />
          </Points>
        </group>
      </group>
    </Float>
  );
}

export default function RemediationTimelineScene() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div style={{ width: "100%", height: "320px", position: "relative" }}>
      <Canvas
        camera={{ position: [0, 0, 5.0], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ powerPreference: "high-performance", antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={isDark ? 1.3 : 1.7} />
        <pointLight position={[6, 6, 6]} intensity={2.8} color="#ffffff" />
        <directionalLight position={[5, 8, 5]} intensity={2.4} color={isDark ? "#6effce" : "#059669"} />
        <directionalLight position={[-5, -5, -5]} intensity={1.5} color={isDark ? "#38bdf8" : "#2563eb"} />
        <GlowingRemediationChecklistDoc />
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.2} />
      </Canvas>
    </div>
  );
}

