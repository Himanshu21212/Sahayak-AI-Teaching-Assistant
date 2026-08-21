// utils/openaiClient.js
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

// ✅ Proper named export
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
