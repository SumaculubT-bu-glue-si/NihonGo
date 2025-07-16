
'use client';

import { AuthGuard } from '@/components/auth-guard';
import { AppLayout } from '@/components/app-layout';
import { notFound, useParams } from 'next/navigation';
import { QuizClientPage } from './quiz-client-page';

export default function QuizPage() {
  const params = useParams();
  const category = params.category as 'vocabulary' | 'grammar' | 'listening';
  const level = params.level as 'n5' | 'n4' | 'n3' | 'n2' | 'n1';

  const validCategories = ['vocabulary', 'grammar', 'listening'];
  const validLevels = ['n5', 'n4', 'n3', 'n2', 'n1'];

  if (!validCategories.includes(category) || !validLevels.includes(level)) {
    return notFound();
  }

  const levelUpperCase = level.toUpperCase() as 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

  return (
    <AuthGuard>
      <AppLayout>
        <QuizClientPage category={category} level={levelUpperCase} />
      </AppLayout>
    </AuthGuard>
  );
}
