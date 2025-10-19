import { type NextRequest, NextResponse } from "next/server"
import { visitorStorage } from "@/lib/visitor-storage"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { sessionId, visitorId, page, ...sessionInfo } = data

    // Store page session data asynchronously
    visitorStorage.storePageSession(sessionId, visitorId, page, {
      page,
      ...sessionInfo,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Page session tracking error:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
