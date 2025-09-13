const express = require ('express');
import { createSprint, updateSprint, getAllSprints, deleteSprint, getSprintById, } from '../controllers/sprintController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.post("/", authMiddleware, createSprint);
router.get("/:id", authMiddleware, getSprintById);
router.get("/", authMiddleware, getAllSprints);
router.put("/:id", authMiddleware, updateSprint);
router.delete("/:id", authMiddleware, deleteSprint);

export default router;

