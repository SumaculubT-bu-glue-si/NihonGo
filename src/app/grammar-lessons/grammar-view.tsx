

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
                className="mt-6 bg-[#2e3856] rounded-lg bg-[url('data:image/svg+xml,%3csvg%20width=%27800%27%20height=%27800%27%20xmlns=%27http://www.w3.org/2000/svg%27%3e%3cpath%20d=%27M392.8,219.8c-1.3-1-3.2-1.7-3.9-2.9c-2.3-4.1,1.1-7.1,1.1-7.1s-3.4,0.3-6.8,1.2c-4.6,1.2-8.2,3.2-10.9,4.4c-8.1,3.7-12.2,9.7-18.4,14.2c-4,3-8.8,5.1-13.4,7.1c-1.3,0.6-2.6,1-3.9,1.6c-1.3,0.6-2.6,1.2-3.8,1.9c-1.2,0.7-2.4,1.4-3.5,2.1c-1.1,0.7-2.1,1.4-3,2.2c-1.8,1.6-3.2,3.5-4.5,5.3c-1.3,1.8-2.5,3.7-3.5,5.6c-1,2-1.8,3.9-2.4,5.9c-0.6,2-1.1,3.9-1.4,5.8c-0.6,3.8-0.6,7.7-1.4,11.5c-0.2,1-0.4,1.9-0.6,2.9c-0.2,1-0.3,1.9-0.3,2.9c-0.1,1.9,0.1,3.8,0.5,5.7c0.2,1,0.5,1.9,0.8,2.8c0.3,0.9,0.7,1.8,1.1,2.7c0.4,0.9,0.8,1.7,1.3,2.5c0.9,1.6,2.1,3,3.4,4.3c1.3,1.3,2.8,2.4,4.3,3.4c1.6,1,3.2,1.8,4.9,2.5c1.7,0.7,3.5,1.3,5.3,1.7c3.6,0.9,7.3,0.9,10.9,1.4c2.4,0.3,4.8,0.5,7.2,0.5c1.2,0,2.4-0.1,3.6-0.1c1.2,0,2.4-0.1,3.6-0.2c1.2-0.1,2.4-0.3,3.6-0.5c1.2-0.2,2.4-0.4,3.5-0.7c2.2-0.6,4.3-1.4,6.3-2.5c2-1.1,3.9-2.4,5.6-4c3.4-3.2,5.2-7.5,6.5-11.8c0.6-2.1,1.1-4.2,1.5-6.3c0.4-2.1,0.6-4.2,0.8-6.3c0.2-2.1,0.2-4.2,0.2-6.3c0-1.1-0.1-2.1-0.1-3.2c-0.1-1.1-0.2-2.1-0.3-3.2c-0.1-1.1-0.3-2.1-0.5-3.2c-0.2-1.1-0.4-2.1-0.7-3.2c-0.6-2.1-1.4-4.1-2.5-6c-1.1-1.9-2.4-3.7-4-5.4c-1.6-1.7-3.4-3.3-5.3-4.7c-2-1.4-4-2.6-6.2-3.6c-2.2-1-4.4-1.8-6.7-2.5c-2.3-0.6-4.6-1.1-6.9-1.5c-2.3-0.4-4.7-0.7-7-0.8c-1.2-0.1-2.4-0.1-3.6-0.1c-1.2,0-2.4,0-3.6,0.1c-1.2,0-2.4,0.1-3.5,0.2c-1.2,0.1-2.3,0.2-3.5,0.4c-1.2,0.2-2.3,0.4-3.4,0.6c-1.1,0.2-2.2,0.5-3.3,0.8c-1.1,0.3-2.1,0.6-3.1,1c-1,0.4-2,0.8-2.9,1.2c-0.9,0.4-1.8,0.9-2.7,1.4c-1.8,1-3.4,2.2-5,3.5c-1.6,1.3-3,2.8-4.3,4.3c-1.3,1.6-2.4,3.2-3.4,4.9c-1,1.7-1.8,3.5-2.5,5.3c-0.7,1.8-1.3,3.7-1.7,5.6c-0.4,1.9-0.8,3.8-1,5.7c-0.2,1.9-0.4,3.8-0.4,5.7c0,1.9,0.1,3.8,0.2,5.7c0.1,1.9,0.3,3.8,0.6,5.7c0.3,1.9,0.6,3.7,1,5.6c0.4,1.9,0.8,3.7,1.3,5.5c0.5,1.8,1,3.6,1.6,5.4c0.6,1.8,1.2,3.5,1.9,5.2c0.7,1.7,1.4,3.4,2.2,5c1.6,3.2,3.5,6.2,5.7,9c2.2,2.8,4.5,5.4,7.1,7.7c1.3,1.1,2.6,2.2,4,3.2c1.4,1,2.8,1.9,4.2,2.8c1.4,0.9,2.9,1.7,4.3,2.4c1.5,0.7,2.9,1.4,4.4,2c1.5,0.6,3,1.1,4.5,1.6c1.5,0.5,3,0.9,4.5,1.2c1.5,0.3,3,0.6,4.5,0.8c1.5,0.2,3,0.4,4.5,0.5c3,0.2,6,0.2,9,0.1c1.5,0,3-0.1,4.5-0.1c1.5,0,3-0.1,4.5-0.2c1.5-0.1,3-0.3,4.4-0.5c1.5-0.2,2.9-0.5,4.3-0.8c1.4-0.3,2.8-0.7,4.2-1.1c1.4-0.4,2.8-0.8,4.1-1.3c1.3-0.5,2.6-1.1,3.9-1.7c1.3-0.6,2.5-1.2,3.7-1.9c2.4-1.4,4.6-3,6.6-4.9c2-1.9,3.8-3.9,5.4-6.2c1.6-2.2,3-4.5,4.1-7c1.1-2.4,2.1-4.9,2.8-7.4c0.7-2.5,1.2-5,1.5-7.5c0.3-2.5,0.5-5,0.5-7.5c0-1.2-0.1-2.5-0.1-3.7c-0.1-1.2-0.2-2.5-0.3-3.7c-0.1-1.2-0.3-2.5-0.5-3.7c-0.2-1.2-0.4-2.4-0.7-3.6c-0.6-2.4-1.3-4.8-2.2-7.1c-0.9-2.3-2-4.5-3.3-6.6c-1.3-2.1-2.7-4.1-4.3-6c-1.6-1.9-3.3-3.7-5.1-5.3c-1.8-1.6-3.7-3.1-5.7-4.5c-2-1.3-4-2.5-6.1-3.5c-2.1-1-4.3-1.8-6.5-2.5c-2.2-0.7-4.4-1.2-6.7-1.6c-1.1-0.2-2.3-0.4-3.4-0.5c-1.1-0.1-2.3-0.2-3.4-0.3c-1.1-0.1-2.2-0.1-3.4-0.2c-1.1,0-2.2-0.1-3.3-0.1c-1.1,0-2.2,0-3.3,0.1c-1.1,0.1-2.2,0.1-3.2,0.2c-1.1,0.1-2.1,0.2-3.2,0.4c-1,0.2-2,0.3-3,0.5c-1,0.2-2,0.4-2.9,0.7c-1.9,0.6-3.8,1.3-5.5,2.2c-1.8,0.9-3.4,2-5,3.2c-1.6,1.2-3.1,2.5-4.5,4c-1.4,1.5-2.7,3-3.8,4.7c-1.1,1.7-2.1,3.4-3,5.2c-0.9,1.8-1.6,3.6-2.2,5.5c-0.6,1.9-1.1,3.8-1.5,5.7c-0.4,1.9-0.7,3.8-0.9,5.7c-0.4,3.8-0.4,7.6-0.7,11.4c-0.1,1.9-0.1,3.8-0.1,5.7c0,1.9,0.1,3.8,0.2,5.7c0.1,1.9,0.3,3.7,0.5,5.6c0.2,1.9,0.5,3.7,0.8,5.5c0.6,3.6,1.5,7.1,2.8,10.5c0.6,1.7,1.3,3.4,2,5.1c0.7,1.7,1.4,3.3,2.2,4.9c1.6,3.2,3.5,6.2,5.6,9c2.1,2.8,4.4,5.4,6.9,7.7c2.5,2.4,5.1,4.5,7.8,6.4c1.3,0.9,2.7,1.8,4.1,2.6c1.4,0.8,2.8,1.6,4.2,2.3c1.4,0.7,2.8,1.4,4.3,2c1.5,0.6,2.9,1.1,4.4,1.6c1.5,0.5,3,0.9,4.5,1.2c1.5,0.3,3,0.6,4.5,0.8c1.5,0.2,3,0.4,4.5,0.5c1.5,0.1,3,0.2,4.5,0.2c1.5,0,3,0.1,4.5,0.1c1.5,0,3,0,4.5-0.1c1.5-0.1,2.9-0.2,4.4-0.4c1.4-0.2,2.8-0.4,4.2-0.7c1.4-0.3,2.8-0.6,4.1-1c1.3-0.4,2.6-0.8,3.9-1.2c1.3-0.4,2.6-0.9,3.8-1.4c1.2-0.5,2.4-1.1,3.6-1.7c2.4-1.2,4.6-2.6,6.6-4.3c2-1.7,3.8-3.6,5.4-5.7c1.6-2.1,3-4.4,4.1-6.8c1.1-2.4,2.1-4.8,2.8-7.3c0.7-2.5,1.2-5,1.5-7.5c0.3-2.5,0.5-5.1,0.5-7.6c-2.4,0.3-4.8,0.5-7.2,0.5c-1.2,0-2.4-0.1-3.6-0.1c-1.2,0-2.4-0.1-3.6-0.2c-1.2-0.1-2.4-0.3-3.6-0.5c-1.2-0.2-2.4-0.4-3.5-0.7c-2.2-0.6-4.3-1.4-6.3-2.5c-2-1.1-3.9-2.4-5.6-4c-1.7-1.6-3.2-3.4-4.5-5.3c-1.3-1.9-2.5-3.9-3.5-5.9c-1-2-1.8-4.1-2.4-6.2c-0.6-2.1-1.1-4.2-1.4-6.3c-0.3-2.1-0.4-4.2-0.4-6.3c0-1.1,0.1-2.1,0.1-3.2c0-1.1,0.1-2.1,0.2-3.2c0.1-1.1,0.2-2.1,0.3-3.2c0.1-1.1,0.3-2.1,0.4-3.2c0.2-1.1,0.4-2.1,0.6-3.2c0.2-1.1,0.5-2.1,0.7-3.2c0.2-1,0.5-2,0.8-3c0.3-1,0.6-1.9,0.9-2.9c0.3-1,0.7-1.9,1.1-2.8c0.4-0.9,0.8-1.8,1.2-2.7c0.9-1.8,1.9-3.5,3.1-5.1c1.2-1.6,2.5-3.2,3.9-4.6c1.4-1.4,2.9-2.7,4.5-3.9c1.6-1.2,3.2-2.3,4.9-3.3c1.7-1,3.5-1.8,5.3-2.5c1.8-0.7,3.6-1.3,5.4-1.8c1.8-0.5,3.7-0.9,5.5-1.2c1.8-0.3,3.7-0.6,5.5-0.7c1.8-0.2,3.6-0.3,5.4-0.4c1.8-0.1,3.6-0.1,5.4-0.1c1.8,0,3.6,0,5.4,0.1c1.8,0.1,3.5,0.1,5.3,0.2c1.8,0.1,3.5,0.3,5.2,0.5c1.7,0.2,3.4,0.4,5.1,0.7c1.7,0.3,3.3,0.6,4.9,1c1.6,0.4,3.2,0.8,4.7,1.2c1.5,0.4,3,0.9,4.4,1.4c1.4,0.5,2.8,1,4.2,1.6c2.8,1.2,5.4,2.6,7.8,4.3c1.2,0.8,2.4,1.7,3.5,2.6c1.1,0.9,2.2,1.8,3.2,2.8c1,1,1.9,2,2.8,3.1c1.8,2.2,3.3,4.6,4.6,7.1c0.6,1.2,1.2,2.5,1.8,3.7c0.6,1.2,1.1,2.5,1.6,3.7c0.5,1.2,0.9,2.4,1.3,3.7c0.4,1.2,0.8,2.4,1.1,3.7c0.3,1.2,0.6,2.4,0.8,3.7c0.2,1.2,0.4,2.4,0.5,3.7c0.1,1.2,0.2,2.5,0.3,3.7c0.1,1.2,0.1,2.5,0.1,3.7c0,1.2,0,2.5,0,3.7c0,1.2,0,2.5,0,3.7c0,1.2,0,2.5,0,3.7c0,1.2-0.1,2.5-0.1,3.7c-0.1,1.2-0.1,2.5-0.2,3.7c-0.1,1.2-0.2,2.5-0.4,3.7c-0.2,1.2-0.3,2.5-0.5,3.7c-0.2,1.2-0.5,2.4-0.7,3.6c-0.2,1.2-0.5,2.4-0.8,3.6c-0.3,1.2-0.6,2.4-1,3.6c-0.8,2.4-1.7,4.7-2.8,6.9c-1.1,2.2-2.3,4.3-3.7,6.3c-1.4,2-2.9,3.9-4.5,5.6c-1.6,1.7-3.3,3.3-5.1,4.8c-1.8,1.5-3.6,2.8-5.5,4c-1.9,1.2-3.8,2.2-5.8,3.1c-2,0.9-4,1.6-6,2.2c-2,0.6-4,1.1-6,1.5c-2,0.4-4,0.7-6,0.9c-2,0.2-3.9,0.4-5.9,0.5c-2,0.1-3.9,0.2-5.9,0.2c-2,0-3.9,0-5.9-0.1c-2-0.1-3.9-0.2-5.8-0.3c-1.9-0.1-3.8-0.3-5.7-0.5c-1.9-0.2-3.7-0.5-5.5-0.8c-1.8-0.3-3.6-0.6-5.3-1c-1.7-0.4-3.4-0.8-5.1-1.3c-1.7-0.5-3.3-1-4.9-1.6c-1.6-0.6-3.2-1.2-4.7-1.9c-1.5-0.7-3-1.4-4.4-2.1c-1.4-0.8-2.8-1.5-4.2-2.3c-2.8-1.6-5.4-3.5-7.8-5.6c-1.2-1.1-2.4-2.2-3.5-3.3c-1.1-1.1-2.2-2.3-3.2-3.5c-1-1.2-1.9-2.4-2.8-3.7c-1.8-2.6-3.3-5.3-4.6-8.1c-0.6-1.4-1.2-2.8-1.8-4.2c-0.6-1.4-1.1-2.8-1.6-4.2c-0.5-1.4-0.9-2.8-1.3-4.2c-0.4-1.4-0.8-2.8-1.1-4.2c-0.3-1.4-0.6-2.8-0.8-4.2c-0.2-1.4-0.4-2.8-0.5-4.2c-0.1-1.4-0.2-2.8-0.3-4.2c-0.1-1.4-0.1-2.8-0.1-4.3c-0.2,2.3-0.2,4.6-0.1,6.9c0,1.2,0.1,2.3,0.1,3.5c0.1,1.2,0.2,2.3,0.3,3.5c0.1,1.2,0.3,2.3,0.5,3.5c0.2,1.2,0.4,2.3,0.7,3.5c0.6,2.3,1.3,4.6,2.2,6.8c0.9,2.2,2,4.3,3.3,6.4c1.3,2.1,2.7,4.1,4.3,6c1.6,1.9,3.3,3.7,5.1,5.3c1.8,1.6,3.7,3.1,5.7,4.5c2,1.3,4,2.5,6.1,3.5c2.1,1,4.3,1.8,6.5,2.5c2.2,0.7,4.4,1.2,6.7,1.6c1.1,0.2,2.3,0.4,3.4,0.5c1.1,0.1,2.3,0.2,3.4,0.3c1.1,0.1,2.2,0.1,3.4,0.2c1.1,0,2.2,0.1,3.3,0.1c1.1,0,2.2,0,3.3-0.1c1.1-0.1,2.2-0.1,3.2-0.2c1.1-0.1,2.1-0.2,3.2-0.4c1-0.2,2-0.3,3-0.5c1-0.2,2-0.4,2.9-0.7c1.9-0.6,3.8-1.3,5.5-2.2c1.8-0.9,3.4-2,5-3.2c1.6-1.2,3.1-2.5,4.5-4c1.4-1.5,2.7-3,3.8-4.7c1.1-1.7,2.1-3.4,3-5.2c0.9-1.8,1.6-3.6,2.2-5.5c0.6-1.9,1.1-3.8,1.5-5.7c0.4-1.9,0.7-3.8,0.9-5.7c0.4-3.8,0.4-7.6,0.7-11.4c0.1-1.9,0.1-3.8,0.1-5.7c0-1.9-0.1-3.8-0.2-5.7c-0.1-1.9-0.3-3.7-0.5-5.6c-0.2-1.9-0.5-3.7-0.8-5.5c-0.6-3.6-1.5-7.1-2.8-10.5c-0.6-1.7-1.3-3.4-2-5.1c-0.7-1.7-1.4-3.3-2.2-4.9c-1.6-3.2-3.5-6.2-5.6-9c-2.1-2.8-4.4-5.4-6.9-7.7c-1.3-1.1-2.6-2.2-4-3.2c-1.4-1-2.8-1.9-4.2-2.8c-1.4-0.9-2.9-1.7-4.3-2.4c-1.5-0.7-2.9-1.4-4.4-2c-1.5-0.6-3-1.1-4.5-1.6c-1.5-0.5-3-0.9-4.5-1.2c-1.5-0.3-3-0.6-4.5-0.8c-1.5-0.2-3-0.4-4.5-0.5c-3-0.2-6-0.2-9-0.1c-1.5,0-3,0.1-4.5,0.1c-1.5,0-3,0.1-4.5,0.2c-1.5,0.1-3,0.3-4.4,0.5c-1.5,0.2-2.9,0.5-4.3,0.8c-1.4,0.3-2.8,0.7-4.2,1.1c-1.4,0.4-2.8,0.8-4.1,1.3c-1.3,0.5-2.6,1.1-3.9,1.7c-1.3,0.6-2.5,1.2-3.7,1.9c-2.4,1.4-4.6,3-6.6,4.9c-2,1.9-3.8,3.9-5.4,6.2c-1.6,2.2-3,4.5-4.1,7c-1.1,2.4-2.1,4.9-2.8,7.4c-0.7,2.5-1.2,5-1.5,7.5c-0.3,2.5-0.5,5.1-0.5,7.6c-2.4,0.3-4.8,0.5-7.2,0.5c-1.2,0-2.4-0.1-3.6-0.1c-1.2,0-2.4-0.1-3.6-0.2c-1.2-0.1-2.4-0.3-3.6-0.5c-1.2-0.2-2.4-0.4-3.5-0.7c-2.2-0.6-4.3-1.4-6.3-2.5c-2-1.1-3.9-2.4-5.6-4c-1.7-1.6-3.2-3.4-4.5-5.3c-1.3-1.9-2.5-3.9-3.5-5.9c-1-2-1.8-4.1-2.4-6.2c-0.6-2.1-1.1-4.2-1.4-6.3c-0.3-2.1-0.4-4.2-0.4-6.3c0-1.1,0.1-2.1,0.1-3.2c0-1.1,0.1-2.1,0.2-3.2c0.1-1.1,0.2-2.1,0.3-3.2c0.1-1.1,0.3-2.1,0.4-3.2c0.2-1.1,0.4-2.1,0.6-3.2c0.2-1.1,0.5-2.1,0.7-3.2c0.2-1,0.5-2,0.8-3c0.3-1,0.6-1.9,0.9-2.9c0.3-1,0.7-1.9,1.1-2.8c0.4-0.9,0.8-1.8,1.2-2.7c0.9-1.8,1.9-3.5,3.1-5.1c1.2-1.6,2.5-3.2,3.9-4.6c1.4-1.4,2.9-2.7,4.5-3.9c1.6-1.2,3.2-2.3,4.9-3.3c1.7-1,3.5-1.8,5.3-2.5c1.8-0.7,3.6-1.3,5.4-1.8c1.8-0.5,3.7-0.9,5.5-1.2c1.8-0.3,3.7-0.6,5.5-0.7c1.8-0.2,3.6-0.3,5.4-0.4c1.8-0.1,3.6-0.1,5.4-0.1c1.8,0,3.6,0,5.4,0.1c1.8,0.1,3.5,0.1,5.3,0.2c1.8,0.1,3.5,0.3,5.2,0.5c1.7,0.2,3.4,0.4,5.1,0.7c1.7,0.3,3.3,0.6,4.9,1c1.6,0.4,3.2,0.8,4.7,1.2c1.5,0.4,3,0.9,4.4,1.4c1.4,0.5,2.8,1,4.2,1.6c2.8,1.2,5.4,2.6,7.8,4.3c1.2,0.8,2.4,1.7,3.5,2.6c1.1,0.9,2.2,1.8,3.2,2.8c1,1,1.9,2,2.8,3.1c1.8,2.2,3.3,4.6,4.6,7.1c0.6,1.2,1.2,2.5,1.8,3.7c0.6,1.2,1.1,2.5,1.6,3.7c0.5,1.2,0.9,2.4,1.3,3.7c0.4,1.2,0.8,2.4,1.1,3.7c0.3,1.2,0.6,2.4,0.8,3.7c0.2,1.2,0.4,2.4,0.5,3.7c0.1,1.2,0.2,2.5,0.3,3.7c0.1,1.2,0.1,2.5,0.1,3.7c0,1.2,0,2.5,0,3.7c0,1.2,0,2.5,0,3.7c0,1.2,0,2.5,0,3.7c0,1.2-0.1,2.5-0.1,3.7c-0.1,1.2-0.1,2.5-0.2,3.7c-0.1,1.2-0.2,2.5-0.4,3.7c-0.2,1.2-0.3,2.5-0.5,3.7c-0.2,1.2-0.5,2.4-0.7,3.6c-0.2,1.2-0.5,2.4-0.8,3.6c-0.3,1.2-0.6,2.4-1,3.6c-0.8,2.4-1.7,4.7-2.8,6.9c-1.1,2.2-2.3,4.3-3.7,6.3c-1.4,2-2.9,3.9-4.5,5.6c-1.6,1.7-3.3,3.3-5.1,4.8c-1.8,1.5-3.6,2.8-5.5,4c-1.9,1.2-3.8,2.2-5.8,3.1c-2,0.9-4,1.6-6,2.2c-2,0.6-4,1.1-6,1.5c-2,0.4-4,0.7-6,0.9c-2,0.2-3.9,0.4-5.9,0.5c-2,0.1-3.9,0.2-5.9,0.2c-2,0-3.9,0-5.9-0.1c-2-0.1-3.9-0.2-5.8-0.3c-1.9-0.1-3.8-0.3-5.7-0.5c-1.9-0.2-3.7-0.5-5.5-0.8c-1.8-0.3-3.6-0.6-5.3-1c-1.7-0.4-3.4-0.8-5.1-1.3c-1.7-0.5-3.3-1-4.9-1.6c-1.6-0.6-3.2-1.2-4.7-1.9c-1.5-0.7-3-1.4-4.4-2.1c-1.4-0.8-2.8-1.5-4.2-2.3c-2.8-1.6-5.4-3.5-7.8-5.6c-1.2-1.1-2.4-2.2-3.5-3.3c-1.1-1.1-2.2-2.3-3.2-3.5c-1-1.2-1.9-2.4-2.8-3.7c-1.8-2.6-3.3-5.3-4.6-8.1c-0.6-1.4-1.2-2.8-1.8-4.2c-0.6-1.4-1.1-2.8-1.6-4.2c-0.5-1.4-0.9-2.8-1.3-4.2c-0.4-1.4-0.8-2.8-1.1-4.2c-0.3-1.4-0.6-2.8-0.8-4.2c-0.2-1.4-0.4-2.8-0.5-4.2c-0.1-1.4-0.2-2.8-0.3-4.2c-0.1-1.4-0.1-2.8-0.1-4.3z%27%20fill=%27%233e4a68%27%20fill-opacity=%270.4%27/%3e%3c/svg%3e')] bg-repeat"
                >
                 <ChallengesView />
            </TabsContent>
        </Tabs>
    </div>
    <ShopDialog isOpen={isShopOpen} onOpenChange={setIsShopOpen} />
    </>
  );
}
