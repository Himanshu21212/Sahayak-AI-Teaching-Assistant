// Test runner for controllers/quizController.js — uses local stubs so it can run standalone

// ...stubbed dependencies...
const model = {
  generateContent: async (prompt) => {
    // simulate a Gemini response object with response.text()
    return {
      response: {
        text: () => `[
  {"question":"What is photosynthesis?","options":["Process by plants","Respiration","Digestion","None"],"answer":"Process by plants"},
  {"question":"Which pigment captures light?","options":["Chlorophyll","Hemoglobin","Myoglobin","Melanin"],"answer":"Chlorophyll"}
]`
      }
    };
  }
};

const Quiz = {
  create: async (data) => {
    // return the object that the real controller would send back
    return { _id: 'mock_quiz_id', ...data };
  }
};

// Recreated generateQuiz function (keeps console.log statements from your file)
async function generateQuiz(req, res) {
  try {
    const teacher = req.teacher;
    const { topic } = req.body;

    if (!topic) return res.status(400).json({ error: "Topic required" });

    const prompt = `\nGenerate 5 multiple-choice quiz questions on topic "${topic}".\nEach question should have 4 options and 1 correct answer.\nReturn as a pure JSON array like:\n[\n  {"question":"...","options":["...","...","...","..."],"answer":"..."}\n]\n`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    let questions = [];
    try {
      const match = text.match(/\[.*\]/s);
      if (match) questions = JSON.parse(match[0]);
    } catch (err) {
      console.log("JSON parse failed, returning raw text");
      questions = [{ question: text }];
    }

    const quiz = await Quiz.create({
      teacherId: teacher._id,
      topic,
      questions,
    });

    res.status(200).json(quiz);
  } catch (err) {
    console.log("response is ", result);
    console.error("Quiz generation failed:", err);
    res.status(500).json({ error: "Quiz generation failed" });
  }
}

// Fake request/response
const req = { teacher: { _id: 'teacher123' }, body: { topic: 'Photosynthesis' } };
const res = {
  _status: 200,
  status(code) { this._status = code; return this; },
  json(obj) { console.log('---Response---'); console.log('STATUS', this._status); console.log(JSON.stringify(obj, null, 2)); }
};

// Run the function
generateQuiz(req, res).then(() => console.log('\nRunner finished')).catch(err => console.error('Runner error:', err));
