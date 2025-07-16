
'use server';

/**
 * @fileOverview A Jisho.org dictionary lookup flow.
 *
 * - searchJisho - A function that handles searching for a word on Jisho.org.
 * - JishoSearchInput - The input type for the searchJisho function.
 * - JishoSearchOutput - The return type for the searchJisho function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const JishoSearchInputSchema = z.object({
  query: z.string().describe('The word to search for in the dictionary.'),
});
export type JishoSearchInput = z.infer<typeof JishoSearchInputSchema>;

const JapaneseReadingSchema = z.object({
  word: z.string().optional(),
  reading: z.string().optional(),
});

const SenseSchema = z.object({
  english_definitions: z.array(z.string()),
  parts_of_speech: z.array(z.string()),
  tags: z.array(z.string()),
});

const JishoResultSchema = z.object({
  slug: z.string(),
  is_common: z.boolean().nullable(),
  japanese: z.array(JapaneseReadingSchema),
  senses: z.array(SenseSchema),
  attribution: z.object({
    jmdict: z.boolean(),
    jmnedict: z.boolean(),
    dbpedia: z.boolean().or(z.string()),
  }),
});

const JishoSearchOutputSchema = z.object({
  results: z.array(JishoResultSchema),
});
export type JishoSearchOutput = z.infer<typeof JishoSearchOutputSchema>;

export async function searchJisho(input: JishoSearchInput): Promise<JishoSearchOutput> {
  return jishoSearchFlow(input);
}

const jishoSearchFlow = ai.defineFlow(
  {
    name: 'jishoSearchFlow',
    inputSchema: JishoSearchInputSchema,
    outputSchema: JishoSearchOutputSchema,
  },
  async ({ query }) => {
    const url = `https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(query)}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Jisho API request failed with status ${response.status}`);
      }
      const data = await response.json();
      
      // We need to parse the result to ensure it fits our Zod schema.
      // The API response is structured as { meta: {...}, data: [...] }
      const validationResult = JishoSearchOutputSchema.safeParse({ results: data.data });
      
      if (validationResult.success) {
        return validationResult.data;
      } else {
        console.error("Jisho API response validation error:", validationResult.error);
        throw new Error("Failed to parse Jisho API response.");
      }

    } catch (error) {
      console.error("Error fetching from Jisho API:", error);
      // In case of error, return an empty result set.
      return { results: [] };
    }
  }
);
