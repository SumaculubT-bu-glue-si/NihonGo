
'use client';

import { AdminGuard } from '@/components/admin-guard';
import { AppLayout } from '@/components/app-layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useGlobalState } from '@/hooks/use-global-state';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { BarChart as BarChartIcon } from 'lucide-react';

type NavItemId = 'home' | 'grammar' | 'dictionary' | 'quizzes' | 'dashboard';

const abComparisonData = [
  {
    name: 'Home',
    'Variant A': 75,
    'Variant B': 88,
  },
  {
    name: 'Grammar',
    'Variant A': 68,
    'Variant B': 74,
  },
  {
    name: 'Quizzes',
    'Variant A': 82,
    'Variant B': 79,
  },
  {
    name: 'Dashboard',
    'Variant A': 91,
    'Variant B': 85,
  },
];


export default function UsageAnalysisPage() {
    const { appData, setActiveVariants } = useGlobalState();
    const { toast } = useToast();
    
    const [currentVariants, setCurrentVariants] = useState(appData.activeVariants);
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        setCurrentVariants(appData.activeVariants);
        setIsDirty(false);
    }, [appData.activeVariants]);

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
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-semibold text-sm text-muted-foreground px-4">
                        <div className="md:col-span-1">Section</div>
                        <div className="text-center">Variant A (Default)</div>
                        <div className="text-center">Variant B (Test)</div>
                    </div>
                    <Separator />
                    {navItems.map((item) => {
                        const navId = item.id as NavItemId;
                        const hasVariantB = implementedVariants.includes(navId);

                        return (
                            <div key={item.id} className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 p-4 border rounded-lg">
                                <div>
                                    <Label className="font-semibold">{item.name}</Label>
                                </div>
                                <RadioGroup 
                                    value={currentVariants[navId]} 
                                    onValueChange={(value) => handleVariantChange(navId, value as 'A' | 'B')} 
                                    className="col-span-2 grid grid-cols-2"
                                >
                                    <div className="flex items-center justify-center space-x-2">
                                        <RadioGroupItem value="A" id={`${item.id}-a`} />
                                        <Label htmlFor={`${item.id}-a`} className="cursor-pointer">Active</Label>
                                    </div>
                                    <div className="flex items-center justify-center space-x-2">
                                        <RadioGroupItem value="B" id={`${item.id}-b`} />
                                        <Label htmlFor={`${item.id}-b`} className={cn("cursor-pointer", !hasVariantB && "text-muted-foreground/50")}>
                                            Activate
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
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChartIcon className="h-5 w-5" />
                        A/B Test Performance
                    </CardTitle>
                    <CardDescription>
                        Comparing user engagement scores between Variant A and Variant B (mock data).
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
                                            <p className="text-sm" style={{ color: '#64B5F6' }}>{`Variant A: ${payload[0].value}% engagement`}</p>
                                            <p className="text-sm" style={{ color: '#81C784' }}>{`Variant B: ${payload[1].value}% engagement`}</p>
                                        </div>
                                    )
                                    }
                                    return null
                                }}
                            />
                            <Legend />
                            <Bar dataKey="Variant A" fill="#64B5F6" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="Variant B" fill="#81C784" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Heatmap Analysis</CardTitle>
                    <CardDescription>
                        Visualize where users are clicking the most. This feature is under construction.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center bg-muted/50 rounded-lg h-64">
                        <p className="text-muted-foreground">Heatmap data will be displayed here.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </AppLayout>
    </AdminGuard>
  );
}
