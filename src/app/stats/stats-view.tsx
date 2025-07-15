
'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { type StatsData } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function StatsView({ fullPage = false, stats }: { fullPage?: boolean; stats: StatsData[] }) {
  const chartData = stats.map(stat => ({
    name: stat.topic,
    progress: stat.total > 0 ? Math.round((stat.progress / stat.total) * 100) : 0,
  }));

  return (
    <div className={!fullPage ? "container mx-auto" : ""}>
        {fullPage && (
            <>
                <h1 className="mb-2 text-3xl font-bold font-headline">Your Progress</h1>
                <p className="mb-6 text-muted-foreground">
                    A visual overview of your learning journey so far.
                </p>
            </>
        )}

      <Card>
        <CardHeader>
          <CardTitle>Deck Completion</CardTitle>
          <CardDescription>
            Percentage of cards completed in each deck.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 60 }}>
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  cursor={{ fill: 'hsla(var(--muted), 0.5)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Deck
                              </span>
                              <span className="font-bold text-muted-foreground">
                                {payload[0].payload.name}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Progress
                              </span>
                              <span className="font-bold">
                                {`${payload[0].value}%`}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Bar dataKey="progress" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
