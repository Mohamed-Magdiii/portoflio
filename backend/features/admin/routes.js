import { timingSafeEqual } from "crypto";
import { Router } from "express";
import { createToken, verifyToken } from "./auth.js";
import { updateSection } from "../content/lib.js";
import { createBlog, deleteBlog, getBlogs, updateBlog } from "../blog/lib.js";

const router = Router();

function safeEqual(a, b) {
  const aBuf = Buffer.from(String(a));
  const bBuf = Buffer.from(String(b));
  if (aBuf.length !== bBuf.length) return false;
  return timingSafeEqual(aBuf, bBuf);
}

async function requireAdmin(req, res, next) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  const payload = token ? await verifyToken(token) : null;

  if (!payload) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
}

router.post("/login", async (req, res) => {
  const { password } = req.body || {};
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || !safeEqual(password, adminPassword)) {
    return res.status(401).json({ error: "Invalid password" });
  }

  const token = await createToken();
  return res.status(200).json({ token });
});

router.put("/content/:key", requireAdmin, async (req, res) => {
  const { key } = req.params;
  const { data } = req.body || {};

  if (!data) {
    return res.status(400).json({ error: "Missing data" });
  }

  try {
    const updated = await updateSection(key, data);
    if (!updated) {
      return res.status(400).json({ error: `Unknown section: ${key}` });
    }
    return res.status(200).json({ ok: true, key, data: updated });
  } catch (error) {
    console.error("Failed to update section:", error);
    return res.status(500).json({ error: "Failed to update section" });
  }
});

router.get("/blogs", requireAdmin, async (req, res) => {
  try {
    const blogs = await getBlogs({ includeUnpublished: true });
    return res.status(200).json(blogs);
  } catch (error) {
    console.error("Failed to load blogs:", error);
    return res.status(500).json({ error: "Failed to load blogs" });
  }
});

router.post("/blogs", requireAdmin, async (req, res) => {
  const { title, slug, excerpt, content, tags, cover, published } = req.body || {};

  if (!title) {
    return res.status(400).json({ error: "Missing title" });
  }

  try {
    const blog = await createBlog({
      title,
      slug,
      excerpt,
      content,
      tags,
      cover,
      published,
    });
    if (!blog) {
      return res.status(400).json({ error: "Failed to create blog" });
    }
    return res.status(201).json(blog);
  } catch (error) {
    console.error("Failed to create blog:", error);
    return res.status(500).json({ error: "Failed to create blog" });
  }
});

router.put("/blogs/:id", requireAdmin, async (req, res) => {
  const { title, slug, excerpt, content, tags, cover, published } = req.body || {};

  try {
    const blog = await updateBlog(req.params.id, {
      title,
      slug,
      excerpt,
      content,
      tags,
      cover,
      published,
    });
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    return res.status(200).json(blog);
  } catch (error) {
    console.error("Failed to update blog:", error);
    return res.status(500).json({ error: "Failed to update blog" });
  }
});

router.delete("/blogs/:id", requireAdmin, async (req, res) => {
  try {
    const blog = await deleteBlog(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Failed to delete blog:", error);
    return res.status(500).json({ error: "Failed to delete blog" });
  }
});

export default router;
