"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sphere, Points, PointMaterial, Instances, Instance } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "../ThemeProvider";

// 3D Geodesic Constellation Network Sphere & Orbital Galaxy Dust
function GlowingConstellationNetworkSphere() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Strict Green & Light Green Theme Palette (No Blue/Navy):
  const primaryAccent = isDark ? "#6effce" : "#059669";
  const secondaryAccent = isDark ? "#34d399" : "#10b981";
  const whiteColor = "#ffffff";
  const innerGlobeColor = isDark ? "#052e23" : "#064e3b";

  const groupRef = useRef<THREE.Group>(null!);
  const innerSphereRef = useRef<THREE.Mesh>(null!);
  const outerSpikesGroupRef = useRef<THREE.Group>(null!);
  const glitterGroupRef = useRef<THREE.Group>(null!);

  // Optimized Particle Counts for smooth 60fps on Windows & mobile GPUs
  const galaxyDustInner = useMemo(() => {
    const count = 180;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 1.25 + Math.random() * 0.7; // Shell around central sphere
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  const galaxySpiralArm = useMemo(() => {
    const count = 220;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 4;
      const dist = 1.3 + (angle / (Math.PI * 4)) * 1.5;
      const spread = (Math.random() - 0.5) * 0.45;
      const zSpread = (Math.random() - 0.5) * 0.35;

      pos[i * 3] = Math.cos(angle) * dist + spread;
      pos[i * 3 + 1] = zSpread + Math.sin(angle * 0.5) * 0.2;
      pos[i * 3 + 2] = Math.sin(angle) * dist + spread;
    }
    return pos;
  }, []);

  const cosmicStarlight = useMemo(() => {
    const count = 130;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 1.8 + Math.random() * 1.5;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  // Floating Cosmic Node Orbs (Soft glowing galaxy nodes)
  const cosmicNodes = useMemo(() => {
    const nodes = [];
    for (let i = 0; i < 20; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 1.4 + Math.random() * 0.9;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      const color = i % 2 === 0 ? primaryAccent : whiteColor;
      const size = 0.04 + Math.random() * 0.05;
      nodes.push({ pos: [x, y, z] as [number, number, number], color, size });
    }
    return nodes;
  }, [primaryAccent, whiteColor]);

  // Geodesic Sphere Vertices for Vertex Node Lights
  const sphereVertices = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.15, 2);
    const posAttribute = geo.getAttribute("position");
    const points: [number, number, number][] = [];
    const seen = new Set<string>();

    for (let i = 0; i < posAttribute.count; i++) {
      const x = Number(posAttribute.getX(i).toFixed(2));
      const y = Number(posAttribute.getY(i).toFixed(2));
      const z = Number(posAttribute.getZ(i).toFixed(2));
      const key = `${x},${y},${z}`;
      if (!seen.has(key)) {
        seen.add(key);
        points.push([x, y, z]);
      }
    }
    geo.dispose();
    return points;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        state.pointer.x * 0.5 + t * 0.25,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -state.pointer.y * 0.35 + Math.sin(t * 0.4) * 0.12,
        0.05
      );
    }

    if (innerSphereRef.current) {
      innerSphereRef.current.rotation.y = -t * 0.45;
    }

    if (outerSpikesGroupRef.current) {
      outerSpikesGroupRef.current.rotation.y = t * 0.3;
      outerSpikesGroupRef.current.rotation.z = Math.sin(t * 0.2) * 0.15;
    }

    if (glitterGroupRef.current) {
      glitterGroupRef.current.rotation.y = -t * 0.2;
      glitterGroupRef.current.rotation.x = Math.cos(t * 0.25) * 0.1;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.35}>
      <group ref={groupRef}>
        {/* 1. CENTRAL GLOWING GEODESIC MESH SPHERE */}
        <mesh ref={innerSphereRef}>
          <icosahedronGeometry args={[1.15, 2]} />
          <meshBasicMaterial
            color={primaryAccent}
            wireframe
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* 2. INNER CORE GLOBE (TRANSPARENT GLASS) */}
        <Sphere args={[0.98, 20, 20]}>
          <meshStandardMaterial
            color={innerGlobeColor}
            emissive={primaryAccent}
            emissiveIntensity={0.35}
            transparent
            opacity={0.18}
            roughness={0.15}
            metalness={0.8}
          />
        </Sphere>

        {/* 3. VERTEX LIGHT NODES (GPU Instanced - 1 single draw call instead of 42 individual meshes) */}
        <Instances limit={sphereVertices.length} range={sphereVertices.length}>
          <sphereGeometry args={[0.048, 8, 8]} />
          <meshBasicMaterial toneMapped={false} />
          {sphereVertices.map((v, idx) => (
            <Instance
              key={idx}
              position={v}
              color={idx % 2 === 0 ? primaryAccent : whiteColor}
            />
          ))}
        </Instances>

        {/* 4. FLOATING GALAXY ORB NODES (GPU Instanced - 1 single draw call instead of 22 individual meshes) */}
        <Instances limit={cosmicNodes.length} range={cosmicNodes.length}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial toneMapped={false} />
          {cosmicNodes.map((node, idx) => (
            <Instance
              key={idx}
              position={node.pos}
              scale={node.size}
              color={node.color}
            />
          ))}
        </Instances>

        {/* 5. GALAXY SPIRAL ARM DUST RING */}
        <group ref={outerSpikesGroupRef}>
          <Points positions={galaxySpiralArm} stride={3} frustumCulled={false}>
            <PointMaterial
              transparent
              color={primaryAccent}
              size={0.055}
              sizeAttenuation={true}
              depthWrite={false}
              opacity={0.85}
            />
          </Points>

          <Points positions={galaxyDustInner} stride={3} frustumCulled={false}>
            <PointMaterial
              transparent
              color={secondaryAccent}
              size={0.045}
              sizeAttenuation={true}
              depthWrite={false}
              opacity={0.9}
            />
          </Points>
        </group>

        {/* 6. SWIRLING 3D COSMIC STARLIGHT DUST CLOUD */}
        <group ref={glitterGroupRef}>
          <Points positions={cosmicStarlight} stride={3} frustumCulled={false}>
            <PointMaterial
              transparent
              color={primaryAccent}
              size={0.06}
              sizeAttenuation={true}
              depthWrite={false}
              opacity={0.95}
            />
          </Points>
        </group>
      </group>
    </Float>
  );
}

export default function DeviceClassificationScene() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div style={{ width: "100%", height: "320px", position: "relative" }}>
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          powerPreference: "high-performance",
          antialias: false,
          alpha: true,
          stencil: false,
          depth: true,
        }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={isDark ? 1.2 : 1.5} />
        <pointLight position={[6, 6, 6]} intensity={2.2} color="#ffffff" />
        <directionalLight position={[5, 8, 5]} intensity={2.0} color={isDark ? "#6effce" : "#059669"} />
        <directionalLight position={[-5, -5, -5]} intensity={1.2} color={isDark ? "#38bdf8" : "#2563eb"} />
        <GlowingConstellationNetworkSphere />
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.2} />
      </Canvas>
    </div>
  );
}

