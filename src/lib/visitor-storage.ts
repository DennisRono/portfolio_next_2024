import Redis from 'ioredis'

const redis = new Redis(process.env.NEXT_PUBLIC_UPSTASH_REDIS_URL!)

interface StoredVisitorData {
  [key: string]: any
}

interface StoredPageSession {
  [key: string]: any
}

class VisitorStorage {
  async storeVisitorData(visitorId: string, data: any): Promise<void> {
    const key = `visitor:${visitorId}`
    const existing = await redis.hgetall(key)
    const merged = { ...existing, ...data, lastUpdated: Date.now().toString() }
    await redis.hmset(key, merged)
  }

  async storePageSession(
    sessionId: string,
    visitorId: string,
    page: string,
    data: any
  ): Promise<void> {
    const key = `pageSession:${visitorId}:${sessionId}`
    await redis.hmset(key, { ...data, storedAt: Date.now().toString() })

    await redis.sadd(`visitorSessions:${visitorId}`, sessionId)

    await redis.sadd(`pageSessions:${page}`, key)
  }

  async getVisitorData(visitorId: string): Promise<StoredVisitorData | null> {
    const key = `visitor:${visitorId}`
    const data = await redis.hgetall(key)
    return Object.keys(data).length > 0 ? data : null
  }

  async getPageSession(
    visitorId: string,
    sessionId: string
  ): Promise<StoredPageSession | null> {
    const key = `pageSession:${visitorId}:${sessionId}`
    const data = await redis.hgetall(key)
    return Object.keys(data).length > 0 ? data : null
  }

  async getVisitorSessions(visitorId: string): Promise<StoredPageSession[]> {
    const sessionIds = await redis.smembers(`visitorSessions:${visitorId}`)
    const sessions = await Promise.all(
      sessionIds.map((sessionId) => this.getPageSession(visitorId, sessionId))
    )
    return sessions.filter((session) => session !== null) as StoredPageSession[]
  }

  async getPageSessions(page: string): Promise<StoredPageSession[]> {
    const keys = await redis.smembers(`pageSessions:${page}`)
    const sessions = await Promise.all(keys.map((key) => redis.hgetall(key)))
    return sessions.filter((session) => Object.keys(session).length > 0)
  }

  async getAllVisitors(): Promise<
    Array<{ visitorId: string; data: StoredVisitorData }>
  > {
    const keys = await redis.keys('visitor:*')
    const visitors = await Promise.all(
      keys.map(async (key) => {
        const data = await redis.hgetall(key)
        return { visitorId: key.split(':')[1], data }
      })
    )
    return visitors
  }

  async getAllPages(): Promise<string[]> {
    const keys = await redis.keys('pageSessions:*')
    const pages = new Set<string>()
    keys.forEach((key) => {
      const parts = key.split(':')
      if (parts.length > 1) {
        pages.add(parts[1])
      }
    })
    return Array.from(pages)
  }

  async getAnalytics() {
    const visitorKeys = await redis.keys('visitor:*')
    const totalVisitors = visitorKeys.length

    const sessionKeys = await redis.keys('pageSession:*')
    const totalSessions = sessionKeys.length

    const pageKeys = await redis.keys('pageSessions:*')
    const pages = await Promise.all(
      pageKeys.map(async (key) => {
        const page = key.split(':')[1]
        const keys = await redis.smembers(key)
        const uniqueVisitors = new Set(keys.map((k) => k.split(':')[1])).size
        return {
          page,
          sessions: keys.length,
          uniqueVisitors,
        }
      })
    )

    const browsers = new Map<string, number>()
    const oses = new Map<string, number>()
    const devices = new Map<string, number>()
    const utmSources = new Map<string, number>()

    for (const visitorKey of visitorKeys) {
      const data = await redis.hgetall(visitorKey)
      if (data.browser)
        browsers.set(data.browser, (browsers.get(data.browser) || 0) + 1)
      if (data.os) oses.set(data.os, (oses.get(data.os) || 0) + 1)
      if (data.deviceType)
        devices.set(data.deviceType, (devices.get(data.deviceType) || 0) + 1)
      if (data.utmSource)
        utmSources.set(
          data.utmSource,
          (utmSources.get(data.utmSource) || 0) + 1
        )
    }

    return {
      totalVisitors,
      totalSessions,
      pages,
      browsers: Object.fromEntries(browsers),
      oses: Object.fromEntries(oses),
      devices: Object.fromEntries(devices),
      utmSources: Object.fromEntries(utmSources),
    }
  }

  async clear(): Promise<void> {
    const keys = await redis.keys('visitor:*')
    const pageSessionKeys = await redis.keys('pageSession:*')
    const visitorSessionKeys = await redis.keys('visitorSessions:*')
    const pageIndexKeys = await redis.keys('pageSessions:*')
    const allKeys = [
      ...keys,
      ...pageSessionKeys,
      ...visitorSessionKeys,
      ...pageIndexKeys,
    ]
    if (allKeys.length > 0) {
      await redis.del(allKeys)
    }
  }
}

export const visitorStorage = new VisitorStorage()
