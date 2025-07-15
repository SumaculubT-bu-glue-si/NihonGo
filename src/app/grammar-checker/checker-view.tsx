'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Wand2, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { checkGrammar, type CheckGrammarOutput } from '@/ai/flows/grammar-checker-flow';
import { Badge } from '@/components/ui/badge';

export function GrammarCheckerView() {
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
    <div className="container mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Grammar Checker</h1>
        <p className="text-muted-foreground">
          Type in Japanese text and let our AI check it for you.
        </p>
      </div>
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
            <CardTitle className="flex items-center gap-2">
                Analysis Result
                {result.isCorrect ? (
                    <Badge variant="secondary" className="border-green-600 bg-green-100 text-green-800">Correct</Badge>
                ) : (
                    <Badge variant="destructive">Correction Needed</Badge>
                )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!result.isCorrect && (
                <div>
                    <h3 className="font-semibold text-lg mb-2">Corrected Text:</h3>
                    <p className="rounded-md bg-secondary/50 p-4 text-lg font-semibold text-primary">{result.correctedText}</p>
                </div>
            )}
            <div>
              <h3 className="font-semibold text-lg mb-2">Explanation:</h3>
              <div className="prose prose-sm max-w-none rounded-md border bg-transparent p-4 text-card-foreground">
                <p>{result.explanation}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
