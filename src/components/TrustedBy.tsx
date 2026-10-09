"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { Quote, ArrowRight } from "lucide-react";

function HoloTestimonialCard({ item, index }: { item: any; index: number }) {
  const isLeft = index === 0;
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  const [holoPos, setHoloPos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width - 0.5) * 2; // -1 to 1
    const yPercent = (y / rect.height - 0.5) * 2; // -1 to 1

    const rotateX = -yPercent * 14; // 3D tilt X
    const rotateY = xPercent * 14;  // 3D tilt Y

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    setHoloPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setHoloPos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -110 : 110 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: "1000px" }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform,
          transformStyle: "preserve-3d",
          transition: "transform 0.15s ease-out, box-shadow 0.3s ease",
          position: "relative",
          borderRadius: "22px",
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        {/* Subtle Light Green Cursor Spotlight Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 2,
            borderRadius: "22px",
            opacity: holoPos.opacity,
            transition: "opacity 0.3s ease",
            background: `radial-gradient(circle at ${holoPos.x}% ${holoPos.y}%, rgba(110, 255, 206, 0.18) 0%, transparent 60%)`,
          }}
        />

        {/* Inner Content Panel */}
        <div
          className="glass-panel"
          style={{
            borderRadius: "22px",
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: "250px",
            background: "var(--bg-card)",
            border: holoPos.opacity > 0
              ? "2px solid #6effce"
              : "1px solid var(--border-subtle)",
            boxShadow: holoPos.opacity > 0
              ? "0 22px 45px rgba(0, 0, 0, 0.45), 0 0 30px rgba(110, 255, 206, 0.28)"
              : "0 10px 30px rgba(0, 0, 0, 0.15)",
            position: "relative",
            zIndex: 1,
            transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          }}
        >
          <div>
            <Quote size={32} style={{ color: "var(--accent-mint)", opacity: 0.75, marginBottom: "14px" }} />
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                fontStyle: "italic",
                color: "var(--text-primary)",
                marginBottom: "20px",
              }}
            >
              "{item.quote}"
            </p>
          </div>
          <div>
            <div style={{ fontSize: "15px", fontWeight: 800, color: "var(--accent-mint)" }}>
              {item.role}
            </div>
            <div style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "2px" }}>
              {item.company}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function TrustedBy() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [showCaseStudyModal, setShowCaseStudyModal] = useState(false);

  const labels = [
    "Class III Manufacturer",
    "IVD Platform",
    "Cardiac Devices",
    "Orthopedics",
    "Digital Health",
    "Neurostimulation",
  ];

  const testimonials = [
    {
      quote: "RAccelerator cut our GSPR assessment time from 12 weeks to 3. The deterministic AI means we trust every output our NB sees.",
      role: "VP Regulatory Affairs",
      company: "Class III Manufacturer",
    },
    {
      quote: "Finally, a tool that understands MDR at the standard-clause level. The gap analysis saved us from two critical findings at our stage 2 audit.",
      role: "Director RA",
      company: "Cardiac Device Startup",
    },
  ];

  return (
    <section
      id="section-trusted-by"
      style={{
        padding: "90px 24px",
        maxWidth: "1280px",
        margin: "0 auto",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
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
            Proven Results for
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
            Regulatory Leaders Worldwide
          </span>
        </motion.h2>
      </div>

      {/* Industry Badges */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ delay: 0.15 }}
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "48px",
        }}
      >
        {labels.map((label) => (
          <span
            key={label}
            style={{
              padding: "8px 18px",
              borderRadius: "30px",
              background: "var(--bg-card)",
              border: "1px solid var(--border-subtle)",
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--text-secondary)",
            }}
          >
            {label}
          </span>
        ))}
      </motion.div>

      {/* Testimonials Grid with ReactBits Holo Card Hover Effect */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
          marginBottom: "32px",
        }}
        className="testimonials-grid"
      >
        {testimonials.map((item, idx) => (
          <HoloTestimonialCard key={item.role} item={item} index={idx} />
        ))}
      </div>

      {/* Case Study Feature Card */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="glass-panel"
        style={{
          borderRadius: "20px",
          padding: "24px 32px",
          borderLeft: "4px solid var(--accent-mint)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-primary)", marginBottom: "6px" }}>
            Case Study: 60% Faster NB Submission
          </div>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
            A Class IIb cardiac device manufacturer reduced their submission timeline from 9 months to under 4 using RAccelerator’s automated GSPR assessment and gap remediation workflow.
          </p>
        </div>
        <button
          onClick={() => setShowCaseStudyModal(true)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 20px",
            fontSize: "13px",
            fontWeight: 700,
            borderRadius: "10px",
            border: "1px solid var(--accent-mint)",
            background: "transparent",
            color: "var(--accent-mint)",
            cursor: "pointer",
            transition: "all 0.2s ease",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--accent-mint-bg)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          Read Case Study <ArrowRight size={15} />
        </button>
      </motion.div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {showCaseStudyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCaseStudyModal(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(8px)",
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
                borderRadius: "24px",
                padding: "32px",
                background: "var(--bg-primary)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--accent-mint)", textTransform: "uppercase" }}>
                  Case Study Deep Dive
                </span>
                <button
                  onClick={() => setShowCaseStudyModal(false)}
                  style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "18px" }}
                >
                  ✕
                </button>
              </div>

              <h3 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "12px" }}>
                Accelerating Class IIb Notified Body Clearance
              </h3>

              <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
                <div style={{ flex: 1, padding: "12px", borderRadius: "10px", background: "var(--bg-secondary)", textAlign: "center" }}>
                  <div style={{ fontSize: "20px", fontWeight: 800, color: "var(--accent-mint)" }}>9 mos → 3.8 mos</div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Submission Timeline</div>
                </div>
                <div style={{ flex: 1, padding: "12px", borderRadius: "10px", background: "var(--bg-secondary)", textAlign: "center" }}>
                  <div style={{ fontSize: "20px", fontWeight: 800, color: "var(--accent-emerald)" }}>0 Critical Gaps</div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>At Stage 2 Audit</div>
                </div>
              </div>

              <p style={{ fontSize: "14px", lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: "20px" }}>
                The engineering and regulatory team utilized RAccelerator’s GSPR RAC-Agent to automatically cross-verify 42 technical file documents against 23 GSPR requirements under EU MDR 2017/745 Annex I. RAccelerator auto-detected 3 missing software validation test records under IEC 62304 and generated a remediation plan that closed all gaps prior to initial Notified Body submission.
              </p>

              <button
                onClick={() => setShowCaseStudyModal(false)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "none",
                  background: "var(--accent-mint)",
                  color: "var(--bg-primary)",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Close Case Study
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @media (max-width: 768px) {
          .testimonials-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

export default TrustedBy;

