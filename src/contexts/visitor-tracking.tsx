'use client'

import type React from 'react'
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from 'react'

export interface VisitorData {
  sessionId: string
  visitorId: string
  timestamp: number
  page: string
  referrer: string
  userAgent: string
  language: string
  timezone: string
  screenResolution: string
  viewportSize: string
  colorScheme: string
  deviceType: string
  platform: string
  browser: string
  browserVersion: string
  os: string
  osVersion: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmContent?: string
  utmTerm?: string
  gclid?: string
  fbclid?: string
  msclkid?: string
  connectionType?: string
  effectiveType?: string
  downlink?: number
  rtt?: number
  saveData?: boolean
  memory?: number
  cores?: number
  hardwareConcurrency?: number
  maxTouchPoints?: number
  isOnline: boolean
  documentTitle: string
  documentCharset: string
  cookiesEnabled: boolean
  doNotTrack?: string
  plugins: string[]
  timeOnPage?: number
  scrollDepth?: number
  mouseMovements?: number
  keyPresses?: number
  clicks?: number
  interactions: string[]
}

export interface PageSession {
  sessionId: string
  visitorId: string
  page: string
  entryTime: number
  exitTime?: number
  duration: number
  scrollDepth: number
  interactions: string[]
  events: Array<{
    type: string
    timestamp: number
    data?: any
  }>
}

interface VisitorTrackingContextType {
  sessionId: string
  visitorId: string
  trackEvent: (eventType: string, data?: any) => void
  recordInteraction: (interaction: string) => void
}

const VisitorTrackingContext = createContext<
  VisitorTrackingContextType | undefined
>(undefined)

