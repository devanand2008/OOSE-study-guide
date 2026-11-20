import { useEffect, useMemo, useState } from 'react';
import { SYLLABUS_UNITS } from './data/syllabus';
import { computeLongAnswerBlueprintProgress } from './utils/examMath';
import {
  resolveInitialTheme,
  THEME_STORAGE_KEY,
  toggleThemeMode,
  type ThemeMode,
} from './utils/theme';
import { TopBar, type AppView } from './components/TopBar';
import { StudyWorkspace } from './components/StudyWorkspace';
import { DiagramGallery } from './components/DiagramGallery';
import { FormulaCalculators } from './components/FormulaCalculators';
import { ExamScene3D } from './components/three/ExamScene3D';
import { ExamTutorDrawer } from './components/ExamTutorDrawer';
import { SEExamSprintGame } from './components/game/SEExamSprintGame';

const STORAGE_KEY = 'se-exam-guide-revised-ids-v1';

function loadRevisedIds(): Set<string> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) {
      return new Set(parsed.filter((item): item is string => typeof item === 'string'));
    }
  } catch {
    // Ignore storage read errors in restricted contexts
  }
  return new Set();
}

function loadInitialTheme(): ThemeMode {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    const prefersDark =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    return resolveInitialTheme(stored, prefersDark);
  } catch {
    return 'light';
  }
}

export default function App() {
  const [activeView, setActiveView] = useState<AppView>('study');
  const [activeUnitId, setActiveUnitId] = useState<string>(SYLLABUS_UNITS[0].id);
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(
    SYLLABUS_UNITS[0].longAnswers[0]?.id ?? null,
  );
  const [active3DUnitIndex, setActive3DUnitIndex] = useState<number>(0);
  const [revisedIds, setRevisedIds] = useState<Set<string>>(() => loadRevisedIds());
  const [theme, setTheme] = useState<ThemeMode>(() => loadInitialTheme());

  const [tutorOpen, setTutorOpen] = useState(false);
  const [tutorPrompt, setTutorPrompt] = useState('');
  const [tutorUnitTitle, setTutorUnitTitle] = useState('All Units (Software Engineering)');

  const blueprintProgress = useMemo(
    () => computeLongAnswerBlueprintProgress(SYLLABUS_UNITS, revisedIds),
    [revisedIds],
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage write errors
    }
  }, [theme]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(revisedIds)));
    } catch {
      // Ignore storage write errors
    }
  }, [revisedIds]);

  const handleToggleTheme = () => {
    setTheme((prev) => toggleThemeMode(prev));
  };

  const handleToggleRevised = (id: string) => {
    setRevisedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleJumpToQuestion = (unitId: string, questionId: string) => {
    setActiveUnitId(unitId);
    setExpandedQuestionId(questionId);
    setActiveView('study');
    window.setTimeout(() => {
      document.getElementById(questionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  const handleInspect3D = (unitIndex: number) => {
    setActive3DUnitIndex(unitIndex);
    setActiveView('lab3d');
  };

  const handleAskTutor = (prompt: string, unitTitle: string) => {
    setTutorPrompt(prompt);
    setTutorUnitTitle(unitTitle);
    setTutorOpen(true);
  };

  if (activeView === 'game') {
    return <SEExamSprintGame onExit={() => setActiveView('study')} />;
  }

  return (
    <div id="top" className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-150">
      <TopBar
        activeView={activeView}
        onChangeView={setActiveView}
        onOpenTutor={() => setTutorOpen(true)}
        blueprintProgress={blueprintProgress}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <div className="flex-1">
        {activeView === 'study' && (
          <StudyWorkspace
            activeUnitId={activeUnitId}
            onSelectUnit={setActiveUnitId}
            expandedQuestionId={expandedQuestionId}
            onExpandQuestion={setExpandedQuestionId}
            revisedIds={revisedIds}
            onToggleRevised={handleToggleRevised}
            onInspect3D={handleInspect3D}
            onAskTutor={handleAskTutor}
          />
        )}

        {activeView === 'diagrams' && (
          <DiagramGallery
            onJumpToQuestion={handleJumpToQuestion}
            onInspect3D={handleInspect3D}
          />
        )}

        {activeView === 'lab3d' && (
          <ExamScene3D
            activeUnitIndex={active3DUnitIndex}
            onSelectUnitIndex={setActive3DUnitIndex}
            theme={theme}
          />
        )}

        {activeView === 'calculators' && <FormulaCalculators />}
      </div>

      {activeView !== 'lab3d' && (
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mt-12 no-print">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span>Software Engineering Exam Preparation Answer Key · Units 1–6</span>
            <span>24 Two-Mark Cards · 20 Long-Answer Blueprints · Interactive SVG &amp; 3D Visuals</span>
          </div>
        </footer>
      )}

      <ExamTutorDrawer
        open={tutorOpen}
        initialPrompt={tutorPrompt}
        initialUnitTitle={tutorUnitTitle}
        onClose={() => setTutorOpen(false)}
      />
    </div>
  );
}
