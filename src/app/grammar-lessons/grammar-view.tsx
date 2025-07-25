

'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChallengesView } from './challenges-view';
import { GrammarCheckerTool } from './checker-view';
import { useSearchParams } from 'next/navigation';
import { useGlobalState } from '@/hooks/use-global-state';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { BookCheck, BarChart3, Trophy, Heart, Gem, Store } from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { GrammarLessonsView } from './lessons-view';
import { ShopDialog } from './shop-dialog';
import { Button } from '@/components/ui/button';

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
        setTimeLeft(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [hearts, lastHeartLossTimestamp]);
  
  if (!timeLeft || hearts >= 5) return null;

  return <>{timeLeft}</>;
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
             <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => setIsShopOpen(true)}>
                    <Store className="h-4 w-4 mr-2" />
                    Shop
                </Button>
                <div className="flex items-center h-10 px-3 rounded-md border border-input bg-background font-semibold text-yellow-500">
                    <Gem className="h-5 w-5 mr-2" />
                    <span className="text-foreground">{diamonds}</span>
                </div>
                 <div className="flex items-center h-10 px-3 rounded-md border border-input bg-background font-semibold text-red-500">
                    <Heart className="h-5 w-5 mr-2 fill-current" />
                    <span className="text-foreground">{hearts}</span>
                     {hearts < 5 && (
                        <span className="text-xs text-muted-foreground ml-2 font-mono">
                            (<CooldownTimer />)
                        </span>
                    )}
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
                        <Progress value={grammarStats.overallProgressPercentage} className="h-2 flex-1 mt-2" />
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
            <TabsContent 
                value="challenges" 
                className="mt-6 relative isolate overflow-hidden bg-[#2e3856] rounded-lg before:absolute before:inset-0 before:bg-[url('/images/jpmap.png')] before:bg-cover before:bg-center before:bg-no-repeat before:opacity-20 before:grayscale before:content-['']"
            >
                <div className="relative z-10">
                    <ChallengesView />
                </div>
            </TabsContent>
        </Tabs>
    </div>
    <ShopDialog isOpen={isShopOpen} onOpenChange={setIsShopOpen} />
    </>
  );
}
