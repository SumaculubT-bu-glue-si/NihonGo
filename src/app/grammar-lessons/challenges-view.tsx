

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { ChallengeProgress, ChallengeData } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { BookOpen, ChevronLeft, CircleCheck, Lock, Trophy, Swords, Castle, Gem, Heart, Store } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGlobalState } from '@/hooks/use-global-state';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ShopDialog } from './shop-dialog';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

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
  const iconBaseStyle = "h-20 w-20 p-4 rounded-full drop-shadow-lg";
  const iconProps = { className: "h-full w-full" };

  if (isBoss) {
    if (status === 'completed') return <div className={cn(iconBaseStyle, "bg-yellow-400 text-white")}><Trophy {...iconProps} /></div>;
    if (status === 'active') return <div className={cn(iconBaseStyle, "bg-yellow-500 text-white")}><Castle {...iconProps} /></div>;
    return <div className={cn(iconBaseStyle, "bg-muted text-muted-foreground/50")}><Castle {...iconProps} /></div>;
  }

  if (status === 'completed') {
    return <div className={cn(iconBaseStyle, "bg-green-500 text-white")}><CircleCheck {...iconProps} /></div>;
  }
  if (status === 'active') {
    return <div className={cn(iconBaseStyle, "bg-primary text-primary-foreground")}><BookOpen {...iconProps} /></div>;
  }
  return <div className={cn(iconBaseStyle, "bg-muted text-muted-foreground/50")}><Lock {...iconProps} /></div>;
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
  
  const isUnitComplete = (unitId: string) => {
    const unit = units[unitId];
    if (!unit) return false;
    const allStagesInUnit = Object.keys(unit);
    return allStagesInUnit.every(stageId => getNodeStatus(unitId, stageId, challengeProgress) === 'completed');
  };

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

  return (
    <>
    <div className="mx-auto flex h-full w-3/4 min-w-2xl flex-col font-sans">
    
       <Card className="px-10 mb-24 w-full bg-primary text-primary-foreground">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-lg font-bold">Level 1</h2>
             <Select value={currentUnitId} onValueChange={setCurrentUnitId}>
                <SelectTrigger className="w-full sm:w-[300px] h-9 text-base font-semibold border-none bg-primary hover:bg-primary/90 focus:ring-0 focus:ring-offset-0">
                    <SelectValue placeholder="Select a unit" />
                </SelectTrigger>
                <SelectContent>
                    {unitNames.map((unitName, index) => {
                        const isFirstUnit = index === 0;
                        const prevUnitName = unitNames[index - 1];
                        const isPrevUnitComplete = isFirstUnit || isUnitComplete(prevUnitName);
                        
                        return (
                            <SelectItem key={unitName} value={unitName} disabled={!isPrevUnitComplete}>
                                {unitName} {!isPrevUnitComplete && ' (Locked)'}
                            </SelectItem>
                        );
                    })}
                </SelectContent>
             </Select>
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
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-blue-300 duration-100" onClick={() => setIsShopOpen(true)}>
                <Store className="h-6 w-6" />
            </Button>
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
        {isUnitComplete(currentUnitId) && (
            <div className="relative flex flex-col items-center pt-36">
            <Trophy className="h-20 w-20 text-yellow-400" />
            <p className="mt-2 font-bold">{currentUnitId.split(':')[0]} Complete</p>
            </div>
        )}
      </div>
    </div>
    <ShopDialog isOpen={isShopOpen} onOpenChange={setIsShopOpen} />
    </>
  );
}
