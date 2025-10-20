import mongoose from "mongoose"

const PageSessionSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      index: true,
    },
    visitorId: {
      type: String,
      required: true,
      index: true,
    },
    page: {
      type: String,
      required: true,
      index: true,
    },
    entryTime: Number,
    exitTime: Number,
    duration: Number,
    scrollDepth: Number,
    interactions: [String],
    events: [
      {
        type: String,
        timestamp: Number,
        data: mongoose.Schema.Types.Mixed,
      },
    ],
  },
  { timestamps: true },
)

export const PageSession = mongoose.models?.PageSession || mongoose.model("PageSession", PageSessionSchema)
