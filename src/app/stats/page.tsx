import { AuthGuard } from '@/components/auth-guard';
import { AppLayout } from '@/components/app-layout';
import { StatsView } from './stats-view';

export default function StatsPage() {
  return (
    <AuthGuard>
      <AppLayout>
        <StatsView />
      </AppLayout>
    </AuthGuard>
  );
}
