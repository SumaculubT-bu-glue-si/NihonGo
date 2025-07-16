
'use client';

import { AuthGuard } from '@/components/auth-guard';
import { AppLayout } from '@/components/app-layout';
import { notFound, useParams } from 'next/navigation';
import { QuizListView } from './quiz-list-view';

export default function QuizCategoryPage() {
  const params = useParams();
  const category = params.category as 'vocabulary' | 'grammar' | 'listening';

  const validCategories = ['vocabulary', 'grammar', 'listening'];

  if (!validCategories.includes(category)) {
    return notFound();
  }

  return (
    <AuthGuard>
      <AppLayout>
        <QuizListView category={category} />
      </AppLayout>
    </AuthGuard>
  );
}
