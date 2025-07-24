

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Wand2, CheckCircle, XCircle, Lightbulb, Trash2, History } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { checkGrammar, type CheckGrammarOutput } from '@/ai/flows/grammar-checker-flow';
import { Separator } from '@/components/ui/separator';
import { PronunciationButton } from '@/components/pronunciation-button';
import { useGlobalState } from '@/hooks/use-global-state';

export function GrammarCheckerTool() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<CheckGrammarOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { appData, addGrammarCheckToHistory, clearGrammarCheckHistory } = useGlobalState();
  const { grammarCheckHistory } = appData;

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
      addGrammarCheckToHistory({ ...response, inputText: text });
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
                    <div className="prose prose-sm max-w-none space-y-2 rounded-md border bg-transparent p-4 text-card-foreground leading-relaxed">
                       {result.explanation.split('\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </div>
                {result.examples && result.examples.length > 0 && (
                  <div>
                    <h3 className="flex items-center text-sm font-semibold uppercase text-muted-foreground mb-2">
                        Examples
                    </h3>
                    <ul className="prose prose-sm max-w-none space-y-2 rounded-md border p-4">
                        {result.examples.map((ex, i) => (
                          <li key={i} className="flex items-center justify-between gap-2">
                              <span className="flex-1">
                                {ex.japanese} <span className="text-muted-foreground">({ex.english})</span>
                              </span>
                              <PronunciationButton text={ex.japanese} size="sm" />
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
          </CardContent>
        </Card>
      )}

      {grammarCheckHistory.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center text-xl font-bold font-headline">
              <History className="mr-2 h-5 w-5" />
              Recent Checks
            </h2>
            <Button variant="outline" size="sm" onClick={clearGrammarCheckHistory}>
              <Trash2 className="mr-2 h-4 w-4" />
              Clear History
            </Button>
          </div>
          <div className="space-y-2">
            {grammarCheckHistory.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {item.isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                    )}
                    <div>
                      <p className="text-sm text-muted-foreground">{item.inputText}</p>
                      {!item.isCorrect && <p className="text-sm font-semibold text-primary">{item.correctedText}</p>}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => { setText(item.inputText); setResult(item); window.scrollTo({top: 0, behavior: 'smooth'}) }}>
                    View
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
