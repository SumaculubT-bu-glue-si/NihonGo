
'use client';
import { AuthGuard } from '@/components/auth-guard';
import { AppLayout } from '@/components/app-layout';
import { StatsView } from './stats-view';
import { userStats } from '@/lib/data';

export default function StatsPage() {
  return (
    <AuthGuard>
      <AppLayout>
        <StatsView fullPage={true} stats={userStats} />
      </AppLayout>
    </AuthGuard>
  );
}
