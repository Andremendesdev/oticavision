"use client"

import { getWhatsAppUrl } from "@/lib/site/env"
import { M } from "./safe-motion"

export default function FloatingWhatsApp({
  whatsappLink = null,
  whatsappConfigured = false,
}: {
  whatsappLink?: string | null
  whatsappConfigured?: boolean
}) {
  const handleClick = () => {
    const url = whatsappLink ?? getWhatsAppUrl("Olá! Gostaria de saber mais sobre os produtos da ótica.")
    if (url) window.open(url, "_blank")
  }

  return (
    <M.button
      onClick={handleClick}
      disabled={!whatsappConfigured}
      initial={{ opacity: 0, scale: 0, y: 48 }}
      animate={{
        opacity: whatsappConfigured ? 1 : 0.55,
        scale: 1,
        y: 0,
      }}
      transition={{
        delay: 2,
        duration: 0.55,
        type: "spring",
        stiffness: 260,
        damping: 18,
      }}
      whileHover={whatsappConfigured ? { scale: 1.1, y: -2 } : undefined}
      whileTap={whatsappConfigured ? { scale: 0.92 } : undefined}
      aria-label="Fale com nossa ótica pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full transition-colors duration-300 disabled:cursor-default"
      style={{
        background: "#16a34a",
        border: "2px solid #22c55e",
        boxShadow: "0 0 20px rgba(34,197,94,0.4)",
      }}
      onMouseEnter={(e) => {
        if (!whatsappConfigured) return
        const el = e.currentTarget
        el.style.background = "#22c55e"
        el.style.boxShadow = "0 0 32px rgba(34,197,94,0.6)"
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.background = "#16a34a"
        el.style.boxShadow = "0 0 20px rgba(34,197,94,0.4)"
      }}
    >
      {/* Anel pulsante */}
      <M.span
        className="absolute inset-0 rounded-full border-2 border-green-400/40"
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: [0, 0.6, 0], scale: [1, 1.35, 1.5] }}
        transition={{
          delay: 2.4,
          duration: 1.2,
          repeat: Infinity,
          repeatDelay: 2.5,
          ease: "easeOut",
        }}
        aria-hidden="true"
      />
      <svg
        viewBox="0 0 448 512"
        className="relative z-10 size-6 fill-white"
        aria-hidden="true"
      >
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-221.7 99.3-221.7 221.7 0 39.1 10.2 77.3 29.6 111L0 480l118.7-30.9c32.6 17.8 69.5 27.2 107.2 27.2h.1c122.4 0 221.7-99.3 221.7-221.7 0-59.3-23.1-115-65-157zM223.9 438.6c-33.5 0-66.2-9-94.7-26l-6.8-4-70.4 18.3 18.8-68.6-4.4-7c-18.6-29.6-28.4-63.7-28.4-98.6 0-101.7 82.8-184.5 184.5-184.5 49.3 0 95.6 19.2 130.4 54.1 34.9 34.9 54.1 81.2 54.1 130.4 0 101.7-82.8 184.5-184.5 184.5zm101.3-138.2c-5.5-2.8-32.5-16-37.6-17.8-5.1-1.9-8.8-2.8-12.6 2.8-3.7 5.5-14.4 17.8-17.7 21.5-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-53.9-29.1-75.4-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.6-30.4-17.3-41.6-4.5-10.8-9.1-9.3-12.6-9.5-3.2-.1-6.9-.1-10.6-.1s-9.7 1.4-14.8 6.9c-5.1 5.5-19.5 19-19.5 46.3s20 53.8 22.8 57.5c2.8 3.7 39.4 60.2 95.5 84.4 13.4 5.8 23.9 9.3 32 11.9 13.4 4.3 25.6 3.7 35.3 2.2 10.8-1.6 32.5-13.3 37.1-26.2 4.6-12.9 4.6-24 3.2-26.2-1.3-2.3-5-3.7-10.5-6.5z" />
      </svg>
    </M.button>
  )
}
