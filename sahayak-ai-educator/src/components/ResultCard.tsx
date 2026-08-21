import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Download, X, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

interface ResultCardProps {
  data: any;
  onClear: () => void;
  type: 'lesson' | 'quiz';
}

const ResultCard = ({ data, onClear, type }: ResultCardProps) => {
  const handleCopy = () => {
    const text = type === 'lesson' ? data.content : JSON.stringify(data.questions, null, 2);
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const handleDownload = () => {
    const text = type === 'lesson' ? data.content : JSON.stringify(data.questions, null, 2);
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.topic}-${type}.txt`;
    a.click();
    toast.success('Downloaded successfully!');
  };

  return (
    <Card className="animate-in fade-in-50 duration-500">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl">{data.topic}</CardTitle>
          <Badge className="mt-2">{type === 'lesson' ? 'Lesson Plan' : 'Quiz'}</Badge>
        </div>
        <Button variant="ghost" size="icon" onClick={onClear}>
          <X className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {type === 'lesson' ? (
          <div className="prose prose-sm max-w-none">
            <div className="whitespace-pre-wrap text-foreground bg-muted p-4 rounded-lg">
              {data.content}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {data.questions?.map((q: any, idx: number) => (
              <Card key={idx} className="border-2">
                <CardContent className="pt-6 space-y-3">
                  <p className="font-semibold text-foreground">
                    Q{idx + 1}. {q.question}
                  </p>
                  <div className="grid gap-2">
                    {q.options?.map((option: string, optIdx: number) => (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-lg border-2 transition-colors ${
                          option === q.answer
                            ? 'bg-green-50 border-green-500 dark:bg-green-950'
                            : 'bg-card'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {option === q.answer && (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          )}
                          <span>{option}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="flex gap-2 pt-4">
          <Button onClick={handleCopy} variant="outline" className="flex-1 gap-2">
            <Copy className="h-4 w-4" />
            Copy
          </Button>
          <Button onClick={handleDownload} variant="outline" className="flex-1 gap-2">
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
