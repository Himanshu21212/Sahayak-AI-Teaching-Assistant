import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { generateLessonPlan, generateLocalizedLesson } from "../controllers/lessonController.js";

const router = express.Router();
router.post("/generate", authMiddleware, generateLessonPlan);
router.post("/generate-local", authMiddleware, generateLocalizedLesson);

export default router;
