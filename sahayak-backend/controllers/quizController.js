import Quiz from "../models/Quiz.js";
import { openai } from "../utils/openaiClient.js";

// 3️⃣ Quiz aur Worksheet banana
export const generateQuiz = async (req, res) => {
  try {
    console.log("Decoded teacher:", req.teacher);

    const teacher = req.teacher;
    const { topic } = req.body;

    const prompt = `
Create 5 multiple-choice quiz questions on "${topic}" with 4 options and correct answers.
Return JSON only:
[
  { "question": "", "options": ["","",...], "answer": "" }
]
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_completion_tokens: 1000,
      temperature: 0.3
    });

    const text = completion.choices[0].message.content;
    const match = text.match(/\[.*\]/s);
    const questions = match ? JSON.parse(match[0]) : [];

    const quiz = await Quiz.create({ teacherId: teacher._id, topic, questions });
    res.status(200).json(quiz);
  } catch (err) {
    res.status(500).json({ error: "Quiz generation failed" });
  }
};

// import Quiz from "../models/Quiz.js";
// import { model } from "../utils/geminiClient.js";

// // 3️⃣ Quiz aur Worksheet Generator (Gemini)
// export const generateQuiz = async (req, res) => {
//   try {
//     const teacher = req.teacher;
//     const { topic } = req.body;

//     if (!topic) return res.status(400).json({ error: "Topic required" });

//     const prompt = `
// Generate 5 multiple-choice quiz questions on topic "${topic}".
// Each question should have 4 options and 1 correct answer.
// Return as a pure JSON array like:
// [
//   {"question":"...","options":["...","...","...","..."],"answer":"..."}
// ]
// `;

//     // Call the model using whichever method is available and extract text safely
//     let result;
//     let text = "";
//     try {
//       if (typeof model.generateContent === "function") {
//         result = await model.generateContent(prompt);
//         text = typeof result?.response?.text === "function" ? result.response.text() : (result?.text ?? JSON.stringify(result));
//       } else if (typeof model.generate === "function") {
//         // The SDK may expect `{ input: prompt }` or `{ prompt }` depending on version.
//         result = await (async () => {
//           try { return await model.generate({ input: prompt }); } catch (e) { return await model.generate({ prompt }); }
//         })();
//         // Try common result shapes used by different SDK versions
//         text = result?.response?.text?.() ?? result?.output?.[0]?.content ?? result?.candidates?.[0]?.content ?? result?.text ?? JSON.stringify(result);
//       } else {
//         throw new Error("No supported generation method found on Gemini model");
//       }
//     } catch (err) {
//       // bubble up so outer catch can handle storage/response; keep a helpful message
//       console.error("Model generation error:", err);
//       return res.status(502).json({ error: "AI generation failed", details: String(err) });
//     }

//     let questions = [];
//     try {
//       const match = text.match(/\[.*\]/s);
//       if (match) questions = JSON.parse(match[0]);
//       else {
//         // Try to parse entire text as JSON if no bracket match
//         try { questions = JSON.parse(text); } catch (e) { questions = [{ question: text }]; }
//       }
//     } catch (err) {
//       console.log("JSON parse failed, returning raw text");
//       questions = [{ question: text }];
//     }

//     const quiz = await Quiz.create({
//       teacherId: teacher._id,
//       topic,
//       questions,
//     });

//     res.status(200).json(quiz);
//   } catch (err) {
//     console.error("Quiz generation failed:", err);
//     res.status(500).json({ error: "Quiz generation failed" });
//   }
// };
