import { Moon, Sun } from 'lucide-react';
import type { LongAnswerBlueprintProgress } from '../utils/examMath';
import type { ThemeMode } from '../utils/theme';

export type AppView = 'study' | 'diagrams' | 'lab3d' | 'calculators' | 'game';

interface TopBarProps {
  activeView: AppView;
  onChangeView: (view: AppView) => void;
  onOpenTutor: () => void;
  blueprintProgress: LongAnswerBlueprintProgress;
  theme: ThemeMode;
  onToggleTheme: () => void;
}

const NAV_ITEMS: { id: AppView; label: string }[] = [
  { id: 'study', label: 'Study Guide' },
  { id: 'diagrams', label: 'Diagrams' },
  { id: 'lab3d', label: '3D Lab' },
  { id: 'calculators', label: 'Calculators' },
  { id: 'game', label: 'Exam Game' },
];

export function TopBar({
  activeView,
  onChangeView,
  onOpenTutor,
  blueprintProgress,
  theme,
  onToggleTheme,
}: TopBarProps) {
  const { revisedBlueprints, totalBlueprints, percentComplete } = blueprintProgress;
  const fillScale = totalBlueprints === 0 ? 0 : revisedBlueprints / totalBlueprints;
  const isDark = theme === 'dark';

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 no-print transition-colors duration-150">
      <div className="max-w-[1440px] mx-auto h-14 md:h-16 px-4 sm:px-6 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Single-element Brand Wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onChangeView('study');
          }}
          className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap shrink-0"
        >
          SE Exam Guide
        </a>

        {/* Zone 2: 5 Single-line text navigation links */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-6 lg:gap-7">
          {NAV_ITEMS.map((item) => {
            const active = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onChangeView(item.id)}
                aria-current={active ? 'page' : undefined}
                className={`text-sm font-medium transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                  active
                    ? 'text-blue-700 dark:text-sky-400 border-blue-700 dark:border-sky-400'
                    : 'text-slate-600 dark:text-slate-300 border-transparent hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Long-Answer Blueprint Progress + Theme Toggle + Primary CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
          <div
            className="flex flex-col gap-1 min-w-[96px] sm:min-w-[138px]"
            data-testid="topnav-blueprint-progress"
          >
            <div className="flex items-baseline justify-between gap-2 text-[11px] leading-none whitespace-nowrap">
              <span className="font-medium text-slate-600 dark:text-slate-300">Blueprints</span>
              <span className="font-mono font-semibold tabular-nums text-blue-700 dark:text-sky-400">
                {revisedBlueprints}/{totalBlueprints}
                <span className="hidden sm:inline text-slate-500 dark:text-slate-400 font-normal">
                  {' '}({percentComplete}%)
                </span>
              </span>
            </div>
            <div
              role="progressbar"
              aria-label="Long-answer blueprints revised"
              aria-valuemin={0}
              aria-valuemax={totalBlueprints}
              aria-valuenow={revisedBlueprints}
              aria-valuetext={`${revisedBlueprints} of ${totalBlueprints} long-answer blueprints revised (${percentComplete}%)`}
              data-testid="topnav-blueprint-bar"
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden"
            >
              <div
                className="h-full w-full bg-blue-700 dark:bg-sky-400 rounded-full origin-left transition-transform duration-200"
                style={{ transform: `scaleX(${fillScale})` }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={isDark}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            data-testid="theme-toggle"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 dark:focus-visible:outline-sky-400 transition-colors shrink-0"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={onOpenTutor}
            className="px-3.5 sm:px-4 py-2 text-xs font-semibold text-white bg-blue-700 dark:bg-sky-600 rounded-lg hover:bg-blue-800 dark:hover:bg-sky-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 dark:focus-visible:outline-sky-400 transition-colors whitespace-nowrap shrink-0"
          >
            Ask Tutor
          </button>
        </div>
      </div>

      {/* Compact mobile navigation row */}
      <nav
        aria-label="Mobile navigation"
        className="md:hidden flex items-center justify-between bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 px-2 py-1 overflow-x-auto"
      >
        {NAV_ITEMS.map((item) => {
          const active = activeView === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChangeView(item.id)}
              aria-current={active ? 'page' : undefined}
              className={`px-2 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 ${
                active
                  ? 'bg-blue-50 dark:bg-sky-950/70 text-blue-700 dark:text-sky-300'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Subtle full-width progress hairline pinned to bottom of navigation */}
      <div className="h-[2px] w-full bg-slate-100 dark:bg-slate-800 overflow-hidden" aria-hidden="true">
        <div
          className="h-full w-full bg-blue-700 dark:bg-sky-400 origin-left transition-transform duration-200"
          style={{ transform: `scaleX(${fillScale})` }}
        />
      </div>
    </header>
  );
}
