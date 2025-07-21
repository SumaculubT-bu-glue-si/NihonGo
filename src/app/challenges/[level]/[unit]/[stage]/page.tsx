
'use client';

import { AppLayout } from '@/components/app-layout';
import { AuthGuard } from '@/components/auth-guard';
import { useGlobalState } from '@/hooks/use-global-state';
import { notFound, useParams } from 'next/navigation';
import { ChallengeClientPage } from './challenge-client-page';

export default function ChallengePage() {
  const params = useParams<{ level: string; unit: string; stage: string }>();
  const { appData, isLoading } = useGlobalState();
  const { level, unit, stage } = params;
  
  const decodedUnitId = decodeURIComponent(unit as string);

  if (isLoading) {
    return (
      <AuthGuard>
        <div className="flex h-screen w-full items-center justify-center bg-background">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </AuthGuard>
    );
  }

  const challengeLevel = appData.challengeData[level];
  if (!challengeLevel) return notFound();
  
  const challengeUnit = challengeLevel[decodedUnitId];
  if (!challengeUnit) return notFound();

  const challengeStage = challengeUnit[stage];
  if (!challengeStage) return notFound();

  return (
    <AuthGuard>
        <ChallengeClientPage items={challengeStage} />
    </AuthGuard>
  );
}
