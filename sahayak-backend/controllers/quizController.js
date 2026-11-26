import Quiz from "../models/Quiz.js";
import { getOpenAI } from "../utils/openaiClient.js";

export const generateQuiz = async (req, res) => {
  try {
    const teacher = req.teacher;
    const { topic } = req.body;

    if (!topic?.trim()) {
      return res.status(400).json({ error: "Topic required" });
    }

    const prompt = `
Create 5 multiple-choice quiz questions on "${topic}".
Each question must have four distinct options and one correct answer.

Return a JSON object containing a questions array.
Each question must have question, options and answer fields.
`;

    const completion = await getOpenAI().chat.completions.create({
      model: "gemma4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 3500,
      temperature: 0.3,
      response_format: { type: "json_object" }
    });

    const text = completion.choices[0].message.content;
    const match = text?.match(/\[[\s\S]*\]/);
    const questions = match ? JSON.parse(match[0]) : [];

    const valid = questions.length === 5 &&
      questions.every(q =>
        typeof q.question === "string" &&
        Array.isArray(q.options) &&
        q.options.length === 4 &&
        q.options.includes(q.answer)
      );

    if (!valid) {
      return res.status(502).json({
        error: "Invalid quiz returned. Try again."
      });
    }

    const quiz = await Quiz.create({
      teacherId: teacher._id,
      topic,
      questions
    });

    res.status(200).json(quiz);
  } catch (err) {
    res.status(500).json({ error: "Quiz generation failed" });
  }
};
