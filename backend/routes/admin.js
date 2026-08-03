import { timingSafeEqual } from "crypto";
import { Router } from "express";
import { createToken, verifyToken } from "../lib/auth.js";
import { updateSection } from "../lib/content.js";

const router = Router();

function safeEqual(a, b) {
  const aBuf = Buffer.from(String(a));
  const bBuf = Buffer.from(String(b));
  if (aBuf.length !== bBuf.length) return false;
  return timingSafeEqual(aBuf, bBuf);
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

router.put("/content/:key", async (req, res) => {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  const payload = token ? await verifyToken(token) : null;

  if (!payload) {
    return res.status(401).json({ error: "Unauthorized" });
  }

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

export default router;
