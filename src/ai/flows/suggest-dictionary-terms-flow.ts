'use server';

/**
 * @fileOverview AI flow for suggesting related dictionary search terms.
 *
 * - suggestDictionaryTerms - A function that suggests terms based on user input.
 * - SuggestDictionaryTermsInput - The input type for the suggestDictionaryTerms function.
 * - SuggestDictionaryTermsOutput - The return type for the suggestDictionaryTerms function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const SuggestDictionaryTermsInputSchema = z.object({
  query: z.string().describe('The user\'s current input in the dictionary search bar.'),
});
export type SuggestDictionaryTermsInput = z.infer<typeof SuggestDictionaryTermsInputSchema>;

const SuggestDictionaryTermsOutputSchema = z.object({
  suggestions: z.array(z.string()).length(5).describe('An array of exactly 5 relevant Japanese search term suggestions.'),
});
export type SuggestDictionaryTermsOutput = z.infer<typeof SuggestDictionaryTermsOutputSchema>;

export async function suggestDictionaryTerms(input: SuggestDictionaryTermsInput): Promise<SuggestDictionaryTermsOutput> {
  return suggestDictionaryTermsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestDictionaryTermsPrompt',
  input: { schema: SuggestDictionaryTermsInputSchema },
  output: { schema: SuggestDictionaryTermsOutputSchema },
  prompt: `You are a helpful assistant for a Japanese dictionary app.
Based on the user's current search query, provide 5 relevant and interesting Japanese words they could search for.
The suggestions should be single words or very short, common phrases.
Return the suggestions in Japanese script (Hiragana, Katakana, or Kanji).

User's current search input: {{{query}}}
`,
});

const suggestDictionaryTermsFlow = ai.defineFlow(
  {
    name: 'suggestDictionaryTermsFlow',
    inputSchema: SuggestDictionaryTermsInputSchema,
    outputSchema: SuggestDictionaryTermsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
