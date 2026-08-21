import Lesson from "../models/Lesson.js";
import { openai } from "../utils/openaiClient.js";

// 1️⃣ AI se Lesson Plan banana
export const generateLessonPlan = async (req, res) => {
  try {
    console.log("Generating lesson plan...");
    const teacher = req.teacher;
    console.log("Teacher:", teacher);
    const { topic } = req.body;
    if (!topic) return res.status(400).json({ error: "Topic required" });

    const prompt = `
Create a clear lesson plan on "${topic}" for grade 6 students in India.
Include: Explanation, 2 examples, 1 activity, and 2 exercises with answers.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_completion_tokens: 800,
      temperature: 0.4
    });

    const content = completion.choices[0].message.content;
    const lesson = await Lesson.create({
      teacherId: teacher._id,
      topic,
      location: teacher.location,
      content
    });

    res.status(200).json(lesson);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lesson generation failed" });
  }
};

// 2️⃣ Local / culturally relevant content
export const generateLocalizedLesson = async (req, res) => {
  try {
    const teacher = req.teacher;
    const { topic, location } = req.body;

    const region = location || teacher.location || "India";

    const prompt = `
Generate a culturally relevant lesson plan on "${topic}" for students in "${region}".
Include local festivals, food, dialects, or real-life analogies students relate to.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_completion_tokens: 800,
      temperature: 0.5
    });

    const content = completion.choices[0].message.content;
    const lesson = await Lesson.create({
      teacherId: teacher._id,
      topic,
      location: region,
      content
    });

    res.status(200).json(lesson);
  } catch (err) {
    res.status(500).json({ error: "Localized content generation failed" });
  }
};

// import Lesson from "../models/Lesson.js";
// import { model } from "../utils/geminiClient.js";

// 1️⃣ AI se Lesson Plan banana (Gemini)
// export const generateLessonPlan = async (req, res) => {
//   try {
//     const teacher = req.teacher;
//     const { topic } = req.body;
//     if (!topic) return res.status(400).json({ error: "Topic required" });

//     const prompt = `
// Create a clear and simple lesson plan for topic "${topic}" for grade 6 students in India.
// Include:
// 1. 3–4 line explanation
// 2. 2 Indian examples
// 3. 1 classroom activity
// 4. 2 practice questions with answers.
// `;

//     const result = await model.generateContent(prompt);
//     const content = result.response.text();

//     const lesson = await Lesson.create({
//       teacherId: teacher._id,
//       topic,
//       location: teacher.location,
//       content,
//     });

//     res.status(200).json(lesson);
//   } catch (err) {
//     console.error("Lesson generation failed:", err);
//     res.status(500).json({ error: "Lesson generation failed" });
//   }
// };

// 2️⃣ Local / culturally relevant content (Gemini)
// export const generateLocalizedLesson = async (req, res) => {
//   try {
//     const teacher = req.teacher;
//     const { topic, location } = req.body;
//     const region = location || teacher.location || "India";

//     const prompt = `
// Create a culturally relevant lesson plan on "${topic}" for students in "${region}".
// Use local festivals, markets, and traditions for examples.
// Structure:
// 1. Short explanation
// 2. 2 local examples
// 3. 1 group activity
// 4. 2 exercises (with answers)
// `;

//     const result = await model.generateContent(prompt);
//     const content = result.response.text();

//     const lesson = await Lesson.create({
//       teacherId: teacher._id,
//       topic,
//       location: region,
//       content,
//     });

//     res.status(200).json(lesson);
//   } catch (err) {
//     console.error("Localized lesson generation failed:", err);
//     res.status(500).json({ error: "Localized content generation failed" });
//   }
// };
