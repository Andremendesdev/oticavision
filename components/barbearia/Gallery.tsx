"use client";

import { Eye, Sparkles, Sun } from "lucide-react";
import { M } from "./safe-motion";
import {
  fadeUpContainer,
  fadeUpItem,
  sectionViewportWide,
} from "./sectionAnimations";

const HIGHLIGHTS = [
  { label: "Armações importadas", icon: Sparkles },
  { label: "Lentes antirreflexo", icon: Eye },
  { label: "Óculos solar UV400", icon: Sun },
] as const;

export default function Gallery() {
  const scrollToCollection = () => {
    document
      .getElementById("services")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="gallery"
      className="relative min-h-[520px] overflow-hidden sm:min-h-[560px] md:min-h-[620px]"
    >
      {/* Imagem de fundo */}
      <div
        className="absolute inset-0 scale-[1.02] bg-[url('/teste1.png')] bg-cover bg-[center_45%] bg-no-repeat md:bg-[center_35%] lg:bg-right"
        aria-hidden="true"
      />

      {/* Gradientes */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/88 via-[#0a0a0a]/60 to-[#0a0a0a]/15 md:via-[#0a0a0a]/45 md:to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/70 via-transparent to-[#0a0a0a]/20"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(245,158,11,0.08),transparent_55%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-5 py-20 sm:px-6 sm:py-24 md:py-28 lg:px-8">
        <M.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewportWide}
          variants={fadeUpContainer}
          className="w-full max-w-xl rounded-3xl border border-white/8 bg-slate-950/20 p-6 backdrop-blur-sm sm:max-w-lg sm:p-8 md:max-w-xl lg:max-w-2xl"
        >
          <M.span
            variants={fadeUpItem}
            className="hero-eyebrow mb-4 inline-flex items-center rounded-full border px-3.5 py-1.5 text-[9px] uppercase tracking-[0.22em] sm:text-[10px]"
          >
            Loja Física & Online
          </M.span>

          <M.h2
            variants={fadeUpItem}
            className="font-serif text-2xl font-semibold leading-[1.15] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[2.65rem]"
          >
            Encontre a armação{" "}
            <span className="text-[#FBBF24]">
              perfeita
            </span>{" "}
            para o seu rosto.
          </M.h2>

          <M.p
            variants={fadeUpItem}
            className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base"
          >
            Centenas de modelos em estoque. Envie uma foto e receba indicações personalizadas direto no{" "}
            <strong className="text-white font-medium">WhatsApp</strong> — sem precisar sair de casa.
          </M.p>

          <M.ul variants={fadeUpItem} className="mt-6 flex flex-wrap gap-2">
            {HIGHLIGHTS.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-zinc-600/40 bg-white/5 px-3 py-1.5 text-[10px] font-medium tracking-wide text-zinc-400 sm:text-[11px]"
              >
                <Icon
                  className="size-3 shrink-0 text-[#F59E0B]/80"
                  aria-hidden="true"
                />
                {label}
              </li>
            ))}
          </M.ul>

          <M.div variants={fadeUpItem} className="mt-8">
            <M.button
              type="button"
              onClick={scrollToCollection}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full border border-[#F59E0B]/50 px-7 py-3.5 text-xs font-medium tracking-wide text-[#F59E0B] bg-transparent transition-colors hover:bg-[#F59E0B]/10 sm:w-auto sm:min-w-[220px] md:text-sm"
            >
              <Eye className="size-4 shrink-0" aria-hidden="true" />
              Ver produtos
            </M.button>
          </M.div>
        </M.div>
      </div>

      {/* Label decorativo */}
      <M.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={sectionViewportWide}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="pointer-events-none absolute bottom-6 right-5 hidden text-right md:block lg:right-10"
        aria-hidden="true"
      >
        <p className="text-[10px] tracking-[0.25em] text-white/40">
          Coleção disponível
        </p>
        <p className="mt-1 font-serif text-lg font-normal text-white/65">Novidades na loja</p>
      </M.div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(245,158,11,0.35), transparent)",
        }}
      />
    </section>
  );
}
