export type GameDeckFilter = 'all' | 'units1to3' | 'units4to6';
export type GamePhase = 'title' | 'playing' | 'paused' | 'victory' | 'defeat';

export interface SprintCard {
  id: string;
  unitNumber: number;
  unitName: string;
  topic: string;
  prompt: string;
  options: [string, string, string, string];
  correctIndex: number;
  keywordClue: string;
  explanation: string;
}

export interface SprintRunSnapshot {
  score: number;
  bestStreak: number;
  correctCount: number;
  totalAnswered: number;
  accuracyPercent: number;
  shieldsRemaining: number;
  outcome: 'victory' | 'defeat';
}

export interface SprintGameState {
  phase: GamePhase;
  deckFilter: GameDeckFilter;
  deck: SprintCard[];
  roundIndex: number;
  score: number;
  streak: number;
  bestStreak: number;
  shields: number;
  maxShields: number;
  correctCount: number;
  answeredCount: number;
  hintTier: 0 | 1 | 2 | 3;
  eliminatedIndices: number[];
  selectedOptionIndex: number | null;
  lastOutcome: 'correct' | 'wrong' | null;
  finalSnapshot: SprintRunSnapshot | null;
}

export const SPRINT_QUESTION_BANK: SprintCard[] = [
  {
    id: 'g-u1-1',
    unitNumber: 1,
    unitName: 'Process & Agile',
    topic: 'Spiral Model Quadrants',
    prompt: 'Which SDLC model explicitly dedicates a quadrant in every iteration to Risk Analysis and prototyping?',
    options: ['Waterfall Model', 'Spiral Model', 'Incremental Model', 'V-Model'],
    correctIndex: 1,
    keywordClue: 'Proposed by Barry Boehm for aerospace, defense, and high-risk systems.',
    explanation: 'The Spiral Model repeats 4 quadrants (Planning, Risk Analysis, Engineering, Evaluation) on every cycle.',
  },
  {
    id: 'g-u1-2',
    unitNumber: 1,
    unitName: 'Process & Agile',
    topic: 'Extreme Programming (XP)',
    prompt: 'Which XP practice requires two developers to share one workstation—one writing code while the other reviews continuously?',
    options: ['Collective Ownership', 'System Metaphor', 'Pair Programming', 'Planning Game'],
    correctIndex: 2,
    keywordClue: 'Driver + Navigator working side by side during the Coding phase.',
    explanation: 'Pair Programming improves code quality, knowledge sharing, and real-time defect prevention.',
  },
  {
    id: 'g-u1-3',
    unitNumber: 1,
    unitName: 'Process & Agile',
    topic: 'Agile Manifesto Values',
    prompt: 'According to the Agile Manifesto, which priority is valued OVER following a rigid plan?',
    options: ['Comprehensive documentation', 'Responding to change', 'Contract negotiation', 'Strict phase sign-offs'],
    correctIndex: 1,
    keywordClue: 'Core Value #4 of the Agile Manifesto.',
    explanation: 'Agile values "Responding to change over following a plan" through short iterative sprints.',
  },
  {
    id: 'g-u2-1',
    unitNumber: 2,
    unitName: 'SRS, UML & DFD',
    topic: 'IEEE 830 SRS Characteristics',
    prompt: 'Which document acts as the formal contract between customer and developer detailing Functional and Non-Functional requirements?',
    options: ['Software Requirements Specification (SRS)', 'Test Plan Document', 'Gantt Schedule', 'Class Blueprint'],
    correctIndex: 0,
    keywordClue: 'Structured into Introduction, Overall Description, and Specific Requirements.',
    explanation: 'An SRS completely specifies expected external behavior, performance, security, and interfaces.',
  },
  {
    id: 'g-u2-2',
    unitNumber: 2,
    unitName: 'SRS, UML & DFD',
    topic: 'Data Flow Diagrams (DFD)',
    prompt: 'What is another name for a Level 0 DFD showing the entire system as a single process bubble?',
    options: ['Sequence Diagram', 'Context Diagram', 'State Chart', 'Activity Partition'],
    correctIndex: 1,
    keywordClue: 'Single process numbered 0.0 connected only to external entities.',
    explanation: 'Level 0 DFD (Context Diagram) captures system boundaries and external actors before decomposing into Level 1 and Level 2.',
  },
  {
    id: 'g-u2-3',
    unitNumber: 2,
    unitName: 'SRS, UML & DFD',
    topic: 'Petri Nets',
    prompt: 'In a Petri Net diagram, which graphical symbol represents a Transition that fires when input Places hold tokens?',
    options: ['Hollow circle', 'Solid vertical bar / rectangle', 'Dashed arrow', 'Diamond decision node'],
    correctIndex: 1,
    keywordClue: 'Places = circles, Tokens = black dots, Transitions = bars.',
    explanation: 'Petri Nets model concurrent systems using Places (circles), Transitions (bars), Arcs, and Tokens.',
  },
  {
    id: 'g-u3-1',
    unitNumber: 3,
    unitName: 'Software Design',
    topic: 'Coupling Hierarchy',
    prompt: 'Which type of coupling is the BEST (loosest) because modules communicate only by passing primitive data parameters?',
    options: ['Content Coupling', 'Common Coupling', 'Data Coupling', 'Control Coupling'],
    correctIndex: 2,
    keywordClue: 'Opposite of Content Coupling (worst); passes only needed atomic values.',
    explanation: 'Data Coupling minimizes inter-module dependency, making modules independently testable and reusable.',
  },
  {
    id: 'g-u3-2',
    unitNumber: 3,
    unitName: 'Software Design',
    topic: 'Cohesion Hierarchy',
    prompt: 'Which type of cohesion is the STRONGEST (most desirable), where every element inside a module contributes to one single well-defined task?',
    options: ['Coincidental Cohesion', 'Logical Cohesion', 'Temporal Cohesion', 'Functional Cohesion'],
    correctIndex: 3,
    keywordClue: 'Goal of good modular design: Low Coupling + High _____ Cohesion.',
    explanation: 'Functional Cohesion means a module performs one clear, unified responsibility (e.g., calculateNetSalary).',
  },
  {
    id: 'g-u3-3',
    unitNumber: 3,
    unitName: 'Software Design',
    topic: 'Cyclomatic Complexity',
    prompt: 'For a Control Flow Graph with E = 7 edges, N = 6 nodes, and P = 1 component, what is Cyclomatic Complexity V(G)?',
    options: ['2', '3', '5', '7'],
    correctIndex: 1,
    keywordClue: 'Formula: V(G) = E - N + 2P.',
    explanation: 'V(G) = 7 - 6 + 2(1) = 3 independent basis paths requiring at least 3 unit test cases.',
  },
  {
    id: 'g-u4-1',
    unitNumber: 4,
    unitName: 'Design Patterns',
    topic: 'MVC Architecture',
    prompt: 'In the Model-View-Controller (MVC) pattern, which component receives incoming user HTTP requests and coordinates Model updates?',
    options: ['Model', 'View', 'Controller', 'Data Store'],
    correctIndex: 2,
    keywordClue: 'Acts as the traffic coordinator between View UI and Model business logic.',
    explanation: 'The Controller handles user input, invokes Model logic/database queries, and selects the View to render.',
  },
  {
    id: 'g-u4-2',
    unitNumber: 4,
    unitName: 'Design Patterns',
    topic: 'Adapter vs Facade',
    prompt: 'Which structural design pattern provides a simplified single entry-point interface to a complex subsystem of classes?',
    options: ['Adapter Pattern', 'Facade Pattern', 'Strategy Pattern', 'Observer Pattern'],
    correctIndex: 1,
    keywordClue: 'Adapter translates incompatible interfaces; this pattern hides subsystem complexity.',
    explanation: 'Facade simplifies complex subsystems (e.g., HomeTheaterFacade.watchMovie()) behind one clean API.',
  },
  {
    id: 'g-u4-3',
    unitNumber: 4,
    unitName: 'Design Patterns',
    topic: 'Architectural Styles',
    prompt: 'Which architectural style chains independent processing components where the output stream of one stage feeds the input of the next?',
    options: ['Layered Architecture', 'Client-Server', 'Pipe and Filter', 'Microkernel'],
    correctIndex: 2,
    keywordClue: 'Classic example: Compilers (Lexer -> Parser -> Optimizer -> CodeGen) and Unix pipelines.',
    explanation: 'Pipe and Filter processes sequential data streams through reusable, independent filter transformations.',
  },
  {
    id: 'g-u5-1',
    unitNumber: 5,
    unitName: 'Testing & Debug',
    topic: 'Black Box vs White Box',
    prompt: 'Boundary Value Analysis (BVA) and Equivalence Partitioning belong to which testing category?',
    options: ['White Box Testing', 'Black Box Testing', 'Mutation Testing', 'Symbolic Execution'],
    correctIndex: 1,
    keywordClue: 'Tests external input/output behavior without inspecting internal source code.',
    explanation: 'Black Box (functional) testing derives test inputs from specifications using BVA and Equivalence Partitioning.',
  },
  {
    id: 'g-u5-2',
    unitNumber: 5,
    unitName: 'Testing & Debug',
    topic: 'Regression Testing',
    prompt: 'Which type of testing re-executes previously passing test suites after code changes or bug fixes to confirm no new defects were introduced?',
    options: ['Alpha Testing', 'Smoke Testing', 'Regression Testing', 'Stress Testing'],
    correctIndex: 2,
    keywordClue: 'Automated in CI pipelines to prevent previously working features from breaking.',
    explanation: 'Regression testing ensures recent bug fixes or enhancements do not break existing functionality.',
  },
  {
    id: 'g-u5-3',
    unitNumber: 5,
    unitName: 'Testing & Debug',
    topic: 'Formal Verification',
    prompt: 'Which technique executes a program using algebraic symbols instead of concrete inputs to generate path constraints?',
    options: ['Model Checking', 'Symbolic Execution', 'Equivalence Partitioning', 'Pair Debugging'],
    correctIndex: 1,
    keywordClue: 'Builds a Symbolic Execution Tree and solves path conditions with SMT solvers.',
    explanation: 'Symbolic Execution explores multiple paths simultaneously by tracking symbolic expressions and path conditions.',
  },
  {
    id: 'g-u6-1',
    unitNumber: 6,
    unitName: 'Project Mgmt',
    topic: 'PERT Formula',
    prompt: 'Given Optimistic O = 2, Most Likely M = 4, and Pessimistic P = 8 days, what is PERT Expected Time (TE)?',
    options: ['4.00 days', '4.33 days', '4.67 days', '5.00 days'],
    correctIndex: 1,
    keywordClue: 'Formula: TE = (O + 4M + P) / 6.',
    explanation: 'TE = (2 + 4(4) + 8) / 6 = 26 / 6 = 4.33 days, with variance ((8 - 2)/6)^2 = 1.0.',
  },
  {
    id: 'g-u6-2',
    unitNumber: 6,
    unitName: 'Project Mgmt',
    topic: 'Critical Path Method (CPM)',
    prompt: 'In CPM scheduling, what is the Slack (Float) value for every activity located on the Critical Path?',
    options: ['Always equal to 0', 'Equal to project duration', 'Always greater than 1', 'Equal to variance'],
    correctIndex: 0,
    keywordClue: 'Slack = LS - ES = LF - EF; any delay delays the entire project.',
    explanation: 'Critical path activities have zero float (Slack = 0), determining the shortest possible project completion time.',
  },
  {
    id: 'g-u6-3',
    unitNumber: 6,
    unitName: 'Project Mgmt',
    topic: 'SCM & DevOps',
    prompt: 'In Software Configuration Management (SCM), what is a formally reviewed and approved snapshot of work products that serves as the basis for further changes?',
    options: ['Pull Request', 'Baseline', 'Sprint Backlog', 'Gantt Bar'],
    correctIndex: 1,
    keywordClue: 'Changes after this locked milestone require formal Change Control Board approval.',
    explanation: 'A Baseline is a formally agreed configuration reference point managed under version and change control.',
  },
];

