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
    <section id="services" className="pt-40 pb-28 px-6 relative overflow-hidden" style={{ background: "#ffffff" }}>
      {/* Transição suave de onda do Hero escuro para o fundo claro */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320" 
          preserveAspectRatio="none" 
          className="w-full h-[60px] sm:h-[120px]"
        >
          <path 
            fill="#0a0a0a" 
            fillOpacity="1" 
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <M.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={sectionViewportWide}
          transition={sectionTransition()}
          className="text-center mb-16"
        >
          <span className="text-[10px] tracking-[0.35em] uppercase font-semibold block mb-4" style={{ color: "#ef4444" }}>
            Por que nos escolher
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold uppercase tracking-wide" style={{ color: "#0f172a" }}>
            Nossos{" "}
            <span style={{ color: "#F59E0B", textShadow: "0 2px 10px rgba(245,158,11,0.2)" }}>
              Benefícios
            </span>
          </h2>
          <div
            className="mx-auto mt-6 h-px w-16"
            style={{
              background:
                "linear-gradient(to right, transparent, #F59E0B, transparent)",
            }}
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
              className="group relative rounded-3xl p-8 flex flex-col items-center text-center transition-all duration-300 bg-white"
              style={{ border: "1px solid rgba(239,68,68,0.12)", boxShadow: "0 4px 24px -4px rgba(239,68,68,0.08)" }}
              whileHover={{ y: -6, boxShadow: "0 20px 40px -10px rgba(239,68,68,0.15)", borderColor: "rgba(239,68,68,0.35)" }}
            >
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444" }}
              >
                <benefit.icon strokeWidth={1.5} className="w-8 h-8" aria-hidden="true" />
              </div>
              <h3 className="text-base md:text-lg font-medium leading-relaxed max-w-[200px]" style={{ color: "#0f172a" }}>
                {benefit.title}
              </h3>
            </M.div>
          ))}
        </div>
      </div>
    </section>
  );
}
