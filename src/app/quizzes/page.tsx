import { AuthGuard } from '@/components/auth-guard';
import { AppLayout } from '@/components/app-layout';
import { QuizzesView } from './quizzes-view';

export default function QuizzesPage() {
  return (
    <AuthGuard>
      <AppLayout>
        <QuizzesView />
      </AppLayout>
    </AuthGuard>
  );
}
