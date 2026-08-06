import 'dotenv/config';
import './firebase';
import { addDocument, askQuestion, isRagEnabledFromEnv, parseDemoMode, seedDemoDocuments } from './rag';

function printAnswer(label: string, result: Awaited<ReturnType<typeof askQuestion>>) {
  console.log(`\n${label}`);
  console.log(`Mode : ${result.ragEnabled ? 'RAG activé' : 'RAG désactivé'}`);

  if (result.ragEnabled && result.sources?.length) {
    console.log('\n📚 Documents retrouvés :');
    result.sources.forEach((doc, index) => {
      console.log(`  ${index + 1}. ${doc.title}`);
    });
  }

  console.log('\n🤖 Réponse :');
  console.log(result.answer);
}

function parseQuestion(args: string[]): string {
  const questionIndex = args.indexOf('--question');
  if (questionIndex !== -1 && args[questionIndex + 1]) {
    return args[questionIndex + 1];
  }
  return process.env.DEMO_QUESTION ?? "Quel est le salaire d'un poste Senior ?";
}

function shouldSkipIngest(args: string[]): boolean {
  return args.includes('--ask-only');
}

async function main() {
  const args = process.argv.slice(2);
  const demoMode = parseDemoMode(args);
  const defaultRagEnabled = isRagEnabledFromEnv();
  const question = parseQuestion(args);

  if (!shouldSkipIngest(args)) {
    console.log('--- 1. INGESTION DES DONNÉES ---');
    const documents = await seedDemoDocuments();
    console.log(`✅ ${documents.length} document(s) disponible(s) :`);
    documents.forEach((doc) => console.log(`   • ${doc.title}`));
  } else {
    console.log('--- 1. INGESTION IGNORÉE (--ask-only) ---');
  }

  console.log('\n--- 2. DÉMONSTRATION ---');
  console.log(`Question : "${question}"`);

  if (demoMode === 'compare') {
    const withoutRag = await askQuestion(question, false);
    const withRag = await askQuestion(question, true);

    printAnswer('--- SANS RAG (connaissances générales) ---', withoutRag);
    printAnswer('--- AVEC RAG (documents internes) ---', withRag);
    return;
  }

  const ragEnabled = demoMode === 'rag' ? true : demoMode === 'no-rag' ? false : defaultRagEnabled;
  const result = await askQuestion(question, ragEnabled);
  printAnswer('--- RÉSULTAT ---', result);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
