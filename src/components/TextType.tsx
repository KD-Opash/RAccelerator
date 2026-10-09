"use client";

import React, { useState, useEffect } from "react";

export interface TitlePair {
  line1: string;
  line2: string;
}

export interface MultiLineTextTypeProps {
  pairs: TitlePair[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  loop?: boolean;
  cursorChar?: string;
  cursorColor?: string;
  line1Style?: React.CSSProperties;
  line2Style?: React.CSSProperties;
}

type TypePhase = "TYPING_LINE_1" | "TYPING_LINE_2" | "PAUSED" | "DELETING_LINE_2" | "DELETING_LINE_1";

export function MultiLineTextType({
  pairs,
  typingSpeed = 65,
  deletingSpeed = 30,
  pauseTime = 2500,
  loop = true,
  cursorChar = "|",
  cursorColor = "var(--accent-mint)",
  line1Style,
  line2Style,
}: MultiLineTextTypeProps) {
  const [pairIndex, setPairIndex] = useState(0);
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [phase, setPhase] = useState<TypePhase>("TYPING_LINE_1");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentPair = pairs[pairIndex];
    if (!currentPair) return;

    if (phase === "TYPING_LINE_1") {
      if (text1.length < currentPair.line1.length) {
        timer = setTimeout(() => {
          setText1(currentPair.line1.substring(0, text1.length + 1));
        }, typingSpeed);
      } else {
        setPhase("TYPING_LINE_2");
      }
    } else if (phase === "TYPING_LINE_2") {
      if (text2.length < currentPair.line2.length) {
        timer = setTimeout(() => {
          setText2(currentPair.line2.substring(0, text2.length + 1));
        }, typingSpeed);
      } else {
        setPhase("PAUSED");
      }
    } else if (phase === "PAUSED") {
      timer = setTimeout(() => {
        setPhase("DELETING_LINE_2");
      }, pauseTime);
    } else if (phase === "DELETING_LINE_2") {
      if (text2.length > 0) {
        timer = setTimeout(() => {
          setText2(text2.substring(0, text2.length - 1));
        }, deletingSpeed);
      } else {
        setPhase("DELETING_LINE_1");
      }
    } else if (phase === "DELETING_LINE_1") {
      if (text1.length > 0) {
        timer = setTimeout(() => {
          setText1(text1.substring(0, text1.length - 1));
        }, deletingSpeed);
      } else {
        if (loop) {
          setPairIndex((prev) => (prev + 1) % pairs.length);
          setPhase("TYPING_LINE_1");
        }
      }
    }

    return () => clearTimeout(timer);
  }, [text1, text2, phase, pairIndex, pairs, typingSpeed, deletingSpeed, pauseTime, loop]);

  const isCursorOnLine1 = phase === "TYPING_LINE_1" || phase === "DELETING_LINE_1";
  const isCursorOnLine2 = phase === "TYPING_LINE_2" || phase === "PAUSED" || phase === "DELETING_LINE_2";

  const renderCursor = () => (
    <span
      className="text-type-cursor"
      style={{
        color: cursorColor,
        WebkitTextFillColor: cursorColor,
        fontWeight: 300,
        marginLeft: "4px",
        animation: "textTypeBlink 0.9s infinite",
        userSelect: "none",
        display: "inline-block",
      }}
    >
      {cursorChar}
    </span>
  );

  return (
    <>
      <span style={{ display: "block", minHeight: "1.1em" }}>
        <span style={line1Style}>{text1}</span>
        {isCursorOnLine1 && renderCursor()}
      </span>
      <span style={{ display: "block", minHeight: "1.1em" }}>
        <span style={line2Style}>{text2}</span>
        {isCursorOnLine2 && renderCursor()}
      </span>
    </>
  );
}

export interface TextTypeProps {
  text: string | string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  loop?: boolean;
  showCursor?: boolean;
  cursorChar?: string;
  cursorColor?: string;
  style?: React.CSSProperties;
  className?: string;
}

export function TextType({
  text,
  typingSpeed = 70,
  deletingSpeed = 35,
  pauseTime = 2200,
  loop = true,
  showCursor = true,
  cursorChar = "|",
  cursorColor = "var(--accent-mint)",
  style,
  className = "",
}: TextTypeProps) {
  const textArray = React.useMemo(() => (Array.isArray(text) ? text : [text]), [text]);
  const [arrayIndex, setArrayIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullText = textArray[arrayIndex];

    if (isDeleting) {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(currentFullText.substring(0, displayedText.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        if (loop) {
          const nextIdx = (arrayIndex + 1) % textArray.length;
          setArrayIndex(nextIdx);
        }
      }
    } else {
      if (displayedText.length < currentFullText.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentFullText.substring(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        if (loop && textArray.length > 1) {
          timer = setTimeout(() => {
            setIsDeleting(true);
          }, pauseTime);
        }
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, arrayIndex, textArray, typingSpeed, deletingSpeed, pauseTime, loop]);

  return (
    <span style={{ display: "inline-flex", alignItems: "center", ...style }} className={className}>
      <span>{displayedText}</span>
      {showCursor && (
        <span
          className="text-type-cursor"
          style={{
            color: cursorColor,
            fontWeight: 300,
            marginLeft: "2px",
            animation: "textTypeBlink 0.9s infinite",
            userSelect: "none",
          }}
        >
          {cursorChar}
        </span>
      )}
    </span>
  );
}
