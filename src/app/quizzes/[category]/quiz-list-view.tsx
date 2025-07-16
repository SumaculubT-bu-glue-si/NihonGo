
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface QuizListViewProps {
    category: 'vocabulary' | 'grammar' | 'listening';
}

const levels: ('N5' | 'N4' | 'N3' | 'N2' | 'N1')[] = ['N5', 'N4', 'N3', 'N2', 'N1'];
const quizzesPerLevel = 3;

const categoryNames = {
    vocabulary: 'Vocabulary',
    grammar: 'Grammar',
    listening: 'Listening',
}

export function QuizListView({ category }: QuizListViewProps) {
  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <Link href="/quizzes" className="text-sm text-primary hover:underline">
          &larr; Back to Quiz Categories
        </Link>
        <h1 className="mt-2 text-3xl font-bold font-headline">{categoryNames[category]} Quizzes</h1>
        <p className="text-muted-foreground">
          Select a level to see available quizzes.
        </p>
      </div>

      <div className="space-y-8">
        {levels.map((level) => (
          <div key={level}>
            <h2 className="mb-4 text-2xl font-bold font-headline">{level}</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {Array.from({ length: quizzesPerLevel }, (_, i) => i + 1).map((quizNum) => (
                <Card key={`${category}-${level}-${quizNum}`} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>
                      {categoryNames[category]} Quiz #{quizNum}
                    </CardTitle>
                     <CardDescription>
                        Level: {level}
                     </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <Link href={`/quizzes/${category}/${level.toLowerCase()}?num=${quizNum}`} passHref>
                        <Button className="w-full">
                            Start Quiz
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
