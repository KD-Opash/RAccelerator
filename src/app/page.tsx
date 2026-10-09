"use client";

import React, { useState } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StatsBar } from "@/components/StatsBar";
import { RegulatoryProcessPipeline } from "@/components/RegulatoryProcessPipeline";
import { Capabilities } from "@/components/Capabilities";
import { WhyRAccelerator } from "@/components/WhyRAccelerator";
import { TrustedBy } from "@/components/TrustedBy";
import { SecuritySection } from "@/components/SecuritySection";
import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";
import { RaxyWidget } from "@/components/RaxyWidget";
import { Modals } from "@/components/Modals";

export default function Home() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [assessmentOpen, setAssessmentOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);

  return (
    <ThemeProvider>
      <div style={{ minHeight: "100vh", position: "relative" }}>
        {/* Animated Dynamic Canvas Particle Background (replaces static square grid) */}
        <AnimatedBackground />

        {/* Dynamic Floating Glass Island Navigation */}
        <Navbar
          onOpenDemo={() => setDemoOpen(true)}
          onOpenSignIn={() => setSignInOpen(true)}
        />

        {/* Main Landing Sections */}
        <main style={{ position: "relative", zIndex: 1 }}>
          <Hero
            onStartAssessment={() => setAssessmentOpen(true)}
            onBookDemo={() => setDemoOpen(true)}
          />

          <StatsBar />

          <RegulatoryProcessPipeline />

          <Capabilities />

          <WhyRAccelerator />

          <TrustedBy />

          <SecuritySection />

          <FaqSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating RAxy AI Agent Assistant Widget */}
        <RaxyWidget />

        {/* Interactive Experience Modals */}
        <Modals
          demoOpen={demoOpen}
          onCloseDemo={() => setDemoOpen(false)}
          assessmentOpen={assessmentOpen}
          onCloseAssessment={() => setAssessmentOpen(false)}
          signInOpen={signInOpen}
          onCloseSignIn={() => setSignInOpen(false)}
        />
      </div>
    </ThemeProvider>
  );
}
