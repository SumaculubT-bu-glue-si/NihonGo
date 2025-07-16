import { AuthGuard } from '@/components/auth-guard';
import { AppLayout } from '@/components/app-layout';
import { DictionaryView } from './dictionary-view';

export default function DictionaryPage() {
  return (
    <AuthGuard>
      <AppLayout>
        <DictionaryView />
      </AppLayout>
    </AuthGuard>
  );
}
