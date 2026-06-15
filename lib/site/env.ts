function trimEnv(value: string | undefined) {
  return typeof value === "string" ? value.trim() : ""
}

export const DEFAULT_SITE_NAME = "Ótica Vision"
export const DEFAULT_LOCATION_LABEL = "Piraju-SP 🇧🇷"
export const DEFAULT_ADDRESS =
  "Avenida Domingos Teodoro Galo, n121 — Piraju-SP 🇧🇷"

// Acesso estático: Next.js só embute NEXT_PUBLIC_* no client com process.env.NOME fixo.
export const siteName =
  trimEnv(process.env.NEXT_PUBLIC_SITE_NAME) || DEFAULT_SITE_NAME
export const locationLabel =
  trimEnv(process.env.NEXT_PUBLIC_LOCATION_LABEL) || DEFAULT_LOCATION_LABEL
export const address =
  trimEnv(process.env.NEXT_PUBLIC_ADDRESS) || DEFAULT_ADDRESS

export const whatsappNumber = trimEnv(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER)
export const instagramUrl = trimEnv(process.env.NEXT_PUBLIC_INSTAGRAM_URL)
export const googleReviewUrl = trimEnv(process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL)
export const mapLat = trimEnv(process.env.NEXT_PUBLIC_MAP_LAT)
export const mapLng = trimEnv(process.env.NEXT_PUBLIC_MAP_LNG)

export const isWhatsAppConfigured = whatsappNumber.length > 0
export const isInstagramConfigured = instagramUrl.length > 0
export const isGoogleReviewConfigured = googleReviewUrl.length > 0
export const isMapConfigured = mapLat.length > 0 && mapLng.length > 0
export const isMapAvailable = isMapConfigured || address.length > 0

export const DEFAULT_WHATSAPP_MSG =
  "Olá! Vocês estão atendendo hoje? Tô pensando em passar aí — é por ordem de chegada?"

export function getDefaultWhatsAppUrl() {
  return getWhatsAppUrl(DEFAULT_WHATSAPP_MSG)
}

export function getWhatsAppUrl(message: string) {
  if (!isWhatsAppConfigured) return null
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
}

export function getMapEmbedUrl() {
  if (isMapConfigured) {
    return `https://www.google.com/maps?q=${mapLat},${mapLng}&output=embed`
  }

  if (address.length > 0) {
    return `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`
  }

  return null
}

export function getMapDirectionsUrl() {
  if (isMapConfigured) {
    return `https://www.google.com/maps/dir/?api=1&destination=${mapLat},${mapLng}`
  }

  if (address.length > 0) {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`
  }

  return null
}
