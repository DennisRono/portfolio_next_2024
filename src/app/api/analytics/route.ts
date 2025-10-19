import { NextResponse } from "next/server"
import { visitorStorage } from "@/lib/visitor-storage"

export async function GET() {
  try {
    const analytics = visitorStorage.getAnalytics()
    const allVisitors = visitorStorage.getAllVisitors()
    const allPages = visitorStorage.getAllPages()

    return NextResponse.json({
      analytics,
      visitors: allVisitors,
      pages: allPages,
    })
  } catch (error) {
    console.error("[v0] Analytics error:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
