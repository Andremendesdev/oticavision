import { address } from "@/lib/site/env";

export default function Footer() {
  return (
    <footer className="border-t border-stone-200/80 bg-[#f2efe9] px-6 py-10">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-serif text-xl font-semibold tracking-wide text-slate-900 sm:text-2xl">
          Ótica Vision
        </p>

        <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-red-600/80">
          Óculos de grau · Solar · Lentes de contato
        </p>

        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-slate-500">
          {address}
        </p>

        <div
          className="mx-auto my-8 h-px w-10"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(239,68,68,0.35), transparent)",
          }}
          aria-hidden="true"
        />

        <p
          className="text-xs text-slate-400"
          suppressHydrationWarning
        >
          © {new Date().getFullYear()} Ótica Vision · Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
}
