const Room = require("../models/Room");
const User = require("../models/User.js");
const Map = require("../models/map.js");

//create room 
exports.createRoom = async (req, res) => {
  try {
    const { mapId } = req.body;
    const hostUserId = req.user.id;

    const map = await Map.findById(mapId);
    if (!map) {
      return res.status(404).json({ message: "Map not found" });
    }

    const room = new Room({
      hostUser: hostUserId,
      map: mapId,
      users: [hostUserId],
    });

    await room.save();
    res.status(201).json({ message: "Room successfully created", room });
  } catch (error) {
    res.status(500).json({ message: "Error creating room", error: error.message });
  }
};


//join room
exports.joinRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const userId = req.user.id;

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });
    if (!room.isActive) return res.status(400).json({ message: "Room is no longer available" });

    if (!room.users.includes(userId)) {
      room.users.push(userId);
      await room.save();
    }

    res.status(200).json({ message: "Room joined successfully", room });
  } catch (error) {
    res.status(500).json({ message: "Error joining room", error: error.message });
  }
};


//leave room
exports.leaveRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const userId = req.user.id;

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    room.users = room.users.filter((id) => id.toString() !== userId);
    await room.save();

    res.status(200).json({ message: "Left room successfully", room });
  } catch (error) {
    res.status(500).json({ message: "Error leaving room", error: error.message });
  }
};


//end room
exports.endRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const userId = req.user.id;

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    if (room.hostUser.toString() !== userId) {
      return res.status(403).json({ message: "Only host can end the room" });
    }

    room.isActive = false;
    room.endedAt = new Date();
    await room.save();

    res.status(200).json({ message: "Room ended successfully", room });
  } catch (error) {
    res.status(500).json({ message: "Error ending room", error: error.message });
  }
};


//get details
exports.getRoomDetails = async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findById(roomId)
      .populate("hostUser", "username email")
      .populate("map", "name description")
      .populate("users", "username email");

    if (!room) return res.status(404).json({ message: "Room not found" });

    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: "Error getting room details", error: error.message });
  }
};
