const express = require('express');
const { createTask, updateTask, deleteTask, getTaskBySprint, getTaskDetails, addComments } = require ('../controllers/taskController');
const authMiddleware = require ('../middleware/authMiddleware');

const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/sprint/:sprintId", authMiddleware, getTaskBySprint);
router.get("/:taskId", authMiddleware, getTaskDetails);
router.put("/:taskId", authMiddleware, updateTask);
router.delete("/:taskId", authMiddleware, deleteTask);
router.post("/:taskId/comments", authMiddleware, addComments);

export default router;