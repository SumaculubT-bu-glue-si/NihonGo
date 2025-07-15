
'use server';

/**
 * @fileOverview AI flow for generating example sentences for a given grammar point.
 *
 * - generateExampleSentence - A function that handles the example sentence generation process.
 * - GenerateExampleSentenceInput - The input type for the generateExampleSentence function.
 * - GenerateExampleSentenceOutput - The return type for the generateExampleSentence function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateExampleSentenceInputSchema = z.object({
  grammarPoint: z.string().describe('The grammar point to generate example sentences for.'),
  proficiencyLevel: z
    .enum(['beginner', 'intermediate', 'advanced'])
    .describe('The proficiency level of the user.'),
});
export type GenerateExampleSentenceInput = z.infer<typeof GenerateExampleSentenceInputSchema>;

const GenerateExampleSentenceOutputSchema = z.object({
  sentences: z.array(z.string()).describe('Example sentences for the given grammar point.'),
});
export type GenerateExampleSentenceOutput = z.infer<typeof GenerateExampleSentenceOutputSchema>;

export async function generateExampleSentence(
  input: GenerateExampleSentenceInput
): Promise<GenerateExampleSentenceOutput> {
  return generateExampleSentenceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateExampleSentencePrompt',
  input: {schema: GenerateExampleSentenceInputSchema},
  output: {schema: GenerateExampleSentenceOutputSchema},
  prompt: `You are a Japanese language expert. Generate 3 example sentences for the following grammar point, appropriate for the given proficiency level. Return the sentences in an array.

Grammar Point: {{{grammarPoint}}}
Proficiency Level: {{{proficiencyLevel}}}

Sentences:`,
});

const generateExampleSentenceFlow = ai.defineFlow(
  {
    name: 'generateExampleSentenceFlow',
    inputSchema: GenerateExampleSentenceInputSchema,
    outputSchema: GenerateExampleSentenceOutputSchema,
    flow: {
      retries: 3,
    },
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
