
'use client';

import { AuthGuard } from '@/components/auth-guard';
import { AppLayout } from '@/components/app-layout';
import { notFound, useParams, useSearchParams } from 'next/navigation';
import { QuizClientPage } from './quiz-client-page';

export default function QuizPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  
  const category = params.category as 'vocabulary' | 'grammar';
  const level = params.level as 'n5' | 'n4' | 'n3' | 'n2' | 'n1';
  const quizNumber = searchParams.get('num') || '1';

  const validCategories = ['vocabulary', 'grammar'];
  const validLevels = ['n5', 'n4', 'n3', 'n2', 'n1'];

  if (!validCategories.includes(category) || !validLevels.includes(level)) {
    return notFound();
  }

  const levelUpperCase = level.toUpperCase() as 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

  return (
    <AuthGuard>
      <AppLayout>
        <QuizClientPage category={category} level={levelUpperCase} quizNumber={parseInt(quizNumber, 10)} />
      </AppLayout>
    </AuthGuard>
  );
}
