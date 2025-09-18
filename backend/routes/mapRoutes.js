const express = require('express');
const { createMap, getMyMaps, getMapById, getPublicMaps, updateMap, deleteMap } = require ('../controllers/mapController');
const authMiddleware = require ('../middleware/authMiddleware');

const router = express.Router();

router.post("/", authMiddleware, createMap);
router.get("/my", authMiddleware, getMyMaps);
router.get("/public",getPublicMaps);
router.get("/:id", getMapById);
router.put("/:id", authMiddleware, updateMap);
router.delete("/:id", authMiddleware, deleteMap);

module.exports = router;