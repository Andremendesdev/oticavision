"use client";

import { ArrowRight, CheckCircle, Clock, Star } from "lucide-react";
import { M } from "./safe-motion";
import { getWhatsAppUrl } from "@/lib/site/env";

const TRUST_BADGES = [
  { icon: Star, label: "4.9★ no Google" },
  { icon: Clock, label: "Resposta em minutos" },
  { icon: CheckCircle, label: "Sem fila de espera" },
] as const;

const heroWaBtn =
  "group inline-flex w-full max-w-full min-w-0 items-center justify-center gap-1.5 rounded-md border border-red-600 bg-red-600 px-2 py-2.5 text-[9px] font-medium leading-tight text-white transition-colors duration-300 hover:border-red-700 hover:bg-red-700 sm:min-h-11 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-xs lg:w-auto lg:max-w-[11rem] lg:px-4 xl:max-w-[12rem]";

const heroOutlineBtn =
  "group inline-flex w-full max-w-full min-w-0 items-center justify-center gap-1.5 rounded-md border border-amber-200 bg-amber-50 px-2 py-2.5 text-[9px] font-medium leading-tight text-zinc-900 transition-colors duration-300 hover:border-amber-300 hover:bg-amber-100 sm:min-h-11 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-xs lg:w-auto lg:max-w-[11rem] lg:px-4 xl:max-w-[12rem]";

export default function Hero({
  whatsappLink = null,
}: {
  whatsappLink?: string | null;
}) {
  const consultaLink = getWhatsAppUrl(
    "Olá! Gostaria de agendar uma consulta na ótica."
  );

  return (
    <section id="hero" className="relative overflow-hidden">
      {/* Linha superior — teste2.png + overlay minimal */}
      <div className="relative h-[45vh] min-h-[280px] w-full sm:h-[50vh] md:h-[55vh]">
        <img
          src="/teste2.png"
          alt="Ótica Vision — armações e óculos"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" aria-hidden="true" />

        <div className="relative z-10 flex h-full w-full translate-y-10 flex-col items-center justify-center px-5 text-center sm:translate-y-12">
          <div className="flex flex-col items-center gap-6 lg:mt-14 lg:flex-row lg:items-center lg:gap-6">
            <M.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-3xl font-normal tracking-tight text-white sm:text-3xl lg:text-2xl lg:whitespace-nowrap xl:text-3xl"
            >
              Uma armação para cada olhar.
            </M.h1>

            <M.a
              href="#gallery"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-lg bg-white px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-900 transition-colors hover:bg-white/90 sm:text-xs lg:min-h-8 lg:px-4 lg:py-2 lg:text-[9px] lg:tracking-[0.12em]"
            >
              Ver armações
            </M.a>
          </div>
        </div>
      </div>

      {/* Linha inferior — fotos + botões */}
      <div className="grid grid-cols-2">
        <div className="flex min-w-0 flex-col">
          <div className="relative overflow-hidden aspect-[6/5] sm:aspect-[12/5] lg:aspect-[4/1]">
            <img
              src="/premium.png"
              alt="Armação premium"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex justify-center bg-white px-2 py-4 sm:px-3 sm:py-5">
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
              className={heroWaBtn}
              style={{ opacity: whatsappLink ? 1 : 0.55 }}
            >
              <span className="truncate sm:hidden">WhatsApp</span>
              <span className="hidden sm:inline">Chamar no WhatsApp</span>
              <ArrowRight
                className="size-3 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 sm:size-3.5"
                aria-hidden="true"
              />
            </M.a>
          </div>
        </div>

        <div className="flex min-w-0 flex-col">
          <div className="relative overflow-hidden aspect-[6/5] sm:aspect-[12/5] lg:aspect-[4/1]">
            <img
              src="/premium1.png"
              alt="Armação premium modelo 2"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex justify-center bg-white px-2 py-4 sm:px-3 sm:py-5">
            <M.a
              href={consultaLink ?? "#"}
              target={consultaLink ? "_blank" : undefined}
              rel={consultaLink ? "noopener noreferrer" : undefined}
              onClick={(e) => {
                if (!consultaLink) e.preventDefault();
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.38 }}
              className={heroOutlineBtn}
              style={{ opacity: consultaLink ? 1 : 0.55 }}
            >
              <span className="truncate sm:hidden">Consulta</span>
              <span className="hidden sm:inline">Agendar Consulta</span>
            </M.a>
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <M.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-2 border-t border-zinc-100 bg-white px-4 py-4 sm:gap-2.5 sm:py-5"
      >
        {TRUST_BADGES.map(({ icon: Icon, label }, i) => (
          <M.span
            key={label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.55 + i * 0.06,
              duration: 0.4,
            }}
            className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[10px] font-medium uppercase tracking-widest text-zinc-600 transition-colors hover:border-zinc-300 hover:bg-zinc-100 sm:text-[11px]"
          >
            <Icon className="size-3 shrink-0 text-[#F59E0B]/90" aria-hidden="true" />
            {label}
          </M.span>
        ))}
      </M.div>
    </section>
  );
}
