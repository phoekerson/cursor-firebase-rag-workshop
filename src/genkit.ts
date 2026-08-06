import 'dotenv/config';
import './firebase';
import { genkit, z } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { addDocument, askQuestion } from './rag';

export const ai = genkit({
  plugins: [googleAI()],
});

export const askQuestionFlow = ai.defineFlow(
  {
    name: 'askQuestionFlow',
    inputSchema: z.object({
      question: z.string(),
      ragEnabled: z.boolean(),
    }),
    outputSchema: z.object({
      answer: z.string(),
      ragEnabled: z.boolean(),
      context: z.string().optional(),
      sources: z.array(z.object({ title: z.string(), content: z.string() })).optional(),
    }),
  },
  async ({ question, ragEnabled }) => askQuestion(question, ragEnabled),
);

export const addDocumentFlow = ai.defineFlow(
  {
    name: 'addDocumentFlow',
    inputSchema: z.object({
      title: z.string(),
      content: z.string(),
    }),
    outputSchema: z.object({
      success: z.boolean(),
      title: z.string(),
    }),
  },
  async ({ title, content }) => {
    await addDocument(title, content);
    return { success: true, title };
  },
);

export const compareRagFlow = ai.defineFlow(
  {
    name: 'compareRagFlow',
    inputSchema: z.object({
      question: z.string(),
    }),
    outputSchema: z.object({
      withoutRag: z.object({
        answer: z.string(),
        ragEnabled: z.boolean(),
      }),
      withRag: z.object({
        answer: z.string(),
        ragEnabled: z.boolean(),
        context: z.string().optional(),
        sources: z.array(z.object({ title: z.string(), content: z.string() })).optional(),
      }),
    }),
  },
  async ({ question }) => ({
    withoutRag: await askQuestion(question, false),
    withRag: await askQuestion(question, true),
  }),
);
