
'use server';

/**
 * @fileOverview AI flow for generating a grammar guidebook for a specific unit.
 *
 * - generateGrammarGuidebook - A function that handles the guidebook generation process.
 * - GenerateGrammarGuidebookInput - The input type for the generateGrammarGuidebook function.
 * - GenerateGrammarGuidebookOutput - The return type for the generateGrammarGuidebook function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { marked } from 'marked';

const GenerateGrammarGuidebookInputSchema = z.object({
  unit_topic: z.string().describe('The overall topic of the grammar unit, e.g., "Basic Sentences & Endings".'),
  level: z.enum(['N5', 'N4', 'N3', 'N2', 'N1']).describe('The JLPT level of the guidebook.'),
});
export type GenerateGrammarGuidebookInput = z.infer<typeof GenerateGrammarGuidebookInputSchema>;

const GenerateGrammarGuidebookOutputSchema = z.object({
  guidebook: z.string().describe('A concise, well-structured guidebook in Markdown format. It should include headings, lists, and bold text to explain the key grammar points for the unit topic at the specified level.'),
});
export type GenerateGrammarGuidebookOutput = z.infer<typeof GenerateGrammarGuidebookOutputSchema>;

export async function generateGrammarGuidebook(input: GenerateGrammarGuidebookInput): Promise<GenerateGrammarGuidebookOutput> {
  const result = await generateGrammarGuidebookFlow(input);
  // Parse the markdown content to HTML before returning it to the client
  if (result.guidebook) {
      result.guidebook = marked(result.guidebook);
  }
  return result;
}

const prompt = ai.definePrompt({
  name: 'generateGrammarGuidebookPrompt',
  input: { schema: GenerateGrammarGuidebookInputSchema },
  output: { schema: GenerateGrammarGuidebookOutputSchema },
  prompt: `You are an expert Japanese language teacher tasked with creating a concise digital guidebook for a student.

The guidebook must cover the grammar unit: **{{{unit_topic}}}** at the **{{{level}}}** level.

Your response must be in Markdown format and should be structured as follows:

1.  **Main Heading**: A clear title for the guidebook (e.g., "# Guide to Basic Sentence Endings (N5)").
2.  **Introduction**: A brief, one-paragraph overview of what the student will learn in this unit.
3.  **Key Grammar Points**: Use level-2 headings (e.g., "## The です (desu) Copula") for each major grammar point within the unit.
4.  **Explanation**: Under each grammar point, provide a simple, easy-to-understand explanation.
5.  **Example Sentences**: Provide 2-3 clear example sentences for each grammar point. Use bullet points for the examples. Include the Japanese sentence, the romaji reading in parentheses, and the English translation.
    - Example: \`- 私は学生です。 (Watashi wa gakusei desu.) - I am a student.\`
6.  **Level-Appropriate Content**:
    -   **N5/N4**: Use simple language and focus on the most fundamental aspects of the grammar.
    -   **N3**: Introduce more nuanced uses and connections between grammar points.
    -   **N2/N1**: Discuss subtle differences, formal vs. informal usage, and more complex sentence structures.

Keep the entire guidebook concise and focused on the most critical information for the student to succeed in their challenges for this unit.
`,
});

const generateGrammarGuidebookFlow = ai.defineFlow(
  {
    name: 'generateGrammarGuidebookFlow',
    inputSchema: GenerateGrammarGuidebookInputSchema,
    outputSchema: GenerateGrammarGuidebookOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
