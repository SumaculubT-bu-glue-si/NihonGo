'use client';

import { AppLayout } from '@/components/app-layout';
import { AuthGuard } from '@/components/auth-guard';
import { notFound, useParams, useRouter } from 'next/navigation';
import { ChallengeClientPage } from './challenge-client-page';
import { useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';
import { useToast } from '@/hooks/use-toast';
import { staticChallengeItems } from '@/lib/challenge-items-data';
import type { ChallengeItem } from '@/lib/data';


type Level = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

export default function ChallengePage() {
  const params = useParams<{ level: string; unit: string; stage: string }>();
  const [challengeItems, setChallengeItems] = useState<ChallengeItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { level, unit, stage } = params;
  const router = useRouter();
  const { toast } = useToast();

  const decodedUnitId = decodeURIComponent(unit as string);
  const stageSoundRef = useRef<Howl | null>(null);
  const soundPlayedRef = useRef(false);

  useEffect(() => {
    stageSoundRef.current = new Howl({
      src: ['/sounds/stage.mp3'],
      volume: 0.7,
    });
  }, []);

  useEffect(() => {
    const fetchChallenge = () => {
      setIsLoading(true);
      setError(null);
      try {
        const items = staticChallengeItems[level as Level]?.[decodedUnitId]?.[stage as string];
        if (!items || items.length === 0) {
          throw new Error("Challenge data not found for this stage.");
        }
        setChallengeItems(items);
      } catch (error) {
        console.error("Failed to load challenge data:", error);
        setError("Could not load challenges. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallenge();
  }, [decodedUnitId, level, stage]);

  useEffect(() => {
    if (challengeItems && !soundPlayedRef.current) {
      stageSoundRef.current?.play();
      soundPlayedRef.current = true;
    }
  }, [challengeItems]);

  useEffect(() => {
    if (error) {
      toast({
        title: 'Loading Failed',
        description: error,
        variant: 'destructive',
      });
      router.push('/grammar-lessons?tab=challenges');
    }
  }, [error, router, toast]);

  if (isLoading || error) {
    return (
      <AuthGuard>
        <div className="flex h-screen w-full items-center justify-center bg-[#2e3856]">
          <div className="flex flex-col items-center gap-4 text-white">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-white border-t-transparent" />
            <p>{error ? "Redirecting..." : "Loading challenges..."}</p>
          </div>
        </div>
      </AuthGuard>
    );
  }

  if (!challengeItems || challengeItems.length === 0) {
    return notFound();
  }

  return (
    <AuthGuard>
      <ChallengeClientPage
        items={challengeItems}
        level={level}
        unitId={decodedUnitId}
      />
    </AuthGuard>
  );
}
