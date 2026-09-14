const RAILWAY_URL = process.env.RAILWAY_API_URL ?? "https://telemetria-node-production-0641.up.railway.app"

export type Profile = {
  nombre?: string
  username?: string
  bio?: string
  avatar?: string
  links?: { label: string; url: string; icon?: string }[]
  socials?: { label: string; url: string; icon?: string }[]
}

export type WishlistItem = { id?: string | number; nombre?: string; title?: string; url?: string; imagen?: string; image?: string; precio?: string | number; price?: string | number }

async function railway<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${RAILWAY_URL}${path}`, { ...init, headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) }, cache: "no-store" })
  if (!response.ok) throw new Error(`Railway API error: ${response.status}`)
  return response.json()
}

export async function getProfile() { return railway<Profile>("/api/perfil") }
export async function getWishlist() { return railway<WishlistItem[]>("/api/wishlist") }
export async function getExample() { return railway<{ mensaje?: string }>("/api/ejemplo") }
export async function updateProfile(data: Profile) { return railway<Profile>("/api/perfil", { method: "POST", body: JSON.stringify(data) }) }
export async function updateWishlist(data: WishlistItem[]) { return railway<WishlistItem[]>("/api/wishlist", { method: "POST", body: JSON.stringify(data) }) }

export function normalizeList<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[]
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>
    for (const key of ["data", "items", "wishlist", "links", "socials"]) if (Array.isArray(record[key])) return record[key] as T[]
  }
  return []
}

export { RAILWAY_URL }
