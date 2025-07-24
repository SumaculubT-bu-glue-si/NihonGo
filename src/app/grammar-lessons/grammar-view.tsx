

'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChallengesView } from './challenges-view';
import { GrammarCheckerTool } from './checker-view';
import { useSearchParams } from 'next/navigation';
import { useGlobalState } from '@/hooks/use-global-state';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BookCheck, BarChart3, Trophy, Heart, Gem, Store } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { GrammarLessonsView } from './lessons-view';
import { ShopDialog } from './shop-dialog';

const CooldownTimer = () => {
  const { appData } = useGlobalState();
  const { hearts, lastHeartLossTimestamp } = appData;
  const [timeLeft, setTimeLeft] = useState('');
  const HEART_REGEN_MINUTES = 30;


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

  return <p className="text-xs text-muted-foreground">{timeLeft}</p>;
}


export function GrammarView() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'library';
  const { appData } = useGlobalState();
  const { hearts, diamonds } = appData;
  const [isShopOpen, setIsShopOpen] = useState(false);
  
  const grammarStats = useMemo(() => {
    const lessonsCompleted = appData.grammarLessons.filter(l => l.read).length;
    const totalLessons = appData.grammarLessons.length;
    const { challengeData, challengeProgress, currentChallengeLevel } = appData;
    const allLevels: ('N5'|'N4'|'N3'|'N2'|'N1')[] = ['N5', 'N4', 'N3', 'N2', 'N1'];
    
    let totalCompletedStages = 0;
    let totalAvailableStages = 0;

    allLevels.forEach(level => {
        const unitsInLevel = Object.keys(challengeData[level] || {});
        unitsInLevel.forEach(unitId => {
            const stages = Object.keys(challengeData[level][unitId]);
            totalAvailableStages += stages.length;
            stages.forEach(stageId => {
                if (challengeProgress[level]?.[unitId]?.[stageId] === 'completed') {
                    totalCompletedStages++;
                }
            });
        });
    });

    const overallProgressPercentage = totalAvailableStages > 0 
        ? Math.round((totalCompletedStages / totalAvailableStages) * 100) 
        : 0;

    return {
        lessonsCompleted,
        totalLessons,
        overallProgressPercentage,
        currentChallengeLevel,
        totalChallengesPassed: totalCompletedStages,
    };

  }, [appData]);
    
  return (
    <>
    <div className="container mx-auto space-y-8">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold font-headline">Grammar</h1>
                <p className="text-muted-foreground">
                Explore grammar points, check your sentences, and build your own library.
                </p>
            </div>
             <div className="flex items-center gap-6">
                <button className="flex flex-row gap-2 font-semibold text-primary hover:text-primary/80 duration-100" onClick={() => setIsShopOpen(true)}>
                    <Store className="h-6 w-6" />
                    <h1>Shop</h1>
                </button>
                <div className="flex items-center gap-2 font-semibold text-primary">
                <Gem className="h-6 w-6" />
                <span className="text-lg font-bold">{diamonds}</span>
                </div>
                <div className="flex flex-col items-center gap-0">
                    <div className="flex items-center gap-2 font-semibold text-primary">
                        <Heart className="h-6 w-6" />
                        <span className="text-lg font-bold">{hearts}</span>
                    </div>
                    {hearts < 5 && <CooldownTimer />}
                </div>
            </div>
        </div>
        
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Lessons Completed</CardTitle>
                    <BookCheck className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{grammarStats.lessonsCompleted} / {grammarStats.totalLessons}</div>
                    <p className="text-xs text-muted-foreground">Total lessons read</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Overall Challenge Progress</CardTitle>
                    <BarChart3 className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <div className="text-2xl font-bold">{grammarStats.overallProgressPercentage}%</div>
                        <Progress value={grammarStats.overallProgressPercentage} className="h-2 flex-1" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Current Level: {grammarStats.currentChallengeLevel}
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Challenges Passed</CardTitle>
                    <Trophy className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{grammarStats.totalChallengesPassed}</div>
                    <p className="text-xs text-muted-foreground">Total stages completed</p>
                </CardContent>
            </Card>
        </div>

        <Tabs defaultValue={defaultTab} className="w-full">
             <TabsList className="border-b w-full justify-start rounded-none bg-transparent p-0">
                <TabsTrigger value="library" className="relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">Lessons Library</TabsTrigger>
                <TabsTrigger value="checker" className="relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">Grammar Checker</TabsTrigger>
                <TabsTrigger value="challenges" className="relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">Challenges</TabsTrigger>
            </TabsList>
            <TabsContent value="library" className="mt-6">
                <GrammarLessonsView />
            </TabsContent>
             <TabsContent value="checker" className="mt-6">
                <GrammarCheckerTool />
            </TabsContent>
            <TabsContent value="challenges" className="mt-6">
                 <ChallengesView />
            </TabsContent>
        </Tabs>
    </div>
    <ShopDialog isOpen={isShopOpen} onOpenChange={setIsShopOpen} />
    </>
  );
}
