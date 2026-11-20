import { useState } from 'react';
import { ArrowUpRight, Box } from 'lucide-react';
import { SYLLABUS_UNITS } from '../data/syllabus';
import { ExamDiagram } from './diagrams/ExamDiagram';

interface DiagramGalleryProps {
  onJumpToQuestion: (unitId: string, questionId: string) => void;
  onInspect3D: (unitIndex: number) => void;
}

export function DiagramGallery({ onJumpToQuestion, onInspect3D }: DiagramGalleryProps) {
  const [selectedUnit, setSelectedUnit] = useState<string>('all');

  const items = SYLLABUS_UNITS.flatMap((unit) =>
    unit.longAnswers.map((q) => ({
      unit,
      question: q,
    })),
  ).filter((entry) => selectedUnit === 'all' || entry.unit.id === selectedUnit);

  return (
    <main className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="max-w-2xl">
          <p className="text-xs font-medium text-blue-700 dark:text-sky-400">Units 1–6 Visual Reference · 20 Exam Diagrams</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1">
            Exam-Ready Diagram Atlas
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            Every 13/16-mark long answer diagram structured for clean pencil sketching in the exam hall, complete with interactive sub-diagram tabs and labeling reminders.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 dark:bg-slate-800 rounded-lg w-fit" role="group" aria-label="Filter diagrams by unit">
          <button
            type="button"
            onClick={() => setSelectedUnit('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              selectedUnit === 'all'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Units
          </button>
          {SYLLABUS_UNITS.map((u) => (
            <button
              key={u.id}
              type="button"
              onClick={() => setSelectedUnit(u.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                selectedUnit === u.id
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Unit {u.unitNumber}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {items.map(({ unit, question }) => (
          <article
            key={question.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col justify-between gap-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-blue-700 dark:text-sky-400">Unit {unit.unitNumber}</span>
                    <span aria-hidden="true">·</span>
                    <span>Q{question.number}</span>
                    <span aria-hidden="true">·</span>
                    <span>{question.marksLabel}</span>
                  </div>
                  <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mt-1">
                    {question.diagramTitle}
                  </h2>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950/70 rounded-lg p-3 border border-slate-100 dark:border-slate-800">
                <ExamDiagram diagramId={question.diagramId} />
              </div>

              <div className="space-y-1.5 pt-1">
                <h3 className="text-xs font-semibold text-slate-800 dark:text-slate-200">Exam Pencil-Sketch Checklist</h3>
                <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400 list-disc pl-4 leading-relaxed">
                  {question.sketchTips.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => onJumpToQuestion(unit.id, question.id)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 dark:text-sky-400 hover:text-blue-800 dark:hover:text-sky-300 transition-colors whitespace-nowrap"
              >
                Read Full Answer Sheet
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onInspect3D(question.unit3DIndex)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors whitespace-nowrap"
              >
                <Box className="w-3.5 h-3.5" />
                Inspect Unit {unit.unitNumber} in 3D
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
