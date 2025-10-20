"use client"
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react"
import { Info, AlertTriangle, CheckCircle, XCircle, Lightbulb } from "lucide-react"

interface CalloutComponentProps {
  node: {
    attrs: {
      type: string
      title: string
    }
  }
  updateAttributes: (attributes: Record<string, any>) => void
}

const calloutConfig = {
  info: {
    icon: Info,
    className: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100",
    iconClassName: "text-blue-600 dark:text-blue-400",
  },
  warning: {
    icon: AlertTriangle,
    className:
      "border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-100",
    iconClassName: "text-yellow-600 dark:text-yellow-400",
  },
  success: {
    icon: CheckCircle,
    className:
      "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100",
    iconClassName: "text-green-600 dark:text-green-400",
  },
  error: {
    icon: XCircle,
    className: "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100",
    iconClassName: "text-red-600 dark:text-red-400",
  },
  tip: {
    icon: Lightbulb,
    className:
      "border-purple-200 bg-purple-50 text-purple-900 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-100",
    iconClassName: "text-purple-600 dark:text-purple-400",
  },
}

export function CalloutComponent({ node, updateAttributes }: CalloutComponentProps) {
  const config = calloutConfig[node.attrs.type as keyof typeof calloutConfig] || calloutConfig.info
  const Icon = config.icon

  return (
    <NodeViewWrapper>
      <div className={`callout border-l-4 p-4 rounded-r-lg ${config.className}`}>
        <div className="flex items-start gap-3">
          <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${config.iconClassName}`} />
          <div className="flex-1">
            {node.attrs.title && <div className="font-semibold mb-2">{node.attrs.title}</div>}
            <NodeViewContent className="callout-content" />
          </div>
        </div>
      </div>
    </NodeViewWrapper>
  )
}
