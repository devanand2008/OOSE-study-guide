import { useCallback, useEffect, useRef, useState } from 'react';
import {
  advanceSprintRound,
  applyHintTier,
  createInitialSprintState,
  startSprintRun,
  submitSprintAnswer,
  type GameDeckFilter,
  type SprintGameState,
} from '../../game/seGameEngine';

interface SEExamSprintGameProps {
  onExit: () => void;
}

function playSynthTone(
  ctxRef: { current: AudioContext | null },
  muted: boolean,
  notes: { freq: number; duration: number; delay?: number; type?: OscillatorType; gain?: number }[],
) {
  if (muted) return;
  try {
    if (!ctxRef.current || ctxRef.current.state === 'closed') {
      ctxRef.current = new AudioContext();
    }
    const ctx = ctxRef.current;
    if (ctx.state === 'suspended') {
      void ctx.resume();
    }
    const now = ctx.currentTime;
    for (const n of notes) {
      const osc = ctx.createOscillator();
      const amp = ctx.createGain();
      osc.type = n.type ?? 'triangle';
      osc.frequency.setValueAtTime(n.freq, now + (n.delay ?? 0));
      const start = now + (n.delay ?? 0);
      const peak = n.gain ?? 0.11;
      amp.gain.setValueAtTime(0.001, start);
      amp.gain.exponentialRampToValueAtTime(peak, start + 0.015);
      amp.gain.exponentialRampToValueAtTime(0.001, start + n.duration);
      osc.connect(amp);
      amp.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + n.duration + 0.02);
    }
  } catch {
    // Web Audio unavailable in headless or restricted context
  }
}

function ShieldPip({ state }: { state: 'full' | 'cracked' | 'empty' }) {
  const fill = state === 'full' ? '#38bdf8' : state === 'cracked' ? '#f59e0b' : 'transparent';
  const stroke = state === 'empty' ? '#475569' : '#0f172a';
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" aria-hidden="true">
      <path
        d="M12 2.5L4.5 5.6v5.7c0 4.9 3.2 9.1 7.5 10.5 4.3-1.4 7.5-5.6 7.5-10.5V5.6L12 2.5z"
        fill={fill}
        stroke={stroke}
        strokeWidth="2"
      />
      {state === 'full' && (
        <path d="M12 4.8L6.8 7v4.1c0 3.5 2.2 6.6 5.2 7.8V4.8z" fill="#7dd3fc" opacity="0.5" />
      )}
      {state === 'cracked' && (
        <path d="M12 6l-1.5 4 2.5 2-1.8 4.5" stroke="#0f172a" strokeWidth="1.6" fill="none" />
      )}
    </svg>
  );
}

