import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { generateQuiz } from "../controllers/quizController.js";

const router = express.Router();
router.post("/generate", authMiddleware, generateQuiz);
export default router;
