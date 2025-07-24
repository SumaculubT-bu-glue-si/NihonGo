

'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GrammarLessonsView } from './lessons-view';
import { ChallengesView } from './challenges-view';
import { GrammarCheckerTool } from './checker-view';
import { useSearchParams } from 'next/navigation';
import { useGlobalState } from '@/hooks/use-global-state';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BookCheck, BarChart3, Trophy } from 'lucide-react';
import { useMemo } from 'react';
import { Progress } from '@/components/ui/progress';

export function GrammarView() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'library';
  const { appData } = useGlobalState();
  
  const grammarStats = useMemo(() => {
    // Lessons Completed
    const lessonsCompleted = appData.grammarLessons.filter(l => l.read).length;
    const totalLessons = appData.grammarLessons.length;

    // Challenge Progress for all levels
    const { challengeData, challengeProgress } = appData;
    const allLevels: ('N5'|'N4'|'N3'|'N2'|'N1')[] = ['N5', 'N4', 'N3', 'N2', 'N1'];
    
    const progressByLevel = allLevels.map(level => {
        const unitsInLevel = Object.keys(challengeData[level] || {});
        if (unitsInLevel.length === 0) {
            return { level, percentage: 0 };
        }

        let stagesCompletedInLevel = 0;
        let totalStagesInLevel = 0;

        unitsInLevel.forEach(unitId => {
            const stages = Object.keys(challengeData[level][unitId]);
            totalStagesInLevel += stages.length;
            stages.forEach(stageId => {
                if (challengeProgress[level]?.[unitId]?.[stageId] === 'completed') {
                    stagesCompletedInLevel++;
                }
            });
        });
        
        return {
            level,
            percentage: totalStagesInLevel > 0 ? Math.round((stagesCompletedInLevel / totalStagesInLevel) * 100) : 0,
        };
    });

    // Total challenges passed
    let totalChallengesPassed = 0;
    Object.values(challengeProgress).forEach(levelData => {
        Object.values(levelData).forEach(unitData => {
            totalChallengesPassed += Object.values(unitData).filter(s => s === 'completed').length;
        })
    })

    return {
        lessonsCompleted,
        totalLessons,
        progressByLevel,
        totalChallengesPassed,
    };

  }, [appData]);
    
  return (
    <div className="container mx-auto space-y-8">
        <div>
            <h1 className="text-3xl font-bold font-headline">Grammar</h1>
            <p className="text-muted-foreground">
            Explore grammar points, check your sentences, and build your own library.
            </p>
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
                <CardContent className="space-y-1 pt-2">
                   {grammarStats.progressByLevel.map(p => (
                    <div key={p.level} className="flex items-center gap-2">
                        <span className="text-xs font-semibold w-8">{p.level}</span>
                        <Progress value={p.percentage} className="h-2 flex-1" />
                        <span className="text-xs font-semibold w-10 text-right">{p.percentage}%</span>
                    </div>
                   ))}
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
  );
}
