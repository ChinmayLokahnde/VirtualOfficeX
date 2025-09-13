const express = require('express');
import { sendMessage, getAllMessage, deleteMessage } from '../controllers/messageController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.post("/:roomId", authMiddleware, sendMessage);
router.get("/:roomId", authMiddleware, getAllMessage);
router.delete("/:roomId", authMiddleware, deleteMessage);

export default router;
