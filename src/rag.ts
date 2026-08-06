import { GoogleGenAI } from '@google/genai';
import { createDocument, listDocuments, searchSimilarDocuments } from '@dataconnect/generated';
import { dc } from './firebase';
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export type AskQuestionResult = {
  answer: string;
  ragEnabled: boolean;
  context?: string;
  sources?: Array<{ title: string; content: string }>;
};

function toPgVector(values: number[]): string {
  return `[${values.join(',')}]`;
}

async function embedText(text: string): Promise<number[]> {
  const response = await ai.models.embedContent({
    model: 'gemini-embedding-001',
    contents: text,
    config: { outputDimensionality: 768 },
  });
  return response.embeddings?.[0]?.values ?? [];
}

async function retrieveContext(userQuery: string) {
  const queryEmbedding = toPgVector(await embedText(userQuery));

  const searchResults = await searchSimilarDocuments(dc, {
    queryEmbedding,
    limit: 3,
  });

  const sources = searchResults.data.documents as Array<{ title: string; content: string }>;
  const context = sources.map(d => `- ${d.title}: ${d.content}`).join('\n');

  return { context, sources };
}

function buildPrompt(userQuery: string, context?: string): string {
  if (context) {
    return `
Tu es l'assistant RH de l'entreprise. Réponds précisément à la question en te basant UNIQUEMENT sur le contexte fourni.
Si le contexte ne contient pas l'information, dis-le clairement.

CONTEXTE :
${context}

QUESTION :
${userQuery}
`.trim();
  }

  return `
Tu es l'assistant RH de l'entreprise. Réponds à la question suivante avec tes connaissances générales.
Tu n'as accès à aucun document interne de l'entreprise.

QUESTION :
${userQuery}
`.trim();
}

async function generateAnswer(prompt: string): Promise<string> {
  const finalResponse = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  return finalResponse.text ?? '';
}

export type DocumentRecord = { id: string; title: string; content: string };

export async function getDocuments(): Promise<DocumentRecord[]> {
  const result = await listDocuments(dc);
  return result.data.documents as DocumentRecord[];
}

export async function addDocument(title: string, content: string) {
  const vector = toPgVector(await embedText(content));

  await createDocument(dc, {
    title,
    content,
    contentEmbedding: vector,
  });
}

const DEMO_DOCUMENTS = [
  {
    title: 'Politique Transport',
    content: "L'entreprise prend en charge 100% de votre abonnement Gozem ou de vos frais de métro.",
  },
  {
    title: 'Pause Déjeuner',
    content: "Tous les jours à 16h, c'est la pause déjeuner obligatoire dans la cuisine.",
  },
  {
    title: 'Grille de salare',
    content: '1000€ - 1500€ Post Junior, 1500€ - 2000€ Post Senior, 2000€ - 2500€ Post Expert',
  },
];

export async function seedDemoDocuments() {
  const existing = await getDocuments();
  const existingTitles = new Set(existing.map((doc) => doc.title));

  for (const doc of DEMO_DOCUMENTS) {
    if (existingTitles.has(doc.title)) continue;
    await addDocument(doc.title, doc.content);
    console.log(`✅ Document ajouté : "${doc.title}"`);
  }

  return getDocuments();
}
export async function askQuestion(userQuery: string, ragEnabled: boolean): Promise<AskQuestionResult> {
  const { context, sources } = ragEnabled
    ? await retrieveContext(userQuery)
    : { context: undefined, sources: undefined };

  const answer = await generateAnswer(buildPrompt(userQuery, context));

  return {
    answer,
    ragEnabled,
    context,
    sources,
  };
}

export function isRagEnabledFromEnv(): boolean {
  const value = process.env.RAG_ENABLED?.toLowerCase();
  if (value === 'true' || value === '1') return true;
  if (value === 'false' || value === '0') return false;
  return true;
}

export type DemoMode = 'compare' | 'rag' | 'no-rag';

export function parseDemoMode(args: string[]): DemoMode {
  if (args.includes('--no-rag')) return 'no-rag';
  if (args.includes('--rag')) return 'rag';
  if (args.includes('--compare')) return 'compare';
  return 'compare';
}
