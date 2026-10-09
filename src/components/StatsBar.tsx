"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FileCheck, ShieldAlert, Cpu, Award } from "lucide-react";

interface CountUpNumberProps {
  targetNumber: number;
  suffix?: string;
  duration?: number;
}

function CountUpNumber({ targetNumber, suffix = "", duration = 1200 }: CountUpNumberProps) {
  const [count, setCount] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.2, once: false });

  useEffect(() => {
    if (!isInView) {
      setCount(0);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic curve for smooth count deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeProgress * targetNumber);

      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateCount);
      } else {
        setCount(targetNumber);
      }
    };

    animationFrameId = requestAnimationFrame(animateCount);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, targetNumber, duration]);

  return (
    <div ref={ref} style={{ display: "inline-block" }}>
      {count}
      {suffix}
    </div>
  );
}

export function StatsBar() {
  const stats = [
    {
      targetNumber: 23,
      suffix: "",
      label: "GSPRs Mapped per Device (MDR)",
      icon: FileCheck,
      detail: "EU MDR 2017/745 Annex I",
      from: "bottom-left", // Cards 1 & 2: Slide from Bottom-Left
    },
    {
      targetNumber: 20,
      suffix: "",
      label: "GSPRs Mapped per Device (IVDR)",
      icon: Cpu,
      detail: "EU IVDR 2017/746 Annex I",
      from: "bottom-left", // Cards 1 & 2: Slide from Bottom-Left
    },
    {
      targetNumber: 22,
      suffix: "",
      label: "Annex VIII Classification Rules",
      icon: ShieldAlert,
      detail: "Automated Rule Execution",
      from: "top-right", // Cards 3 & 4: Slide from Top-Right
    },
    {
      targetNumber: 21,
      suffix: " CFR 11",
      label: "Audit Trail Standard",
      icon: Award,
      detail: "FDA Electronic Records Compliant",
      from: "top-right", // Cards 3 & 4: Slide from Top-Right
    },
  ];

  return (
    <section
      id="section-stats"
      style={{
        background: "transparent",
        border: "none",
        padding: "40px 32px",
        width: "100%",
        maxWidth: "100%",
        margin: 0,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "stretch",
          justifyContent: "space-between",
          gap: "24px",
          flexWrap: "wrap",
        }}
        className="stats-cards-container"
      >
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          const isBottomLeft = stat.from === "bottom-left";

          return (
            <motion.div
              key={stat.label}
              initial={{
                opacity: 0,
                x: isBottomLeft ? -140 : 140,
                y: isBottomLeft ? 90 : -90,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
              }}
              viewport={{ once: false, amount: 0.2 }} // Re-triggers animation whenever section enters view
              transition={{
                duration: 0.85,
                delay: (idx % 2) * 0.16,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                y: -6,
                boxShadow: "0 16px 40px rgba(5, 150, 105, 0.18)",
                borderColor: "var(--accent-mint)",
              }}
              style={{
                flex: "1 1 240px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "22px 24px",
                borderRadius: "22px",
                background: "var(--bg-card)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                border: "1px solid var(--border-subtle)",
                boxShadow: "var(--shadow-card)",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
                minWidth: "240px",
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "16px",
                  background: "var(--accent-mint-bg)",
                  border: "1px solid var(--border-glow)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  color: "var(--accent-mint)",
                  boxShadow: "0 0 18px var(--accent-mint-glow)",
                }}
              >
                <Icon size={25} />
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: "28px",
                    fontWeight: 850,
                    fontFamily: "var(--font-sans)",
                    color: "var(--accent-mint)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  <CountUpNumber
                    targetNumber={stat.targetNumber}
                    suffix={stat.suffix}
                    duration={1300 + idx * 100}
                  />
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginTop: "3px",
                    lineHeight: 1.3,
                  }}
                >
                  {stat.label}
                </div>
                <div
                  style={{
                    fontSize: "10.5px",
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-mono)",
                    marginTop: "4px",
                  }}
                >
                  {stat.detail}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .stats-cards-container {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .stats-cards-container {
            display: grid !important;
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

export default StatsBar;
