import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Sparkles, Video, Share2, RotateCcw, CheckCircle2 } from "lucide-react";

interface Lesson {
  title: string;
  topic: string;
  language: string;
  generatedText: string;
  activities: string[];
  slides: string[];
  videoUrl: string;
}

const GenerateLesson = () => {
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const [lesson, setLesson] = useState<Lesson | null>(null);

  const mockLessonData: Lesson = {
    title: "Photosynthesis",
    topic: "Photosynthesis",
    language: "hi",
    generatedText: "Photosynthesis is the process by which green plants make their food using sunlight, water, and carbon dioxide. This process occurs in the chloroplasts of plant cells and is essential for life on Earth.",
    activities: [
      "Draw the photosynthesis process on paper",
      "Observe how leaves change color in sunlight",
      "Explain photosynthesis in your local language"
    ],
    slides: [
      "What is Photosynthesis?",
      "Process of Photosynthesis",
      "Importance of Photosynthesis"
    ],
    videoUrl: "/videos/photosynthesis_lesson.mp4"
  };

  const handleGenerate = () => {
    if (!topic) {
      toast.error("Please enter a topic");
      return;
    }

    setLoading(true);
    
    // Simulate AI generation
    setTimeout(() => {
      setLesson({ ...mockLessonData, topic, language });
      setLoading(false);
      toast.success("Lesson generated successfully!");
    }, 2000);
  };

  const handleCreateVideo = () => {
    toast.success("Video created successfully!");
  };

  const handleShare = () => {
    toast.success("Lesson shared successfully!");
  };

  const handleReset = () => {
    setLesson(null);
    setTopic("");
    setLanguage("en");
    toast.info("Form reset");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Generate AI Lesson</h2>
        <p className="text-muted-foreground mt-1">
          Create engaging lesson plans powered by AI
        </p>
      </div>

      {/* Input Card */}
      <Card>
        <CardHeader>
          <CardTitle>Lesson Details</CardTitle>
          <CardDescription>Enter the topic and select your preferred language</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Enter Topic</Label>
            <Input
              id="topic"
              placeholder="e.g., Photosynthesis, Solar System, Water Cycle"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="language">Select Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="h-11 bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button 
            onClick={handleGenerate} 
            disabled={loading}
            className="w-full h-11 bg-gradient-to-r from-[hsl(221,83%,60%)] to-[hsl(221,83%,53%)] hover:opacity-90"
          >
            {loading ? (
              <>
                <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                Generating lesson from Gemini AI...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Lesson
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Lesson */}
      {lesson && (
        <div className="space-y-4 animate-in fade-in duration-500">
          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{lesson.title}</CardTitle>
                  <CardDescription className="mt-2">
                    <Badge variant="secondary" className="mr-2">
                      {lesson.language === "en" ? "English" : "Hindi"}
                    </Badge>
                    Topic: {lesson.topic}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Summary */}
              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Summary
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {lesson.generatedText}
                </p>
              </div>

              {/* Activities */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Activities
                </h3>
                <ul className="space-y-2">
                  {lesson.activities.map((activity, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                      <span className="text-muted-foreground">{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Slides */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Lesson Slides
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {lesson.slides.map((slide, index) => (
                    <Card key={index} className="bg-secondary/50 border-primary/10">
                      <CardContent className="p-4">
                        <div className="text-xs text-muted-foreground mb-1">Slide {index + 1}</div>
                        <p className="font-medium text-sm">{slide}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4">
                <Button onClick={handleCreateVideo} className="bg-green-600 hover:bg-green-700">
                  <Video className="mr-2 h-4 w-4" />
                  Create AI Video
                </Button>
                <Button onClick={handleShare} variant="outline">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Lesson
                </Button>
                <Button onClick={handleReset} variant="outline">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default GenerateLesson;
