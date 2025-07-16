
'use client';

import { useMemo } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { type GrammarLesson } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface GrammarStatsChartProps {
  lessons: GrammarLesson[];
}

export function GrammarStatsChart({ lessons }: GrammarStatsChartProps) {
  const chartData = useMemo(() => {
    const levels: ('N5' | 'N4' | 'N3' | 'N2' | 'N1')[] = ['N5', 'N4', 'N3', 'N2', 'N1'];
    return levels.map(level => {
      const levelLessons = lessons.filter(l => l.level === level);
      const total = levelLessons.length;
      const read = levelLessons.filter(l => l.read).length;
      const percentage = total > 0 ? Math.round((read / total) * 100) : 0;
      return {
        level,
        percentage,
        read,
        total,
      };
    });
  }, [lessons]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lesson Progress</CardTitle>
        <CardDescription>Percentage of lessons completed by JLPT level.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                    dataKey="level" 
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
                          return (
                            <div className="rounded-lg border bg-background p-2 shadow-sm text-center">
                              <p className="text-sm font-bold text-foreground">{data.level} Progress</p>
                              <p className="text-lg font-bold text-primary">{`${data.percentage}%`}</p>
                              <p className="text-xs text-muted-foreground">{`${data.read} / ${data.total} lessons`}</p>
                            </div>
                          )
                        }
                        return null
                      }}
                />
                <Bar dataKey="percentage" fill="hsl(var(--primary))" name="Completed" radius={[4, 4, 0, 0]} barSize={35}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
