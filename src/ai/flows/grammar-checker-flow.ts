
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

const ExampleSentenceSchema = z.object({
  japanese: z.string().describe('The Japanese example sentence.'),
  english: z.string().describe('The English translation of the sentence.'),
  romaji: z.string().describe('The romaji reading of the Japanese sentence.'),
});

const CheckGrammarOutputSchema = z.object({
  isCorrect: z.boolean().describe('Whether the provided text is grammatically correct.'),
  correctedText: z.string().describe('The corrected version of the text, if applicable.'),
  explanation: z.string().describe('A detailed explanation of the grammar, corrections, and why they were made.'),
  examples: z.array(ExampleSentenceSchema).length(3).describe('An array of exactly 3 example sentences related to the grammar point in question.'),
});
export type CheckGrammarOutput = z.infer<typeof CheckGrammarOutputSchema>;

export async function checkGrammar(input: CheckGrammarInput): Promise<CheckGrammarOutput> {
  return grammarCheckerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'grammarCheckerPrompt',
  input: {schema: CheckGrammarInputSchema},
  output: {schema: CheckGrammarOutputSchema},
  prompt: `You are a friendly and encouraging Japanese language tutor. Analyze the following Japanese text for grammatical errors.

Your task is to:
1.  Determine if the text is grammatically correct and set the 'isCorrect' flag.
2.  If there are errors, provide a corrected version in the 'correctedText' field. If the text is already correct, return the original text in this field.
3.  Provide a clear, kind, and user-friendly explanation. Address the user directly, like a helpful tutor.
    - If correct, praise the user and briefly explain the grammar points used.
    - If incorrect, gently point out the errors, explain the correct grammar rule in a simple way, and offer encouragement. Avoid overly technical jargon.
4.  Generate an array of exactly 3 'examples' relevant to the grammar point discussed in the explanation. Each example must have 'japanese', 'english', and 'romaji' fields.

Japanese Text:
{{{text}}}
`,
});

const grammarCheckerFlow = ai.defineFlow(
  {
    name: 'grammarCheckerFlow',
    inputSchema: CheckGrammarInputSchema,
    outputSchema: CheckGrammarOutputSchema,
    flow: {
      retries: 3,
    },
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
