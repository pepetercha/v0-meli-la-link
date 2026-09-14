import { NextResponse } from "next/server"
import { getExample, getProfile, getWishlist, normalizeList } from "@/lib/railway"

export async function GET() {
  try {
    const [profile, wishlist, example] = await Promise.all([getProfile(), getWishlist(), getExample()])
    return NextResponse.json({ profile, wishlist: normalizeList(wishlist), example })
  } catch (error) {
    console.error("[v0] Railway content fetch failed", error)
    return NextResponse.json({ profile: {}, wishlist: [], example: {} }, { status: 502 })
  }
}
