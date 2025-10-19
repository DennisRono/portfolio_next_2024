import { type NextRequest, NextResponse } from "next/server"
import { visitorStorage } from "@/lib/visitor-storage"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { visitorId, sessionId, ...visitorInfo } = data

    // Store visitor data asynchronously
    visitorStorage.storeVisitorData(visitorId, {
      sessionId,
      ...visitorInfo,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("[v0] Visitor tracking error:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
