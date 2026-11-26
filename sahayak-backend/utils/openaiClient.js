// utils/openaiClient.js
import OpenAI from "openai";

export const getOpenAI = () => new OpenAI({
  apiKey: process.env.SARVAM_API_KEY,
  baseURL: "https://api.sarvam.ai/v2"
});
