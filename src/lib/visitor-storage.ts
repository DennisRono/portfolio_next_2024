import { PageSession } from '@/schemas/page-session'
import { Visitor } from '@/schemas/visitor'

interface StoredVisitorData {
  [key: string]: any
}

interface StoredPageSession {
  [key: string]: any
}

class VisitorStorage {
  async storeVisitorData(visitorId: string, data: any): Promise<void> {
    await Visitor.findOneAndUpdate(
      { visitorId },
      {
        ...data,
        visitorId,
        lastUpdated: new Date(),
      },
      { upsert: true, new: true }
    )
  }

  async storePageSession(
    sessionId: string,
    visitorId: string,
    page: string,
    data: any
  ): Promise<void> {
    try {
      await PageSession.create({
        sessionId,
        visitorId,
        page,
        ...data,
      })
    } catch (error) {
      console.error('Error storing page session')
    }
  }

  async getVisitorData(visitorId: string): Promise<StoredVisitorData | null> {
    try {
      const visitor = await Visitor.findOne({ visitorId }).lean()
      return visitor ? (visitor as StoredVisitorData) : null
    } catch (error) {
      console.error('Error getting visitor data:', error)
      return null
    }
  }

  async getPageSession(
    visitorId: string,
    sessionId: string
  ): Promise<StoredPageSession | null> {
    try {
      const session = await PageSession.findOne({
        visitorId,
        sessionId,
      }).lean()
      return session ? (session as StoredPageSession) : null
    } catch (error) {
      console.error('Error getting page session:', error)
      return null
    }
  }

  async getVisitorSessions(visitorId: string): Promise<StoredPageSession[]> {
    try {
      const sessions = await PageSession.find({ visitorId }).lean()
      return sessions as StoredPageSession[]
    } catch (error) {
      console.error('Error getting visitor sessions:', error)
      return []
    }
  }

  async getPageSessions(page: string): Promise<StoredPageSession[]> {
    try {
      const sessions = await PageSession.find({ page }).lean()
      return sessions as StoredPageSession[]
    } catch (error) {
      console.error('Error getting page sessions:', error)
      return []
    }
  }

  async getAllVisitors(): Promise<
    Array<{ visitorId: string; data: StoredVisitorData }>
  > {
    try {
      const visitors = await Visitor.find({}).lean()
      return visitors.map((visitor: any) => ({
        visitorId: visitor.visitorId,
        data: visitor as StoredVisitorData,
      }))
    } catch (error) {
      console.error('Error getting all visitors:', error)
      return []
    }
  }

  async getAllPages(): Promise<string[]> {
    try {
      const pages = await PageSession.distinct('page')
      return pages as string[]
    } catch (error) {
      console.error('Error getting all pages:', error)
      return []
    }
  }

  async getAnalytics() {
    try {
      const totalVisitors = await Visitor.countDocuments()
      const totalSessions = await PageSession.countDocuments()

      const pageStats = await PageSession.aggregate([
        {
          $group: {
            _id: '$page',
            sessions: { $sum: 1 },
            uniqueVisitors: { $addToSet: '$visitorId' },
          },
        },
        {
          $project: {
            page: '$_id',
            sessions: 1,
            uniqueVisitors: { $size: '$uniqueVisitors' },
            _id: 0,
          },
        },
      ])

      const browserStats = await Visitor.aggregate([
        {
          $group: {
            _id: '$browser',
            count: { $sum: 1 },
          },
        },
        {
          $match: { _id: { $ne: null } },
        },
      ])

      const osStats = await Visitor.aggregate([
        {
          $group: {
            _id: '$os',
            count: { $sum: 1 },
          },
        },
        {
          $match: { _id: { $ne: null } },
        },
      ])

      const deviceStats = await Visitor.aggregate([
        {
          $group: {
            _id: '$deviceType',
            count: { $sum: 1 },
          },
        },
        {
          $match: { _id: { $ne: null } },
        },
      ])

      const utmStats = await Visitor.aggregate([
        {
          $group: {
            _id: '$utmSource',
            count: { $sum: 1 },
          },
        },
        {
          $match: { _id: { $ne: null } },
        },
      ])

      return {
        totalVisitors,
        totalSessions,
        pages: pageStats,
        browsers: Object.fromEntries(
          browserStats.map((stat) => [stat._id, stat.count])
        ),
        oses: Object.fromEntries(osStats.map((stat) => [stat._id, stat.count])),
        devices: Object.fromEntries(
          deviceStats.map((stat) => [stat._id, stat.count])
        ),
        utmSources: Object.fromEntries(
          utmStats.map((stat) => [stat._id, stat.count])
        ),
      }
    } catch (error) {
      console.error('Error getting analytics:', error)
      return {
        totalVisitors: 0,
        totalSessions: 0,
        pages: [],
        browsers: {},
        oses: {},
        devices: {},
        utmSources: {},
      }
    }
  }

  async clear(): Promise<void> {
    try {
      await Visitor.deleteMany({})
      await PageSession.deleteMany({})
    } catch (error) {
      console.error('Error clearing data:', error)
    }
  }
}

export const visitorStorage = new VisitorStorage()
