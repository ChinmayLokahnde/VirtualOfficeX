const express = require('express');
import { createMap, getMyMaps, getMapById, getPublicMaps, updateMap, deleteMap } from '../controllers/mapController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.post("/", authMiddleware, createMap);
router.get("/my", authMiddleware, getMyMaps);
router.get("/public",getPublicMaps);
router.get("/:id", getMapById);
router.put("/:id", authMiddleware, updateMap);
router.delete("/:id", authMiddleware, deleteMap);

export default router;