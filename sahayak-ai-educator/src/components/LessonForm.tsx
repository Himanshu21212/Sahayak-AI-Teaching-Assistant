import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import { api } from '@/services/api';
import { toast } from 'sonner';
import Loader from './Loader';
import ResultCard from './ResultCard';

const LessonForm = () => {
  const [topic, setTopic] = useState('');
  const [grade, setGrade] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleGenerate = async () => {
    if (!topic || !grade) {
      toast.error('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const data = await api.generateLesson({ topic, grade });
      setResult(data);
      toast.success('Lesson plan generated successfully!');
    } catch (error) {
      toast.error('Failed to generate lesson');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setResult(null);
    setTopic('');
    setGrade('');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Generate Lesson Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Topic</Label>
            <Input
              id="topic"
              placeholder="e.g., Decimals, Photosynthesis"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="grade">Grade</Label>
            <Select value={grade} onValueChange={setGrade}>
              <SelectTrigger>
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((g) => (
                  <SelectItem key={g} value={String(g)}>
                    Grade {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleGenerate} className="w-full" disabled={loading}>
            {loading ? 'Generating...' : 'Generate Lesson Plan'}
          </Button>
        </CardContent>
      </Card>

      {loading && <Loader message="Generating lesson plan..." />}
      {result && <ResultCard data={result} onClear={handleClear} type="lesson" />}
    </div>
  );
};

export default LessonForm;
