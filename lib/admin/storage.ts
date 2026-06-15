import type { AdminSettings, EarningEntry } from "./types"

const ENTRIES_KEY = "barbershop-earnings"
const SETTINGS_KEY = "barbershop-admin-settings"

export function loadLocalEntries(): EarningEntry[] {
  if (typeof window === "undefined") return []

  try {
    const raw = localStorage.getItem(ENTRIES_KEY)
    if (!raw) return []
    return JSON.parse(raw) as EarningEntry[]
  } catch {
    return []
  }
}

export function loadLocalSettings(): AdminSettings | null {
  if (typeof window === "undefined") return null

  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    if (!raw) return null
    return JSON.parse(raw) as AdminSettings
  } catch {
    return null
  }
}

export function clearLocalAdminData() {
  localStorage.removeItem(ENTRIES_KEY)
  localStorage.removeItem(SETTINGS_KEY)
}
