interface StoredVisitorData {
  [key: string]: any
}

interface StoredPageSession {
  [key: string]: any
}

class VisitorStorage {
  private visitorData: Map<string, StoredVisitorData> = new Map()
  private pageSessions: Map<string, StoredPageSession> = new Map()
  private sessionIndex: Map<string, string[]> = new Map() // visitorId -> sessionIds
  private pageIndex: Map<string, string[]> = new Map() // page -> sessionIds

  storeVisitorData(visitorId: string, data: any): void {
    this.visitorData.set(visitorId, {
      ...this.visitorData.get(visitorId),
      ...data,
      lastUpdated: Date.now(),
    })
  }

  storePageSession(
    sessionId: string,
    visitorId: string,
    page: string,
    data: any
  ): void {
    const key = `${visitorId}:${sessionId}`
    this.pageSessions.set(key, {
      ...data,
      storedAt: Date.now(),
    })

    // Update indexes
    if (!this.sessionIndex.has(visitorId)) {
      this.sessionIndex.set(visitorId, [])
    }
    this.sessionIndex.get(visitorId)!.push(sessionId)

    if (!this.pageIndex.has(page)) {
      this.pageIndex.set(page, [])
    }
    this.pageIndex.get(page)!.push(key)
  }

  getVisitorData(visitorId: string): StoredVisitorData | null {
    return this.visitorData.get(visitorId) || null
  }

  getPageSession(
    visitorId: string,
    sessionId: string
  ): StoredPageSession | null {
    const key = `${visitorId}:${sessionId}`
    return this.pageSessions.get(key) || null
  }

  getVisitorSessions(visitorId: string): StoredPageSession[] {
    const sessionIds = this.sessionIndex.get(visitorId) || []
    return sessionIds
      .map((sessionId) => this.getPageSession(visitorId, sessionId))
      .filter((session) => session !== null) as StoredPageSession[]
  }

  getPageSessions(page: string): StoredPageSession[] {
    const keys = this.pageIndex.get(page) || []
    return keys
      .map((key) => this.pageSessions.get(key))
      .filter((session) => session !== null) as StoredPageSession[]
  }

  getAllVisitors(): Array<{ visitorId: string; data: StoredVisitorData }> {
    return Array.from(this.visitorData.entries()).map(([visitorId, data]) => ({
      visitorId,
      data,
    }))
  }

  getAllPages(): string[] {
    return Array.from(this.pageIndex.keys())
  }

  getAnalytics() {
    const totalVisitors = this.visitorData.size
    const totalSessions = this.pageSessions.size
    const pages = Array.from(this.pageIndex.entries()).map(([page, keys]) => ({
      page,
      sessions: keys.length,
      uniqueVisitors: new Set(keys.map((k) => k.split(':')[0])).size,
    }))

    const browsers = new Map<string, number>()
    const oses = new Map<string, number>()
    const devices = new Map<string, number>()
    const utmSources = new Map<string, number>()

    this.visitorData.forEach((data) => {
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
    })

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

  clear(): void {
    this.visitorData.clear()
    this.pageSessions.clear()
    this.sessionIndex.clear()
    this.pageIndex.clear()
  }
}

export const visitorStorage = new VisitorStorage()
