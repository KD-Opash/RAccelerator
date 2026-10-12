"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

export function AnimatedBackground() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isDark = theme === "dark";

    // Optimized Grid Matrix Settings: Smooth 60fps on Windows & Integrated GPUs
    const SEPARATION_X = 42;
    const SEPARATION_Z = 42;
    const AMOUNT_X = Math.min(45, Math.max(28, Math.floor(width / 38)));
    const AMOUNT_Z = 28;

    let count = 0;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const render = () => {
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Ambient Luminous Blue Light Glow Fill
      const blueGlow = ctx.createRadialGradient(
        width / 2,
        height * 0.45,
        50,
        width / 2,
        height * 0.5,
        Math.max(width, height) * 0.75
      );
      if (isDark) {
        blueGlow.addColorStop(0, "rgba(14, 165, 233, 0.16)");
        blueGlow.addColorStop(0.45, "rgba(37, 99, 235, 0.08)");
        blueGlow.addColorStop(1, "rgba(2, 12, 24, 0.4)");
      } else {
        blueGlow.addColorStop(0, "rgba(56, 189, 248, 0.12)");
        blueGlow.addColorStop(0.5, "rgba(14, 165, 233, 0.05)");
        blueGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
      }
      ctx.fillStyle = blueGlow;
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height * 0.28;
      const fov = 390;

      count += 0.022;

      const colorEmerald = isDark ? "52, 211, 153" : "16, 185, 129";
      const colorMint = isDark ? "110, 255, 206" : "5, 150, 105";

      ctx.lineWidth = 0.8;

      for (let ix = 0; ix < AMOUNT_X; ix++) {
        for (let iz = 0; iz < AMOUNT_Z; iz++) {
          const x = (ix - AMOUNT_X / 2) * SEPARATION_X;
          const z = iz * SEPARATION_Z + 20;

          const waveY =
            Math.sin((ix + count * 1.2) * 0.2) * 32 +
            Math.sin((iz + count * 1.4) * 0.18) * 32;

          const y = 50 + waveY;

          const scale = fov / (fov + z);
          const projX = centerX + x * scale;
          const projY = centerY + y * scale;

          if (projX < -100 || projX > width + 100 || projY < -100 || projY > height + 100) {
            continue;
          }

          const depthRatio = 1 - iz / AMOUNT_Z;
          const alpha = depthRatio * depthRatio * (isDark ? 0.35 : 0.25);
          const particleRadius = Math.max(0.8, 2.2 * scale);

          // Render particle dot
          ctx.fillStyle = `rgba(${iz % 2 === 0 ? colorMint : colorEmerald}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(projX, projY, particleRadius, 0, Math.PI * 2);
          ctx.fill();

          // Connect neighbor line
          if (ix < AMOUNT_X - 1) {
            const nextX = (ix + 1 - AMOUNT_X / 2) * SEPARATION_X;
            const nextWaveY =
              Math.sin((ix + 1 + count * 1.2) * 0.2) * 32 +
              Math.sin((iz + count * 1.4) * 0.18) * 32;
            const nextProjX = centerX + nextX * scale;
            const nextProjY = centerY + (50 + nextWaveY) * scale;

            ctx.strokeStyle = `rgba(${colorMint}, ${alpha * 0.2})`;
            ctx.beginPath();
            ctx.moveTo(projX, projY);
            ctx.lineTo(nextProjX, nextProjY);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.3,
        transition: "opacity 0.3s ease",
      }}
    />
  );
}

