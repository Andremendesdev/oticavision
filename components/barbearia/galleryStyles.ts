export const galleryImageMotion = {
  rest: { scale: 1, filter: "brightness(1)" },
  active: { scale: 1.04, filter: "brightness(1.05)" },
} as const;

export const galleryItemSurfaceClass =
  "relative flex min-h-[320px] cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-zinc-800/40 bg-zinc-950/50 md:min-h-[360px]";

export const galleryImageClass =
  "h-full w-full max-h-[340px] object-contain p-3 md:max-h-[380px]";

export const galleryModalItemSurfaceClass =
  "relative flex min-h-[320px] cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-zinc-800/40 bg-zinc-950/50 md:min-h-[400px]";

export const galleryModalImageClass =
  "h-full w-full max-h-[360px] object-contain p-3 transition-transform duration-700 group-hover:scale-[1.04] md:max-h-[420px]";

export const galleryOverlayMotion = {
  rest: { background: "transparent" },
  active: {
    background:
      "linear-gradient(to top, rgba(10,10,10,0.25) 0%, transparent 60%)",
  },
} as const;

export const galleryImageTransition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const galleryOverlayTransition = { duration: 0.4 };
