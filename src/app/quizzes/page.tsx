
'use client';

import { AuthGuard } from '@/components/auth-guard';
import { AppLayout } from '@/components/app-layout';
import { QuizzesView } from './quizzes-view';
import { useGlobalState } from '@/hooks/use-global-state';

export default function QuizzesPage() {
  const { isLoading } = useGlobalState();

   if (isLoading) {
    return (
        <AuthGuard>
            <AppLayout>
                <div className="flex h-64 w-full items-center justify-center">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                </div>
            </AppLayout>
        </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <AppLayout>
        <div className="container mx-auto">
            <div className="mb-8">
                <h1 className="mb-2 text-3xl font-bold font-headline">Quizzes</h1>
                <p className="text-muted-foreground">
                Test your knowledge across different skills and levels.
                </p>
            </div>
            <QuizzesView />
        </div>
      </AppLayout>
    </AuthGuard>
  );
}
