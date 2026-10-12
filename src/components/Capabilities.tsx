"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useTheme } from "./ThemeProvider";
import {
  HeartPulse,
  Bot,
  ListCheck,
  FileSearch,
  BarChart3,
  GitMerge,
  Sparkles,
} from "lucide-react";

// SSR-safe unique 3D scene dynamic imports for all 6 capabilities
const GsprHealthScene = dynamic(() => import("./3d/GsprHealthScene"), { ssr: false });
const DeviceClassificationScene = dynamic(() => import("./3d/DeviceClassificationScene"), { ssr: false });
const RemediationTimelineScene = dynamic(() => import("./3d/RemediationTimelineScene"), { ssr: false });
const DocumentParserScene = dynamic(() => import("./3d/DocumentParserScene"), { ssr: false });
const ReportingRadarScene = dynamic(() => import("./3d/ReportingRadarScene"), { ssr: false });
const TraceabilityVaultScene = dynamic(() => import("./3d/TraceabilityVaultScene"), { ssr: false });

export function Capabilities() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeCapability, setActiveCapability] = useState<number>(0);

  const brandLogoColor = isDark ? "#6effce" : "#059669";

  const capabilities = [
    {
      id: 0,
      number: "01",
      title: "GSPR Health Check",
      icon: HeartPulse,
      desc: "RAccelerator will evaluate your device documentation against applicable ISO standards and GSPR, and provide a detailed overview of gaps and potential remediation.",
    },
    {
      id: 1,
      number: "02",
      title: "Device Classification",
      icon: Bot,
      desc: "RAxy, the RAccelerator chatbot, walks you through the classification rules. It will provide the device classification with accuracy level and the classification determination report for your technical documentation.",
    },
    {
      id: 2,
      number: "03",
      title: "Remediation Plan",
      icon: ListCheck,
      desc: "When gaps are identified, RAccelerator will provide a remediation plan with estimated timelines and generic cost.",
    },
    {
      id: 3,
      number: "04",
      title: "Document Review",
      icon: FileSearch,
      desc: "RAccelerator can read your PDFs, DOCX, and XLSX documents. It will organize them under the applicable GSPR.",
    },
    {
      id: 4,
      number: "05",
      title: "Transparent Reporting",
      icon: BarChart3,
      desc: "RAccelerator will provide a status report with the level of detail required for the audience — whether it is an RA professional, R&D Engineer, or C-suite.",
    },
    {
      id: 5,
      number: "06",
      title: "Full Traceability",
      icon: GitMerge,
      desc: "RAccelerator is 21 CFR Part 11 compliant and provides full traceability of data and evidence.",
    },
  ];

  return (
    <section
      id="section-capabilities"
      style={{
        padding: "80px 24px 70px",
        maxWidth: "1280px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* 1. SECTION TITLE & SUBTITLE */}
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{
            lineHeight: 1.1,
            letterSpacing: "-0.035em",
            marginBottom: "12px",
          }}
        >
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(30px, 4.5vw, 53px)",
              color: brandLogoColor,
              letterSpacing: "1px",
            }}
          >
            Interactive Compliance
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
            Capabilities Engine
          </span>
        </motion.h2>
      </div>

      {/* 2. MAIN 2-COLUMN LAYOUT: VERTICAL MENU ON LEFT | CONTENT & 3D SCENE ON RIGHT */}
      <div
        className="capabilities-grid-layout"
        style={{
          display: "grid",
          gridTemplateColumns: "320px 1fr",
          gap: "36px",
          alignItems: "stretch",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* LEFT COLUMN: VERTICAL CONNECTED MENU BAR (HEIGHT MATCHES RIGHT COLUMN) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            borderRadius: "16px",
            overflow: "hidden",
            background: isDark ? "rgba(10, 27, 46, 0.75)" : "#f1f5f9",
            border: isDark ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid rgba(5, 150, 105, 0.2)",
            padding: "6px",
            boxShadow: isDark ? "0 10px 30px rgba(0,0,0,0.35)" : "0 8px 24px rgba(0,0,0,0.06)",
          }}
        >
          {capabilities.map((cap, index) => {
            const Icon = cap.icon;
            const isSelected = activeCapability === index;

            return (
              <button
                key={cap.title}
                onMouseEnter={() => setActiveCapability(index)}
                onClick={() => setActiveCapability(index)}
                style={{
                  position: "relative",
                  flex: 1,
                  padding: "14px 18px",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  textAlign: "left",
                  zIndex: 2,
                  borderRadius: "12px",
                  borderBottom:
                    index < 5
                      ? isDark
                        ? "1px solid rgba(255, 255, 255, 0.06)"
                        : "1px solid rgba(0,0,0,0.05)"
                      : "none",
                }}
              >
                {/* Active Sliding Background Pill (Vertical Motion) */}
                {isSelected && (
                  <motion.div
                    layoutId="jointTabActivePill"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "12px",
                      background: isDark
                        ? "linear-gradient(135deg, rgba(255, 255, 255, 0.14) 0%, rgba(110, 255, 206, 0.22) 100%)"
                        : "#ffffff",
                      border: isDark ? "1px solid rgba(110, 255, 206, 0.5)" : "1px solid rgba(5, 150, 105, 0.3)",
                      boxShadow: isDark
                        ? "0 0 22px rgba(110, 255, 206, 0.35), inset 0 0 10px rgba(255, 255, 255, 0.15)"
                        : "0 4px 18px rgba(0,0,0,0.08), 0 0 15px rgba(5, 150, 105, 0.2)",
                      zIndex: -1,
                    }}
                  />
                )}

                {/* Icon Container */}
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: isSelected
                      ? isDark
                        ? "rgba(110, 255, 206, 0.18)"
                        : "rgba(5, 150, 105, 0.12)"
                      : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "all 0.2s ease",
                  }}
                >
                  <Icon
                    size={20}
                    style={{
                      color: isSelected ? brandLogoColor : isDark ? "#94a3b8" : "#64748b",
                      transition: "color 0.2s ease",
                    }}
                  />
                </div>

                {/* Title & Step Number */}
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: "10px",
                      fontFamily: "var(--font-mono)",
                      fontWeight: 700,
                      color: isSelected ? brandLogoColor : isDark ? "#64748b" : "#94a3b8",
                      marginBottom: "6px",
                    }}
                  >
                    CAPABILITY {cap.number}
                  </div>
                  <div
                    style={{
                      fontSize: "13.5px",
                      fontWeight: isSelected ? 850 : 650,
                      color: isSelected
                        ? isDark
                          ? "#ffffff"
                          : "#0f172a"
                        : isDark
                        ? "#94a3b8"
                        : "#64748b",
                      lineHeight: 1.25,
                      transition: "color 0.2s ease",
                    }}
                  >
                    {cap.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* RIGHT COLUMN: ACTIVE DESCRIPTION HEADER & 3D ANIMATION STAGE */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            minHeight: "520px",
          }}
        >
          {/* Active Capability Title & Description */}
          <div style={{ marginBottom: "20px" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCapability}
                initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: 850,
                    color: isDark ? "#ffffff" : "#0f172a",
                    marginBottom: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span>{capabilities[activeCapability].title}</span>
                  <Sparkles size={18} style={{ color: brandLogoColor }} />
                </div>

                <p
                  style={{
                    fontSize: "15px",
                    lineHeight: 1.65,
                    color: isDark ? "#cbd5e1" : "#475569",
                    margin: 0,
                    fontWeight: 450,
                    fontFamily: "var(--font-sans)",
                    maxWidth: "720px",
                  }}
                >
                  {capabilities[activeCapability].desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* REALISTIC 3D MACBOOK PRO LAPTOP MOCKUP CONTAINER */}
          <div
            style={{
              position: "relative",
              width: "100%",
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
            </div>

            {/* MACBOOK DISPLAY SCREEN CONTAINER */}
            <div
              className="glass-panel"
              style={{
                borderRadius: "20px 20px 8px 8px",
                padding: "16px 18px 12px",
                position: "relative",
                background: isDark ? "var(--bg-card)" : "#ffffff",
                backdropFilter: "blur(28px)",
                border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(5, 150, 105, 0.18)",
                boxShadow: isDark ? "none" : "0 10px 30px rgba(0, 0, 0, 0.04)",
                overflow: "hidden",
              }}
            >
              {/* macOS Window Control Bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                  paddingBottom: "8px",
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

              {/* 3D WebGL Animation Stage (Expanded Height - No Bottom Cutoff) */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  minHeight: "360px",
                  height: "360px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "transparent",
                  border: "none",
                  padding: "0px",
                }}
              >
                <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCapability}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {activeCapability === 0 && <GsprHealthScene />}
                      {activeCapability === 1 && <DeviceClassificationScene />}
                      {activeCapability === 2 && <RemediationTimelineScene />}
                      {activeCapability === 3 && <DocumentParserScene />}
                      {activeCapability === 4 && <ReportingRadarScene />}
                      {activeCapability === 5 && <TraceabilityVaultScene />}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .capabilities-grid-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

export default Capabilities;
