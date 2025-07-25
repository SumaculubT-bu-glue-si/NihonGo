

'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { ChallengeProgress, ChallengeData } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { BookOpen, Star, Lock, Unlock, Gem, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGlobalState } from '@/hooks/use-global-state';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { staticGuidebooks } from '@/lib/guidebook-data';
import Image from 'next/image';


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

const NodeButton = ({
  status,
  isBoss,
}: {
  status: 'completed' | 'active' | 'locked';
  isBoss: boolean;
}) => {
    let Icon = Unlock;
    let iconColor = "text-yellow-300";
    let bgColor = "bg-green-500";
    let shadowColor = "[box-shadow:0_8px_0_0_#22c55e,0_13px_0_0_#22c55e41]"; // Green shadow
    let activeShadow = "active:[box-shadow:0_0px_0_0_#22c55e,0_0px_0_0_#22c55e41]";
    let borderColor = "border-green-600";
    let isDisabled = false;

    if (isBoss) {
        Icon = Gem;
        iconColor = "text-white";
        bgColor = "bg-purple-600";
        shadowColor = "[box-shadow:0_8px_0_0_#7c3aed,0_13px_0_0_#7c3aed41]"; // Purple shadow
        activeShadow = "active:[box-shadow:0_0px_0_0_#7c3aed,0_0px_0_0_#7c3aed41]";
        borderColor = "border-purple-700";
    }

    if (status === 'completed') {
        Icon = Star;
        iconColor = "text-yellow-300 fill-yellow-300";
        bgColor = "bg-blue-500";
        shadowColor = "[box-shadow:0_8px_0_0_#2563eb,0_13px_0_0_#2563eb41]"; // Blue shadow
        activeShadow = "active:[box-shadow:0_0px_0_0_#2563eb,0_0px_0_0_#2563eb41]";
        borderColor = "border-blue-600";
    } else if (status === 'locked') {
        Icon = Lock;
        iconColor = "text-slate-500";
        bgColor = "bg-slate-300";
        shadowColor = "[box-shadow:0_8px_0_0_#94a3b8,0_13px_0_0_#94a3b841]"; // Gray shadow
        activeShadow = "active:[box-shadow:0_0px_0_0_#94a3b8,0_0px_0_0_#94a3b841]";
        borderColor = "border-slate-400";
        isDisabled = true;
    }

  return (
    <button
        disabled={isDisabled}
        className={cn(
            'w-20 h-20 rounded-full cursor-pointer select-none active:translate-y-2 active:border-b-[0px] transition-all duration-150 border-[1px]',
            bgColor,
            shadowColor,
            activeShadow,
            borderColor,
            isDisabled && "grayscale cursor-not-allowed opacity-60"
        )}
    >
        <span className='flex flex-col justify-center items-center h-full'>
            <Icon className={cn("h-10 w-10", iconColor)} />
        </span>
    </button>
  );
};

export function ChallengesView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { appData, setCurrentChallengeLevel } = useGlobalState();
  const { challengeData, challengeProgress, hearts, diamonds, currentChallengeLevel } = appData;
  const { toast } = useToast();
  
  const [currentUnitId, setCurrentUnitId] = useState('');
  const [isGuidebookOpen, setIsGuidebookOpen] = useState(false);
  const [guidebookContent, setGuidebookContent] = useState<string | null>(null);
  const guidebookAudioPlayer = useRef<HTMLAudioElement | null>(null);
  const stageAudioPlayer = useRef<HTMLAudioElement | null>(null);

  function playGuidebookAudio() {
    if (guidebookAudioPlayer.current) {
      guidebookAudioPlayer.current.play().catch(error => {
        console.error("Audio play failed:", error);
      });
    }
  }

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
  
  const handleOpenGuidebook = () => {
    playGuidebookAudio();
    setIsGuidebookOpen(true);
    
    const content = staticGuidebooks[currentChallengeLevel]?.[currentUnitId] ?? "<p>No guidebook available for this section yet.</p>";
    setGuidebookContent(content);
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
        <Trophy className="h-16 w-16 text-yellow-400 mb-4" />
        <h3 className="text-xl font-semibold">No Challenges Available</h3>
        <p>Check back later for new content!</p>
      </div>
    );
  }
  
  if (!currentUnitId || !currentUnit) {
     return (
      <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-64">
        <Trophy className="h-16 w-16 text-yellow-400 mb-4" />
        <h3 className="text-xl font-semibold">No Challenges Found</h3>
        <p>There are no units available for this level yet.</p>
      </div>
    );
  }
  
  const allStages = Object.keys(currentUnit);

  return (
    <>
     <audio ref={guidebookAudioPlayer} src="/sounds/open.mp3" />
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
          </div>

          <div className="flex items-center gap-6">
            <button
                  onClick={handleOpenGuidebook}
                  className="flex flex-row gap-2 font-semibold text-primary-foreground hover:text-primary-foreground/80 duration-100"
                  aria-label="Open Guidebook">
                  <BookOpen className="h-6 w-6" />
                  <h1>Guide Book</h1>
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

          const NodeWrapper = ({ children }: { children: React.ReactNode }) =>
            finalStatus === 'locked' ? (
              <div>{children}</div>
            ) : (
              <Link href={stageHref} passHref aria-disabled={finalStatus === 'locked'}>
                {children}
              </Link>
            );

          return (
            <div
              key={stageId}
              className={cn('relative flex flex-col items-center pt-5', isOffset ? 'translate-x-20' : '-translate-x-20')}
            >
              <NodeWrapper>
                <NodeButton status={finalStatus} isBoss={isBoss} />
              </NodeWrapper>
              <p 
                className="mt-2 w-32 text-center text-sm font-bold text-white uppercase tracking-wider"
                style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.4)'}}
              >
                {stageId.replace('stage', 'Stage ')}
              </p>
            </div>
          );
        })}
        {isUnitComplete(currentChallengeLevel, currentUnitId) && (
            <div className="relative flex flex-col items-center pt-16">
              <Image src="/images/trophy.png" alt="Trophy" width={200} height={200} className='h-auto w-auto' />
              <p 
                className="mt-2 text-xl font-bold text-white uppercase tracking-wider"
                style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.5)'}}
              >
                {currentUnitId.split(':')[0]} Complete
              </p>
            </div>
        )}
      </div>
    </div>
    
    <Dialog open={isGuidebookOpen} onOpenChange={setIsGuidebookOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Unit Guidebook: {currentUnitId}</DialogTitle>
            <DialogDescription>
              A quick overview of the key points for this unit at the {currentChallengeLevel} level.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 max-h-[60vh] overflow-y-auto pr-6 prose prose-sm dark:prose-invert max-w-none">
            <div 
                dangerouslySetInnerHTML={{ __html: guidebookContent ?? '' }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
