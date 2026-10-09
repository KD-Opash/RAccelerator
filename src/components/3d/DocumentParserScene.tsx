"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Box, Torus, Sphere, Cylinder, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "../ThemeProvider";

// 3D Glowing Holographic Workstation & Analytics Monitor
function FloatingHolographicWorkstation() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Strict Green & Light Green Theme Palette (No Blue/Navy):
  const primaryAccent = isDark ? "#6effce" : "#059669";
  const secondaryAccent = isDark ? "#34d399" : "#10b981";
  const whiteColor = "#ffffff";
  const darkNavy = isDark ? "#052e23" : "#064e3b";

  const groupRef = useRef<THREE.Group>(null!);
  const topHaloRef = useRef<THREE.Mesh>(null!);
  const bottomHaloRef = useRef<THREE.Mesh>(null!);
  const hudCardsGroupRef = useRef<THREE.Group>(null!);
  const glitterGroupRef = useRef<THREE.Group>(null!);

  // 180 Swirling Galaxy Stardust Sparkle Particles
  const glitterParticles = useMemo(() => {
    const pos = new Float32Array(180 * 3);
    for (let i = 0; i < 180; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 1.9 + Math.random() * 1.3;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  // Floating Holographic HUD Panels Spec around Monitor
  const hudCards = [
    { pos: [-1.45, 0.75, 0.4], size: [0.55, 0.4, 0.02], rot: [0.05, 0.25, 0], color: primaryAccent },
    { pos: [1.45, 0.75, 0.3], size: [0.6, 0.42, 0.02], rot: [0.05, -0.22, 0], color: primaryAccent },
    { pos: [-1.55, -0.2, 0.5], size: [0.5, 0.35, 0.02], rot: [0.08, 0.3, 0], color: secondaryAccent },
    { pos: [1.55, -0.2, 0.45], size: [0.52, 0.36, 0.02], rot: [0.08, -0.28, 0], color: primaryAccent },
  ];

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        state.pointer.x * 0.45 + Math.sin(t * 0.3) * 0.08,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -state.pointer.y * 0.25,
        0.05
      );
    }

    if (topHaloRef.current) {
      topHaloRef.current.rotation.z = t * 0.4;
      topHaloRef.current.position.y = 1.45 + Math.sin(t * 1.5) * 0.04;
    }

    if (bottomHaloRef.current) {
      bottomHaloRef.current.rotation.z = -t * 0.3;
      bottomHaloRef.current.position.y = -1.25 + Math.cos(t * 1.5) * 0.04;
    }

    if (hudCardsGroupRef.current) {
      hudCardsGroupRef.current.position.y = Math.sin(t * 0.8) * 0.05;
    }

    if (glitterGroupRef.current) {
      glitterGroupRef.current.rotation.y = t * 0.2;
    }
  });

  return (
    <Float speed={1.6} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef}>
        {/* 1. TOP NEON HALO RING */}
        <Torus ref={topHaloRef} args={[0.45, 0.022, 16, 64]} position={[0, 1.45, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color={primaryAccent} emissive={primaryAccent} emissiveIntensity={1.3} />
        </Torus>

        {/* 2. CENTRAL FLOATING MONITOR DISPLAY WORKSTATION */}
        <group position={[0, 0.1, 0]}>
          {/* Monitor Screen Frame / Casing */}
          <Box args={[1.9, 1.25, 0.1]} position={[0, 0.2, 0]}>
            <meshStandardMaterial color={darkNavy} emissive={darkNavy} emissiveIntensity={0.5} roughness={0.2} metalness={0.8} />
          </Box>

          {/* Glowing Monitor Border Neon Bevel */}
          <Box args={[1.96, 1.31, 0.11]} position={[0, 0.2, 0]}>
            <meshStandardMaterial color={primaryAccent} emissive={primaryAccent} emissiveIntensity={1.1} wireframe />
          </Box>

          {/* Monitor Screen Face Display */}
          <Box args={[1.82, 1.18, 0.12]} position={[0, 0.2, 0.01]}>
            <meshStandardMaterial color={isDark ? "#040e1a" : "#032e22"} emissive={darkNavy} emissiveIntensity={0.7} roughness={0.1} />
          </Box>

          {/* HUD UI DASHBOARD ELEMENTS ON SCREEN FACE */}
          {/* Main Analytics Metric Cards */}
          <group position={[-0.45, 0.38, 0.08]}>
            {/* Metric Box 1 */}
            <Box args={[0.42, 0.16, 0.02]} position={[0, 0, 0]}>
              <meshStandardMaterial color={primaryAccent} emissive={primaryAccent} emissiveIntensity={0.85} wireframe />
            </Box>
            <Sphere args={[0.035, 12, 12]} position={[-0.14, 0, 0.02]}>
              <meshStandardMaterial color={whiteColor} emissive={primaryAccent} emissiveIntensity={1.1} />
            </Sphere>
            <Box args={[0.18, 0.03, 0.02]} position={[0.04, 0.02, 0.02]}>
              <meshStandardMaterial color={whiteColor} emissive={whiteColor} emissiveIntensity={1.0} />
            </Box>
            <Box args={[0.14, 0.02, 0.02]} position={[0.02, -0.03, 0.02]}>
              <meshStandardMaterial color={primaryAccent} emissive={primaryAccent} emissiveIntensity={0.8} />
            </Box>

            {/* Metric Box 2 */}
            <Box args={[0.42, 0.16, 0.02]} position={[0, -0.22, 0]}>
              <meshStandardMaterial color={primaryAccent} emissive={primaryAccent} emissiveIntensity={0.85} wireframe />
            </Box>
            <Sphere args={[0.035, 12, 12]} position={[-0.14, -0.22, 0.02]}>
              <meshStandardMaterial color={primaryAccent} emissive={primaryAccent} emissiveIntensity={1.1} />
            </Sphere>
            <Box args={[0.18, 0.03, 0.02]} position={[0.04, -0.2, 0.02]}>
              <meshStandardMaterial color={whiteColor} emissive={whiteColor} emissiveIntensity={1.0} />
            </Box>

            {/* Metric Box 3 */}
            <Box args={[0.42, 0.16, 0.02]} position={[0, -0.44, 0]}>
              <meshStandardMaterial color={primaryAccent} emissive={primaryAccent} emissiveIntensity={0.85} wireframe />
            </Box>
            <Sphere args={[0.035, 12, 12]} position={[-0.14, -0.44, 0.02]}>
              <meshStandardMaterial color={secondaryAccent} emissive={secondaryAccent} emissiveIntensity={1.1} />
            </Sphere>
            <Box args={[0.18, 0.03, 0.02]} position={[0.04, -0.42, 0.02]}>
              <meshStandardMaterial color={whiteColor} emissive={whiteColor} emissiveIntensity={1.0} />
            </Box>
          </group>

          {/* Right Dashboard Area: Chart & Gauges */}
          <group position={[0.35, 0.25, 0.08]}>
            {/* Chart Box */}
            <Box args={[0.75, 0.58, 0.02]} position={[0, 0, 0]}>
              <meshStandardMaterial color={primaryAccent} emissive={primaryAccent} emissiveIntensity={0.65} wireframe />
            </Box>
            {/* Chart Bars */}
            {[-0.26, -0.13, 0, 0.13, 0.26].map((x, idx) => (
              <Box key={idx} args={[0.06, 0.12 + idx * 0.07, 0.02]} position={[x, -0.15 + (idx * 0.035), 0.02]}>
                <meshStandardMaterial color={idx % 2 === 0 ? primaryAccent : secondaryAccent} emissive={idx % 2 === 0 ? primaryAccent : secondaryAccent} emissiveIntensity={1.0} />
              </Box>
            ))}

            {/* Circular Progress Gauge */}
            <Torus args={[0.16, 0.02, 16, 32]} position={[0, -0.42, 0.02]}>
              <meshStandardMaterial color={primaryAccent} emissive={primaryAccent} emissiveIntensity={1.0} />
            </Torus>
          </group>

          {/* Monitor Stand Base Cylinder */}
          <Cylinder args={[0.06, 0.08, 0.45, 16]} position={[0, -0.55, 0]}>
            <meshStandardMaterial color={darkNavy} emissive={primaryAccent} emissiveIntensity={0.4} metalness={0.9} />
          </Cylinder>

          {/* Pedestal Workstation Base Board */}
          <Box args={[1.7, 0.12, 1.1]} position={[0, -0.8, 0]}>
            <meshStandardMaterial color={darkNavy} emissive={darkNavy} emissiveIntensity={0.6} metalness={0.8} />
          </Box>
          <Box args={[1.74, 0.14, 1.14]} position={[0, -0.8, 0]}>
            <meshStandardMaterial color={primaryAccent} emissive={primaryAccent} emissiveIntensity={0.85} wireframe />
          </Box>

          {/* Floating Illuminated Keyboard & Mouse */}
          <Box args={[0.7, 0.03, 0.25]} position={[-0.15, -0.71, 0.25]}>
            <meshStandardMaterial color={primaryAccent} emissive={primaryAccent} emissiveIntensity={0.95} wireframe />
          </Box>
          <Box args={[0.12, 0.04, 0.18]} position={[0.55, -0.71, 0.25]}>
            <meshStandardMaterial color={primaryAccent} emissive={primaryAccent} emissiveIntensity={0.9} />
          </Box>
        </group>

        {/* 3. BOTTOM NEON HALO BASE RING */}
        <Torus ref={bottomHaloRef} args={[1.15, 0.035, 16, 64]} position={[0, -1.25, 0]} rotation={[Math.PI / 2.3, 0, 0]}>
          <meshStandardMaterial color={secondaryAccent} emissive={secondaryAccent} emissiveIntensity={1.5} />
        </Torus>

        {/* 4. FLOATING HOLOGRAPHIC HUD CARDS ORBITING WORKSTATION */}
        <group ref={hudCardsGroupRef}>
          {hudCards.map((card, idx) => (
            <group key={idx} position={card.pos as [number, number, number]} rotation={card.rot as [number, number, number]}>
              {/* Glass Card Base */}
              <Box args={card.size as [number, number, number]}>
                <meshStandardMaterial
                  color={darkNavy}
                  emissive={card.color}
                  emissiveIntensity={0.4}
                  transparent
                  opacity={0.85}
                />
              </Box>
              {/* Card Wireframe Border */}
              <Box args={[card.size[0] + 0.02, card.size[1] + 0.02, card.size[2] + 0.01]}>
                <meshStandardMaterial color={card.color} emissive={card.color} emissiveIntensity={1.1} wireframe />
              </Box>
              {/* Card Contents Lines */}
              <Box args={[card.size[0] * 0.7, 0.03, 0.03]} position={[0, 0.08, 0.02]}>
                <meshStandardMaterial color={whiteColor} emissive={whiteColor} emissiveIntensity={1.0} />
              </Box>
              <Box args={[card.size[0] * 0.5, 0.025, 0.03]} position={[-0.05, -0.04, 0.02]}>
                <meshStandardMaterial color={card.color} emissive={card.color} emissiveIntensity={0.85} />
              </Box>
            </group>
          ))}
        </group>

        {/* 5. SWIRLING 3D GALAXY STARLIGHT SPARKLE DUST */}
        <group ref={glitterGroupRef}>
          <Points positions={glitterParticles} stride={3} frustumCulled={false}>
            <PointMaterial
              transparent
              color={primaryAccent}
              size={0.06}
              sizeAttenuation={true}
              depthWrite={false}
              opacity={0.9}
            />
          </Points>

          {/* Glowing Diamond Sparkle Orbs */}
          {[
            [-1.2, 1.2, 0.4],
            [1.25, 1.1, 0.3],
            [-1.3, -0.9, 0.4],
            [1.3, -0.8, 0.4],
          ].map((p, i) => (
            <Sphere key={i} args={[0.045, 12, 12]} position={p as [number, number, number]}>
              <meshStandardMaterial color={whiteColor} emissive={i % 2 === 0 ? primaryAccent : secondaryAccent} emissiveIntensity={1.4} />
            </Sphere>
          ))}
        </group>
      </group>
    </Float>
  );
}

export default function DocumentParserScene() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div style={{ width: "100%", height: "320px", position: "relative" }}>
      <Canvas camera={{ position: [0, 0, 5.1], fov: 45 }} style={{ background: "transparent" }}>
        <ambientLight intensity={isDark ? 1.3 : 1.7} />
        <pointLight position={[6, 6, 6]} intensity={2.8} color="#ffffff" />
        <directionalLight position={[5, 8, 5]} intensity={2.5} color={isDark ? "#38bdf8" : "#0284c7"} />
        <directionalLight position={[-5, -5, -5]} intensity={1.8} color={isDark ? "#c084fc" : "#9333ea"} />
        <FloatingHolographicWorkstation />
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.2} />
      </Canvas>
    </div>
  );
}
