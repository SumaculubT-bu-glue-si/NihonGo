
'use client';

import { useMemo } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { type GrammarLesson } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface GrammarStatsChartProps {
  lessons: GrammarLesson[];
}

export function GrammarStatsChart({ lessons }: GrammarStatsChartProps) {
  const chartData = useMemo(() => {
    const levels: ('N5' | 'N4' | 'N3' | 'N2' | 'N1')[] = ['N5', 'N4', 'N3', 'N2', 'N1'];
    const dataByLevel = levels.map(level => {
      const levelLessons = lessons.filter(l => l.level === level);
      return {
        level,
        read: levelLessons.filter(l => l.read).length,
        unread: levelLessons.filter(l => !l.read).length,
      };
    });
    return dataByLevel;
  }, [lessons]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lesson Progress</CardTitle>
        <CardDescription>Breakdown of read and unread lessons by JLPT level.</CardDescription>
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
                    allowDecimals={false}
                />
                <Tooltip
                    cursor={{ fill: 'hsl(var(--accent))', opacity: 0.3 }}
                    contentStyle={{
                        background: 'hsl(var(--background))',
                        borderColor: 'hsl(var(--border))',
                        borderRadius: 'var(--radius)',
                    }}
                />
                <Legend
                    formatter={(value, entry, index) => <span className="capitalize text-muted-foreground">{value}</span>}
                />
                <Bar dataKey="unread" stackId="a" fill="hsl(var(--secondary))" name="Unread" radius={[4, 4, 0, 0]}/>
                <Bar dataKey="read" stackId="a" fill="hsl(var(--primary))" name="Read" radius={[4, 4, 0, 0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

    