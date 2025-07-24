

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { ChallengeProgress, ChallengeData } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { BookOpen, CircleCheck, Lock, Trophy, Castle, Gem, Heart, Store, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGlobalState } from '@/hooks/use-global-state';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ShopDialog } from './shop-dialog';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { generateGrammarGuidebook, type GenerateGrammarGuidebookOutput } from '@/ai/flows/generate-grammar-guidebook-flow';

const HEART_REGEN_MINUTES = 30;

type Level = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

const getNodeStatus = (level: Level, unitId: string, stageId: string, progress: ChallengeProgress) => {
  // Check if the current stage is completed
  if (progress?.[level]?.[unitId]?.[stageId] === 'completed') {
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
    if (progress?.[level]?.[unitId]?.[prevStageId] === 'completed') {
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
  const searchParams = useSearchParams();
  const { appData, setCurrentChallengeLevel } = useGlobalState();
  const { challengeData, challengeProgress, hearts, diamonds, currentChallengeLevel } = appData;
  
  const [currentUnitId, setCurrentUnitId] = useState('');
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isGuidebookOpen, setIsGuidebookOpen] = useState(false);
  const [guidebookContent, setGuidebookContent] = useState<GenerateGrammarGuidebookOutput | null>(null);
  const [isGuidebookLoading, setIsGuidebookLoading] = useState(false);

  useEffect(() => {
    const levelFromQuery = searchParams.get('level') as Level | null;
    const unitFromQuery = searchParams.get('unit');
    
    const targetLevel = levelFromQuery || currentChallengeLevel;
    if (targetLevel !== currentChallengeLevel) {
        setCurrentChallengeLevel(targetLevel);
    }

    const unitsForLevel = challengeData?.[targetLevel];
    if (!unitsForLevel) return;

    if (unitFromQuery && unitsForLevel[unitFromQuery]) {
        setCurrentUnitId(unitFromQuery);
    } else if (Object.keys(unitsForLevel).length > 0) {
        setCurrentUnitId(Object.keys(unitsForLevel)[0]);
    } else {
        setCurrentUnitId('');
    }
  }, [searchParams, challengeData, currentChallengeLevel, setCurrentChallengeLevel]);


  const handleLevelChange = (level: Level) => {
    router.push(`/grammar-lessons?tab=challenges&level=${level}`);
  };
  
  const handleOpenGuidebook = async () => {
    setIsGuidebookOpen(true);
    setGuidebookContent(null);
    setIsGuidebookLoading(true);

    try {
        const result = await generateGrammarGuidebook({
            level: currentChallengeLevel,
            unit_topic: currentUnitId,
        });
        setGuidebookContent(result);
    } catch (error) {
        console.error("Failed to generate guidebook", error);
        setGuidebookContent({ guidebook: "Could not load guidebook at this time. Please try again." });
    } finally {
        setIsGuidebookLoading(false);
    }
  };
  
  const units = challengeData?.[currentChallengeLevel];
  
   const isUnitComplete = (level: Level, unitId: string) => {
    const unit = challengeData[level]?.[unitId];
    if (!unit) return false;
    const allStagesInUnit = Object.keys(unit);
    return allStagesInUnit.every(stageId => getNodeStatus(level, unitId, stageId, challengeProgress) === 'completed');
  };
  
  const isLevelComplete = (level: Level) => {
    const unitsInLevel = challengeData[level];
    if (!unitsInLevel || Object.keys(unitsInLevel).length === 0) return true; // No units, so it's "complete"

    return Object.keys(unitsInLevel).every(unitId => isUnitComplete(level, unitId));
  }
  
  const allLevels: Level[] = ['N5', 'N4', 'N3', 'N2', 'N1'];
  
  const currentUnit = units?.[currentUnitId];
  const unitNames = units ? Object.keys(units) : [];


  if (!units) {
    return (
      <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-64">
        <Trophy className="h-16 w-16 mb-4" />
        <h3 className="text-xl font-semibold">No Challenges Available</h3>
        <p>Check back later for new content!</p>
      </div>
    );
  }
  
  if (!currentUnitId || !currentUnit) {
     return (
      <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-64">
        <Trophy className="h-16 w-16 mb-4" />
        <h3 className="text-xl font-semibold">No Challenges Found</h3>
        <p>There are no units available for this level yet.</p>
      </div>
    );
  }
  
  const allStages = Object.keys(currentUnit);

  return (
    <>
     <Card className="px-10 mb-20 w-full bg-primary text-primary-foreground">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <div>
              <Select value={currentChallengeLevel} onValueChange={(v) => handleLevelChange(v as Level)}>
                  <SelectTrigger className="w-full sm:w-[200px] h-9 text-lg font-bold border-none bg-primary hover:bg-primary/90 focus:ring-0 focus:ring-offset-0">
                      <SelectValue placeholder="Select a level" />
                  </SelectTrigger>
                  <SelectContent>
                      {allLevels.map((level, index) => {
                        const isFirstLevel = index === 0;
                        const prevLevel = allLevels[index - 1];
                        const isPrevLevelComplete = isFirstLevel || isLevelComplete(prevLevel);

                          return (
                              <SelectItem key={level} value={level} disabled={!isPrevLevelComplete}>
                                  Level {index + 1}: {level} {!isPrevLevelComplete && '(Locked)'}
                              </SelectItem>
                          );
                      })}
                  </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={currentUnitId} onValueChange={setCurrentUnitId}>
                  <SelectTrigger className="w-full sm:w-[350px] h-9 text-base font-semibold border-none bg-primary hover:bg-primary/90 focus:ring-0 focus:ring-offset-0">
                      <SelectValue placeholder="Select a unit" />
                  </SelectTrigger>
                  <SelectContent>
                      {unitNames.map((unitName, index) => {
                          const isFirstUnit = index === 0;
                          const prevUnitName = unitNames[index - 1];
                          const isPrevUnitComplete = isFirstUnit || isUnitComplete(currentChallengeLevel, prevUnitName);
                          
                          return (
                              <SelectItem key={unitName} value={unitName} disabled={!isPrevUnitComplete}>
                                  {unitName} {!isPrevUnitComplete && ' (Locked)'}
                              </SelectItem>
                          );
                      })}
                  </SelectContent>
              </Select>
            </div>
             <Button
                variant="ghost"
                size="icon"
                onClick={handleOpenGuidebook}
                className="text-primary-foreground hover:bg-primary/80"
                aria-label="Open Guidebook"
              >
                <BookOpen className="h-5 w-5" />
              </Button>
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
      <div className="mx-auto flex h-full w-3/4 min-w-2xl flex-col font-sans">
      <div className="flex flex-1 flex-col items-center justify-start space-y-8 overflow-y-auto mb-24">
      {hearts === 0 && (
        <div className="text-center text-orange-500 bg-orange-100 p-4 rounded-lg">
          <h3 className="font-bold text-lg">You're out of hearts!</h3>
          <p className="text-sm">
            Refill your hearts to continue learning.
          </p>
        </div>
      )}
        {allStages.map((stageId, index) => {
          const status = getNodeStatus(currentChallengeLevel, currentUnitId, stageId, challengeProgress);
          const isLocked = hearts === 0 && status === 'active';
          const finalStatus = isLocked ? 'locked' : status;

          const isBoss = index === Object.keys(currentUnit).length - 1;
          const isOffset = index % 2 !== 0;
          
          const stageHref = `/challenges/${currentChallengeLevel}/${encodeURIComponent(currentUnitId)}/${stageId}`;

          return (
            <div
              key={stageId}
              className={cn('relative flex flex-col items-center pt-5', isOffset ? 'translate-x-20' : '-translate-x-20')}
            >
              <Link href={stageHref} passHref aria-disabled={finalStatus === 'locked'}>
                <button
                  disabled={finalStatus === 'locked'}
                  className="transition-transform duration-200 hover:scale-110 disabled:cursor-not-allowed disabled:opacity-50"
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
        {isUnitComplete(currentChallengeLevel, currentUnitId) && (
            <div className="relative flex flex-col items-center pt-36">
            <Trophy className="h-20 w-20 text-yellow-400" />
            <p className="mt-2 font-bold">{currentUnitId.split(':')[0]} Complete</p>
            </div>
        )}
      </div>
    </div>
    <ShopDialog isOpen={isShopOpen} onOpenChange={setIsShopOpen} />
    
    <Dialog open={isGuidebookOpen} onOpenChange={setIsGuidebookOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Unit Guidebook: {currentUnitId}</DialogTitle>
            <DialogDescription>
              A quick overview of the key points for this unit at the {currentChallengeLevel} level.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 max-h-[60vh] overflow-y-auto pr-4">
             {isGuidebookLoading ? (
                 <div className="flex items-center justify-center gap-3 text-muted-foreground h-48">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <p>Generating your guide...</p>
                </div>
             ) : (
                <div 
                    className="prose prose-sm dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: guidebookContent?.guidebook ?? '' }}
                />
             )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
