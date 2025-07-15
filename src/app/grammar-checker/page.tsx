import { AuthGuard } from '@/components/auth-guard';
import { AppLayout } from '@/components/app-layout';
import { GrammarCheckerView } from './checker-view';

export default function GrammarCheckerPage() {
  return (
    <AuthGuard>
      <AppLayout>
        <GrammarCheckerView />
      </AppLayout>
    </AuthGuard>
  );
}
