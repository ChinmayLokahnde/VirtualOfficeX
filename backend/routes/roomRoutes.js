const express = require ('express');
import { createRoom, joinRoom, leaveRoom, endRoom, getRoomDetails} from '../controllers/roomController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.post("/", authMiddleware, createRoom);
router.post("/:roomId/join", authMiddleware, joinRoom);
router.post("/:roomId/leave", authMiddleware, leaveRoom);
router.post("/:roomId/end", authMiddleware, endRoom)
router.get("/:roomId", getRoomDetails);

export default router;
