import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { api } from '@/services/api';
import { toast } from 'sonner';
import Loader from './Loader';
import ResultCard from './ResultCard';

const LocalLessonForm = () => {
  const [topic, setTopic] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleGenerate = async () => {
    if (!topic || !location) {
      toast.error('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const data = await api.generateLocalLesson({ topic, location });
      setResult(data);
      toast.success('Local lesson generated successfully!');
    } catch (error) {
      toast.error('Failed to generate local lesson');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setResult(null);
    setTopic('');
    setLocation('');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Generate Local Lesson
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="local-topic">Topic</Label>
            <Input
              id="local-topic"
              placeholder="e.g., Fractions, Water Cycle"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="e.g., Banaras, Mumbai"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <Button onClick={handleGenerate} className="w-full" disabled={loading}>
            {loading ? 'Generating...' : 'Generate Local Lesson'}
          </Button>
        </CardContent>
      </Card>

      {loading && <Loader message="Generating culturally relevant lesson..." />}
      {result && <ResultCard data={result} onClear={handleClear} type="lesson" />}
    </div>
  );
};

export default LocalLessonForm;
