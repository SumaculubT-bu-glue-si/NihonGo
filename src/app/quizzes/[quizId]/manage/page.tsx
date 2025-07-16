
'use client';

import { AuthGuard } from '@/components/auth-guard';
import { AppLayout } from '@/components/app-layout';
import { notFound, useParams } from 'next/navigation';
import { useGlobalState } from '@/hooks/use-global-state';
import { ManageQuizClientPage } from './manage-quiz-client-page';

export default function ManageQuizPage() {
  const params = useParams();
  const quizId = params.quizId as string;
  const { appData, isLoading } = useGlobalState();

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

  const quiz = appData.quizzes.find((q) => q.id === quizId);

  if (!quiz) {
    return notFound();
  }

  return (
    <AuthGuard>
      <AppLayout>
        <ManageQuizClientPage quiz={quiz} />
      </AppLayout>
    </AuthGuard>
  );
}
