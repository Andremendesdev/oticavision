"use client";

import { Eye, MapPin, Star, Clock, CheckCircle } from "lucide-react";
import { M } from "./safe-motion";
import {
  instagramUrl,
  isInstagramConfigured,
  locationLabel,
  siteName,
} from "@/lib/site/env";

// ─── Animações ────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const, delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut", delay },
  }),
};

// ─── Indicadores de prova social ─────────────────────────────────────────────
const TRUST_BADGES = [
  { icon: Star, label: "4.9★ no Google" },
  { icon: Clock, label: "Resposta em minutos" },
  { icon: CheckCircle, label: "Sem fila de espera" },
] as const;

export default function Hero({
  whatsappLink = null,
}: {
  whatsappLink?: string | null;
}) {
  return (
    <section
      className="relative flex flex-col overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.75) 55%, rgba(15,10,5,0.88) 100%), url('/teste2.png') center/cover no-repeat",
        minHeight: "100dvh",
      }}
    >
      {/* ── Lente decorativa — elemento-signature ─────────────────────────── */}
      <LensOrb />

      {/* ── Gradiente de chão ────────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 100%, rgba(245,158,11,0.07) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* ── Instagram badge ──────────────────────────────────────────────── */}
      {isInstagramConfigured && (
        <M.a
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-20 right-5 md:top-24 md:right-8 z-20 flex items-center justify-center rounded-full w-12 h-12 lg:w-11 lg:h-11"
          style={{
            border: "1.5px solid rgba(255,32,32,0.45)",
            color: "#FF2020",
            background: "rgba(10,10,10,0.5)",
            boxShadow:
              "0 0 12px rgba(255,32,32,0.2), inset 0 0 8px rgba(255,32,32,0.06)",
            backdropFilter: "blur(8px)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.background = "#FF2020";
            el.style.color = "#0a0a0a";
            el.style.boxShadow = "0 0 22px rgba(245,158,11,0.5)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.background = "rgba(10,10,10,0.5)";
            el.style.color = "#F59E0B";
            el.style.boxShadow =
              "0 0 12px rgba(245,158,11,0.2), inset 0 0 8px rgba(245,158,11,0.06)";
          }}
          aria-label="Abrir Instagram"
        >
          {/* Instagram SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="w-[18px] h-[18px] fill-current"
            aria-hidden="true"
          >
            <path d="M224.1 141c-63.6 0-115.1 51.5-115.1 115.1S160.5 371.2 224.1 371.2 339.2 319.7 339.2 256.1 287.7 141 224.1 141zm0 189.6c-41.1 0-74.5-33.4-74.5-74.5s33.4-74.5 74.5-74.5 74.5 33.4 74.5 74.5-33.4 74.5-74.5 74.5zm146.4-194.3c0 14.9-12 26.9-26.9 26.9-14.9 0-26.9-12-26.9-26.9 0-14.9 12-26.9 26.9-26.9 14.9 0 26.9 12 26.9 26.9zM398.8 80c-22.1-22.1-51.3-34.2-82.6-34.2H131.8c-64.4 0-116.8 52.4-116.8 116.8v184.3c0 31.3 12.2 60.5 34.2 82.6 22.1 22.1 51.3 34.2 82.6 34.2h184.3c64.4 0 116.8-52.4 116.8-116.8V162.6c0-31.3-12.1-60.5-34.1-82.6zM398 346.9c0 45.2-36.7 81.9-81.9 81.9H131.8c-21.9 0-42.4-8.5-57.9-24-15.5-15.5-24-36-24-57.9V162.6c0-45.2 36.7-81.9 81.9-81.9h184.3c21.9 0 42.4 8.5 57.9 24 15.5 15.5 24 36 24 57.9v184.3z" />
          </svg>
        </M.a>
      )}

      {/* ── Conteúdo principal ───────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center lg:items-start justify-center flex-1 text-center lg:text-left px-5 md:px-10 lg:px-16 xl:px-24 pt-32 pb-20 md:pt-36 md:pb-24">
        <div className="w-full max-w-4xl lg:max-w-3xl mx-auto lg:mx-0 flex flex-col items-center lg:items-start">

          {/* Eyebrow — localização */}
          <M.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="flex items-center justify-center lg:justify-start gap-2 mb-6"
          >
            <span 
              className="inline-flex items-center gap-1.5 text-[10px] lg:text-[9px] tracking-[0.3em] uppercase px-4 py-1.5 lg:px-3.5 lg:py-1 rounded-full border"
              style={{
                borderColor: "rgba(255,32,32,0.3)",
                color: "#FF2020",
                background: "rgba(255,32,32,0.05)",
                boxShadow: "0 0 16px rgba(255,32,32,0.15)",
              }}
            >
              <MapPin className="w-3 h-3 shrink-0" aria-hidden="true" />
              Ótica · {locationLabel.replace(/\s*[—–-]\s*Brasil\s*$/i, "")}
            </span>
          </M.div>

          {/* Headline principal */}
          <M.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.22}
            className="font-serif text-[2.9rem] sm:text-[3.6rem] lg:text-[3.75rem] xl:text-[4rem] font-bold leading-[1.0] tracking-tight mb-5 md:mb-6 lg:mb-5"
          >
            <span className="block text-white">
              Ótica Vision
            </span>
            <span
              className="block mt-1"
              style={{
                background:
                  "linear-gradient(90deg, #F59E0B 0%, #FBBF24 50%, #F97316 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 18px rgba(245,158,11,0.35))",
              }}
            >
              Enxergue melhor.
            </span>
            <span className="block text-zinc-300 font-sans font-normal text-[1.5rem] sm:text-[2rem] lg:text-[2.1rem] mt-3 tracking-normal leading-snug">
              Veja o mundo com mais nitidez e estilo.
            </span>
          </M.h1>

          {/* Subtítulo — proposta de valor clara */}
          <M.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.38}
            className="text-zinc-400 text-sm sm:text-base md:text-lg lg:text-base leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8 md:mb-10 lg:mb-8"
          >
            Armações modernas, lentes de qualidade e{" "}
            <strong className="text-zinc-200 font-medium">
              atendimento direto pelo WhatsApp
            </strong>
            . Tire dúvidas.
          </M.p>

          {/* CTAs */}
          <M.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.5}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-10 md:mb-12 lg:mb-9 w-full sm:w-auto"
          >
            {/* CTA primário — WhatsApp */}
            <M.a
              href={whatsappLink ?? "#"}
              target={whatsappLink ? "_blank" : undefined}
              rel={whatsappLink ? "noopener noreferrer" : undefined}
              onClick={(e) => {
                if (!whatsappLink) e.preventDefault();
              }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="hero-wa-cta group inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-br from-[#FBBF24] via-[#F59E0B] to-[#D97706] px-7 py-4 text-sm font-semibold uppercase tracking-widest w-full sm:w-auto justify-center lg:px-6 lg:py-3 lg:text-xs"
              aria-label="Fale conosco pelo WhatsApp"
            >
              {/* WhatsApp icon */}
              <svg
                viewBox="0 0 448 512"
                className="w-4 h-4 shrink-0 fill-current"
                aria-hidden="true"
              >
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-221.7 99.3-221.7 221.7 0 39.1 10.2 77.3 29.6 111L0 480l118.7-30.9c32.6 17.8 69.5 27.2 107.2 27.2h.1c122.4 0 221.7-99.3 221.7-221.7 0-59.3-23.1-115-65-157zM223.9 438.6c-33.5 0-66.2-9-94.7-26l-6.8-4-70.4 18.3 18.8-68.6-4.4-7c-18.6-29.6-28.4-63.7-28.4-98.6 0-101.7 82.8-184.5 184.5-184.5 49.3 0 95.6 19.2 130.4 54.1 34.9 34.9 54.1 81.2 54.1 130.4 0 101.7-82.8 184.5-184.5 184.5zm101.3-138.2c-5.5-2.8-32.5-16-37.6-17.8-5.1-1.9-8.8-2.8-12.6 2.8-3.7 5.5-14.4 17.8-17.7 21.5-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-53.9-29.1-75.4-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.6-30.4-17.3-41.6-4.5-10.8-9.1-9.3-12.6-9.5-3.2-.1-6.9-.1-10.6-.1s-9.7 1.4-14.8 6.9c-5.1 5.5-19.5 19-19.5 46.3s20 53.8 22.8 57.5c2.8 3.7 39.4 60.2 95.5 84.4 13.4 5.8 23.9 9.3 32 11.9 13.4 4.3 25.6 3.7 35.3 2.2 10.8-1.6 32.5-13.3 37.1-26.2 4.6-12.9 4.6-24 3.2-26.2-1.3-2.3-5-3.7-10.5-6.5z" />
              </svg>
              Fale pelo WhatsApp
              {/* Pulsing dot */}
              <span className="hero-wa-dot" aria-hidden="true" />
            </M.a>

            {/* CTA secundário — ver coleção */}
            <M.a
              href="#gallery"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="hero-outline-btn inline-flex items-center gap-2 rounded-2xl px-7 py-4 lg:px-6 lg:py-3 text-sm lg:text-xs font-medium tracking-wide w-full sm:w-auto justify-center"
            >
              <Eye className="w-4 h-4 shrink-0" aria-hidden="true" />
              Ver armações
            </M.a>
          </M.div>

          {/* Trust badges — prova social */}
          <M.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={0.65}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5"
          >
            {TRUST_BADGES.map(({ icon: Icon, label }, i) => (
              <M.span
                key={label}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.7 + i * 0.1,
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="hero-trust-badge inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 lg:px-3 lg:py-1 text-[10px] md:text-[11px] lg:text-[10px] font-medium uppercase tracking-[0.12em]"
              >
                <Icon className="w-3 h-3 shrink-0" aria-hidden="true" />
                {label}
              </M.span>
            ))}
          </M.div>
        </div>
      </div>

      {/* ── Indicador de scroll ───────────────────────────────────────────── */}
      <M.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[9px] tracking-widest text-zinc-600 uppercase">
          Explorar
        </span>
        <M.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-amber-600/50 to-transparent"
        />
      </M.div>

      {/* ── Linha decorativa de rodapé ────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(245,158,11,0.4), transparent)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}

// ─── Componente: Lente decorativa (elemento-signature) ────────────────────────
function LensOrb() {
  return (
    <M.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none absolute right-[-8vw] top-[12vh] w-[40vw] max-w-[480px] lg:max-w-[400px] lg:w-[34vw] aspect-square"
      aria-hidden="true"
      style={{ zIndex: 1 }}
    >
      {/* Anel externo */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: "1.5px solid rgba(245,158,11,0.18)",
          boxShadow:
            "0 0 60px rgba(245,158,11,0.08), inset 0 0 60px rgba(245,158,11,0.04)",
        }}
      />
      {/* Anel médio — lente */}
      <div
        className="absolute inset-[12%] rounded-full"
        style={{
          border: "1px solid rgba(245,158,11,0.28)",
          background:
            "radial-gradient(ellipse at 35% 35%, rgba(245,158,11,0.07) 0%, rgba(245,158,11,0.02) 45%, transparent 70%)",
          boxShadow:
            "0 0 30px rgba(245,158,11,0.06), inset 0 0 40px rgba(245,158,11,0.04)",
          backdropFilter: "blur(1px)",
        }}
      />
      {/* Reflexo de lente */}
      <div
        className="absolute inset-[24%] rounded-full"
        style={{
          border: "0.5px solid rgba(245,158,11,0.15)",
          background:
            "radial-gradient(ellipse at 30% 30%, rgba(251,191,36,0.1) 0%, transparent 60%)",
        }}
      />
      {/* Brilho especular */}
      <div
        className="absolute top-[18%] left-[24%] w-[14%] h-[7%] rounded-full"
        style={{
          background: "rgba(251,191,36,0.18)",
          filter: "blur(6px)",
          transform: "rotate(-35deg)",
        }}
      />
    </M.div>
  );
}
