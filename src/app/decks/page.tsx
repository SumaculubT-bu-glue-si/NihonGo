import { AuthGuard } from '@/components/auth-guard';
import { AppLayout } from '@/components/app-layout';
import { DeckBrowser } from './deck-browser';
import { StatsView } from '../stats/stats-view';

export default function HomePage() {
  return (
    <AuthGuard>
      <AppLayout>
        <div className="space-y-8">
            <StatsView />
            <DeckBrowser />
        </div>
      </AppLayout>
    </AuthGuard>
  );
}
