import { Router } from "express";
import { UAParser } from "ua-parser-js";
import { recordVisit, getStats } from "./lib.js";

const router = Router();

function parseDevice(ua) {
  const parsed = UAParser(ua || "");
  return {
    type: parsed.device?.type || "desktop",
    brand: parsed.device?.vendor || parsed.device?.brand || "",
    model: parsed.device?.model || "",
    os: parsed.os?.name || "",
    osVersion: parsed.os?.version || "",
    browser: parsed.browser?.name || "",
    browserVersion: parsed.browser?.version || "",
  };
}

router.post("/visitors", async (req, res) => {
  try {
    const { visitorId, path } = req.body || {};
    if (!visitorId) {
      return res.status(400).json({ error: "Missing visitorId" });
    }
    const device = parseDevice(req.headers["user-agent"]);
    const stats = await recordVisit(visitorId, path || "/", device);
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({ ok: true, path: path || "/", ...stats });
  } catch (error) {
    console.error("Failed to record visit:", error);
    res.status(500).json({ error: "Failed to record visit" });
  }
});

router.get("/visitors", async (req, res) => {
  try {
    const stats = await getStats();
    res.setHeader("Cache-Control", "no-store");
    res.json(stats);
  } catch (error) {
    console.error("Failed to load visitor stats:", error);
    res.status(500).json({ error: "Failed to load visitor stats" });
  }
});

export default router;
