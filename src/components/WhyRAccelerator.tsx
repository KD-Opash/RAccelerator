import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useTheme } from "./ThemeProvider";
import { RefreshCw, GitBranch, ShieldCheck, XCircle, CheckCircle2 } from "lucide-react";

// Galaxy Glitter Canvas Background Component with small twinkling star particles
function GalaxyGlitterCanvas() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // 220 Galaxy Glitter Small Point Stars
    const starCount = 220;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.6 + 0.5, // Small small points
      baseAlpha: Math.random() * 0.5 + 0.25,
      twinkleSpeed: Math.random() * 0.05 + 0.015,
      phase: Math.random() * Math.PI * 2,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      color: Math.random() > 0.35
        ? (isDark ? "#6effce" : "#059669")
        : (Math.random() > 0.5 ? "#38bdf8" : "#ffffff"),
    }));

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.03;

      // Pure Transparent Ambient Canvas (Matching Capabilities Section Background)

      // Draw Twinkling Galaxy Particle Points
      for (let i = 0; i < starCount; i++) {
        const s = stars[i];

        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        const alpha = Math.max(0.12, s.baseAlpha + Math.sin(time * s.twinkleSpeed * 10 + s.phase) * 0.4);

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = alpha;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = s.radius * 3.5;
        ctx.fill();
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

export function WhyRAccelerator() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const pillars = [
    {
      title: "Reproducible Results",
      icon: RefreshCw,
      desc: "Every GSPR assessment produces identical outputs given identical inputs. No hallucinations, no variation, no surprises at audit.",
    },
    {
      title: "Full Traceability",
      icon: GitBranch,
      desc: "Every AI determination links back to specific evidence anchors, classification rules, and applicable standards. Auditors see exact proof.",
    },
    {
      title: "Regulatory Validation",
      icon: ShieldCheck,
      desc: "Built on EU MDR 2017/745 Annex I, IVDR 2017/746, and ISO 14971 risk frameworks — not general-purpose LLM guesses.",
    },
  ];

  const genericAiPoints = [
    "Probabilistic outputs",
    "May hallucinate requirements",
    "No audit trail",
    "Varies between runs",
    "Black-box reasoning",
  ];

  const racceleratorPoints = [
    "Rule-based determinism",
    "Evidence-anchored findings",
    "Full 21 CFR Part 11 trail",
    "100% reproducible",
    "Transparent reasoning",
  ];

  return (
    <section
      id="section-why-raccelerator"
      style={{
        padding: "40px 24px 90px",
        background: "transparent",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* 2D HTML5 GALAXY GLITTER PARTICLE ANIMATION BACKGROUND */}
      <GalaxyGlitterCanvas />

      <div style={{ maxWidth: "1240px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "54px" }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
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
              Deterministic AI Engineering
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
              Compliance You Can Trust
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: "clamp(14px, 1.5vw, 16px)",
              lineHeight: 1.6,
              color: isDark ? "#94a3b8" : "#475569",
              maxWidth: "640px",
              margin: "0 auto",
              fontWeight: 450,
              fontFamily: "var(--font-sans)",
            }}
          >
            Medical device compliance demands mathematical precision, absolute reproducibility, and verifiable audit trails.
          </motion.p>
        </div>

        {/* 3-COLUMN CONNECTED ARCHITECTURE DIAGRAM */}
        <div
          className="architecture-container"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            gap: "0px",
            alignItems: "center",
            maxWidth: "1180px",
            margin: "0 auto",
          }}
        >
          {/* LEFT COLUMN: 5 RED GENERIC AI POINTS */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {genericAiPoints.map((pt, idx) => (
              <motion.div
                key={pt}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + idx * 0.08 }}
                whileHover={{ x: -4 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {/* Red Point Item Pill */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "14px 18px",
                    borderRadius: "14px",
                    background: isDark
                      ? "linear-gradient(135deg, rgba(239, 68, 68, 0.12) 0%, rgba(239, 68, 68, 0.04) 100%)"
                      : "linear-gradient(135deg, rgba(254, 242, 242, 0.95) 0%, rgba(254, 226, 226, 0.6) 100%)",
                    border: isDark
                      ? "1px solid rgba(239, 68, 68, 0.35)"
                      : "1px solid rgba(239, 68, 68, 0.25)",
                    boxShadow: isDark
                      ? "0 4px 20px rgba(239, 68, 68, 0.1)"
                      : "0 4px 15px rgba(239, 68, 68, 0.08)",
                  }}
                >
                  <XCircle size={18} style={{ color: "#ef4444", flexShrink: 0 }} />
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: isDark ? "#fca5a5" : "#991b1b",
                      lineHeight: 1.4,
                    }}
                  >
                    {pt}
                  </span>
                </div>

                {/* Straight Connecting Line to Center Card */}
                <div
                  className="connector-line"
                  style={{
                    width: "36px",
                    height: "2px",
                    background: isDark
                      ? "linear-gradient(90deg, #ef4444 0%, rgba(239, 68, 68, 0.3) 100%)"
                      : "linear-gradient(90deg, #ef4444 0%, #fca5a5 100%)",
                    flexShrink: 0,
                  }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* CENTER COLUMN: LONG VERTICAL SHAPE CARD WITH 3 PILLARS */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{
              width: "360px",
              maxWidth: "100%",
              borderRadius: "26px",
              padding: "32px 24px",
              background: isDark
                ? "linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(10, 25, 18, 0.95) 100%)"
                : "linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: isDark
                ? "1.5px solid rgba(52, 211, 153, 0.4)"
                : "1.5px solid rgba(5, 150, 105, 0.35)",
              boxShadow: isDark
                ? "0 25px 60px rgba(0, 0, 0, 0.6), 0 0 35px rgba(52, 211, 153, 0.15)"
                : "0 20px 45px rgba(5, 150, 105, 0.12), 0 4px 20px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              alignSelf: "stretch",
              justifyContent: "center",
              margin: "0 4px",
            }}
          >
            {/* Center Header Title */}
            <div style={{ textAlign: "center" }}>
              <h3
                style={{
                  fontSize: "21px",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                }}
              >
                Not All AI Is Created Equal
              </h3>
            </div>

            {/* 3 VERTICAL PILLARS INSIDE CENTER CARD */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {pillars.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <motion.div
                    key={p.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                    whileHover={{ y: -3 }}
                    style={{
                      padding: "16px",
                      borderRadius: "16px",
                      background: isDark
                        ? "rgba(255, 255, 255, 0.04)"
                        : "rgba(255, 255, 255, 0.9)",
                      border: isDark
                        ? "1px solid rgba(255, 255, 255, 0.08)"
                        : "1px solid rgba(5, 150, 105, 0.15)",
                      boxShadow: isDark
                        ? "0 4px 15px rgba(0,0,0,0.2)"
                        : "0 4px 12px rgba(0,0,0,0.03)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div
                        style={{
                          width: "34px",
                          height: "34px",
                          borderRadius: "10px",
                          background: "var(--accent-mint-bg)",
                          border: "1px solid var(--border-glow)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          color: "var(--accent-mint)",
                        }}
                      >
                        <Icon size={18} />
                      </div>
                      <h4
                        style={{
                          fontSize: "15px",
                          fontWeight: 750,
                          color: "var(--text-primary)",
                        }}
                      >
                        {p.title}
                      </h4>
                    </div>
                    <p
                      style={{
                        fontSize: "12px",
                        lineHeight: 1.55,
                        color: "var(--text-secondary)",
                        paddingLeft: "2px",
                      }}
                    >
                      {p.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT COLUMN: 5 GREEN RACCELERATOR POINTS */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {racceleratorPoints.map((pt, idx) => (
              <motion.div
                key={pt}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + idx * 0.08 }}
                whileHover={{ x: 4 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {/* Straight Connecting Line to Center Card */}
                <div
                  className="connector-line"
                  style={{
                    width: "36px",
                    height: "2px",
                    background: isDark
                      ? "linear-gradient(90deg, rgba(110, 255, 206, 0.4) 0%, #6effce 100%)"
                      : "linear-gradient(90deg, #a7f3d0 0%, #059669 100%)",
                    flexShrink: 0,
                  }}
                />

                {/* Green Point Item Pill */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "14px 18px",
                    borderRadius: "14px",
                    background: isDark
                      ? "linear-gradient(135deg, rgba(110, 255, 206, 0.12) 0%, rgba(16, 185, 129, 0.04) 100%)"
                      : "linear-gradient(135deg, rgba(236, 253, 245, 0.95) 0%, rgba(209, 250, 229, 0.6) 100%)",
                    border: isDark
                      ? "1px solid rgba(110, 255, 206, 0.4)"
                      : "1px solid rgba(16, 185, 129, 0.35)",
                    boxShadow: isDark
                      ? "0 4px 20px rgba(110, 255, 206, 0.12)"
                      : "0 4px 15px rgba(16, 185, 129, 0.1)",
                  }}
                >
                  <CheckCircle2
                    size={18}
                    style={{ color: isDark ? "#6effce" : "#059669", flexShrink: 0 }}
                  />
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: isDark ? "#ffffff" : "#064e3b",
                      lineHeight: 1.4,
                    }}
                  >
                    {pt}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 960px) {
          .architecture-container {
            grid-template-columns: 1fr !important;
            justify-items: center;
            gap: 24px !important;
          }
          .connector-line {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}



