import http from 'http';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Modality, ThinkingLevel, type LiveServerMessage } from '@google/genai';
import { WebSocketServer, type WebSocket } from 'ws';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 3000;

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    throw new Error('GEMINI_API_KEY is not configured in environment secrets.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const ALLOWED_VOICES = new Set(['Zephyr', 'Puck', 'Kore', 'Fenrir', 'Charon']);

function sendJson(ws: WebSocket, payload: Record<string, unknown>) {
  if (ws.readyState === ws.OPEN) {
    ws.send(JSON.stringify(payload));
  }
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.post('/api/exam-tutor', async (req, res) => {
    const { prompt, unitTitle, markType } = req.body as {
      prompt?: string;
      unitTitle?: string;
      markType?: string;
    };

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      res.status(400).json({ error: 'Please enter an exam question or topic to analyze.' });
      return;
    }

    try {
      const ai = getGeminiClient();
      const systemInstruction = [
        'You are a university Software Engineering exam professor and answer-key author.',
        'Format answers clearly for university exams (Anna University / B.E. CSE / IT style).',
        'For 13-mark or 16-mark questions, structure the response into a 5-page handwritten blueprint:',
        'Page 1: Introduction, Definition & Objectives',
        'Page 2: Core Architecture / Detailed Concepts',
        'Page 3: ASCII Diagram Sketch & Component Labeling Guide',
        'Page 4: Step-by-Step Working, Real-Time Example & Comparison Table',
        'Page 5: Advantages, Disadvantages, Applications & Conclusion.',
        'For 2-mark questions, keep answers crisp, accurate, and bulleted.',
        'Use clean Markdown headings, bullet lists, and tables.',
      ].join(' ');

      const contextPrefix = unitTitle
        ? `Syllabus Context: ${unitTitle}${markType ? ` (${markType})` : ''}\n\nQuestion:\n`
        : '';

      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: `${contextPrefix}${prompt.trim()}`,
        config: {
          systemInstruction,
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.HIGH,
          },
        },
      });

      const answer = response.text;
      if (!answer) {
        res.status(502).json({ error: 'The model returned an empty response. Please try again.' });
        return;
      }

      res.json({
        answer,
        model: 'gemini-4-hydrogen',
        thinkingLevel: 'HIGH',
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Unable to reach Gemini API right now.';
      const statusCode =
        message.includes('GEMINI_API_KEY') ? 503 :
        message.includes('429') || message.includes('RESOURCE_EXHAUSTED') ? 429 :
        message.includes('403') || message.includes('PERMISSION_DENIED') ? 403 : 500;
      res.status(statusCode).json({ error: message });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const server = http.createServer(app);
  const wss = new WebSocketServer({ noServer: true });

  server.on('upgrade', (request, socket, head) => {
    const url = new URL(request.url ?? '/', `http://${request.headers.host ?? 'localhost'}`);
    if (url.pathname === '/api/live-voice') {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    } else {
      socket.destroy();
    }
  });

  wss.on('connection', async (clientWs, request) => {
    const url = new URL(request.url ?? '/', `http://${request.headers.host ?? 'localhost'}`);
    const requestedVoice = url.searchParams.get('voice') ?? 'Zephyr';
    const voiceName = ALLOWED_VOICES.has(requestedVoice) ? requestedVoice : 'Zephyr';
    const unitFocus = url.searchParams.get('unit') ?? 'All Units (Software Engineering)';

    let session: Awaited<ReturnType<GoogleGenAI['live']['connect']>> | null = null;

    try {
      const ai = getGeminiClient();
      const sessionPromise = ai.live.connect({
        model: 'gemini-3.8-live',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName } },
          },
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          systemInstruction:
            `You are a friendly, concise Software Engineering university exam voice coach focusing on ${unitFocus}. ` +
            'Help the student practice viva/oral answers, memorize SDLC/UML/DFD/Design Patterns/Testing/PERT-CPM concepts, and give crisp exam tips in natural spoken responses.',
        },
        callbacks: {
          onopen: () => {
            sendJson(clientWs, { type: 'ready', model: 'gemini-3.8-live', voice: voiceName });
          },
          onmessage: (message: LiveServerMessage) => {
            const content = message.serverContent;
            if (content?.inputTranscription?.text) {
              sendJson(clientWs, {
                type: 'inputTranscript',
                text: content.inputTranscription.text,
              });
            }
            if (content?.outputTranscription?.text) {
              sendJson(clientWs, {
                type: 'outputTranscript',
                text: content.outputTranscription.text,
              });
            }
            for (const part of content?.modelTurn?.parts ?? []) {
              if (part.inlineData?.data) {
                sendJson(clientWs, { type: 'audio', data: part.inlineData.data });
              }
            }
            if (content?.interrupted) {
              sendJson(clientWs, { type: 'interrupted' });
            }
            if (content?.turnComplete) {
              sendJson(clientWs, { type: 'turnComplete' });
            }
          },
          onerror: (err) => {
            sendJson(clientWs, {
              type: 'error',
              error: err?.message || 'Gemini Live API session encountered an error.',
            });
          },
          onclose: () => {
            sendJson(clientWs, { type: 'closed' });
          },
        },
      });

      session = await sessionPromise;

      clientWs.on('message', (raw) => {
        try {
          const msg = JSON.parse(raw.toString()) as {
            type?: string;
            audio?: string;
            text?: string;
          };
          if (!session) return;
          if (msg.type === 'audio' && typeof msg.audio === 'string' && msg.audio.length > 0) {
            session.sendRealtimeInput({
              audio: { data: msg.audio, mimeType: 'audio/pcm;rate=16000' },
            });
          } else if (msg.type === 'text' && typeof msg.text === 'string' && msg.text.trim()) {
            session.sendRealtimeInput({
              text: msg.text.trim(),
            });
          }
        } catch {
          // Ignore malformed client frames
        }
      });

      clientWs.on('close', () => {
        try {
          session?.close();
        } catch {
          // Session already closed
        }
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Unable to start Gemini Live voice session.';
      sendJson(clientWs, { type: 'error', error: message });
      clientWs.close();
    }
  });

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`SE Exam Guide server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
