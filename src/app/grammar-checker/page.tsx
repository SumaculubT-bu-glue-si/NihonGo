import { AuthGuard } from '@/components/auth-guard';
import { AppLayout } from '@/components/app-layout';
import { GrammarLessonsView } from '../grammar-lessons/lessons-view';

export default function GrammarCheckerPage() {
  return (
    <AuthGuard>
      <AppLayout>
        <GrammarLessonsView />
      </AppLayout>
    </AuthGuard>
  );
}
