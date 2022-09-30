import express from "express";
import { signIn, signUp } from "../controllers/UserController.js";

const router = express.Router();

// Routes
router.post('/signIn', signIn)
router.post('/signUp', signUp)

export default router