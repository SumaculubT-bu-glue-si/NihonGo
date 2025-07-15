import { AuthGuard } from '@/components/auth-guard';
import { AppLayout } from '@/components/app-layout';
import { VocabularyView } from './vocabulary-view';

export default function VocabularyPage() {
  return (
    <AuthGuard>
      <AppLayout>
        <VocabularyView />
      </AppLayout>
    </AuthGuard>
  );
}
