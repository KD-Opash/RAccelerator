"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Sparkles } from "lucide-react";

interface ThemeToggleGlitterProps {
  isDark: boolean;
  toggleTheme: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
}

export function ThemeToggleGlitter({ isDark, toggleTheme }: ThemeToggleGlitterProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerGlitterBurst = () => {
    setIsAnimating(true);

    // Generate 14 radial glitter sparkle particles matching brand emerald logo colors & warm gold sun accents
    const newParticles: Particle[] = [];
    const colors = isDark
      ? ["#10b981", "#059669", "#34d399", "#f59e0b", "#ffffff", "#047857"] // Brand Emerald & Golden Sun burst for Light Mode
      : ["#6effce", "#38bdf8", "#34d399", "#a7f3d0", "#ffffff", "#059669"]; // Neon Cyan/Mint burst for Dark Mode

    for (let i = 0; i < 14; i++) {
      const angle = (i / 14) * Math.PI * 2;
      const distance = 36 + Math.random() * 26;
      newParticles.push({
        id: Date.now() + i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        size: Math.random() * 8 + 4,
        color: colors[i % colors.length],
        rotation: Math.random() * 360,
      });
    }

    setParticles(newParticles);

    // Toggle theme
    toggleTheme();

    setTimeout(() => {
      setParticles([]);
      setIsAnimating(false);
    }, 750);
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* GLITTER EXPLOSION PARTICLES */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ opacity: 1, scale: 0, x: 0, y: 0, rotate: 0 }}
            animate={{
              opacity: [1, 1, 0],
              scale: [0, 1.5, 0.4],
              x: p.x,
              y: p.y,
              rotate: p.rotation + 180,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: `${p.size}px`,
              height: `${p.size}px`,
              marginTop: `-${p.size / 2}px`,
              marginLeft: `-${p.size / 2}px`,
              pointerEvents: "none",
              zIndex: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Sparkles size={p.size} style={{ color: p.color, filter: `drop-shadow(0 0 6px ${p.color})` }} />
          </motion.span>
        ))}
      </AnimatePresence>

      {/* RADIAL GLITTER EXPANDING RIPPLE RING */}
      {isAnimating && (
        <motion.span
          initial={{ opacity: 0.85, scale: 0.8 }}
          animate={{ opacity: 0, scale: 2.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "22px",
            border: `2px solid ${isDark ? "#059669" : "#6effce"}`,
            boxShadow: `0 0 20px ${isDark ? "rgba(5, 150, 105, 0.6)" : "rgba(110, 255, 206, 0.6)"}`,
            pointerEvents: "none",
            zIndex: 10,
          }}
        />
      )}

      {/* CLEAN 3D CAPSULE SWITCH WITH ICONS (TEXT REMOVED AS REQUESTED) */}
      <motion.button
        onClick={triggerGlitterBurst}
        whileTap={{ scale: 0.93 }}
        whileHover={{ scale: 1.05 }}
        aria-label="Toggle Light and Dark Theme Switch"
        style={{
          width: "74px",
          height: "38px",
          borderRadius: "22px",
          padding: "3px",
          cursor: "pointer",
          border: "none",
          background: isDark
            ? "linear-gradient(145deg, #0c201a 0%, #030d0a 100%)"
            : "linear-gradient(145deg, #ffffff 0%, #f1f5f9 100%)",
          outline: isDark ? "1.5px solid rgba(110, 255, 206, 0.45)" : "1.5px solid rgba(5, 150, 105, 0.35)",
          boxShadow: isDark
            ? "0 6px 20px rgba(0, 0, 0, 0.7), inset 0 2px 6px rgba(0, 0, 0, 0.8), inset 0 -1px 3px rgba(110, 255, 206, 0.25)"
            : "0 6px 18px rgba(5, 150, 105, 0.14), 0 2px 6px rgba(0, 0, 0, 0.04), inset 0 2px 4px rgba(255, 255, 255, 1), inset 0 -2px 4px rgba(15, 23, 42, 0.04)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Track Icons Background (Sun on Left, Moon on Right) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            padding: "0 10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pointerEvents: "none",
            opacity: 0.65,
          }}
        >
          <Sun size={14} style={{ color: isDark ? "#6effce" : "#d97706" }} />
          <Moon size={14} style={{ color: isDark ? "#6effce" : "#059669" }} />
        </div>

        {/* SLIDING 3D SQUIRCLE THUMB PILL BUTTON */}
        <motion.div
          animate={{ x: isDark ? 36 : 0 }}
          transition={{ type: "spring", stiffness: 480, damping: 28 }}
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "16px",
            background: isDark
              ? "linear-gradient(135deg, #34d399 0%, #059669 100%)"
              : "linear-gradient(135deg, #10b981 0%, #047857 100%)",
            boxShadow: isDark
              ? "0 3px 12px rgba(52, 211, 153, 0.55), inset 0 1px 3px rgba(255, 255, 255, 0.5)"
              : "0 3px 12px rgba(5, 150, 105, 0.45), inset 0 1.5px 3px rgba(255, 255, 255, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 5,
          }}
        >
          {/* Top Glass Arc Highlight */}
          <span
            style={{
              position: "absolute",
              top: "2px",
              left: "4px",
              right: "4px",
              height: "10px",
              borderRadius: "8px 8px 0 0",
              background: "linear-gradient(180deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 100%)",
              pointerEvents: "none",
            }}
          />

          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div
                key="moon-icon"
                initial={{ rotate: -90, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: 90, scale: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <Moon size={16} style={{ color: "#ffffff", filter: "drop-shadow(0 0 5px rgba(255,255,255,0.9))" }} />
              </motion.div>
            ) : (
              <motion.div
                key="sun-icon"
                initial={{ rotate: 90, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: -90, scale: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <Sun size={17} style={{ color: "#ffffff", filter: "drop-shadow(0 0 5px rgba(255,255,255,0.9))" }} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.button>
    </div>
  );
}

export default ThemeToggleGlitter;
