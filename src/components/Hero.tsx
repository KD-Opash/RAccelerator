"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useTheme } from "./ThemeProvider";
import { MultiLineTextType } from "./TextType";
import StaggeredText from "./StaggeredText";
import { Play, Pause, Sparkles, X } from "lucide-react";

// SSR-safe 3D Hero Scene
const HeroScene = dynamic(() => import("./3d/HeroScene"), { ssr: false });

interface HeroProps {
  onStartAssessment: () => void;
  onBookDemo: () => void;
}

export function Hero({ onStartAssessment, onBookDemo }: HeroProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [activePipelineStep, setActivePipelineStep] = useState<number>(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [stageModalOpen, setStageModalOpen] = useState<boolean>(false);
  const [activeMacTab, setActiveMacTab] = useState<"telemetry" | "matrix" | "vault">("telemetry");

  // Mouse Cursor Spotlight Torch Tracking & 3D Perspective Tilt
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const [cardTilt, setCardTilt] = useState<{ rotateX: number; rotateY: number }>({ rotateX: 0, rotateY: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const titlePairs = [
    { line1: "A New Standard", line2: "in MedTech Compliance" },
    { line1: "Deterministic AI", line2: "for EU MDR & IVDR 2017/745" },
    { line1: "Continuous Compliance", line2: "for Medical Device Software" },
    { line1: "21 CFR Part 11 Vault", line2: "for Regulatory Leaders" },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4.5;
    const rotateY = ((x - centerX) / centerX) * 4.5;
    setCardTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000 });
    setCardTilt({ rotateX: 0, rotateY: 0 });
  };

  // Continuous Auto-Cycling Animated Workflow Sequence (1 -> 2 -> 3 -> 4 -> 1)
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setActivePipelineStep((prev) => (prev % 4) + 1);
    }, 4200);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const pipelineSteps = [
    {
      id: 1,
      num: "01",
      name: "Device Ingestion",
      subtitle: "Device Technical Documentation Ingestion",
      desc: "Ingests and parses Technical_File_v3.pdf, ISO 14971 Risk File & IEC 62304 Software Architecture Specs into structured semantic vectors.",
      badge: "42 Clauses Vectorized",
      color: "var(--accent-mint)",
      files: [
        { name: "Technical_File_v3.pdf", status: "Parsed", size: "4.2 MB" },
        { name: "ISO14971_Risk_Matrix.xlsx", status: "Indexed", size: "1.8 MB" },
        { name: "Software_Spec_IEC62304.json", status: "Mapped", size: "890 KB" },
      ],
    },
    {
      id: 2,
      num: "02",
      name: "Annex VIII Rules",
      subtitle: "Deterministic EU MDR Classification Engine",
      desc: "Applies MDR Annex VIII Rule 11 decision logic to evaluate Software as a Medical Device (SaMD) risk class without LLM hallucinations.",
      badge: "Class IIb Device Sealed",
      color: "#fdb813",
      rules: [
        { rule: "Rule 11 (SaMD Diagnostic)", result: "Class IIb Triggered", match: "100%" },
        { rule: "Rule 9 (Active Device)", result: "Evaluated", match: "Clean" },
        { rule: "Rule 10 (Diagnostic Monitoring)", result: "Cross-checked", match: "Clean" },
      ],
    },
    {
      id: 3,
      num: "03",
      name: "GSPR Matrix",
      subtitle: "23 Safety & Performance Checklist Matrix",
      desc: "Continuous automated check across 23 MDR & 20 IVDR General Safety & Performance Requirements to flag evidence gaps immediately.",
      badge: "22 Passed • 1 Gap Active",
      color: "#38bdf8",
      matrix: [
        { gspr: "GSPR 1 (Safety)", status: "COMPLIANT" },
        { gspr: "GSPR 4 (Risk-Benefit)", status: "COMPLIANT" },
        { gspr: "GSPR 14.2 (Biocompatibility)", status: "REMEDIATION QUEUED" },
        { gspr: "GSPR 17.1 (SaMD Software)", status: "COMPLIANT" },
      ],
    },
    {
      id: 4,
      num: "04",
      name: "21 CFR 11 Vault",
      subtitle: "Cryptographic SHA-256 Audit Trail",
      desc: "Generates tamper-evident, SHA-256 timestamped electronic audit trails guaranteeing reproducible Notified Body submission records.",
      badge: "SHA-256 Cryptographic Hash",
      color: "#34d399",
      hash: "e8f49a21b88e10492c7d990c01a2fe94b",
    },
  ];

  const currentStep = pipelineSteps[activePipelineStep - 1];

  return (
    <section
      style={{
        position: "relative",
        minHeight: "94vh",
        padding: "50px 24px 90px",
        maxWidth: "1360px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Subtle Ambient Radial Glow */}
      <div
        style={{
          position: "absolute",
          top: "0%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "1000px",
          height: "650px",
          background: "radial-gradient(ellipse at center, rgba(110, 255, 206, 0.14) 0%, rgba(59, 130, 246, 0.06) 50%, transparent 75%)",
          filter: "blur(140px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* SYNEX KINETIC HERO TYPOGRAPHY WITH SINGLE CURSOR SEQUENTIAL TYPEWRITER */}
      <div style={{ textAlign: "center", maxWidth: "920px", zIndex: 1, marginBottom: "36px", position: "relative" }}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            lineHeight: 1.1,
            letterSpacing: "-0.035em",
            marginBottom: "20px",
          }}
        >
          <StaggeredText
            line1="EU MDR and IVDR"
            line2="ongoing compliance."
            segmentBy="chars"
            staggerDirection="forward"
            direction="bottom"
            duration={0.6}
            delay={0.032}
            blur={true}
            loop={true}
            loopDelay={3000}
            line1Style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 850,
              fontSize: "clamp(38px, 5.5vw, 72px)",
              color: isDark ? "#ffffff" : "#0f172a",
              letterSpacing: "-0.035em",
            }}
            line2Style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(34px, 4.8vw, 64px)",
              color: isDark ? "#6effce" : "#059669",
              letterSpacing: "-0.01em",
              marginTop: "-4px",
            }}
          />
        </motion.h1>

        {/* Synex Refined Subtitle Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: "clamp(14px, 1.5vw, 16px)",
            lineHeight: 1.6,
            color: isDark ? "#94a3b8" : "#475569",
            maxWidth: "680px",
            margin: "0 auto 28px",
            fontWeight: 450,
            fontFamily: "var(--font-sans)",
          }}
        >
          Take full control of your regulatory requirements with a unified platform for device classification, gap remediation, and reproducible technical documentation in real time.
        </motion.p>
      </div>      {/* ========================================================================= */}
      {/* HERO WORKSTATION: STANDALONE 3D SMARTPHONE (LEFT) + TELEMETRY ENGINE (RIGHT) */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{
          width: "100%",
          maxWidth: "1280px",
          zIndex: 1,
          position: "relative",
          display: "grid",
          gridTemplateColumns: "270px 1fr",
          gap: "32px",
          alignItems: "stretch",
        }}
        className="synex-hero-grid"
      >
        {/* ========================================================================= */}
        {/* LEFT COLUMN: STANDALONE TALL & SLIM 3D SMARTPHONE DEVICE MOCKUP */}
        {/* ========================================================================= */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {/* REALISTIC SLIM & TALL 3D SMARTPHONE HARDWARE CHASSIS (19.5:9 RATIO) */}
          <div
            style={{
              width: "100%",
              maxWidth: "270px",
              margin: "0 auto",
              borderRadius: "48px",
              padding: "10px",
              background: isDark
                ? "linear-gradient(160deg, #112628 0%, #061517 50%, #030d0f 100%)"
                : "linear-gradient(160deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)",
              border: isDark ? "3px solid rgba(110, 255, 206, 0.45)" : "3px solid rgba(5, 150, 105, 0.45)",
              boxShadow: isDark
                ? "0 35px 90px rgba(0, 0, 0, 0.85), 0 0 50px rgba(110, 255, 206, 0.2), inset 0 0 15px rgba(110, 255, 206, 0.14)"
                : "0 35px 90px rgba(0, 0, 0, 0.12), 0 0 40px rgba(5, 150, 105, 0.15), inset 0 0 15px rgba(255, 255, 255, 0.8)",
              position: "relative",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* Phone Hardware Side Buttons (Volume & Power) */}
            <span style={{ position: "absolute", left: "-5px", top: "90px", width: "3.5px", height: "35px", background: isDark ? "#6effce" : "#059669", borderRadius: "3px 0 0 3px", opacity: 0.75 }} />
            <span style={{ position: "absolute", left: "-5px", top: "135px", width: "3.5px", height: "35px", background: isDark ? "#6effce" : "#059669", borderRadius: "3px 0 0 3px", opacity: 0.75 }} />
            <span style={{ position: "absolute", right: "-5px", top: "110px", width: "3.5px", height: "55px", background: isDark ? "#38bdf8" : "#0284c7", borderRadius: "0 3px 3px 0", opacity: 0.75 }} />

            {/* SMARTPHONE INNER OLED SCREEN CONTAINER (TALL FLAPSHIP SCREEN) */}
            <div
              style={{
                borderRadius: "38px",
                background: isDark ? "#051114" : "#ffffff",
                padding: "14px 12px 18px",
                overflow: "hidden",
                position: "relative",
                border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
                minHeight: "530px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                {/* Phone Status Bar (Time 9:41, Dynamic Island, 5G Battery) */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "14px",
                    paddingBottom: "6px",
                    borderBottom: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
                  }}
                >
                  <span style={{ fontSize: "10px", fontWeight: 800, fontFamily: "var(--font-mono)", color: isDark ? "#94a3b8" : "#64748b" }}>
                    9:41
                  </span>
                  {/* Dynamic Island Pill Notch */}
                  <div
                    style={{
                      width: "55px",
                      height: "12px",
                      borderRadius: "10px",
                      background: "#000",
                      border: isDark ? "1px solid rgba(110, 255, 206, 0.4)" : "1px solid rgba(5, 150, 105, 0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "4px",
                    }}
                  >
                    <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#6effce" }} />
                    <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#38bdf8" }} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span style={{ fontSize: "9px", color: isDark ? "#6effce" : "#059669", fontWeight: 800, fontFamily: "var(--font-mono)" }}>5G</span>
                  </div>
                </div>

                {/* Mobile App Header Bar */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ width: "20px", height: "20px", borderRadius: "50%", background: isDark ? "#6effce" : "#059669", color: isDark ? "#031910" : "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 900 }}>
                      R
                    </span>
                    <span style={{ fontSize: "12px", fontWeight: 800, color: isDark ? "#ffffff" : "#0f172a" }}>RAccelerator</span>
                  </div>
                  {/* Auto-Play Toggle Pill */}
                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    style={{
                      border: "none",
                      background: isDark ? "rgba(52, 211, 153, 0.16)" : "rgba(5, 150, 105, 0.12)",
                      color: isDark ? "#34d399" : "#059669",
                      padding: "3px 8px",
                      borderRadius: "10px",
                      fontSize: "8px",
                      fontWeight: 800,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                    }}
                  >
                    {isAutoPlaying ? <Pause size={8} /> : <Play size={8} />}
                    <span>{isAutoPlaying ? "AUTO" : "PAUSE"}</span>
                  </button>
                </div>

                {/* Workflow Nodes Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                  <span style={{ fontSize: "9px", fontFamily: "var(--font-mono)", fontWeight: 800, color: isDark ? "#6effce" : "#059669", letterSpacing: "0.05em" }}>
                    // LIVE WORKFLOW STAGES
                  </span>
                  <span style={{ fontSize: "9px", fontFamily: "var(--font-mono)", color: isDark ? "#94a3b8" : "#64748b" }}>
                    {currentStep.num} / 04
                  </span>
                </div>

                {/* Automatic Cycling Workflow Options List inside Tall Mobile Screen */}
                <div style={{ display: "flex", flexDirection: "column", gap: "9px", marginBottom: "14px" }}>
                  {[
                    { id: 1, num: "01", label: "Device Ingestion", callout: "42 Clauses", active: activePipelineStep === 1 },
                    { id: 2, num: "02", label: "Annex VIII Rules", callout: "Rule 11 SaMD", active: activePipelineStep === 2 },
                    { id: 3, num: "03", label: "GSPR Matrix", callout: "23 Checks", active: activePipelineStep === 3 },
                    { id: 4, num: "04", label: "21 CFR 11 Vault", callout: "SHA-256 Log", active: activePipelineStep === 4 },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActivePipelineStep(item.id);
                        setIsAutoPlaying(false);
                      }}
                      style={{
                        padding: "10px 11px",
                        borderRadius: "14px",
                        background: item.active
                          ? isDark
                            ? "linear-gradient(135deg, rgba(110, 255, 206, 0.24) 0%, rgba(56, 189, 248, 0.14) 100%)"
                            : "linear-gradient(135deg, rgba(5, 150, 105, 0.12) 0%, rgba(14, 165, 233, 0.08) 100%)"
                          : isDark
                          ? "rgba(255, 255, 255, 0.03)"
                          : "rgba(0, 0, 0, 0.03)",
                        color: item.active ? (isDark ? "#6effce" : "#059669") : (isDark ? "#94a3b8" : "#475569"),
                        fontWeight: 700,
                        textAlign: "left",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        position: "relative",
                        transition: "all 0.25s ease",
                        border: item.active
                          ? isDark ? "1.5px solid rgba(110, 255, 206, 0.7)" : "1.5px solid rgba(5, 150, 105, 0.6)"
                          : isDark ? "1px solid rgba(255, 255, 255, 0.06)" : "1px solid rgba(0, 0, 0, 0.06)",
                        boxShadow: item.active
                          ? isDark ? "0 6px 20px rgba(110, 255, 206, 0.22)" : "0 6px 20px rgba(5, 150, 105, 0.15)"
                          : "none",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ fontSize: "10px", fontFamily: "var(--font-mono)", fontWeight: 800, color: item.active ? (isDark ? "#6effce" : "#059669") : (isDark ? "#94a3b8" : "#64748b") }}>
                          {item.num}
                        </span>
                        <span style={{ fontSize: "11px", fontWeight: 800 }}>{item.label}</span>
                      </div>

                      {/* Connected Pointer Badge with Animated Progress Bar */}
                      <div
                        style={{
                          fontSize: "8.5px",
                          fontFamily: "var(--font-mono)",
                          fontWeight: 700,
                          padding: "2px 6px",
                          borderRadius: "8px",
                          background: item.active
                            ? isDark ? "rgba(110, 255, 206, 0.25)" : "rgba(5, 150, 105, 0.15)"
                            : isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                          color: item.active ? (isDark ? "#ffffff" : "#059669") : (isDark ? "#94a3b8" : "#64748b"),
                          border: item.active
                            ? isDark ? "1px solid rgba(110, 255, 206, 0.45)" : "1px solid rgba(5, 150, 105, 0.3)"
                            : "1px solid transparent",
                          display: "flex",
                          alignItems: "center",
                          gap: "3px",
                        }}
                      >
                        {item.active && <Sparkles size={9} style={{ color: isDark ? "#6effce" : "#059669" }} />}
                        <span>{item.callout}</span>
                      </div>

                      {/* Auto-Playing Progress Line Indicator on Mobile Screen */}
                      {item.active && isAutoPlaying && (
                        <motion.div
                          key={activePipelineStep}
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 4.2, ease: "linear" }}
                          style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            height: "2.5px",
                            background: isDark ? "#6effce" : "#059669",
                            borderRadius: "2px",
                          }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Active Workspace Footer */}
              <div style={{ padding: "8px 10px", borderRadius: "12px", background: isDark ? "rgba(9, 23, 27, 0.85)" : "#f8fafc", border: isDark ? "1px solid rgba(110, 255, 206, 0.2)" : "1px solid rgba(0, 0, 0, 0.08)", fontSize: "9px" }}>
                <div style={{ color: isDark ? "#94a3b8" : "#64748b", marginBottom: "2px", fontFamily: "var(--font-mono)" }}>ACTIVE WORKSPACE</div>
                <div style={{ fontWeight: 800, color: isDark ? "#6effce" : "#059669", display: "flex", alignItems: "center", gap: "5px" }}>
                  <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: isDark ? "#6effce" : "#059669" }} />
                  <span>EU MDR 2017/745</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: STANDALONE 3D MACBOOK PRO LAPTOP MOCKUP (CLEAN IN LIGHT MODE) */}
        {/* ========================================================================= */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {/* REALISTIC 3D MACBOOK PRO LAPTOP MOCKUP CONTAINER */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              borderRadius: "26px 26px 14px 14px",
              padding: "16px 16px 6px",
              background: isDark
                ? "linear-gradient(165deg, #1e293b 0%, #0f172a 50%, #09171b 100%)"
                : "linear-gradient(165deg, #f1f5f9 0%, #e2e8f0 50%, #cbd5e1 100%)",
              border: isDark ? "2px solid rgba(110, 255, 206, 0.4)" : "2px solid rgba(5, 150, 105, 0.35)",
              boxShadow: isDark
                ? "0 40px 100px rgba(0, 0, 0, 0.9), 0 0 60px rgba(110, 255, 206, 0.18), inset 0 0 20px rgba(110, 255, 206, 0.15)"
                : "0 30px 80px rgba(0, 0, 0, 0.12), 0 0 50px rgba(5, 150, 105, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.9)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* Top Laptop Camera Web Notched Bar */}
            <div
              style={{
                position: "absolute",
                top: "6px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "80px",
                height: "8px",
                background: "#000",
                borderRadius: "0 0 6px 6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                zIndex: 10,
              }}
            >
              <span style={{ width: "3.5px", height: "3.5px", borderRadius: "50%", background: "#10b981" }} />
              <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#38bdf8" }} />
            </div>            {/* MACBOOK DISPLAY SCREEN CONTAINER */}
            <div
              className="glass-panel"
              style={{
                borderRadius: "20px 20px 8px 8px",
                padding: "18px 20px 14px",
                position: "relative",
                background: isDark ? "var(--bg-card)" : "#ffffff",
                backdropFilter: "blur(28px)",
                border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(5, 150, 105, 0.18)",
                boxShadow: isDark ? "none" : "0 10px 30px rgba(0, 0, 0, 0.04)",
                overflow: "hidden",
              }}
            >
              {/* PARTITION HEADER 1: macOS Window Control Bar & Interactive Partition Selector */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "16px",
                  paddingBottom: "10px",
                  borderBottom: isDark ? "1px solid var(--border-subtle)" : "1px solid rgba(5, 150, 105, 0.12)",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                {/* macOS Traffic Light Buttons */}
                <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                  <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#ff5f56", border: "1px solid #e0443e", display: "inline-block" }} />
                  <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#ffbd2e", border: "1px solid #dea123", display: "inline-block" }} />
                  <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#27c93f", border: "1px solid #1aab29", display: "inline-block" }} />
                  <span style={{ fontSize: "11px", fontWeight: 800, color: isDark ? "#6effce" : "#059669", marginLeft: "6px", fontFamily: "var(--font-mono)" }}>
                    macOS Workstation v2.4
                  </span>
                </div>

                {/* User Profile Chip */}
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "10px", color: isDark ? "#94a3b8" : "#64748b", fontFamily: "var(--font-mono)", fontWeight: 700 }}>
                    @raccelerator PRO
                  </span>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: isDark ? "#34d399" : "#059669", boxShadow: "0 0 8px #34d399" }} />
                </div>
              </div>

              {/* PARTITION BLOCK 1: Top Metrics & Status Partitions Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "12px",
                  marginBottom: "28px",
                }}
              >
                <div style={{ padding: "12px 14px", borderRadius: "14px", background: isDark ? "rgba(9, 23, 27, 0.75)" : "#f8fafc", border: isDark ? "1px solid rgba(110, 255, 206, 0.2)" : "1px solid rgba(5, 150, 105, 0.2)" }}>
                  <div style={{ fontSize: "16px", fontWeight: 900, color: isDark ? "#ffffff" : "#0f172a", letterSpacing: "-0.02em" }}>
                    23 GSPRs Mapped
                  </div>
                  <div style={{ fontSize: "9.5px", color: isDark ? "#34d399" : "#059669", fontWeight: 700, marginTop: "2px" }}>
                    +97.3% Deterministic Score
                  </div>
                </div>

                <div style={{ padding: "12px 14px", borderRadius: "14px", background: isDark ? "rgba(9, 23, 27, 0.75)" : "#f8fafc", border: isDark ? "1px solid rgba(56, 189, 248, 0.2)" : "1px solid rgba(2, 132, 199, 0.2)" }}>
                  <div style={{ fontSize: "16px", fontWeight: 900, color: isDark ? "#ffffff" : "#0f172a", letterSpacing: "-0.02em" }}>
                    Annex VIII Rule 11
                  </div>
                  <div style={{ fontSize: "9.5px", color: isDark ? "#38bdf8" : "#0284c7", fontWeight: 700, marginTop: "2px" }}>
                    SaMD Class IIb Device
                  </div>
                </div>

                <div style={{ padding: "12px 14px", borderRadius: "14px", background: isDark ? "rgba(9, 23, 27, 0.75)" : "#f8fafc", border: isDark ? "1px solid rgba(253, 184, 19, 0.2)" : "1px solid rgba(217, 119, 6, 0.2)" }}>
                  <div style={{ fontSize: "16px", fontWeight: 900, color: isDark ? "#ffffff" : "#0f172a", letterSpacing: "-0.02em" }}>
                    21 CFR Part 11
                  </div>
                  <div style={{ fontSize: "9.5px", color: isDark ? "#fdb813" : "#d97706", fontWeight: 700, marginTop: "2px" }}>
                    SHA-256 Tamper Sealed
                  </div>
                </div>
              </div>

              {/* PARTITION BLOCK 2: Split 3D Visualizer Partition (Left) & Dynamic Data Partition (Right) */}
              <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "28px", alignItems: "stretch" }} className="synex-inner-content">
                {/* PARTITION LEFT: Standalone 3D Saturn Scene with Real-Time HUD Overlay & Glowing Center Planet */}
                <div
                  style={{
                    padding: "14px",
                    borderRadius: "20px",
                    background: isDark
                      ? "linear-gradient(165deg, rgba(8, 20, 24, 0.95) 0%, rgba(3, 12, 15, 0.98) 100%)"
                      : "linear-gradient(165deg, #f0fdf4 0%, #ecfdf5 100%)",
                    border: isDark ? "1px solid rgba(110, 255, 206, 0.28)" : "1px solid rgba(5, 150, 105, 0.22)",
                    boxShadow: isDark ? "0 14px 36px rgba(0, 0, 0, 0.45)" : "0 10px 25px rgba(0, 0, 0, 0.05)",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  {/* HUD Header Badge */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 5, marginBottom: "4px" }}>
                    <span style={{ fontSize: "8.5px", fontFamily: "var(--font-mono)", fontWeight: 800, color: isDark ? "#6effce" : "#059669", background: isDark ? "rgba(110, 255, 206, 0.14)" : "rgba(5, 150, 105, 0.12)", padding: "2.5px 7px", borderRadius: "7px", border: isDark ? "1px solid rgba(110, 255, 206, 0.3)" : "1px solid rgba(5, 150, 105, 0.3)" }}>
                      ● 3D SATURN HUD ACTIVE
                    </span>
                    <span style={{ fontSize: "8.5px", fontFamily: "var(--font-mono)", color: isDark ? "#94a3b8" : "#64748b" }}>
                      ORBIT: 1.2 RPM
                    </span>
                  </div>

                  {/* 3D Saturn Scene Canvas (Center planet glowing) */}
                  <div style={{ height: "210px", width: "100%", position: "relative" }}>
                    <HeroScene />
                  </div>

                  {/* HUD Footer Status Bar */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "8.5px", fontFamily: "var(--font-mono)", color: isDark ? "#94a3b8" : "#64748b", borderTop: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(5, 150, 105, 0.15)", paddingTop: "7px", marginTop: "4px" }}>
                    <span>SHADER: PLASMA SPHERE</span>
                    <span style={{ color: isDark ? "#34d399" : "#059669", fontWeight: 700 }}>PLANET CORE GLOWING</span>
                  </div>
                </div>

                {/* PARTITION RIGHT: Active Data Deck Partition */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${currentStep.id}-${activeMacTab}`}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      padding: "16px",
                      borderRadius: "20px",
                      background: isDark
                        ? "linear-gradient(165deg, rgba(8, 20, 24, 0.95) 0%, rgba(3, 12, 15, 0.98) 100%)"
                        : "#ffffff",
                      border: isDark ? `1px solid ${currentStep.color}44` : "1px solid rgba(5, 150, 105, 0.25)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      minHeight: "260px",
                      boxShadow: isDark ? "0 14px 36px rgba(0, 0, 0, 0.45)" : "0 10px 25px rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <div>
                      {/* Data Partition Header Badge */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                        <span style={{ fontSize: "8.5px", fontFamily: "var(--font-mono)", fontWeight: 800, color: isDark ? currentStep.color : "#059669", textTransform: "uppercase", padding: "2.5px 7px", borderRadius: "7px", background: isDark ? `${currentStep.color}18` : "rgba(5, 150, 105, 0.12)", border: isDark ? `1px solid ${currentStep.color}35` : "1px solid rgba(5, 150, 105, 0.25)" }}>
                          {currentStep.badge}
                        </span>
                        <span style={{ fontSize: "9.5px", fontWeight: 800, color: isDark ? "#94a3b8" : "#64748b", fontFamily: "var(--font-mono)" }}>
                          PARTITION {currentStep.num} / 04
                        </span>
                      </div>

                      <h4 style={{ fontSize: "14px", fontWeight: 800, color: isDark ? "#ffffff" : "#0f172a", marginBottom: "3px" }}>
                        {currentStep.subtitle}
                      </h4>

                      <p style={{ fontSize: "10.5px", color: isDark ? "#94a3b8" : "#475569", lineHeight: 1.45, margin: "0 0 10px" }}>
                        {currentStep.desc}
                      </p>

                      {/* Deep Data Partition Details */}
                      {activeMacTab === "telemetry" && (
                        <div style={{ padding: "9px 11px", borderRadius: "11px", background: isDark ? "rgba(0, 0, 0, 0.5)" : "#f8fafc", border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)", fontSize: "9.5px", fontFamily: "var(--font-mono)" }}>
                          <div style={{ color: isDark ? "#94a3b8" : "#64748b", marginBottom: "5px" }}>// LIVE STEP EXECUTOR DATA</div>
                          {currentStep.id === 1 && (
                            <div style={{ display: "flex", flexDirection: "column", gap: "3px", color: isDark ? "#34d399" : "#059669" }}>
                              <div>✓ Technical_File_v3.pdf (4.2 MB) — Parsed</div>
                              <div>✓ ISO14971_Risk_Matrix.xlsx (1.8 MB) — Indexed</div>
                              <div>✓ Software_Spec_IEC62304.json — Mapped</div>
                            </div>
                          )}
                          {currentStep.id === 2 && (
                            <div style={{ display: "flex", flexDirection: "column", gap: "3px", color: isDark ? "#38bdf8" : "#0284c7" }}>
                              <div>✓ MDR Annex VIII Rule 11 (SaMD Diagnostic)</div>
                              <div>✓ Classification Output: Class IIb Device</div>
                              <div>✓ Deterministic Confidence: 100% Match</div>
                            </div>
                          )}
                          {currentStep.id === 3 && (
                            <div style={{ display: "flex", flexDirection: "column", gap: "3px", color: isDark ? "#fdb813" : "#d97706" }}>
                              <div>✓ GSPR 1 (Safety & Performance): PASSED</div>
                              <div>✓ GSPR 4 (Risk-Benefit Analysis): PASSED</div>
                              <div>⚠ GSPR 14.2 (Biocompatibility): QUEUED</div>
                            </div>
                          )}
                          {currentStep.id === 4 && (
                            <div style={{ display: "flex", flexDirection: "column", gap: "3px", color: isDark ? "#34d399" : "#059669" }}>
                              <div>✓ Cryptographic SHA-256 Vault Generated</div>
                              <div style={{ wordBreak: "break-all", color: isDark ? "#6effce" : "#047857" }}>Hash: e8f49a21b88e10492c7d990c01a2fe94b</div>
                              <div>✓ Sealed under 21 CFR Part 11</div>
                            </div>
                          )}
                        </div>
                      )}

                      {activeMacTab === "matrix" && (
                        <div style={{ padding: "9px 11px", borderRadius: "11px", background: isDark ? "rgba(0, 0, 0, 0.5)" : "#f8fafc", border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)", fontSize: "9.5px", fontFamily: "var(--font-mono)" }}>
                          <div style={{ color: isDark ? "#38bdf8" : "#0284c7", marginBottom: "5px", fontWeight: 800 }}>// MATRIX PARSER DATA STREAM</div>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                            <span style={{ color: isDark ? "#94a3b8" : "#64748b" }}>Total Clauses:</span>
                            <span style={{ color: isDark ? "#6effce" : "#059669" }}>42 Vectorized</span>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                            <span style={{ color: isDark ? "#94a3b8" : "#64748b" }}>Audit Readiness:</span>
                            <span style={{ color: isDark ? "#34d399" : "#059669" }}>100% Verified</span>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: isDark ? "#94a3b8" : "#64748b" }}>LLM Hallucinations:</span>
                            <span style={{ color: isDark ? "#34d399" : "#059669" }}>0% Deterministic</span>
                          </div>
                        </div>
                      )}

                      {activeMacTab === "vault" && (
                        <div style={{ padding: "9px 11px", borderRadius: "11px", background: isDark ? "rgba(0, 0, 0, 0.5)" : "#f8fafc", border: isDark ? "1px solid rgba(253, 184, 19, 0.25)" : "1px solid rgba(217, 119, 6, 0.25)", fontSize: "9.5px", fontFamily: "var(--font-mono)" }}>
                          <div style={{ color: isDark ? "#fdb813" : "#d97706", marginBottom: "5px", fontWeight: 800 }}>// 21 CFR PART 11 AUDIT CERTIFICATE</div>
                          <div style={{ color: isDark ? "#94a3b8" : "#64748b", marginBottom: "3px" }}>Timestamp: 2026-10-18 T14:25:00 UTC</div>
                          <div style={{ color: isDark ? "#6effce" : "#047857", wordBreak: "break-all" }}>SHA256: e8f49a21b88e10492c7d990c01a2fe94b</div>
                          <div style={{ color: isDark ? "#34d399" : "#059669", marginTop: "3px" }}>✓ Notified Body Ready PDF Generated</div>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={onStartAssessment}
                      style={{
                        width: "100%",
                        padding: "8.5px",
                        borderRadius: "11px",
                        border: "none",
                        background: "linear-gradient(135deg, #6effce 0%, #34d399 100%)",
                        color: "#031910",
                        fontWeight: 800,
                        fontSize: "10.5px",
                        cursor: "pointer",
                        marginTop: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5px",
                        boxShadow: "0 4px 16px rgba(110, 255, 206, 0.3)",
                      }}
                    >
                      <span>Inspect Partition Data Node</span>
                      <span>→</span>
                    </button>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* MACBOOK ALUMINUM BASE HINGE & THUMB GROOVE REFLECTION (IMAGE 2 STYLE) */}
            <div
              style={{
                height: "12px",
                width: "100%",
                background: isDark
                  ? "linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #09171b 100%)"
                  : "linear-gradient(180deg, #e2e8f0 0%, #cbd5e1 50%, #94a3b8 100%)",
                borderRadius: "0 0 14px 14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "4px",
                borderTop: isDark ? "1px solid rgba(110, 255, 206, 0.25)" : "1px solid rgba(5, 150, 105, 0.25)",
              }}
            >
              {/* Laptop Thumb Opening Notch */}
              <div
                style={{
                  width: "70px",
                  height: "4px",
                  borderRadius: "0 0 4px 4px",
                  background: isDark ? "rgba(110, 255, 206, 0.35)" : "rgba(5, 150, 105, 0.35)",
                  boxShadow: isDark ? "0 0 8px rgba(110, 255, 206, 0.4)" : "0 0 8px rgba(5, 150, 105, 0.3)",
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* FULL-SCREEN INTERACTIVE STAGE INSPECTION MODAL */}
      <AnimatePresence>
        {stageModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setStageModalOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 120,
              background: "rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(12px)",
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
                maxWidth: "600px",
                width: "100%",
                borderRadius: "28px",
                padding: "32px",
                background: "var(--bg-primary)",
                border: `1px solid ${currentStep.color}`,
                boxShadow: `0 20px 60px ${currentStep.color}33`,
              }}
            >
              {/* Modal Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    fontFamily: "var(--font-mono)",
                    padding: "4px 12px",
                    borderRadius: "8px",
                    background: "var(--accent-mint-bg)",
                    color: currentStep.color,
                  }}
                >
                  STAGE {currentStep.num} DEEP INSPECTION
                </span>
                <button
                  onClick={() => setStageModalOpen(false)}
                  style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
                >
                  <X size={22} />
                </button>
              </div>

              <h3 style={{ fontSize: "24px", fontWeight: 800, color: "var(--text-primary)", marginBottom: "8px" }}>
                {currentStep.subtitle}
              </h3>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "24px" }}>
                {currentStep.desc}
              </p>

              {/* Code / JSON Representation */}
              <div
                style={{
                  padding: "16px",
                  borderRadius: "14px",
                  background: "#080e12",
                  border: "1px solid var(--border-subtle)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  color: currentStep.color,
                  marginBottom: "24px",
                }}
              >
                <div style={{ color: "var(--text-muted)", marginBottom: "8px" }}>// Automated Execution Node</div>
                <div>{`{`}</div>
                <div style={{ paddingLeft: "16px" }}>{`"stage": "${currentStep.name}",`}</div>
                <div style={{ paddingLeft: "16px" }}>{`"status": "${currentStep.badge}",`}</div>
                <div style={{ paddingLeft: "16px" }}>{`"compliance_standard": "EU MDR 2017/745",`}</div>
                <div style={{ paddingLeft: "16px" }}>{`"auditability": "21 CFR Part 11 Sealed"`}</div>
                <div>{`}`}</div>
              </div>

              <button
                onClick={() => setStageModalOpen(false)}
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "12px",
                  border: "none",
                  background: currentStep.color,
                  color: "var(--bg-primary)",
                  fontWeight: 800,
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Return to Workstation Deck
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @media (max-width: 900px) {
          .synex-dashboard-grid {
            grid-template-columns: 1fr !important;
          }
          .synex-sidebar {
            border-right: none !important;
            border-bottom: 1px solid var(--border-subtle) !important;
            padding: 18px 16px !important;
          }
          .synex-steps-container {
            display: flex !important;
            flex-direction: row !important;
            overflow-x: auto !important;
            gap: 8px !important;
            padding-bottom: 6px !important;
            scrollbar-width: none !important;
          }
          .synex-steps-container::-webkit-scrollbar {
            display: none !important;
          }
          .synex-step-btn {
            white-space: nowrap !important;
            flex-shrink: 0 !important;
            min-width: 155px !important;
          }
          .synex-inner-content {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
