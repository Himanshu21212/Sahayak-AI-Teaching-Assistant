import express from "express";
import mongoose from "mongoose";

import authRoutes from "../sahayak-backend/routes/authRoutes.js";
import lessonRoutes from "../sahayak-backend/routes/lessonRoutes.js";
import quizRoutes from "../sahayak-backend/routes/quizRoutes.js";

const app = express();

app.use(express.json());

let connecting;

app.use(async (req, res, next) => {
  const mongoUri = process.env.MONGO_URI || process.env.MANGO_URI;

  try {
    connecting ??= mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 15000
    }).catch(error => {
      connecting = undefined;
      throw error;
    });

    await connecting;
    next();
  } catch {
    res.status(503).json({
      error: "The teacher database is unavailable."
    });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/lesson", lessonRoutes);
app.use("/api/quiz", quizRoutes);

export default app;
