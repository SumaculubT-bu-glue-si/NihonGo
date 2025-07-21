
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type {
  Stage,
  Unit,
  ChallengeProgress
} from '@/lib/data';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  ChevronLeft,
  CircleCheck,
  Lock,
  Trophy,
  Swords,
  Castle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGlobalState } from '@/hooks/use-global-state';

const getNodeStatus = (
  unitId: string,
  stageId: string,
  progress: ChallengeProgress,
) => {
    // This logic will need to be updated based on how progress is tracked.
    // For now, we'll simulate it.
    if(stageId === 'stage1') return 'active';
    if(progress?.N5?.[unitId]?.[stageId] === 'completed') return 'completed';
    // Check if previous stage is complete to unlock the current one
    const stageNum = parseInt(stageId.replace('stage', ''), 10);
    if(stageNum > 1) {
        const prevStageId = `stage${stageNum - 1}`;
        if(progress?.N5?.[unitId]?.[prevStageId] === 'completed') {
            return 'active';
        }
    }
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
    if (status === 'completed') return <Trophy {...iconProps} className={cn(iconSize, "text-yellow-400")} />;
    if (status === 'active') return <Castle {...iconProps} className={cn(iconSize, "text-yellow-500")} />;
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


export function ChallengesView() {
  const router = useRouter();
  const { appData } = useGlobalState();
  const { challengeData, challengeProgress } = appData;
  const [currentUnitId, setCurrentUnitId] = useState('Unit 1');
  
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
  
  const handleNodeClick = (stageId: string, status: 'completed' | 'active' | 'locked') => {
    if (status === 'locked') return;
    // Navigate to the challenge page, which doesn't exist yet
    // router.push(`/challenges/N5/${currentUnitId}/${stageId}`);
    console.log(`Navigating to: /challenges/N5/${currentUnitId}/${stageId}`);
  };


  return (
    <div className="mx-auto flex h-full w-full max-w-2xl flex-col font-sans">
      {/* Header */}
      <div className="sticky top-0 z-10 -mx-4 -mt-4 mb-8 bg-primary/90 p-4 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between">
          <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
            <ChevronLeft className="mr-2" />
            SECTION 1, {currentUnitId.toUpperCase()}
          </Button>
          <div className="text-center text-xl font-bold text-primary-foreground">
            {currentUnitId}
          </div>
          <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
            <BookOpen className="mr-2" />
            GUIDEBOOK
          </Button>
        </div>
      </div>

      {/* Learning Path */}
      <div className="flex flex-1 flex-col items-center justify-start space-y-8 overflow-y-auto pt-8 pb-24">
        {Object.keys(currentUnit).map((stageId, index) => {
          const status = getNodeStatus(currentUnitId, stageId, challengeProgress);
          const isBoss = index === Object.keys(currentUnit).length - 1;
          const isOffset = index % 2 !== 0;

          return (
            <div
              key={stageId}
              className={cn(
                'relative flex flex-col items-center',
                isOffset ? 'translate-x-20' : '-translate-x-20'
              )}
            >
              <button
                onClick={() => handleNodeClick(stageId, status)}
                disabled={status === 'locked'}
                className="transition-transform duration-200 hover:scale-110 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <NodeIcon status={status} isBoss={isBoss} />
              </button>
              <p className="mt-2 w-32 text-center text-sm font-semibold text-foreground">
                {stageId.replace('stage', 'Stage ')}
              </p>
            </div>
          );
        })}
         <div className="relative flex flex-col items-center pt-8">
           <Trophy className="h-20 w-20 text-yellow-400" />
           <p className="mt-2 font-bold">{currentUnitId} Complete</p>
         </div>
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
                Next up: {nextUnitId}
             </Button>
           </div>
       </div>
       )}

    </div>
  );
}
