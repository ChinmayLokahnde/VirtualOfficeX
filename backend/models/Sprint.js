import mongoose from "mongoose";

const SprintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: Date,
  endDate: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Sprint', SprintSchema);