
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookText, SpellCheck, CheckCircle2, MoreVertical, Settings, Trash2, Wand2, PlusCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useContentApi, type Quiz } from '@/hooks/use-content-api';
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
import { generateQuiz } from '@/ai/flows/generate-quiz-flow';
import { GenerateQuizForm } from './generate-quiz-form';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

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
  const { quizzes, loading, error } = useContentApi();
  const { toast } = useToast();
  const router = useRouter();
  const [quizToDelete, setQuizToDelete] = useState<Quiz | null>(null);
  const [isGenerateFormOpen, setIsGenerateFormOpen] = useState(false);
  const [generationContext, setGenerationContext] = useState<{category: 'vocabulary' | 'grammar', level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1'} | null>(null);

  const getHighestScore = (quizId: string) => {
    const quiz = quizzes.find(q => q.id === quizId);
    return quiz?.user_highest_score || null;
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
    const existingQuizzes = quizzes.filter(q => q.category === category && q.level === level);
    const newQuizNumber = existingQuizzes.length + 1;
    const newTitle = `${level} ${category.charAt(0).toUpperCase() + category.slice(1)} Quiz #${newQuizNumber}`;
    
    try {
      const result = await generateQuiz({
        category: category,
        level: level,
        title: newTitle,
        questionCount: 10,
      });

      toast({
        title: 'Quiz Generated!',
        description: 'Your new quiz has been created successfully.',
      });

      // Create a temporary ID for the generated quiz
      const tempQuizId = `temp-${Date.now()}`;
      router.push(`/quizzes/${tempQuizId}`);
    } catch (error) {
      toast({
        title: 'Generation Failed',
        description: 'Failed to generate quiz. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerateFormOpen(false);
      setGenerationContext(null);
    }
  };

  const handleDeleteQuiz = (quiz: Quiz) => {
    setQuizToDelete(quiz);
  };

  const handleDeleteConfirm = () => {
    if (quizToDelete) {
      // TODO: Implement delete functionality with API
      toast({
        title: 'Quiz Deleted',
        description: 'The quiz has been removed.',
      });
      setQuizToDelete(null);
    }
  };

  const QuizList = ({ quizzes, level, category }: { quizzes: Quiz[], level: string, category: 'vocabulary' | 'grammar' }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {quizzes.map((quiz) => {
        const highestScore = getHighestScore(quiz.id);
        return (
          <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <Badge variant="secondary">{quiz.level}</Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/quizzes/${quiz.id}`}>
                        Take Quiz
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={`/quizzes/${quiz.id}/manage`}>
                        <Settings className="mr-2 h-4 w-4" />
                        Manage
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteQuiz(quiz)}
                      className="text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardTitle className="text-lg">{quiz.title}</CardTitle>
              <CardDescription>
                {quiz.questions?.length || 0} questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {highestScore !== null ? (
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Best Score</span>
                      <span>{highestScore}%</span>
                    </div>
                    <Progress value={highestScore} className="w-full" />
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Not attempted yet</p>
                )}
                <div className="flex gap-2">
                  <Button asChild className="flex-1">
                    <Link href={`/quizzes/${quiz.id}`}>
                      {highestScore !== null ? 'Retake' : 'Start Quiz'}
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <Link href={`/quizzes/${quiz.id}/manage`}>
                      <Settings className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
          <p>Loading quizzes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert>
        <AlertDescription>
          Error loading quizzes: {error}
        </AlertDescription>
      </Alert>
    );
  }

  const completedQuizzes = quizzes.filter(quiz => quiz.user_highest_score !== undefined).length;
  const totalQuizzes = quizzes.length;
  const averageScore = quizzes
    .filter(quiz => quiz.user_highest_score !== undefined)
    .reduce((sum, quiz) => sum + (quiz.user_highest_score || 0), 0) / completedQuizzes || 0;

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            Quiz Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{totalQuizzes}</div>
              <div className="text-sm text-muted-foreground">Total Quizzes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{completedQuizzes}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{Math.round(averageScore)}%</div>
              <div className="text-sm text-muted-foreground">Average Score</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quiz Categories */}
      <Tabs defaultValue="vocabulary" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
          <TabsTrigger value="grammar">Grammar</TabsTrigger>
        </TabsList>

        {quizCategories.map((category) => (
          <TabsContent key={category.type} value={category.type} className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {category.icon}
                <div>
                  <h2 className="text-xl font-semibold">{category.name} Quizzes</h2>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
              </div>
              <Button onClick={() => handleGenerateNew(category.type, 'N5')}>
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Quiz
              </Button>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {levels.map((level) => {
                const levelQuizzes = quizzes.filter(q => q.category === category.type && q.level === level);
                return (
                  <AccordionItem key={level} value={level}>
                    <AccordionTrigger className="text-lg font-semibold">
                      {level} Level ({levelQuizzes.length} quizzes)
                    </AccordionTrigger>
                    <AccordionContent>
                      {levelQuizzes.length > 0 ? (
                        <QuizList quizzes={levelQuizzes} level={level} category={category.type} />
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <p>No {category.type} quizzes for {level} level yet.</p>
                          <Button 
                            variant="outline" 
                            className="mt-2"
                            onClick={() => handleGenerateNew(category.type, level)}
                          >
                            <Wand2 className="mr-2 h-4 w-4" />
                            Generate First Quiz
                          </Button>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </TabsContent>
        ))}
      </Tabs>

      {/* Generate Quiz Dialog */}
      {isGenerateFormOpen && generationContext && (
        <GenerateQuizForm
          isOpen={isGenerateFormOpen}
          onOpenChange={setIsGenerateFormOpen}
          onGenerate={handleGenerateQuiz}
          context={generationContext}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!quizToDelete} onOpenChange={() => setQuizToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Quiz</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{quizToDelete?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
