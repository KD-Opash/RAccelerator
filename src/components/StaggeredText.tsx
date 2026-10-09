"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, Variants, AnimatePresence } from "framer-motion";

export interface StaggeredTextProps {
  text?: string;
  line1?: string;
  line2?: string;
  lines?: { line1: string; line2: string }[];
  segmentBy?: "words" | "chars" | "lines";
  staggerDirection?: "forward" | "reverse" | "center";
  direction?: "top" | "bottom" | "left" | "right";
  duration?: number;
  delay?: number;
  blur?: boolean;
  loop?: boolean;
  loopDelay?: number;
  className?: string;
  style?: React.CSSProperties;
  line1Style?: React.CSSProperties;
  line2Style?: React.CSSProperties;
  once?: boolean;
}

export function StaggeredText({
  text,
  line1 = "EU MDR and IVDR",
  line2 = "ongoing compliance.",
  lines,
  segmentBy = "chars",
  staggerDirection = "forward",
  direction = "bottom",
  duration = 0.55,
  delay = 0.035,
  blur = true,
  loop = true,
  loopDelay = 3200,
  className = "",
  style = {},
  line1Style = {},
  line2Style = {},
  once = false,
}: StaggeredTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once });
  const [animKey, setAnimKey] = useState<number>(0);

  // Continuous infinite loop trigger
  useEffect(() => {
    if (!loop || !isInView) return;

    // Calculate total cycle time = stagger delay + character count time + duration + loopDelay
    const totalCharCount = (line1 + (line2 || "")).length;
    const totalCycleTime = totalCharCount * delay * 1000 + duration * 1000 + loopDelay;

    const timer = setInterval(() => {
      setAnimKey((prev) => prev + 1);
    }, totalCycleTime);

    return () => clearInterval(timer);
  }, [loop, isInView, line1, line2, delay, duration, loopDelay]);

  // Calculate motion initial offsets
  const getInitialOffset = () => {
    switch (direction) {
      case "top":
        return { y: -24, x: 0, scale: 0.92 };
      case "bottom":
        return { y: 24, x: 0, scale: 0.92 };
      case "left":
        return { x: -24, y: 0, scale: 0.92 };
      case "right":
        return { x: 24, y: 0, scale: 0.92 };
      default:
        return { y: 24, x: 0, scale: 0.92 };
    }
  };

  const offset = getInitialOffset();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
        staggerDirection: staggerDirection === "reverse" ? -1 : 1,
        delayChildren: 0.08,
      },
    },
    exit: {
      opacity: 0,
      filter: blur ? "blur(12px)" : "blur(0px)",
      transition: { duration: 0.45 },
    },
  };

  const childVariants: Variants = {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
      scale: offset.scale,
      filter: blur ? "blur(16px)" : "blur(0px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: duration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -15,
      filter: blur ? "blur(12px)" : "blur(0px)",
      transition: { duration: 0.3 },
    },
  };

  // Render text segmented by characters (word-safe wrapping)
  const renderSegmentedChars = (str: string, customStyle?: React.CSSProperties) => {
    const words = str.split(" ");
    return (
      <motion.span
        key={animKey}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={{ display: "inline-block", ...customStyle }}
      >
        {words.map((word, wIdx) => (
          <span key={wIdx} style={{ display: "inline-block", whiteSpace: "nowrap", marginRight: "0.28em" }}>
            {Array.from(word).map((char, cIdx) => (
              <motion.span
                key={cIdx}
                variants={childVariants}
                style={{ display: "inline-block", willChange: "transform, opacity, filter" }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.span>
    );
  };

  // Render text segmented by words
  const renderSegmentedWords = (str: string, customStyle?: React.CSSProperties) => {
    const words = str.split(" ");
    return (
      <motion.span
        key={animKey}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={{ display: "inline-block", ...customStyle }}
      >
        {words.map((word, wIdx) => (
          <motion.span
            key={wIdx}
            variants={childVariants}
            style={{ display: "inline-block", marginRight: "0.28em", willChange: "transform, opacity, filter" }}
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    );
  };

  const renderContent = (str: string, customStyle?: React.CSSProperties) => {
    return segmentBy === "chars"
      ? renderSegmentedChars(str, customStyle)
      : renderSegmentedWords(str, customStyle);
  };

  // If explicit single line text prop passed
  if (text) {
    return (
      <div ref={containerRef} className={className} style={{ textAlign: "center", ...style }}>
        <AnimatePresence mode="wait">
          {renderContent(text, line1Style)}
        </AnimatePresence>
      </div>
    );
  }

  // Determine active line 1 & line 2
  const activeLine1 = lines && lines.length > 0 ? lines[0].line1 : line1;
  const activeLine2 = lines && lines.length > 0 ? lines[0].line2 : line2;

  return (
    <div ref={containerRef} className={className} style={{ textAlign: "center", ...style }}>
      <AnimatePresence mode="wait">
        <div key={`line1-${animKey}`} style={{ marginBottom: "4px", ...line1Style }}>
          {renderContent(activeLine1, line1Style)}
        </div>
        {activeLine2 && (
          <div key={`line2-${animKey}`} style={{ ...line2Style }}>
            {renderContent(activeLine2, line2Style)}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default StaggeredText;
