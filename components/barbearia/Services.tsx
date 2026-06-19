"use client";

import { M } from "./safe-motion";
import {
  sectionTransition,
  sectionViewportWide,
} from "./sectionAnimations";
import { Glasses, ScanFace, Zap } from "lucide-react";

const BENEFITS = [
  {
    id: 1,
    title: "Armações modernas e confortáveis",
    icon: Glasses,
  },
  {
    id: 2,
    title: "Lentes com alta precisão visual",
    icon: ScanFace,
  },
  {
    id: 3,
    title: "Atendimento rápido pelo WhatsApp",
    icon: Zap,
  },
];

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden py-24 px-6">
      <img
        src="/fundo2.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-black/15"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <M.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={sectionViewportWide}
          transition={sectionTransition()}
          className="text-center mb-16"
        >
          <span className="mb-4 block text-[9px] font-bold uppercase tracking-[0.35em] text-white/75">
            Por que nos escolher
          </span>
          <h2 className="font-serif text-3xl font-bold uppercase tracking-wide text-white drop-shadow-md sm:text-4xl">
            Nossos{" "}
            <span className="text-amber-300" style={{ textShadow: "0 2px 16px rgba(0,0,0,0.45)" }}>
              Benefícios
            </span>
          </h2>
          <div
            className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-amber-300/80 to-transparent"
            aria-hidden="true"
          />
        </M.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {BENEFITS.map((benefit, i) => (
            <M.div
              key={benefit.id}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={sectionViewportWide}
              transition={sectionTransition(i * 0.12)}
              className="group relative flex flex-col items-center rounded-3xl border border-red-200/80 bg-white/95 p-8 text-center shadow-[0_8px_32px_-8px_rgba(15,23,42,0.18)] backdrop-blur-sm transition-all duration-300"
              whileHover={{ y: -6, boxShadow: "0 20px 40px -10px rgba(15,23,42,0.22)", borderColor: "rgba(239,68,68,0.45)" }}
            >
              <div
                className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-700 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
              >
                <benefit.icon strokeWidth={1.5} className="h-8 w-8" aria-hidden="true" />
              </div>
              <h3 className="max-w-[200px] text-sm font-semibold leading-relaxed text-slate-950 md:text-base">
                {benefit.title}
              </h3>
            </M.div>
          ))}
        </div>
      </div>
    </section>
  );
}
