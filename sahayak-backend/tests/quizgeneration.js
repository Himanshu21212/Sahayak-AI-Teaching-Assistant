// testGenerateQuiz.js
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import { generateQuiz } from "../controllers/quizController.js";

dotenv.config();

(async () => {
  try {
    // 1️⃣ Connect to DB
    await connectDB();

    // 2️⃣ Mock Request and Response
    const req = {
      teacher: { _id: "672b8f1cf1a7c8a123456789" }, // 🔹 Replace with valid Teacher _id from MongoDB
      body: { topic: "Photosynthesis" },
    };

    const res = {
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        console.log("\n🟢 Response Status:", this.statusCode);
        console.log("📦 Response Data:\n", JSON.stringify(data, null, 2));
      },
    };

    // 3️⃣ Run the controller
    console.log("🚀 Testing generateQuiz controller...");
    await generateQuiz(req, res);
    console.log("\n✅ Done!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error running test:", error);
    process.exit(1);
  }
})();
