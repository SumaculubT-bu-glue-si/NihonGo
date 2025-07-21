
'use client';

import { useState, useEffect } from 'react';
import type { GrammarLesson } from '@/lib/data';
import { useGlobalState } from '@/hooks/use-global-state';
import Link from 'next/link';
import { GrammarCheckerTool } from './checker-view';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, BookOpen, ArrowRight, Star } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';


type LevelFilter = 'All' | 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
type StatusFilter = 'all' | 'completed' | 'incomplete';
type CategoryFilter = LevelFilter | 'Favorites';

const levelColors: { [key in LevelFilter]?: string } = {
  N5: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  N4: 'bg-green-100 text-green-800 hover:bg-green-200',
  N3: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  N2: 'bg-orange-100 text-orange-800 hover:bg-orange-200',
  N1: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
};

const LessonItem = ({ lesson, isFavorite, onToggleFavorite }: { lesson: GrammarLesson, isFavorite: boolean, onToggleFavorite: (id: string) => void }) => (
  <div className="flex items-center justify-between p-3 border-b last:border-b-0 hover:bg-muted/50 cursor-pointer group">
      <Link href={`/grammar-lessons/${lesson.id}`} passHref className="flex-grow">
        <div className="flex items-center gap-4">
          {lesson.read ? (
              <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
          ) : (
              <BookOpen className="h-5 w-5 text-muted-foreground shrink-0" />
          )}
          <div className="flex-grow">
            <p className="font-semibold">{lesson.title}</p>
          </div>
        </div>
      </Link>
      <div className="flex items-center gap-2">
         <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(lesson.id); }}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
            <Star
                className={`h-5 w-5 transition-colors ${
                isFavorite
                    ? 'fill-yellow-400 text-yellow-500'
                    : 'text-muted-foreground/50 group-hover:text-muted-foreground'
                }`}
            />
        </Button>
         <Badge className={cn(levelColors[lesson.level as LevelFilter] ?? 'bg-gray-100 text-gray-800', 'border-transparent')}>
            {lesson.level}
          </Badge>
          <Link href={`/grammar-lessons/${lesson.id}`} passHref>
            <Button size="sm" variant="ghost">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
      </div>
  </div>
);

const LessonCard = ({ lesson, isFavorite, onToggleFavorite }: { lesson: GrammarLesson, isFavorite: boolean, onToggleFavorite: (id: string) => void }) => (
    <Card className="flex flex-col hover:shadow-lg transition-shadow">
        <CardHeader>
            <div className="flex justify-between items-start">
                <Badge className={cn(levelColors[lesson.level as LevelFilter] ?? 'bg-gray-100 text-gray-800', 'border-transparent')}>
                    {lesson.level}
                </Badge>
                <div className="flex items-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onToggleFavorite(lesson.id)}
                        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                        <Star
                            className={`h-5 w-5 transition-colors ${
                            isFavorite
                                ? 'fill-yellow-400 text-yellow-500'
                                : 'text-muted-foreground/50 hover:text-muted-foreground'
                            }`}
                        />
                    </Button>
                  {lesson.read ? (
                      <div className="flex items-center gap-1 text-xs text-green-600">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Completed</span>
                      </div>
                   ) : (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <BookOpen className="h-4 w-4" />
                          <span>Not Completed</span>
                      </div>
                   )}
                </div>
            </div>
            <CardTitle className="pt-2">{lesson.title}</CardTitle>
        </CardHeader>
         <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {lesson.explanation}
          </p>
        </CardContent>
        <CardFooter>
            <Link href={`/grammar-lessons/${lesson.id}`} passHref className="w-full">
                <Button className="w-full">
                    Study Lesson
                </Button>
            </Link>
        </CardFooter>
    </Card>
);

export function GrammarLessonsView() {
  const { appData, isLoading, toggleGrammarLessonFavorite } = useGlobalState();

  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('All');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  
  if (isLoading || !appData) {
    return (
        <div className="flex h-64 w-full items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
    );
  }
  
  const activeVariant = appData.activeVariants.grammar;

  const filteredLessons = appData.grammarLessons
    .filter(lesson => {
      if (categoryFilter === 'All') return true;
      if (categoryFilter === 'Favorites') return appData.favoriteGrammarLessons.includes(lesson.id);
      return lesson.level === categoryFilter;
    })
    .filter(lesson => {
      if (statusFilter === 'all') return true;
      if (statusFilter === 'completed') return lesson.read;
      if (statusFilter === 'incomplete') return !lesson.read;
      return true;
    });

  const categories: CategoryFilter[] = ['All', 'N5', 'N4', 'N3', 'N2', 'N1', 'Favorites'];

  return (
    <div className="container mx-auto space-y-8">
      <div>
        <div className="mb-6">
            <div>
                <h1 className="text-3xl font-bold font-headline">Grammar</h1>
                <p className="text-muted-foreground">
                Explore grammar points, check your sentences, and build your own library.
                </p>
            </div>
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-2xl font-bold font-headline">
            Grammar Checker Tool
          </AccordionTrigger>
          <AccordionContent>
            <GrammarCheckerTool />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div>
         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <h2 className="text-2xl font-bold font-headline">Lessons Library</h2>
        </div>
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <Tabs value={categoryFilter} onValueChange={(v) => setCategoryFilter(v as CategoryFilter)}>
                  <TabsList>
                      {categories.map(level => (
                          <TabsTrigger key={level} value={level}>{level}</TabsTrigger>
                      ))}
                  </TabsList>
              </Tabs>
              <RadioGroup value={statusFilter} onValueChange={(v) => setStatusFilter(v as StatusFilter)} className="flex items-center">
                  <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="r1" />
                      <Label htmlFor="r1">All</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                      <RadioGroupItem value="completed" id="r2" />
                      <Label htmlFor="r2">Completed</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                      <RadioGroupItem value="incomplete" id="r3" />
                      <Label htmlFor="r3">Incomplete</Label>
                  </div>
              </RadioGroup>
            </div>

            <div className={cn(
              "pt-4",
              activeVariant === 'A' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-0"
            )}>
               {filteredLessons.length > 0 ? (
                  activeVariant === 'A' ? (
                      filteredLessons.map(lesson => (
                          <LessonCard 
                              key={lesson.id} 
                              lesson={lesson} 
                              isFavorite={appData.favoriteGrammarLessons.includes(lesson.id)}
                              onToggleFavorite={toggleGrammarLessonFavorite}
                          />
                      ))
                  ) : (
                      <Card><CardContent className="p-0">
                          {filteredLessons.map(lesson => (
                              <LessonItem 
                                  key={lesson.id} 
                                  lesson={lesson} 
                                  isFavorite={appData.favoriteGrammarLessons.includes(lesson.id)}
                                  onToggleFavorite={toggleGrammarLessonFavorite}
                              />
                          ))}
                      </CardContent></Card>
                  )
               ) : (
                  <div className="col-span-full text-center text-muted-foreground py-10">
                      <p>No lessons match the current filters.</p>
                  </div>
               )}
            </div>
        </div>
      </div>
    </div>
  );
}
