"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sphere, Torus, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "../ThemeProvider";

// 3D Cosmic Galaxy Shield with Full Circle Saturn Ring & Galaxy Stardust Cloud
function SilverShieldSaturnMesh() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Strict Green & Light Green Theme Palette (No Blue/Navy):
  const primaryAccent = isDark ? "#6effce" : "#059669";
  const secondaryAccent = isDark ? "#34d399" : "#10b981";
  const whiteColor = "#ffffff";
  const galaxyCoreColor = isDark ? "#052e23" : "#064e3b";

  const mainGroupRef = useRef<THREE.Group>(null!);
  const shieldCoreRef = useRef<THREE.Group>(null!);
  const saturnRingRef = useRef<THREE.Mesh>(null!);
  const glitterGroupRef = useRef<THREE.Group>(null!);
  const radarFloorRef = useRef<THREE.Group>(null!);

  // 260 Multi-color Glowing Galaxy Stardust Particles inside Shield Bounds
  const shieldMatrixParticles = useMemo(() => {
    const pos = new Float32Array(260 * 3);
    for (let i = 0; i < 260; i++) {
      const y = (Math.random() * 2.5) - 1.3;
      const factor = y < 0 ? (y + 1.3) / 1.3 : (1.4 - y) / 1.4;
      const widthMax = Math.max(0.15, 0.95 * Math.sqrt(Math.max(0, factor)));
      const x = (Math.random() * 2 - 1) * widthMax;
      const z = (Math.random() * 2 - 1) * 0.12 + 0.08;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }
    return pos;
  }, []);

  // 180 Swirling 3D Galaxy Stardust Cloud Particles
  const glitterParticles = useMemo(() => {
    const pos = new Float32Array(180 * 3);
    for (let i = 0; i < 180; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 1.6 + Math.random() * 1.3;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  // 3D Shield Shape Path (Preserved Shape)
  const shieldGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 1.35);
    shape.lineTo(0.55, 1.55);
    shape.bezierCurveTo(1.05, 1.4, 1.25, 0.95, 1.25, 0.35);
    shape.bezierCurveTo(1.25, -0.45, 0.7, -1.15, 0, -1.65);
    shape.bezierCurveTo(-0.7, -1.15, -1.25, -0.45, -1.25, 0.35);
    shape.bezierCurveTo(-1.25, 0.95, -1.05, 1.4, -0.55, 1.55);
    shape.lineTo(0, 1.35);

    const extrudeSettings = {
      depth: 0.2,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 3,
      bevelSize: 0.1,
      bevelThickness: 0.1,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (mainGroupRef.current) {
      mainGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        mainGroupRef.current.rotation.y,
        state.pointer.x * 0.55,
        0.05
      );
      mainGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        mainGroupRef.current.rotation.x,
        -state.pointer.y * 0.35,
        0.05
      );
    }

    if (shieldCoreRef.current) {
      shieldCoreRef.current.rotation.y = Math.sin(t * 0.9) * 0.12;
    }

    if (saturnRingRef.current) {
      saturnRingRef.current.rotation.z = t * 0.4;
    }

    if (glitterGroupRef.current) {
      glitterGroupRef.current.rotation.y = t * 0.25;
    }

    if (radarFloorRef.current) {
      radarFloorRef.current.rotation.z = t * 0.15;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.35}>
      <group ref={mainGroupRef}>
        {/* (Bottom radial rings removed as requested) */}

        <group ref={shieldCoreRef} position={[0, 0, -0.1]}>
          {/* 1. GLOWING GALAXY MIDNIGHT GLASS SHIELD CORE (TRANSPARENT GLASS) */}
          <mesh geometry={shieldGeometry} scale={[1.0, 1.0, 1.0]} position={[0, 0, 0.08]}>
            <meshStandardMaterial
              color={galaxyCoreColor}
              emissive={primaryAccent}
              emissiveIntensity={0.3}
              transparent
              opacity={0.18}
              roughness={0.05}
              metalness={0.9}
            />
          </mesh>

          {/* 2. COSMIC WIREFRAME LATTICE OVERLAY */}
          <mesh geometry={shieldGeometry} scale={[1.003, 1.003, 1.003]} position={[0, 0, 0.085]}>
            <meshStandardMaterial
              color={primaryAccent}
              emissive={primaryAccent}
              emissiveIntensity={0.95}
              wireframe
              transparent
              opacity={0.85}
            />
          </mesh>

          {/* 3. INTERNAL GALAXY STARDUST PARTICLES */}
          <group position={[0, 0, 0.08]}>
            <Points positions={shieldMatrixParticles} stride={3} frustumCulled={false}>
              <PointMaterial
                transparent
                color={primaryAccent}
                size={0.07}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.95}
              />
            </Points>
          </group>
        </group>

        {/* 4. FULL CIRCLE SATURN ORBITAL RING ENCIRCLING SHIELD */}
        <Torus ref={saturnRingRef} args={[2.0, 0.035, 16, 64]} rotation={[Math.PI / 2.6, -Math.PI / 6, 0]}>
          <meshStandardMaterial color={primaryAccent} emissive={primaryAccent} emissiveIntensity={0.9} roughness={0.1} />
        </Torus>

        {/* Secondary Outer Fine Orbit Ring */}
        <Torus args={[2.25, 0.015, 16, 64]} rotation={[Math.PI / 2.6, -Math.PI / 6, 0]}>
          <meshStandardMaterial color={whiteColor} emissive={whiteColor} emissiveIntensity={0.85} wireframe />
        </Torus>

        {/* SWIRLING 3D GALAXY SPARKLE DUST CLOUD */}
        <group ref={glitterGroupRef}>
          <Points positions={glitterParticles} stride={3} frustumCulled={false}>
            <PointMaterial
              transparent
              color={primaryAccent}
              size={0.07}
              sizeAttenuation={true}
              depthWrite={false}
              opacity={0.9}
            />
          </Points>

          {/* Orbiting Galaxy Verification Nodes */}
          {[
            [2.0, 0.4, 0],
            [-2.0, -0.4, 0],
            [0, 2.0, 0.3],
            [0, -2.0, -0.3],
          ].map((pos, idx) => (
            <group key={idx} position={pos as [number, number, number]}>
              <Sphere args={[0.17, 16, 16]}>
                <meshStandardMaterial
                  color={idx % 2 === 0 ? primaryAccent : whiteColor}
                  emissive={idx % 2 === 0 ? primaryAccent : whiteColor}
                  emissiveIntensity={1.1}
                />
              </Sphere>
            </group>
          ))}
        </group>
      </group>
    </Float>
  );
}

export default function GsprHealthScene() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div style={{ width: "100%", height: "400px", position: "relative" }}>
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} style={{ background: "transparent" }}>
        <ambientLight intensity={isDark ? 1.3 : 1.7} />
        <pointLight position={[6, 6, 6]} intensity={2.8} color="#ffffff" />
        <directionalLight position={[5, 8, 5]} intensity={2.4} color={isDark ? "#cbd5e1" : "#ffffff"} />
        <directionalLight position={[-5, -5, -5]} intensity={1.5} color={isDark ? "#38bdf8" : "#2563eb"} />
        <SilverShieldSaturnMesh />
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.2} />
      </Canvas>
    </div>
  );
}
