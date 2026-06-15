"use client";

import { MotionConfig } from "framer-motion";
import { createContext, useContext } from "react";
import { useMounted } from "@/hooks/use-mounted";

const MotionReadyContext = createContext(false);

export function useMotionReady() {
  return useContext(MotionReadyContext);
}

export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const mounted = useMounted();

  return (
    <MotionReadyContext.Provider value={mounted}>
      <MotionConfig initial={false}>{children}</MotionConfig>
    </MotionReadyContext.Provider>
  );
}
