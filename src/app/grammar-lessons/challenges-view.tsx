

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { ChallengeProgress } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { BookOpen, ChevronLeft, CircleCheck, Lock, Trophy, Swords, Castle, Gem, Heart, Store } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGlobalState } from '@/hooks/use-global-state';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ShopDialog } from './shop-dialog';

const HEART_REGEN_MINUTES = 30;

const getNodeStatus = (unitId: string, stageId: string, progress: ChallengeProgress) => {
  // Check if the current stage is completed
  if (progress?.N5?.[unitId]?.[stageId] === 'completed') {
    return 'completed';
  }
  
  // The first stage is always active by default
  const stageNum = parseInt(stageId.replace('stage', ''), 10);
  if (stageNum === 1) {
    return 'active';
  }

  // Check if the previous stage is complete to unlock the current one
  if (stageNum > 1) {
    const prevStageId = `stage${stageNum - 1}`;
    if (progress?.N5?.[unitId]?.[prevStageId] === 'completed') {
      return 'active';
    }
  }

  // Otherwise, it's locked
  return 'locked';
};

const NodeIcon = ({
  status,
  isBoss,
}: {
  status: 'completed' | 'active' | 'locked';
  isBoss: boolean;
}) => {
  const iconSize = 'h-14 w-14';
  const iconProps = { className: iconSize };

  if (isBoss) {
    if (status === 'completed') return <Trophy {...iconProps} className={cn(iconSize, 'text-yellow-400')} />;
    if (status === 'active') return <Castle {...iconProps} className={cn(iconSize, 'text-yellow-500')} />;
    return <Castle {...iconProps} className="text-muted-foreground/50" />;
  }

  if (status === 'completed') {
    return <CircleCheck {...iconProps} className="text-green-500" />;
  }
  if (status === 'active') {
    return <BookOpen {...iconProps} className="text-primary" />;
  }
  return <Lock {...iconProps} className="text-muted-foreground/50" />;
};

const CooldownTimer = () => {
  const { appData } = useGlobalState();
  const { hearts, lastHeartLossTimestamp } = appData;
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (hearts >= 5 || !lastHeartLossTimestamp) {
      setTimeLeft('');
      return;
    }

    const interval = setInterval(() => {
      const timePassed = Date.now() - lastHeartLossTimestamp;
      const cooldown = HEART_REGEN_MINUTES * 60 * 1000;
      const remainingTime = Math.max(0, cooldown - timePassed);

      if (remainingTime === 0) {
        setTimeLeft('Next heart soon!');
      } else {
        const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
        const seconds = Math.floor((remainingTime / 1000) % 60);
        setTimeLeft(`${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [hearts, lastHeartLossTimestamp]);
  
  if (!timeLeft || hearts >= 5) return null;

  return <p className="text-xs text-primary-foreground/80">{timeLeft}</p>;
}


export function ChallengesView() {
  const router = useRouter();
  const { appData } = useGlobalState();
  const { challengeData, challengeProgress, hearts, diamonds } = appData;
  const [currentUnitId, setCurrentUnitId] = useState('Unit 1: Basic Sentences & Endings');
  const [isShopOpen, setIsShopOpen] = useState(false);


  const units = challengeData.N5;

  if (!units) {
    return (
      <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-64">
        <Trophy className="h-16 w-16 mb-4" />
        <h3 className="text-xl font-semibold">No Challenges Available</h3>
        <p>Check back later for new content!</p>
      </div>
    );
  }

  const currentUnit = units[currentUnitId];
  const unitNames = Object.keys(units);
  const currentUnitIndex = unitNames.indexOf(currentUnitId);
  const nextUnitId = unitNames[currentUnitIndex + 1];

  if (!currentUnit) {
    return (
      <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-64">
        <Trophy className="h-16 w-16 mb-4" />
        <h3 className="text-xl font-semibold">Error Loading Unit</h3>
        <p>Could not find data for {currentUnitId}.</p>
      </div>
    );
  }
  
  const allStages = Object.keys(currentUnit);
  const isUnitComplete = allStages.every(stageId => getNodeStatus(currentUnitId, stageId, challengeProgress) === 'completed');


  return (
    <>
    <div className="mx-auto flex h-full w-full max-w-2xl flex-col font-sans">
      
       <Card className="mb-8 w-full bg-primary text-primary-foreground">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Level 1</h2>
            <p className="text-sm font-medium text-primary-foreground/80">{currentUnitId}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Gem className="h-6 w-6" />
              <span className="text-lg font-bold">{diamonds}</span>
            </div>
            <div className="flex flex-col items-center gap-0">
                <div className="flex items-center gap-2">
                    <Heart className="h-6 w-6" />
                    <span className="text-lg font-bold">{hearts}</span>
                </div>
                {hearts < 5 && <CooldownTimer />}
            </div>
            <button className="text-primary-foreground hover:text-blue-300 duration-100" onClick={() => setIsShopOpen(true)}>
                <Store className="h-6 w-6" />
            </button>
          </div>
        </CardContent>
      </Card>


      {/* Learning Path */}
      <div className="flex flex-1 flex-col items-center justify-start space-y-8 overflow-y-auto pb-24">
      {hearts === 0 && (
        <div className="text-center text-orange-500 bg-orange-100 p-4 rounded-lg">
          <h3 className="font-bold text-lg">You're out of hearts!</h3>
          <p className="text-sm">
            Refill your hearts to continue learning.
          </p>
          <CooldownTimer />
        </div>
      )}
        {allStages.map((stageId, index) => {
          const status = getNodeStatus(currentUnitId, stageId, challengeProgress);
          const isLocked = hearts === 0 && status === 'active';
          const finalStatus = isLocked ? 'locked' : status;

          const isBoss = index === Object.keys(currentUnit).length - 1;
          const isOffset = index % 2 !== 0;
          
          const stageHref = `/challenges/N5/${encodeURIComponent(currentUnitId)}/${stageId}`;

          return (
            <div
              key={stageId}
              className={cn('relative flex flex-col items-center', isOffset ? 'translate-x-20' : '-translate-x-20')}
            >
              <Link href={stageHref} passHref aria-disabled={finalStatus === 'locked'}>
                <button
                  disabled={finalStatus === 'locked'}
                  className="transition-transform duration-200 hover:scale-110 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:opacity-50"
                >
                  <NodeIcon status={finalStatus} isBoss={isBoss} />
                </button>
              </Link>
              <p className="mt-2 w-32 text-center text-sm font-semibold text-foreground">
                {stageId.replace('stage', 'Stage ')}
              </p>
            </div>
          );
        })}
        {isUnitComplete && (
            <div className="relative flex flex-col items-center pt-8">
            <Trophy className="h-20 w-20 text-yellow-400" />
            <p className="mt-2 font-bold">{currentUnitId.split(':')[0]} Complete</p>
            </div>
        )}
      </div>

      {/* Footer / Next Unit */}
      {nextUnitId && (
        <div className=" bottom-0 left-0 right-0 p-4 border-t bg-background/90 backdrop-blur-sm">
          <div className="container mx-auto flex items-center justify-center">
            <Button
              variant="ghost"
              className="w-full h-12 text-lg"
              onClick={() => setCurrentUnitId(nextUnitId)}
            >
              Next up: {nextUnitId.split(':')[0]}
            </Button>
          </div>
        </div>
      )}
    </div>
    <ShopDialog isOpen={isShopOpen} onOpenChange={setIsShopOpen} />
    </>
  );
}