export function buildDeckForFilter(filter: GameDeckFilter): SprintCard[] {
  if (filter === 'units1to3') {
    return SPRINT_QUESTION_BANK.filter((c) => c.unitNumber <= 3);
  }
  if (filter === 'units4to6') {
    return SPRINT_QUESTION_BANK.filter((c) => c.unitNumber >= 4);
  }
  return SPRINT_QUESTION_BANK.slice(0, 10);
}

export function createInitialSprintState(
  deckFilter: GameDeckFilter = 'all',
  phase: GamePhase = 'title',
): SprintGameState {
  return {
    phase,
    deckFilter,
    deck: buildDeckForFilter(deckFilter),
    roundIndex: 0,
    score: 0,
    streak: 0,
    bestStreak: 0,
    shields: 3,
    maxShields: 3,
    correctCount: 0,
    answeredCount: 0,
    hintTier: 0,
    eliminatedIndices: [],
    selectedOptionIndex: null,
    lastOutcome: null,
    finalSnapshot: null,
  };
}

export function startSprintRun(deckFilter: GameDeckFilter): SprintGameState {
  return createInitialSprintState(deckFilter, 'playing');
}

export function applyHintTier(state: SprintGameState): SprintGameState {
  if (state.phase !== 'playing' || state.selectedOptionIndex !== null || state.hintTier >= 3) {
    return state;
  }
  const currentCard = state.deck[state.roundIndex];
  if (!currentCard) return state;

  const nextTier = (state.hintTier + 1) as 1 | 2 | 3;
  let eliminatedIndices = state.eliminatedIndices;

  if (nextTier === 2) {
    // Deterministically eliminate 2 incorrect options
    const wrongIndices = [0, 1, 2, 3].filter((i) => i !== currentCard.correctIndex);
    eliminatedIndices = wrongIndices.slice(0, 2);
  }

  return {
    ...state,
    hintTier: nextTier,
    eliminatedIndices,
  };
}

