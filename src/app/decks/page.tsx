import { AuthGuard } from '@/components/auth-guard';
import { AppLayout } from '@/components/app-layout';
import { DeckBrowser } from './deck-browser';

export default function DecksPage() {
  return (
    <AuthGuard>
      <AppLayout>
        <DeckBrowser />
      </AppLayout>
    </AuthGuard>
  );
}