export const VisitorTrackingProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const sessionIdRef = useRef<string>('')
  const visitorIdRef = useRef<string>('')
  const pageSessionRef = useRef<PageSession | null>(null)
  const scrollDepthRef = useRef<number>(0)
  const interactionsRef = useRef<Set<string>>(new Set())
  const eventsRef = useRef<
    Array<{ type: string; timestamp: number; data?: any }>
  >([])
  const trackingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // useEffect(() => {
  //   sessionIdRef.current = `session_${Date.now()}_${Math.random()
  //     .toString(36)
  //     .substr(2, 9)}`

  //   let visitorId = localStorage.getItem('visitor_id')
  //   if (!visitorId) {
  //     visitorId = `visitor_${Date.now()}_${Math.random()
  //       .toString(36)
  //       .substr(2, 9)}`
  //     localStorage.setItem('visitor_id', visitorId)
  //   }
  //   visitorIdRef.current = visitorId

  //   pageSessionRef.current = {
  //     sessionId: sessionIdRef.current,
  //     visitorId: visitorIdRef.current,
  //     page: window.location.pathname,
  //     entryTime: Date.now(),
  //     duration: 0,
  //     scrollDepth: 0,
  //     interactions: [],
  //     events: [],
  //   }

  //   collectAndTrackVisitor()

  //   setupEventListeners()

  //   const trackingInterval = setInterval(() => {
  //     if (pageSessionRef.current) {
  //       pageSessionRef.current.duration =
  //         Date.now() - pageSessionRef.current.entryTime
  //       trackPageSession()
  //     }
  //   }, 30000)

  //   return () => {
  //     clearInterval(trackingInterval)
  //     if (trackingTimeoutRef.current) {
  //       clearTimeout(trackingTimeoutRef.current)
  //     }

  //     if (pageSessionRef.current) {
  //       pageSessionRef.current.duration =
  //         Date.now() - pageSessionRef.current.entryTime
  //       pageSessionRef.current.exitTime = Date.now()
  //       trackPageSession()
  //     }
  //   }
  // }, [])

  const collectAndTrackVisitor = useCallback(async () => {
    try {
      const visitorData = collectVisitorData()
      await fetch('/api/track/visitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visitorData),
        keepalive: true,
      }).catch(() => {})
    } catch (error) {}
  }, [])

  const collectVisitorData = (): VisitorData => {
    const nav = navigator as any
    const connection =
      nav.connection || nav.mozConnection || nav.webkitConnection
    const deviceMemory = nav.deviceMemory
    const hardwareConcurrency = nav.hardwareConcurrency
    const maxTouchPoints = nav.maxTouchPoints || 0

    const userAgent = nav.userAgent
    const { browser, browserVersion, os, osVersion, deviceType, platform } =
      parseUserAgent(userAgent)

    const utmParams = getUTMParameters()
    const clickIds = getClickIds()

    return {
      sessionId: sessionIdRef.current,
      visitorId: visitorIdRef.current,
      timestamp: Date.now(),
      page: window.location.pathname,
      referrer: document.referrer,
      userAgent,
      language: nav.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      colorScheme: window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light',
      deviceType,
      platform,
      browser,
      browserVersion,
      os,
      osVersion,
      utmSource: utmParams.utm_source,
      utmMedium: utmParams.utm_medium,
      utmCampaign: utmParams.utm_campaign,
      utmContent: utmParams.utm_content,
      utmTerm: utmParams.utm_term,
      gclid: clickIds.gclid,
      fbclid: clickIds.fbclid,
      msclkid: clickIds.msclkid,
      connectionType: connection?.type,
      effectiveType: connection?.effectiveType,
      downlink: connection?.downlink,
      rtt: connection?.rtt,
      saveData: connection?.saveData,
      memory: deviceMemory,
      cores: hardwareConcurrency,
      hardwareConcurrency,
      maxTouchPoints,
      isOnline: navigator.onLine,
      documentTitle: document.title,
      documentCharset: document.characterSet,
      cookiesEnabled: navigator.cookieEnabled,
      doNotTrack: nav.doNotTrack,
      plugins: Array.from(nav.plugins || []).map((p: any) => p.name),
      scrollDepth: scrollDepthRef.current,
      mouseMovements: 0,
      keyPresses: 0,
      clicks: 0,
      interactions: Array.from(interactionsRef.current),
    }
  }

  const parseUserAgent = (ua: string) => {
    let browser = 'Unknown'
    let browserVersion = 'Unknown'
    let os = 'Unknown'
    let osVersion = 'Unknown'
    let deviceType = 'desktop'
    let platform = 'Unknown'

    if (ua.includes('Chrome') && !ua.includes('Chromium')) {
      browser = 'Chrome'
      browserVersion = ua.match(/Chrome\/([\d.]+)/)?.[1] || 'Unknown'
    } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
      browser = 'Safari'
      browserVersion = ua.match(/Version\/([\d.]+)/)?.[1] || 'Unknown'
    } else if (ua.includes('Firefox')) {
      browser = 'Firefox'
      browserVersion = ua.match(/Firefox\/([\d.]+)/)?.[1] || 'Unknown'
    } else if (ua.includes('Edge')) {
      browser = 'Edge'
      browserVersion = ua.match(/Edge\/([\d.]+)/)?.[1] || 'Unknown'
    } else if (ua.includes('Opera') || ua.includes('OPR')) {
      browser = 'Opera'
      browserVersion = ua.match(/(?:Opera|OPR)\/([\d.]+)/)?.[1] || 'Unknown'
    }

    if (ua.includes('Windows')) {
      os = 'Windows'
      osVersion = ua.match(/Windows NT ([\d.]+)/)?.[1] || 'Unknown'
    } else if (ua.includes('Mac')) {
      os = 'macOS'
      osVersion =
        ua.match(/Mac OS X ([\d_]+)/)?.[1]?.replace(/_/g, '.') || 'Unknown'
    } else if (ua.includes('Linux')) {
      os = 'Linux'
      osVersion = 'Unknown'
    } else if (ua.includes('Android')) {
      os = 'Android'
      osVersion = ua.match(/Android ([\d.]+)/)?.[1] || 'Unknown'
      deviceType = 'mobile'
    } else if (ua.includes('iPhone') || ua.includes('iPad')) {
      os = 'iOS'
      osVersion = ua.match(/OS ([\d_]+)/)?.[1]?.replace(/_/g, '.') || 'Unknown'
      deviceType = ua.includes('iPad') ? 'tablet' : 'mobile'
    }

    platform = navigator.platform

    return { browser, browserVersion, os, osVersion, deviceType, platform }
  }

  const getUTMParameters = () => {
    const params = new URLSearchParams(window.location.search)
    return {
      utm_source: params.get('utm_source') || undefined,
      utm_medium: params.get('utm_medium') || undefined,
      utm_campaign: params.get('utm_campaign') || undefined,
      utm_content: params.get('utm_content') || undefined,
      utm_term: params.get('utm_term') || undefined,
    }
  }

  const getClickIds = () => {
    const params = new URLSearchParams(window.location.search)
    return {
      gclid: params.get('gclid') || undefined,
      fbclid: params.get('fbclid') || undefined,
      msclkid: params.get('msclkid') || undefined,
    }
  }

  const setupEventListeners = () => {
    const handleScroll = () => {
      const scrollPercentage =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100
      scrollDepthRef.current = Math.max(
        scrollDepthRef.current,
        Math.round(scrollPercentage)
      )
    }

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interaction = `click:${target.tagName}:${target.className}`
      interactionsRef.current.add(interaction)
      eventsRef.current.push({
        type: 'click',
        timestamp: Date.now(),
        data: { target: target.tagName, class: target.className },
      })
    }

    const handleKeyPress = (e: KeyboardEvent) => {
      const interaction = `keypress:${e.key}`
      interactionsRef.current.add(interaction)
      eventsRef.current.push({
        type: 'keypress',
        timestamp: Date.now(),
        data: { key: e.key },
      })
    }

    const handleVisibilityChange = () => {
      const interaction = `visibility:${document.hidden ? 'hidden' : 'visible'}`
      interactionsRef.current.add(interaction)
      eventsRef.current.push({
        type: 'visibility',
        timestamp: Date.now(),
        data: { hidden: document.hidden },
      })
    }

    const handleFocus = () => {
      interactionsRef.current.add('focus:window')
      eventsRef.current.push({
        type: 'focus',
        timestamp: Date.now(),
      })
    }

    const handleBlur = () => {
      interactionsRef.current.add('blur:window')
      eventsRef.current.push({
        type: 'blur',
        timestamp: Date.now(),
      })
    }

    const handleOnline = () => {
      interactionsRef.current.add('online')
      eventsRef.current.push({
        type: 'online',
        timestamp: Date.now(),
      })
    }

    const handleOffline = () => {
      interactionsRef.current.add('offline')
      eventsRef.current.push({
        type: 'offline',
        timestamp: Date.now(),
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('click', handleClick, { passive: true })
    document.addEventListener('keypress', handleKeyPress, { passive: true })
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('focus', handleFocus)
    window.addEventListener('blur', handleBlur)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleClick)
      document.removeEventListener('keypress', handleKeyPress)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('blur', handleBlur)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }

  const trackPageSession = useCallback(async () => {
    if (!pageSessionRef.current) return

    try {
      pageSessionRef.current.scrollDepth = scrollDepthRef.current
      pageSessionRef.current.interactions = Array.from(interactionsRef.current)
      pageSessionRef.current.events = eventsRef.current

      await fetch('/api/track/page-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pageSessionRef.current),
        keepalive: true,
      }).catch(() => {})
    } catch (error) {}
  }, [])

  const trackEvent = useCallback((eventType: string, data?: any) => {
    eventsRef.current.push({
      type: eventType,
      timestamp: Date.now(),
      data,
    })
    interactionsRef.current.add(`${eventType}:${JSON.stringify(data || {})}`)
  }, [])

  const recordInteraction = useCallback((interaction: string) => {
    interactionsRef.current.add(interaction)
    eventsRef.current.push({
      type: 'interaction',
      timestamp: Date.now(),
      data: { interaction },
    })
  }, [])

  return (
    <VisitorTrackingContext.Provider
      value={{
        sessionId: sessionIdRef.current,
        visitorId: visitorIdRef.current,
        trackEvent,
        recordInteraction,
      }}
    >
      {children}
    </VisitorTrackingContext.Provider>
  )
}

export const useVisitorTracking = () => {
  const context = useContext(VisitorTrackingContext)
  if (!context) {
    throw new Error(
      'useVisitorTracking must be used within VisitorTrackingProvider'
    )
  }
  return context
}
