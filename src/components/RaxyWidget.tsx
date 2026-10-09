"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, Heart, Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";

export function RaxyWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: "raxy" | "user"; text: string }>>([
    {
      sender: "raxy",
      text: "Hello! I am RAxy, your RAccelerator Regulatory AI Assistant. Ask me anything about EU MDR 2017/745 Annex VIII classification rules, IVDR Annex I GSPRs, or 21 CFR Part 11 traceability!",
    },
  ]);
  const [inputVal, setInputVal] = useState("");

  const handleSend = () => {
    if (!inputVal.trim()) return;
    const userMsg = inputVal;
    setInputVal("");

    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);

    setTimeout(() => {
      let response = "Based on EU MDR Annex VIII Rule 11, software intended to provide information used to take decisions with diagnosis or therapeutic purposes is classified as Class IIa or Class IIb depending on severity. Would you like to generate a classification determination report?";
      if (userMsg.toLowerCase().includes("gspr") || userMsg.toLowerCase().includes("annex i")) {
        response = "MDR Annex I contains 23 General Safety and Performance Requirements (GSPRs). RAccelerator maps your technical documentation to each requirement and identifies missing risk files or standards verification.";
      } else if (userMsg.toLowerCase().includes("security") || userMsg.toLowerCase().includes("21 cfr")) {
        response = "RAccelerator ensures 21 CFR Part 11 compliance using cryptographic SHA-256 evidence anchoring, electronic signatures, and immutable audit logs.";
      }
      setMessages((prev) => [...prev, { sender: "raxy", text: response }]);
    }, 700);
  };

  return (
    <>
      {/* Floating Trigger Widget */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open RAxy Regulatory AI Chat"
        title="Ask RAxy AI · MedTech Compliance Agent"
        style={{
          position: "fixed",
          right: "24px",
          bottom: "24px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, var(--accent-mint) 0%, #3b82f6 100%)",
          color: "#041426",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          border: "none",
          zIndex: 90,
          boxShadow: "0 8px 25px var(--accent-mint-glow)",
        }}
      >
        <svg viewBox="0 0 1024 1024" width="26" height="26" role="presentation" style={{ display: "block" }}>
          <path
            fill="#041426"
            d="M211.442 194.001C306.14 194.928 534.633 197.11 587.668 197.11C736.499 197.11 787 309.748 787 374.092C787 434.763 764.327 541.979 641.058 554.021C631.31 554.973 626.5 565.5 633.357 572.493C636.823 576.027 640.129 579.358 642.542 581.896L848.734 803.86C858.204 814.01 851.236 830.032 837.354 830.032H723.19C720.234 830.032 717.4 828.833 715.38 826.674C706.269 816.936 696.723 805.746 687.84 796.032L378.31 462.098C370.585 453.764 377.262 438.441 388.626 438.438L587.668 438.436C679.004 438.436 673.5 310.084 587.668 310.084C486.37 310.092 333.257 310.097 292.874 310.098C286.38 310.098 280.27 307.466 275.75 302.804L198.834 223.47C188.112 212.375 196.014 193.85 211.442 194.001ZM170 388.77C170 377.981 183.129 372.672 190.628 380.429L459.266 658.307C466.325 665.609 461.754 677.833 451.629 678.626C402.275 682.49 297.953 690.783 295.81 692.021C293.732 693.221 226.15 768.45 190.916 807.746C183.563 815.947 170 810.702 170 799.688V388.77Z"
          />
        </svg>
        {/* Heartbeat Status Indicator */}
        <span
          className="animate-heartbeat"
          style={{
            position: "absolute",
            top: "2px",
            right: "2px",
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            background: "#ff4b4b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 10px #ff4b4b",
          }}
        >
          <Heart size={10} fill="#ffffff" color="#ffffff" />
        </span>
      </motion.button>

      {/* RAxy Chat Modal / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="glass-panel"
            style={{
              position: "fixed",
              right: "24px",
              bottom: "96px",
              width: "clamp(320px, 90vw, 400px)",
              height: "500px",
              borderRadius: "24px",
              zIndex: 95,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              background: "var(--bg-primary)",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "16px 20px",
                background: "var(--bg-secondary)",
                borderBottom: "1px solid var(--border-subtle)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "10px",
                    background: "var(--accent-mint)",
                    color: "var(--bg-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Bot size={18} />
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)" }}>
                    RAxy Regulatory Agent
                  </div>
                  <div style={{ fontSize: "10px", color: "var(--accent-emerald)", display: "flex", alignItems: "center", gap: "4px" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent-emerald)" }} />
                    Deterministic AI Active
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Message History */}
            <div
              style={{
                flex: 1,
                padding: "16px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                    maxWidth: "85%",
                    padding: "12px 14px",
                    borderRadius: "14px",
                    fontSize: "13px",
                    lineHeight: 1.5,
                    background: msg.sender === "user" ? "var(--accent-mint)" : "var(--bg-secondary)",
                    color: msg.sender === "user" ? "var(--bg-primary)" : "var(--text-primary)",
                    border: msg.sender === "raxy" ? "1px solid var(--border-subtle)" : "none",
                  }}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <div
              style={{
                padding: "12px",
                borderTop: "1px solid var(--border-subtle)",
                display: "flex",
                gap: "8px",
              }}
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask RAxy about EU MDR or IVDR..."
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "1px solid var(--border-input)",
                  background: "var(--bg-secondary)",
                  color: "var(--text-primary)",
                  fontSize: "13px",
                  outline: "none",
                }}
              />
              <button
                onClick={handleSend}
                style={{
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "none",
                  background: "var(--accent-mint)",
                  color: "var(--bg-primary)",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
