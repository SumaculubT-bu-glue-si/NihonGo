
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookText, Headphones, SpellCheck } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useGlobalState } from '@/hooks/use-global-state';
import { allQuizzes } from '@/lib/quiz-data';

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
  {
    name: 'Listening',
    description: 'Assess your listening comprehension skills with audio-based questions.',
    icon: <Headphones className="h-8 w-8 text-primary" />,
    type: 'listening' as const,
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

  return (
    <div className="space-y-8">
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
                    {levels.map(level => (
                        <AccordionItem value={level} key={level}>
                            <AccordionTrigger className="text-lg font-semibold">{level}</AccordionTrigger>
                            <AccordionContent>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                                    {allQuizzes[category.type][level]?.map((quiz, i) => {
                                      const quizNum = i + 1;
                                      const highestScore = getHighestScore(quiz.id);
                                      return (
                                        <Link 
                                            key={quiz.id} 
                                            href={`/quizzes/${category.type}/${level.toLowerCase()}?num=${quizNum}`} 
                                            passHref
                                            className="block"
                                        >
                                            <div className="rounded-lg border p-4 hover:bg-accent hover:text-accent-foreground transition-colors">
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
                    ))}
                </Accordion>
            </CardContent>
        </Card>
      ))}
    </div>
  );
}
