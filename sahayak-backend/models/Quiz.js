import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  teacherId: String,
  topic: String,
  questions: [Object],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Quiz", quizSchema);
