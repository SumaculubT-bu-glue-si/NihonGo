
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookText, Headphones, SpellCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

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

export function QuizzesView() {
  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold font-headline">Quizzes</h1>
        <p className="text-muted-foreground">
          Test your knowledge across different skills and levels.
        </p>
      </div>

      <div className="space-y-12">
        {quizCategories.map((category) => (
          <div key={category.name}>
            <div className="mb-4 flex items-center gap-4">
              {category.icon}
              <div>
                 <h2 className="text-2xl font-bold font-headline">{category.name}</h2>
                 <p className="text-muted-foreground">{category.description}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {levels.map((level) => (
                <Card key={`${category.name}-${level}`} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>
                      {level} Quiz
                    </CardTitle>
                     <CardDescription>
                        {category.name}
                     </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <Link href={`/quizzes/${category.type}/${level.toLowerCase()}`} passHref>
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
