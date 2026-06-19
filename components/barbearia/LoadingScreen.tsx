"use client";

import { useEffect, useState } from "react";

type Phase = "visible" | "opening" | "done";

const DISPLAY_MS = 1400;
const OPEN_MS = 1100;

export default function LoadingScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const [phase, setPhase] = useState<Phase>("visible");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setPhase("done");
      return;
    }

    const openTimer = window.setTimeout(() => setPhase("opening"), DISPLAY_MS);
    const doneTimer = window.setTimeout(
      () => setPhase("done"),
      DISPLAY_MS + OPEN_MS
    );

    return () => {
      window.clearTimeout(openTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  useEffect(() => {
    if (phase === "done") {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  return (
    <>
      {children}

      {phase !== "done" && (
        <div
          className={`loading-screen ${phase === "opening" ? "loading-screen--opening" : ""}`}
          aria-hidden={phase === "opening"}
          aria-live="polite"
          aria-busy={phase !== "done"}
        >
          <div className="loading-screen-content">
            <h1 className="font-sans text-3xl font-light uppercase tracking-[0.25em] leading-none text-white sm:text-4xl">
              Ótica Vision
            </h1>
          </div>

          <div className="loading-curtain-top" aria-hidden="true" />
          <div className="loading-curtain-bottom" aria-hidden="true" />
        </div>
      )}
    </>
  );
}
