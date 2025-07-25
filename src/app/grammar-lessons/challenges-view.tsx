

'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { ChallengeProgress, ChallengeData } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
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

const NodeIcon = ({
  status,
  isBoss,
}: {
  status: 'completed' | 'active' | 'locked';
  isBoss: boolean;
}) => {
  const iconBaseStyle = "h-20 w-20 drop-shadow-lg";

  if (isBoss) {
    if (status === 'completed') return <Image src="/images/medal.png" alt="Medal" width={80} height={80} className={iconBaseStyle} />;
    if (status === 'active') return <Image src="/images/unlocked.png" alt="Unlocked" width={80} height={80} className={iconBaseStyle} />;
    return <Image src="/images/locked.png" alt="Locked" width={80} height={80} className={iconBaseStyle} />;
  }

  if (status === 'completed') {
    return <Image src="/images/star.png" alt="Star" width={80} height={80} className={iconBaseStyle} />;
  }
  if (status === 'active') {
    return <Image src="/images/unlocked.png" alt="Unlocked" width={80} height={80} className={iconBaseStyle} />;
  }
  return <Image src="/images/locked.png" alt="Locked" width={80} height={80} className={iconBaseStyle} />;
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
        <Image src="/images/trophy.png" alt="Trophy" width={80} height={80} className="mb-4"/>
        <h3 className="text-xl font-semibold">No Challenges Available</h3>
        <p>Check back later for new content!</p>
      </div>
    );
  }
  
  if (!currentUnitId || !currentUnit) {
     return (
      <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-64">
        <Image src="/images/trophy.png" alt="Trophy" width={80} height={80} className="mb-4"/>
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
              <Image src="/images/trophy.png" alt="Trophy" width={80} height={80} />
              <p className="mt-2 font-bold">{currentUnitId.split(':')[0]} Complete</p>
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
          <div className="py-4 max-h-[60vh] overflow-y-auto pr-4">
            <div 
                className="prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: guidebookContent ?? '' }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
