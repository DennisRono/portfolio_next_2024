'use client'

import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface Analytics {
  totalVisitors: number
  totalSessions: number
  pages: Array<{
    page: string
    sessions: number
    uniqueVisitors: number
  }>
  browsers: Record<string, number>
  oses: Record<string, number>
  devices: Record<string, number>
  utmSources: Record<string, number>
}

interface Visitor {
  visitorId: string
  data: any
}

const COLORS = [
  '#3b82f6',
  '#ef4444',
  '#10b981',
  '#f59e0b',
  '#8b5cf6',
  '#ec4899',
  '#14b8a6',
  '#f97316',
]

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [visitors, setVisitors] = useState<Visitor[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPage, setSelectedPage] = useState<string | null>(null)
  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null)

  useEffect(() => {
    fetchAnalytics()
    const interval = setInterval(fetchAnalytics, 5000) // Refresh every 5 seconds
    return () => clearInterval(interval)
  }, [])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics')
      const data = await response.json()
      setAnalytics(data.analytics)
      setVisitors(data.visitors)
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg text-muted-foreground">
          Loading analytics...
        </div>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg text-muted-foreground">No data available</div>
      </div>
    )
  }

  const browserData = Object.entries(analytics.browsers).map(
    ([name, count]) => ({
      name,
      value: count,
    })
  )

  const osData = Object.entries(analytics.oses).map(([name, count]) => ({
    name,
    value: count,
  }))

  const deviceData = Object.entries(analytics.devices).map(([name, count]) => ({
    name,
    value: count,
  }))

  const utmData = Object.entries(analytics.utmSources).map(([name, count]) => ({
    name,
    value: count,
  }))

  const pageData = analytics.pages.map((p) => ({
    page: p.page || '/',
    sessions: p.sessions,
    visitors: p.uniqueVisitors,
  }))

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground">
            Real-time visitor tracking and insights
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Visitors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {analytics.totalVisitors}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {analytics.totalSessions}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pages Tracked
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{analytics.pages.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg Sessions/Visitor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {analytics.totalVisitors > 0
                  ? (analytics.totalSessions / analytics.totalVisitors).toFixed(
                      2
                    )
                  : 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Pages Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Pages Performance</CardTitle>
              <CardDescription>
                Sessions and unique visitors per page
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={pageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="page"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sessions" fill="#3b82f6" />
                  <Bar dataKey="visitors" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Browser Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Browser Distribution</CardTitle>
              <CardDescription>Visitors by browser type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={browserData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {browserData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* OS Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Operating System Distribution</CardTitle>
              <CardDescription>Visitors by operating system</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={osData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {osData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Device Type Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Device Type Distribution</CardTitle>
              <CardDescription>Visitors by device type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* UTM Sources */}
          {utmData.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources (UTM)</CardTitle>
                <CardDescription>Visitors by UTM source</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={utmData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Detailed Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Visitors Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Visitors</CardTitle>
              <CardDescription>Latest visitor information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {visitors.slice(0, 10).map((visitor) => (
                  <div
                    key={visitor.visitorId}
                    className="p-3 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors"
                    onClick={() => setSelectedVisitor(visitor)}
                  >
                    <div className="font-mono text-sm text-foreground truncate">
                      {visitor.visitorId}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {visitor.data.browser} on {visitor.data.os} •{' '}
                      {visitor.data.deviceType}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pages Table */}
          <Card>
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
              <CardDescription>Most visited pages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {analytics.pages
                  .sort((a, b) => b.sessions - a.sessions)
                  .slice(0, 10)
                  .map((page) => (
                    <div
                      key={page.page}
                      className="p-3 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors"
                      onClick={() => setSelectedPage(page.page)}
                    >
                      <div className="font-mono text-sm text-foreground truncate">
                        {page.page || '/'}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {page.sessions} sessions • {page.uniqueVisitors} unique
                        visitors
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Visitor Details Modal */}
        {selectedVisitor && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-96 overflow-y-auto">
              <CardHeader>
                <CardTitle>Visitor Details</CardTitle>
                <button
                  onClick={() => setSelectedVisitor(null)}
                  className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {Object.entries(selectedVisitor.data).map(([key, value]) => (
                    <div key={key}>
                      <div className="font-semibold text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </div>
                      <div className="text-foreground break-words">
                        {String(value)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
