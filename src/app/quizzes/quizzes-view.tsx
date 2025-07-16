
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookText, Headphones, SpellCheck, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const quizCategories = [
  {
    name: 'Vocabulary',
    description: 'Test your knowledge of Japanese words and their meanings.',
    icon: <SpellCheck className="h-8 w-8 text-primary" />,
    type: 'vocabulary',
  },
  {
    name: 'Grammar',
    description: 'Challenge your understanding of Japanese grammar patterns.',
    icon: <BookText className="h-8 w-8 text-primary" />,
    type: 'grammar',
  },
  {
    name: 'Listening',
    description: 'Assess your listening comprehension skills with audio-based questions.',
    icon: <Headphones className="h-8 w-8 text-primary" />,
    type: 'listening',
  },
];

const levels: ('N5' | 'N4' | 'N3' | 'N2' | 'N1')[] = ['N5', 'N4', 'N3', 'N2', 'N1'];
const quizzesPerLevel = 1;

export function QuizzesView() {
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
                                    {Array.from({ length: quizzesPerLevel }, (_, i) => i + 1).map((quizNum) => (
                                        <Link 
                                            key={`${category.type}-${level}-${quizNum}`} 
                                            href={`/quizzes/${category.type}/${level.toLowerCase()}?num=${quizNum}`} 
                                            passHref
                                            className="block"
                                        >
                                            <div className="rounded-lg border p-4 text-center hover:bg-accent hover:text-accent-foreground transition-colors">
                                                <p className="font-semibold">Quiz #{quizNum}</p>
                                            </div>
                                        </Link>
                                    ))}
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
