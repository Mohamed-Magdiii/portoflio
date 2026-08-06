import mongoose from "mongoose";
import { connectDB } from "../_shared/mongodb.js";

const VisitorSchema = new mongoose.Schema(
  {
    visitorId: { type: String, required: true, unique: true },
    visits: { type: Number, default: 0 },
    device: { type: mongoose.Schema.Types.Mixed, default: {} },
    firstSeen: { type: Date, default: Date.now },
    lastSeen: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Visitor =
  mongoose.models.Visitor || mongoose.model("Visitor", VisitorSchema);

const VisitSchema = new mongoose.Schema(
  {
    visitorId: { type: String, required: true },
    path: { type: String, default: "/" },
    device: { type: mongoose.Schema.Types.Mixed, default: {} },
    visitedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

VisitSchema.index({ visitedAt: -1 });

const Visit = mongoose.models.Visit || mongoose.model("Visit", VisitSchema);

export async function recordVisit(visitorId, path = "/", device = {}) {
  const conn = await connectDB();
  if (!conn) return null;
  if (!visitorId) return null;

  await Visitor.findOneAndUpdate(
    { visitorId },
    {
      $inc: { visits: 1 },
      $set: { lastSeen: new Date(), device },
      $setOnInsert: { firstSeen: new Date() },
    },
    { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }
  );

  await Visit.create({ visitorId, path, device, visitedAt: new Date() });

  return getStats();
}

export async function getStats(limit = 15) {
  const conn = await connectDB();
  if (!conn) return { totalVisitors: 0, totalVisits: 0, recentVisits: [] };

  const [visitors, visits, recent] = await Promise.all([
    Visitor.countDocuments(),
    Visitor.aggregate([{ $group: { _id: null, total: { $sum: "$visits" } } }]),
    Visit.find()
      .sort({ visitedAt: -1 })
      .limit(limit)
      .select("path device visitedAt -_id")
      .lean(),
  ]);

  return {
    totalVisitors: visitors,
    totalVisits: visits[0]?.total || 0,
    recentVisits: recent,
  };
}
