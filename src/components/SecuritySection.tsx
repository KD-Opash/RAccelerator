"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, Key, Globe, FileCheck2 } from "lucide-react";
import { useTheme } from "./ThemeProvider";

function Circular3DCarousel({ items, isDark }: { items: any[]; isDark: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCardIdx, setHoveredCardIdx] = useState<number | null>(null);
  const [radius, setRadius] = useState(640);
  const [cardWidth, setCardWidth] = useState(300);
  const angleRef = useRef(0);
  const isHoveredRef = useRef(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Duplicate items to form a 12-card continuous 3D ring
  const displayItems = useRef([...items, ...items]).current;
  const total = displayItems.length; // 12

  const updateCardTransforms = (angle: number, currentRadius: number) => {
    const angleStep = 360 / total;
    for (let idx = 0; idx < total; idx++) {
      const el = cardRefs.current[idx];
      if (!el) continue;
      const cardBaseAngle = idx * angleStep;
      const totalAngle = (cardBaseAngle + angle) % 360;
      const relAngle = ((totalAngle % 360) + 540) % 360 - 180;
      const radAngle = (relAngle * Math.PI) / 180;
      const cosVal = Math.cos(radAngle);
      const x = Math.sin(radAngle) * currentRadius;
      const z = cosVal * currentRadius - currentRadius;
      const rawOpacity = (cosVal + 0.45) / 1.45;
      const opacity = Math.max(0, Math.min(1, rawOpacity));
      const isCardHovered = hoveredCardIdx === idx;
      const scale = isCardHovered ? 1.08 : Math.max(0.82, 0.82 + Math.max(0, cosVal) * 0.18);
      const zIndex = isCardHovered ? 300 : Math.round((cosVal + 1) * 100);

      el.style.transform = `translate3d(${x.toFixed(1)}px, 0px, ${z.toFixed(1)}px) rotateY(${relAngle.toFixed(1)}deg) scale(${scale.toFixed(2)})`;
      el.style.opacity = `${opacity.toFixed(2)}`;
      el.style.zIndex = `${zIndex}`;
    }
  };

  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    const handleResize = () => {
      let r = 640;
      let w = 300;
      if (window.innerWidth < 640) {
        r = 300;
        w = 230;
      } else if (window.innerWidth < 1024) {
        r = 450;
        w = 260;
      }
      setRadius(r);
      setCardWidth(w);
      updateCardTransforms(angleRef.current, r);
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

      if (!isHoveredRef.current && !document.hidden) {
        angleRef.current = (angleRef.current + delta * 0.005) % 360;
        updateCardTransforms(angleRef.current, radius);
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [radius]);

  const handlePan = (_e: any, info: any) => {
    angleRef.current = (angleRef.current - info.delta.x * 0.2) % 360;
    updateCardTransforms(angleRef.current, radius);
  };

  return (
    <div
      style={{ position: "relative", width: "100%", padding: "0" }}
      onMouseEnter={() => {
        setIsHovered(true);
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        isHoveredRef.current = false;
        setHoveredCardIdx(null);
      }}
    >
      {/* 3D Scene Viewport */}
      <motion.div
        onPan={handlePan}
        style={{
          height: "300px",
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
            width: `${cardWidth}px`,
            height: "235px",
            transformStyle: "preserve-3d",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {displayItems.map((item, idx) => {
            const Icon = item.icon;
            const isCardHovered = hoveredCardIdx === idx;

            return (
              <div
                key={`${item.title}-${idx}`}
                ref={(el) => { cardRefs.current[idx] = el; }}
                onMouseEnter={() => setHoveredCardIdx(idx)}
                onMouseLeave={() => setHoveredCardIdx(null)}
                style={{
                  position: "absolute",
                  width: `${cardWidth}px`,
                  height: "235px",
                  borderRadius: "20px",
                  padding: "24px",
                  willChange: "transform, opacity",
                  transition: isHovered
                    ? "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease"
                    : "none",
                  background: isDark ? "#0b1d30" : "var(--bg-card)",
                  border: "none",
                  boxShadow: isCardHovered
                    ? isDark
                      ? "0 16px 45px rgba(0, 0, 0, 0.45), 0 0 30px rgba(110, 255, 206, 0.22)"
                      : "0 16px 35px rgba(5, 150, 105, 0.18)"
                    : isDark
                    ? "0 10px 30px rgba(0, 0, 0, 0.3), 0 0 18px rgba(110, 255, 206, 0.09)"
                    : "0 8px 24px rgba(5, 150, 105, 0.08)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  backfaceVisibility: "hidden",
                  cursor: "pointer",
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
                        background: isCardHovered
                          ? isDark
                            ? "rgba(110, 255, 206, 0.2)"
                            : "rgba(5, 150, 105, 0.15)"
                          : isDark
                          ? "rgba(110, 255, 206, 0.1)"
                          : "rgba(5, 150, 105, 0.08)",
                        border: isCardHovered
                          ? isDark
                            ? "1px solid #6effce"
                            : "1px solid #059669"
                          : isDark
                          ? "1px solid rgba(110, 255, 206, 0.25)"
                          : "1px solid rgba(5, 150, 105, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: isDark ? "#6effce" : "#059669",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    {isCardHovered && (
                      <span
                        style={{
                          fontSize: "9.5px",
                          fontWeight: 800,
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                          color: isDark ? "#6effce" : "#059669",
                          background: isDark
                            ? "rgba(110, 255, 206, 0.15)"
                            : "rgba(5, 150, 105, 0.12)",
                          padding: "4px 8px",
                          borderRadius: "6px",
                          fontFamily: "var(--font-mono)",
                          border: isDark
                            ? "1px solid rgba(110, 255, 206, 0.25)"
                            : "1px solid rgba(5, 150, 105, 0.18)",
                        }}
                      >
                        ACTIVE VERIFIED
                      </span>
                    )}
                  </div>
                  <h3
                    style={{
                      fontSize: "17px",
                      fontWeight: 800,
                      color: isDark ? "#ffffff" : "#0f172a",
                      marginBottom: "6px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "12.5px",
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
                    color: isCardHovered
                      ? isDark
                        ? "#6effce"
                        : "#059669"
                      : isDark
                      ? "#64748b"
                      : "#94a3b8",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    borderTop: isDark
                      ? "1px solid rgba(255, 255, 255, 0.08)"
                      : "1px solid rgba(0, 0, 0, 0.06)",
                    paddingTop: "10px",
                    marginTop: "8px",
                    transition: "color 0.2s ease",
                  }}
                >
                  <span style={{ fontSize: "12.5px" }}>✓</span> {item.badge}
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
        padding: "50px 24px 30px",
        background: "transparent",
        border: "none",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
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
                marginTop: "4px",
              }}
            >
              Built for Regulated Industries
            </span>
          </motion.h2>
        </div>

        {/* 3D Circular Carousel matching ReactBits images 2 & 3 */}
        <div style={{ marginBottom: "12px" }}>
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
              gap: "12px",
              padding: "14px 28px",
              borderRadius: "14px",
              background: isDark ? "#0b1d30" : "var(--bg-card)",
              border: isDark
                ? "1px solid rgba(110, 255, 206, 0.2)"
                : "1px solid var(--border-subtle)",
              fontSize: "13.5px",
              fontWeight: 500,
              color: isDark ? "#cbd5e1" : "var(--text-secondary)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
            }}
          >
            <Globe size={19} style={{ color: isDark ? "#6effce" : "var(--accent-mint)" }} />
            <span>
              All data hosted in EU-based infrastructure. Available for on-premise deployment for enterprise clients.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}




