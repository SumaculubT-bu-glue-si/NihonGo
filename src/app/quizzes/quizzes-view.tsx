
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookText, SpellCheck, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useGlobalState } from '@/hooks/use-global-state';
import { allQuizzes } from '@/lib/quiz-data';
import { Progress } from '@/components/ui/progress';
import { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';

const quizCategories = [
  {
    name: 'Vocabulary',
    description: 'Test your knowledge of Japanese words and their meanings.',
    icon: <SpellCheck className="h-8 w-8 text-primary" />,
    type: 'vocabulary' as const,
  },
  {
    name: 'Grammar',
    description: 'Challenge your understanding of Japanese grammar patterns.',
    icon: <BookText className="h-8 w-8 text-primary" />,
    type: 'grammar' as const,
  },
];

const levels: ('N5' | 'N4' | 'N3' | 'N2' | 'N1')[] = ['N5', 'N4', 'N3', 'N2', 'N1'];
const quizzesPerLevel = 1;

export function QuizzesView() {
  const { appData } = useGlobalState();
  
  const getHighestScore = (quizId: string) => {
    const score = appData.quizScores.find(s => s.quizId === quizId);
    return score ? score.highestScore : null;
  }

  const { totalQuizzes, completedQuizzes, overallProgress } = useMemo(() => {
    let total = 0;
    let completed = 0;

    for (const category of quizCategories) {
      for (const level of levels) {
        const quizzesForLevel = allQuizzes[category.type]?.[level] ?? [];
        total += quizzesForLevel.length;
        for (const quiz of quizzesForLevel) {
          if (appData.quizScores.some(score => score.quizId === quiz.id)) {
            completed++;
          }
        }
      }
    }

    const progress = total > 0 ? (completed / total) * 100 : 0;
    return {
      totalQuizzes: total,
      completedQuizzes: completed,
      overallProgress: progress,
    };
  }, [appData.quizScores]);

  return (
    <div className="space-y-8">
        <Card>
            <CardHeader>
                <CardTitle>Quiz Completion</CardTitle>
                <CardDescription>
                    You have completed {completedQuizzes} of {totalQuizzes} quizzes.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Progress value={overallProgress} />
            </CardContent>
        </Card>

      {quizCategories.map((category) => (
        <Card key={category.name}>
            <CardHeader>
                <div className="flex items-center gap-4">
                    {category.icon}
                    <div>
                        <CardTitle className="text-2xl font-bold font-headline">{category.name}</CardTitle>
                        <CardDescription>{category.description}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    {levels.map(level => {
                        const quizzesForLevel = allQuizzes[category.type]?.[level];
                        if (!quizzesForLevel) return null;

                        return (
                            <AccordionItem value={level} key={level}>
                                <AccordionTrigger className="text-lg font-semibold">{level}</AccordionTrigger>
                                <AccordionContent>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                                        {Array.from({ length: quizzesPerLevel }).map((_, i) => {
                                          const quizNum = i + 1;
                                          const quiz = quizzesForLevel[i];
                                          if (!quiz) return null;

                                          const highestScore = getHighestScore(quiz.id);
                                          const isCompleted = highestScore !== null;

                                          return (
                                            <Link 
                                                key={quiz.id} 
                                                href={`/quizzes/${category.type}/${level.toLowerCase()}?num=${quizNum}`} 
                                                passHref
                                                className="block"
                                            >
                                                <div className="relative rounded-lg border p-4 hover:bg-accent hover:text-accent-foreground transition-colors h-full flex flex-col justify-center">
                                                    {isCompleted && (
                                                        <Badge variant="secondary" className="absolute top-2 right-2 flex items-center gap-1 bg-green-100 text-green-800">
                                                            <CheckCircle2 className="h-3 w-3" />
                                                            Completed
                                                        </Badge>
                                                    )}
                                                    <p className="font-semibold text-center">{`Quiz #${quizNum}`}</p>
                                                    <p className="text-xs text-muted-foreground text-center mt-1">
                                                        {highestScore !== null ? `Highest: ${highestScore}%` : 'Not taken yet'}
                                                    </p>
                                                </div>
                                            </Link>
                                          )
                                        })}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        )
                    })}
                </Accordion>
            </CardContent>
        </Card>
      ))}
    </div>
  );
}
