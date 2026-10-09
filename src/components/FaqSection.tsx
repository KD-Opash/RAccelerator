import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { ChevronDown, HelpCircle } from "lucide-react";

export function FaqSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does RAccelerator’s AI ensure classification accuracy?",
      a: "RAccelerator uses a deterministic, rule-based AI engine built on the complete MDR Annex VIII classification rule set. Every determination is evidence-anchored and reproducible — not probabilistic. Each output cites the rules applied, the evidence anchors that informed the conclusion, and the standard clauses that govern the determination, so a Notified Body reviewer can re-trace the reasoning end-to-end.",
    },
    {
      q: "Is my regulatory data secure?",
      a: "Yes. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We are SOC 2 Type II audited, GDPR compliant, and offer EU-based data residency. Access is controlled via role-based permissions with mandatory MFA.",
    },
    {
      q: "Does this work for Class I, IIa, IIb, and III devices?",
      a: "Yes. RAccelerator supports classification and GSPR assessment for all MDR risk classes, including Class I devices with measuring function or sterile variants. The platform also supports IVDR devices under EU IVDR 2017/746.",
    },
    {
      q: "Is RAccelerator accepted by Notified Bodies?",
      a: "RAccelerator generates documentation that aligns with Notified Body expectations for technical file structure, GSPR mapping format, and clinical evaluation report standards. Several of our clients have successfully used RAccelerator-generated reports in their NB submissions.",
    },
    {
      q: "What does onboarding look like?",
      a: "Onboarding takes 2–4 weeks depending on portfolio size. We configure your workspace, import existing documentation, and run initial GSPR assessments. Your dedicated Customer Success Manager guides the entire process.",
    },
    {
      q: "Can RAccelerator integrate with our existing QMS?",
      a: "Yes. RAccelerator offers API integrations with common QMS platforms and document management systems. We support SSO/SAML for identity management and can export data in standard formats for ingestion into your existing workflows.",
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="section-faq"
      style={{
        padding: "90px 24px",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
            Clear Answers for
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
            Regulatory & Engineering Leads
          </span>
        </motion.h2>
      </div>

      {/* Accordion List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="glass-panel"
              style={{
                borderRadius: "16px",
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => toggleFaq(idx)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${idx}`}
                style={{
                  width: "100%",
                  padding: "20px 24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)" }}>
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ color: "var(--accent-mint)", flexShrink: 0 }}
                >
                  <ChevronDown size={20} />
                </motion.div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    id={`faq-answer-${idx}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: "hidden" }}
                  >
                    <div
                      style={{
                        padding: "0 24px 20px",
                        borderTop: "1px solid var(--border-subtle)",
                        marginTop: "4px",
                        paddingTop: "16px",
                        fontSize: "14px",
                        lineHeight: 1.7,
                        color: "var(--text-secondary)",
                      }}
                    >
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
