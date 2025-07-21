
'use client';

import { useState, useEffect } from 'react';
import type { GrammarLesson, Quiz as QuizType } from '@/lib/data';
import Link from 'next/link';
import { useGlobalState } from '@/hooks/use-global-state';
import { generateQuiz } from '@/ai/flows/generate-quiz-flow';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, CheckCircle2, BookOpen, Loader2, Wand2, Repeat, ChevronLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { QuizClientPage } from '@/app/quizzes/[quizId]/quiz-client-page';

function LessonContent({ lesson }: { lesson: GrammarLesson }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="flex items-center text-sm font-semibold uppercase text-muted-foreground mb-2">
          <Lightbulb className="mr-2 h-4 w-4" />
          Explanation
        </h3>
        <div className="prose prose-sm max-w-none space-y-4 rounded-md border bg-secondary/50 p-4 text-card-foreground leading-relaxed">
          {lesson.explanation.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
      <div>
        <h3 className="flex items-center text-sm font-semibold uppercase text-muted-foreground mb-2">
          Examples
        </h3>
        <div className="prose prose-sm max-w-none text-card-foreground leading-relaxed">
          <ul className="space-y-2 rounded-md border p-4">
            {lesson.examples.map((ex, i) => (
              <li key={i}>{ex}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function LessonClientPage({ lesson }: { lesson: GrammarLesson }) {
  const { toggleGrammarLessonRead } = useGlobalState();
  const { toast } = useToast();
  const [miniQuiz, setMiniQuiz] = useState<QuizType | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateQuiz = async () => {
    setIsGenerating(true);
    try {
      const result = await generateQuiz({
        category: 'grammar',
        level: lesson.level,
        title: `Mini-Quiz: ${lesson.title}`,
        questionCount: 3,
      });

      // We need to add IDs to the questions client-side as the flow doesn't
      const quizWithIds = {
        ...result,
        id: `temp-quiz-${lesson.id}`,
        questions: result.questions.map(q => ({...q, id: `temp-q-${Math.random()}`}))
      }
      
      setMiniQuiz(quizWithIds);
      toggleGrammarLessonRead(lesson.id, true);

    } catch (error) {
      console.error('Failed to generate mini-quiz:', error);
      toast({
        title: 'Quiz Generation Failed',
        description: 'Could not create a quiz for this lesson. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  if (miniQuiz) {
    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">{`Mini-Quiz: ${lesson.title}`}</h1>
            <QuizClientPage 
                quiz={miniQuiz} 
                onComplete={() => {
                    toast({ title: "Lesson Completed!", description: "Great job on the quiz."});
                }} 
                backLink={{ href: `/grammar-lessons/${lesson.id}`, label: 'Back to Lesson' }}
            />
        </div>
    )
  }

  return (
    <div className="container mx-auto max-w-4xl space-y-8">
      <div>
        <Link href="/grammar-lessons" className="text-sm text-primary hover:underline">
          &larr; Back to Grammar Library
        </Link>
        <div className="flex items-center justify-between mt-2">
            <h1 className="text-3xl font-bold font-headline">{lesson.title}</h1>
            <Badge variant="secondary">{lesson.level}</Badge>
        </div>
        <p className="flex items-center gap-2 text-muted-foreground mt-2">
            Status: 
            {lesson.read ? (
                <span className="flex items-center gap-1 text-green-600 font-medium">
                    <CheckCircle2 className="h-4 w-4" /> Completed
                </span>
            ) : (
                <span className="flex items-center gap-1 font-medium">
                    <BookOpen className="h-4 w-4" /> Not Completed
                </span>
            )}
        </p>
      </div>
      
      <LessonContent lesson={lesson} />

      <Separator />

      <Card className="bg-secondary/50">
        <CardHeader>
          <CardTitle>Check Your Understanding</CardTitle>
          <CardDescription>
            {lesson.read 
              ? "You've already completed this lesson, but you can take the test again to sharpen your memory!"
              : "Complete this lesson by taking a short test!"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleGenerateQuiz} disabled={isGenerating}>
            {isGenerating ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
               <Wand2 className="mr-2 h-4 w-4" />
            )}
            {isGenerating ? 'Generating Test...' : (lesson.read ? 'Retake Test' : 'Take Short Test')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
