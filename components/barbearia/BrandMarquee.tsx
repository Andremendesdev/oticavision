"use client";

import { M } from "./safe-motion";

const BRANDS = ["Ray-Ban", "Guess", "Aramis", "Vogue", "Kipling"] as const;

export default function BrandMarquee() {
  return (
    <div
      className="relative z-10 w-full overflow-hidden border-t border-zinc-200/80 bg-white py-4 sm:py-5"
      aria-label="Marcas disponíveis na loja"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent sm:w-20"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent sm:w-20"
        aria-hidden="true"
      />

      <M.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex min-w-max items-center gap-10 px-6 sm:gap-14 sm:px-8"
      >
        {[...BRANDS, ...BRANDS].map((brand, index) => (
          <span
            key={`${brand}-${index}`}
            className="inline-flex shrink-0 items-center gap-10 font-serif text-sm font-medium uppercase tracking-[0.22em] text-zinc-500 sm:gap-14 sm:text-base"
          >
            {brand}
            <span
              className="size-1 rounded-full bg-zinc-300"
              aria-hidden="true"
            />
          </span>
        ))}
      </M.div>
    </div>
  );
}
