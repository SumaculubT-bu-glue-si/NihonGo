
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Wand2, CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { checkGrammar, type CheckGrammarOutput } from '@/ai/flows/grammar-checker-flow';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export function GrammarCheckerTool() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<CheckGrammarOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCheckGrammar = async () => {
    if (!text.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter some Japanese text to check.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);
    try {
      const response = await checkGrammar({ text });
      setResult(response);
    } catch (error) {
      console.error('Grammar check error:', error);
      toast({
        title: "Analysis Error",
        description: "Could not analyze the provided text. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="ここに日本語のテキストを入力してください (e.g., わたしはがくせいです)"
            className="min-h-[150px] text-lg"
          />
          <Button onClick={handleCheckGrammar} disabled={isLoading} className="mt-4">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Check Grammar
          </Button>
        </CardContent>
      </Card>

      {isLoading && (
         <div className="flex items-center justify-center rounded-lg border bg-card p-8 shadow-sm">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-4 text-muted-foreground">Analyzing your text...</p>
         </div>
      )}

      {result && (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                    {result.isCorrect ? (
                        <CheckCircle className="h-8 w-8 text-green-500" />
                    ) : (
                        <XCircle className="h-8 w-8 text-destructive" />
                    )}
                    <div>
                        <CardTitle>
                            {result.isCorrect ? "Looks Good!" : "Needs Improvement"}
                        </CardTitle>
                        <CardDescription>
                            {result.isCorrect ? "This sentence is grammatically correct. Well done!" : "Here's a corrected version and an explanation."}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <Separator />
                {!result.isCorrect && (
                    <div>
                        <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-2">Correction</h3>
                        <p className="rounded-md bg-secondary p-4 text-lg font-semibold text-primary">{result.correctedText}</p>
                    </div>
                )}
                <div>
                    <h3 className="flex items-center text-sm font-semibold uppercase text-muted-foreground mb-2">
                        <Lightbulb className="mr-2 h-4 w-4" />
                        Explanation
                    </h3>
                    <div className="prose prose-sm max-w-none rounded-md border bg-transparent p-4 text-card-foreground leading-relaxed">
                        <p>{result.explanation}</p>
                    </div>
                </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
