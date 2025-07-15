'use server';

/**
 * @fileOverview An AI agent for checking and correcting Japanese grammar.
 *
 * - checkGrammar - A function that handles the grammar checking process.
 * - CheckGrammarInput - The input type for the checkGrammar function.
 * - CheckGrammarOutput - The return type for the checkGrammar function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CheckGrammarInputSchema = z.object({
  text: z.string().describe('The Japanese text to be checked.'),
});
export type CheckGrammarInput = z.infer<typeof CheckGrammarInputSchema>;

const CheckGrammarOutputSchema = z.object({
  isCorrect: z.boolean().describe('Whether the provided text is grammatically correct.'),
  correctedText: z.string().describe('The corrected version of the text, if applicable.'),
  explanation: z.string().describe('A detailed explanation of the grammar, corrections, and why they were made.'),
});
export type CheckGrammarOutput = z.infer<typeof CheckGrammarOutputSchema>;

export async function checkGrammar(input: CheckGrammarInput): Promise<CheckGrammarOutput> {
  return grammarCheckerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'grammarCheckerPrompt',
  input: {schema: CheckGrammarInputSchema},
  output: {schema: CheckGrammarOutputSchema},
  prompt: `You are a Japanese language teacher. Analyze the following Japanese text for grammatical errors.

Your task is to:
1. Determine if the text is grammatically correct and set the 'isCorrect' flag.
2. If there are errors, provide a corrected version in the 'correctedText' field. If it's already correct, return the original text.
3. Provide a clear, concise, and friendly explanation of the grammar rules involved and why the corrections were necessary. If the text is correct, provide a brief explanation of the grammar points used. Address the user directly in your explanation.

Japanese Text:
{{{text}}}
`,
});

const grammarCheckerFlow = ai.defineFlow(
  {
    name: 'grammarCheckerFlow',
    inputSchema: CheckGrammarInputSchema,
    outputSchema: CheckGrammarOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
