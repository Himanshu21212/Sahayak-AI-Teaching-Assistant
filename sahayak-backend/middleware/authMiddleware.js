// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import Teacher from "../models/Teacher.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // attach teacher to req
    const teacher = await Teacher.findById(decoded.teacherId).select("-passwordHash");
    if (!teacher) return res.status(401).json({ error: "Invalid token (no teacher)" });

    req.teacher = teacher; // now controllers can use req.teacher._id
    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(401).json({ error: "Unauthorized" });
  }
};
