
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Pie, PieChart, Cell, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { type AppData, type StatsData, type QuizScore, type Quiz } from '@/lib/data';
import { analyzeProgress } from '@/ai/flows/analyze-progress-flow';
import { Loader2, Wand2, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StatsViewProps {
    appData: AppData;
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


export function StatsView({ appData }: StatsViewProps) {
  const [analysis, setAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(true); // Start analyzing on load

  const { deckStats, grammarStats, quizStats, quizChartData, grammarChartData } = useMemo(() => {
    // Deck Stats
    const deckStats = appData.userStats.map(stat => ({
        ...stat,
        percentage: stat.total > 0 ? Math.round((stat.progress / stat.total) * 100) : 0,
    }));
    
    // Grammar Stats
    const totalLessons = appData.grammarLessons.length;
    const readLessons = appData.grammarLessons.filter(l => l.read).length;
    const grammarStats = { read: readLessons, total: totalLessons };
    const grammarChartData = [
        { name: 'Read', value: readLessons, color: 'hsl(var(--primary))' },
        { name: 'Unread', value: totalLessons - readLessons, color: 'hsl(var(--muted))' }
    ];

    // Quiz Stats
    const scoresByLevel: Record<string, { totalScore: number; count: number; average: number }> = {};
    let totalScoreSum = 0;

    appData.quizScores.forEach(score => {
        const quiz = appData.quizzes.find(q => q.id === score.quizId);
        if (quiz) {
            if (!scoresByLevel[quiz.level]) {
                scoresByLevel[quiz.level] = { totalScore: 0, count: 0, average: 0 };
            }
            const scoreValue = score.highestScore; // This is the raw score now
            scoresByLevel[quiz.level].totalScore += scoreValue;
            scoresByLevel[quiz.level].count++;
            totalScoreSum += scoreValue;
        }
    });
    
    Object.keys(scoresByLevel).forEach(level => {
        const quizCountForLevel = appData.quizzes.filter(q => q.level === level && scoresByLevel[level].count > 0).reduce((acc, q) => acc + q.questions.length, 0);
        const averageRawScore = scoresByLevel[level].totalScore / scoresByLevel[level].count;
        const totalPossibleScore = quizCountForLevel > 0 ? (appData.quizzes.find(q => q.level === level)?.questions.length ?? 10) * scoresByLevel[level].count : 1;
        // The average is now based on percentage of raw scores
        scoresByLevel[level].average = Math.round((scoresByLevel[level].totalScore / totalPossibleScore) * 100);
    });
    
    const quizzesTakenCount = appData.quizScores.length;
    const totalQuestionsInTakenQuizzes = appData.quizScores.reduce((acc, score) => {
        const quiz = appData.quizzes.find(q => q.id === score.quizId);
        return acc + (quiz?.questions.length ?? 0);
    }, 0);

    const averageScore = totalQuestionsInTakenQuizzes > 0 ? Math.round((totalScoreSum / totalQuestionsInTakenQuizzes) * 100) : 0;
    
    const quizStats = {
      quizzesTaken: quizzesTakenCount,
      averageScore,
      scoresByLevel: Object.entries(scoresByLevel).reduce((acc, [level, data]) => {
          acc[level] = { average: data.average, count: data.count };
          return acc;
      }, {} as Record<string, {average: number; count: number}>)
    };
    
    const quizChartData = Object.entries(scoresByLevel).map(([name, data]) => ({
        name,
        Average: data.average
    })).sort((a,b) => a.name.localeCompare(b.name));


    return { deckStats, grammarStats, grammarChartData, quizStats, quizChartData };
  }, [appData]);
  
  useEffect(() => {
    const handleAnalyzeProgress = async () => {
        setIsAnalyzing(true);
        setAnalysis('');
        try {
            if (!deckStats.length && !grammarStats.total && !quizStats.quizzesTaken) {
                 setAnalysis("There's not enough data to analyze your progress yet. Start learning to see your stats here!");
                 return;
            }
            const result = await analyzeProgress({ deckStats, grammarStats, quizStats });
            setAnalysis(result.analysis);
        } catch (error) {
            console.error("Failed to analyze progress:", error);
            setAnalysis("Sorry, I couldn't analyze your progress right now. Please try again later.");
        } finally {
            setIsAnalyzing(false);
        }
    };
    handleAnalyzeProgress();
  }, [deckStats, grammarStats, quizStats]);
  
  return (
    <div className="space-y-6">
        <div>
            <h1 className="mb-2 text-3xl font-bold font-headline">Your Progress</h1>
            <p className="mb-6 text-muted-foreground">
                A visual overview of your learning journey so far.
            </p>
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>AI Analysis</span>
                </CardTitle>
                <CardDescription>Personalized feedback on your learning habits from your AI tutor, Go-sensei.</CardDescription>
            </CardHeader>
            <CardContent>
                {isAnalyzing && (
                    <div className="flex items-center gap-3 text-muted-foreground">
                        <Loader2 className="h-5 w-5 animate-spin"/>
                        <p>Go-sensei is analyzing your progress...</p>
                    </div>
                )}
                 {analysis && !isAnalyzing && (
                    <div className="prose prose-sm max-w-none space-y-2 rounded-md border bg-secondary/50 p-4 text-card-foreground leading-relaxed">
                       {analysis.split('\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Deck Completion</CardTitle>
                    <CardDescription>Percentage of cards completed in each deck.</CardDescription>
                </CardHeader>
                <CardContent className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={deckStats} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <XAxis 
                        dataKey="topic" 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        interval={0}
                        />
                        <YAxis 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}%`}
                        domain={[0, 100]}
                        />
                        <Tooltip
                        cursor={{ fill: 'hsl(var(--accent))', opacity: 0.3 }}
                        content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm text-center">
                                    <span className="text-sm font-bold text-foreground">{data.topic}</span>
                                    <p className="text-xs text-muted-foreground">{`${data.progress} / ${data.total} cards (${data.percentage}%)`}</p>
                                </div>
                            )
                            }
                            return null
                        }}
                        />
                        <Bar dataKey="percentage" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Grammar Progress</CardTitle>
                    <CardDescription>{grammarStats.read} of {grammarStats.total} lessons read.</CardDescription>
                </CardHeader>
                <CardContent className="h-64">
                     <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={grammarChartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {grammarChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                             <Legend iconSize={10} />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

        </div>

        <Card>
            <CardHeader>
                <CardTitle>Quiz Performance</CardTitle>
                <CardDescription>Average scores by JLPT level.</CardDescription>
            </CardHeader>
            <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                <BarChart data={quizChartData}>
                    <XAxis
                    dataKey="name"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    />
                    <YAxis 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}%`}
                        domain={[0, 100]}
                    />
                    <Tooltip
                        cursor={{ fill: 'hsl(var(--accent))', opacity: 0.3 }}
                        content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            const quizData = quizStats.scoresByLevel[data.name];
                            return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm text-center">
                                    <span className="text-sm font-bold text-foreground">{data.name} Quizzes</span>
                                    <p className="text-xs text-muted-foreground">{`Average score: ${data.Average}%`}</p>
                                    <p className="text-xs text-muted-foreground">{`(${quizData.count} quiz(zes) taken)`}</p>
                                </div>
                            )
                            }
                            return null
                        }}
                    />
                    <Bar dataKey="Average" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    </div>
  );
}
