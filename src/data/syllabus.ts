import { UNITS_1_TO_3 } from './units1to3';
import { UNITS_4_TO_6 } from './units4to6';
import type { CpmActivityInput, UnitData } from '../types/syllabus';

export const SYLLABUS_UNITS: UnitData[] = [...UNITS_1_TO_3, ...UNITS_4_TO_6];

export const DEFAULT_CPM_ACTIVITIES: CpmActivityInput[] = [
  { id: 'A', name: 'Requirements Analysis', duration: 2, dependencies: [] },
  { id: 'B', name: 'System Design', duration: 3, dependencies: ['A'] },
  { id: 'C', name: 'Database Architecture', duration: 4, dependencies: ['A'] },
  { id: 'D', name: 'Implementation & Coding', duration: 5, dependencies: ['B', 'C'] },
  { id: 'E', name: 'System Testing', duration: 2, dependencies: ['D'] },
];

export const EXAM_FORMULAS = [
  {
    name: 'PERT Expected Time',
    unit: 'Unit 6',
    formula: 'TE = (O + 4M + P) / 6',
    variables: 'O = Optimistic, M = Most Likely, P = Pessimistic time',
    worked: 'O=2, M=4, P=8 → TE = (2 + 16 + 8)/6 = 4.33 days',
  },
  {
    name: 'PERT Variance & Std Dev',
    unit: 'Unit 6',
    formula: 'σ² = ((P - O) / 6)²   |   σ = (P - O) / 6',
    variables: 'Measures duration uncertainty spread across an activity',
    worked: 'O=2, P=8 → σ = (8 - 2)/6 = 1 day, σ² = 1 day²',
  },
  {
    name: 'Cyclomatic Complexity',
    unit: 'Unit 3 & Unit 5',
    formula: 'V(G) = E - N + 2P',
    variables: 'E = Edges, N = Nodes, P = Connected components (typically 1)',
    worked: 'E=7, N=6, P=1 → V(G) = 7 - 6 + 2 = 3 independent paths',
  },
  {
    name: 'CPM Total Slack (Float)',
    unit: 'Unit 6',
    formula: 'Slack = LS - ES = LF - EF',
    variables: 'Critical Path activities always have Slack = 0',
    worked: 'Activity B (LS=3, ES=2) → Slack = 1 day (non-critical)',
  },
];

export const FIVE_PAGE_STRATEGY = [
  { page: 'Page 1', content: 'Introduction, crisp textbook definition, objectives, and key terms underlined.' },
  { page: 'Page 2', content: 'Detailed breakdown of main concepts, phases, or types using numbered subheadings.' },
  { page: 'Page 3', content: 'Neat pencil-drawn, fully labeled architecture/flow diagram + short walkthrough.' },
  { page: 'Page 4', content: 'Real-time application example (College Portal / Railway / Food App) + Comparison Table.' },
  { page: 'Page 5', content: 'Separate Advantages & Disadvantages lists, Suitable Applications, and 3-line Conclusion.' },
];
