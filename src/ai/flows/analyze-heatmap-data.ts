
'use server';

/**
 * @fileOverview An AI agent for analyzing simulated heatmap data.
 *
 * - analyzeHeatmapData - A function that provides an analysis of heatmap descriptions.
 * - AnalyzeHeatmapDataInput - The input type for the analyzeHeatmapData function.
 * - AnalyzeHeatmapDataOutput - The return type for the analyzeHeatmapData function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const AnalyzeHeatmapDataInputSchema = z.object({
  page: z.string().describe("The name of the app page being analyzed (e.g., 'Home', 'Quizzes')."),
  variantA_description: z.string().describe('A text description of the primary user interactions and click concentrations for Variant A.'),
  variantB_description: z.string().describe('A text description of the primary user interactions and click concentrations for Variant B.'),
});
export type AnalyzeHeatmapDataInput = z.infer<typeof AnalyzeHeatmapDataInputSchema>;

const AnalyzeHeatmapDataOutputSchema = z.object({
  insights: z.array(z.string()).describe("A bulleted list of 2-3 key insights comparing the two heatmap variants. Each insight should be a concise, actionable string for an admin."),
});
export type AnalyzeHeatmapDataOutput = z.infer<typeof AnalyzeHeatmapDataOutputSchema>;

export async function analyzeHeatmapData(input: AnalyzeHeatmapDataInput): Promise<AnalyzeHeatmapDataOutput> {
  return analyzeHeatmapDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeHeatmapDataPrompt',
  input: { schema: AnalyzeHeatmapDataInputSchema },
  output: { schema: AnalyzeHeatmapDataOutputSchema },
  prompt: `You are an expert UI/UX analyst specializing in interpreting heatmap data. Your task is to compare two UI variants for a specific page and provide actionable insights for an administrator based on simulated user click behavior.

The page being analyzed is: **{{{page}}}**.

Here is the description of user interactions for each variant:
- **Variant A**: {{{variantA_description}}}
- **Variant B**: {{{variantB_description}}}

Based on this information, provide 2-3 bullet points for the "Heatmap Insights" panel. Your analysis should be concise and direct. Focus on which variant guides the user more effectively towards key actions and why.

Example Insights:
- "On the Home page, Variant B's list layout focuses user clicks directly on the 'Learn' buttons, indicating a clearer path to starting a lesson than Variant A's grid."
- "The heatmap for Variant A shows more exploratory clicks on filter tabs, while Variant B shows users moving directly to the content they want."
- "Variant B's design appears to reduce miss-clicks and leads to a more efficient user journey, as seen by the tighter cluster of clicks on primary action items."
`,
});

const analyzeHeatmapDataFlow = ai.defineFlow(
  {
    name: 'analyzeHeatmapDataFlow',
    inputSchema: AnalyzeHeatmapDataInputSchema,
    outputSchema: AnalyzeHeatmapDataOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
