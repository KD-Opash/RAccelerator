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
        padding: "80px 24px 0px",
        maxWidth: "1280px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* 1. SECTION TITLE & SUBTITLE */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
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

      {/* 2. JOINT CONNECTED MENU BAR (DIRECTLY BELOW TITLE - IMAGE 2 STYLE) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          maxWidth: "1160px",
          margin: "0 auto 36px",
          borderRadius: "16px",
          overflow: "hidden",
          background: isDark ? "rgba(10, 27, 46, 0.75)" : "#f1f5f9",
          border: isDark ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid rgba(5, 150, 105, 0.2)",
          padding: "5px",
          boxShadow: isDark ? "0 10px 30px rgba(0,0,0,0.35)" : "0 8px 24px rgba(0,0,0,0.06)",
        }}
        className="joint-menu-bar"
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
                padding: "16px 8px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                textAlign: "center",
                zIndex: 2,
                borderRight: index < 5 ? (isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0,0,0,0.06)") : "none",
              }}
            >
              {/* Active Sliding Background Pill (Smooth Spring Motion) */}
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

              {/* Icon */}
              <Icon
                size={19}
                style={{
                  color: isSelected ? brandLogoColor : isDark ? "#94a3b8" : "#64748b",
                  transition: "color 0.2s ease",
                }}
              />

              {/* Title Text */}
              <span
                style={{
                  fontSize: "12.5px",
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
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. MIDDLE: ACTIVE DESCRIPTION TEXT BLOCK */}
      <div
        style={{
          minHeight: "100px",
          textAlign: "center",
          marginBottom: "28px",
          padding: "0 16px",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCapability}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            style={{ maxWidth: "780px", margin: "0 auto" }}
          >
            <div
              style={{
                fontSize: "22px",
                fontWeight: 850,
                color: isDark ? "#ffffff" : "#0f172a",
                marginBottom: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <span>{capabilities[activeCapability].title}</span>
              <Sparkles size={16} style={{ color: brandLogoColor }} />
            </div>

            <p
              style={{
                fontSize: "15px",
                lineHeight: 1.65,
                color: isDark ? "#cbd5e1" : "#475569",
                margin: 0,
                fontWeight: 450,
                fontFamily: "var(--font-sans)",
              }}
            >
              {capabilities[activeCapability].desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 4. BOTTOM: 3D WEBGL ANIMATION STAGE (SMOOTH SPRING TRANSITION) */}
      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: "320px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCapability}
            initial={{ opacity: 0, scale: 0.93, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: -16 }}
            transition={{ duration: 0.38, ease: "easeOut" }}
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
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

      <style jsx global>{`
        @media (max-width: 1024px) {
          .joint-menu-bar {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .joint-menu-bar {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}

export default Capabilities;
