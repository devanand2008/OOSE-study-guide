import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { Loader2, Mic, MicOff, PhoneOff, Send, Volume2, X } from 'lucide-react';
import { SYLLABUS_UNITS } from '../data/syllabus';
import { float32ToPcm16Base64, GaplessPcmPlayer } from '../utils/liveAudio';

interface ExamTutorDrawerProps {
  open: boolean;
  initialPrompt?: string;
  initialUnitTitle?: string;
  onClose: () => void;
}

type TutorMode = 'text' | 'voice';
type VoiceStatus = 'idle' | 'connecting' | 'connected' | 'error';

interface TranscriptEntry {
  id: string;
  speaker: 'You' | 'Live Tutor';
  text: string;
}

const VOICE_OPTIONS = ['Zephyr', 'Puck', 'Kore', 'Fenrir', 'Charon'] as const;

const QUICK_PROMPTS = [
  'Prepare a complete 5-page IEEE SRS for an Online Food Ordering System.',
  'Draw ASCII DFD Levels 0, 1, and 2 for an ATM Banking System with working steps.',
  'Explain Command, Proxy, and Publish-Subscribe design patterns with real-time examples.',
  'Write a 16-mark answer comparing Black Box vs White Box testing with BVA & Branch Coverage examples.',
];

export function ExamTutorDrawer({
  open,
  initialPrompt = '',
  initialUnitTitle = 'All Units (Software Engineering)',
  onClose,
}: ExamTutorDrawerProps) {
  const [mode, setMode] = useState<TutorMode>('text');
  const [prompt, setPrompt] = useState(initialPrompt);
  const [unitTitle, setUnitTitle] = useState(initialUnitTitle);
  const [markType, setMarkType] = useState<'16-Mark 5-Page Expansion' | '2-Mark Crisp Answer'>('16-Mark 5-Page Expansion');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);

  // Live API Voice Tutor State
  const [voiceName, setVoiceName] = useState<(typeof VOICE_OPTIONS)[number]>('Zephyr');
  const [voiceStatus, setVoiceStatus] = useState<VoiceStatus>('idle');
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [micMuted, setMicMuted] = useState(false);
  const [liveTextInput, setLiveTextInput] = useState('');
  const [transcripts, setTranscripts] = useState<TranscriptEntry[]>([]);

  const wsRef = useRef<WebSocket | null>(null);
  const inputCtxRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const playerRef = useRef<GaplessPcmPlayer | null>(null);
  const micMutedRef = useRef(false);

  useEffect(() => {
    micMutedRef.current = micMuted;
  }, [micMuted]);

  useEffect(() => {
    if (initialPrompt) {
      setPrompt(initialPrompt);
      setMode('text');
    }
  }, [initialPrompt]);

  useEffect(() => {
    if (initialUnitTitle) setUnitTitle(initialUnitTitle);
  }, [initialUnitTitle]);

  const stopVoiceSession = useCallback(() => {
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current.onaudioprocess = null;
      processorRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }
    if (inputCtxRef.current && inputCtxRef.current.state !== 'closed') {
      void inputCtxRef.current.close();
      inputCtxRef.current = null;
    }
    if (playerRef.current) {
      playerRef.current.dispose();
      playerRef.current = null;
    }
    if (wsRef.current) {
      if (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING) {
        wsRef.current.close();
      }
      wsRef.current = null;
    }
    setVoiceStatus('idle');
  }, []);

  useEffect(() => {
    if (!open) {
      stopVoiceSession();
    }
  }, [open, stopVoiceSession]);

  useEffect(() => {
    return () => stopVoiceSession();
  }, [stopVoiceSession]);

  const appendTranscript = useCallback((speaker: 'You' | 'Live Tutor', chunk: string) => {
    const clean = chunk.trim();
    if (!clean) return;
    setTranscripts((prev) => {
      const last = prev[prev.length - 1];
      if (last && last.speaker === speaker) {
        return [
          ...prev.slice(0, -1),
          { ...last, text: `${last.text} ${clean}`.trim() },
        ];
      }
      return [...prev, { id: `${Date.now()}-${Math.random()}`, speaker, text: clean }];
    });
  }, []);

  const startVoiceSession = async () => {
    stopVoiceSession();
    setVoiceError(null);
    setVoiceStatus('connecting');

    if (!navigator.mediaDevices?.getUserMedia) {
      setVoiceStatus('error');
      setVoiceError('Microphone capture is not supported in this browser.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { channelCount: 1, sampleRate: 16000, echoCancellation: true, noiseSuppression: true },
      });
      mediaStreamRef.current = stream;

      const player = new GaplessPcmPlayer();
      player.ensureContext();
      playerRef.current = player;

      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const params = new URLSearchParams({ voice: voiceName, unit: unitTitle });
      const ws = new WebSocket(`${protocol}//${window.location.host}/api/live-voice?${params.toString()}`);
      wsRef.current = ws;

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(String(event.data)) as {
            type?: string;
            data?: string;
            text?: string;
            error?: string;
          };
          if (msg.type === 'ready') {
            setVoiceStatus('connected');
            const inputCtx = new AudioContext({ sampleRate: 16000 });
            inputCtxRef.current = inputCtx;
            const source = inputCtx.createMediaStreamSource(stream);
            const processor = inputCtx.createScriptProcessor(4096, 1, 1);
            processorRef.current = processor;

            processor.onaudioprocess = (audioEvent) => {
              if (micMutedRef.current) return;
              if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
              const pcmBase64 = float32ToPcm16Base64(audioEvent.inputBuffer.getChannelData(0));
              wsRef.current.send(JSON.stringify({ type: 'audio', audio: pcmBase64 }));
            };

            source.connect(processor);
            processor.connect(inputCtx.destination);
          } else if (msg.type === 'audio' && msg.data) {
            playerRef.current?.enqueueBase64Pcm(msg.data);
          } else if (msg.type === 'interrupted') {
            playerRef.current?.interrupt();
          } else if (msg.type === 'inputTranscript' && msg.text) {
            appendTranscript('You', msg.text);
          } else if (msg.type === 'outputTranscript' && msg.text) {
            appendTranscript('Live Tutor', msg.text);
          } else if (msg.type === 'error') {
            setVoiceError(msg.error || 'Live API voice session failed.');
            setVoiceStatus('error');
          } else if (msg.type === 'closed') {
            setVoiceStatus('idle');
          }
        } catch {
          // Ignore invalid JSON frames
        }
      };

      ws.onerror = () => {
        setVoiceError('WebSocket connection to Live Voice Tutor failed.');
        setVoiceStatus('error');
      };

      ws.onclose = () => {
        if (wsRef.current === ws) {
          stopVoiceSession();
        }
      };
    } catch (err: unknown) {
      stopVoiceSession();
      setVoiceStatus('error');
      setVoiceError(
        err instanceof Error
          ? err.message
          : 'Could not access microphone. Please allow microphone permissions.',
      );
    }
  };

  const sendLiveTextPrompt = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = liveTextInput.trim();
    if (!trimmed || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    wsRef.current.send(JSON.stringify({ type: 'text', text: trimmed }));
    appendTranscript('You', trimmed);
    setLiveTextInput('');
  };

  if (!open) return null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!prompt.trim()) {
      setError('Enter a Software Engineering question or topic before submitting.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/exam-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt.trim(), unitTitle, markType }),
      });
      const payload = (await res.json()) as { answer?: string; error?: string };
      if (!res.ok) {
        throw new Error(payload.error || `Request failed with status ${res.status}`);
      }
      setAnswer(payload.answer ?? '');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to fetch answer right now.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 dark:bg-slate-950/75 no-print"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tutor-drawer-title"
    >
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 h-full shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-blue-700 dark:text-sky-400">
                {mode === 'text' ? 'High-Thinking Answer Expander' : 'Real-Time Voice Coach · Gemini Live'}
              </p>
              <h2 id="tutor-drawer-title" className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Software Engineering Exam Tutor
              </h2>
            </div>
            <button
              type="button"
              onClick={() => {
                stopVoiceSession();
                onClose();
              }}
              aria-label="Close Exam Tutor"
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-fit" role="tablist" aria-label="Tutor mode">
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'text'}
              onClick={() => setMode('text')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                mode === 'text'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Text Tutor
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'voice'}
              onClick={() => setMode('voice')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                mode === 'voice'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              Voice Tutor (Live)
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {mode === 'text' ? (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="tutor-unit" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Syllabus Unit
                    </label>
                    <select
                      id="tutor-unit"
                      value={unitTitle}
                      onChange={(e) => setUnitTitle(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-600 dark:focus:border-sky-500"
                    >
                      <option value="All Units (Software Engineering)">All Units (Software Engineering)</option>
                      {SYLLABUS_UNITS.map((u) => (
                        <option key={u.id} value={`Unit ${u.unitNumber}: ${u.title}`}>
                          Unit {u.unitNumber}: {u.shortTitle}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="tutor-marks" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Answer Format
                    </label>
                    <select
                      id="tutor-marks"
                      value={markType}
                      onChange={(e) =>
                        setMarkType(e.target.value as '16-Mark 5-Page Expansion' | '2-Mark Crisp Answer')
                      }
                      className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-600 dark:focus:border-sky-500"
                    >
                      <option value="16-Mark 5-Page Expansion">13 / 16-Mark 5-Page Blueprint</option>
                      <option value="2-Mark Crisp Answer">2-Mark Crisp Answer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="tutor-question" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Exam Question or Expansion Request
                  </label>
                  <textarea
                    id="tutor-question"
                    rows={4}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Ask for a 5-page expansion, alternate system SRS/DFD, or custom PERT/CPM worked example..."
                    className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-600 dark:focus:border-sky-500 resize-y"
                  />
                </div>

                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Quick Exam Prompts</p>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_PROMPTS.map((qp) => (
                      <button
                        key={qp}
                        type="button"
                        onClick={() => setPrompt(qp)}
                        className="text-left px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors"
                      >
                        {qp}
                      </button>
                    ))}
                  </div>
                </div>

                {error && (
                  <div
                    role="alert"
                    className="text-xs font-medium text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/80 rounded-lg px-3.5 py-2.5"
                  >
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-700 dark:bg-sky-600 hover:bg-blue-800 dark:hover:bg-sky-500 disabled:opacity-60 rounded-lg transition-colors"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  {loading ? 'Analyzing with High Thinking...' : 'Generate Exam Answer'}
                </button>
              </form>

              {answer && (
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-900 dark:text-slate-100">Generated Exam Answer</span>
                    <span>Structured Study Output</span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed font-sans">
                    {answer}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* LIVE VOICE TUTOR PANEL (gemini-3.8-live) */
            <div className="space-y-5" data-testid="live-voice-panel">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="voice-unit" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Oral Viva Focus
                  </label>
                  <select
                    id="voice-unit"
                    disabled={voiceStatus === 'connected' || voiceStatus === 'connecting'}
                    value={unitTitle}
                    onChange={(e) => setUnitTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-600 dark:focus:border-sky-500 disabled:bg-slate-50 dark:disabled:bg-slate-800"
                  >
                    <option value="All Units (Software Engineering)">All Units (Software Engineering)</option>
                    {SYLLABUS_UNITS.map((u) => (
                      <option key={u.id} value={`Unit ${u.unitNumber}: ${u.title}`}>
                        Unit {u.unitNumber}: {u.shortTitle}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="voice-persona" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Tutor Voice
                  </label>
                  <select
                    id="voice-persona"
                    disabled={voiceStatus === 'connected' || voiceStatus === 'connecting'}
                    value={voiceName}
                    onChange={(e) => setVoiceName(e.target.value as (typeof VOICE_OPTIONS)[number])}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-600 dark:focus:border-sky-500 disabled:bg-slate-50 dark:disabled:bg-slate-800"
                  >
                    {VOICE_OPTIONS.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {voiceStatus === 'connected'
                        ? 'Live Voice Session Active'
                        : voiceStatus === 'connecting'
                          ? 'Connecting to Live Voice Tutor...'
                          : 'Practice Spoken Exam & Viva Answers'}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      Speak naturally to quiz yourself on SDLC, UML, Design Patterns, Testing, or PERT/CPM.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {voiceStatus === 'connected' ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setMicMuted((m) => !m)}
                          className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap ${
                            micMuted
                              ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                          }`}
                        >
                          {micMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                          {micMuted ? 'Mic Muted' : 'Mute Mic'}
                        </button>
                        <button
                          type="button"
                          onClick={stopVoiceSession}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors whitespace-nowrap"
                        >
                          <PhoneOff className="w-3.5 h-3.5" />
                          End Session
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        disabled={voiceStatus === 'connecting'}
                        onClick={startVoiceSession}
                        className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-700 dark:bg-sky-600 hover:bg-blue-800 dark:hover:bg-sky-500 disabled:opacity-60 rounded-lg transition-colors whitespace-nowrap"
                      >
                        {voiceStatus === 'connecting' ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Mic className="w-3.5 h-3.5" />
                        )}
                        {voiceStatus === 'connecting' ? 'Connecting...' : 'Start Live Voice Session'}
                      </button>
                    )}
                  </div>
                </div>

                {voiceStatus === 'connected' && (
                  <form onSubmit={sendLiveTextPrompt} className="flex items-center gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                    <label htmlFor="live-text-nudge" className="sr-only">
                      Send a text question into the live voice session
                    </label>
                    <input
                      id="live-text-nudge"
                      type="text"
                      value={liveTextInput}
                      onChange={(e) => setLiveTextInput(e.target.value)}
                      placeholder="Type a follow-up question for the voice tutor to answer aloud..."
                      className="flex-1 px-3 py-2 text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-600 dark:focus:border-sky-500"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 text-xs font-semibold text-white bg-blue-700 dark:bg-sky-600 hover:bg-blue-800 dark:hover:bg-sky-500 rounded-lg whitespace-nowrap"
                    >
                      Send
                    </button>
                  </form>
                )}
              </div>

              {voiceError && (
                <div
                  role="alert"
                  className="text-xs font-medium text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/80 rounded-lg px-3.5 py-2.5"
                >
                  {voiceError}
                </div>
              )}

              {/* Live Transcript Feed */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-900 dark:text-slate-100">Live Conversation Transcript</span>
                  {transcripts.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setTranscripts([])}
                      className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {transcripts.length === 0 ? (
                  <div className="border border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-6 text-center text-xs text-slate-500 dark:text-slate-400">
                    Start a live voice session and ask a question such as &ldquo;Quiz me on Unit 3 Coupling and Cohesion&rdquo; or &ldquo;Explain the Spiral Model quadrants.&rdquo;
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                    {transcripts.map((t) => (
                      <div
                        key={t.id}
                        className={`rounded-xl px-4 py-3 text-sm leading-relaxed ${
                          t.speaker === 'You'
                            ? 'bg-blue-50 dark:bg-sky-950/50 text-blue-950 dark:text-sky-100 border border-blue-200/80 dark:border-sky-800/80'
                            : 'bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">{t.speaker}</div>
                        <p>{t.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
