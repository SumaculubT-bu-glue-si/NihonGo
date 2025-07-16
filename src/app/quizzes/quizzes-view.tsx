
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookText, Headphones, SpellCheck } from 'lucide-react';
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

export function QuizzesView() {
  return (
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
           <Card>
            <CardContent className="p-6">
                <Link href={`/quizzes/${category.type}`} passHref>
                    <Button className="w-full">
                        View {category.name} Quizzes
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </CardContent>
           </Card>
        </div>
      ))}
    </div>
  );
}
