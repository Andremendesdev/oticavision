"use client";

import { M } from "./safe-motion";
import BrandMarquee from "./BrandMarquee";

export default function Hero({
  whatsappLink = null,
}: {
  whatsappLink?: string | null;
}) {
  return (
    <section
      id="hero"
      className="relative flex min-h-[92vh] flex-col justify-end overflow-hidden sm:min-h-[88vh] lg:min-h-screen"
    >
      {/* Vídeo cinematográfico */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      >
        <source src="/herovid.mp4" type="video/mp4" />
      </video>

      {/* Overlays cinematográficos */}
      <div
        className="absolute inset-0 bg-black/35"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.35)_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-5 pb-10 pt-28 text-center sm:pb-14 sm:pt-32 lg:mr-auto lg:ml-0 lg:max-w-6xl lg:items-start lg:pl-10 lg:pb-16 lg:pt-32 lg:text-left xl:pl-16">
        <div className="flex flex-col items-center gap-6 lg:items-start lg:gap-5">
          <div className="flex flex-col items-center gap-3 text-center lg:items-start lg:text-left">
            <M.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-3xl font-normal tracking-tight text-white sm:text-4xl lg:text-6xl xl:text-7xl"
            >
              Uma armação para cada olhar.
            </M.h1>

            <M.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-md text-sm leading-relaxed text-white/80 sm:text-base lg:max-w-xl lg:text-lg xl:max-w-2xl xl:text-xl"
            >
              Armações exclusivas e lentes de alta qualidade para você ver e ser visto.
            </M.p>
          </div>

          <M.a
            href="#gallery"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-full bg-white px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-900 transition-colors hover:bg-white/90 sm:text-xs lg:min-h-11 lg:px-7 lg:py-3 lg:text-xs lg:tracking-[0.14em] xl:min-h-12 xl:px-8 xl:text-sm"
          >
            Ver armações
          </M.a>
        </div>

        <M.a
          href={whatsappLink ?? "#"}
          target={whatsappLink ? "_blank" : undefined}
          rel={whatsappLink ? "noopener noreferrer" : undefined}
          onClick={(e) => {
            if (!whatsappLink) e.preventDefault();
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="group mt-8 inline-flex items-center gap-4 sm:mt-10 lg:mt-10"
          style={{ opacity: whatsappLink ? 1 : 0.55 }}
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/85 transition-colors group-hover:text-white sm:text-xs lg:text-[11px] lg:tracking-[0.3em]">
            <span className="sm:hidden">WhatsApp</span>
            <span className="hidden sm:inline">Chamar no WhatsApp</span>
          </span>
          <span
            className="h-px w-10 bg-white/50 transition-all duration-300 group-hover:w-14 group-hover:bg-white/90 sm:w-14 lg:w-16 lg:group-hover:w-24"
            aria-hidden="true"
          />
        </M.a>
      </div>

      <BrandMarquee />
    </section>
  );
}
