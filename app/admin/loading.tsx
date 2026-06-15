import { Scissors } from "lucide-react"

export default function AdminLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-[#38bdf8]/10">
          <Scissors className="size-8 animate-pulse text-[#38bdf8]" />
        </div>
        <div>
          <p className="font-semibold text-white">Carregando painel...</p>
          <p className="text-sm text-[#555]">Aguarde um momento</p>
        </div>
      </div>
    </div>
  )
}
