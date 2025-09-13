const express = require('express');
import { createTask, updateTask, deleteTask, getTaskBySprint, getTaskDetails, addComments } from '../controllers/taskController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/sprint/:sprintId", authMiddleware, getTaskBySprint);
router.get("/:taskId", authMiddleware, getTaskDetails);
router.put("/:taskId", authMiddleware, updateTask);
router.delete("/:taskId", authMiddleware, deleteTask);
router.post("/:taskId/comments", authMiddleware, addComments);

export default router;