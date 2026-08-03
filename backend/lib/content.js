import mongoose from "mongoose";
import { connectDB } from "./mongodb.js";
import { defaultContent } from "./defaultContent.js";

const ContentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    data: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

const Content =
  mongoose.models.Content || mongoose.model("Content", ContentSchema);

export async function getAllContent() {
  const conn = await connectDB();
  if (!conn) return defaultContent;

  const docs = await Content.find().lean();

  if (docs.length === 0) {
    const toInsert = Object.entries(defaultContent).map(([key, data]) => ({
      key,
      data,
    }));
    await Content.insertMany(toInsert);
    return defaultContent;
  }

  const result = { ...defaultContent };
  for (const doc of docs) {
    result[doc.key] = doc.data;
  }
  return result;
}

export async function updateSection(key, data) {
  const conn = await connectDB();
  if (!conn) return null;

  if (!(key in defaultContent)) return null;

  await Content.findOneAndUpdate(
    { key },
    { key, data },
    { upsert: true, new: true }
  );
  return data;
}
