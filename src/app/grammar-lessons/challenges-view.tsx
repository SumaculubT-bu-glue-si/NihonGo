
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type {
  ChallengeLevel,
  ChallengeProgress,
  ChallengeNode,
} from '@/lib/data';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  ChevronLeft,
  CircleCheck,
  CircleDollarSign,
  Lock,
  Trophy,
  Swords,
  Castle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGlobalState } from '@/hooks/use-global-state';

const getNodeStatus = (
  nodeId: string,
  progress: ChallengeProgress,
  isPreviousNodeCompleted: boolean
) => {
  if (progress[nodeId]) {
    return 'completed';
  }
  if (isPreviousNodeCompleted) {
    return 'active';
  }
  return 'locked';
};

const NodeIcon = ({
  status,
  type,
}: {
  status: 'completed' | 'active' | 'locked';
  type: ChallengeNode['type'];
}) => {
  const iconSize = 'h-14 w-14';
  const iconProps = { className: iconSize };

  if (type === 'boss') {
    if (status === 'completed') return <Trophy {...iconProps} className={cn(iconSize, "text-yellow-400")} />;
    if (status === 'active') return <Castle {...iconProps} className={cn(iconSize, "text-yellow-500")} />;
    return <Castle {...iconProps} className="text-muted-foreground/50" />;
  }
  
  if (type === 'quiz') {
     if (status === 'completed') return <Trophy {...iconProps} className={cn(iconSize, "text-yellow-400")} />;
     if (status === 'active') return <Swords {...iconProps} className={cn(iconSize, "text-yellow-500")} />;
     return <Swords {...iconProps} className="text-muted-foreground/50" />;
  }

  if (status === 'completed') {
    return <CircleCheck {...iconProps} className="text-green-500" />;
  }
  if (status === 'active') {
    return <BookOpen {...iconProps} className="text-yellow-500" />;
  }
  return <Lock {...iconProps} className="text-muted-foreground/50" />;
};


export function ChallengesView({
  levels,
}: {
  levels: ChallengeLevel[];
}) {
  const router = useRouter();
  const { appData } = useGlobalState();
  const { challengeProgress } = appData;
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [currentUnitIndex, setCurrentUnitIndex] = useState(0);

  // For now, let's just display the first level and unit
  const currentLevel = levels[currentLevelIndex];
  const currentUnit = currentLevel.units[currentUnitIndex];
  
  const handleNodeClick = (node: ChallengeNode, status: 'completed' | 'active' | 'locked') => {
    if (status === 'locked') return;

    let url = '';
    if (node.type === 'lesson' && node.lessonId) {
        url = `/grammar-lessons/${node.lessonId}?challengeNodeId=${node.id}`;
    } else if (node.quizId) {
        url = `/quizzes/${node.quizId}?challengeNodeId=${node.id}`;
    }

    if(url) {
        router.push(url);
    } else {
        alert(`Content for "${node.title}" is not available yet.`);
    }
  };

  let previousNodeCompleted = true; // The first node of a unit is always active

  return (
    <div className="mx-auto flex h-full w-full max-w-2xl flex-col font-sans">
      {/* Header */}
      <div className="sticky top-0 z-10 -mx-4 -mt-4 mb-8 bg-primary/90 p-4 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between">
          <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
            <ChevronLeft className="mr-2" />
            SECTION {currentLevel.section}, UNIT {currentUnit.unit}
          </Button>
          <div className="text-center text-xl font-bold text-primary-foreground">
            {currentUnit.title}
          </div>
          <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
            <BookOpen className="mr-2" />
            GUIDEBOOK
          </Button>
        </div>
      </div>

      {/* Learning Path */}
      <div className="flex flex-1 flex-col items-center justify-start space-y-8 overflow-y-auto pt-8 pb-24">
        {currentUnit.nodes.map((node, index) => {
          let isPrevCompleted = true; // First node is always unlocked
          if (index > 0) {
              const prevNode = currentUnit.nodes[index-1];
              isPrevCompleted = !!challengeProgress[prevNode.id];
          }
          const status = getNodeStatus(node.id, challengeProgress, isPrevCompleted);
          
          const isOffset = index % 2 !== 0;

          return (
            <div
              key={node.id}
              className={cn(
                'relative flex flex-col items-center',
                isOffset ? 'translate-x-20' : '-translate-x-20'
              )}
            >
              <button
                onClick={() => handleNodeClick(node, status)}
                disabled={status === 'locked'}
                className="transition-transform duration-200 hover:scale-110 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <NodeIcon status={status} type={node.type} />
              </button>
              <p className="mt-2 w-32 text-center text-sm font-semibold text-foreground">
                {node.title}
              </p>
            </div>
          );
        })}
         <div className="relative flex flex-col items-center pt-8">
           <Trophy className="h-20 w-20 text-yellow-400" />
           <p className="mt-2 font-bold">Level 1 Complete</p>
         </div>
      </div>
      
       {/* Footer / Next Unit */}
       <div className=" bottom-0 left-0 right-0 p-4 border-t bg-background/90 backdrop-blur-sm">
           <div className="container mx-auto flex items-center justify-center">
             <Button variant="ghost" className="w-full h-12 text-lg">
                Next up: {currentLevel.units[currentUnitIndex + 1]?.title ?? 'Next Level'}
             </Button>
           </div>
       </div>

    </div>
  );
}
