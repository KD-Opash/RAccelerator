"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Video, Rocket, ArrowRight } from "lucide-react";

interface ModalsProps {
  demoOpen: boolean;
  onCloseDemo: () => void;
  assessmentOpen: boolean;
  onCloseAssessment: () => void;
  signInOpen: boolean;
  onCloseSignIn: () => void;
}

export function Modals({
  demoOpen,
  onCloseDemo,
  assessmentOpen,
  onCloseAssessment,
  signInOpen,
  onCloseSignIn,
}: ModalsProps) {
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [assessmentStep, setAssessmentStep] = useState(1);
  const [deviceType, setDeviceType] = useState("Software as a Medical Device (SaMD)");

  return (
    <>
      {/* Book a Demo Modal */}
      <AnimatePresence>
        {demoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCloseDemo}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              background: "rgba(0, 0, 0, 0.7)",
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
                maxWidth: "500px",
                width: "100%",
                borderRadius: "24px",
                padding: "32px",
                background: "var(--bg-primary)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Video size={20} style={{ color: "var(--accent-mint)" }} />
                  <span style={{ fontSize: "18px", fontWeight: 800 }}>Book a Live Platform Demo</span>
                </div>
                <button onClick={onCloseDemo} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
                  <X size={20} />
                </button>
              </div>

              {!demoSubmitted ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setDemoSubmitted(true);
                  }}
                  style={{ display: "flex", flexDirection: "column", gap: "16px" }}
                >
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "6px", display: "block" }}>
                      Work Email
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="alex.smith@medtech-company.com"
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        borderRadius: "10px",
                        border: "1px solid var(--border-input)",
                        background: "var(--bg-secondary)",
                        color: "var(--text-primary)",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "6px", display: "block" }}>
                      Company & Device Risk Class
                    </label>
                    <select
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        borderRadius: "10px",
                        border: "1px solid var(--border-input)",
                        background: "var(--bg-secondary)",
                        color: "var(--text-primary)",
                        outline: "none",
                      }}
                    >
                      <option>EU MDR Class IIb Device</option>
                      <option>EU MDR Class III Device</option>
                      <option>EU MDR Class IIa Device</option>
                      <option>EU IVDR (In Vitro Diagnostic)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    style={{
                      marginTop: "10px",
                      padding: "14px",
                      borderRadius: "12px",
                      border: "none",
                      background: "var(--accent-mint)",
                      color: "var(--bg-primary)",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Schedule Live Demo
                  </button>
                </form>
              ) : (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <CheckCircle size={48} style={{ color: "var(--accent-emerald)", margin: "0 auto 16px" }} />
                  <h4 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "8px" }}>Demo Reserved!</h4>
                  <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "20px" }}>
                    Our MedTech Regulatory Specialist will reach out shortly to tailor your demo.
                  </p>
                  <button
                    onClick={() => {
                      setDemoSubmitted(false);
                      onCloseDemo();
                    }}
                    style={{
                      padding: "10px 20px",
                      borderRadius: "10px",
                      border: "none",
                      background: "var(--bg-secondary)",
                      color: "var(--text-primary)",
                      cursor: "pointer",
                    }}
                  >
                    Done
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Start Gap Assessment Modal */}
      <AnimatePresence>
        {assessmentOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCloseAssessment}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              background: "rgba(0, 0, 0, 0.7)",
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
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Rocket size={20} style={{ color: "var(--accent-mint)" }} />
                  <span style={{ fontSize: "18px", fontWeight: 800 }}>Automated GSPR Gap Assessment</span>
                </div>
                <button onClick={onCloseAssessment} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
                  <X size={20} />
                </button>
              </div>

              {assessmentStep === 1 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
                    Step 1 of 2: Select your device category to initialize the Annex VIII rule engine.
                  </p>
                  {["Software as a Medical Device (SaMD)", "Active Therapeutic Device", "Active Diagnostic Device", "Implantable Medical Device"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setDeviceType(type)}
                      style={{
                        padding: "14px",
                        borderRadius: "12px",
                        textAlign: "left",
                        cursor: "pointer",
                        border: deviceType === type ? "1px solid var(--accent-mint)" : "1px solid var(--border-subtle)",
                        background: deviceType === type ? "var(--accent-mint-bg)" : "var(--bg-secondary)",
                        color: deviceType === type ? "var(--accent-mint)" : "var(--text-primary)",
                        fontWeight: 600,
                      }}
                    >
                      {type}
                    </button>
                  ))}
                  <button
                    onClick={() => setAssessmentStep(2)}
                    style={{
                      marginTop: "10px",
                      padding: "14px",
                      borderRadius: "12px",
                      border: "none",
                      background: "var(--accent-mint)",
                      color: "var(--bg-primary)",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    Run Classification Rules <ArrowRight size={16} />
                  </button>
                </div>
              )}

              {assessmentStep === 2 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ padding: "16px", borderRadius: "14px", background: "var(--accent-mint-bg)", border: "1px solid var(--border-glow)" }}>
                    <div style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase" }}>Analysis Complete</div>
                    <div style={{ fontSize: "20px", fontWeight: 800, color: "var(--accent-mint)", margin: "4px 0" }}>
                      Target: {deviceType}
                    </div>
                    <div style={{ fontSize: "13px", color: "var(--text-primary)" }}>
                      Engine output: <strong>Class IIb (Annex VIII Rule 11 hit)</strong>. 23 GSPRs mapped with 2 minor evidence gap warnings.
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setAssessmentStep(1);
                      onCloseAssessment();
                    }}
                    style={{
                      padding: "14px",
                      borderRadius: "12px",
                      border: "none",
                      background: "var(--accent-mint)",
                      color: "var(--bg-primary)",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Download Assessment Determination
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sign In Modal */}
      <AnimatePresence>
        {signInOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCloseSignIn}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              background: "rgba(0, 0, 0, 0.7)",
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
                maxWidth: "420px",
                width: "100%",
                borderRadius: "24px",
                padding: "32px",
                background: "var(--bg-primary)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <span style={{ fontSize: "18px", fontWeight: 800 }}>Sign In to RAccelerator</span>
                <button onClick={onCloseSignIn} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); onCloseSignIn(); }} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "6px", display: "block" }}>
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="user@company.com"
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      border: "1px solid var(--border-input)",
                      background: "var(--bg-secondary)",
                      color: "var(--text-primary)",
                      outline: "none",
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "6px", display: "block" }}>
                    Password
                  </label>
                  <input
                    required
                    type="password"
                    placeholder="••••••••••••"
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      border: "1px solid var(--border-input)",
                      background: "var(--bg-secondary)",
                      color: "var(--text-primary)",
                      outline: "none",
                    }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    padding: "14px",
                    borderRadius: "12px",
                    border: "none",
                    background: "var(--accent-mint)",
                    color: "var(--bg-primary)",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Sign In
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
