import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileQuestion } from "lucide-react";
import { api } from "@/services/api";
import { toast } from "sonner";
import Loader from "./Loader";
import ResultCard from "./ResultCard";

const QuizForm = () => {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic");
      return;
    }

    setLoading(true);

    try {
      const data = await api.generateQuiz({ topic });
      setResult(data);
      toast.success("Quiz generated successfully!");
    } catch {
      toast.error("Failed to generate quiz");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setResult(null);
    setTopic("");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileQuestion className="h-5 w-5 text-primary" />
            Generate Quiz / Worksheet
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="quiz-topic">Topic</Label>
            <Input
              id="quiz-topic"
              placeholder="e.g., Fractions, Photosynthesis"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Generating..." : "Generate Quiz"}
          </Button>
        </CardContent>
      </Card>

      {loading && <Loader message="Generating quiz questions..." />}

      {result && (
        <ResultCard
          data={result}
          onClear={handleClear}
          type="quiz"
        />
      )}
    </div>
  );
};

export default QuizForm;
