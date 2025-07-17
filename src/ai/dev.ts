import { config } from 'dotenv';
config();

import '@/ai/flows/generate-example-sentence.ts';
import '@/ai/flows/grammar-checker-flow.ts';
import '@/ai/flows/generate-grammar-lesson-flow.ts';
import '@/ai/flows/generate-deck-flow.ts';
import '@/ai/flows/generate-cards-flow.ts';
import '@/ai/flows/generate-quiz-flow.ts';
import '@/ai/flows/jisho-dictionary-flow.ts';
import '@/ai/flows/analyze-progress-flow.ts';
import '@/ai/flows/analyze-topic-engagement-flow.ts';