export function SEExamSprintGame({ onExit }: SEExamSprintGameProps) {
  const [game, setGame] = useState<SprintGameState>(() => {
    const autostart =
      typeof window !== 'undefined' &&
      new URLSearchParams(window.location.search).get('autostart') === '1';
    return createInitialSprintState('all', autostart ? 'playing' : 'title');
  });
  const [muted, setMuted] = useState(false);
  const [bestScore, setBestScore] = useState<number>(() => {
    try {
      const saved = window.localStorage.getItem('se-exam-sprint-best-v1');
      return saved ? Math.max(0, Number(saved) || 0) : 0;
    } catch {
      return 0;
    }
  });
  const [pulseFeedback, setPulseFeedback] = useState<'none' | 'correct' | 'wrong'>('none');
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Mirror state machine to document.body.dataset.state
  useEffect(() => {
    const mapped =
      game.phase === 'victory' || game.phase === 'defeat' ? 'gameover' : game.phase;
    document.body.dataset.state = mapped;
    return () => {
      delete document.body.dataset.state;
    };
  }, [game.phase]);

  // Persist best score when final snapshot lands
  useEffect(() => {
    if (game.finalSnapshot && game.finalSnapshot.score > bestScore) {
      setBestScore(game.finalSnapshot.score);
      try {
        window.localStorage.setItem('se-exam-sprint-best-v1', String(game.finalSnapshot.score));
      } catch {
        // Ignore storage write errors
      }
    }
  }, [game.finalSnapshot, bestScore]);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        void audioCtxRef.current.close();
      }
    };
  }, []);

  const triggerPulse = useCallback((kind: 'correct' | 'wrong') => {
    setPulseFeedback(kind);
    window.setTimeout(() => setPulseFeedback('none'), 220);
  }, []);

  const handleStart = useCallback(
    (filter: GameDeckFilter = game.deckFilter) => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      document.body.dataset.state = 'playing';
      playSynthTone(audioCtxRef, muted, [
        { freq: 440, duration: 0.08 },
        { freq: 660, duration: 0.12, delay: 0.06 },
      ]);
      setGame(startSprintRun(filter));
    },
    [game.deckFilter, muted],
  );

  const handleSelectOption = useCallback(
    (optionIndex: number) => {
      setGame((prev) => {
        const next = submitSprintAnswer(prev, optionIndex);
        if (next === prev) return prev;
        if (next.lastOutcome === 'correct') {
          const pitchBoost = Math.min(next.streak, 4) * 55;
          playSynthTone(audioCtxRef, muted, [
            { freq: 520 + pitchBoost, duration: 0.09, type: 'triangle' },
            { freq: 720 + pitchBoost, duration: 0.14, delay: 0.07, type: 'triangle' },
          ]);
          triggerPulse('correct');
        } else {
          playSynthTone(audioCtxRef, muted, [
            { freq: 210, duration: 0.14, type: 'sawtooth', gain: 0.08 },
            { freq: 155, duration: 0.18, delay: 0.08, type: 'sawtooth', gain: 0.08 },
          ]);
          triggerPulse('wrong');
        }
        return next;
      });
    },
    [muted, triggerPulse],
  );

  const handleNextRound = useCallback(() => {
    setGame((prev) => {
      const next = advanceSprintRound(prev);
      if (next.phase === 'victory') {
        playSynthTone(audioCtxRef, muted, [
          { freq: 523.25, duration: 0.1 },
          { freq: 659.25, duration: 0.1, delay: 0.09 },
          { freq: 783.99, duration: 0.18, delay: 0.18 },
        ]);
      } else if (next.phase === 'defeat') {
        playSynthTone(audioCtxRef, muted, [
          { freq: 260, duration: 0.16, type: 'sawtooth', gain: 0.08 },
          { freq: 190, duration: 0.24, delay: 0.14, type: 'sawtooth', gain: 0.08 },
        ]);
      }
      return next;
    });
  }, [muted]);

  const handleHint = useCallback(() => {
    setGame((prev) => {
      const next = applyHintTier(prev);
      if (next !== prev) {
        playSynthTone(audioCtxRef, muted, [{ freq: 580, duration: 0.08, type: 'sine', gain: 0.08 }]);
      }
      return next;
    });
  }, [muted]);

  // Unified keyboard shortcuts
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const key = e.key.toLowerCase();

      if (key === 'm') {
        setMuted((m) => !m);
        return;
      }

      if (game.phase === 'title') {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleStart(game.deckFilter);
        }
        return;
      }

      if (game.phase === 'playing') {
        if (e.key === 'Escape' || key === 'p') {
          e.preventDefault();
          setGame((prev) => ({ ...prev, phase: 'paused' }));
          return;
        }
        if (key === 'h') {
          e.preventDefault();
          handleHint();
          return;
        }
        if (key === 'r') {
          e.preventDefault();
          handleStart(game.deckFilter);
          return;
        }
        if (game.selectedOptionIndex === null) {
          if (e.key >= '1' && e.key <= '4') {
            e.preventDefault();
            handleSelectOption(Number(e.key) - 1);
          }
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNextRound();
        }
        return;
      }

      if (game.phase === 'paused') {
        if (e.key === 'Escape' || key === 'p') {
          e.preventDefault();
          setGame((prev) => ({ ...prev, phase: 'playing' }));
        }
        return;
      }

      if (game.phase === 'victory' || game.phase === 'defeat') {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleStart(game.deckFilter);
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [
    game.deckFilter,
    game.phase,
    game.selectedOptionIndex,
    handleHint,
    handleNextRound,
    handleSelectOption,
    handleStart,
  ]);

  const currentCard = game.deck[game.roundIndex];

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden bg-[#0b1526] text-slate-100 flex flex-col select-none"
      data-testid="se-exam-sprint-shell"
      style={{
        backgroundImage:
          'radial-gradient(circle at 22% 18%, rgba(37,99,235,0.22), transparent 48%), linear-gradient(rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px)',
        backgroundSize: '100% 100%, 40px 40px, 40px 40px',
      }}
    >
      {/* TITLE SCREEN */}
      {game.phase === 'title' && (
        <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 max-w-5xl mx-auto w-full">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onExit}
              className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/90 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
            >
              Back to Study Guide
            </button>
            <button
              type="button"
              tabIndex={-1}
              onClick={(e) => {
                e.currentTarget.blur();
                setMuted((m) => !m);
              }}
              aria-label={muted ? 'Unmute game audio' : 'Mute game audio'}
              className="px-3 py-2 text-xs font-mono text-slate-300 hover:text-white bg-slate-900/90 border border-slate-700 rounded-lg"
            >
              {muted ? 'Audio: Off [M]' : 'Audio: On [M]'}
            </button>
          </div>

          <div className="my-auto py-8 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
            {/* Bespoke SVG Title Emblem over calm negative space */}
            <div className="space-y-6">
              <svg
                viewBox="0 0 420 120"
                className="w-full max-w-[400px] h-auto"
                role="img"
                aria-label="SE Exam Sprint"
              >
                <rect x="4" y="14" width="66" height="66" rx="14" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="2.5" />
                <path d="M22 47l10 10 22-24" fill="none" stroke="#f8fafc" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
                <text
                  x="86"
                  y="48"
                  fill="#f8fafc"
                  fontFamily="Bricolage Grotesque, sans-serif"
                  fontSize="36"
                  fontWeight="800"
                  letterSpacing="-0.5"
                >
                  SE EXAM SPRINT
                </text>
                <text
                  x="88"
                  y="74"
                  fill="#93c5fd"
                  fontFamily="IBM Plex Mono, monospace"
                  fontSize="13"
                  fontWeight="600"
                  letterSpacing="2"
                >
                  UNITS 1–6 TACTICAL DRILL
                </text>
                <line x1="88" y1="88" x2="386" y2="88" stroke="#334155" strokeWidth="2" />
              </svg>

              {/* Deck Selector */}
              <div className="space-y-2">
                <p className="text-xs font-mono text-slate-400">Select Syllabus Deck</p>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Select Syllabus Deck">
                  {(
                    [
                      ['all', 'All 6 Units (10 Rounds)'],
                      ['units1to3', 'Units 1–3 (SDLC, UML, Design)'],
                      ['units4to6', 'Units 4–6 (Patterns, Test, CPM)'],
                    ] as const
                  ).map(([val, label]) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() =>
                        setGame((prev) => createInitialSprintState(val, prev.phase))
                      }
                      className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap ${
                        game.deckFilter === val
                          ? 'bg-blue-600 border-blue-400 text-white'
                          : 'bg-slate-900/90 border-slate-700 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  type="button"
                  data-start="true"
                  onClick={() => handleStart(game.deckFilter)}
                  className="px-7 py-3.5 text-sm font-bold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-xl shadow-lg transition-transform active:scale-[0.98] whitespace-nowrap"
                >
                  Start Game
                </button>
                {bestScore > 0 && (
                  <span className="text-xs font-mono tabular-nums text-slate-300">
                    Best Score: <strong className="text-amber-300">{bestScore}</strong>
                  </span>
                )}
              </div>
            </div>

            {/* Live Blueprint Deck Preview Card */}
            <div className="bg-[#111e33] border border-slate-700/90 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between text-xs font-mono text-sky-300">
                <span>RULES &amp; SCORING</span>
                <span>3 SHIELDS</span>
              </div>
              <div className="space-y-2.5 text-sm text-slate-300 leading-relaxed">
                <p>Chain consecutive right answers to build up to a <strong className="text-white">4× Streak Multiplier</strong>.</p>
                <p>Use the <strong className="text-white">3-Tier Hint System</strong> (Unit Clue → 50/50 Elimination → Textbook Keyword) whenever stuck.</p>
                <p>Clear all rounds before losing all 3 Vitality Shields to master the syllabus deck.</p>
              </div>
            </div>
          </div>

          <p className="text-center text-xs font-mono text-slate-400 tracking-wide">
            1–4 Select Option · H Hint · P Pause · R Restart · M Mute
          </p>
        </div>
      )}

      {/* PLAYING HUD & BOARD */}
      {(game.phase === 'playing' || game.phase === 'paused') && currentCard && (
        <div className="flex-1 flex flex-col justify-between p-4 sm:p-6 max-w-5xl mx-auto w-full gap-5">
          {/* Perimeter Top HUD Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-[#101c30] border border-slate-700/80 rounded-xl px-4 py-3">
            <div className="flex items-center gap-5">
              {/* Vitality Shields */}
              <div className="flex items-center gap-1.5" aria-label={`Vitality shields: ${game.shields} of ${game.maxShields}`}>
                <span className="text-[11px] font-mono text-slate-400 mr-1">SHIELD</span>
                {Array.from({ length: game.maxShields }).map((_, idx) => (
                  <ShieldPip
                    key={idx}
                    state={idx < game.shields ? 'full' : idx === game.shields && game.lastOutcome === 'wrong' ? 'cracked' : 'empty'}
                  />
                ))}
              </div>

              <div className="h-6 w-px bg-slate-700 hidden sm:block" aria-hidden="true" />

              {/* Score & Streak */}
              <div className="flex items-baseline gap-4 font-mono tabular-nums">
                <div>
                  <span className="text-[10px] text-slate-400 block">SCORE</span>
                  <span className="text-xl font-bold text-white" data-testid="game-score">
                    {game.score}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">STREAK</span>
                  <span className="text-xl font-bold text-amber-300" data-testid="game-streak">
                    {game.streak}×
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">ROUND</span>
                  <span className="text-xl font-bold text-sky-300" data-testid="game-round">
                    {game.roundIndex + 1}/{game.deck.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Utility Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                tabIndex={-1}
                onClick={(e) => {
                  e.currentTarget.blur();
                  setMuted((m) => !m);
                }}
                aria-label={muted ? 'Unmute audio' : 'Mute audio'}
                className="px-2.5 py-1.5 text-xs font-mono text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-md"
              >
                {muted ? 'Mute [M]' : 'SFX [M]'}
              </button>
              <button
                type="button"
                tabIndex={-1}
                onClick={(e) => {
                  e.currentTarget.blur();
                  setGame((prev) => ({ ...prev, phase: 'paused' }));
                }}
                aria-label="Pause game"
                className="px-2.5 py-1.5 text-xs font-mono text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-md"
              >
                Pause [P]
              </button>
            </div>
          </div>

          {/* Center Tactical Scenario Board */}
          <div
            className={`flex-1 flex flex-col justify-center gap-5 transition-transform duration-150 ${
              pulseFeedback === 'correct'
                ? 'scale-[1.008]'
                : pulseFeedback === 'wrong'
                  ? 'translate-x-1'
                  : ''
            }`}
          >
            <div className="bg-[#111e33] border border-slate-700 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs font-mono text-sky-300">
                  {game.hintTier >= 1
                    ? `UNIT ${currentCard.unitNumber} · ${currentCard.unitName.toUpperCase()} · ${currentCard.topic.toUpperCase()}`
                    : `SCENARIO CARD 0${game.roundIndex + 1}`}
                </div>

                <button
                  type="button"
                  disabled={game.selectedOptionIndex !== null || game.hintTier >= 3}
                  onClick={handleHint}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-500/20 text-amber-200 border border-amber-400/50 hover:bg-amber-500/30 disabled:opacity-45 transition-colors whitespace-nowrap"
                >
                  {game.hintTier === 0
                    ? 'Hint 1: Unit Clue [H]'
                    : game.hintTier === 1
                      ? 'Hint 2: 50/50 Cut [H]'
                      : game.hintTier === 2
                        ? 'Hint 3: Keyword [H]'
                        : 'All Hints Used'}
                </button>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug max-w-3xl">
                {currentCard.prompt}
              </h2>

              {game.hintTier >= 3 && (
                <div className="bg-amber-950/60 border border-amber-500/50 rounded-lg px-4 py-2.5 text-xs text-amber-200">
                  <strong className="font-mono">CLUE:</strong> {currentCard.keywordClue}
                </div>
              )}

              {/* 4 Tactile >= 56px Option Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {currentCard.options.map((option, idx) => {
                  const eliminated = game.eliminatedIndices.includes(idx);
                  const answered = game.selectedOptionIndex !== null;
                  const isSelected = game.selectedOptionIndex === idx;
                  const isCorrect = idx === currentCard.correctIndex;

                  let cardClasses =
                    'bg-slate-900/90 border-slate-700 text-slate-100 hover:border-sky-400 hover:bg-slate-800/90';
                  if (eliminated) {
                    cardClasses = 'bg-slate-950/60 border-slate-800 text-slate-600 line-through opacity-45 cursor-not-allowed';
                  } else if (answered && isCorrect) {
                    cardClasses = 'bg-emerald-950/80 border-emerald-400 text-emerald-100';
                  } else if (answered && isSelected && !isCorrect) {
                    cardClasses = 'bg-red-950/80 border-red-400 text-red-100';
                  } else if (answered) {
                    cardClasses = 'bg-slate-900/50 border-slate-800 text-slate-500';
                  }

                  return (
                    <button
                      key={option}
                      type="button"
                      disabled={eliminated || answered}
                      onClick={() => handleSelectOption(idx)}
                      className={`min-h-[60px] text-left px-4 py-3.5 rounded-xl border-2 transition-colors duration-150 flex items-center gap-3.5 ${cardClasses}`}
                    >
                      <span className="w-7 h-7 rounded-md bg-slate-800 border border-slate-600 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-sm sm:text-base font-medium leading-snug">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Post-Answer Explanation & Continue */}
              {game.selectedOptionIndex !== null && (
                <div className="pt-4 border-t border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div
                      className={`text-xs font-mono font-bold ${
                        game.lastOutcome === 'correct' ? 'text-emerald-300' : 'text-red-300'
                      }`}
                    >
                      {game.lastOutcome === 'correct'
                        ? `CORRECT · STREAK ${game.streak}×`
                        : `SHIELD LOST · ${game.shields} REMAINING`}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                      {currentCard.explanation}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextRound}
                    className="px-5 py-2.5 text-sm font-bold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    {game.shields <= 0
                      ? 'View Summary'
                      : game.roundIndex + 1 >= game.deck.length
                        ? 'Finish Sprint'
                        : 'Next Card [Enter]'}
                  </button>
                </div>
              )}
            </div>
          </div>

          <p className="text-center text-xs font-mono text-slate-500">
            1–4 Answer · H Hint · P Pause · R Restart · M Mute
          </p>
        </div>
      )}

      {/* PAUSE MODAL */}
      {game.phase === 'paused' && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-[rgba(7,12,24,0.86)] p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sprint-pause-title"
        >
          <div className="w-full max-w-md bg-[#111e33] border border-slate-700 rounded-2xl p-6 space-y-5 shadow-2xl">
            <div>
              <p className="text-xs font-mono text-sky-300">SPRINT PAUSED</p>
              <h2 id="sprint-pause-title" className="text-2xl font-bold text-white mt-1">
                Take a Breather
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-3 font-mono tabular-nums">
              <div className="bg-slate-900/90 border border-slate-700 rounded-lg p-3">
                <div className="text-[10px] text-slate-400">SCORE</div>
                <div className="text-lg font-bold text-white">{game.score}</div>
              </div>
              <div className="bg-slate-900/90 border border-slate-700 rounded-lg p-3">
                <div className="text-[10px] text-slate-400">ROUND</div>
                <div className="text-lg font-bold text-sky-300">
                  {game.roundIndex + 1}/{game.deck.length}
                </div>
              </div>
              <div className="bg-slate-900/90 border border-slate-700 rounded-lg p-3">
                <div className="text-[10px] text-slate-400">SHIELDS</div>
                <div className="text-lg font-bold text-amber-300">{game.shields}</div>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => setGame((prev) => ({ ...prev, phase: 'playing' }))}
                className="w-full py-2.5 text-sm font-bold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-lg transition-colors"
              >
                Resume Sprint
              </button>
              <button
                type="button"
                onClick={() => handleStart(game.deckFilter)}
                className="w-full py-2.5 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg transition-colors"
              >
                Restart Deck
              </button>
              <button
                type="button"
                onClick={onExit}
                className="w-full py-2.5 text-sm font-medium text-slate-300 hover:text-white bg-transparent border border-slate-700 rounded-lg transition-colors"
              >
                Exit to Study Guide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VICTORY / GAME OVER MODAL */}
      {(game.phase === 'victory' || game.phase === 'defeat') && game.finalSnapshot && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-[rgba(7,12,24,0.88)] p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sprint-end-title"
        >
          <div className="w-full max-w-md bg-[#111e33] border border-slate-700 rounded-2xl p-6 space-y-5 shadow-2xl">
            <div>
              <p
                className={`text-xs font-mono font-bold ${
                  game.phase === 'victory' ? 'text-emerald-300' : 'text-amber-300'
                }`}
              >
                {game.phase === 'victory' ? 'DECK CLEARED' : 'SHIELDS DEPLETED'}
              </p>
              <h2 id="sprint-end-title" className="text-2xl font-bold text-white mt-1">
                {game.phase === 'victory' ? 'Exam Sprint Mastered' : 'Run Complete'}
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-3 font-mono tabular-nums">
              <div className="bg-slate-900/90 border border-slate-700 rounded-lg p-3">
                <div className="text-[10px] text-slate-400">FINAL SCORE</div>
                <div className="text-xl font-bold text-white">{game.finalSnapshot.score}</div>
              </div>
              <div className="bg-slate-900/90 border border-slate-700 rounded-lg p-3">
                <div className="text-[10px] text-slate-400">ACCURACY</div>
                <div className="text-xl font-bold text-emerald-300">
                  {game.finalSnapshot.accuracyPercent}%
                </div>
              </div>
              <div className="bg-slate-900/90 border border-slate-700 rounded-lg p-3">
                <div className="text-[10px] text-slate-400">BEST STREAK</div>
                <div className="text-xl font-bold text-amber-300">
                  {game.finalSnapshot.bestStreak}×
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                data-start="true"
                onClick={() => handleStart(game.deckFilter)}
                className="w-full py-2.5 text-sm font-bold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-lg transition-colors"
              >
                {game.phase === 'victory' ? 'Play Again' : 'Try Again'}
              </button>
              <button
                type="button"
                onClick={() => setGame(createInitialSprintState(game.deckFilter, 'title'))}
                className="w-full py-2.5 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg transition-colors"
              >
                Change Syllabus Deck
              </button>
              <button
                type="button"
                onClick={onExit}
                className="w-full py-2.5 text-sm font-medium text-slate-300 hover:text-white border border-slate-700 rounded-lg transition-colors"
              >
                Exit to Study Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
