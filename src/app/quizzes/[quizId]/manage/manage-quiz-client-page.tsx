
'use client';

import { useState } from 'react';
import type { Quiz, QuizQuestion } from '@/lib/data';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2, CheckCircle } from 'lucide-react';
import { useGlobalState } from '@/hooks/use-global-state';
import { useToast } from '@/hooks/use-toast';
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
import { QuizForm, type QuizFormData } from '../../quiz-form';
import { QuestionForm, type QuestionFormData } from '../../question-form';

export function ManageQuizClientPage({ quiz: initialQuiz }: { quiz: Quiz }) {
  const { appData, updateQuiz, addQuestionToQuiz, updateQuestionInQuiz, deleteQuestionFromQuiz } = useGlobalState();
  const { toast } = useToast();

  const [isQuestionFormOpen, setIsQuestionFormOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<QuizQuestion | null>(null);
  const [questionToDelete, setQuestionToDelete] = useState<QuizQuestion | null>(null);

  // This ensures the component always displays the latest quiz data from global state
  const quiz = appData.quizzes.find(q => q.id === initialQuiz.id) ?? initialQuiz;

  const handleAddNewQuestion = () => {
    setEditingQuestion(null);
    setIsQuestionFormOpen(true);
  };

  const handleEditQuestion = (question: QuizQuestion) => {
    setEditingQuestion(question);
    setIsQuestionFormOpen(true);
  };

  const handleDeleteInitiate = (question: QuizQuestion) => {
    setQuestionToDelete(question);
  };

  const handleDeleteConfirm = () => {
    if (!questionToDelete) return;
    deleteQuestionFromQuiz(quiz.id, questionToDelete.id);
    toast({
      title: 'Question Deleted',
      description: 'The question has been successfully deleted.',
    });
    setQuestionToDelete(null);
  };

  const handleSaveQuizDetails = (data: QuizFormData) => {
    updateQuiz(quiz.id, { title: data.title });
    toast({
      title: 'Quiz Updated',
      description: 'The quiz title has been updated.',
    });
  };

  const handleSaveQuestion = (data: QuestionFormData) => {
    if (editingQuestion) {
      updateQuestionInQuiz(quiz.id, editingQuestion.id, data);
      toast({
        title: 'Question Updated',
        description: 'The question has been successfully updated.',
      });
    } else {
      addQuestionToQuiz(quiz.id, data);
      toast({
        title: 'Question Created',
        description: 'A new question has been added to the quiz.',
      });
    }
    setIsQuestionFormOpen(false);
    setEditingQuestion(null);
  };

  return (
    <div className="container mx-auto space-y-6">
      <div>
        <Link href="/quizzes" className="text-sm text-primary hover:underline">
          &larr; Back to Quizzes
        </Link>
        <h1 className="mt-2 text-3xl font-bold font-headline">Manage Quiz</h1>
        <p className="text-muted-foreground">
          Edit quiz details and manage its questions.
        </p>
      </div>
      
      <QuizForm quiz={quiz} onSave={handleSaveQuizDetails} />

      <div>
        <div className="mb-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Questions ({quiz.questions.length})</h2>
            <Button onClick={handleAddNewQuestion}>
                <PlusCircle className="mr-2 h-4 w-4"/> Add New Question
            </Button>
        </div>
        <div className="rounded-lg border">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Question</TableHead>
                <TableHead>Correct Answer</TableHead>
                <TableHead className="w-24 text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {quiz.questions.length > 0 ? (
                quiz.questions.map((question) => (
                    <TableRow key={question.id}>
                    <TableCell className="font-medium max-w-lg truncate">{question.questionText}</TableCell>
                    <TableCell className="text-green-600 font-medium flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        {question.correctAnswer}
                    </TableCell>
                    <TableCell className="text-right">
                        <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleEditQuestion(question)}
                        >
                        <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleDeleteInitiate(question)}
                        >
                        <Trash2 className="h-4 w-4" />
                        </Button>
                    </TableCell>
                    </TableRow>
                ))
                ) : (
                <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                    No questions yet. Add one to get started.
                    </TableCell>
                </TableRow>
                )}
            </TableBody>
            </Table>
        </div>
      </div>
      
      <QuestionForm
        isOpen={isQuestionFormOpen}
        onOpenChange={setIsQuestionFormOpen}
        onSave={handleSaveQuestion}
        question={editingQuestion}
      />

      <AlertDialog open={!!questionToDelete} onOpenChange={() => setQuestionToDelete(null)}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this question.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setQuestionToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
