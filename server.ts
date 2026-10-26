import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // JSON parser only for API routes
  app.use('/api', express.json());

  // Initialize Gemini AI Client if API key is present
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    try {
      ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    } catch (e) {
      console.warn('Failed to initialize GoogleGenAI client:', e);
    }
  }

  // API Route: Summarize Book and generate comprehensive Somali chapters
  app.post('/api/books/summarize', async (req, res) => {
    try {
      const { title, author, category } = req.body;
      if (!title || typeof title !== 'string' || !title.trim()) {
        return res.status(400).json({ error: 'Magaca buugga waa lagama maarmaan' });
      }

      const bookTitle = title.trim();
      const bookAuthor = author?.trim() || '';

      if (!ai) {
        return res.status(503).json({
          error: 'Gemini API lama heli karo (API key ma jiro). Isticmaal matoorka maxalliga ah.',
        });
      }

      const prompt = `Soo koob buuggan una qor cutubyo dhammaystiran oo af-Soomaali ah:
Magaca Buugga: "${bookTitle}"
${bookAuthor ? `Qoraaga: "${bookAuthor}"` : ''}
${category ? `Qeybta: "${category}"` : ''}

Tilmaamaha:
1. Qor dulucda guud ee buugga iyo sababta uu muhiimka u yahay af-Soomaali sugan oo macaan.
2. U samee ugu yaraan 3 ilaa 5 cutub oo waaweyn (chapters).
3. Cutub kasta waa inuu leeyahay:
   - Cinwaanka cutubka (Tusaale: "Cutubka 1aad: ...")
   - Qoraal faahfaahsan oo 3-4 baaragaraaf ah oo si buuxda u sharxaya nuxurka cutubka, sheekooyinka, xeerarka, iyo fahamka dhabta ah.
   - Dulucda kooban (summary)
   - Ugu yaraan laba qodob oo muhiim ah (keyTakeaways)
   - Tallaabo dhaqangelin ah (actionStep)
   - Oraah ama xikmad dahabi ah (quote)
4. Sidoo kale bixi 4 qodob oo ugu muhiimsan buugga oo dhan (takeaways).`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction:
            'You are an expert Somali literary author, translator, and book scholar. You summarize world-renowned and Somali books into authentic, rich, and inspiring Somali chapters with actionable lessons.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              author: { type: Type.STRING },
              category: { type: Type.STRING },
              summary: { type: Type.STRING },
              estimatedPages: { type: Type.INTEGER },
              takeaways: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              chapters: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    title: { type: Type.STRING },
                    content: { type: Type.STRING },
                    summary: { type: Type.STRING },
                    keyTakeaways: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    actionStep: { type: Type.STRING },
                    quote: { type: Type.STRING },
                  },
                  required: ['id', 'title', 'content'],
                },
              },
            },
            required: ['title', 'summary', 'chapters'],
          },
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error('Jawaab madhan ayaa ka timid moodeelka');
      }

      const parsedData = JSON.parse(responseText);
      return res.json(parsedData);
    } catch (error: any) {
      console.error('Error summarizing book:', error);
      return res.status(500).json({
        error: error.message || 'Khalad ayaa dhacay intii lagu guda jiray soo-koobista buugga',
      });
    }
  });

  // API Route: Generate a single next chapter for an existing book
  app.post('/api/books/generate-chapter', async (req, res) => {
    try {
      const { bookTitle, author, chapterNumber, chapterTitle } = req.body;
      if (!bookTitle) {
        return res.status(400).json({ error: 'Magaca buugga waa lagama maarmaan' });
      }

      if (!ai) {
        return res.status(503).json({ error: 'Gemini API lama heli karo' });
      }

      const prompt = `U qor cutub cusub oo buuxa buuggan af-Soomaali ahaan:
Magaca Buugga: "${bookTitle}"
${author ? `Qoraaga: "${author}"` : ''}
Lambarka Cutubka: Cutubka ${chapterNumber || 'xiga'}
${chapterTitle ? `Cinwaanka Cutubka ee la doonayo: "${chapterTitle}"` : ''}

Qor cutub faahfaahsan oo qoto dheer (3-4 baaragaraaf), sharaxaad xeel dheer, tusaalooyin dhab ah, tallaabo dhaqangelin, iyo oraah xikmad leh.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction:
            'You are an expert Somali writer and educator. Write detailed, authentic, inspiring book chapters in natural Somali.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              content: { type: Type.STRING },
              summary: { type: Type.STRING },
              keyTakeaways: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              actionStep: { type: Type.STRING },
              quote: { type: Type.STRING },
            },
            required: ['title', 'content'],
          },
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error('Jawaab madhan ayaa ka timid moodeelka');
      }

      const parsedData = JSON.parse(responseText);
      return res.json(parsedData);
    } catch (error: any) {
      console.error('Error generating chapter:', error);
      return res.status(500).json({
        error: error.message || 'Khalad ayaa dhacay intii lagu guda jiray diyaarinta cutubka',
      });
    }
  });

  // Vite Integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
