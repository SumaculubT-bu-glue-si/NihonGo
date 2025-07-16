
'use client';

import { useState, useMemo } from 'react';
import type { GrammarLesson } from '@/lib/data';
import { useGlobalState } from '@/hooks/use-global-state';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { GrammarCheckerTool } from './checker-view';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, BookOpenCheck } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

type LevelFilter = 'All' | 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
type StatusFilter = 'all' | 'read' | 'unread';


export function GrammarLessonsView() {
  const { appData, isLoading, toggleGrammarLessonRead } = useGlobalState();
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('All');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [expandedLesson, setExpandedLesson] = useState<string | undefined>();

  const filteredLessons = useMemo(() => {
    return appData.grammarLessons
      .filter(lesson => levelFilter === 'All' || lesson.level === levelFilter)
      .filter(lesson => {
        if (statusFilter === 'all') return true;
        if (statusFilter === 'read') return lesson.read;
        if (statusFilter === 'unread') return !lesson.read;
        return true;
      });
  }, [appData.grammarLessons, levelFilter, statusFilter]);

  const handleMarkAsRead = (lessonId: string, isRead: boolean) => {
    toggleGrammarLessonRead(lessonId, isRead);
  };
  
  if (isLoading) {
    return (
        <div className="flex h-64 w-full items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
    );
  }

  return (
    <div className="container mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Grammar Lessons</h1>
        <p className="text-muted-foreground">
          Explore grammar points and check your own sentences.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl font-semibold">
            Grammar Checker Tool
          </AccordionTrigger>
          <AccordionContent>
            <GrammarCheckerTool />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">Lessons Library</h2>
        <Card>
          <CardContent className="p-4 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <Tabs value={levelFilter} onValueChange={(v) => setLevelFilter(v as LevelFilter)}>
                    <TabsList>
                        {(['All', 'N5', 'N4', 'N3', 'N2', 'N1'] as LevelFilter[]).map(level => (
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
                        <RadioGroupItem value="read" id="r2" />
                        <Label htmlFor="r2">Read</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="unread" id="r3" />
                        <Label htmlFor="r3">Unread</Label>
                    </div>
                </RadioGroup>
              </div>

              <div className="space-y-2 pt-4">
                 {filteredLessons.length > 0 ? (
                    <Accordion type="single" collapsible value={expandedLesson} onValueChange={setExpandedLesson}>
                        {filteredLessons.map(lesson => (
                            <AccordionItem value={lesson.id} key={lesson.id}>
                                <AccordionTrigger>
                                    <div className="flex items-center justify-between w-full pr-4">
                                        <div className="flex items-center gap-4">
                                            {lesson.read ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <BookOpenCheck className="h-5 w-5 text-muted-foreground" />}
                                            <span className="text-left">{lesson.title}</span>
                                        </div>
                                        <Badge variant="outline">{lesson.level}</Badge>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="prose prose-sm max-w-none p-4 rounded-b-md border-t bg-secondary/50">
                                    <p>{lesson.explanation}</p>
                                    <h4 className="font-semibold">Examples:</h4>
                                    <ul>
                                        {lesson.examples.map((ex, i) => <li key={i}>{ex}</li>)}
                                    </ul>
                                    <Button
                                        size="sm"
                                        variant={lesson.read ? 'secondary' : 'default'}
                                        onClick={() => handleMarkAsRead(lesson.id, !lesson.read)}
                                        className="mt-4"
                                    >
                                        {lesson.read ? 'Mark as Unread' : 'Mark as Read'}
                                    </Button>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                 ) : (
                    <div className="text-center text-muted-foreground py-10">
                        <p>No lessons match the current filters.</p>
                    </div>
                 )}
              </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

