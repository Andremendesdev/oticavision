"use client";

import { useState } from "react";
import { M } from "./safe-motion";
import { AnimatePresence } from "framer-motion";
import { sectionTransition, sectionViewportWide } from "./sectionAnimations";

const COLLECTIONS = [
  {
    id: "premium",
    label: "Premium",
    tagline: "O melhor para quem exige o melhor",
    photos: [
      { src: "/premium3.png", alt: "Óculos premium modelo 1" },
      { src: "/premium.png", alt: "Óculos premium modelo 2" },
      { src: "/premium2.png", alt: "Óculos premium modelo 3" },
      { src: "/premium1.png", alt: "Óculos premium modelo 4" },
    ],
  },
  {
    id: "masculina",
    label: "Masculina",
    tagline: "Força e sofisticação no olhar",
    photos: [
      { src: "/foto1.png", alt: "Óculos masculino modelo 1" },
      { src: "/foto2.png", alt: "Óculos masculino modelo 2" },
    ],
  },
  {
    id: "feminina",
    label: "Feminina",
    tagline: "Elegância que realça cada detalhe",
    photos: [
      { src: "/feminino.png", alt: "Óculos feminino modelo 1" },
      { src: "/feminino1.png", alt: "Óculos feminino modelo 2" },
    ],
  },
  {
    id: "infantil",
    label: "Infantil",
    tagline: "Conforto e estilo para os pequenos",
    photos: [
      { src: "/foto4.png", alt: "Óculos infantil modelo 1" },
      { src: "/foto3.png", alt: "Óculos infantil modelo 2" },
    ],
  },
];

export default function GalleryPic({ photos = [] }: { photos?: unknown[] }) {
  const [activeId, setActiveId] = useState("premium");
  const active = COLLECTIONS.find((c) => c.id === activeId)!;

  return (
    <section
      id="colecao"
      className="py-24 px-6"
      style={{ background: "#fafafa" }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Cabeçalho limpo */}
        <M.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={sectionViewportWide}
          transition={sectionTransition()}
          className="mb-14"
        >
          <span
            className="text-[9px] tracking-[0.4em] uppercase font-semibold block mb-3"
            style={{ color: "#ef4444" }}
          >
            Descubra o seu estilo
          </span>
          <h2
            className="font-serif text-2xl sm:text-3xl font-bold tracking-tight"
            style={{ color: "#0f172a" }}
          >
            Nossa Coleção
          </h2>
          <p className="mt-3 text-slate-400 text-xs sm:text-sm max-w-sm">
            Escolha a linha que combina com você.
          </p>
        </M.div>

        {/* Layout lado a lado: tabs à esquerda + grid à direita */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">

          {/* Tabs verticais */}
          <M.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={sectionViewportWide}
            transition={sectionTransition(0.1)}
            className="flex flex-row md:flex-col gap-2 md:gap-1 flex-shrink-0 md:w-44"
          >
            {COLLECTIONS.map((col) => {
              const isActive = activeId === col.id;
              return (
                <button
                  key={col.id}
                  onClick={() => setActiveId(col.id)}
                  className="relative text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 w-full"
                  style={{
                    background: isActive ? "rgba(239,68,68,0.07)" : "transparent",
                    color: isActive ? "#dc2626" : "#94a3b8",
                    borderLeft: isActive
                      ? "3px solid #ef4444"
                      : "3px solid transparent",
                  }}
                >
                  {col.label}
                  {isActive && (
                    <M.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-xl -z-10"
                      style={{ background: "rgba(239,68,68,0.05)" }}
                    />
                  )}
                </button>
              );
            })}

            {/* Tagline abaixo das tabs */}
            <AnimatePresence mode="wait">
              <M.p
                key={activeId + "-tag"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="hidden md:block mt-6 px-4 text-xs text-slate-400 leading-relaxed italic"
              >
                {active.tagline}
              </M.p>
            </AnimatePresence>
          </M.div>

          {/* Grid de fotos */}
          <div className="flex-1 w-full">
            <AnimatePresence mode="wait">
              <M.div
                key={activeId}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={`grid gap-3 ${
                  active.photos.length <= 2
                    ? "grid-cols-2"
                    : active.photos.length === 3
                    ? "grid-cols-3"
                    : "grid-cols-2 sm:grid-cols-4"
                }`}
              >
                {active.photos.map((photo, i) => (
                  <M.div
                    key={photo.src}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: i * 0.07,
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer"
                    style={{
                      background: "#f1f5f9",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                    }}
                    whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(239,68,68,0.14)" }}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Borda sutil no hover */}
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ boxShadow: "inset 0 0 0 1.5px rgba(239,68,68,0.4)" }}
                    />
                  </M.div>
                ))}
              </M.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
