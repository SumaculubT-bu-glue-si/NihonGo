
'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { type StatsData } from '@/lib/data';

export function StatsView({ fullPage = false, stats }: { fullPage?: boolean; stats: StatsData[] }) {
  const chartData = stats.map(stat => ({
    name: stat.topic,
    percentage: stat.total > 0 ? Math.round((stat.progress / stat.total) * 100) : 0,
    progress: stat.progress,
    total: stat.total,
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

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">Deck Completion</h3>
          <p className="text-sm text-muted-foreground">
            Percentage of cards completed in each deck.
          </p>
        </div>
        <div className="p-6 pt-0">
          <div className="h-[160px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 10 }}>
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={true}
                  padding={{ left: 10, right: 10 }}
                  interval={0}
                  tick={{ width: 80, wordWrap: 'break-word' }}
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
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-1 gap-2 text-center">
                             <span className="text-[0.8rem] font-bold text-foreground">
                                {data.name}
                              </span>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Progress
                              </span>
                              <span className="font-bold">
                                {`${data.progress} / ${data.total} cards`}
                              </span>
                               <span className="font-bold text-primary">
                                {`(${data.percentage}%)`}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Bar dataKey="percentage" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
