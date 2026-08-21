import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  school: String,
  location: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Teacher", teacherSchema);
