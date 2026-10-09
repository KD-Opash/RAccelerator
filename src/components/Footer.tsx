"use client";

import React from "react";
import { Globe, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-subtle)",
        padding: "70px 24px 40px",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
            gap: "40px",
            marginBottom: "50px",
          }}
          className="footer-grid"
        >
          {/* Brand Col */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <svg viewBox="0 0 1024 1024" width="28" height="28" role="presentation" style={{ display: "block" }}>
                <path
                  fill="var(--accent-mint)"
                  d="M211.442 194.001C306.14 194.928 534.633 197.11 587.668 197.11C736.499 197.11 787 309.748 787 374.092C787 434.763 764.327 541.979 641.058 554.021C631.31 554.973 626.5 565.5 633.357 572.493C636.823 576.027 640.129 579.358 642.542 581.896L848.734 803.86C858.204 814.01 851.236 830.032 837.354 830.032H723.19C720.234 830.032 717.4 828.833 715.38 826.674C706.269 816.936 696.723 805.746 687.84 796.032L378.31 462.098C370.585 453.764 377.262 438.441 388.626 438.438L587.668 438.436C679.004 438.436 673.5 310.084 587.668 310.084C486.37 310.092 333.257 310.097 292.874 310.098C286.38 310.098 280.27 307.466 275.75 302.804L198.834 223.47C188.112 212.375 196.014 193.85 211.442 194.001ZM170 388.77C170 377.981 183.129 372.672 190.628 380.429L459.266 658.307C466.325 665.609 461.754 677.833 451.629 678.626C402.275 682.49 297.953 690.783 295.81 692.021C293.732 693.221 226.15 768.45 190.916 807.746C183.563 815.947 170 810.702 170 799.688V388.77Z"
                />
              </svg>
              <span style={{ fontSize: "18px", fontWeight: 800, color: "var(--text-primary)" }}>
                RAccelerator
              </span>
            </div>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: "280px", marginBottom: "16px" }}>
              Regulatory intelligence for MedTech. Accelerating device lifecycle management from classification to NB submission.
            </p>
            <a
              href="https://www.RAccelerator.ai"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                fontFamily: "var(--font-mono)",
                color: "var(--accent-mint)",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              www.RAccelerator.ai <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Product Links */}
          <div>
            <div style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: "16px" }}>
              Product
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {["Features", "How It Works", "Pricing", "Security", "API Docs"].map((item) => (
                <a key={item} href="#section-features" style={{ fontSize: "13px", color: "var(--text-secondary)", textDecoration: "none" }}>
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Resources Links */}
          <div>
            <div style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: "16px" }}>
              Resources
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {["Blog", "EU MDR Guide", "GSPR Checklist", "Webinars", "Case Studies"].map((item) => (
                <a key={item} href="#section-trusted-by" style={{ fontSize: "13px", color: "var(--text-secondary)", textDecoration: "none" }}>
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <div style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: "16px" }}>
              Company
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {["About", "Careers", "Contact", "Privacy Policy", "Terms of Service"].map((item) => (
                <a key={item} href="#section-faq" style={{ fontSize: "13px", color: "var(--text-secondary)", textDecoration: "none" }}>
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div
          style={{
            borderTop: "1px solid var(--border-subtle)",
            paddingTop: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            fontSize: "12px",
            color: "var(--text-muted)",
          }}
        >
          <div>© 2026 RAccelerator LLC. All rights reserved.</div>
          <div style={{ display: "flex", gap: "20px" }}>
            <a href="#" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Privacy</a>
            <a href="#" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Terms</a>
            <a href="#" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Cookies</a>
            <a href="#" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Sitemap</a>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
