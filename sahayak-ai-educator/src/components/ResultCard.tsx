import { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Download, X, CheckCircle2, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import './material.css';
import { downloadMaterial } from '@/lib/materialExport';

function Markdown({ content }: { content: string }) {
  const normalized = String(content ?? '')
    .replace(/\\\[([\s\S]*?)\\\]/g, (_, math) => '$$\n' + math + '\n$$')
    .replace(/\\\(([\s\S]*?)\\\)/g, (_, math) => '$' + math + '$');

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkBreaks, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      skipHtml
      components={{ img: () => null }}
    >
      {normalized}
    </ReactMarkdown>
  );
}

interface ResultCardProps {
  data: any;
  onClear: () => void;
  type: 'lesson' | 'quiz';
}

export default function ResultCard({
  data,
  onClear,
  type
}: ResultCardProps) {
  const report = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        report.current?.innerText || ''
      );
      toast.success('Copied to clipboard!');
    } catch {
      toast.error('Could not copy.');
    }
  };

  const handleDownload = async (format: 'pdf' | 'docx') => {
    if (!report.current) return;

    setBusy(true);

    try {
      await downloadMaterial(
        report.current,
        `${data.topic}-${type}`,
        format
      );
      toast.success('Downloaded successfully!');
    } catch {
      toast.error('Could not download. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card className="animate-in fade-in-50 duration-500">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl capitalize">
            {data.topic}
          </CardTitle>
          <Badge className="mt-2">
            {type === 'lesson' ? 'Lesson Plan' : 'Quiz'}
          </Badge>
        </div>

        <Button variant="ghost" size="icon" onClick={onClear}>
          <X className="h-5 w-5" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        <div ref={report} data-title={data.topic}>
          {type === 'lesson' ? (
            <div className="lesson-markdown rounded-xl border bg-card p-5 sm:p-8">
              <Markdown content={data.content} />
            </div>
          ) : (
            <div className="space-y-4">
              {data.questions?.map((q: any, i: number) => (
                <Card key={i} className="border-2">
                  <CardContent className="pt-6 space-y-3">
                    <div className="font-semibold lesson-markdown quiz-markdown">
                      <Markdown content={`Q${i + 1}. ${q.question}`} />
                    </div>

                    <div className="grid gap-2">
                      {q.options?.map((option: string, j: number) => (
                        <div
                          key={j}
                          className={`p-3 rounded-lg border-2 ${
                            option === q.answer
                              ? 'bg-green-50 border-green-500'
                              : 'bg-card'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {option === q.answer && (
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            )}

                            <div className="lesson-markdown quiz-markdown">
                              <Markdown
                                content={`${String.fromCharCode(65 + j)}. ${option}${
                                  option === q.answer ? ' — Correct answer' : ''
                                }`}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-4">
          <Button
            onClick={handleCopy}
            variant="outline"
            className="flex-1 gap-2"
          >
            <Copy className="h-4 w-4" />
            Copy
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                disabled={busy}
                variant="outline"
                className="flex-1 gap-2"
              >
                <Download className="h-4 w-4" />
                {busy ? 'Preparing...' : 'Download'}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onSelect={() => handleDownload('pdf')}
              >
                PDF document (.pdf)
              </DropdownMenuItem>

              <DropdownMenuItem
                onSelect={() => handleDownload('docx')}
              >
                Word document (.docx)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}
