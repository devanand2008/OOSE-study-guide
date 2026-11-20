import type { CpmActivityInput, CpmActivityResult, CpmSolution, UnitData } from '../types/syllabus';

export interface PertResult {
  expectedTime: number;
  variance: number;
  stdDev: number;
}

export function calculatePert(optimistic: number, mostLikely: number, pessimistic: number): PertResult {
  if (!Number.isFinite(optimistic) || !Number.isFinite(mostLikely) || !Number.isFinite(pessimistic)) {
    throw new Error('All PERT time estimates must be valid numbers.');
  }
  if (optimistic < 0 || mostLikely < 0 || pessimistic < 0) {
    throw new Error('PERT time estimates cannot be negative.');
  }
  if (optimistic > mostLikely || mostLikely > pessimistic) {
    throw new Error('Estimates must satisfy Optimistic <= Most Likely <= Pessimistic.');
  }

  const expectedTime = Number(((optimistic + 4 * mostLikely + pessimistic) / 6).toFixed(2));
  const stdDevRaw = (pessimistic - optimistic) / 6;
  const stdDev = Number(stdDevRaw.toFixed(2));
  const variance = Number((stdDevRaw * stdDevRaw).toFixed(2));

  return { expectedTime, variance, stdDev };
}

export function solveCpmNetwork(inputs: CpmActivityInput[]): CpmSolution {
  if (inputs.length === 0) {
    return { activities: [], projectDuration: 0, criticalPath: [], allPaths: [] };
  }

  const map = new Map<string, CpmActivityInput>();
  for (const act of inputs) {
    if (act.duration < 0 || !Number.isFinite(act.duration)) {
      throw new Error(`Invalid duration for activity ${act.id}`);
    }
    map.set(act.id, act);
  }

  // Topological sort (Kahn's algorithm)
  const inDegree = new Map<string, number>();
  const dependents = new Map<string, string[]>();

  for (const act of inputs) {
    inDegree.set(act.id, 0);
    dependents.set(act.id, []);
  }

  for (const act of inputs) {
    for (const dep of act.dependencies) {
      if (!map.has(dep)) {
        throw new Error(`Unknown dependency "${dep}" referenced by activity "${act.id}"`);
      }
      dependents.get(dep)!.push(act.id);
      inDegree.set(act.id, (inDegree.get(act.id) ?? 0) + 1);
    }
  }

  const queue: string[] = [];
  for (const [id, deg] of inDegree.entries()) {
    if (deg === 0) queue.push(id);
  }

  const topoOrder: string[] = [];
  while (queue.length > 0) {
    const current = queue.shift()!;
    topoOrder.push(current);
    for (const next of dependents.get(current) ?? []) {
      const nextDeg = (inDegree.get(next) ?? 0) - 1;
      inDegree.set(next, nextDeg);
      if (nextDeg === 0) queue.push(next);
    }
  }

  if (topoOrder.length !== inputs.length) {
    throw new Error('Cycle detected in CPM activity dependencies.');
  }

  // Forward pass: ES, EF
  const esMap = new Map<string, number>();
  const efMap = new Map<string, number>();

  for (const id of topoOrder) {
    const act = map.get(id)!;
    const es =
      act.dependencies.length === 0
        ? 0
        : Math.max(...act.dependencies.map((d) => efMap.get(d) ?? 0));
    const ef = es + act.duration;
    esMap.set(id, es);
    efMap.set(id, ef);
  }

  const projectDuration = Math.max(...Array.from(efMap.values()));

  // Backward pass: LF, LS
  const lfMap = new Map<string, number>();
  const lsMap = new Map<string, number>();

  for (let i = topoOrder.length - 1; i >= 0; i--) {
    const id = topoOrder[i];
    const act = map.get(id)!;
    const children = dependents.get(id) ?? [];
    const lf =
      children.length === 0
        ? projectDuration
        : Math.min(...children.map((c) => lsMap.get(c) ?? projectDuration));
    const ls = lf - act.duration;
    lfMap.set(id, lf);
    lsMap.set(id, ls);
  }

  const activities: CpmActivityResult[] = inputs.map((act) => {
    const es = esMap.get(act.id)!;
    const ef = efMap.get(act.id)!;
    const ls = lsMap.get(act.id)!;
    const lf = lfMap.get(act.id)!;
    const slack = Number((ls - es).toFixed(4));
    return {
      ...act,
      es,
      ef,
      ls,
      lf,
      slack,
      isCritical: slack === 0,
    };
  });

  // Enumerate all start-to-end paths
  const roots = inputs.filter((a) => a.dependencies.length === 0).map((a) => a.id);
  const allPaths: { path: string[]; duration: number; isCritical: boolean }[] = [];

  function dfs(currentId: string, path: string[], duration: number) {
    const act = map.get(currentId)!;
    const nextPath = [...path, currentId];
    const nextDuration = duration + act.duration;
    const children = dependents.get(currentId) ?? [];
    if (children.length === 0) {
      allPaths.push({
        path: nextPath,
        duration: nextDuration,
        isCritical: nextDuration === projectDuration,
      });
      return;
    }
    for (const child of children) {
      dfs(child, nextPath, nextDuration);
    }
  }

  for (const r of roots) {
    dfs(r, [], 0);
  }

  allPaths.sort((a, b) => b.duration - a.duration);
  const criticalPath = allPaths.find((p) => p.isCritical)?.path ?? [];

  return {
    activities,
    projectDuration,
    criticalPath,
    allPaths,
  };
}

