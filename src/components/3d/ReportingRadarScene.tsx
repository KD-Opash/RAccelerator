"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Box, Torus, Sphere, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "../ThemeProvider";

// 3D Isometric Glowing Command Center & Analytics Data Platform (Matching Image 1)
function GlowingAnalyticsCommandPlatform() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Strict Green & Light Green Theme Palette (No Blue/Navy):
  const primaryColor = isDark ? "#6effce" : "#059669";
  const secondaryColor = isDark ? "#34d399" : "#10b981";
  const lightAccent = isDark ? "#a7f3d0" : "#047857";
  const whiteColor = "#ffffff";
  const basePedestalColor = isDark ? "#052e23" : "#064e3b";

  const groupRef = useRef<THREE.Group>(null!);
  const hudLeftRef = useRef<THREE.Group>(null!);
  const hudRightRef = useRef<THREE.Group>(null!);
  const glitterGroupRef = useRef<THREE.Group>(null!);

  // 160 Swirling Data Stardust Particles
  const glitterParticles = useMemo(() => {
    const pos = new Float32Array(160 * 3);
    for (let i = 0; i < 160; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 1.8 + Math.random() * 1.3;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  // 7 3D Vertical Bar Chart Pillars standing on the glowing platform (Image 1 Spec)
  const barPillars = [
    { x: -0.6, z: -0.2, h: 0.9, color: secondaryColor },
    { x: -0.3, z: 0.15, h: 0.65, color: primaryColor },
    { x: -0.15, z: -0.3, h: 1.55, color: lightAccent },
    { x: 0.05, z: 0.2, h: 1.85, color: primaryColor },
    { x: 0.25, z: -0.15, h: 1.35, color: secondaryColor },
    { x: 0.45, z: 0.25, h: 0.8, color: lightAccent },
    { x: 0.65, z: -0.25, h: 1.25, color: primaryColor },
  ];

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        state.pointer.x * 0.45 + Math.sin(t * 0.25) * 0.06,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        0.45 - state.pointer.y * 0.25,
        0.05
      );
    }

    if (hudLeftRef.current) {
      hudLeftRef.current.position.y = Math.sin(t * 0.9) * 0.04;
    }
    if (hudRightRef.current) {
      hudRightRef.current.position.y = Math.cos(t * 0.9) * 0.04;
    }

    if (glitterGroupRef.current) {
      glitterGroupRef.current.rotation.y = t * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.25}>
      <group ref={groupRef} position={[0, -0.2, 0]} rotation={[0.45, 0.45, 0]}>
        {/* 1. ISOMETRIC BOTTOM BASE PEDESTAL PLATFORM */}
        <group position={[0, -1.1, 0]}>
          {/* Main Base Box */}
          <Box args={[2.3, 0.22, 2.1]}>
            <meshStandardMaterial
              color={basePedestalColor}
              emissive={primaryColor}
              emissiveIntensity={isDark ? 0.25 : 0.5}
              transparent
              opacity={isDark ? 0.15 : 0.6}
              roughness={0.2}
              metalness={0.8}
            />
          </Box>

          {/* Top Glowing Neon Light Pad */}
          <Box args={[2.15, 0.06, 1.95]} position={[0, 0.12, 0]}>
            <meshStandardMaterial
              color={primaryColor}
              emissive={primaryColor}
              emissiveIntensity={isDark ? 0.4 : 0.95}
              transparent
              opacity={isDark ? 0.2 : 0.85}
              roughness={0.1}
            />
          </Box>
          <Box args={[2.22, 0.08, 2.02]} position={[0, 0.12, 0]}>
            <meshStandardMaterial
              color={whiteColor}
              emissive={primaryColor}
              emissiveIntensity={1.1}
              wireframe
            />
          </Box>
        </group>

        {/* 2. 3D VERTICAL BAR PILLAR CHART (RICH GREEN GRAPH IN LIGHT THEME) */}
        <group position={[0, -0.95, 0]}>
          {barPillars.map((bar, idx) => (
            <group key={idx} position={[bar.x, bar.h / 2, bar.z]}>
              {/* Main Glowing 3D Pillar */}
              <Box args={[0.22, bar.h, 0.22]}>
                <meshStandardMaterial
                  color={bar.color}
                  emissive={bar.color}
                  emissiveIntensity={isDark ? 0.5 : 0.9}
                  transparent
                  opacity={isDark ? 0.25 : 0.88}
                  roughness={0.1}
                  metalness={0.7}
                />
              </Box>
              {/* Wireframe Bevel Edge */}
              <Box args={[0.235, bar.h + 0.01, 0.235]}>
                <meshStandardMaterial
                  color={whiteColor}
                  emissive={whiteColor}
                  emissiveIntensity={0.95}
                  wireframe
                />
              </Box>
              {/* Top Glowing Cap Sphere */}
              <Sphere args={[0.04, 12, 12]} position={[0, bar.h / 2 + 0.03, 0]}>
                <meshStandardMaterial color={whiteColor} emissive={whiteColor} emissiveIntensity={1.4} />
              </Sphere>
            </group>
          ))}
        </group>

        {/* 3. LEFT ISOMETRIC HOLOGRAPHIC HUD ANALYTICS WALL (RICH GREEN GLASS) */}
        <group ref={hudLeftRef} position={[-1.3, 0.3, -0.4]} rotation={[0, Math.PI / 4, 0]}>
          {/* Glass Wall Base */}
          <Box args={[1.5, 1.1, 0.03]}>
            <meshStandardMaterial
              color={isDark ? basePedestalColor : "#044e3b"}
              emissive={primaryColor}
              emissiveIntensity={isDark ? 0.3 : 0.6}
              transparent
              opacity={isDark ? 0.2 : 0.85}
            />
          </Box>

          {/* Glowing Neon Border */}
          <Box args={[1.54, 1.14, 0.04]}>
            <meshStandardMaterial color={primaryColor} emissive={primaryColor} emissiveIntensity={1.0} wireframe />
          </Box>

          {/* Area Wave Graph Lines on Left Wall */}
          {[-0.4, -0.2, 0, 0.2, 0.4].map((x, idx) => (
            <Box key={idx} args={[0.12, 0.15 + idx * 0.08, 0.03]} position={[x, -0.25 + idx * 0.04, 0.02]}>
              <meshStandardMaterial color={isDark ? primaryColor : "#ffffff"} emissive={isDark ? primaryColor : "#ffffff"} emissiveIntensity={0.95} />
            </Box>
          ))}
          {/* Top Title Line */}
          <Box args={[1.2, 0.04, 0.03]} position={[0, 0.38, 0.02]}>
            <meshStandardMaterial color={whiteColor} emissive={whiteColor} emissiveIntensity={1.0} />
          </Box>
        </group>

        {/* 4. RIGHT ISOMETRIC HOLOGRAPHIC HUD DASHBOARD WALL (RICH GREEN GLASS) */}
        <group ref={hudRightRef} position={[1.3, 0.3, -0.4]} rotation={[0, -Math.PI / 4, 0]}>
          {/* Glass Wall Base */}
          <Box args={[1.5, 1.1, 0.03]}>
            <meshStandardMaterial
              color={isDark ? basePedestalColor : "#044e3b"}
              emissive={secondaryColor}
              emissiveIntensity={isDark ? 0.3 : 0.6}
              transparent
              opacity={isDark ? 0.2 : 0.85}
            />
          </Box>

          {/* Glowing Neon Border */}
          <Box args={[1.54, 1.14, 0.04]}>
            <meshStandardMaterial color={secondaryColor} emissive={secondaryColor} emissiveIntensity={1.0} wireframe />
          </Box>

          {/* Circular Radial Donut Progress Ring */}
          <Torus args={[0.22, 0.035, 16, 32]} position={[-0.35, 0.1, 0.02]}>
            <meshStandardMaterial color={primaryColor} emissive={primaryColor} emissiveIntensity={1.2} />
          </Torus>

          {/* Data Lines & Counters */}
          <Box args={[0.55, 0.04, 0.03]} position={[0.3, 0.22, 0.02]}>
            <meshStandardMaterial color={whiteColor} emissive={whiteColor} emissiveIntensity={1.0} />
          </Box>
          <Box args={[0.45, 0.03, 0.03]} position={[0.25, 0.08, 0.02]}>
            <meshStandardMaterial color={primaryColor} emissive={primaryColor} emissiveIntensity={0.9} />
          </Box>
          <Box args={[0.5, 0.03, 0.03]} position={[0.28, -0.06, 0.02]}>
            <meshStandardMaterial color={secondaryColor} emissive={secondaryColor} emissiveIntensity={0.85} />
          </Box>
        </group>

        {/* 5. SWIRLING 3D STARDUST DATA PARTICLES */}
        <group ref={glitterGroupRef}>
          <Points positions={glitterParticles} stride={3} frustumCulled={false}>
            <PointMaterial
              transparent
              color={primaryColor}
              size={0.065}
              sizeAttenuation={true}
              depthWrite={false}
              opacity={0.9}
            />
          </Points>

          {/* Floating Data Sparkle Nodes */}
          {[
            [-0.8, 1.1, 0.2],
            [0.8, 1.1, 0.2],
            [-0.9, -0.4, 0.5],
            [0.9, -0.4, 0.5],
          ].map((pos, idx) => (
            <Sphere key={idx} args={[0.045, 12, 12]} position={pos as [number, number, number]}>
              <meshStandardMaterial color={whiteColor} emissive={primaryColor} emissiveIntensity={1.3} />
            </Sphere>
          ))}
        </group>
      </group>
    </Float>
  );
}

export default function ReportingRadarScene() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div style={{ width: "100%", height: "320px", position: "relative" }}>
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ powerPreference: "high-performance", antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={isDark ? 1.3 : 1.7} />
        <pointLight position={[6, 6, 6]} intensity={2.8} color="#ffffff" />
        <directionalLight position={[5, 8, 5]} intensity={2.5} color={isDark ? "#38bdf8" : "#059669"} />
        <directionalLight position={[-5, -5, -5]} intensity={1.8} color={isDark ? "#2563eb" : "#10b981"} />
        <GlowingAnalyticsCommandPlatform />
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.2} />
      </Canvas>
    </div>
  );
}
