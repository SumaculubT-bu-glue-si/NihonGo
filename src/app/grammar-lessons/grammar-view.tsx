
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { GrammarLessonsView } from './lessons-view';
import { ChallengesView } from './challenges-view';
import { GrammarCheckerTool } from './checker-view';
import type { AppData } from '@/hooks/use-global-state';

export function GrammarView({ appData }: { appData: AppData }) {
    
  return (
    <div className="container mx-auto space-y-8">
        <div>
            <h1 className="text-3xl font-bold font-headline">Grammar</h1>
            <p className="text-muted-foreground">
            Explore grammar points, check your sentences, and build your own library.
            </p>
        </div>

        <Tabs defaultValue="library" className="w-full">
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-2xl font-bold font-headline">
                    Grammar Checker Tool
                    </AccordionTrigger>
                    <AccordionContent>
                    <GrammarCheckerTool />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <TabsList className="grid w-full grid-cols-2 mt-6">
                <TabsTrigger value="library">Lessons Library</TabsTrigger>
                <TabsTrigger value="challenges">Challenges</TabsTrigger>
            </TabsList>
            <TabsContent value="library" className="mt-6">
                <GrammarLessonsView />
            </TabsContent>
            <TabsContent value="challenges" className="mt-6">
                 <ChallengesView
                    levels={appData.challengeLevels}
                    progress={appData.challengeProgress}
                />
            </TabsContent>
        </Tabs>
    </div>
  );
}
