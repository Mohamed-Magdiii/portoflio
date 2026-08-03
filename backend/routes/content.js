import { Router } from "express";
import { getAllContent } from "../lib/content.js";

const router = Router();

router.get("/content", async (req, res) => {
  try {
    const content = await getAllContent();
    res.setHeader("Cache-Control", "no-store");
    res.json(content);
  } catch (error) {
    console.error("Failed to load content:", error);
    res.status(500).json({ error: "Failed to load content" });
  }
});

export default router;
