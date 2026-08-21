import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  teacherId: String,
  topic: String,
  location: String,
  content: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Lesson", lessonSchema);
