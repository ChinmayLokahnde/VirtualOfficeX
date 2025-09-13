const express = require('express');
import {registerUser, loginUser, getProfile} from "../controllers/authController";
import {authMiddleware} from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", register);
