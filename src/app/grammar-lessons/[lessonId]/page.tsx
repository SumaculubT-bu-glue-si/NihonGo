
'use client';

import { AuthGuard } from '@/components/auth-guard';
import { AppLayout } from '@/components/app-layout';
import { LessonClientPage } from './lesson-client-page';
import { Suspense } from 'react';

export default function GrammarLessonPage() {
  return (
    <AuthGuard>
      <AppLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <LessonClientPage />
        </Suspense>
      </AppLayout>
    </AuthGuard>
  );
}
