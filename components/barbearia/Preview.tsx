"use client";

import { M } from "./safe-motion";
import {
  sectionTransition,
  sectionViewport,
} from "./sectionAnimations";
import {
  googleReviewUrl,
  isGoogleReviewConfigured,
} from "@/lib/site/env";

const reviews = [
  {
    name: "Ana Paula S.",
    text: "Atendimento incrível! Mandei minha receita pelo WhatsApp e em minutos já tinham me indicado as melhores armações para o meu rosto. Adorei a experiência!",
  },
  {
    name: "Carlos M.",
    text: "Comprei meus óculos sem sair de casa. Enviaram fotos, explicaram tudo sobre as lentes e o produto chegou perfeito. Super recomendo!",
  },
  {
    name: "Fernanda L.",
    text: "Melhor ótica da cidade! Rápidos, atenciosos e com ótimo preço. O WhatsApp facilita muito na hora de tirar dúvidas.",
  },
  {
    name: "Roberto A.",
    text: "Fui pessoalmente e fui muito bem atendido. Eles têm opções para todos os estilos e os preços são honestos. Voltarei com certeza.",
  },
];

export default function Preview() {
  return (
    <section className="relative overflow-hidden bg-[#f6f3ef] py-24 pt-28 sm:pt-32">
      {/* Onda superior — Gallery escuro → Preview claro */}
      <div
        className="pointer-events-none absolute top-0 left-0 z-10 w-full overflow-hidden leading-none"
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="h-[56px] w-full sm:h-[96px] md:h-[120px]"
        >
          <path
            fill="#f6f3ef"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L0,320Z"
          />
        </svg>
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(239,68,68,0.025), transparent 55%)",
        }}
        aria-hidden="true"
      />

      <M.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={sectionViewport}
        transition={sectionTransition()}
        className="relative z-10 mb-14 px-5 text-center"
      >
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-[10px] uppercase tracking-[0.28em] text-red-600">
          <span className="size-1.5 rounded-full bg-red-500" aria-hidden="true" />
          Google Reviews
        </span>

        <h2 className="font-serif text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
          O que falam da{" "}
          <span className="text-[#ef4444]">Ótica Vision</span>
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-sm text-slate-500 md:text-base">
          Quem escolhe enxergar melhor, escolhe a Ótica Vision.
        </p>

        <div
          className="mx-auto mt-6 h-px w-12"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(239,68,68,0.5), transparent)",
          }}
          aria-hidden="true"
        />
      </M.div>

      {/* Carrossel de reviews */}
      <div className="relative flex overflow-hidden">
        <M.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex min-w-max gap-5 px-6"
        >
          {[...reviews, ...reviews].map((review, index) => (
            <div
              key={index}
              className="relative w-[300px] shrink-0 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:w-[320px]"
            >
              <div
                className="absolute left-0 top-6 h-8 w-0.5 rounded-full bg-red-500/50"
                aria-hidden="true"
              />

              <div className="mb-4 flex gap-1 pl-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    viewBox="0 0 576 512"
                    className="h-3.5 w-3.5"
                    style={{ fill: "#F59E0B" }}
                    aria-hidden="true"
                  >
                    <path d="M287.9 17.8L354 150.2 499.2 171.5C522 174.8 531.7 202.8 515.2 218.7L410 312.3 434.8 457.5C438.3 480.2 414.2 497.5 393.4 486.7L288 439.6 182.6 486.7C161.8 497.5 137.7 480.2 141.2 457.5L166 312.3 60.8 218.7C44.3 202.8 54 174.8 76.8 171.5L222 150.2 288.1 17.8C298.3-3.3 329.7-3.3 339.9 17.8H287.9z" />
                  </svg>
                ))}
              </div>

              <p className="mb-6 pl-2 text-sm leading-relaxed text-slate-600">
                &ldquo;{review.text}&rdquo;
              </p>

              <div className="flex items-center justify-between pl-2">
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    {review.name}
                  </p>
                  <span className="text-xs text-slate-400">
                    Cliente verificado
                  </span>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-red-100 bg-red-50">
                  <svg
                    viewBox="0 0 488 512"
                    className="h-3.5 w-3.5"
                    style={{ fill: "#ef4444" }}
                    aria-hidden="true"
                  >
                    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 122.3 24.5 165 64.9l-67 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.2 156.6 153.7 156.6 98.2 0 135.1-70.5 140.8-107H248v-85.8h236.1c2.3 12.7 3.9 24.9 3.9 42z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </M.div>
      </div>

      {isGoogleReviewConfigured && (
        <div className="relative z-10 mt-20 flex flex-col items-center justify-center px-5 text-center">
          <p className="mb-6 text-sm text-slate-500 md:text-base">
            Ficou satisfeito com o atendimento?
            <span className="mt-1 block text-slate-700">
              Deixe sua avaliação no Google.
            </span>
          </p>

          <M.a
            href={googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 rounded-full border border-red-300 px-7 py-3.5 text-xs font-medium tracking-wide text-red-600 transition-colors hover:border-red-400 hover:bg-red-50 md:text-sm"
          >
            <svg viewBox="0 0 488 512" className="h-4 w-4 fill-current" aria-hidden="true">
              <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 122.3 24.5 165 64.9l-67 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.2 156.6 153.7 156.6 98.2 0 135.1-70.5 140.8-107H248v-85.8h236.1c2.3 12.7 3.9 24.9 3.9 42z" />
            </svg>
            Avaliar no Google
          </M.a>
        </div>
      )}

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(239,68,68,0.2), transparent)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
