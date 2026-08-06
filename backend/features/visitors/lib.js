import mongoose from "mongoose";
import { connectDB } from "../_shared/mongodb.js";

const VisitorSchema = new mongoose.Schema(
  {
    visitorId: { type: String, required: true, unique: true },
    visits: { type: Number, default: 0 },
    firstSeen: { type: Date, default: Date.now },
    lastSeen: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Visitor =
  mongoose.models.Visitor || mongoose.model("Visitor", VisitorSchema);

export async function recordVisit(visitorId) {
  const conn = await connectDB();
  if (!conn) return null;
  if (!visitorId) return null;

  await Visitor.findOneAndUpdate(
    { visitorId },
    {
      $inc: { visits: 1 },
      $set: { lastSeen: new Date() },
      $setOnInsert: { firstSeen: new Date() },
    },
    { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }
  );

  return getStats();
}

export async function getStats() {
  const conn = await connectDB();
  if (!conn) return { totalVisitors: 0, totalVisits: 0 };

  const [visitors, visits] = await Promise.all([
    Visitor.countDocuments(),
    Visitor.aggregate([{ $group: { _id: null, total: { $sum: "$visits" } } }]),
  ]);

  return { totalVisitors: visitors, totalVisits: visits[0]?.total || 0 };
}
