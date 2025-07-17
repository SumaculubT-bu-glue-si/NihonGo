
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookText, SpellCheck, CheckCircle2, MoreVertical, Settings, Trash2, Wand2, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useGlobalState } from '@/hooks/use-global-state';
import { useMemo, useState } from 'react';
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
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import type { Quiz } from '@/lib/data';
import { generateQuiz } from '@/ai/flows/generate-quiz-flow';
import { GenerateQuizForm } from './generate-quiz-form';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';


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

export function QuizzesView() {
  const { appData, addQuiz, deleteQuiz, addGeneratedQuiz } = useGlobalState();
  const { toast } = useToast();
  const router = useRouter();
  const [quizToDelete, setQuizToDelete] = useState<Quiz | null>(null);
  const [isGenerateFormOpen, setIsGenerateFormOpen] = useState(false);
  const [generationContext, setGenerationContext] = useState<{category: 'vocabulary' | 'grammar', level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1'} | null>(null);
  const activeVariant = appData.activeVariants.quizzes;


  const getHighestScore = (quizId: string) => {
    const score = appData.quizScores.find(s => s.quizId === quizId);
    return score ? score.highestScore : null;
  }
  
  const handleAddNew = (category: 'vocabulary' | 'grammar', level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1') => {
    const newQuiz = addQuiz({
      title: `New ${category} Quiz (${level})`,
      category: category,
      level: level,
    });
    toast({
        title: 'Quiz Created',
        description: 'A new empty quiz has been added. Manage it to add questions.'
    });
    router.push(`/quizzes/${newQuiz.id}/manage`);
  };

  const handleGenerateNew = (category: 'vocabulary' | 'grammar', level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1') => {
    setGenerationContext({ category, level });
    setIsGenerateFormOpen(true);
  };
  
  const handleGenerateQuiz = async () => {
    if (!generationContext) return;

    const generatingToast = toast({
      title: 'Generating Quiz...',
      description: 'The AI is creating your new quiz. This might take a moment.',
    });

    const { category, level } = generationContext;
    const existingQuizzes = appData.quizzes.filter(q => q.category === category && q.level === level);
    const newQuizNumber = existingQuizzes.length + 1;
    const newTitle = `${level} ${category.charAt(0).toUpperCase() + category.slice(1)} Quiz #${newQuizNumber}`;
    
    try {
      const result = await generateQuiz({
        category: category,
        level: level,
        title: newTitle,
      });
      addGeneratedQuiz({
        ...result,
        category: category,
        level: level,
      });
      generatingToast.update({
        id: generatingToast.id,
        title: 'Quiz Generated!',
        description: `Successfully created the "${result.title}" quiz.`,
      });
    } catch(e) {
        console.error("Quiz generation failed", e);
        generatingToast.update({
            id: generatingToast.id,
            title: 'Generation Failed',
            description: 'Could not generate the quiz. Please try again.',
            variant: 'destructive',
        });
    } finally {
        setIsGenerateFormOpen(false);
        setGenerationContext(null);
    }
  };


  const groupedQuizzes = useMemo(() => {
    const groups: Record<string, Record<string, Quiz[]>> = {
      vocabulary: {},
      grammar: {},
    };

    appData.quizzes.forEach(quiz => {
      if (!groups[quiz.category][quiz.level]) {
        groups[quiz.category][quiz.level] = [];
      }
      groups[quiz.category][quiz.level].push(quiz);
    });

    return groups;
  }, [appData.quizzes]);
  
  const handleDeleteConfirm = () => {
    if (!quizToDelete) return;
    deleteQuiz(quizToDelete.id);
    toast({
        title: "Quiz Deleted",
        description: "The quiz has been successfully deleted.",
        variant: "destructive",
    });
    setQuizToDelete(null);
  };

  const QuizList = ({ quizzes, level, category }: { quizzes: Quiz[], level: string, category: 'vocabulary' | 'grammar' }) => (
     <div className="space-y-2 pt-2">
       <div className="flex items-center gap-2 mb-4">
            <Button size="sm" onClick={() => handleAddNew(category, level as 'N5')}>
                <PlusCircle className="mr-2 h-4 w-4"/> Add New Quiz
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleGenerateNew(category, level as 'N5')}>
                <Wand2 className="mr-2 h-4 w-4"/> Generate with AI
            </Button>
        </div>
        {quizzes.length > 0 ? (
            quizzes.map((quiz) => {
                const highestScore = getHighestScore(quiz.id);

                return (
                    <div key={quiz.id} className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/50">
                        <div>
                            <Link 
                                href={`/quizzes/${quiz.id}`}
                                className="font-medium hover:underline"
                            >
                                {quiz.title}
                            </Link>
                            <p className="text-xs text-muted-foreground">
                                {highestScore !== null ? `Highest Grade: ${highestScore}%` : 'Not taken yet'}
                                <span className="mx-2">•</span>
                                {quiz.questions.length} questions
                            </p>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <Link href={`/quizzes/${quiz.id}/manage`}>
                                    <DropdownMenuItem>
                                        <Settings className="mr-2 h-4 w-4" />
                                        Manage
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="text-destructive focus:text-destructive"
                                    onSelect={() => setQuizToDelete(quiz)}
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )
            })
        ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
                No quizzes for this level yet. Add one to get started!
            </p>
        )}
    </div>
  );

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
              {activeVariant === 'A' ? (
                <Accordion 
                    type="single" 
                    collapsible 
                    className="w-full"
                    defaultValue={category.type === 'vocabulary' ? 'N5' : undefined}
                >
                    {levels.map(level => {
                        const quizzesForLevel = groupedQuizzes[category.type]?.[level] ?? [];
                        const completedCount = quizzesForLevel.filter(q => getHighestScore(q.id) !== null).length;
                        const totalCount = quizzesForLevel.length;
                        const isLevelCompleted = totalCount > 0 && completedCount === totalCount;

                        return (
                            <AccordionItem value={level} key={level}>
                                <AccordionTrigger className="text-lg font-semibold">
                                    <div className="flex items-center gap-4">
                                        {level}
                                        {isLevelCompleted && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                                    </div>
                                    <span className="text-sm font-normal text-muted-foreground">
                                        {completedCount} / {totalCount} completed
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <QuizList quizzes={quizzesForLevel} level={level} category={category.type} />
                                </AccordionContent>
                            </AccordionItem>
                        )
                    })}
                </Accordion>
              ) : (
                <Tabs defaultValue="N5" className="w-full">
                    <TabsList className="grid w-full grid-cols-5">
                      {levels.map(level => (
                        <TabsTrigger value={level} key={level}>{level}</TabsTrigger>
                      ))}
                    </TabsList>
                    {levels.map(level => {
                        const quizzesForLevel = groupedQuizzes[category.type]?.[level] ?? [];
                        return (
                            <TabsContent value={level} key={level}>
                                <QuizList quizzes={quizzesForLevel} level={level} category={category.type} />
                            </TabsContent>
                        )
                    })}
                </Tabs>
              )}
            </CardContent>
        </Card>
      ))}

        <AlertDialog open={!!quizToDelete} onOpenChange={() => setQuizToDelete(null)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the quiz "{quizToDelete?.title}".
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        
         <GenerateQuizForm
          isOpen={isGenerateFormOpen}
          onOpenChange={setIsGenerateFormOpen}
          onGenerate={handleGenerateQuiz}
          context={generationContext}
        />
    </div>
  );
}
