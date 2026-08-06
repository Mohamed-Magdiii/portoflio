import "dotenv/config";
import express from "express";
import cors from "cors";
import contentRoutes from "./features/content/routes.js";
import adminRoutes from "./features/admin/routes.js";
import blogRoutes from "./features/blog/routes.js";
import visitorsRoutes from "./features/visitors/routes.js";

const app = express();

app.disable("x-powered-by");
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.use("/api", contentRoutes);
app.use("/api", blogRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", visitorsRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 5000;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Portfolio backend running on http://localhost:${PORT}`);
  });
}

export default app;
