import 'dotenv/config';
import express from 'express';
import path from 'path';
import './firebase';
import { addDocument, askQuestion, getDocuments, seedDemoDocuments } from './rag';

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    dataConnectMode: process.env.USE_FIREBASE_EMULATOR === 'false' ? 'production' : 'emulator',
  });
});

app.get('/api/documents', async (_req, res) => {
  try {
    const documents = await getDocuments();
    res.json({ documents });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

app.post('/api/documents', async (req, res) => {
  try {
    const { title, content } = req.body as { title?: string; content?: string };
    if (!title?.trim() || !content?.trim()) {
      res.status(400).json({ error: 'title et content sont requis' });
      return;
    }
    await addDocument(title.trim(), content.trim());
    const documents = await getDocuments();
    res.json({ ok: true, documents });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

app.post('/api/seed', async (_req, res) => {
  try {
    const documents = await seedDemoDocuments();
    res.json({ ok: true, documents });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

app.post('/api/ask', async (req, res) => {
  try {
    const { question, ragEnabled, compare } = req.body as {
      question?: string;
      ragEnabled?: boolean;
      compare?: boolean;
    };

    if (!question?.trim()) {
      res.status(400).json({ error: 'question est requise' });
      return;
    }

    if (compare) {
      const [withoutRag, withRag] = await Promise.all([
        askQuestion(question.trim(), false),
        askQuestion(question.trim(), true),
      ]);
      res.json({ withoutRag, withRag });
      return;
    }

    const result = await askQuestion(question.trim(), ragEnabled ?? true);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

app.listen(port, () => {
  console.log(`\n🌐 Interface RAG : http://localhost:${port}`);
  console.log('   Assure-toi que l’émulateur Data Connect tourne (npm run emulators)\n');
});
