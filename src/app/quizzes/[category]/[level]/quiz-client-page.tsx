
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { type Quiz, type QuizQuestion } from '@/lib/data';
import { generateQuiz } from '@/ai/flows/generate-quiz-flow';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Loader2,
  CheckCircle,
  XCircle,
  Volume2,
  Lightbulb,
  Repeat,
  ChevronLeft,
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
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


function AudioPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const playAudio = () => {
    audioRef.current?.play();
  };

  return (
    <div>
      <audio ref={audioRef} src={src} preload="auto" />
      <Button onClick={playAudio} variant="outline" size="lg">
        <Volume2 className="mr-2 h-6 w-6" />
        Play Question
      </Button>
    </div>
  );
}


export function QuizClientPage({
  category,
  level,
  quizNumber,
}: {
  category: 'vocabulary' | 'grammar' | 'listening';
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  quizNumber: number;
}) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const { toast } = useToast();

  const loadQuiz = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setQuiz(null);
    try {
      const generatedQuiz = await generateQuiz({
        category,
        level,
        existingQuestionContext: [ `Quiz number ${quizNumber}` ],
      });
      setQuiz(generatedQuiz);
    } catch (e) {
      console.error('Failed to generate quiz:', e);
      setError('Failed to load the quiz. Please try again.');
      toast({
        title: 'Error',
        description: 'Could not generate a quiz. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [category, level, quizNumber, toast]);

  useEffect(() => {
    loadQuiz();
  }, [loadQuiz]);

  const handleAnswerSubmit = () => {
    if (!selectedAnswer || !quiz) return;

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore(s => s + 1);
    }

    setUserAnswers(prev => [...prev, selectedAnswer]);
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);

    if (currentQuestionIndex < (quiz?.questions.length ?? 0) - 1) {
      setCurrentQuestionIndex(i => i + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestartQuiz = () => {
    setShowResults(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setUserAnswers([]);
    loadQuiz();
  };
  
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <h2 className="mt-4 text-2xl font-semibold">Generating Your Quiz...</h2>
        <p className="text-muted-foreground">The AI is crafting questions for {categoryTitle} Quiz #{quizNumber} ({level}).</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <XCircle className="mx-auto h-12 w-12 text-destructive" />
        <h2 className="mt-4 text-2xl font-semibold">Oops! Something went wrong.</h2>
        <p className="text-muted-foreground">{error}</p>
        <Button onClick={loadQuiz} className="mt-4">
          <Repeat className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }

  if (showResults && quiz) {
    return (
      <div className="mx-auto max-w-2xl">
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-3xl">Quiz Results for {categoryTitle} Quiz #{quizNumber}</CardTitle>
                <CardDescription>
                You scored {score} out of {quiz.questions.length}!
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="text-center">
                    <p className="text-5xl font-bold">
                        {((score / quiz.questions.length) * 100).toFixed(0)}%
                    </p>
                </div>
                <div className="space-y-4">
                    {quiz.questions.map((q, index) => (
                        <div key={index} className="rounded-lg border p-4">
                             <p className="font-medium">{index + 1}. {q.questionText}</p>
                             <div className="mt-2 text-sm">
                                {q.correctAnswer === userAnswers[index] ? (
                                    <p className="flex items-center gap-2 text-green-600">
                                        <CheckCircle className="h-4 w-4" /> Your answer: {userAnswers[index]} (Correct)
                                    </p>
                                ) : (
                                    <>
                                        <p className="flex items-center gap-2 text-red-600">
                                            <XCircle className="h-4 w-4" /> Your answer: {userAnswers[index]}
                                        </p>
                                         <p className="flex items-center gap-2 text-green-600">
                                            <CheckCircle className="h-4 w-4" /> Correct answer: {q.correctAnswer}
                                        </p>
                                    </>
                                )}
                             </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center gap-4">
                    <Button onClick={handleRestartQuiz}>
                        <Repeat className="mr-2 h-4 w-4" />
                        Take Another Quiz
                    </Button>
                    <Link href={`/quizzes/${category}`} passHref>
                        <Button variant="outline">
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Back to Quiz List
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
      </div>
    );
  }

  if (!quiz) {
    return null;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-4">
        <Link href={`/quizzes/${category}`} className="text-sm text-primary hover:underline">
          &larr; Back to Quiz List
        </Link>
        <Progress value={progress} className="mt-2 h-2" />
        <p className="mt-1 text-right text-sm text-muted-foreground">
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">
            {category === 'listening' ? "Listen to the sentence and choose the correct meaning." : currentQuestion.questionText}
          </CardTitle>
          {category === 'listening' && currentQuestion.audioDataUri && (
            <div className="mt-4">
                <AudioPlayer src={currentQuestion.audioDataUri} />
            </div>
          )}
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedAnswer ?? ''}
            onValueChange={setSelectedAnswer}
            disabled={isAnswered}
            className="space-y-3"
          >
            {currentQuestion.options.map((option, index) => {
              const isCorrect = option === currentQuestion.correctAnswer;
              const isSelected = option === selectedAnswer;
              
              return (
                <Label
                  key={index}
                  className={cn(
                    "flex items-center rounded-lg border p-4 text-base transition-colors hover:bg-accent",
                    "cursor-pointer",
                    isAnswered && isCorrect && "border-green-500 bg-green-100 text-green-900",
                    isAnswered && !isCorrect && isSelected && "border-red-500 bg-red-100 text-red-900",
                    isAnswered && "cursor-not-allowed"
                  )}
                >
                  <RadioGroupItem value={option} id={`option-${index}`} className="mr-4 h-5 w-5" />
                  {option}
                </Label>
              );
            })}
          </RadioGroup>
          
          <div className="mt-6 flex justify-end">
            {!isAnswered ? (
              <Button onClick={handleAnswerSubmit} disabled={!selectedAnswer}>
                Submit
              </Button>
            ) : (
              <Button onClick={handleNextQuestion}>
                {currentQuestionIndex === quiz.questions.length - 1 ? 'Show Results' : 'Next Question'}
              </Button>
            )}
          </div>
          
          {isAnswered && (
             <div className="mt-6 rounded-md border bg-secondary/50 p-4">
                <h3 className="flex items-center font-semibold text-muted-foreground">
                    <Lightbulb className="mr-2 h-5 w-5 text-yellow-500"/>
                    Explanation
                </h3>
                <p className="mt-2 text-sm text-secondary-foreground">{currentQuestion.explanation}</p>
             </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
}
