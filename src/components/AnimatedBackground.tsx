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

    // 100% Full-Width & Full-Height Grid Matrix Settings
    const SEPARATION_X = 26;
    const SEPARATION_Z = 26;
    const AMOUNT_X = Math.max(170, Math.floor(width / 9));
    const AMOUNT_Z = 95; // Deep Z-grid coverage spanning top to bottom height

    let count = 0;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Ambient Luminous Blue Light Glow Fill (Blue Light Atmosphere)
      const blueGlow = ctx.createRadialGradient(
        width / 2,
        height * 0.45,
        50,
        width / 2,
        height * 0.5,
        Math.max(width, height) * 0.75
      );
      if (isDark) {
        blueGlow.addColorStop(0, "rgba(14, 165, 233, 0.16)");  // Bright Cyan Blue Light Core
        blueGlow.addColorStop(0.45, "rgba(37, 99, 235, 0.08)"); // Soft Indigo Blue
        blueGlow.addColorStop(1, "rgba(2, 12, 24, 0.4)");      // Dark Ambient Edge
      } else {
        blueGlow.addColorStop(0, "rgba(56, 189, 248, 0.12)");
        blueGlow.addColorStop(0.5, "rgba(14, 165, 233, 0.05)");
        blueGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
      }
      ctx.fillStyle = blueGlow;
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height * 0.28; // Center horizon angle to sweep 100% full height and width
      const fov = 390;

      count += 0.026; // Continuous smooth wave animation

      // Vibrant Green & Mint Glow Color Palette (matching reference)
      const colorEmerald = isDark ? [52, 211, 153] : [16, 185, 129]; // Glowing Mint Green (#34d399 / #10b981)
      const colorMint = isDark ? [110, 255, 206] : [5, 150, 105];   // Bright Neon Mint (#6effce / #059669)

      for (let ix = 0; ix < AMOUNT_X; ix++) {
        for (let iz = 0; iz < AMOUNT_Z; iz++) {
          // World coordinates centered
          const x = (ix - AMOUNT_X / 2) * SEPARATION_X;
          const z = iz * SEPARATION_Z + 15;

          // Continuous multi-harmonic 3D wave calculation for smooth organic terrain
          const waveY =
            Math.sin((ix + count * 1.3) * 0.15) * 38 +
            Math.sin((iz + count * 1.6) * 0.13) * 38 +
            Math.cos((ix + iz + count * 1.0) * 0.1) * 24;

          // Elevation offset
          const y = 50 + waveY;

          // 3D Projection to 2D Screen Space
          const scale = fov / (fov + z);
          const projX = centerX + x * scale;
          const projY = centerY + y * scale;

          if (projX < -350 || projX > width + 350 || projY < -250 || projY > height + 250) {
            continue;
          }

          // Depth opacity fade - soft ambient glow for high UI contrast
          const depthRatio = 1 - iz / AMOUNT_Z;
          const alpha = Math.max(0.08, depthRatio * depthRatio * (isDark ? 0.65 : 0.45));
          const particleRadius = Math.max(0.7, 3.0 * scale);

          // Luminous color blend based on wave peaks
          const waveRatio = (Math.sin(ix * 0.14 + iz * 0.09 + count * 1.2) + 1) / 2;
          const r = Math.round(colorEmerald[0] * (1 - waveRatio) + colorMint[0] * waveRatio);
          const g = Math.round(colorEmerald[1] * (1 - waveRatio) + colorMint[1] * waveRatio);
          const b = Math.round(colorEmerald[2] * (1 - waveRatio) + colorMint[2] * waveRatio);

          // Render glowing green particle dot
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(projX, projY, particleRadius, 0, Math.PI * 2);
          ctx.fill();

          // Connect X-neighbor particles with soft ambient grid lines
          if (ix < AMOUNT_X - 1) {
            const nextX = (ix + 1 - AMOUNT_X / 2) * SEPARATION_X;
            const nextWaveY =
              Math.sin((ix + 1 + count * 1.3) * 0.15) * 38 +
              Math.sin((iz + count * 1.6) * 0.13) * 38 +
              Math.cos((ix + 1 + iz + count * 1.0) * 0.1) * 24;
            const nextY = 50 + nextWaveY;

            const nextScale = fov / (fov + z);
            const nextProjX = centerX + nextX * nextScale;
            const nextProjY = centerY + nextY * nextScale;

            if (Math.abs(projX - nextProjX) < 170) {
              ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.25})`;
              ctx.lineWidth = 0.6 * scale;
              ctx.beginPath();
              ctx.moveTo(projX, projY);
              ctx.lineTo(nextProjX, nextProjY);
              ctx.stroke();
            }
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
        opacity: 0.42,
        filter: "blur(3px)",
        WebkitFilter: "blur(3px)",
        transition: "opacity 0.3s ease",
      }}
    />
  );
}

