"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import {
  FileText,
  Workflow,
  Wrench,
  FolderCheck,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  X,
  Sparkles,
} from "lucide-react";

export function RegulatoryProcessPipeline() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [activeModalStep, setActiveModalStep] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const brandLogoColor = isDark ? "#6effce" : "#059669";

  const pipelineSteps = [
    {
      id: 1,
      number: "01",
      title: "Requirements Ingestion",
      quote: "Turns regulatory requirements...",
      desc: "Ingests EU MDR Annex I GSPRs, IVDR Annex I, ISO 14971 & IEC 62304 specs.",
      icon: FileText,
      badge: "Ingestion Core",
      color: brandLogoColor,
      details: [
        "23 MDR Annex I GSPRs indexed",
        "ISO 14971 Hazard Risk Matrix cross-referenced",
        "IEC 62304 Class B software requirements mapped",
      ],
    },
    {
      id: 2,
      number: "02",
      title: "Device Workflows",
      quote: "...into device-specific workflows...",
      desc: "Executes Annex VIII Rules 9, 10, 11 to construct device risk class workflows.",
      icon: Workflow,
      badge: "Workflow Engine",
      color: brandLogoColor,
      details: [
        "Annex VIII Rule 11 SaMD determination: Class IIb",
        "Automated rule execution tree (100% deterministic)",
        "Zero probabilistic LLM hallucinations",
      ],
    },
    {
      id: 3,
      number: "03",
      title: "Remediation Plans",
      quote: "...and remediation plans, accelerating compliance...",
      desc: "Detects evidence gaps, builds action roadmaps, and estimates timelines.",
      icon: Wrench,
      badge: "Gap Remediation",
      color: brandLogoColor,
      details: [
        "1 Gap Identified: EN ISO 10993-5 Biocompatibility Test Report",
        "Estimated Effort: 3 Weeks • Assigned to RA Specialist",
        "Remediation Gantt chart generated",
      ],
    },
    {
      id: 4,
      number: "04",
      title: "Technical Documentation",
      quote: "...creating traceable & reproducible technical documentation...",
      desc: "Assembles Notified Body submission files with reproducible evidence anchoring.",
      icon: FolderCheck,
      badge: "Technical File",
      color: brandLogoColor,
      details: [
        "MDR Annex II & Annex III technical file folder structured",
        "Clinical Evaluation Report (CER) cross-referenced",
        "100% reproducible documentation exports",
      ],
    },
    {
      id: 5,
      number: "05",
      title: "Quality & 21 CFR 11",
      quote: "...without sacrificing quality, control and auditability.",
      desc: "Seals compliance chain with 21 CFR Part 11 SHA-256 cryptographic logs.",
      icon: ShieldCheck,
      badge: "21 CFR 11 Sealed",
      color: brandLogoColor,
      details: [
        "Cryptographic SHA-256 hash timestamp recorded",
        "Electronic signature line of custody verified",
        "Ready for Notified Body Stage 2 Audit",
      ],
    },
  ];

  return (
    <section
      id="section-process"
      style={{
        padding: "90px 24px 110px",
        maxWidth: "1340px",
        margin: "0 auto",
        position: "relative",
        overflow: "visible",
      }}
    >
      {/* Keyframe Animations for Animated White & Light Border Lighting Sheen */}
      <style jsx global>{`
        @keyframes rotateBorderBeam {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes laserDashOffset {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -720;
          }
        }

        @keyframes whiteLightPulse {
          0%, 100% {
            opacity: 0.85;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "70px" }}>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{
            lineHeight: 1.1,
            letterSpacing: "-0.035em",
            marginBottom: "18px",
          }}
        >
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(30px, 4.5vw, 53px)",
              color: isDark ? "#6effce" : "#059669",
              letterSpacing: "1px",
            }}
          >
            How RAccelerated Compliance
          </span>
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-sans)",
              fontWeight: 850,
              fontSize: "clamp(24px, 3.5vw, 38px)",
              color: isDark ? "#ffffff" : "#0f172a",
              letterSpacing: "1px",
              marginTop: "2px",
            }}
          >
            Works Step-by-Step
          </span>
        </motion.h2>
        <p
          style={{
            fontSize: "clamp(14px, 1.5vw, 16px)",
            lineHeight: 1.6,
            color: isDark ? "#94a3b8" : "#475569",
            maxWidth: "700px",
            margin: "0 auto",
            fontWeight: 450,
            fontFamily: "var(--font-sans)",
          }}
        >
          From raw regulatory requirements to an audited Notified Body submission folder — hover over any card to bring it to the front with white lighting sheen.
        </p>
      </div>

      {/* 3D FANNED DECK CARDS CONTAINER */}
      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: "420px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          perspective: "1200px",
        }}
        className="fanned-deck-wrapper"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "1100px",
            height: "380px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {pipelineSteps.map((step, index) => {
            const Icon = step.icon;
            const offset = index - 2; // -2, -1, 0, 1, 2
            const isHovered = hoveredIndex === index;
            const isAnyHovered = hoveredIndex !== null;

            // Default 3D Fanned Deck Overlapping Position & Rotation
            const defaultRotateZ = offset * 14; // -28deg, -14deg, 0deg, 14deg, 28deg
            const defaultTranslateX = offset * 85; // Tightly overlapped fanned deck
            const defaultTranslateY = Math.abs(offset) * 14;
            const defaultZIndex = 20 - Math.abs(offset) * 2;

            // Compute dynamic motion states based on hover
            let targetRotateZ = defaultRotateZ;
            let targetTranslateX = defaultTranslateX;
            let targetTranslateY = defaultTranslateY;
            let targetScale = 1;
            let targetZIndex = defaultZIndex;
            let targetOpacity = 1;

            if (isHovered) {
              targetRotateZ = 0; // Pops straight upright
              targetTranslateY = -60; // Lifts upwards
              targetScale = 1.15; // Scales up cleanly
              targetZIndex = 100; // Brings directly to FRONT!
              targetOpacity = 1;
            } else if (isAnyHovered) {
              targetOpacity = 0.55; // Dims non-hovered cards
              targetScale = 0.93;
              // Push cards outward to clear space for hovered card
              if (index < hoveredIndex) {
                targetTranslateX = defaultTranslateX - 55;
              } else {
                targetTranslateX = defaultTranslateX + 55;
              }
            }

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 60, rotateZ: defaultRotateZ, x: defaultTranslateX }}
                whileInView={{ opacity: targetOpacity, y: targetTranslateY, rotateZ: targetRotateZ, x: targetTranslateX }}
                viewport={{ once: true }}
                animate={{
                  rotateZ: targetRotateZ,
                  x: targetTranslateX,
                  y: targetTranslateY,
                  scale: targetScale,
                  opacity: targetOpacity,
                }}
                transition={{
                  type: "spring",
                  stiffness: 480,
                  damping: 34,
                  mass: 0.3,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onClick={() => setActiveModalStep(step.id)}
                className="fanned-card glass-panel"
                style={{
                  position: "absolute",
                  width: "250px",
                  height: "360px",
                  borderRadius: "24px",
                  padding: "24px 20px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  background: isDark ? "rgba(10, 27, 46, 0.96)" : "#ffffff",
                  boxShadow: isHovered
                    ? isDark
                      ? "0 0 25px rgba(255, 255, 255, 0.9), 0 0 35px rgba(255, 255, 255, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.8), 0 20px 40px rgba(0,0,0,0.4)"
                      : "0 0 25px rgba(255, 255, 255, 1), 0 0 30px rgba(255, 255, 255, 0.75), inset 0 0 20px rgba(255, 255, 255, 0.85), 0 20px 40px rgba(0,0,0,0.12)"
                    : "0 15px 30px rgba(0,0,0,0.15)",
                  zIndex: targetZIndex,
                  transformOrigin: "bottom center",
                  WebkitBackdropFilter: "blur(10px)",
                  backdropFilter: "blur(10px)",
                  willChange: "transform, opacity",
                  border: isHovered
                    ? "2px solid transparent"
                    : isDark
                    ? "1px solid rgba(255, 255, 255, 0.12)"
                    : "1px solid rgba(5, 150, 105, 0.15)",
                }}
              >
                {/* ANIMATED PURE WHITE BORDER LIGHTING BEAM & MINIMAL SHADING ON HOVER (ALWAYS MOUNTED FOR 60FPS OPACITY FADE) */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "24px",
                    pointerEvents: "none",
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.2s ease-in-out",
                    zIndex: 1,
                  }}
                >
                  {/* 1. Rotating Conic White Light Beam Tracer */}
                  <div
                    style={{
                      position: "absolute",
                      inset: "-3.5px",
                      borderRadius: "27.5px",
                      overflow: "hidden",
                      pointerEvents: "none",
                      zIndex: 1,
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "-75%",
                        left: "-75%",
                        width: "250%",
                        height: "250%",
                        background: isDark
                          ? "conic-gradient(from 0deg at 50% 50%, #ffffff 0deg, rgba(255, 255, 255, 0.95) 40deg, rgba(110, 255, 206, 0.2) 80deg, transparent 150deg, #ffffff 180deg, rgba(255, 255, 255, 0.9) 220deg, rgba(52, 211, 153, 0.15) 260deg, transparent 330deg, #ffffff 360deg)"
                          : "conic-gradient(from 0deg at 50% 50%, #ffffff 0deg, rgba(255, 255, 255, 0.98) 40deg, rgba(16, 185, 129, 0.15) 80deg, transparent 150deg, #ffffff 180deg, rgba(255, 255, 255, 0.95) 220deg, rgba(5, 150, 105, 0.12) 260deg, transparent 330deg, #ffffff 360deg)",
                        animation: "rotateBorderBeam 8s linear infinite",
                        willChange: "transform",
                      }}
                    />
                    {/* Inner mask to expose only 3.5px glowing border */}
                    <div
                      style={{
                        position: "absolute",
                        inset: "3.5px",
                        borderRadius: "24px",
                        background: isDark ? "#0a1b2e" : "#ffffff",
                      }}
                    />
                  </div>

                  {/* 2. SVG Pure White Laser Traveling Light Path */}
                  <svg
                    style={{
                      position: "absolute",
                      inset: "-3.5px",
                      width: "calc(100% + 7px)",
                      height: "calc(100% + 7px)",
                      pointerEvents: "none",
                      zIndex: 10,
                      overflow: "visible",
                      filter: "drop-shadow(0 0 4px rgba(255, 255, 255, 0.9))",
                    }}
                  >
                    <defs>
                      <linearGradient id={`whiteLaserGrad-${step.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                        <stop offset="30%" stopColor="#ffffff" stopOpacity="0.95" />
                        <stop offset="65%" stopColor={isDark ? "#ffffff" : "#f8fafc"} stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
                      </linearGradient>
                    </defs>
                    <rect
                      x="1.75"
                      y="1.75"
                      width="calc(100% - 3.5px)"
                      height="calc(100% - 3.5px)"
                      rx="26.5"
                      ry="26.5"
                      fill="none"
                      stroke={`url(#whiteLaserGrad-${step.id})`}
                      strokeWidth="3.5"
                      strokeDasharray="200 480"
                      style={{
                        animation: "laserDashOffset 8.5s linear infinite",
                        willChange: "stroke-dashoffset",
                      }}
                    />
                  </svg>

                  {/* 3. White Light Shading Halo Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "24px",
                      pointerEvents: "none",
                      zIndex: 2,
                      background: "radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.25) 0%, transparent 65%)",
                      boxShadow: "inset 0 0 15px rgba(255, 255, 255, 0.5)",
                    }}
                  />
                </div>

                {/* Step Number Circle Badge */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 10 }}>
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "50%",
                      background: isDark ? "rgba(4, 14, 26, 0.9)" : "#f8fafc",
                      border: `2px solid ${step.color}`,
                      color: step.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      fontWeight: 800,
                      fontFamily: "var(--font-mono)",
                      boxShadow: isHovered
                        ? `0 0 16px rgba(255, 255, 255, 0.9), 0 0 20px ${step.color}`
                        : `0 0 14px ${step.color}55`,
                    }}
                  >
                    {step.number}
                  </div>

                  <span
                    style={{
                      fontSize: "9.5px",
                      fontWeight: 800,
                      fontFamily: "var(--font-mono)",
                      padding: "3px 8px",
                      borderRadius: "6px",
                      background: isDark ? "rgba(255, 255, 255, 0.06)" : "#f1f5f9",
                      color: step.color,
                      border: "1px solid var(--border-subtle)",
                    }}
                  >
                    {step.badge}
                  </span>
                </div>

                {/* Main Card Content */}
                <div style={{ position: "relative", zIndex: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                    <div
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "10px",
                        background: `${step.color}18`,
                        border: isHovered ? "1px solid rgba(255, 255, 255, 0.6)" : "1px solid transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={18} style={{ color: step.color }} />
                    </div>
                    <h3 style={{ fontSize: "16px", fontWeight: 850, color: "var(--text-primary)", lineHeight: 1.25 }}>
                      {step.title}
                    </h3>
                  </div>

                  <p style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
                    {step.desc}
                  </p>
                </div>

                {/* Card Footer */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "11px",
                    color: step.color,
                    fontWeight: 800,
                    paddingTop: "12px",
                    borderTop: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(5, 150, 105, 0.12)",
                    position: "relative",
                    zIndex: 10,
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    {isHovered && <Sparkles size={13} style={{ color: isDark ? "#ffffff" : "#059669" }} />}
                    <span>Inspect Node</span>
                  </span>
                  <ChevronRight size={14} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Interactive Process Node Deep Dive Modal */}
      <AnimatePresence>
        {activeModalStep !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalStep(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 120,
              background: "rgba(0, 0, 0, 0.82)",
              backdropFilter: "blur(14px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px",
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel"
              style={{
                maxWidth: "540px",
                width: "100%",
                borderRadius: "24px",
                padding: "32px",
                background: "var(--bg-primary)",
                border: `1.5px solid ${pipelineSteps[activeModalStep - 1].color}`,
                boxShadow: `0 20px 60px ${pipelineSteps[activeModalStep - 1].color}33`,
              }}
            >
              {/* Modal Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    fontFamily: "var(--font-mono)",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    background: "var(--accent-mint-bg)",
                    color: pipelineSteps[activeModalStep - 1].color,
                  }}
                >
                  Step {pipelineSteps[activeModalStep - 1].number} Process Inspection
                </span>
                <button
                  onClick={() => setActiveModalStep(null)}
                  style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
                >
                  <X size={20} />
                </button>
              </div>

              <h3 style={{ fontSize: "22px", fontWeight: 850, marginBottom: "8px", color: "var(--text-primary)" }}>
                {pipelineSteps[activeModalStep - 1].title}
              </h3>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "20px" }}>
                {pipelineSteps[activeModalStep - 1].desc}
              </p>

              {/* Step Key Deliverables Checklist */}
              <div style={{ marginBottom: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)" }}>
                  Automated Output Verification
                </div>
                {pipelineSteps[activeModalStep - 1].details.map((detail, idx) => (
                  <div key={idx} style={{ padding: "10px 14px", borderRadius: "10px", background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", gap: "10px" }}>
                    <CheckCircle2 size={16} style={{ color: "var(--accent-emerald)" }} />
                    <span style={{ fontSize: "13px", color: "var(--text-primary)", fontWeight: 600 }}>{detail}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setActiveModalStep(null)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "12px",
                  border: "none",
                  background: pipelineSteps[activeModalStep - 1].color,
                  color: "#031910",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Close Process Node Inspection
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .fanned-deck-wrapper {
            min-height: auto !important;
          }
          .fanned-deck-wrapper > div {
            display: flex !important;
            flex-wrap: wrap !important;
            gap: 16px !important;
            height: auto !important;
          }
          .fanned-card {
            position: relative !important;
            transform: none !important;
            width: 100% !important;
            max-width: 280px !important;
            height: auto !important;
            margin: 0 auto !important;
          }
        }
      `}</style>
    </section>
  );
}

export default RegulatoryProcessPipeline;
