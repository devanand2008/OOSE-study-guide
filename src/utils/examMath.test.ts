import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculatePert,
  solveCpmNetwork,
  calculateCyclomaticComplexity,
  computeRevisionStats,
  computeLongAnswerBlueprintProgress,
} from './examMath';
import { SYLLABUS_UNITS } from '../data/syllabus';
import type { UnitData } from '../types/syllabus';

test('calculatePert matches Unit 6 exam example (O=2, M=4, P=8)', () => {
  const res = calculatePert(2, 4, 8);
  assert.equal(res.expectedTime, 4.33);
  assert.equal(res.variance, 1);
  assert.equal(res.stdDev, 1);
});

test('calculatePert rejects invalid ordering O > M or M > P', () => {
  assert.throws(() => calculatePert(6, 4, 8), /Optimistic <= Most Likely <= Pessimistic/);
  assert.throws(() => calculatePert(-1, 2, 5), /negative/);
});

test('solveCpmNetwork solves exact Unit 6 exam network (A->C->D->E = 13 days)', () => {
  const solution = solveCpmNetwork([
    { id: 'A', name: 'Requirements', duration: 2, dependencies: [] },
    { id: 'B', name: 'Design', duration: 3, dependencies: ['A'] },
    { id: 'C', name: 'Database', duration: 4, dependencies: ['A'] },
    { id: 'D', name: 'Coding', duration: 5, dependencies: ['B', 'C'] },
    { id: 'E', name: 'Testing', duration: 2, dependencies: ['D'] },
  ]);

  assert.equal(solution.projectDuration, 13);
  assert.deepEqual(solution.criticalPath, ['A', 'C', 'D', 'E']);
  assert.equal(solution.allPaths.length, 2);
  assert.equal(solution.allPaths[0].duration, 13);
  assert.equal(solution.allPaths[1].duration, 12);

  const actB = solution.activities.find((a) => a.id === 'B')!;
  const actC = solution.activities.find((a) => a.id === 'C')!;
  assert.equal(actB.slack, 1);
  assert.equal(actB.isCritical, false);
  assert.equal(actC.slack, 0);
  assert.equal(actC.isCritical, true);
});

test('solveCpmNetwork detects dependency cycles', () => {
  assert.throws(
    () =>
      solveCpmNetwork([
        { id: 'A', name: 'Task A', duration: 2, dependencies: ['B'] },
        { id: 'B', name: 'Task B', duration: 2, dependencies: ['A'] },
      ]),
    /Cycle detected/,
  );
});

test('calculateCyclomaticComplexity applies V(G) = E - N + 2P correctly', () => {
  const simple = calculateCyclomaticComplexity(7, 6, 1);
  assert.equal(simple.complexity, 3);
  assert.equal(simple.riskBand, 'Simple & Low Risk');

  const moderate = calculateCyclomaticComplexity(25, 14, 1);
  assert.equal(moderate.complexity, 13);
  assert.equal(moderate.riskBand, 'Moderate Complexity');
});

test('computeRevisionStats computes accurate totals and percentages', () => {
  const mockUnits: UnitData[] = [
    {
      id: 'unit-1',
      unitNumber: 1,
      title: 'Unit 1',
      shortTitle: 'Process',
      summary: 'Summary',
      twoMarks: [
        { id: 'u1-2m-1', number: 1, question: 'Q1', keyTerms: [] },
        { id: 'u1-2m-2', number: 2, question: 'Q2', keyTerms: [] },
      ],
      longAnswers: [
        {
          id: 'u1-13m-1',
          number: 1,
          question: 'LQ1',
          marksLabel: '13 / 16 Marks',
          diagramId: 'u1-sdlc',
          diagramTitle: 'SDLC',
          sketchTips: [],
          introduction: '',
          sections: [],
          realTimeExample: { title: '', points: [] },
          conclusion: '',
          pageBlueprint: [],
          unit3DIndex: 0,
        },
        {
          id: 'u1-13m-2',
          number: 2,
          question: 'LQ2',
          marksLabel: '13 / 16 Marks',
          diagramId: 'u1-agile',
          diagramTitle: 'Agile',
          sketchTips: [],
          introduction: '',
          sections: [],
          realTimeExample: { title: '', points: [] },
          conclusion: '',
          pageBlueprint: [],
          unit3DIndex: 0,
        },
      ],
    },
  ];

  const stats = computeRevisionStats(mockUnits, new Set(['u1-2m-1', 'u1-13m-1']));
  assert.equal(stats.totalQuestions, 4);
  assert.equal(stats.revisedQuestions, 2);
  assert.equal(stats.percentComplete, 50);
  assert.deepEqual(stats.byUnit['unit-1'], { total: 4, revised: 2 });
});

test('computeLongAnswerBlueprintProgress counts only the 20 long-answer blueprints', () => {
  const empty = computeLongAnswerBlueprintProgress(SYLLABUS_UNITS, new Set());
  assert.equal(empty.totalBlueprints, 20);
  assert.equal(empty.revisedBlueprints, 0);
  assert.equal(empty.percentComplete, 0);

  // Marking only 2-mark questions and unknown IDs must not affect blueprint count
  const twoMarkIds = SYLLABUS_UNITS.flatMap((u) => u.twoMarks.map((q) => q.id));
  const onlyTwoMarks = computeLongAnswerBlueprintProgress(
    SYLLABUS_UNITS,
    new Set([...twoMarkIds, 'stale-unknown-id']),
  );
  assert.equal(onlyTwoMarks.totalBlueprints, 20);
  assert.equal(onlyTwoMarks.revisedBlueprints, 0);
  assert.equal(onlyTwoMarks.percentComplete, 0);

  // Marking 5 long answers plus some 2-mark questions yields exactly 5/20 (25%)
  const allLongIds = SYLLABUS_UNITS.flatMap((u) => u.longAnswers.map((q) => q.id));
  const partial = computeLongAnswerBlueprintProgress(
    SYLLABUS_UNITS,
    new Set([twoMarkIds[0], ...allLongIds.slice(0, 5)]),
  );
  assert.equal(partial.revisedBlueprints, 5);
  assert.equal(partial.percentComplete, 25);

  // Marking all 20 long answers yields 20/20 (100%)
  const full = computeLongAnswerBlueprintProgress(SYLLABUS_UNITS, new Set(allLongIds));
  assert.equal(full.revisedBlueprints, 20);
  assert.equal(full.percentComplete, 100);
});
