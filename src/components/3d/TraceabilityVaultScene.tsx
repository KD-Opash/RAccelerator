"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Cylinder, Sphere, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "../ThemeProvider";

// 3D Concentric Polygon Tunnel Portal (Matching Reference Image)
function PolygonTunnelVortex() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Strict Green & Light Green Palette (Transparent Glass)
  const primaryGreen = isDark ? "#6effce" : "#059669";
  const lightGreen = isDark ? "#34d399" : "#10b981";
  const whiteColor = "#ffffff";

  const tunnelGroupRef = useRef<THREE.Group>(null!);
  const glitterGroupRef = useRef<THREE.Group>(null!);

  // 14 Nested Concentric Octagon Wireframe Rings forming 3D Vortex Tunnel
  const ringLayers = useMemo(() => {
    const layers = [];
    const count = 14;
    for (let i = 0; i < count; i++) {
      const progress = i / (count - 1); // 0 to 1
      const radius = 2.0 * Math.pow(0.78, i); // Scaled to fit canvas 100%
      const z = 0.8 - progress * 2.8;         // Depth tunnel
      const rotZ = i * 0.15;                  // Twisted geometric angle
      const opacity = 0.95 - progress * 0.45;
      const color = i % 2 === 0 ? primaryGreen : lightGreen;
      layers.push({ radius, z, rotZ, opacity, color });
    }
    return layers;
  }, [primaryGreen, lightGreen]);

  // 180 Swirling Stardust Particles
  const glitterParticles = useMemo(() => {
    const pos = new Float32Array(180 * 3);
    for (let i = 0; i < 180; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 1.4 + Math.random() * 1.2;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (tunnelGroupRef.current) {
      tunnelGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        tunnelGroupRef.current.rotation.y,
        state.pointer.x * 0.45 + Math.sin(t * 0.3) * 0.08,
        0.05
      );
      tunnelGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        tunnelGroupRef.current.rotation.x,
        -state.pointer.y * 0.35,
        0.05
      );
      tunnelGroupRef.current.rotation.z = t * 0.15; // Continuous hypnotic vortex rotation
    }

    if (glitterGroupRef.current) {
      glitterGroupRef.current.rotation.y = -t * 0.2;
    }
  });

  return (
    <Float speed={1.6} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={tunnelGroupRef}>
        {/* 1. NESTED CONCENTRIC POLYGON WIREFRAME RINGS (VORTEX TUNNEL) */}
        {ringLayers.map((layer, idx) => (
          <group key={idx} position={[0, 0, layer.z]} rotation={[0, 0, layer.rotZ]}>
            {/* Outer Octagon Wireframe Ring */}
            <Cylinder args={[layer.radius, layer.radius, 0.05, 8, 1, true]}>
              <meshBasicMaterial
                color={layer.color}
                wireframe
                transparent
                opacity={layer.opacity}
              />
            </Cylinder>

            {/* Inner Fine Accent Ring */}
            <Cylinder args={[layer.radius * 0.96, layer.radius * 0.96, 0.02, 8, 1, true]}>
              <meshBasicMaterial
                color={whiteColor}
                wireframe
                transparent
                opacity={layer.opacity * 0.7}
              />
            </Cylinder>
          </group>
        ))}

        {/* 2. CENTRAL GLOWING NODE ORB AT THE DEEP END OF TUNNEL */}
        <Sphere args={[0.075, 16, 16]} position={[0, 0, -2.1]}>
          <meshStandardMaterial
            color={whiteColor}
            emissive={primaryGreen}
            emissiveIntensity={1.5}
          />
        </Sphere>

        {/* 3. SWIRLING 3D STARDUST PARTICLES */}
        <group ref={glitterGroupRef}>
          <Points positions={glitterParticles} stride={3} frustumCulled={false}>
            <PointMaterial
              transparent
              color={primaryGreen}
              size={0.065}
              sizeAttenuation={true}
              depthWrite={false}
              opacity={0.9}
            />
          </Points>

          {/* Floating Starlight Verification Nodes */}
          {[
            [-1.3, 0.95, 0.2],
            [1.3, 0.95, 0.2],
            [-1.3, -0.95, -0.4],
            [1.3, -0.95, -0.4],
          ].map((pos, idx) => (
            <Sphere key={idx} args={[0.045, 12, 12]} position={pos as [number, number, number]}>
              <meshStandardMaterial color={whiteColor} emissive={primaryGreen} emissiveIntensity={1.3} />
            </Sphere>
          ))}
        </group>
      </group>
    </Float>
  );
}

export default function TraceabilityVaultScene() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div style={{ width: "100%", height: "400px", position: "relative" }}>
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ powerPreference: "high-performance", antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={isDark ? 1.3 : 1.7} />
        <pointLight position={[6, 6, 6]} intensity={2.8} color="#ffffff" />
        <directionalLight position={[5, 8, 5]} intensity={2.5} color={isDark ? "#6effce" : "#059669"} />
        <directionalLight position={[-5, -5, -5]} intensity={1.8} color={isDark ? "#34d399" : "#10b981"} />
        <PolygonTunnelVortex />
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.2} />
      </Canvas>
    </div>
  );
}
