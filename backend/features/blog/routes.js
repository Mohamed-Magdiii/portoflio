import { Router } from "express";
import { getBlog, getBlogs } from "./lib.js";

const router = Router();

router.get("/blogs", async (req, res) => {
  try {
    const blogs = await getBlogs();
    res.setHeader("Cache-Control", "no-store");
    res.json(blogs);
  } catch (error) {
    console.error("Failed to load blogs:", error);
    res.status(500).json({ error: "Failed to load blogs" });
  }
});

router.get("/blogs/:slug", async (req, res) => {
  try {
    const blog = await getBlog(req.params.slug);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.setHeader("Cache-Control", "no-store");
    res.json(blog);
  } catch (error) {
    console.error("Failed to load blog:", error);
    res.status(500).json({ error: "Failed to load blog" });
  }
});

export default router;
