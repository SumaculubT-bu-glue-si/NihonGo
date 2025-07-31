
'use client';

import { AuthGuard } from '@/components/auth-guard';
import { AppLayout } from '@/components/app-layout';
import { QuizzesView } from './quizzes-view';
import { Suspense } from 'react';

export default function QuizzesPage() {
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
          <Suspense fallback={<div>Loading...</div>}>
            <QuizzesView />
          </Suspense>
        </div>
      </AppLayout>
    </AuthGuard>
  );
}
