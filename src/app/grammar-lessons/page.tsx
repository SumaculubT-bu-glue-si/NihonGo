import { AuthGuard } from '@/components/auth-guard';
import { AppLayout } from '@/components/app-layout';
import { GrammarLessonsView } from './lessons-view';

export default function GrammarLessonsPage() {
  return (
    <AuthGuard>
      <AppLayout>
        <GrammarLessonsView />
      </AppLayout>
    </AuthGuard>
  );
}
