const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  hostUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  map: { type: mongoose.Schema.Types.ObjectId, ref: "Map" },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  endedAt: Date
});

module.exports = mongoose.model("Room", roomSchema);
