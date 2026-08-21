# Sahayak Backend

Minimal README for the Sahayak backend server (Node + Express).

## Quick plan
- Install dependencies
- Provide required environment variables
- Start the server
- Run a small local runner to exercise `generateQuiz`

## Requirements
- Node.js 18+ (supports ESM)
- npm
- MongoDB (Atlas URI or local mongod)

## Install
From the project folder (`sahayak-backend`):

```powershell
npm install
```

## Environment
Create a `.env` file in the project root (do NOT commit it). Required variables used by the app:

- PORT (optional, default 5000)
- MONGO_URI (MongoDB connection string)
- OPENAI_API_KEY (if using OpenAI flows)
- GEMINI_API_KEY (if using Gemini flows)
- JWT_SECRET

Example `.env` (do not use these values in public repos):

```properties
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.example.mongodb.net/?retryWrites=true&w=majority
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=...
JWT_SECRET=some-secret
```

Security note: The repository currently contains an `.env` file in the workspace; avoid committing credentials and rotate any leaked keys.

## Start (development)
Start the server from the project folder:

```powershell
npm run dev   # uses nodemon
# or
npm start
```

The server entrypoint is `server.js` and will listen on the `PORT` in `.env` (default 5000).

## Run the test runner (local, safe)
A small runner that stubs external APIs exists at `scripts/run-quiz-controller.js`. It runs the `generateQuiz` controller with stubbed Gemini/OpenAI and a fake DB create to demonstrate expected output.

```powershell
node .\scripts\run-quiz-controller.js
```

## API (example)
After starting the server, generate a quiz by POSTing to the quiz endpoint (replace token and host/port as needed):

PowerShell example:

```powershell
$token = '<your-jwt>'
$body = @{ topic = 'Photosynthesis' } | ConvertTo-Json
Invoke-RestMethod -Uri 'http://localhost:5000/api/quiz/generate' -Method Post -ContentType 'application/json' -Headers @{ Authorization = "Bearer $token" } -Body $body
```

Or using curl:

```bash
curl -X POST http://localhost:5000/api/quiz/generate \
  -H "Authorization: Bearer <your-jwt>" \
  -H "Content-Type: application/json" \
  -d '{"topic":"Photosynthesis"}'
```

## Notes & Troubleshooting
- If you see errors contacting MongoDB, verify `MONGO_URI` and network access. For local development you can run `mongod` or use MongoDB Atlas.
- If AI generation fails, ensure `GEMINI_API_KEY` or `OPENAI_API_KEY` is set and has billing/permissions enabled.
- The `controllers/quizController.js` contains defensive logic to handle different Gemini SDK shapes and will return a 502 when AI generation fails.

## Suggested next steps
- Add unit tests (Jest) for the controller parsing behavior.
- Move secrets into a secure vault for production.
- Add database migration/seed scripts if needed.

If you want, I can:
- Start the server here and debug any runtime errors.
- Add a Jest test for `generateQuiz` parsing/fallbacks.
- Remove or rotate secrets from the `.env` file.

