import Lesson from "../models/Lesson.js";
import { getOpenAI } from "../utils/openaiClient.js";

export const generateLessonPlan = async (req, res) => {
  try {
    const teacher = req.teacher;
    const { topic, grade = 6 } = req.body;

    if (!topic) {
      return res.status(400).json({ error: "Topic required" });
    }

    const prompt = `
Create a clear lesson plan on "${topic}" for grade ${grade} students in India.
Include explanations, examples, activities and exercises with answers.
`;

    const completion = await getOpenAI().chat.completions.create({
      model: "sarvam-105b",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 3000,
      reasoning_effort: "low",
      temperature: 0.4
    });

    const content = completion.choices[0].message.content;

    if (!content?.trim()) {
      return res.status(502).json({ error: "Empty lesson. Try again." });
    }

    const lesson = await Lesson.create({
      teacherId: teacher._id,
      topic,
      location: teacher.location,
      content
    });

    res.status(200).json(lesson);
  } catch (err) {
    res.status(500).json({ error: "Lesson generation failed" });
  }
};

export const generateLocalizedLesson = async (req, res) => {
  try {
    const teacher = req.teacher;
    const { topic, location } = req.body;
    const region = location || teacher.location || "India";

    const prompt = `
Generate a culturally relevant lesson plan on "${topic}"
for students in "${region}".
Include local examples and relatable real-life analogies.
`;

    const completion = await getOpenAI().chat.completions.create({
      model: "gemma4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2000,
      temperature: 0.5
    });

    const content = completion.choices[0].message.content;

    if (!content?.trim()) {
      return res.status(502).json({ error: "Empty lesson. Try again." });
    }

    const lesson = await Lesson.create({
      teacherId: teacher._id,
      topic,
      location: region,
      content
    });

    res.status(200).json(lesson);
  } catch (err) {
    res.status(500).json({ error: "Localized lesson generation failed" });
  }
};