export function submitSprintAnswer(state: SprintGameState, optionIndex: number): SprintGameState {
  if (state.phase !== 'playing' || state.selectedOptionIndex !== null) {
    return state;
  }
  if (state.eliminatedIndices.includes(optionIndex)) {
    return state;
  }
  const card = state.deck[state.roundIndex];
  if (!card) return state;

  const isCorrect = optionIndex === card.correctIndex;
  const answeredCount = state.answeredCount + 1;

  if (isCorrect) {
    const nextStreak = state.streak + 1;
    const bestStreak = Math.max(state.bestStreak, nextStreak);
    const hintPenalty = state.hintTier * 20;
    const basePoints = Math.max(40, 100 - hintPenalty);
    const pointsAwarded = basePoints * Math.min(nextStreak, 4);

    return {
      ...state,
      score: state.score + pointsAwarded,
      streak: nextStreak,
      bestStreak,
      correctCount: state.correctCount + 1,
      answeredCount,
      selectedOptionIndex: optionIndex,
      lastOutcome: 'correct',
    };
  }

  const nextShields = Math.max(0, state.shields - 1);
  return {
    ...state,
    streak: 0,
    shields: nextShields,
    answeredCount,
    selectedOptionIndex: optionIndex,
    lastOutcome: 'wrong',
  };
}

