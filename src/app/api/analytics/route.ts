import { NextResponse } from 'next/server'
import { visitorStorage } from '@/lib/visitor-storage'
import dbConnect from '@/config/database_connect'
import CustomError from '@/lib/CustomError'

export async function GET() {
  try {
    const isconnected: boolean = await dbConnect()
    if (!isconnected) {
      throw new CustomError('Failed to connect to database', 500)
    }

    const analytics = await visitorStorage.getAnalytics()
    const allVisitors = await visitorStorage.getAllVisitors()
    const allPages = await visitorStorage.getAllPages()

    return NextResponse.json({
      analytics,
      visitors: allVisitors,
      pages: allPages,
    })
  } catch (error) {
    if (error instanceof CustomError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode }
      )
    }
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
