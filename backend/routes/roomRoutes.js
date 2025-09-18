const express = require ('express');
const { createRoom, joinRoom, leaveRoom, endRoom, getRoomDetails} = require ('../controllers/roomController');
const authMiddleware = require ('../middleware/authMiddleware');

const router = express.Router();

router.post("/", authMiddleware, createRoom);
router.post("/:roomId/join", authMiddleware, joinRoom);
router.post("/:roomId/leave", authMiddleware, leaveRoom);
router.post("/:roomId/end", authMiddleware, endRoom)
router.get("/:roomId", getRoomDetails);

module.exports = router;
