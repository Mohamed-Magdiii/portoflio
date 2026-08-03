import mongoose from "mongoose";
import { connectDB } from "./mongodb.js";

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, default: "" },
    content: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    cover: { type: String, default: "" },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function getBlogs({ includeUnpublished = false } = {}) {
  const conn = await connectDB();
  if (!conn) return [];

  const filter = includeUnpublished ? {} : { published: true };
  return Blog.find(filter).sort({ createdAt: -1 }).lean();
}

export async function getBlog(slug) {
  const conn = await connectDB();
  if (!conn) return null;

  return Blog.findOne({ slug, published: true }).lean();
}

export async function createBlog(data) {
  const conn = await connectDB();
  if (!conn) return null;

  let slug = data.slug || slugify(data.title);
  if (!slug) return null;

  const existing = await Blog.findOne({ slug });
  if (existing) {
    slug = `${slug}-${Date.now().toString(36).slice(-4)}`;
  }

  return Blog.create({ ...data, slug });
}

export async function updateBlog(id, data) {
  const conn = await connectDB();
  if (!conn) return null;

  return Blog.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).lean();
}

export async function deleteBlog(id) {
  const conn = await connectDB();
  if (!conn) return null;

  return Blog.findByIdAndDelete(id).lean();
}
