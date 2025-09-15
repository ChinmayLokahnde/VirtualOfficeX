const express = require ('express');
const { createSprint, updateSprint, getAllSprints, deleteSprint, getSprintById, } = require ('../controllers/sprintController');
const authMiddleware = require ('../middleware/authMiddleware');

const router = express.Router();

router.post("/", authMiddleware, createSprint);
router.get("/:id", authMiddleware, getSprintById);
router.get("/", authMiddleware, getAllSprints);
router.put("/:id", authMiddleware, updateSprint);
router.delete("/:id", authMiddleware, deleteSprint);

export default router;

