import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Eye, Share2 } from "lucide-react";
import { toast } from "sonner";

interface SharedLesson {
  _id: string;
  title: string;
  topic: string;
  language: string;
  generatedText: string;
  activities: string[];
  slides: string[];
  videoUrl: string;
  shared: boolean;
  teacher?: string;
}

const SharedLessons = () => {
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);

  const mockSharedLessons: SharedLesson[] = [
    {
      _id: "1",
      title: "Photosynthesis",
      topic: "Photosynthesis",
      language: "hi",
      generatedText: "Photosynthesis is the process by which green plants make their food using sunlight.",
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
      videoUrl: "/videos/photosynthesis_lesson.mp4",
      shared: true,
      teacher: "Priya Sharma"
    },
    {
      _id: "2",
      title: "Solar System",
      topic: "Solar System",
      language: "en",
      generatedText: "The Solar System consists of the Sun and the objects that orbit it, including eight planets and their moons.",
      activities: [
        "Create a model of the solar system",
        "Learn the order of planets",
        "Study the characteristics of each planet"
      ],
      slides: [
        "Introduction to Solar System",
        "The Planets",
        "Fun Facts about Space"
      ],
      videoUrl: "/videos/solar_system_lesson.mp4",
      shared: true,
      teacher: "Rajesh Kumar"
    },
    {
      _id: "3",
      title: "Water Cycle",
      topic: "Water Cycle",
      language: "hi",
      generatedText: "The water cycle describes how water moves through Earth's atmosphere, land, and oceans.",
      activities: [
        "Draw the water cycle diagram",
        "Conduct evaporation experiment",
        "Observe rainfall patterns"
      ],
      slides: [
        "What is Water Cycle?",
        "Stages of Water Cycle",
        "Importance of Water"
      ],
      videoUrl: "/videos/water_cycle_lesson.mp4",
      shared: true,
      teacher: "Anita Desai"
    }
  ];

  const handlePlayVideo = (title: string) => {
    toast.success(`Playing video: ${title}`);
  };

  const handleViewDetails = (id: string) => {
    setExpandedLesson(expandedLesson === id ? null : id);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Shared Lessons</h2>
        <p className="text-muted-foreground mt-1">
          Explore lessons shared by teachers in your community
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockSharedLessons.map((lesson) => (
          <Card key={lesson._id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">{lesson.title}</CardTitle>
              <CardDescription>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary">
                    {lesson.language === "en" ? "English" : "Hindi"}
                  </Badge>
                  <span className="text-xs">by {lesson.teacher}</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {lesson.generatedText}
              </p>

              {expandedLesson === lesson._id && (
                <div className="space-y-3 animate-in fade-in duration-300">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Activities:</h4>
                    <ul className="space-y-1">
                      {lesson.activities.map((activity, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                          <span className="mt-1 h-1 w-1 rounded-full bg-primary flex-shrink-0"></span>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Slides:</h4>
                    <div className="flex flex-wrap gap-1">
                      {lesson.slides.map((slide, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {idx + 1}. {slide}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handlePlayVideo(lesson.title)}
                  className="flex-1"
                >
                  <Play className="mr-1 h-3 w-3" />
                  Play
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleViewDetails(lesson._id)}
                  className="flex-1"
                >
                  <Eye className="mr-1 h-3 w-3" />
                  {expandedLesson === lesson._id ? "Hide" : "View"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SharedLessons;
