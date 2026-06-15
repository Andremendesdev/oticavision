export const SECTION_EASE = [0.22, 1, 0.36, 1] as const;

export const sectionViewport = { once: true, margin: "-60px" } as const;
export const sectionViewportWide = { once: true, margin: "-80px" } as const;

export function sectionTransition(delay = 0, duration = 0.7) {
  return { duration, ease: SECTION_EASE, delay };
}

/** Fade-in ao entrar na viewport (use com whileInView, não com animate condicional). */
export const fadeInUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: sectionViewport,
  transition: sectionTransition(),
} as const;

export const fadeUpContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
} as const;

export const fadeUpItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: SECTION_EASE },
  },
} as const;

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: SECTION_EASE, delay },
  }),
} as const;
