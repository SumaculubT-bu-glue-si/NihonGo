
'use client';

import { AuthGuard } from '@/components/auth-guard';
import { AppLayout } from '@/components/app-layout';
import { notFound, useParams } from 'next/navigation';
import { useGlobalState } from '@/hooks/use-global-state';
import { LessonClientPage } from './lesson-client-page';

export default function GrammarLessonPage() {
  const params = useParams<{ lessonId: string }>();
  const lessonId = params.lessonId;
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

  const lesson = appData.grammarLessons.find((l) => l.id === lessonId);

  if (!lesson) {
    return notFound();
  }

  return (
    <AuthGuard>
      <AppLayout>
        <LessonClientPage lesson={lesson} />
      </AppLayout>
    </AuthGuard>
  );
}
