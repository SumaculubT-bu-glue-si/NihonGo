
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
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, BookOpenCheck, Eye, Lightbulb, PlusCircle, MoreVertical, Edit, Trash2, Wand2 } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog';
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


type LevelFilter = 'All' | 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
type StatusFilter = 'all' | 'read' | 'unread';


export function GrammarLessonsView() {
  const { appData, isLoading, toggleGrammarLessonRead, addGrammarLesson, updateGrammarLesson, deleteGrammarLesson } = useGlobalState();
  const { toast } = useToast();

  const [levelFilter, setLevelFilter] = useState<LevelFilter>('All');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [selectedLesson, setSelectedLesson] = useState<GrammarLesson | null>(null);
  const [lessonToEdit, setLessonToEdit] = useState<GrammarLesson | null>(null);
  const [lessonToDelete, setLessonToDelete] = useState<GrammarLesson | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isGenerateFormOpen, setIsGenerateFormOpen] = useState(false);


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
    setSelectedLesson(prev => prev ? { ...prev, read: isRead } : null);
  };
  
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
            <div>
                <h1 className="text-3xl font-bold font-headline">Grammar</h1>
                <p className="text-muted-foreground">
                Explore grammar points, check your sentences, and build your own library.
                </p>
            </div>
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
                      <RadioGroupItem value="read" id="r2" />
                      <Label htmlFor="r2">Read</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                      <RadioGroupItem value="unread" id="r3" />
                      <Label htmlFor="r3">Unread</Label>
                  </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
               {filteredLessons.length > 0 ? (
                  filteredLessons.map(lesson => (
                      <Card key={lesson.id} className="flex flex-col">
                          <CardHeader>
                              <div className="flex justify-between items-start">
                                  <Badge variant="outline">{lesson.level}</Badge>
                                  <div className="flex items-center">
                                    {lesson.read ? (
                                        <div className="flex items-center gap-1 text-xs text-green-600">
                                            <CheckCircle2 className="h-4 w-4" />
                                            <span>Read</span>
                                        </div>
                                     ) : (
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <BookOpenCheck className="h-4 w-4" />
                                            <span>Unread</span>
                                        </div>
                                     )}
                                     <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-6 w-6 -mr-2">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => handleEdit(lesson)}>
                                                <Edit className="mr-2 h-4 w-4" />
                                                Edit Lesson
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                             <DropdownMenuItem
                                                onClick={() => handleDeleteInitiate(lesson)}
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
                              <Button className="w-full" variant="outline" onClick={() => setSelectedLesson(lesson)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Lesson
                              </Button>
                          </CardFooter>
                      </Card>
                  ))
               ) : (
                  <div className="col-span-full text-center text-muted-foreground py-10">
                      <p>No lessons match the current filters.</p>
                  </div>
               )}
            </div>
        </div>
      </div>

       {selectedLesson && (
        <Dialog open={!!selectedLesson} onOpenChange={() => setSelectedLesson(null)}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
                <div className="flex items-center justify-between">
                    <DialogTitle className="text-2xl font-headline">{selectedLesson.title}</DialogTitle>
                    <Badge variant="secondary">{selectedLesson.level}</Badge>
                </div>
            </DialogHeader>
            <div className="space-y-6 py-4 max-h-[60vh] overflow-y-auto pr-6">
                <div>
                    <h3 className="flex items-center text-sm font-semibold uppercase text-muted-foreground mb-2">
                        <Lightbulb className="mr-2 h-4 w-4" />
                        Explanation
                    </h3>
                    <div className="prose prose-sm max-w-none space-y-4 rounded-md border bg-secondary/50 p-4 text-card-foreground leading-relaxed">
                        {selectedLesson.explanation.split('\n').map((paragraph, index) => (
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
                            {selectedLesson.examples.map((ex, i) => (
                            <li key={i}>{ex}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <DialogFooter className="flex-col-reverse gap-2 sm:flex-row sm:justify-between sm:items-center border-t pt-4">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                    Status: 
                     {selectedLesson.read ? (
                        <span className="flex items-center gap-1 text-green-600 font-medium">
                            <CheckCircle2 className="h-4 w-4" /> Read
                        </span>
                     ) : (
                        <span className="flex items-center gap-1 font-medium">
                           <BookOpenCheck className="h-4 w-4" /> Unread
                        </span>
                     )}
                </p>
                <div className="flex gap-2">
                     <Button
                        size="sm"
                        variant={selectedLesson.read ? 'secondary' : 'default'}
                        onClick={() => handleMarkAsRead(selectedLesson.id, !selectedLesson.read)}
                    >
                        {selectedLesson.read ? 'Mark as Unread' : 'Mark as Read'}
                    </Button>
                    <DialogClose asChild>
                        <Button type="button" variant="outline" size="sm">
                            Close
                        </Button>
                    </DialogClose>
                </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

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
                        This action cannot be undone. This will permanently delete the lesson "{lessonToDelete?.title}".
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
