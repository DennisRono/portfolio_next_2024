"use client"

import { useState } from "react"
import type { Editor } from "@tiptap/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Target, TrendingUp, BookOpen, Zap } from "lucide-react"

interface AIWritingAssistantProps {
  editor: Editor
  isVisible: boolean
  onClose: () => void
}

interface WritingMetrics {
  readabilityScore: number
  sentimentScore: number
  wordCount: number
  avgSentenceLength: number
  complexWords: number
}

export function AIWritingAssistant({ editor, isVisible, onClose }: AIWritingAssistantProps) {
  const [activeTab, setActiveTab] = useState("metrics")
  const [writingGoal, setWritingGoal] = useState("")

  const content = editor.getText()
  const metrics = calculateWritingMetrics(content)

  function calculateWritingMetrics(text: string): WritingMetrics {
    const words = text.split(/\s+/).filter((word) => word.length > 0)
    const sentences = text.split(/[.!?]+/).filter((sentence) => sentence.trim().length > 0)
    const complexWords = words.filter((word) => word.length > 6).length

    return {
      readabilityScore: Math.max(0, Math.min(100, 100 - complexWords * 2)),
      sentimentScore: 65, // Mock sentiment analysis
      wordCount: words.length,
      avgSentenceLength: sentences.length > 0 ? words.length / sentences.length : 0,
      complexWords,
    }
  }

  const getReadabilityLevel = (score: number) => {
    if (score >= 90) return { level: "Very Easy", color: "text-green-600" }
    if (score >= 80) return { level: "Easy", color: "text-green-500" }
    if (score >= 70) return { level: "Fairly Easy", color: "text-yellow-500" }
    if (score >= 60) return { level: "Standard", color: "text-orange-500" }
    if (score >= 50) return { level: "Fairly Difficult", color: "text-red-500" }
    return { level: "Difficult", color: "text-red-600" }
  }

  const getSentimentLabel = (score: number) => {
    if (score >= 70) return { label: "Positive", color: "text-green-600" }
    if (score >= 40) return { label: "Neutral", color: "text-gray-600" }
    return { label: "Negative", color: "text-red-600" }
  }

  if (!isVisible) return null

  const readability = getReadabilityLevel(metrics.readabilityScore)
  const sentiment = getSentimentLabel(metrics.sentimentScore)

  return (
    <div className="fixed left-4 top-20 w-80 max-h-96 overflow-y-auto z-50">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Brain className="h-5 w-5 text-purple-500" />
            Writing Assistant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="metrics" className="text-xs">
                Metrics
              </TabsTrigger>
              <TabsTrigger value="goals" className="text-xs">
                Goals
              </TabsTrigger>
              <TabsTrigger value="insights" className="text-xs">
                Insights
              </TabsTrigger>
            </TabsList>

            <TabsContent value="metrics" className="space-y-4 mt-4">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Readability</span>
                    <Badge className={readability.color}>{readability.level}</Badge>
                  </div>
                  <Progress value={metrics.readabilityScore} className="h-2" />
                  <span className="text-xs text-muted-foreground">{metrics.readabilityScore}/100</span>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Sentiment</span>
                    <Badge className={sentiment.color}>{sentiment.label}</Badge>
                  </div>
                  <Progress value={metrics.sentimentScore} className="h-2" />
                  <span className="text-xs text-muted-foreground">{metrics.sentimentScore}/100</span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="text-center p-2 bg-muted rounded">
                    <div className="text-lg font-semibold">{metrics.wordCount}</div>
                    <div className="text-xs text-muted-foreground">Words</div>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <div className="text-lg font-semibold">{Math.round(metrics.avgSentenceLength)}</div>
                    <div className="text-xs text-muted-foreground">Avg Sentence</div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="goals" className="space-y-4 mt-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium mb-2 block">Writing Goal</label>
                  <Textarea
                    placeholder="What do you want to achieve with this piece?"
                    value={writingGoal}
                    onChange={(e) => setWritingGoal(e.target.value)}
                    className="min-h-[80px] resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Quick Goals</h4>
                  <div className="grid gap-2">
                    {[
                      { icon: Target, label: "Increase clarity", action: () => editor.commands.improveWriting() },
                      {
                        icon: TrendingUp,
                        label: "Improve tone",
                        action: () => editor.commands.changeWritingStyle("professional"),
                      },
                      {
                        icon: BookOpen,
                        label: "Simplify language",
                        action: () => editor.commands.changeWritingStyle("casual"),
                      },
                      { icon: Zap, label: "Make it concise", action: () => editor.commands.shortenText() },
                    ].map((goal, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={goal.action}
                        className="justify-start bg-transparent"
                      >
                        <goal.icon className="h-4 w-4 mr-2" />
                        {goal.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-4 mt-4">
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <h4 className="text-sm font-medium mb-1">💡 Writing Tip</h4>
                  <p className="text-xs text-muted-foreground">
                    Your average sentence length is {Math.round(metrics.avgSentenceLength)} words. Consider varying
                    sentence length for better flow.
                  </p>
                </div>

                <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                  <h4 className="text-sm font-medium mb-1">✨ Strength</h4>
                  <p className="text-xs text-muted-foreground">
                    Your writing has a {sentiment.label.toLowerCase()} tone, which works well for engaging content.
                  </p>
                </div>

                {metrics.complexWords > metrics.wordCount * 0.2 && (
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                    <h4 className="text-sm font-medium mb-1">⚠️ Suggestion</h4>
                    <p className="text-xs text-muted-foreground">
                      Consider simplifying some complex words to improve readability.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
