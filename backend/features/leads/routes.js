import { Router } from "express";
import { createLead, getLeads, deleteLead } from "./lib.js";
import { verifyToken } from "../admin/auth.js";

const router = Router();

async function requireAdmin(req, res, next) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  const payload = token ? await verifyToken(token) : null;

  if (!payload) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
}

router.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, subject, projectType, budget, message } =
      req.body || {};

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: "Name, email and message are required" });
    }

    const lead = await createLead({
      name,
      email,
      phone,
      subject,
      projectType,
      budget,
      message,
    });

    if (!lead) {
      return res.status(500).json({ error: "Failed to save message" });
    }

    return res.status(201).json({ ok: true });
  } catch (error) {
    console.error("Failed to create lead:", error);
    return res.status(500).json({ error: "Failed to save message" });
  }
});

router.get("/leads", requireAdmin, async (req, res) => {
  try {
    const leads = await getLeads();
    res.setHeader("Cache-Control", "no-store");
    return res.json(leads);
  } catch (error) {
    console.error("Failed to load leads:", error);
    return res.status(500).json({ error: "Failed to load leads" });
  }
});

router.delete("/leads/:id", requireAdmin, async (req, res) => {
  try {
    const lead = await deleteLead(req.params.id);
    if (!lead) {
      return res.status(404).json({ error: "Lead not found" });
    }
    return res.json({ ok: true });
  } catch (error) {
    console.error("Failed to delete lead:", error);
    return res.status(500).json({ error: "Failed to delete lead" });
  }
});

export default router;
