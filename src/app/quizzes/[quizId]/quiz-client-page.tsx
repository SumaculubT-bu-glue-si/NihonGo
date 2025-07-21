
'use client';

import { useState, useEffect } from 'react';
import type { Quiz, QuizQuestion } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  CheckCircle,
  XCircle,
  Lightbulb,
  Repeat,
  ChevronLeft,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useGlobalState } from '@/hooks/use-global-state';


export function QuizClientPage({ quiz, onComplete }: { quiz: Quiz, onComplete?: () => void }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const { updateQuizScore } = useGlobalState();
  
  const resetQuizState = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
    setUserAnswers([]);
  }

  // Reset state if a different quiz is loaded
  useEffect(() => {
    resetQuizState();
  }, [quiz.id]);

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
    } else {
      setShowResults(true);
      const finalScore = Math.round((score / quiz.questions.length) * 100);
      updateQuizScore(quiz.id, finalScore);
      onComplete?.();
    }
  };

  const handleAnswerSubmit = () => {
    if (!selectedAnswer) return;

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore(s => s + 1);
    }

    setUserAnswers(prev => [...prev, selectedAnswer]);
    setIsAnswered(true);
  };
  
  if (quiz.questions.length === 0) {
     return (
      <div className="text-center">
        <XCircle className="mx-auto h-12 w-12 text-destructive" />
        <h2 className="mt-4 text-2xl font-semibold">Empty Quiz</h2>
        <p className="text-muted-foreground">This quiz has no questions yet.</p>
         <Link href={`/quizzes/${quiz.id}/manage`} passHref>
            <Button variant="outline" className="mt-4">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Manage Quiz
            </Button>
        </Link>
      </div>
    );
  }

  if (showResults) {
    const finalScore = Math.round((score / quiz.questions.length) * 100);
    return (
      <div className="mx-auto max-w-2xl">
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-3xl">Quiz Results for {quiz.title}</CardTitle>
                <CardDescription>
                You scored {score} out of {quiz.questions.length}!
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="text-center">
                    <p className="text-5xl font-bold">
                        {finalScore}%
                    </p>
                </div>
                <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
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
                <div className="flex justify-center gap-4 border-t pt-6">
                    <Button onClick={resetQuizState}>
                        <Repeat className="mr-2 h-4 w-4" />
                        Take This Quiz Again
                    </Button>
                    <Link href={`/quizzes`} passHref>
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

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / quiz.questions.length) * 100;
  
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-4">
        <Link href={`/quizzes`} className="text-sm text-primary hover:underline">
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
            {currentQuestion.questionText}
          </CardTitle>
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
