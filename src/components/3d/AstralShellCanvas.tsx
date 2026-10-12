"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "../ThemeProvider";

interface Node3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  pulsePhase: number;
}

export default function AstralShellCanvas() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 220);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 220);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Generate 3D Fibonacci Sphere Point Distribution for Astral Shell
    const numPoints = 65;
    const radius = Math.min(width, height) * 0.38;
    const nodes: Node3D[] = [];

    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      nodes.push({
        x: x * radius,
        y: y * radius,
        z: z * radius,
        baseX: x * radius,
        baseY: y * radius,
        baseZ: z * radius,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    let angleX = 0.003;
    let angleY = 0.006;
    let rotX = 0;
    let rotY = 0;

    // Colors matching brand palette for Light & Dark mode
    const primaryColor = isDark ? "#6effce" : "#059669";
    const secondaryColor = isDark ? "#38bdf8" : "#0284c7";
    const nodeColor = isDark ? "#ffffff" : "#10b981";

    const maxDistance = radius * 0.72;
    const maxDistSq = maxDistance * maxDistance;

    const render = () => {
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      rotX += angleX;
      rotY += angleY;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      const projectedNodes: { x: number; y: number; z: number; pulse: number }[] = [];

      // Rotate and project 3D points
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Rotate Y
        let x1 = n.x * cosY - n.z * sinY;
        let z1 = n.z * cosY + n.x * sinY;

        // Rotate X
        let y1 = n.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + n.y * sinX;

        n.x = x1;
        n.y = y1;
        n.z = z2;

        n.pulsePhase += 0.03;
        const pulse = 0.7 + Math.sin(n.pulsePhase) * 0.3;

        // Perspective Projection
        const fov = 300;
        const scale = fov / (fov + z2);
        const projX = width / 2 + x1 * scale;
        const projY = height / 2 + y1 * scale;

        projectedNodes.push({ x: projX, y: projY, z: z2, pulse });
      }

      // Draw Constellation Mesh Web Lines (Fast squared-distance check)
      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const p1 = projectedNodes[i];
          const p2 = projectedNodes[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / maxDistance) * 0.55 * ((p1.z + radius) / (radius * 2));
            if (alpha > 0.02) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = i % 3 === 0 ? primaryColor : secondaryColor;
              ctx.globalAlpha = Math.min(alpha, 0.75);
              ctx.lineWidth = (1 - dist / maxDistance) * 1.4;
              ctx.stroke();
            }
          }
        }
      }

      // Draw Glowing Astral Constellation Point Nodes (No slow shadowBlur)
      for (let i = 0; i < projectedNodes.length; i++) {
        const p = projectedNodes[i];
        const alpha = Math.max(0.15, (p.z + radius) / (radius * 2));
        const r = (p.z > 0 ? 2.5 : 1.5) * p.pulse;

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = p.z > 20 ? nodeColor : primaryColor;
        ctx.globalAlpha = alpha;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
    />
  );
}
