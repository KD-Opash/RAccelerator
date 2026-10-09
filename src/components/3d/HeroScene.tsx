"use client";

import React from "react";
import { useTheme } from "../ThemeProvider";
import AstralShellCanvas from "./AstralShellCanvas";

export default function HeroScene() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Light green / brand emerald mint palette for Light mode
  const mintColor = isDark ? "#6effce" : "#059669";
  const cyanColor = isDark ? "#38bdf8" : "#34d399";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: "220px",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible",
      }}
    >
      {/* Keyframe Animations for Ring Dash Flow, Orbiting Moons & Dynamic Floating Sphere */}
      <style jsx>{`
        @keyframes ringDashFlow {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: 40;
          }
        }

        @keyframes sphereFloatPulse {
          0%, 100% {
            transform: translateY(0px) scale(1);
            filter: drop-shadow(0 0 18px ${isDark ? "rgba(110, 255, 206, 0.35)" : "rgba(5, 150, 105, 0.35)"});
          }
          50% {
            transform: translateY(-9px) scale(1.04);
            filter: drop-shadow(0 0 38px ${isDark ? "rgba(110, 255, 206, 0.65)" : "rgba(5, 150, 105, 0.55)"});
          }
        }

        @keyframes moonOrbitInner {
          0% {
            transform: rotate(0deg) translateX(130px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(130px) rotate(-360deg);
          }
        }

        @keyframes moonOrbitOuter {
          0% {
            transform: rotate(360deg) translateX(144px) rotate(-360deg);
          }
          100% {
            transform: rotate(0deg) translateX(144px) rotate(0deg);
          }
        }
      `}</style>

      {/* 3D SATURN SYSTEM CONTAINER WITH REACT BITS ASTRAL SHELL GLOBE */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          animation: "sphereFloatPulse 4.8s ease-in-out infinite",
        }}
      >
        {/* BACK SATURN RING (PASSES BEHIND TOP HALF OF SPHERE - zIndex 1) */}
        <div
          style={{
            position: "absolute",
            width: "310px",
            height: "310px",
            transform: "rotateX(74deg) rotateY(-16deg)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          <svg
            viewBox="0 0 310 310"
            style={{
              width: "100%",
              height: "100%",
              overflow: "visible",
            }}
          >
            <defs>
              <linearGradient id="saturnRingGradBack" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={mintColor} stopOpacity="0.45" />
                <stop offset="50%" stopColor={cyanColor} stopOpacity="0.35" />
                <stop offset="100%" stopColor={mintColor} stopOpacity="0.45" />
              </linearGradient>
            </defs>
            {/* Top Back Arc (BEHIND SPHERE) */}
            <path
              d="M 285 155 A 130 130 0 0 0 25 155"
              fill="none"
              stroke="url(#saturnRingGradBack)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M 267 155 A 112 112 0 0 0 43 155"
              fill="none"
              stroke={mintColor}
              strokeWidth="1.2"
              strokeDasharray="6 6"
              style={{ animation: "ringDashFlow 8s linear infinite" }}
              opacity="0.45"
            />
            <path
              d="M 299 155 A 144 144 0 0 0 11 155"
              fill="none"
              stroke={cyanColor}
              strokeWidth="1"
              opacity="0.3"
            />
          </svg>
        </div>

        {/* CENTER 3D REACT BITS ASTRAL SHELL CONSTELLATION GLOBE (zIndex 2) */}
        <div
          style={{
            position: "absolute",
            width: "190px",
            height: "190px",
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
            boxShadow: "none",
          }}
        >
          <AstralShellCanvas />
        </div>

        {/* FRONT SATURN RING (PASSES IN FRONT OF BOTTOM HALF OF SPHERE - zIndex 3) */}
        <div
          style={{
            position: "absolute",
            width: "310px",
            height: "310px",
            transform: "rotateX(74deg) rotateY(-16deg)",
            zIndex: 3,
            pointerEvents: "none",
          }}
        >
          <svg
            viewBox="0 0 310 310"
            style={{
              width: "100%",
              height: "100%",
              overflow: "visible",
            }}
          >
            <defs>
              <linearGradient id="saturnRingGradFront" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={mintColor} stopOpacity="0.95" />
                <stop offset="50%" stopColor={cyanColor} stopOpacity="0.75" />
                <stop offset="100%" stopColor={mintColor} stopOpacity="0.95" />
              </linearGradient>
            </defs>
            {/* Bottom Front Arc (IN FRONT OF SPHERE EQUATOR) */}
            <path
              d="M 285 155 A 130 130 0 0 1 25 155"
              fill="none"
              stroke="url(#saturnRingGradFront)"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <path
              d="M 267 155 A 112 112 0 0 1 43 155"
              fill="none"
              stroke={mintColor}
              strokeWidth="1.5"
              strokeDasharray="6 6"
              style={{ animation: "ringDashFlow 8s linear infinite" }}
              opacity="0.8"
            />
            <path
              d="M 299 155 A 144 144 0 0 1 11 155"
              fill="none"
              stroke={cyanColor}
              strokeWidth="1"
              opacity="0.55"
            />
          </svg>
        </div>

        {/* SATURN ORBITING MOONS / ENERGY PARTICLES (zIndex 4) */}
        <div
          style={{
            position: "absolute",
            width: "310px",
            height: "310px",
            borderRadius: "50%",
            transform: "rotateX(74deg) rotateY(-16deg)",
            zIndex: 4,
            pointerEvents: "none",
          }}
        >
          {/* Inner Moon Node */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "8px",
              height: "8px",
              marginTop: "-4px",
              marginLeft: "-4px",
              borderRadius: "50%",
              background: mintColor,
              boxShadow: `0 0 10px ${mintColor}`,
              animation: "moonOrbitInner 7s linear infinite",
            }}
          />

          {/* Outer Satellite Node */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "6px",
              height: "6px",
              marginTop: "-3px",
              marginLeft: "-3px",
              borderRadius: "50%",
              background: cyanColor,
              boxShadow: `0 0 8px ${cyanColor}`,
              animation: "moonOrbitOuter 11s linear infinite",
            }}
          />
        </div>
      </div>
    </div>
  );
}
