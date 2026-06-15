"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-[#101112] px-6 text-center text-white">
        <div className="max-w-md space-y-3">
          <h1 className="text-lg font-semibold">Studio não configurado</h1>
          <p className="text-sm text-zinc-400">
            Defina{" "}
            <code className="text-sky-300">NEXT_PUBLIC_SANITY_PROJECT_ID</code>{" "}
            nas variáveis de ambiente da Vercel e faça um novo deploy.
          </p>
        </div>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
