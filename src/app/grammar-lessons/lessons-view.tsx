
'use client';

import { useState, useMemo } from 'react';
import type { GrammarLesson } from '@/lib/data';
import { useGlobalState } from '@/hooks/use-global-state';
import Link from 'next/link';
import { GrammarCheckerTool } from './checker-view';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, BookOpen, PlusCircle, MoreVertical, Edit, Trash2, Wand2, ArrowRight } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { LessonForm, type LessonFormData } from './lesson-form';
import { GenerateLessonForm } from './generate-lesson-form';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';


type LevelFilter = 'All' | 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
type StatusFilter = 'all' | 'completed' | 'incomplete';

const LessonItem = ({ lesson, onEdit, onDelete }: {
  lesson: GrammarLesson;
  onEdit: (lesson: GrammarLesson) => void;
  onDelete: (lesson: GrammarLesson) => void;
}) => (
  <div className="flex items-center justify-between p-3 border-b last:border-b-0">
      <div className="flex items-center gap-4">
        {lesson.read ? (
            <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
        ) : (
            <BookOpen className="h-5 w-5 text-muted-foreground shrink-0" />
        )}
        <div className="flex-grow">
          <p className="font-semibold">{lesson.title}</p>
          <p className="text-xs text-muted-foreground">{lesson.level}</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Link href={`/grammar-lessons/${lesson.id}`} passHref>
          <Button size="sm" variant="outline">
            Study <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(lesson)}>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                 <DropdownMenuItem
                    onClick={() => onDelete(lesson)}
                    className="text-destructive focus:text-destructive"
                >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </div>
  </div>
);

const LessonCard = ({ lesson, onEdit, onDelete }: {
  lesson: GrammarLesson;
  onEdit: (lesson: GrammarLesson) => void;
  onDelete: (lesson: GrammarLesson) => void;
}) => (
    <Card className="flex flex-col">
        <CardHeader>
            <div className="flex justify-between items-start">
                <Badge variant="outline">{lesson.level}</Badge>
                <div className="flex items-center">
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
                   <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 -mr-2">
                              <MoreVertical className="h-4 w-4" />
                          </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onEdit(lesson)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Lesson
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                           <DropdownMenuItem
                              onClick={() => onDelete(lesson)}
                              className="text-destructive focus:text-destructive"
                          >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Lesson
                          </DropdownMenuItem>
                      </DropdownMenuContent>
                  </DropdownMenu>
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
  const { appData, isLoading, addGrammarLesson, updateGrammarLesson, deleteGrammarLesson } = useGlobalState();
  const { toast } = useToast();

  const [levelFilter, setLevelFilter] = useState<LevelFilter>('All');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [lessonToEdit, setLessonToEdit] = useState<GrammarLesson | null>(null);
  const [lessonToDelete, setLessonToDelete] = useState<GrammarLesson | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isGenerateFormOpen, setIsGenerateFormOpen] = useState(false);
  
  if (isLoading || !appData) {
    return (
        <div className="flex h-64 w-full items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
    );
  }
  
  const activeVariant = appData.activeVariants.grammar;

  const filteredLessons = appData.grammarLessons
    .filter(lesson => levelFilter === 'All' || lesson.level === levelFilter)
    .filter(lesson => {
      if (statusFilter === 'all') return true;
      if (statusFilter === 'completed') return lesson.read;
      if (statusFilter === 'incomplete') return !lesson.read;
      return true;
    });

  const handleAddNew = () => {
    setLessonToEdit(null);
    setIsFormOpen(true);
  };

  const handleGenerateNew = () => {
    setIsGenerateFormOpen(true);
  };

  const handleEdit = (lesson: GrammarLesson) => {
    setLessonToEdit(lesson);
    setIsFormOpen(true);
  };

  const handleDeleteInitiate = (lesson: GrammarLesson) => {
    setLessonToDelete(lesson);
  };

  const handleDeleteConfirm = () => {
    if (!lessonToDelete) return;
    deleteGrammarLesson(lessonToDelete.id);
    toast({
        title: "Lesson Deleted",
        description: "The grammar lesson has been deleted.",
        variant: "destructive",
    });
    setLessonToDelete(null);
  }

  const handleSaveLesson = (data: LessonFormData) => {
    const lessonData = {
        ...data,
        examples: data.examples.split('\n').filter(line => line.trim() !== ''),
    }

    if (lessonToEdit) {
      updateGrammarLesson(lessonToEdit.id, lessonData);
      toast({
        title: 'Lesson Updated',
        description: 'The grammar lesson has been successfully updated.',
      });
    } else {
      addGrammarLesson(lessonData);
       toast({
        title: 'Lesson Created',
        description: 'A new grammar lesson has been added.',
      });
    }
    setIsFormOpen(false);
    setLessonToEdit(null);
  };

  const handleLessonGenerated = (lessonData: Omit<GrammarLesson, 'id' | 'read'>) => {
    addGrammarLesson(lessonData);
  }

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
          <AccordionTrigger className="text-xl font-semibold">
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
            <div className="flex items-center gap-2 mt-4 sm:mt-0">
                <Button onClick={handleGenerateNew} variant="outline">
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate with AI
                </Button>
                <Button onClick={handleAddNew}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Lesson
                </Button>
            </div>
        </div>
        <div className="space-y-4">
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
                              onEdit={handleEdit} 
                              onDelete={handleDeleteInitiate} 
                          />
                      ))
                  ) : (
                      <Card><CardContent className="p-0">
                          {filteredLessons.map(lesson => (
                              <LessonItem 
                                  key={lesson.id} 
                                  lesson={lesson} 
                                  onEdit={handleEdit} 
                                  onDelete={handleDeleteInitiate} 
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
      
      <LessonForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSave={handleSaveLesson}
        lesson={lessonToEdit}
       />
       
       <GenerateLessonForm
        isOpen={isGenerateFormOpen}
        onOpenChange={setIsGenerateFormOpen}
        onLessonGenerated={handleLessonGenerated}
       />

       <AlertDialog open={!!lessonToDelete} onOpenChange={() => setLessonToDelete(null)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete the lesson "{lessonToDelete?.title}".
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setLessonToDelete(null)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
  );
}
