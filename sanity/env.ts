export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-05-30'

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || 'production'

const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() ?? ''

export const isSanityConfigured = rawProjectId.length > 0

export const projectId = rawProjectId

export function requireSanityProjectId(): string {
  if (!isSanityConfigured) {
    throw new Error('Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID')
  }
  return projectId
}

export const useCdn = false
