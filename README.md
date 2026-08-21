# 🎓 Sahayak AI Educator

Sahayak AI is a comprehensive, AI-powered educational ecosystem designed to empower teachers by automating the creation of high-quality educational content. From structured lesson plans and interactive quizzes to professional scientific animations, Sahayak AI streamlines the pedagogical process, allowing educators to focus more on teaching and less on content preparation.

---

## 🏗️ Overall Architecture

Sahayak AI is built as a modular system consisting of three primary components that work together to provide a seamless experience for educators:

### 1. **Frontend (`sahayak-ai-educator`)**
- **Role**: The user interface where teachers interact with the system.
- **Tech Stack**: React, TypeScript, Vite, Tailwind CSS, Shadcn UI.
- **Key Functions**: 
  - Teacher Dashboard for managing content.
  - Forms for generating AI lessons and quizzes.
  - Interface for viewing and sharing generated educational materials.

### 2. **Backend (`sahayak-backend`)**
- **Role**: The central orchestrator handling data, authentication, and AI logic.
- **Tech Stack**: Node.js, Express, MongoDB, JWT.
- **Key Functions**:
  - **Authentication**: Secure login and session management for teachers.
  - **AI Integration**: Interfaces with Google Gemini and OpenAI to generate structured lesson content and quiz questions.
  - **Data Management**: Stores and retrieves lessons, quizzes, and user profiles.

### 3. **Video Generator (`VideoGenerator`)**
- **Role**: A specialized AI pipeline for creating scientific visualizations.
- **Tech Stack**: Python, Manim (Mathematical Animation Engine), LLMs.
- **Key Functions**:
  - **Content Pipeline**: Converts a scientific topic into a structured pedagogical script.
  - **Code Generation**: Transforms the script into executable Manim Python code.
  - **Rendering**: Produces high-quality MP4 animations of complex scientific concepts.

---

## 📂 Folder Architecture

```text
sahayak_Final_Project/
├── sahayak-ai-educator/       # Frontend Application (React + Vite)
│   ├── src/
│   │   ├── components/        # UI Components (Dashboard, Forms, Layouts)
│   │   ├── pages/             # Application Pages (Login, Dashboard, GenerateLesson)
│   │   ├── services/           # API communication layer
│   │   └── context/            # Global state management (Auth)
│   └── public/                # Static assets
│
├── sahayak-backend/           # Backend Server (Node.js + Express)
│   ├── controllers/           # Business logic (Auth, Lesson, Quiz)
│   ├── models/                # MongoDB Schemas (Teacher, Lesson, Quiz)
│   ├── routes/                # API Endpoints
│   ├── middleware/            # Auth & Validation middleware
│   └── utils/                 # AI Clients (Gemini, OpenAI)
│
└── VideoGenerator/            # AI Video Tool (Python + Manim)
    ├── app.py                 # Main application entry
    ├── script_generator.py    # AI-powered script creation
    ├── manim_code_generator.py # AI-powered Manim code generation
    ├── animation_creator.py   # Rendering logic
    └── media/                 # Generated videos and assets
```

---

## 🚀 Getting Started

### 🛠️ Prerequisites
- **Node.js** (v18+)
- **Python** (3.8+)
- **MongoDB** (Atlas or Local)
- **API Keys**: Gemini AI or OpenAI API keys.

### 1. Backend Setup
```bash
cd sahayak-backend
npm install
# Create .env with MONGO_URI, JWT_SECRET, GEMINI_API_KEY/OPENAI_API_KEY
npm run dev
```

### 2. Frontend Setup
```bash
cd sahayak-ai-educator
npm install
npm run dev
```

### 3. Video Generator Setup
```bash
cd VideoGenerator
pip install -r requirements.txt
# Ensure Manim and LaTeX are installed on your system
python app.py
```

---

## 🌟 Key Features
- **AI Lesson Generation**: Instantly create structured, curriculum-aligned lessons.
- **Automated Quiz Creation**: Generate challenging quizzes with AI-powered questions and answers.
- **Scientific Animations**: Convert complex physics, chemistry, and biology concepts into professional videos.
- **Teacher Ecosystem**: A centralized dashboard to organize, manage, and share educational content.

## 📜 License
This project is developed for educational purposes.

