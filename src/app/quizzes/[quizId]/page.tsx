
'use client';

import { AuthGuard } from '@/components/auth-guard';
import { AppLayout } from '@/components/app-layout';
import { notFound, useParams } from 'next/navigation';
import { QuizClientPage } from './quiz-client-page';
import { useGlobalState } from '@/hooks/use-global-state';

export default function QuizPage() {
  const params = useParams<{ quizId: string }>();
  const { appData, isLoading } = useGlobalState();
  const quizId = params.quizId;
  
  if (isLoading) {
    return (
      <AuthGuard>
        <AppLayout>
          <div className="flex h-64 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        </AppLayout>
      </AuthGuard>
    );
  }

  const quiz = appData.quizzes.find(q => q.id === quizId);

  if (!quiz) {
    return notFound();
  }

  return (
    <AuthGuard>
      <AppLayout>
        <QuizClientPage quiz={quiz} />
      </AppLayout>
    </AuthGuard>
  );
}