export interface CyclomaticResult {
  complexity: number;
  riskBand: 'Simple & Low Risk' | 'Moderate Complexity' | 'High Complexity' | 'Very High Risk';
  minimumTestCases: number;
}

export function calculateCyclomaticComplexity(
  edges: number,
  nodes: number,
  connectedComponents = 1,
): CyclomaticResult {
  if (!Number.isInteger(edges) || !Number.isInteger(nodes) || !Number.isInteger(connectedComponents)) {
    throw new Error('Edges, nodes, and connected components must be integers.');
  }
  if (nodes < 1 || edges < 0 || connectedComponents < 1) {
    throw new Error('Nodes and connected components must be >= 1, and edges >= 0.');
  }
  const complexity = edges - nodes + 2 * connectedComponents;
  if (complexity < 1) {
    throw new Error('Invalid control flow graph: V(G) must be at least 1.');
  }

  let riskBand: CyclomaticResult['riskBand'] = 'Simple & Low Risk';
  if (complexity > 50) riskBand = 'Very High Risk';
  else if (complexity > 20) riskBand = 'High Complexity';
  else if (complexity > 10) riskBand = 'Moderate Complexity';

  return {
    complexity,
    riskBand,
    minimumTestCases: complexity,
  };
}

export interface RevisionStats {
  totalQuestions: number;
  revisedQuestions: number;
  percentComplete: number;
  byUnit: Record<string, { total: number; revised: number }>;
}

export function computeRevisionStats(units: UnitData[], revisedIds: Set<string>): RevisionStats {
  let totalQuestions = 0;
  let revisedQuestions = 0;
  const byUnit: Record<string, { total: number; revised: number }> = {};

  for (const unit of units) {
    const unitIds = [
      ...unit.twoMarks.map((q) => q.id),
      ...unit.longAnswers.map((q) => q.id),
    ];
    const unitRevised = unitIds.filter((id) => revisedIds.has(id)).length;
    totalQuestions += unitIds.length;
    revisedQuestions += unitRevised;
    byUnit[unit.id] = { total: unitIds.length, revised: unitRevised };
  }

  const percentComplete =
    totalQuestions === 0 ? 0 : Math.round((revisedQuestions / totalQuestions) * 100);

  return {
    totalQuestions,
    revisedQuestions,
    percentComplete,
    byUnit,
  };
}

export interface LongAnswerBlueprintProgress {
  totalBlueprints: number;
  revisedBlueprints: number;
  percentComplete: number;
}

export function computeLongAnswerBlueprintProgress(
  units: UnitData[],
  revisedIds: Set<string>,
): LongAnswerBlueprintProgress {
  let totalBlueprints = 0;
  let revisedBlueprints = 0;

  for (const unit of units) {
    for (const q of unit.longAnswers) {
      totalBlueprints += 1;
      if (revisedIds.has(q.id)) {
        revisedBlueprints += 1;
      }
    }
  }

  const percentComplete =
    totalBlueprints === 0 ? 0 : Math.round((revisedBlueprints / totalBlueprints) * 100);

  return {
    totalBlueprints,
    revisedBlueprints,
    percentComplete,
  };
}

export function filterUnitQuestions(
  unit: UnitData,
  query: string,
  markFilter: 'all' | '2mark' | 'long',
) {
  const q = query.trim().toLowerCase();

  const twoMarks =
    markFilter === 'long'
      ? []
      : unit.twoMarks.filter((item) => {
          if (!q) return true;
          return (
            item.question.toLowerCase().includes(q) ||
            (item.answerParagraph?.toLowerCase().includes(q) ?? false) ||
            (item.answerBullets?.some((b) => b.toLowerCase().includes(q)) ?? false) ||
            item.keyTerms.some((t) => t.toLowerCase().includes(q))
          );
        });

  const longAnswers =
    markFilter === '2mark'
      ? []
      : unit.longAnswers.filter((item) => {
          if (!q) return true;
          return (
            item.question.toLowerCase().includes(q) ||
            item.introduction.toLowerCase().includes(q) ||
            item.diagramTitle.toLowerCase().includes(q) ||
            item.realTimeExample.title.toLowerCase().includes(q) ||
            item.sections.some(
              (s) =>
                s.heading.toLowerCase().includes(q) ||
                (s.paragraphs?.some((p) => p.toLowerCase().includes(q)) ?? false) ||
                (s.bullets?.some((b) => b.toLowerCase().includes(q)) ?? false),
            )
          );
        });

  return { twoMarks, longAnswers };
}
