

'use client';

import { AppLayout } from '@/components/app-layout';
import { AuthGuard } from '@/components/auth-guard';
import { notFound, useParams, useRouter } from 'next/navigation';
import { ChallengeClientPage } from './challenge-client-page';
import { generateChallenge, type GenerateChallengeOutput } from '@/ai/flows/generate-challenge-flow';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

type Level = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

export default function ChallengePage() {
  const params = useParams<{ level: string; unit: string; stage: string }>();
  const [challenge, setChallenge] = useState<GenerateChallengeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { level, unit, stage } = params;
  const router = useRouter();
  const { toast } = useToast();
  
  const decodedUnitId = decodeURIComponent(unit as string);

  useEffect(() => {
    const fetchChallenge = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await generateChallenge({
                unit_topic: decodedUnitId,
                level: level as Level,
                count: 5 // Generate 5 challenges per stage for now
            });
            if (!result || !result.items || result.items.length === 0) {
              throw new Error("AI failed to generate challenge items.");
            }
            setChallenge(result);
        } catch (error) {
            console.error("Failed to generate challenge:", error);
            setError("Could not generate challenges at this moment. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };
    fetchChallenge();
  }, [decodedUnitId, level]);
  
  useEffect(() => {
    if (error) {
       toast({
        title: 'Generation Failed',
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
            <p>{error ? "Redirecting..." : "Generating your challenges..."}</p>
          </div>
        </div>
      </AuthGuard>
    );
  }

  if (!challenge || !challenge.items || challenge.items.length === 0) {
    // This case should ideally be handled by the error state now
    return notFound();
  }

  return (
    <AuthGuard>
        <ChallengeClientPage items={challenge.items} level={level} unitId={decodedUnitId} />
    </AuthGuard>
  );
}