export function advanceSprintRound(state: SprintGameState): SprintGameState {
  if (state.phase !== 'playing' || state.selectedOptionIndex === null) {
    return state;
  }

  const accuracyPercent =
    state.answeredCount === 0
      ? 0
      : Math.round((state.correctCount / state.answeredCount) * 100);

  if (state.shields <= 0) {
    return {
      ...state,
      phase: 'defeat',
      finalSnapshot: {
        score: state.score,
        bestStreak: state.bestStreak,
        correctCount: state.correctCount,
        totalAnswered: state.answeredCount,
        accuracyPercent,
        shieldsRemaining: 0,
        outcome: 'defeat',
      },
    };
  }

  const nextRound = state.roundIndex + 1;
  if (nextRound >= state.deck.length) {
    return {
      ...state,
      phase: 'victory',
      finalSnapshot: {
        score: state.score,
        bestStreak: state.bestStreak,
        correctCount: state.correctCount,
        totalAnswered: state.answeredCount,
        accuracyPercent,
        shieldsRemaining: state.shields,
        outcome: 'victory',
      },
    };
  }

  return {
    ...state,
    roundIndex: nextRound,
    hintTier: 0,
    eliminatedIndices: [],
    selectedOptionIndex: null,
    lastOutcome: null,
  };
}
