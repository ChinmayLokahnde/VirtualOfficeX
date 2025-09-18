const express = require('express');
const { sendMessage, getAllMessage, deleteMessage } = require ('../controllers/messageController');
const authMiddleware = require ('../middleware/authMiddleware');

const router = express.Router();

router.post("/:roomId", authMiddleware, sendMessage);
router.get("/:roomId", authMiddleware, getAllMessage);
router.delete("/:roomId", authMiddleware, deleteMessage);

module.exports = router;
