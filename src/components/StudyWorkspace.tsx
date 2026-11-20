import { useMemo, useState } from 'react';
import {
  BookOpen,
  Box,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Eye,
  EyeOff,
  Printer,
  Search,
  Sparkles,
} from 'lucide-react';
import { SYLLABUS_UNITS } from '../data/syllabus';
import type { LongAnswerQuestion, UnitData } from '../types/syllabus';
import { computeRevisionStats, filterUnitQuestions } from '../utils/examMath';
import { ExamDiagram } from './diagrams/ExamDiagram';

interface StudyWorkspaceProps {
  activeUnitId: string;
  onSelectUnit: (unitId: string) => void;
  expandedQuestionId: string | null;
  onExpandQuestion: (questionId: string | null) => void;
  revisedIds: Set<string>;
  onToggleRevised: (id: string) => void;
  onInspect3D: (unitIndex: number) => void;
  onAskTutor: (prompt: string, unitTitle: string) => void;
}

export function StudyWorkspace({
  activeUnitId,
  onSelectUnit,
  expandedQuestionId,
  onExpandQuestion,
  revisedIds,
  onToggleRevised,
  onInspect3D,
  onAskTutor,
}: StudyWorkspaceProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [markFilter, setMarkFilter] = useState<'all' | '2mark' | 'long'>('all');
  const [quizMode, setQuizMode] = useState(false);
  const [revealedCards, setRevealedCards] = useState<Set<string>>(() => new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeUnit: UnitData =
    SYLLABUS_UNITS.find((u) => u.id === activeUnitId) ?? SYLLABUS_UNITS[0];

  const stats = useMemo(
    () => computeRevisionStats(SYLLABUS_UNITS, revisedIds),
    [revisedIds],
  );

  const filtered = useMemo(
    () => filterUnitQuestions(activeUnit, searchQuery, markFilter),
    [activeUnit, searchQuery, markFilter],
  );

  const toggleRevealCard = (id: string) => {
    setRevealedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleCopyOutline = async (q: LongAnswerQuestion) => {
    const lines = [
      `UNIT ${activeUnit.unitNumber}: ${activeUnit.title}`,
      `Q${q.number} (${q.marksLabel}): ${q.question}`,
      '',
      'INTRODUCTION:',
      q.introduction,
      '',
      '5-PAGE EXAM BLUEPRINT:',
      ...q.pageBlueprint.map((p) => `- ${p.page} (${p.focus}): ${p.checklist}`),
      '',
      'KEY SECTIONS:',
      ...q.sections.map((s) => `- ${s.heading}`),
      '',
      `REAL-TIME EXAMPLE — ${q.realTimeExample.title}:`,
      ...q.realTimeExample.points.map((pt) => `- ${pt}`),
      '',
      'CONCLUSION:',
      q.conclusion,
    ];
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setCopiedId(q.id);
      window.setTimeout(() => setCopiedId((curr) => (curr === q.id ? null : curr)), 2000);
    } catch {
      // Fallback ignored gracefully in non-HTTPS environments
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[270px_minmax(0,1fr)] gap-5 lg:gap-8 items-start">
        {/* Left Sidebar: Unit Switcher & Revision Tracker */}
        <aside className="lg:sticky lg:top-22 space-y-3 lg:space-y-6 no-print">
          {/* Revision Readiness Summary */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 sm:p-4 space-y-2 lg:space-y-3">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">Exam Readiness</span>
              <span className="text-xs font-mono font-semibold tabular-nums text-blue-700 dark:text-sky-400" data-testid="revision-progress">
                {stats.revisedQuestions}/{stats.totalQuestions} ({stats.percentComplete}%)
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-700 dark:bg-sky-400 rounded-full transition-transform duration-300 origin-left"
                style={{ transform: `scaleX(${Math.max(0.02, stats.percentComplete / 100)})` }}
              />
            </div>
            <p className="hidden lg:block text-xs text-slate-500 dark:text-slate-400">
              All 6 units · 24 two-mark &amp; 20 long-answer blueprints
            </p>
          </div>

          {/* Unit Navigation List (horizontal strip on mobile, vertical sidebar on lg+) */}
          <nav
            aria-label="Syllabus Units"
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1.5 lg:p-2 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible"
          >
            {SYLLABUS_UNITS.map((u) => {
              const active = u.id === activeUnit.id;
              const uStat = stats.byUnit[u.id] ?? { total: 0, revised: 0 };
              return (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => {
                    onSelectUnit(u.id);
                    onExpandQuestion(u.longAnswers[0]?.id ?? null);
                  }}
                  aria-current={active ? 'true' : undefined}
                  className={`shrink-0 lg:shrink lg:w-full text-left px-3 py-2 lg:py-2.5 rounded-lg transition-colors flex items-center justify-between gap-2 ${
                    active
                      ? 'bg-blue-50 dark:bg-sky-950/60 text-blue-900 dark:text-sky-200 font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap">Unit 0{u.unitNumber}</div>
                    <div className="hidden lg:block text-sm truncate">{u.shortTitle}</div>
                  </div>
                  <span className="hidden lg:inline text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400 shrink-0">
                    {uStat.revised}/{uStat.total}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* 3D Model Shortcut for Active Unit (desktop sidebar) */}
          <div className="hidden lg:block bg-slate-900 dark:bg-slate-900 dark:border dark:border-slate-800 text-white rounded-xl p-4 space-y-2.5">
            <div className="text-xs text-slate-300 dark:text-slate-400">Unit {activeUnit.unitNumber} Spatial Model</div>
            <p className="text-sm font-semibold leading-snug">
              Explore Unit {activeUnit.unitNumber} architecture in interactive 3D
            </p>
            <button
              type="button"
              onClick={() => onInspect3D(activeUnit.unitNumber - 1)}
              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold bg-blue-600 dark:bg-sky-600 hover:bg-blue-500 dark:hover:bg-sky-500 text-white rounded-lg transition-colors whitespace-nowrap"
            >
              <Box className="w-3.5 h-3.5" />
              Open 3D Lab
            </button>
          </div>
        </aside>

        {/* Main Content Pane */}
        <main className="min-w-0 space-y-6 sm:space-y-8">
          {/* Unit Header & Toolbar */}
          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-6 space-y-4 sm:space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-blue-700 dark:text-sky-400 whitespace-nowrap">Unit {activeUnit.unitNumber}</span>
                  <span aria-hidden="true">·</span>
                  <span className="whitespace-nowrap">{activeUnit.twoMarks.length} Two-Mark Qs</span>
                  <span aria-hidden="true">·</span>
                  <span className="whitespace-nowrap">{activeUnit.longAnswers.length} Long Answers (13 / 16 Marks)</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                  {activeUnit.title}
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{activeUnit.summary}</p>
              </div>

              <button
                type="button"
                onClick={() => window.print()}
                className="no-print inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0 self-start"
              >
                <Printer className="w-3.5 h-3.5" />
                Print Unit Notes
              </button>
            </div>

            {/* Search & Filter Row */}
            <div className="no-print pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <label htmlFor="unit-search" className="sr-only">
                  Search questions and keywords in Unit {activeUnit.unitNumber}
                </label>
                <input
                  id="unit-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Filter Unit ${activeUnit.unitNumber} topics, diagrams, keywords...`}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-blue-600 dark:focus:border-sky-500"
                />
              </div>

              <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-fit" role="group" aria-label="Filter by mark weight">
                {(
                  [
                    ['all', 'All Questions'],
                    ['2mark', '2 Marks'],
                    ['long', '13 / 16 Marks'],
                  ] as const
                ).map(([val, label]) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setMarkFilter(val)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                      markFilter === val
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Part A: 2-Mark Questions */}
          {filtered.twoMarks.length > 0 && (
            <section className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    Part A — 2-Mark Short Answers
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Crisp exam-ready definitions, tables, and bullet points
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setQuizMode((q) => !q);
                    setRevealedCards(new Set());
                  }}
                  className="no-print inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap"
                >
                  {quizMode ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  {quizMode ? 'Show All Answers' : 'Self-Quiz Mode (Hide)'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.twoMarks.map((q) => {
                  const isRevised = revisedIds.has(q.id);
                  const answerVisible = !quizMode || revealedCards.has(q.id);

                  return (
                    <article
                      key={q.id}
                      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col justify-between gap-4"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              <span>Unit {activeUnit.unitNumber}</span>
                              <span aria-hidden="true"> · </span>
                              <span>2 Marks · Q{q.number}</span>
                            </div>
                            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                              {q.question}
                            </h3>
                          </div>
                        </div>

                        {answerVisible ? (
                          <div className="space-y-2.5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            {q.answerParagraph && <p>{q.answerParagraph}</p>}
                            {q.answerBullets && (
                              <ul className="space-y-1.5 list-disc pl-4">
                                {q.answerBullets.map((b) => (
                                  <li key={b}>{b}</li>
                                ))}
                              </ul>
                            )}
                            {q.table && (
                              <div className="overflow-x-auto pt-1">
                                <table className="w-full text-xs border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                                  <thead className="bg-slate-50 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200">
                                    <tr>
                                      {q.table.headers.map((h) => (
                                        <th key={h} className="px-2.5 py-2 text-left font-semibold border-b border-slate-200 dark:border-slate-700">
                                          {h}
                                        </th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {q.table.rows.map((row, rIdx) => (
                                      <tr key={rIdx}>
                                        {row.map((cell, cIdx) => (
                                          <td key={cIdx} className="px-2.5 py-2 text-slate-700 dark:text-slate-300 align-top">
                                            {cell}
                                          </td>
                                        ))}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                            <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
                              Keywords: {q.keyTerms.join(' · ')}
                            </p>
                          </div>
                        ) : (
                          <div className="py-5 px-4 rounded-lg bg-slate-50 dark:bg-slate-950/70 border border-dashed border-slate-300 dark:border-slate-700 text-center">
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Recall the key definition &amp; points first</p>
                            <button
                              type="button"
                              onClick={() => toggleRevealCard(q.id)}
                              className="px-3 py-1.5 text-xs font-semibold text-blue-700 dark:text-sky-300 bg-white dark:bg-slate-900 border border-blue-200 dark:border-sky-800 rounded-md hover:bg-blue-50 dark:hover:bg-sky-950/60 transition-colors"
                            >
                              Reveal Answer
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="no-print pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => onToggleRevised(q.id)}
                          aria-pressed={isRevised}
                          className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                            isRevised
                              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80'
                              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                          {isRevised ? 'Revised' : 'Mark Revised'}
                        </button>

                        {quizMode && answerVisible && (
                          <button
                            type="button"
                            onClick={() => toggleRevealCard(q.id)}
                            className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                          >
                            Hide
                          </button>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}

          {/* Part B: 13 / 16-Mark Long Answers */}
          {filtered.longAnswers.length > 0 && (
            <section className="space-y-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Part B — 13 / 16-Mark Long Answers with Diagrams &amp; 5-Page Blueprints
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Structured for full 5-page handwritten exam answers with diagrams, examples, and comparison tables
                </p>
              </div>

              <div className="space-y-4">
                {filtered.longAnswers.map((q) => {
                  const isOpen = expandedQuestionId === q.id || searchQuery.trim().length > 0;
                  const isRevised = revisedIds.has(q.id);

                  return (
                    <article
                      key={q.id}
                      id={q.id}
                      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden"
                    >
                      {/* Question Header Button */}
                      <div className="p-5 sm:p-6 flex items-start justify-between gap-4">
                        <button
                          type="button"
                          onClick={() => onExpandQuestion(isOpen ? null : q.id)}
                          aria-expanded={isOpen}
                          className="text-left flex-1 space-y-1.5 group"
                        >
                          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                            <span className="font-semibold text-blue-700 dark:text-sky-400">Unit {activeUnit.unitNumber} · Q{q.number}</span>
                            <span aria-hidden="true">·</span>
                            <span>{q.marksLabel}</span>
                            {q.isHighPriority && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span className="font-semibold text-amber-700 dark:text-amber-400">Most Expected</span>
                              </>
                            )}
                            {isRevised && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span className="font-semibold text-emerald-700 dark:text-emerald-400">✓ Revised</span>
                              </>
                            )}
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-800 dark:group-hover:text-sky-300 transition-colors leading-snug">
                            {q.question}
                          </h3>
                        </button>

                        <button
                          type="button"
                          onClick={() => onExpandQuestion(isOpen ? null : q.id)}
                          aria-label={isOpen ? `Collapse answer for Q${q.number}` : `Expand answer for Q${q.number}`}
                          className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0"
                        >
                          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                      </div>

                      {/* Expanded Full Answer Sheet */}
                      {isOpen && (
                        <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-6">
                          {/* Quick Action Strip */}
                          <div className="no-print flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex flex-wrap items-center gap-2">
                              <button
                                type="button"
                                onClick={() => onToggleRevised(q.id)}
                                aria-pressed={isRevised}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap ${
                                  isRevised
                                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/80'
                                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                                }`}
                              >
                                <Check className="w-3.5 h-3.5" />
                                {isRevised ? 'Marked Revised' : 'Mark Revised'}
                              </button>

                              <button
                                type="button"
                                onClick={() => handleCopyOutline(q)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap"
                              >
                                <Copy className="w-3.5 h-3.5" />
                                {copiedId === q.id ? 'Outline Copied' : 'Copy Outline'}
                              </button>

                              <button
                                type="button"
                                onClick={() => onInspect3D(q.unit3DIndex)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap"
                              >
                                <Box className="w-3.5 h-3.5" />
                                View 3D Model
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                onAskTutor(
                                  `Expand this question into a full 5-page 16-mark university answer with extra real-time examples and key takeaways: ${q.question}`,
                                  `Unit ${activeUnit.unitNumber}: ${activeUnit.title}`,
                                )
                              }
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:text-sky-300 bg-blue-50 dark:bg-sky-950/70 hover:bg-blue-100 dark:hover:bg-sky-900/70 rounded-lg transition-colors whitespace-nowrap"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              Expand with Tutor
                            </button>
                          </div>

                          {/* Introduction */}
                          <div className="space-y-1.5">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Introduction</h4>
                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-[75ch]">
                              {q.introduction}
                            </p>
                          </div>

                          {/* Interactive Exam Diagram Stage */}
                          <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 space-y-4">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div>
                                <p className="text-xs font-medium text-blue-700 dark:text-sky-400">Exam Diagram to Draw (Page 3)</p>
                                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{q.diagramTitle}</h4>
                              </div>
                            </div>

                            <ExamDiagram diagramId={q.diagramId} />

                            <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800">
                              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                                How to Sketch in the Exam Hall
                              </p>
                              <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400 list-disc pl-4 leading-relaxed">
                                {q.sketchTips.map((tip) => (
                                  <li key={tip}>{tip}</li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Detailed Sections */}
                          <div className="space-y-6">
                            {q.sections.map((sec) => (
                              <div key={sec.heading} className="space-y-2.5">
                                <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">{sec.heading}</h4>

                                {sec.formula && (
                                  <div className="font-mono text-xs sm:text-sm font-semibold text-blue-900 dark:text-sky-200 bg-blue-50 dark:bg-sky-950/60 border border-blue-200 dark:border-sky-800/80 rounded-lg px-4 py-2.5 inline-block">
                                    {sec.formula}
                                  </div>
                                )}

                                {sec.paragraphs?.map((p) => (
                                  <p key={p} className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-[75ch]">
                                    {p}
                                  </p>
                                ))}

                                {sec.orderedSteps && (
                                  <ol className="space-y-1.5 list-decimal pl-5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                    {sec.orderedSteps.map((step) => (
                                      <li key={step}>{step}</li>
                                    ))}
                                  </ol>
                                )}

                                {sec.bullets && (
                                  <ul className="space-y-1.5 list-disc pl-5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                    {sec.bullets.map((b) => (
                                      <li key={b}>{b}</li>
                                    ))}
                                  </ul>
                                )}

                                {sec.codeBlock && (
                                  <pre className="bg-slate-900 dark:bg-slate-950 text-slate-100 border border-slate-800 rounded-lg p-4 text-xs font-mono overflow-x-auto leading-relaxed">
                                    <code>{sec.codeBlock.code}</code>
                                  </pre>
                                )}

                                {sec.table && (
                                  <div className="space-y-1.5 pt-1">
                                    {sec.table.title && (
                                      <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">{sec.table.title}</p>
                                    )}
                                    <div className="overflow-x-auto">
                                      <table className="w-full text-xs sm:text-sm border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                                        <thead className="bg-slate-50 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200">
                                          <tr>
                                            {sec.table.headers.map((h) => (
                                              <th key={h} className="px-3 py-2 text-left font-semibold border-b border-slate-200 dark:border-slate-700">
                                                {h}
                                              </th>
                                            ))}
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                          {sec.table.rows.map((row, ri) => (
                                            <tr key={ri}>
                                              {row.map((cell, ci) => (
                                                <td key={ci} className="px-3 py-2 text-slate-700 dark:text-slate-300 tabular-nums align-top">
                                                  {cell}
                                                </td>
                                              ))}
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                )}

                                {sec.prosCons && (
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                    <div className="bg-emerald-50/50 dark:bg-emerald-950/35 border border-emerald-200/80 dark:border-emerald-900/80 rounded-lg p-4 space-y-1.5">
                                      <p className="text-xs font-bold text-emerald-900 dark:text-emerald-300">Advantages</p>
                                      <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300 list-disc pl-4">
                                        {sec.prosCons.advantages.map((a) => (
                                          <li key={a}>{a}</li>
                                        ))}
                                      </ul>
                                    </div>
                                    <div className="bg-amber-50/50 dark:bg-amber-950/35 border border-amber-200/80 dark:border-amber-900/80 rounded-lg p-4 space-y-1.5">
                                      <p className="text-xs font-bold text-amber-900 dark:text-amber-300">Disadvantages</p>
                                      <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300 list-disc pl-4">
                                        {sec.prosCons.disadvantages.map((d) => (
                                          <li key={d}>{d}</li>
                                        ))}
                                      </ul>
                                    </div>
                                    {sec.prosCons.applications && (
                                      <div className="md:col-span-2 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-xs text-slate-700 dark:text-slate-300">
                                        <strong className="text-slate-900 dark:text-slate-100">Suitable Applications:</strong>{' '}
                                        {sec.prosCons.applications.join(' ')}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>

                          {/* Real-Time Exam Example */}
                          <div className="bg-blue-50/50 dark:bg-sky-950/35 border border-blue-200/80 dark:border-sky-900/80 rounded-xl p-4 sm:p-5 space-y-2">
                            <p className="text-xs font-semibold text-blue-800 dark:text-sky-400">Real-Time Exam Example</p>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{q.realTimeExample.title}</h4>
                            <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300 list-disc pl-5 leading-relaxed">
                              {q.realTimeExample.points.map((pt) => (
                                <li key={pt}>{pt}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Comparison Table */}
                          {q.comparisonTable && (
                            <div className="space-y-2">
                              {q.comparisonTable.title && (
                                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{q.comparisonTable.title}</h4>
                              )}
                              <div className="overflow-x-auto">
                                <table className="w-full text-xs sm:text-sm border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                                    <tr>
                                      {q.comparisonTable.headers.map((h) => (
                                        <th key={h} className="px-3.5 py-2.5 text-left font-semibold border-b border-slate-200 dark:border-slate-700">
                                          {h}
                                        </th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900/80">
                                    {q.comparisonTable.rows.map((row, ri) => (
                                      <tr key={ri}>
                                        {row.map((cell, ci) => (
                                          <td
                                            key={ci}
                                            className={`px-3.5 py-2.5 align-top ${
                                              ci === 0 ? 'font-semibold text-slate-900 dark:text-slate-100' : 'text-slate-700 dark:text-slate-300'
                                            }`}
                                          >
                                            {cell}
                                          </td>
                                        ))}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}

                          {/* 5-Page Exam Writing Blueprint */}
                          <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-slate-100">
                              <BookOpen className="w-4 h-4 text-blue-700 dark:text-sky-400" />
                              5-Page Handwritten Exam Writing Plan
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                              {q.pageBlueprint.map((pb) => (
                                <div key={pb.page} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 space-y-1">
                                  <div className="font-mono text-[11px] font-bold text-blue-700 dark:text-sky-400">{pb.page}</div>
                                  <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 leading-snug">{pb.focus}</div>
                                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">{pb.checklist}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Conclusion */}
                          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Conclusion</h4>
                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-[75ch]">{q.conclusion}</p>
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </section>
          )}

          {/* Empty search state */}
          {filtered.twoMarks.length === 0 && filtered.longAnswers.length === 0 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-10 text-center space-y-2">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                No matching questions in Unit {activeUnit.unitNumber}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Try clearing your filter or switching to another unit in the sidebar.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setMarkFilter('all');
                }}
                className="mt-2 px-3.5 py-2 text-xs font-semibold text-blue-700 dark:text-sky-300 bg-blue-50 dark:bg-sky-950/70 hover:bg-blue-100 dark:hover:bg-sky-900/70 rounded-lg transition-colors"
              >
                Reset Search &amp; Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
