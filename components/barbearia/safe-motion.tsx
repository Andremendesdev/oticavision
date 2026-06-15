"use client";

import { motion } from "framer-motion";
import { forwardRef, type ElementType } from "react";
import { useMotionReady } from "./MotionProvider";

const MOTION_ONLY_PROPS = [
  "initial",
  "animate",
  "exit",
  "variants",
  "transition",
  "whileHover",
  "whileTap",
  "whileFocus",
  "whileDrag",
  "whileInView",
  "onAnimationStart",
  "onAnimationComplete",
  "layout",
  "layoutId",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "viewport",
  "drag",
  "dragConstraints",
  "custom",
] as const;

function stripMotionProps<T extends Record<string, unknown>>(props: T) {
  const rest = { ...props };
  for (const key of MOTION_ONLY_PROPS) {
    delete rest[key];
  }
  return rest;
}

function createSafeMotion<K extends keyof typeof motion>(tag: K) {
  const MotionComponent = motion[tag] as ElementType;

  return forwardRef<HTMLElement, Record<string, unknown>>(
    function SafeMotion(props, ref) {
      const ready = useMotionReady();

      if (!ready) {
        const rest = stripMotionProps(props);
        const Tag = tag as ElementType;
        return <Tag ref={ref} {...rest} />;
      }

      return <MotionComponent ref={ref} {...props} />;
    }
  );
}

export const M = {
  div: createSafeMotion("div"),
  span: createSafeMotion("span"),
  a: createSafeMotion("a"),
  button: createSafeMotion("button"),
  nav: createSafeMotion("nav"),
  article: createSafeMotion("article"),
  img: createSafeMotion("img"),
  h1: createSafeMotion("h1"),
  h2: createSafeMotion("h2"),
  p: createSafeMotion("p"),
  ul: createSafeMotion("ul"),
};
