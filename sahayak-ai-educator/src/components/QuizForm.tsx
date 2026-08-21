import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileQuestion, Upload } from "lucide-react";
import { api } from "@/services/api";
import { toast } from "sonner";
import Loader from "./Loader";
import ResultCard from "./ResultCard";

const QuizForm = () => {
  const [topic, setTopic] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      const validTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(selected.type)) {
        toast.error("Only PDF or image (JPG, JPEG, PNG) files are allowed");
        return;
      }
      setFile(selected);
    }
  };

  const handleGenerate = async () => {
    if (!topic && !file) {
      toast.error("Please enter a topic or upload a file");
      return;
    }

    setLoading(true);
    try {
      let data;

      if (file) {
        // 📤 Upload file and generate quiz
        const formData = new FormData();
        formData.append("file", file);

        // If backend supports topic + file both
        if (topic) formData.append("topic", topic);

        data = await api.generateQuizFromFile(formData);
      } else {
        // 🧠 Generate from topic only
        data = await api.generateQuiz({ topic });
      }

      setResult(data);
      toast.success("Quiz generated successfully!");
    } catch (error) {
      toast.error("Failed to generate quiz");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setResult(null);
    setTopic("");
    setFile(null);
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-md border border-border/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-primary">
            <FileQuestion className="h-5 w-5 text-primary" />
            Generate Quiz / Worksheet
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Topic Input */}
          <div className="space-y-2">
            <Label htmlFor="quiz-topic">Topic</Label>
            <Input
              id="quiz-topic"
              placeholder="e.g., Fractions, History of India"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="file-upload">Upload PDF or Image</Label>
            <div className="flex items-center gap-3">
              <Input
                id="file-upload"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
              />
              {file && (
                <span className="text-sm text-muted-foreground truncate max-w-[180px]">
                  {file.name}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button onClick={handleGenerate} className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Upload className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Quiz"
              )}
            </Button>
            {result && (
              <Button variant="outline" onClick={handleClear}>
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Result or Loader */}
      {loading && <Loader message="Generating quiz questions..." />}
      {result && <ResultCard data={result} onClear={handleClear} type="quiz" />}
    </div>
  );
};

export default QuizForm;
