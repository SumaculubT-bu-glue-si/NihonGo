

'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { ChallengeProgress, ChallengeData } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { BookOpen, Star, Lock, Unlock, Gem, Trophy, ChevronLeft, ChevronRight } from 'lucide-react';
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
import { useAuth } from '@/contexts/auth-context-sqlite';
import { useContentApi } from '@/hooks/use-content-api';
import { useUserStats } from '@/hooks/use-user-stats';
import { apiService } from '@/lib/api';
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


const Path = ({ isUnlocked, isRight }: { isUnlocked: boolean, isRight: boolean }) => (
  <div className={cn("absolute -bottom-16 w-48 h-28", isRight ? "-left-28" : "-right-28")}>
    <svg width="100%" height="100%" viewBox="0 0 100 100">
      <path
        d={!isRight ? "M 20 20 Q 60 40, 80 80" : "M 80 20 Q 30 40, 10 80"}
        stroke={isUnlocked ? "#fbbf24" : "#4b5563"}
        strokeWidth="5"
        fill="transparent"
        strokeLinecap="round"
        strokeDasharray="10"
        className="transition-all duration-500"
      />
    </svg>
  </div>
);


export function ChallengesView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { appData, setCurrentChallengeLevel } = useGlobalState();
  const { challengeData, hearts, diamonds, currentChallengeLevel } = appData;
  const { user } = useAuth();
  const { toast } = useToast();

  // Use database progress instead of global state progress
  const { challengeProgress, updateChallengeProgress, refetch } = useContentApi();
  
  // Use database hearts and diamonds instead of local state
  const { hearts: dbHearts, diamonds: dbDiamonds, updateHearts, updateDiamonds } = useUserStats();

  const [currentUnitId, setCurrentUnitId] = useState('');
  const [isGuidebookOpen, setIsGuidebookOpen] = useState(false);
  const [guidebookContent, setGuidebookContent] = useState<string | null>(null);
  const guidebookAudioPlayer = useRef<HTMLAudioElement | null>(null);

  function playGuidebookAudio() {
    if (guidebookAudioPlayer.current) {
      guidebookAudioPlayer.current.play().catch(error => {
        console.error("Audio play failed:", error);
      });
    }
  }

  // Load challenge progress from database when component mounts or user changes
  useEffect(() => {
    const loadChallengeProgress = async () => {
      if (user) {
        console.log('🔄 Loading challenge progress from database for user:', user.id);
        try {
          refetch();
          console.log('✅ Challenge progress loaded successfully');
        } catch (error) {
          console.error('❌ Failed to load challenge progress:', error);
        }
      } else {
        console.log('ℹ️ No user authenticated, skipping progress load');
      }
    };

    loadChallengeProgress();
  }, [user, refetch]);

  // Function to save challenge progress to database
  const saveProgress = async (level: Level, unitId: string, stageId: string, status: 'completed' | 'active' | 'locked') => {
    console.log('🔄 saveProgress called with:', { level, unitId, stageId, status });

    if (!user) {
      console.error('❌ User not authenticated');
      toast({
        title: 'Authentication Error',
        description: 'Please log in to save progress.',
        variant: 'destructive',
      });
      return;
    }

    console.log('✅ User authenticated:', user.id);

    try {
      console.log('📡 Calling updateChallengeProgress (useContentApi)...');
      const success = await updateChallengeProgress(level, unitId, stageId, status);

      console.log('📥 API Response (success):', success);

      if (!success) {
        console.error('❌ API call failed');
        throw new Error('Failed to update challenge progress');
      }

      console.log('✅ Progress saved successfully!');
      console.log('🔄 Refreshing challenge progress from database...');

      // Refresh progress from database to update UI immediately
      refetch();
      console.log('✅ Challenge progress refreshed!');

      toast({
        title: 'Progress Saved',
        description: `Stage ${stageId.replace('stage', '')} marked as ${status}`,
      });
    } catch (error) {
      console.error('❌ Error saving progress:', error);
      toast({
        title: 'Error',
        description: `Failed to save progress: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: 'destructive',
      });
    }
  };

  // Function to handle stage completion
  const handleStageCompletion = async (level: Level, unitId: string, stageId: string) => {
    await saveProgress(level, unitId, stageId, 'completed');

    // Also unlock the next stage if it exists
    const stageNum = parseInt(stageId.replace('stage', ''), 10);
    const nextStageId = `stage${stageNum + 1}`;

    // Check if challengeData exists and has the required structure
    if (challengeData && challengeData[level]) {
      const levelData = challengeData[level] as Record<string, any>;
      if (levelData[unitId]) {
        const currentUnit = levelData[unitId] as Record<string, any>;
        if (nextStageId in currentUnit) {
          // Check if next stage is currently locked, then make it active
          const nextStageStatus = getNodeStatus(level, unitId, nextStageId, challengeProgress);
          if (nextStageStatus === 'locked') {
            await saveProgress(level, unitId, nextStageId, 'active');
          }
        }
      }
    }
  };

  // Function to manually mark a stage as completed (for testing/admin purposes)
  const markStageCompleted = async (level: Level, unitId: string, stageId: string) => {
    console.log('🎯 markStageCompleted called with:', { level, unitId, stageId });
    console.log('🎯 About to call handleStageCompletion...');
    try {
      await handleStageCompletion(level, unitId, stageId);
      console.log('🎯 handleStageCompletion completed successfully');
    } catch (error) {
      console.error('🎯 Error in markStageCompleted:', error);
    }
  };

  useEffect(() => {
    const levelFromQuery = searchParams.get('level') as Level | null;
    const unitFromQuery = searchParams.get('unit');

    const targetLevel = levelFromQuery || currentChallengeLevel;
    if (targetLevel !== currentChallengeLevel) {
      setCurrentChallengeLevel(targetLevel);
    }

    const unitsForLevel = challengeData?.[targetLevel];
    if (!unitsForLevel) return;

    if (unitFromQuery && unitFromQuery in unitsForLevel) {
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
    const unit = (challengeData as any)[level]?.[unitId];
    if (!unit) return false;
    const allStagesInUnit = Object.keys(unit);
    return allStagesInUnit.every(stageId => getNodeStatus(level, unitId, stageId, challengeProgress) === 'completed');
  };

  const isLevelComplete = (level: Level) => {
    const unitsInLevel = (challengeData as any)[level];
    if (!unitsInLevel || Object.keys(unitsInLevel).length === 0) return true; // No units, so it's "complete"

    return Object.keys(unitsInLevel).every(unitId => isUnitComplete(level, unitId));
  }

  const allLevels: Level[] = ['N5', 'N4', 'N3', 'N2', 'N1'];

  const currentUnit = units?.[currentUnitId as keyof typeof units];
  const unitNames = units ? Object.keys(units) : [];

  const currentUnitIndex = unitNames.indexOf(currentUnitId);

  const handlePreviousUnit = () => {
    if (currentUnitIndex > 0) {
      const prevUnitId = unitNames[currentUnitIndex - 1];
      router.push(`/grammar-lessons?tab=challenges&level=${currentChallengeLevel}&unit=${encodeURIComponent(prevUnitId)}`);
    }
  }

  const handleNextUnit = () => {
    if (currentUnitIndex < unitNames.length - 1) {
      const nextUnitId = unitNames[currentUnitIndex + 1];
      router.push(`/grammar-lessons?tab=challenges&level=${currentChallengeLevel}&unit=${encodeURIComponent(nextUnitId)}`);
    }
  }

  const isNextUnitLocked = currentUnitIndex === unitNames.length - 1 || !isUnitComplete(currentChallengeLevel, currentUnitId);

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
      <Card className="px-4 sm:px-10 mb-20 w-full bg-primary text-primary-foreground">
        <CardContent className="p-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={handlePreviousUnit} disabled={currentUnitIndex === 0} className={cn(
            "h-12 w-12 rounded-full bg-blue-400/80 hover:bg-blue-400 active:translate-y-1 transition-all duration-150",
            "[box-shadow:0_6px_0_0_#1b6ff8,0_11px_0_0_#1b70f841] active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841] active:border-b-0",
            "disabled:opacity-50 disabled:grayscale disabled:active:translate-y-0"
          )}>
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center">
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
              <Select value={currentUnitId} onValueChange={(unitId) => router.push(`/grammar-lessons?tab=challenges&level=${currentChallengeLevel}&unit=${encodeURIComponent(unitId)}`)}>
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
            <button
              onClick={handleOpenGuidebook}
              className="flex flex-row gap-2 font-semibold text-primary-foreground hover:text-primary-foreground/80 duration-100"
              aria-label="Open Guidebook">
              <BookOpen className="h-6 w-6" />
              <h1>Guide Book</h1>
            </button>
          </div>
          <Button variant="ghost" size="icon" onClick={handleNextUnit} disabled={isNextUnitLocked} className={cn(
            "h-12 w-12 rounded-full bg-blue-400/80 hover:bg-blue-400 active:translate-y-1 transition-all duration-150",
            "[box-shadow:0_6px_0_0_#1b6ff8,0_11px_0_0_#1b70f841] active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841] active:border-b-0",
            "disabled:opacity-50 disabled:grayscale disabled:active:translate-y-0"
          )}>
            <ChevronRight className="h-8 w-8" />
          </Button>
        </CardContent>
      </Card>


      {/* Learning Path */}
      <div className="mx-auto flex h-full w-3/4 min-w-2xl flex-col font-sans">
        <div className="flex flex-1 flex-col items-center justify-start space-y-8 overflow-y-auto mb-24">
          {dbHearts === 0 && (
            <div className="text-center text-orange-500 bg-orange-100 p-4 rounded-lg">
              <h3 className="font-bold text-lg">You're out of hearts!</h3>
              <p className="text-sm">
                Refill your hearts to continue learning.
              </p>
            </div>
          )}
          {allStages.map((stageId, index) => {
            const status = getNodeStatus(currentChallengeLevel, currentUnitId, stageId, challengeProgress);
            const isLocked = dbHearts === 0 && status === 'active';
            const finalStatus: 'completed' | 'active' | 'locked' = isLocked ? 'locked' : status;

            const isBoss = index === Object.keys(currentUnit).length - 1;
            const isOffset = index % 2 !== 0;

            const stageHref = `/challenges/${currentChallengeLevel}/${encodeURIComponent(currentUnitId)}/${stageId}`;

            const NodeWrapper = ({ children }: { children: React.ReactNode }) => {
              const handleContextMenu = (e: React.MouseEvent) => {
                e.preventDefault();
                if (finalStatus === 'active' && user) {
                  markStageCompleted(currentChallengeLevel, currentUnitId, stageId);
                }
              };

              const handleDoubleClick = (e: React.MouseEvent) => {
                e.preventDefault();
                if (finalStatus === 'active' && user) {
                  markStageCompleted(currentChallengeLevel, currentUnitId, stageId);
                }
              };

              return finalStatus === 'locked' ? (
                <div>{children}</div>
              ) : (
                <Link
                  href={stageHref}
                  passHref
                  aria-disabled={false}
                  onContextMenu={handleContextMenu}
                  onDoubleClick={handleDoubleClick}
                  title={finalStatus === 'active' ? 'Right-click or double-click to mark as completed' : ''}
                >
                  {children}
                </Link>
              );
            };

            return (
              <div
                key={stageId}
                className={cn('relative flex flex-col items-center pt-5', isOffset ? 'translate-x-20' : '-translate-x-20')}
              >
                {!isBoss && <Path isUnlocked={status === 'completed'} isRight={isOffset} />}
                <NodeWrapper>
                  <NodeButton status={finalStatus} isBoss={isBoss} />
                </NodeWrapper>
                <div className="flex flex-col items-center">
                  <p
                    className="mt-2 w-32 text-xl text-center font-bold text-white uppercase tracking-wider"
                    style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}
                  >
                    {stageId.replace('stage', 'Stage ')}
                  </p>
                  {finalStatus === 'active' && user && (
                    <div
                      // onClick={(e) => {
                      //   alert('BUTTON CLICKED! Check console for details.');
                      //   console.log('🎯 BUTTON CLICKED! Stage:', stageId, 'Level:', currentChallengeLevel, 'Unit:', currentUnitId);
                      //   e.preventDefault();
                      //   console.log('🎯 Calling markStageCompleted...');
                      //   markStageCompleted(currentChallengeLevel, currentUnitId, stageId);
                      //   console.log('🎯 markStageCompleted call completed');
                      // }}
                      className="mt-1 px-2 py-1 text-xs bg-green-500 hover:bg-green-600 text-white rounded transition-colors"
                      title="Mark as completed"
                    >
                      🔓 Unlocked
                    </div>
                  )}
                  {finalStatus === 'completed' && (
                    <div className="mt-1 text-xs text-green-400 font-semibold">
                      ✓ Completed
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          {isUnitComplete(currentChallengeLevel, currentUnitId) && (
            <div className="relative flex flex-col items-center pt-16">
              <Image src="/images/trophy.png" alt="Trophy" width={200} height={200} className='h-auto w-auto' />
              <p
                className="mt-2 text-2xl font-bold text-white uppercase tracking-wider"
                style={{ textShadow: '2px 2px 12px rgba(0,0,0,0.9)' }}
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
          <div
            className="prose prose-sm dark:prose-invert max-w-none prose-headings:border-b prose-headings:pb-2 prose-ul:list-disc prose-ul:pl-6 prose-strong:text-primary max-h-[60vh] overflow-y-auto pr-6"
            dangerouslySetInnerHTML={{ __html: guidebookContent ?? '' }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}




