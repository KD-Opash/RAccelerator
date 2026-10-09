"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, Key, Globe, FileCheck2 } from "lucide-react";
import { useTheme } from "./ThemeProvider";

function Circular3DCarousel({ items, isDark }: { items: any[]; isDark: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const [radius, setRadius] = useState(480);
  const [currentAngle, setCurrentAngle] = useState(0);
  const angleRef = useRef(0);
  const isHoveredRef = useRef(false);
  const total = items.length;

  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setRadius(240);
      } else if (window.innerWidth < 1024) {
        setRadius(360);
      } else {
        setRadius(480);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const delta = Math.min(now - lastTime, 50);
      lastTime = now;

      if (!isHoveredRef.current) {
        angleRef.current = (angleRef.current + delta * 0.014) % 360;
        setCurrentAngle(angleRef.current);
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handlePan = (_e: any, info: any) => {
    angleRef.current = (angleRef.current - info.delta.x * 0.35) % 360;
    setCurrentAngle(angleRef.current);
  };

  return (
    <div
      style={{ position: "relative", width: "100%", padding: "10px 0 20px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Scene Viewport */}
      <motion.div
        onPan={handlePan}
        style={{
          height: "390px",
          width: "100%",
          position: "relative",
          perspective: "1400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          touchAction: "pan-y",
          cursor: isHovered ? "grab" : "pointer",
        }}
        whileTap={{ cursor: "grabbing" }}
      >
        {/* 3D Carousel Cylinder Container */}
        <div
          style={{
            position: "relative",
            width: "280px",
            height: "230px",
            transformStyle: "preserve-3d",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {items.map((item, idx) => {
            const Icon = item.icon;
            const angleStep = 360 / total;
            const cardBaseAngle = idx * angleStep;
            const totalAngle = (cardBaseAngle + currentAngle) % 360;
            let relAngle = ((totalAngle % 360) + 540) % 360 - 180;

            const radAngle = (relAngle * Math.PI) / 180;
            const x = Math.sin(radAngle) * radius;
            const z = Math.cos(radAngle) * radius - radius;
            const rotateY = relAngle;

            const distFromFront = Math.abs(relAngle);
            const isFrontmost = distFromFront < angleStep / 2;

            const cosVal = Math.cos(radAngle);
            // Show cards clearly across the front ring arc (cosVal > -0.2)
            const opacity = cosVal < -0.2 ? 0 : Math.min(1, Math.max(0.45, cosVal * 1.15));
            const scale = isFrontmost ? 1.05 : Math.max(0.85, 0.85 + cosVal * 0.15);
            const zIndex = Math.round(100 + cosVal * 100);

            if (opacity === 0) return null;

            return (
              <div
                key={item.title}
                style={{
                  position: "absolute",
                  width: "280px",
                  height: "230px",
                  borderRadius: "20px",
                  padding: "22px",
                  zIndex,
                  transform: `translate3d(${x}px, 0px, ${z}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  transition: isHovered ? "transform 0.12s ease-out, opacity 0.2s ease" : "none",
                  background: isFrontmost
                    ? isDark
                      ? "linear-gradient(145deg, rgba(16, 40, 36, 0.96) 0%, rgba(6, 22, 20, 0.98) 100%)"
                      : "linear-gradient(145deg, #ffffff 0%, #f0fdf4 100%)"
                    : isDark
                    ? "rgba(10, 22, 28, 0.85)"
                    : "rgba(255, 255, 255, 0.92)",
                  backdropFilter: "blur(14px)",
                  border: isFrontmost
                    ? isDark
                      ? "2px solid #6effce"
                      : "2px solid #059669"
                    : isDark
                    ? "1px solid rgba(255, 255, 255, 0.12)"
                    : "1px solid rgba(5, 150, 105, 0.25)",
                  boxShadow: isFrontmost
                    ? isDark
                      ? "0 15px 40px rgba(110, 255, 206, 0.28), 0 0 25px rgba(110, 255, 206, 0.18)"
                      : "0 15px 35px rgba(5, 150, 105, 0.22)"
                    : "0 8px 24px rgba(0, 0, 0, 0.12)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  backfaceVisibility: "hidden",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "12px",
                        background: isFrontmost
                          ? isDark
                            ? "rgba(110, 255, 206, 0.2)"
                            : "rgba(5, 150, 105, 0.15)"
                          : "var(--accent-mint-bg)",
                        border: isFrontmost
                          ? isDark
                            ? "1px solid #6effce"
                            : "1px solid #059669"
                          : "1px solid var(--border-subtle)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: isFrontmost
                          ? isDark
                            ? "#6effce"
                            : "#059669"
                          : "var(--accent-mint)",
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    {isFrontmost && (
                      <span
                        style={{
                          fontSize: "9.5px",
                          fontWeight: 800,
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                          color: isDark ? "#6effce" : "#059669",
                          background: isDark ? "rgba(110, 255, 206, 0.15)" : "rgba(5, 150, 105, 0.12)",
                          padding: "3.5px 7.5px",
                          borderRadius: "6px",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        ACTIVE VERIFIED
                      </span>
                    )}
                  </div>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 800,
                      color: isDark ? "#ffffff" : "#0f172a",
                      marginBottom: "6px",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "12px",
                      lineHeight: 1.5,
                      color: isDark ? "#94a3b8" : "#475569",
                      margin: 0,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>

                <div
                  style={{
                    fontSize: "10.5px",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                    color: isFrontmost
                      ? isDark
                        ? "#6effce"
                        : "#059669"
                      : isDark
                      ? "#64748b"
                      : "#94a3b8",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    borderTop: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)",
                    paddingTop: "8px",
                    marginTop: "8px",
                  }}
                >
                  <span style={{ fontSize: "13px" }}>✓</span> {item.badge}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

export function SecuritySection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const securityItems = [
    {
      title: "SOC 2 Type II",
      desc: "Annual third-party audit of security controls, availability, and confidentiality.",
      badge: "Annual Independent Audit",
      icon: Shield,
    },
    {
      title: "GDPR Compliant",
      desc: "EU data residency options. Full data processing agreements. Right to erasure supported.",
      badge: "EU Data Residency Ready",
      icon: Eye,
    },
    {
      title: "21 CFR Part 11",
      desc: "Electronic signatures, audit trails, and access controls meeting FDA requirements.",
      badge: "FDA Audit Trail Standard",
      icon: FileCheck2,
    },
    {
      title: "AES-256 Encryption",
      desc: "Data encrypted at rest and in transit. TLS 1.3 for all communications.",
      badge: "Zero-Knowledge Encryption",
      icon: Lock,
    },
    {
      title: "ISO 27001 Aligned",
      desc: "Information security management system aligned to international standards.",
      badge: "International Standard",
      icon: Shield,
    },
    {
      title: "Role-Based Access",
      desc: "Granular permissions, SSO/SAML integration, and MFA enforcement for all users.",
      badge: "Enterprise SAML / SSO",
      icon: Key,
    },
  ];

  return (
    <section
      id="section-security"
      style={{
        padding: "90px 24px",
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              lineHeight: 1.1,
              letterSpacing: "-0.035em",
              marginBottom: "16px",
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
              Enterprise Security &
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
              Built for Regulated Industries
            </span>
          </motion.h2>
        </div>

        {/* 3D Circular Carousel (ReactBits style) replacing static grid & centerpiece */}
        <div style={{ marginBottom: "40px" }}>
          <Circular3DCarousel items={securityItems} isDark={isDark} />
        </div>

        {/* EU Hosting Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 24px",
              borderRadius: "12px",
              background: "var(--bg-card)",
              border: "1px solid var(--border-subtle)",
              fontSize: "13px",
              color: "var(--text-secondary)",
            }}
          >
            <Globe size={18} style={{ color: "var(--accent-mint)" }} />
            <span>
              All data hosted in EU-based infrastructure. Available for on-premise deployment for enterprise clients.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

