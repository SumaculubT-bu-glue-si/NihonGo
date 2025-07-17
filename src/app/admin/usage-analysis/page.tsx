
'use client';

import { AdminGuard } from '@/components/admin-guard';
import { AppLayout } from '@/components/app-layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useGlobalState } from '@/hooks/use-global-state';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { BarChart as BarChartIcon, Lightbulb, Loader2, MousePointerClick } from 'lucide-react';
import { analyzeABTest } from '@/ai/flows/analyze-ab-test-flow';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type NavItemId = 'home' | 'grammar' | 'dictionary' | 'quizzes' | 'dashboard';
type HeatmapSelection = NavItemId;

const abComparisonData = [
  {
    name: 'Home',
    'Variant A Engagement': 75,
    'Variant B Engagement': 88,
    'Variant A Efficiency': 90,
    'Variant B Efficiency': 82,
  },
  {
    name: 'Grammar',
    'Variant A Engagement': 68,
    'Variant B Engagement': 74,
    'Variant A Efficiency': 75,
    'Variant B Efficiency': 85,
  },
  {
    name: 'Quizzes',
    'Variant A Engagement': 82,
    'Variant B Engagement': 79,
    'Variant A Efficiency': 88,
    'Variant B Efficiency': 91,
  },
  {
    name: 'Dashboard',
    'Variant A Engagement': 91,
    'Variant B Engagement': 85,
    'Variant A Efficiency': 78,
    'Variant B Efficiency': 89,
  },
];


const HeatmapSpot = ({ top, left, size, color }: { top: string, left: string, size: string, color: string }) => (
  <div
    className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
    style={{
      top,
      left,
      width: size,
      height: size,
      background: `radial-gradient(${color} 0%, transparent 70%)`,
      opacity: 0.6,
    }}
  />
);

const HeatmapDisplay = ({ selection }: { selection: HeatmapSelection }) => {
  const heatmaps = {
    home: (
      <div className="bg-muted p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <div className="w-1/4 h-8 bg-background rounded-md" />
          <div className="w-1/4 h-8 bg-primary rounded-md relative">
              <HeatmapSpot top="50%" left="80%" size="40px" color="rgba(255, 0, 0, 1)" />
          </div>
        </div>
        <div className="w-full h-8 bg-muted-foreground/20 rounded-md mb-4" />
        <div className="grid grid-cols-3 gap-4">
          <div className="h-40 bg-background rounded-lg relative">
              <HeatmapSpot top="80%" left="50%" size="60px" color="rgba(255, 0, 0, 1)" />
          </div>
          <div className="h-40 bg-background rounded-lg relative">
              <HeatmapSpot top="80%" left="50%" size="50px" color="rgba(255, 255, 0, 1)" />
          </div>
          <div className="h-40 bg-background rounded-lg relative">
              <HeatmapSpot top="80%" left="50%" size="40px" color="rgba(0, 255, 0, 1)" />
          </div>
        </div>
      </div>
    ),
    grammar: (
       <div className="bg-muted p-4 rounded-lg">
        <div className="h-10 bg-background rounded-md mb-4 relative">
             <HeatmapSpot top="50%" left="50%" size="60px" color="rgba(255, 0, 0, 1)" />
        </div>
        <div className="space-y-2">
            <div className="h-12 bg-background rounded-md"/>
            <div className="h-12 bg-background rounded-md relative">
                <HeatmapSpot top="50%" left="90%" size="40px" color="rgba(255, 255, 0, 1)" />
            </div>
            <div className="h-12 bg-background rounded-md"/>
        </div>
      </div>
    ),
    quizzes: (
      <div className="bg-muted p-4 rounded-lg space-y-4">
          <div className="h-24 bg-background rounded-md relative">
              <HeatmapSpot top="50%" left="50%" size="80px" color="rgba(255, 0, 0, 1)" />
          </div>
          <div className="h-24 bg-background rounded-md relative">
              <HeatmapSpot top="50%" left="50%" size="60px" color="rgba(255, 255, 0, 1)" />
          </div>
      </div>
    ),
     dashboard: (
      <div className="bg-muted p-4 rounded-lg space-y-4">
          <div className="h-64 bg-background rounded-md relative">
              <HeatmapSpot top="30%" left="20%" size="80px" color="rgba(255, 0, 0, 1)" />
              <HeatmapSpot top="70%" left="80%" size="60px" color="rgba(255, 255, 0, 1)" />
          </div>
      </div>
    ),
    dictionary: (
      <div className="bg-muted p-4 rounded-lg space-y-4">
          <div className="h-12 bg-background rounded-md relative">
              <HeatmapSpot top="50%" left="90%" size="70px" color="rgba(255, 0, 0, 1)" />
          </div>
          <div className="h-40 bg-background rounded-md mt-4"/>
      </div>
    ),
  };

  return <div className="relative overflow-hidden">{heatmaps[selection]}</div>;
}


