"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import {
  Sparkles,
  CheckCircle2,
  FileCheck2,
  Cpu,
  ShieldCheck,
  Zap,
  Activity,
  ArrowRight,
  Database,
  Lock,
  Search,
} from "lucide-react";

export function AnimationWall() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeWallFilter, setActiveWallFilter] = useState<"all" | "mdr" | "audit">("all");

  const wallItems = [
    {
      id: "gspr-matrix",
      category: "mdr",
      title: "GSPR Annex I Compliance Matrix",
      desc: "Clause-by-clause 23 requirement verification with automated gap detection.",
      tag: "EU MDR 2017/745",
      metric: "23/23 Mapped",
      color: "var(--accent-mint)",
    },
    {
      id: "raxy-bot",
      category: "all",
      title: "RAxy AI Regulatory Agent",
      desc: "Deterministic rule-based classification assistant for Annex VIII Rules 9, 10, and 11.",
      tag: "Deterministic AI",
      metric: "99.2% Accuracy",
      color: "#38bdf8",
    },
    {
      id: "part11-trail",
      category: "audit",
      title: "21 CFR Part 11 Cryptographic Audit Vault",
      desc: "Immutable SHA-256 evidence chain linking raw design specs to Notified Body findings.",
      tag: "FDA Electronic Records",
      metric: "SHA-256 Sealed",
      color: "#34d399",
    },
    {
      id: "mdcg-guidance",
      category: "mdr",
      title: "MDCG Guidance Framework Alignment",
      desc: "Incorporates MDCG 2019-16 (Cybersecurity) and MDCG 2020-6 (Clinical Evaluation).",
      tag: "MDCG 2020-6",
      metric: "100% Aligned",
      color: "#fdb813",
    },
  ];

  const filteredItems = wallItems.filter(
    (item) => activeWallFilter === "all" || item.category === activeWallFilter
  );

  return (
    <section
      id="section-wall"
      style={{
        padding: "90px 24px",
        maxWidth: "1280px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
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
            Kinetic Intelligence &
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
            Interactive Compliance Capability Wall
          </span>
        </motion.h2>
        <p style={{ fontSize: "16px", color: isDark ? "#94a3b8" : "#475569", maxWidth: "620px", margin: "0 auto" }}>
          Explore RAccelerator's continuous compliance modules floating in real-time kinetic sync.
        </p>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "36px" }}>
        {[
          { key: "all", label: "All Modules" },
          { key: "mdr", label: "EU MDR & IVDR" },
          { key: "audit", label: "21 CFR 11 Audit Trail" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveWallFilter(tab.key as any)}
            style={{
              padding: "8px 18px",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
              border: activeWallFilter === tab.key ? "1px solid var(--accent-mint)" : "1px solid var(--border-subtle)",
              background: activeWallFilter === tab.key ? "var(--accent-mint-bg)" : "var(--bg-card)",
              color: activeWallFilter === tab.key ? "var(--accent-mint)" : "var(--text-secondary)",
              transition: "all 0.2s ease",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Kinetic Animation Wall Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
        }}
      >
        {filteredItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="glass-panel"
            style={{
              borderRadius: "20px",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderTop: `3px solid ${item.color}`,
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 800,
                    fontFamily: "var(--font-mono)",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    background: "var(--bg-secondary)",
                    color: item.color,
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  {item.tag}
                </span>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--accent-mint)", fontFamily: "var(--font-mono)" }}>
                  {item.metric}
                </span>
              </div>

              <h3 style={{ fontSize: "17px", fontWeight: 800, color: "var(--text-primary)", marginBottom: "8px" }}>
                {item.title}
              </h3>
              <p style={{ fontSize: "13px", lineHeight: 1.6, color: "var(--text-secondary)", margin: 0 }}>
                {item.desc}
              </p>
            </div>

            <div style={{ marginTop: "20px", paddingTop: "14px", borderTop: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 600 }}>Active Module</span>
              <ArrowRight size={16} style={{ color: item.color }} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
