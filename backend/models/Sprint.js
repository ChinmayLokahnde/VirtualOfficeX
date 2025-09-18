const mongoose = require ("mongoose");

const SprintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: Date,
  endDate: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.expports = mongoose.model('Sprint', SprintSchema);