export default function UsageAnalysisPage() {
    const { appData, setActiveVariants } = useGlobalState();
    const { toast } = useToast();
    
    const [currentVariants, setCurrentVariants] = useState(appData.activeVariants);
    const [isDirty, setIsDirty] = useState(false);
    const [analysis, setAnalysis] = useState<string[]>([]);
    const [isAnalyzing, setIsAnalyzing] = useState(true);
    const [heatmapSelection, setHeatmapSelection] = useState<HeatmapSelection>('home');


    useEffect(() => {
        setCurrentVariants(appData.activeVariants);
        setIsDirty(false);
    }, [appData.activeVariants]);
    
    useEffect(() => {
        const handleAnalyze = async () => {
            setIsAnalyzing(true);
            try {
                const result = await analyzeABTest({ testData: abComparisonData });
                setAnalysis(result.insights);
            } catch (error) {
                console.error("Failed to analyze A/B test data:", error);
                setAnalysis(["Could not retrieve AI analysis at this time."]);
            } finally {
                setIsAnalyzing(false);
            }
        };
        handleAnalyze();
    }, []);

    const handleVariantChange = (navId: NavItemId, value: 'A' | 'B') => {
        setCurrentVariants(prev => ({ ...prev, [navId]: value }));
        setIsDirty(true);
    };

    const handleSaveChanges = () => {
        setActiveVariants(currentVariants);
        setIsDirty(false);
        toast({
            title: "Settings Saved",
            description: "A/B test variants have been updated globally.",
        });
    };

    const navItems = [
        { id: 'home', name: 'Home (Decks)' },
        { id: 'grammar', name: 'Grammar' },
        { id: 'dictionary', name: 'Dictionary' },
        { id: 'quizzes', name: 'Quizzes' },
        { id: 'dashboard', name: 'Dashboard (Stats)' },
    ];
    
    const implementedVariants: NavItemId[] = ['home', 'grammar', 'dictionary', 'quizzes', 'dashboard'];

  return (
    <AdminGuard>
      <AppLayout>
        <div className="space-y-6">
            <div>
                <h1 className="mb-2 text-3xl font-bold font-headline">Usage Analysis</h1>
                <p className="text-muted-foreground">
                    Tools for analyzing and optimizing user engagement.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>A/B Testing Management</CardTitle>
                    <CardDescription>
                        Control which UI variant is active for each section of the app. Changes are saved globally for all users.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {navItems.map((item) => {
                        const navId = item.id as NavItemId;
                        const hasVariantB = implementedVariants.includes(navId);

                        return (
                            <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 p-4 border rounded-lg">
                                <div>
                                    <Label className="font-semibold text-base">{item.name}</Label>
                                </div>
                                <RadioGroup 
                                    value={currentVariants[navId]} 
                                    onValueChange={(value) => handleVariantChange(navId, value as 'A' | 'B')} 
                                    className="grid grid-cols-2 gap-2 rounded-lg bg-muted p-1"
                                >
                                    <div>
                                        <RadioGroupItem value="A" id={`${item.id}-a`} className="sr-only" />
                                        <Label 
                                            htmlFor={`${item.id}-a`}
                                            className={cn(
                                                "block w-full cursor-pointer rounded-md p-2 text-center font-semibold",
                                                currentVariants[navId] === 'A' && "bg-background shadow"
                                            )}
                                        >
                                            Variant A
                                        </Label>
                                    </div>
                                    <div>
                                        <RadioGroupItem value="B" id={`${item.id}-b`} disabled={!hasVariantB} className="sr-only" />
                                        <Label 
                                            htmlFor={`${item.id}-b`}
                                            className={cn(
                                                "block w-full cursor-pointer rounded-md p-2 text-center font-semibold",
                                                currentVariants[navId] === 'B' && "bg-background shadow",
                                                !hasVariantB && "cursor-not-allowed text-muted-foreground/50"
                                            )}
                                        >
                                            Variant B
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        )
                    })}
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button onClick={handleSaveChanges} disabled={!isDirty}>Save Changes</Button>
                </CardFooter>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChartIcon className="h-5 w-5" />
                            A/B Test Performance
                        </CardTitle>
                        <CardDescription>
                            Comparing user metrics between Variant A and Variant B (mock data).
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={abComparisonData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} domain={[0, 100]} />
                                <Tooltip
                                    cursor={{ fill: 'hsl(var(--accent))', opacity: 0.2 }}
                                    content={({ active, payload, label }) => {
                                        if (active && payload && payload.length) {
                                        return (
                                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                                                <p className="font-bold">{label}</p>
                                                <p className="text-sm" style={{ color: '#64B5F6' }}>{`A Engagement: ${payload[0].value}%`}</p>
                                                <p className="text-sm" style={{ color: '#81C784' }}>{`B Engagement: ${payload[1].value}%`}</p>
                                                 <p className="text-sm" style={{ color: '#fb923c' }}>{`A Efficiency: ${payload[2].value}%`}</p>
                                                <p className="text-sm" style={{ color: '#f472b6' }}>{`B Efficiency: ${payload[3].value}%`}</p>
                                            </div>
                                        )
                                        }
                                        return null
                                    }}
                                />
                                <Legend />
                                <Bar dataKey="Variant A Engagement" fill="#64B5F6" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="Variant B Engagement" fill="#81C784" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="Variant A Efficiency" fill="#fb923c" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="Variant B Efficiency" fill="#f472b6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Lightbulb className="h-5 w-5 text-yellow-500" />
                            A/B Performance Insights
                        </CardTitle>
                        <CardDescription>
                            An AI-generated analysis of the A/B test performance data.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isAnalyzing ? (
                            <div className="flex items-center gap-3 text-muted-foreground">
                                <Loader2 className="h-5 w-5 animate-spin" />
                                <p>Analyzing performance...</p>
                            </div>
                        ) : (
                            <ul className="space-y-3 text-sm text-muted-foreground">
                                {analysis.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MousePointerClick className="h-5 w-5" />
                        Heatmap Analysis
                    </CardTitle>
                    <CardDescription>
                        Visualize where users are clicking on different pages. This is a visual simulation.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="w-full sm:w-1/3">
                            <Select value={heatmapSelection} onValueChange={(v) => setHeatmapSelection(v as HeatmapSelection)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a page" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="home">Home (Decks)</SelectItem>
                                    <SelectItem value="grammar">Grammar</SelectItem>
                                    <SelectItem value="dictionary">Dictionary</SelectItem>
                                    <SelectItem value="quizzes">Quizzes</SelectItem>
                                    <SelectItem value="dashboard">Dashboard</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="rounded-lg border bg-card p-4">
                           <HeatmapDisplay selection={heatmapSelection} />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
      </AppLayout>
    </AdminGuard>
  );
}
