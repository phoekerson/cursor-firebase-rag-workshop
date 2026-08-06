import 'dotenv/config';
import './firebase';
import { addDocument, askQuestion, isRagEnabledFromEnv, parseDemoMode } from './rag';

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

async function main() {
  const demoMode = parseDemoMode(process.argv.slice(2));
  const defaultRagEnabled = isRagEnabledFromEnv();
  const question =
    process.env.DEMO_QUESTION ??
    "Comment la boîte m'aide pour aller au travail ?";

  console.log('--- 1. INGESTION DES DONNÉES ---');
  await addDocument(
    'Politique Transport',
    "L'entreprise prend en charge 100% de votre abonnement Navigo ou de vos frais de vélib."
  );
  await addDocument(
    'Pause Fika',
    "Tous les jours à 16h, c'est la pause café obligatoire dans la cuisine."
  );

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
