
import { AdminGuard } from '@/components/admin-guard';
import { AppLayout } from '@/components/app-layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

export default function UsageAnalysisPage() {
    const navItems = [
        { id: 'home', name: 'Home (Decks)' },
        { id: 'grammar', name: 'Grammar' },
        { id: 'dictionary', name: 'Dictionary' },
        { id: 'quizzes', name: 'Quizzes' },
        { id: 'dashboard', name: 'Dashboard (Stats)' },
    ];

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
                        Control which UI variant is active for each section of the app. This feature is under construction.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-semibold text-sm text-muted-foreground px-4">
                        <div className="md:col-span-1">Section</div>
                        <div className="text-center">Variant A (Default)</div>
                        <div className="text-center">Variant B (Test)</div>
                    </div>
                    <Separator />
                    {navItems.map((item) => (
                        <div key={item.id} className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 p-4 border rounded-lg">
                            <Label className="font-semibold col-span-1">{item.name}</Label>
                            <RadioGroup defaultValue="a" className="col-span-2 grid grid-cols-2">
                                <div className="flex items-center justify-center space-x-2">
                                    <RadioGroupItem value="a" id={`${item.id}-a`} disabled />
                                    <Label htmlFor={`${item.id}-a`} className="cursor-pointer">Active</Label>
                                </div>
                                <div className="flex items-center justify-center space-x-2">
                                    <RadioGroupItem value="b" id={`${item.id}-b`} disabled />
                                    <Label htmlFor={`${item.id}-b`} className="cursor-pointer">Activate</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    ))}
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button disabled>Save Changes</Button>
                </CardFooter>
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
