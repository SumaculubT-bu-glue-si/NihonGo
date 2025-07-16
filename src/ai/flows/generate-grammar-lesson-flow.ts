'use server';

/**
 * @fileOverview AI flow for generating a full grammar lesson based on a topic and level.
 *
 * - generateGrammarLesson - A function that handles the lesson generation process.
 * - GenerateGrammarLessonInput - The input type for the generateGrammarLesson function.
 * - GenerateGrammarLessonOutput - The return type for the generateGrammarLesson function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateGrammarLessonInputSchema = z.object({
  topic: z.string().describe('The topic for the grammar lesson to be generated.'),
  level: z.enum(['N5', 'N4', 'N3', 'N2', 'N1']).describe('The JLPT level for the lesson.'),
});
export type GenerateGrammarLessonInput = z.infer<typeof GenerateGrammarLessonInputSchema>;

const GenerateGrammarLessonOutputSchema = z.object({
  title: z.string().describe('A concise and clear title for the grammar lesson, often including the grammar point itself.'),
  explanation: z.string().describe('A detailed but easy-to-understand explanation of the grammar point, its rules, and nuances.'),
  examples: z.array(z.string()).describe('An array of 3 to 4 example sentences demonstrating the grammar point in context.'),
});
export type GenerateGrammarLessonOutput = z.infer<typeof GenerateGrammarLessonOutputSchema>;

export async function generateGrammarLesson(
  input: GenerateGrammarLessonInput
): Promise<GenerateGrammarLessonOutput> {
  return generateGrammarLessonFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateGrammarLessonPrompt',
  input: {schema: GenerateGrammarLessonInputSchema},
  output: {schema: GenerateGrammarLessonOutputSchema},
  prompt: `You are an expert Japanese language tutor creating a new grammar lesson for a learning app.
Your task is to generate a complete lesson based on the provided topic and JLPT level.

The lesson must include:
1.  A clear, concise 'title' for the lesson.
2.  A comprehensive 'explanation' of the grammar point. Explain how it's used, what it means, and any important rules.
3.  A list of 3-4 practical 'examples' showing the grammar in use.

The content should be accurate and appropriate for the specified JLPT level.

Lesson Topic: {{{topic}}}
JLPT Level: {{{level}}}
`,
});

const generateGrammarLessonFlow = ai.defineFlow(
  {
    name: 'generateGrammarLessonFlow',
    inputSchema: GenerateGrammarLessonInputSchema,
    outputSchema: GenerateGrammarLessonOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
