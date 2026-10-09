"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import { LogIn, Video, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggleGlitter from "./ThemeToggleGlitter";

interface NavbarProps {
  onOpenDemo: () => void;
  onOpenSignIn: () => void;
}

export function Navbar({ onOpenDemo, onOpenSignIn }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("Features");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Exact Nav Links from Screenshot 2
  const navLinks = [
    { name: "Features", href: "#section-process" },
    { name: "Solutions", href: "#section-capabilities" },
    { name: "Why RAccelerator", href: "#section-why-raccelerator" },
    { name: "Security", href: "#section-security" },
    { name: "FAQ", href: "#section-faq" },
  ];

  const isDark = theme === "dark";

  return (
    <header
      style={{
        position: "sticky",
        top: "12px",
        zIndex: 50,
        display: "flex",
        justifyContent: "center",
        padding: "0 24px",
        pointerEvents: "none",
      }}
    >
      {/* Sleek Navigation Bar matching Screenshot 2 */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        style={{
          pointerEvents: "auto",
          maxWidth: "1280px",
          width: "100%",
          padding: "10px 24px",
          borderRadius: "32px",
          background: scrolled
            ? isDark ? "rgba(7, 19, 14, 0.88)" : "rgba(255, 255, 255, 0.92)"
            : isDark ? "rgba(10, 25, 18, 0.78)" : "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: isDark ? "1px solid rgba(52, 211, 153, 0.25)" : "1px solid rgba(0, 0, 0, 0.1)",
          boxShadow: scrolled
            ? isDark ? "0 10px 30px rgba(0,0,0,0.5)" : "0 10px 30px rgba(0,0,0,0.08)"
            : "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
          transition: "all 0.3s ease",
        }}
      >
        {/* Brand Logo with Green R Icon (matching Screenshot 2 for Light & Dark mode) */}
        <a
          href="#"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
          }}
          aria-label="RAccelerator Home"
        >
          {/* Stylized Emerald Green R Logo Icon */}
          <div
            style={{
              width: "28px",
              height: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6 6H18C21.3137 6 24 8.68629 24 12C24 15.3137 21.3137 18 18 18H12M12 18V26M12 18L24 26"
                stroke={isDark ? "#34d399" : "#059669"}
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 14L12 18"
                stroke={isDark ? "#34d399" : "#059669"}
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <span
            style={{
              fontSize: "20px",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: isDark ? "#ffffff" : "#0f172a",
              fontFamily: "var(--font-sans)",
            }}
          >
            RAccelerator
          </span>
        </a>

        {/* Center Navigation Links (matching Screenshot 2: Features, Solutions, Why RAccelerator, Security, FAQ) */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const isActive = activeNav === link.name;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setActiveNav(link.name)}
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: isActive
                    ? isDark ? "#34d399" : "#059669"
                    : isDark ? "rgba(255, 255, 255, 0.7)" : "#475569",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right Action Bar (matching Screenshot 2: Glitter Sun/Moon Theme Toggle, Sign In, Book a Demo) */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Animated Glitter Sun / Moon Theme Toggle */}
          <ThemeToggleGlitter isDark={isDark} toggleTheme={toggleTheme} />

          {/* Sign In Button (matching Screenshot 2 with outline and login icon) */}
          <button
            onClick={onOpenSignIn}
            className="desktop-actions"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 18px",
              fontSize: "13px",
              borderRadius: "10px",
              fontWeight: 600,
              cursor: "pointer",
              background: isDark ? "rgba(15, 30, 22, 0.6)" : "rgba(255, 255, 255, 0.8)",
              border: isDark ? "1px solid rgba(52, 211, 153, 0.35)" : "1px solid rgba(5, 150, 105, 0.25)",
              color: isDark ? "#ffffff" : "#0f172a",
              transition: "all 0.2s ease",
            }}
          >
            <LogIn size={15} style={{ color: isDark ? "#34d399" : "#059669" }} />
            Sign In
          </button>

          {/* Book a Demo Button (matching Screenshot 2 bright glowing mint green pill button) */}
          <button
            onClick={onOpenDemo}
            className="desktop-actions"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 20px",
              fontSize: "13px",
              borderRadius: "10px",
              fontWeight: 700,
              cursor: "pointer",
              border: "none",
              background: isDark ? "#34d399" : "linear-gradient(135deg, #059669 0%, #10b981 100%)",
              color: isDark ? "#031910" : "#ffffff",
              boxShadow: isDark ? "0 0 20px rgba(52, 211, 153, 0.4)" : "0 4px 14px rgba(5, 150, 105, 0.25)",
              transition: "all 0.2s ease",
            }}
          >
            <Video size={15} />
            Book a Demo
          </button>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="mobile-menu-btn"
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              background: isDark ? "rgba(16, 185, 129, 0.15)" : "rgba(0, 0, 0, 0.05)",
              border: isDark ? "1px solid rgba(52, 211, 153, 0.3)" : "1px solid rgba(0, 0, 0, 0.1)",
              color: isDark ? "#ffffff" : "#0f172a",
            }}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            style={{
              pointerEvents: "auto",
              position: "absolute",
              top: "60px",
              left: "24px",
              right: "24px",
              borderRadius: "20px",
              background: isDark ? "rgba(8, 22, 16, 0.95)" : "#ffffff",
              border: isDark ? "1px solid rgba(52, 211, 153, 0.3)" : "1px solid rgba(0, 0, 0, 0.1)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
              padding: "20px",
              zIndex: 60,
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  padding: "10px 14px",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: isDark ? "#ffffff" : "#0f172a",
                  textDecoration: "none",
                  background: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)",
                }}
              >
                {link.name}
              </a>
            ))}
            <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSignIn();
                }}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "10px",
                  fontWeight: 600,
                  background: isDark ? "rgba(15, 30, 22, 0.8)" : "#f1f5f9",
                  border: isDark ? "1px solid rgba(52, 211, 153, 0.3)" : "1px solid rgba(0, 0, 0, 0.1)",
                  color: isDark ? "#ffffff" : "#0f172a",
                }}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemo();
                }}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "10px",
                  fontWeight: 700,
                  background: "#34d399",
                  color: "#031910",
                  border: "none",
                }}
              >
                Book a Demo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @media (max-width: 868px) {
          .desktop-nav {
            display: none !important;
          }
          .desktop-actions {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
