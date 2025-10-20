import { type NextRequest, NextResponse } from 'next/server'
import { visitorStorage } from '@/lib/visitor-storage'
import dbConnect from '@/config/database_connect'
import CustomError from '@/lib/CustomError'

export async function POST(request: NextRequest) {
  try {
    const isconnected: boolean = await dbConnect()
    if (!isconnected) {
      throw new CustomError('Failed to connect to database', 500)
    }
    const data = await request.json()
    const { sessionId, visitorId, page, ...sessionInfo } = data

    visitorStorage.storePageSession(sessionId, visitorId, page, {
      page,
      ...sessionInfo,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    if (error instanceof CustomError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode }
      )
    }
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
