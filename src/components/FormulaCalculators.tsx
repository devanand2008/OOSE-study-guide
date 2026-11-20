import { useMemo, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { DEFAULT_CPM_ACTIVITIES, EXAM_FORMULAS, FIVE_PAGE_STRATEGY } from '../data/syllabus';
import {
  calculateCyclomaticComplexity,
  calculatePert,
  solveCpmNetwork,
} from '../utils/examMath';
import type { CpmActivityInput } from '../types/syllabus';

export function FormulaCalculators() {
  // PERT Calculator State (pre-loaded with exact Unit 6 exam example)
  const [optTime, setOptTime] = useState('2');
  const [mostLikely, setMostLikely] = useState('4');
  const [pessTime, setPessTime] = useState('8');

  // CPM Editable Durations State (exact Unit 6 network A-E)
  const [cpmActivities, setCpmActivities] = useState<CpmActivityInput[]>(DEFAULT_CPM_ACTIVITIES);

  // Cyclomatic Complexity State
  const [edges, setEdges] = useState('7');
  const [nodes, setNodes] = useState('6');
  const [components, setComponents] = useState('1');

  const pertEvaluation = useMemo(() => {
    try {
      const o = Number(optTime);
      const m = Number(mostLikely);
      const p = Number(pessTime);
      return { data: calculatePert(o, m, p), error: null as string | null };
    } catch (e) {
      return { data: null, error: e instanceof Error ? e.message : 'Invalid PERT values' };
    }
  }, [optTime, mostLikely, pessTime]);

  const cpmEvaluation = useMemo(() => {
    try {
      return { data: solveCpmNetwork(cpmActivities), error: null as string | null };
    } catch (e) {
      return { data: null, error: e instanceof Error ? e.message : 'Invalid CPM network' };
    }
  }, [cpmActivities]);

  const cycloEvaluation = useMemo(() => {
    try {
      const e = Number.parseInt(edges, 10);
      const n = Number.parseInt(nodes, 10);
      const p = Number.parseInt(components, 10);
      return { data: calculateCyclomaticComplexity(e, n, p), error: null as string | null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Invalid CFG inputs' };
    }
  }, [edges, nodes, components]);

  const updateActivityDuration = (id: string, value: string) => {
    const parsed = Math.max(0, Number(value) || 0);
    setCpmActivities((prev) =>
      prev.map((act) => (act.id === id ? { ...act, duration: parsed } : act)),
    );
  };

  return (
    <main className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-10">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="max-w-3xl">
          <p className="text-xs font-medium text-blue-700 dark:text-sky-400">Unit 3 &amp; Unit 6 Quantitative Problem Lab</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1">
            PERT, CPM &amp; Complexity Calculators
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            Verify numerical exam problems interactively. Pre-loaded with the exact Unit 6 PERT and Critical Path Method examples from the answer key—edit any value to verify alternate exam papers.
          </p>
        </div>
      </div>

      {/* Top Row: PERT + Cyclomatic Complexity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* PERT Calculator */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col justify-between gap-5">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Unit 6 · Probabilistic Scheduling</p>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mt-0.5">PERT Expected Time &amp; Variance</h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOptTime('2');
                  setMostLikely('4');
                  setPessTime('8');
                }}
                className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white whitespace-nowrap"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Exam Example
              </button>
            </div>

            <div className="font-mono text-xs bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2.5 text-slate-800 dark:text-slate-200">
              TE = (O + 4M + P) / 6 &nbsp;|&nbsp; σ² = ((P - O) / 6)²
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label htmlFor="pert-o" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Optimistic (O)
                </label>
                <input
                  id="pert-o"
                  type="number"
                  min={0}
                  step="0.5"
                  value={optTime}
                  onChange={(e) => setOptTime(e.target.value)}
                  className="w-full px-3 py-2 text-sm font-mono tabular-nums bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-600 dark:focus:border-sky-500"
                />
              </div>
              <div>
                <label htmlFor="pert-m" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Most Likely (M)
                </label>
                <input
                  id="pert-m"
                  type="number"
                  min={0}
                  step="0.5"
                  value={mostLikely}
                  onChange={(e) => setMostLikely(e.target.value)}
                  className="w-full px-3 py-2 text-sm font-mono tabular-nums bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-600 dark:focus:border-sky-500"
                />
              </div>
              <div>
                <label htmlFor="pert-p" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Pessimistic (P)
                </label>
                <input
                  id="pert-p"
                  type="number"
                  min={0}
                  step="0.5"
                  value={pessTime}
                  onChange={(e) => setPessTime(e.target.value)}
                  className="w-full px-3 py-2 text-sm font-mono tabular-nums bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-600 dark:focus:border-sky-500"
                />
              </div>
            </div>
          </div>

          {pertEvaluation.error ? (
            <p role="alert" className="text-xs font-medium text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/80 rounded-lg px-3.5 py-2.5">
              {pertEvaluation.error}
            </p>
          ) : (
            pertEvaluation.data && (
              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="bg-blue-50/70 dark:bg-sky-950/45 border border-blue-200/80 dark:border-sky-800/80 rounded-lg p-3">
                  <div className="text-[11px] font-medium text-blue-800 dark:text-sky-300">Expected Time (TE)</div>
                  <div className="text-xl font-bold font-mono tabular-nums text-blue-950 dark:text-sky-100 mt-1" data-testid="pert-te">
                    {pertEvaluation.data.expectedTime}d
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-lg p-3">
                  <div className="text-[11px] font-medium text-slate-600 dark:text-slate-400">Variance (σ²)</div>
                  <div className="text-xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100 mt-1" data-testid="pert-var">
                    {pertEvaluation.data.variance}
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-lg p-3">
                  <div className="text-[11px] font-medium text-slate-600 dark:text-slate-400">Std Dev (σ)</div>
                  <div className="text-xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100 mt-1">
                    {pertEvaluation.data.stdDev}d
                  </div>
                </div>
              </div>
            )
          )}
        </section>

        {/* Cyclomatic Complexity Calculator */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col justify-between gap-5">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Unit 3 &amp; Unit 5 · White Box Testing Metric</p>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mt-0.5">Cyclomatic Complexity V(G)</h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEdges('7');
                  setNodes('6');
                  setComponents('1');
                }}
                className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white whitespace-nowrap"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Default
              </button>
            </div>

            <div className="font-mono text-xs bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2.5 text-slate-800 dark:text-slate-200">
              V(G) = E - N + 2P &nbsp;(Minimum Independent Basis Paths)
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label htmlFor="cfg-e" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Edges (E)
                </label>
                <input
                  id="cfg-e"
                  type="number"
                  min={0}
                  value={edges}
                  onChange={(e) => setEdges(e.target.value)}
                  className="w-full px-3 py-2 text-sm font-mono tabular-nums bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-600 dark:focus:border-sky-500"
                />
              </div>
              <div>
                <label htmlFor="cfg-n" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Nodes (N)
                </label>
                <input
                  id="cfg-n"
                  type="number"
                  min={1}
                  value={nodes}
                  onChange={(e) => setNodes(e.target.value)}
                  className="w-full px-3 py-2 text-sm font-mono tabular-nums bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-600 dark:focus:border-sky-500"
                />
              </div>
              <div>
                <label htmlFor="cfg-p" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Components (P)
                </label>
                <input
                  id="cfg-p"
                  type="number"
                  min={1}
                  value={components}
                  onChange={(e) => setComponents(e.target.value)}
                  className="w-full px-3 py-2 text-sm font-mono tabular-nums bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-600 dark:focus:border-sky-500"
                />
              </div>
            </div>
          </div>

          {cycloEvaluation.error ? (
            <p role="alert" className="text-xs font-medium text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/80 rounded-lg px-3.5 py-2.5">
              {cycloEvaluation.error}
            </p>
          ) : (
            cycloEvaluation.data && (
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/80 rounded-lg p-3">
                  <div className="text-[11px] font-medium text-emerald-800 dark:text-emerald-300">Complexity V(G)</div>
                  <div className="text-xl font-bold font-mono tabular-nums text-emerald-950 dark:text-emerald-100 mt-1" data-testid="cyclo-val">
                    {cycloEvaluation.data.complexity} paths
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-lg p-3">
                  <div className="text-[11px] font-medium text-slate-600 dark:text-slate-400">Risk Assessment</div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 mt-2">
                    {cycloEvaluation.data.riskBand}
                  </div>
                </div>
              </div>
            )
          )}
        </section>
      </div>

      {/* Full-Width CPM Critical Path Network Solver */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Unit 6 · Critical Path Method (CPM)</p>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mt-0.5">
              Interactive CPM Network &amp; Slack Solver
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setCpmActivities(DEFAULT_CPM_ACTIVITIES)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Unit 6 Example
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                <th className="py-2.5 pr-4 font-semibold">ID</th>
                <th className="py-2.5 pr-4 font-semibold">Activity</th>
                <th className="py-2.5 pr-4 font-semibold">Predecessor</th>
                <th className="py-2.5 pr-4 font-semibold">Duration (Days)</th>
                <th className="py-2.5 pr-4 font-semibold">ES</th>
                <th className="py-2.5 pr-4 font-semibold">EF</th>
                <th className="py-2.5 pr-4 font-semibold">LS</th>
                <th className="py-2.5 pr-4 font-semibold">LF</th>
                <th className="py-2.5 pr-4 font-semibold">Slack</th>
                <th className="py-2.5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono tabular-nums text-xs">
              {cpmEvaluation.data?.activities.map((act) => (
                <tr key={act.id} className={act.isCritical ? 'bg-red-50/40 dark:bg-red-950/25' : ''}>
                  <td className="py-2.5 pr-4 font-bold text-slate-900 dark:text-slate-100">{act.id}</td>
                  <td className="py-2.5 pr-4 font-sans text-slate-800 dark:text-slate-200">{act.name}</td>
                  <td className="py-2.5 pr-4 text-slate-600 dark:text-slate-400">
                    {act.dependencies.length > 0 ? act.dependencies.join(', ') : 'None'}
                  </td>
                  <td className="py-2.5 pr-4">
                    <input
                      type="number"
                      min={1}
                      max={60}
                      aria-label={`Duration for activity ${act.id}`}
                      value={act.duration}
                      onChange={(e) => updateActivityDuration(act.id, e.target.value)}
                      className="w-20 px-2 py-1 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100"
                    />
                  </td>
                  <td className="py-2.5 pr-4 text-slate-700 dark:text-slate-300">{act.es}</td>
                  <td className="py-2.5 pr-4 text-slate-700 dark:text-slate-300">{act.ef}</td>
                  <td className="py-2.5 pr-4 text-slate-700 dark:text-slate-300">{act.ls}</td>
                  <td className="py-2.5 pr-4 text-slate-700 dark:text-slate-300">{act.lf}</td>
                  <td className="py-2.5 pr-4 font-semibold text-slate-900 dark:text-slate-100">{act.slack}</td>
                  <td className={`py-2.5 font-sans font-semibold ${act.isCritical ? 'text-red-700 dark:text-red-400' : 'text-slate-500 dark:text-slate-400'}`}>
                    {act.isCritical ? 'Critical Path' : 'Float Available'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {cpmEvaluation.data && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="bg-red-50/60 dark:bg-red-950/35 border border-red-200 dark:border-red-900/80 rounded-lg p-4">
              <div className="text-xs font-medium text-red-800 dark:text-red-300">Critical Path &amp; Minimum Project Duration</div>
              <div className="text-base font-bold font-mono text-red-950 dark:text-red-100 mt-1" data-testid="cpm-summary">
                {cpmEvaluation.data.criticalPath.join(' → ')} = {cpmEvaluation.data.projectDuration} days
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
              <div className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">All Network Paths</div>
              <ul className="space-y-1 text-xs font-mono text-slate-800 dark:text-slate-200 tabular-nums">
                {cpmEvaluation.data.allPaths.map((p) => (
                  <li key={p.path.join('-')} className="flex items-center justify-between">
                    <span>{p.path.join(' → ')}</span>
                    <span className={p.isCritical ? 'font-bold text-red-700 dark:text-red-400' : 'text-slate-600 dark:text-slate-400'}>
                      {p.duration} days {p.isCritical ? '(Critical)' : ''}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>

      {/* Master Formula Reference & 5-Page Exam Blueprint */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Master Formulas to Memorize</h2>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {EXAM_FORMULAS.map((f) => (
              <div key={f.name} className="py-3 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm">{f.name}</span>
                  <span>{f.unit}</span>
                </div>
                <div className="font-mono text-xs font-semibold text-blue-800 dark:text-sky-300 bg-blue-50/70 dark:bg-sky-950/60 border border-transparent dark:border-sky-900/70 rounded px-2.5 py-1.5 mt-1.5 inline-block">
                  {f.formula}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{f.variables}</p>
                <p className="text-xs font-mono text-slate-700 dark:text-slate-300 mt-0.5">{f.worked}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">5-Page Blueprint for Every 13 / 16-Mark Answer</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Follow this exact pacing structure in the exam hall so every long answer covers theory, a clean pencil diagram, real-world examples, comparisons, and pros/cons.
          </p>
          <ol className="divide-y divide-slate-100 dark:divide-slate-800">
            {FIVE_PAGE_STRATEGY.map((item) => (
              <li key={item.page} className="py-3 flex items-start gap-3">
                <span className="font-mono text-xs font-bold text-blue-700 dark:text-sky-400 w-14 shrink-0 pt-0.5">
                  {item.page}
                </span>
                <span className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{item.content}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}
