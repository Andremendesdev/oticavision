"use client";

import { M } from "./safe-motion";
import {
  sectionTransition,
  sectionViewport,
} from "./sectionAnimations";
import {
  address,
  getMapEmbedUrl,
  isMapAvailable,
  siteName,
} from "@/lib/site/env";

export default function MapSection() {
  const mapEmbedUrl = getMapEmbedUrl();

  return (
    <section
      id="mapsection"
      className="relative overflow-hidden bg-[#fafafa] px-6 pb-20 pt-16"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 100%, rgba(239,68,68,0.03), transparent 55%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        <M.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={sectionViewport}
          transition={sectionTransition()}
          className="mb-10 text-center"
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-[10px] uppercase tracking-[0.28em] text-red-600">
            <span className="size-1.5 rounded-full bg-red-500" aria-hidden="true" />
            Venha nos visitar
          </span>

          <h2 className="font-serif text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Nos{" "}
            <span className="text-[#ef4444]">Encontre</span>
          </h2>

          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-500 sm:text-base">
            {address}
          </p>

          <p className="mt-3 text-xs text-slate-400">
            Ou fale com a gente pelo{" "}
            <span className="font-medium text-emerald-600">WhatsApp</span> — atendemos também online.
          </p>

          <div
            className="mx-auto mt-6 h-px w-12"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(239,68,68,0.35), transparent)",
            }}
            aria-hidden="true"
          />
        </M.div>

        {isMapAvailable && mapEmbedUrl ? (
          <M.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={sectionViewport}
            transition={sectionTransition(0.15)}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="380"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Localização de ${siteName}`}
            />
          </M.div>
        ) : (
          <p className="pb-4 text-center text-sm text-slate-400">
            Endereço indisponível no momento.
          </p>
        )}
      </div>
    </section>
  );
}
