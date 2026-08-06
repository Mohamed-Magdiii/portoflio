import mongoose from "mongoose";
import { connectDB } from "../_shared/mongodb.js";

const LeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    subject: { type: String, default: "" },
    projectType: { type: String, default: "" },
    budget: { type: String, default: "" },
    message: { type: String, required: true },
    status: { type: String, default: "new" },
  },
  { timestamps: true }
);

LeadSchema.index({ createdAt: -1 });

const Lead = mongoose.models.Lead || mongoose.model("Lead", LeadSchema);

export async function createLead(data) {
  const conn = await connectDB();
  if (!conn) return null;
  return Lead.create(data);
}

export async function getLeads() {
  const conn = await connectDB();
  if (!conn) return [];
  return Lead.find().sort({ createdAt: -1 }).lean();
}

export async function deleteLead(id) {
  const conn = await connectDB();
  if (!conn) return null;
  return Lead.findByIdAndDelete(id);
}
