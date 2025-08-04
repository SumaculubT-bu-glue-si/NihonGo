

'use client';

import { useState, useEffect } from 'react';
import { useContentApi, type GrammarLesson } from '@/hooks/use-content-api';
import Link from 'next/link';
import { generateQuiz } from '@/ai/flows/generate-quiz-flow';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, CheckCircle2, BookOpen, Loader2, Wand2, Repeat, ChevronLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { QuizClientPage } from '@/app/quizzes/[quizId]/quiz-client-page';
import { useSearchParams, useParams } from 'next/navigation';
import { PronunciationButton } from '@/components/pronunciation-button';
import { shuffle } from '@/lib/utils';
import { Alert, AlertDescription } from '@/components/ui/alert';

function LessonContent({ lesson }: { lesson: GrammarLesson }) {
  const parseExample = (example: string) => {
    const japanese = example.split('(')[0].trim();
    return {
      full: example,
      japanese,
    };
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="flex items-center text-sm font-semibold uppercase text-muted-foreground mb-2">
          <Lightbulb className="mr-2 h-4 w-4" />
          Explanation
        </h3>
        <div className="prose prose-sm max-w-none space-y-4 rounded-md border bg-secondary/50 p-4 text-card-foreground leading-relaxed">
          {lesson.explanation.split('\n').map((paragraph, index) => (
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
            {lesson.examples.map((ex, i) => {
              const { full, japanese } = parseExample(ex);
              return (
                <li key={i} className="flex items-center justify-between gap-2">
                    <span className="flex-1">{full}</span>
                    <PronunciationButton text={japanese} size="sm" />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function LessonClientPage() {
  const { getGrammarLesson, markGrammarLessonAsRead } = useContentApi();
  const { toast } = useToast();
  const [lesson, setLesson] = useState<GrammarLesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [miniQuiz, setMiniQuiz] = useState<any | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [view, setView] = useState<'lesson' | 'quiz'>('lesson');
  const [isMarkingAsRead, setIsMarkingAsRead] = useState(false);
  
  const searchParams = useSearchParams();
  const params = useParams();
  const lessonId = params.lessonId as string;
  const challengeNodeId = searchParams.get('challengeNodeId');

  // Load lesson data
  useEffect(() => {
    const loadLesson = async () => {
      try {
        setLoading(true);
        const lessonData = await getGrammarLesson(lessonId);
        if (lessonData) {
          setLesson(lessonData);
        } else {
          setError('Lesson not found');
        }
      } catch (err) {
        setError('Failed to load lesson');
      } finally {
        setLoading(false);
      }
    };

    if (lessonId) {
      loadLesson();
    }
  }, [lessonId]);

  const handleMarkAsRead = async () => {
    if (!lesson) return;
    
    setIsMarkingAsRead(true);
    try {
      const success = await markGrammarLessonAsRead(lesson.id);
      if (success) {
        setLesson(prev => prev ? { ...prev, user_read: true, completed_at: new Date().toISOString() } : null);
        toast({ 
          title: "Lesson Completed!", 
          description: "Great job! This lesson has been marked as completed." 
        });
      } else {
        toast({ 
          title: "Error", 
          description: "Failed to mark lesson as completed. Please try again.",
          variant: "destructive"
        });
      }
    } catch (err) {
      toast({ 
        title: "Error", 
        description: "Failed to mark lesson as completed. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsMarkingAsRead(false);
    }
  };

  const handleCompleteQuiz = async () => {
    console.log('🎯 Quiz completed! challengeNodeId:', challengeNodeId);
    
    toast({ title: "Lesson Completed!", description: "Great job on the quiz." });
    
    if (challengeNodeId) {
      try {
        // Parse challengeNodeId to extract level, unitId, and stageId
        // Expected format: "level:unitId:stageId" (e.g., "N5:Unit 1\: Greetings:stage1")
        const parts = challengeNodeId.split(':');
        if (parts.length >= 3) {
          const level = parts[0] as 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
          const unitId = parts.slice(1, -1).join(':'); // Handle unit names with colons
          const stageId = parts[parts.length - 1];
          
          console.log('🎯 Parsed challenge info:', { level, unitId, stageId });
          
          // Import the API service to save progress
          const { apiService } = await import('@/lib/api');
          
          console.log('🎯 Saving challenge progress...');
          const result = await apiService.updateChallengeProgress(level, unitId, stageId, 'completed');
          
          if (result.error) {
            console.error('❌ Failed to save challenge progress:', result.error);
            toast({
              title: 'Progress Save Failed',
              description: 'Could not save your challenge progress.',
              variant: 'destructive',
            });
          } else {
            console.log('✅ Challenge progress saved successfully!');
            toast({
              title: 'Challenge Completed!',
              description: `Stage ${stageId.replace('stage', '')} completed successfully!`,
            });
            
            // Also try to unlock the next stage
            const stageNum = parseInt(stageId.replace('stage', ''), 10);
            const nextStageId = `stage${stageNum + 1}`;
            
            console.log('🎯 Attempting to unlock next stage:', nextStageId);
            const nextResult = await apiService.updateChallengeProgress(level, unitId, nextStageId, 'active');
            
            if (!nextResult.error) {
              console.log('✅ Next stage unlocked successfully!');
            } else {
              console.log('ℹ️ Next stage unlock failed (may not exist):', nextResult.error);
            }
          }
        } else {
          console.error('❌ Invalid challengeNodeId format:', challengeNodeId);
        }
      } catch (error) {
        console.error('❌ Error saving challenge progress:', error);
        toast({
          title: 'Progress Save Error',
          description: 'An error occurred while saving your progress.',
          variant: 'destructive',
        });
      }
    }
  };

  const handleGenerateQuiz = async () => {
    if (!lesson) return;
    
    setIsGenerating(true);
    setMiniQuiz(null); // Clear previous quiz
    try {
      const result = await generateQuiz({
        category: 'grammar',
        level: lesson.level,
        title: `Mini-Quiz: ${lesson.title}`,
        questionCount: 3,
      });
      
      // Shuffle the options for each question
      const shuffledQuestions = result.questions.map(q => ({
        ...q,
        options: shuffle([...q.options]),
        id: `temp-q-${Math.random()}`
      }));

      const quizWithIdsAndShuffledOptions = {
        ...result,
        questions: shuffledQuestions,
        id: `temp-quiz-${Math.random()}`
      };

      setMiniQuiz(quizWithIdsAndShuffledOptions);
      setView('quiz');
    } catch (error) {
      toast({ 
        title: "Error", 
        description: "Failed to generate quiz. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReturnToLesson = () => {
    setView('lesson');
    setMiniQuiz(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
          <p>Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <Alert>
        <AlertDescription>
          {error || 'Lesson not found'}
        </AlertDescription>
      </Alert>
    );
  }

  if (view === 'quiz' && miniQuiz) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleReturnToLesson}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Lesson
          </Button>
        </div>
        <QuizClientPage quiz={miniQuiz} onComplete={handleCompleteQuiz} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/grammar-lessons">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Lessons
            </Button>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {lesson.user_read && (
            <div className="flex items-center gap-1 text-sm text-green-600">
              <CheckCircle2 className="h-4 w-4" />
              <span>Completed</span>
            </div>
          )}
          <Badge variant="secondary">{lesson.level}</Badge>
        </div>
      </div>

      {/* Lesson Content */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{lesson.title}</CardTitle>
          <CardDescription>
            {lesson.user_read ? 'You have completed this lesson' : 'Study this grammar point'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LessonContent lesson={lesson} />
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-4">
        {!lesson.user_read && (
          <Button 
            onClick={handleMarkAsRead} 
            disabled={isMarkingAsRead}
            className="flex items-center gap-2"
          >
            {isMarkingAsRead ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <CheckCircle2 className="h-4 w-4" />
            )}
            Mark as Completed
          </Button>
        )}
        
        <Button 
          variant="outline" 
          onClick={handleGenerateQuiz}
          disabled={isGenerating}
          className="flex items-center gap-2"
        >
          {isGenerating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Wand2 className="h-4 w-4" />
          )}
          Generate Quiz
        </Button>
      </div>
    </div>
  );
}
