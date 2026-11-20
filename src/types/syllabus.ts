export type DiagramId =
  | 'u1-sdlc'
  | 'u1-agile'
  | 'u1-xp'
  | 'u2-srs'
  | 'u2-uml'
  | 'u2-dfd'
  | 'u2-fsm-petri'
  | 'u3-coupling-cohesion'
  | 'u3-design-approaches'
  | 'u3-fod-ood'
  | 'u4-mvc'
  | 'u4-patterns'
  | 'u4-architecture'
  | 'u4-ui-process'
  | 'u5-testing-levels'
  | 'u5-railway-test'
  | 'u5-debugging-formal'
  | 'u6-pert-cpm'
  | 'u6-devops'
  | 'u6-scm';

export interface ComparisonTable {
  title?: string;
  headers: string[];
  rows: string[][];
}

export interface TwoMarkQuestion {
  id: string;
  number: number;
  question: string;
  shortPromptVariant?: string;
  answerBullets?: string[];
  answerParagraph?: string;
  table?: ComparisonTable;
  keyTerms: string[];
}

export interface AnswerSubSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  orderedSteps?: string[];
  codeBlock?: {
    language: string;
    code: string;
  };
  formula?: string;
  table?: ComparisonTable;
  prosCons?: {
    advantages: string[];
    disadvantages: string[];
    applications?: string[];
  };
}

export interface PageBlueprintItem {
  page: string;
  focus: string;
  checklist: string;
}

export interface LongAnswerQuestion {
  id: string;
  number: number;
  question: string;
  isHighPriority?: boolean;
  marksLabel: '13 / 16 Marks';
  diagramId: DiagramId;
  diagramTitle: string;
  sketchTips: string[];
  introduction: string;
  sections: AnswerSubSection[];
  comparisonTable?: ComparisonTable;
  realTimeExample: {
    title: string;
    points: string[];
  };
  conclusion: string;
  pageBlueprint: PageBlueprintItem[];
  unit3DIndex: number;
}

export interface UnitData {
  id: string;
  unitNumber: number;
  title: string;
  shortTitle: string;
  summary: string;
  twoMarks: TwoMarkQuestion[];
  longAnswers: LongAnswerQuestion[];
}

export interface CpmActivityInput {
  id: string;
  name: string;
  duration: number;
  dependencies: string[];
}

export interface CpmActivityResult extends CpmActivityInput {
  es: number;
  ef: number;
  ls: number;
  lf: number;
  slack: number;
  isCritical: boolean;
}

export interface CpmSolution {
  activities: CpmActivityResult[];
  projectDuration: number;
  criticalPath: string[];
  allPaths: { path: string[]; duration: number; isCritical: boolean }[];
}
