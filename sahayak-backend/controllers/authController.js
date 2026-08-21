import Teacher from "../models/Teacher.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password, school, location } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: "All fields required" });

    const existing = await Teacher.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already used" });

    const passwordHash = await bcrypt.hash(password, 10);
    const teacher = await Teacher.create({
      name,
      email,
      passwordHash,
      school,
      location
    });

    const token = jwt.sign(
      { teacherId: teacher._id, email: teacher.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      token,
      teacher: { id: teacher._id, name, email, school, location }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const teacher = await Teacher.findOne({ email });
    if (!teacher) return res.status(401).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, teacher.passwordHash);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { teacherId: teacher._id, email: teacher.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token,
      teacher: { id: teacher._id, name: teacher.name, email: teacher.email }
    });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};
