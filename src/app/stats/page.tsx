
'use client';
import { AuthGuard } from '@/components/auth-guard';
import { AppLayout } from '@/components/app-layout';
import { StatsView } from './stats-view';
import { useGlobalState } from '@/hooks/use-global-state';

export default function StatsPage() {
  const { appData, isLoading } = useGlobalState();

  if (isLoading) {
    return (
        <AuthGuard>
            <AppLayout>
                <div className="flex h-64 w-full items-center justify-center">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                </div>
            </AppLayout>
        </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <AppLayout>
        <StatsView fullPage={true} stats={appData.userStats} />
      </AppLayout>
    </AuthGuard>
  );
}
