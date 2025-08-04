

'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChallengesView } from './challenges-view';
import { GrammarCheckerTool } from './checker-view';
import { useSearchParams } from 'next/navigation';
import { useGlobalState } from '@/hooks/use-global-state';
import { useUserStats } from '@/hooks/use-user-stats';
import { useChallengeProgress } from '@/hooks/use-challenge-progress';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { BookCheck, BarChart3, Trophy, Heart, Gem, Store } from 'lucide-react';
import { useMemo, useState, useEffect, useRef } from 'react';
import { Progress } from '@/components/ui/progress';
import { GrammarLessonsView } from './lessons-view';
import { ShopDialog } from './shop-dialog';
import { Button } from '@/components/ui/button';
import { Howl } from 'howler';
import { useContentApi } from '@/hooks/use-content-api';

const CooldownTimer = ({ onHeartChange }: { onHeartChange: (hearts: number) => void }) => {
    const { hearts, lastHeartLossTimestamp, loading, updateHearts } = useUserStats();
    const [timeLeft, setTimeLeft] = useState('');
    const [localHearts, setLocalHearts] = useState(hearts);
    const HEART_REGEN_MINUTES = 30;
    const hasRegenerated = useRef(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Sync local hearts with database hearts and notify parent
    useEffect(() => {
        setLocalHearts(hearts);
        onHeartChange(hearts);
    }, [hearts, onHeartChange]);

    useEffect(() => {
        // Clear any existing interval
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        // If hearts are full or loading, don't show timer
        if (hearts >= 5 || loading) {
            setTimeLeft('');
            hasRegenerated.current = false;
            return;
        }

        // If no timestamp but hearts < 5, start counting from now
        const startTime = lastHeartLossTimestamp || Date.now();

        intervalRef.current = setInterval(async () => {
            const timePassed = Date.now() - startTime;
            const cooldown = HEART_REGEN_MINUTES * 60 * 1000;
            const remainingTime = Math.max(0, cooldown - timePassed);

            if (remainingTime === 0) {
                setTimeLeft('Next heart soon!');

                // Auto-increment heart when countdown reaches zero (only once)
                if (hearts < 5 && !hasRegenerated.current) {
                    hasRegenerated.current = true;

                    // Immediately update UI for smooth animation
                    const newLocalHearts = localHearts + 1;
                    setLocalHearts(newLocalHearts);
                    onHeartChange(newLocalHearts);

                    // Update database
                    const newHearts = hearts + 1;
                    const success = await updateHearts(newHearts);
                    if (success) {
                        console.log('✅ Heart regenerated automatically!');
                    } else {
                        console.error('❌ Failed to regenerate heart automatically');
                        hasRegenerated.current = false; // Reset if failed
                        // Revert UI if database update failed
                        setLocalHearts(hearts);
                        onHeartChange(hearts);
                    }
                }
            } else {
                const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
                const seconds = Math.floor((remainingTime / 1000) % 60);
                setTimeLeft(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
            }
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [lastHeartLossTimestamp, loading, localHearts, hearts, onHeartChange]); // Added localHearts and onHeartChange

    // Show timer if hearts < 5 and not loading
    if (hearts >= 5 || loading) return null;

    return <>{timeLeft}</>;
}

export function GrammarView() {
    const searchParams = useSearchParams();
    const defaultTab = searchParams.get('tab') || 'library';
    const { appData } = useGlobalState();
    const { hearts, diamonds, loading: statsLoading } = useUserStats();
    const { progress: challengeProgress, loading: progressLoading } = useChallengeProgress();
    const [localHearts, setLocalHearts] = useState(hearts);
    const [localDiamonds, setLocalDiamonds] = useState(diamonds);
    const [isShopOpen, setIsShopOpen] = useState(false);
    const { grammarLessons, loading: lessonsLoading } = useContentApi();

    // Sync local state with database values
    useEffect(() => {
        setLocalHearts(hearts);
        setLocalDiamonds(diamonds);
    }, [hearts, diamonds]);

    const shopSoundRef = useRef<Howl | null>(null);

    useEffect(() => {
        shopSoundRef.current = new Howl({ src: ['/sounds/shop.mp3'], volume: 0.7 });
        return () => {
            shopSoundRef.current?.unload();
        }
    }, []);

    const grammarStats = useMemo(() => {
        // Use dynamic grammar lessons data from database
        const lessonsCompleted = grammarLessons.filter(l => l.user_read).length;
        const totalLessons = grammarLessons.length;
        const { challengeData, currentChallengeLevel } = appData;
        const allLevels: ('N5' | 'N4' | 'N3' | 'N2' | 'N1')[] = ['N5', 'N4', 'N3', 'N2', 'N1'];

        let totalCompletedStages = 0;
        let totalAvailableStages = 0;

        allLevels.forEach(level => {
            const levelData = (challengeData as any)[level];
            const unitsInLevel = Object.keys(levelData || {});
            unitsInLevel.forEach(unitId => {
                const unitData = levelData?.[unitId];
                if (unitData) {
                    const stages = Object.keys(unitData);
                    totalAvailableStages += stages.length;
                    stages.forEach(stageId => {
                        // Use database challenge progress instead of localStorage
                        const progressData = challengeProgress[level];
                        if (progressData?.[unitId]?.[stageId] === 'completed') {
                            totalCompletedStages++;
                        }
                    });
                }
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
            totalAvailableStages,
        };

    }, [appData, grammarLessons, challengeProgress]); // Added challengeProgress dependency

    const handleOpenShop = () => {
        shopSoundRef.current?.play();
        setIsShopOpen(true);
    }

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
                        <Button variant="outline" onClick={handleOpenShop}>
                            <Store className="h-4 w-4 mr-2" />
                            Shop
                        </Button>
                        <div className="flex items-center h-10 px-3 rounded-md border border-input bg-background font-semibold text-yellow-500">
                            <Gem className="h-5 w-5 mr-2" />
                            <span className="text-foreground">{statsLoading ? '...' : localDiamonds}</span>
                        </div>
                        <div className="flex items-center h-10 px-3 rounded-md border border-input bg-background font-semibold text-red-500">
                            <Heart className="h-5 w-5 mr-2 fill-current" />
                            <span className="text-foreground">{statsLoading ? '...' : localHearts}</span>
                            {hearts < 5 && !statsLoading && (
                                <span className="text-xs text-muted-foreground ml-2 font-mono">
                                    <CooldownTimer onHeartChange={setLocalHearts} />
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
                            <p className="text-xs text-muted-foreground">
                                {grammarStats.totalLessons} total lessons
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Challenge Progress</CardTitle>
                            <Trophy className="h-4 w-4 text-yellow-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {progressLoading ? '...' : grammarStats.totalChallengesPassed} / {grammarStats.totalAvailableStages}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {progressLoading ? 'Loading...' : `${grammarStats.overallProgressPercentage}% completed`}
                            </p>
                            {!progressLoading && (
                                <Progress
                                    value={grammarStats.overallProgressPercentage}
                                    className="mt-2"
                                />
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Current Level</CardTitle>
                            <BarChart3 className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{grammarStats.currentChallengeLevel}</div>
                            <p className="text-xs text-muted-foreground">
                                Challenge difficulty
                            </p>
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
                        className="mt-6 relative isolate overflow-hidden rounded-lg before:absolute before:inset-0 before:bg-[url('/images/jpmap.png')] before:bg-cover before:bg-center before:bg-no-repeat before:opacity-15 before:grayscale before:content-['']"
                    >
                        <div className="relative z-10">
                            <ChallengesView />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
            <ShopDialog
                isOpen={isShopOpen}
                onOpenChange={setIsShopOpen}
                onHeartsChange={setLocalHearts}
                onDiamondsChange={setLocalDiamonds}
            />
        </>
    );
}
