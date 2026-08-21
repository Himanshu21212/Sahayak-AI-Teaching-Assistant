import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

export const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Recommended model for Sahayak project
export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
