import { useState } from 'react';

const ARROW_DEFS = (
  <defs>
    <marker id="arrow-slate" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8.5 5 L 0 8.5 z" fill="#334155" />
    </marker>
    <marker id="arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8.5 5 L 0 8.5 z" fill="#1D4ED8" />
    </marker>
    <marker id="arrow-amber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8.5 5 L 0 8.5 z" fill="#B45309" />
    </marker>
    <marker id="arrow-emerald" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8.5 5 L 0 8.5 z" fill="#047857" />
    </marker>
  </defs>
);

export function DiagramU1Sdlc() {
  const [tab, setTab] = useState<'waterfall' | 'incremental' | 'spiral' | 'prototyping'>('waterfall');

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-fit">
        {(
          [
            ['waterfall', 'Waterfall'],
            ['incremental', 'Incremental'],
            ['spiral', 'Spiral'],
            ['prototyping', 'Prototyping'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              tab === id ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'waterfall' && (
        <svg viewBox="0 0 740 310" className="w-full h-auto bg-white dark:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-700" role="img" aria-label="Waterfall SDLC Model Diagram">
          {ARROW_DEFS}
          <text x="20" y="26" fontSize="13" fontWeight="600" fill="#0F172A">Waterfall Model — Linear Sequential Phases</text>
          {[
            { label: '1. Requirement Analysis', x: 30, y: 44, fill: '#EFF6FF', stroke: '#1D4ED8' },
            { label: '2. System Design', x: 135, y: 88, fill: '#EFF6FF', stroke: '#1D4ED8' },
            { label: '3. Implementation', x: 240, y: 132, fill: '#EFF6FF', stroke: '#1D4ED8' },
            { label: '4. Testing', x: 345, y: 176, fill: '#FEF3C7', stroke: '#B45309' },
            { label: '5. Deployment', x: 450, y: 220, fill: '#ECFDF5', stroke: '#047857' },
            { label: '6. Maintenance', x: 555, y: 264, fill: '#F1F5F9', stroke: '#334155' },
          ].map((step, i, arr) => (
            <g key={step.label}>
              <rect x={step.x} y={step.y} width="160" height="32" rx="6" fill={step.fill} stroke={step.stroke} strokeWidth="1.5" />
              <text x={step.x + 80} y={step.y + 20} textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#0F172A">
                {step.label}
              </text>
              {i < arr.length - 1 && (
                <path
                  d={`M ${step.x + 160} ${step.y + 16} L ${arr[i + 1].x + 55} ${step.y + 16} L ${arr[i + 1].x + 55} ${arr[i + 1].y - 2}`}
                  fill="none"
                  stroke="#334155"
                  strokeWidth="1.5"
                  markerEnd="url(#arrow-slate)"
                />
              )}
            </g>
          ))}
          <path d="M 555 280 L 40 280 L 40 80" fill="none" stroke="#94A3B8" strokeWidth="1.2" strokeDasharray="4 4" markerEnd="url(#arrow-slate)" />
          <text x="52" y="272" fontSize="10.5" fill="#64748B">Feedback / Defect Escalation (Costly late in lifecycle)</text>
        </svg>
      )}

      {tab === 'incremental' && (
        <svg viewBox="0 0 740 270" className="w-full h-auto bg-white dark:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-700" role="img" aria-label="Incremental SDLC Model Diagram">
          {ARROW_DEFS}
          <text x="20" y="26" fontSize="13" fontWeight="600" fill="#0F172A">Incremental Model — Staged Functional Releases</text>
          <rect x="24" y="96" width="110" height="68" rx="6" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="1.5" />
          <text x="79" y="124" textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#0F172A">Overall</text>
          <text x="79" y="142" textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#0F172A">Requirements</text>

          {[
            { name: 'Increment 1 (Registration)', y: 50, color: '#1D4ED8', bg: '#EFF6FF' },
            { name: 'Increment 2 (Attendance)', y: 112, color: '#047857', bg: '#ECFDF5' },
            { name: 'Increment 3 (Fees & Results)', y: 174, color: '#B45309', bg: '#FEF3C7' },
          ].map((inc, idx) => (
            <g key={inc.name}>
              <line x1="134" y1="130" x2="178" y2={inc.y + 20} stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow-slate)" />
              <text x="186" y={inc.y - 4} fontSize="10.5" fontWeight="600" fill={inc.color}>{inc.name}</text>
              {['Design', 'Code', 'Test', 'Deploy'].map((ph, pIdx) => (
                <g key={ph}>
                  <rect x={184 + pIdx * 102 + idx * 14} y={inc.y + 4} width="84" height="32" rx="5" fill={inc.bg} stroke={inc.color} strokeWidth="1.3" />
                  <text x={226 + pIdx * 102 + idx * 14} y={inc.y + 24} textAnchor="middle" fontSize="11" fontWeight="500" fill="#0F172A">{ph}</text>
                  {pIdx < 3 && (
                    <line
                      x1={268 + pIdx * 102 + idx * 14}
                      y1={inc.y + 20}
                      x2={284 + pIdx * 102 + idx * 14}
                      y2={inc.y + 20}
                      stroke="#334155"
                      strokeWidth="1.3"
                      markerEnd="url(#arrow-slate)"
                    />
                  )}
                </g>
              ))}
              <line x1={574 + idx * 14} y1={inc.y + 20} x2="634" y2="130" stroke="#047857" strokeWidth="1.4" markerEnd="url(#arrow-emerald)" />
            </g>
          ))}

          <rect x="638" y="96" width="84" height="68" rx="6" fill="#ECFDF5" stroke="#047857" strokeWidth="1.8" />
          <text x="680" y="124" textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#065F46">Integrated</text>
          <text x="680" y="142" textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#065F46">Product</text>
        </svg>
      )}

      {tab === 'spiral' && (
        <svg viewBox="0 0 740 310" className="w-full h-auto bg-white dark:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-700" role="img" aria-label="Spiral SDLC Model Diagram">
          {ARROW_DEFS}
          <text x="20" y="26" fontSize="13" fontWeight="600" fill="#0F172A">Spiral Model — 4 Risk-Driven Quadrants</text>
          <line x1="370" y1="36" x2="370" y2="296" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="5 4" />
          <line x1="90" y1="166" x2="650" y2="166" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="5 4" />

          <text x="115" y="64" fontSize="12" fontWeight="700" fill="#1D4ED8">Q1. Planning</text>
          <text x="115" y="80" fontSize="10.5" fill="#475569">Objectives, alternatives & constraints</text>

          <text x="485" y="64" fontSize="12" fontWeight="700" fill="#B45309">Q2. Risk Analysis</text>
          <text x="485" y="80" fontSize="10.5" fill="#475569">Identify risks, build risk prototypes</text>

          <text x="485" y="266" fontSize="12" fontWeight="700" fill="#047857">Q3. Engineering</text>
          <text x="485" y="282" fontSize="10.5" fill="#475569">Design, code, unit & system test</text>

          <text x="115" y="266" fontSize="12" fontWeight="700" fill="#334155">Q4. Customer Evaluation</text>
          <text x="115" y="282" fontSize="10.5" fill="#475569">Review build & plan next spiral</text>

          {/* Expanding spiral path */}
          <path
            d="M 370 166 C 370 144, 396 144, 396 166 C 396 196, 336 196, 336 166 C 336 122, 426 122, 426 166 C 426 222, 296 222, 296 166 C 296 94, 464 94, 464 166 C 464 248, 260 248, 260 166 C 260 72, 496 72, 496 148"
            fill="none"
            stroke="#1D4ED8"
            strokeWidth="2.2"
            markerEnd="url(#arrow-blue)"
          />
          <circle cx="370" cy="166" r="4" fill="#1D4ED8" />
          <text x="378" y="162" fontSize="10" fontWeight="600" fill="#1D4ED8">Start</text>
          <text x="504" y="152" fontSize="10.5" fontWeight="600" fill="#047857">Final Release</text>
        </svg>
      )}

      {tab === 'prototyping' && (
        <svg viewBox="0 0 740 260" className="w-full h-auto bg-white dark:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-700" role="img" aria-label="Prototyping SDLC Model Diagram">
          {ARROW_DEFS}
          <text x="20" y="26" fontSize="13" fontWeight="600" fill="#0F172A">Prototyping Model — Customer Refinement Loop</text>
          {[
            { x: 24, y: 80, w: 112, t1: '1. Initial', t2: 'Requirements', bg: '#EFF6FF', st: '#1D4ED8' },
            { x: 162, y: 80, w: 102, t1: '2. Quick', t2: 'Design', bg: '#EFF6FF', st: '#1D4ED8' },
            { x: 290, y: 80, w: 112, t1: '3. Build', t2: 'Prototype', bg: '#FEF3C7', st: '#B45309' },
            { x: 428, y: 80, w: 118, t1: '4. Customer', t2: 'Evaluation', bg: '#FEF3C7', st: '#B45309' },
            { x: 576, y: 80, w: 138, t1: '6. Final Engineer,', t2: 'Test & Deploy', bg: '#ECFDF5', st: '#047857' },
          ].map((b, i, arr) => (
            <g key={b.t1}>
              <rect x={b.x} y={b.y} width={b.w} height="52" rx="6" fill={b.bg} stroke={b.st} strokeWidth="1.5" />
              <text x={b.x + b.w / 2} y={b.y + 22} textAnchor="middle" fontSize="11" fontWeight="600" fill="#0F172A">{b.t1}</text>
              <text x={b.x + b.w / 2} y={b.y + 39} textAnchor="middle" fontSize="11" fontWeight="600" fill="#0F172A">{b.t2}</text>
              {i < arr.length - 1 && (
                <line x1={b.x + b.w} y1={b.y + 26} x2={arr[i + 1].x - 2} y2={b.y + 26} stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow-slate)" />
              )}
            </g>
          ))}
          <text x="556" y="72" fontSize="10" fontWeight="600" fill="#047857">Approved</text>
          <path d="M 487 132 L 487 196 L 213 196 L 213 136" fill="none" stroke="#B45309" strokeWidth="1.8" strokeDasharray="5 3" markerEnd="url(#arrow-amber)" />
          <rect x="280" y="178" width="144" height="34" rx="6" fill="#FFFBEB" stroke="#B45309" strokeWidth="1.4" />
          <text x="352" y="199" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400E">5. Refine Prototype</text>
        </svg>
      )}
    </div>
  );
}

export function DiagramU1Agile() {
  return (
    <svg viewBox="0 0 740 275" className="w-full h-auto bg-white dark:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-700" role="img" aria-label="Agile Iterative Sprint Process Diagram">
      {ARROW_DEFS}
      <text x="20" y="26" fontSize="13" fontWeight="600" fill="#0F172A">Agile Scrum Process — Iterative Sprint Cycle</text>

      <rect x="24" y="96" width="114" height="72" rx="6" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="1.5" />
      <text x="81" y="126" textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#0F172A">Product Backlog</text>
      <text x="81" y="146" textAnchor="middle" fontSize="10" fill="#475569">Product Owner</text>

      <line x1="138" y1="132" x2="176" y2="132" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow-slate)" />

      <rect x="180" y="96" width="116" height="72" rx="6" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="1.5" />
      <text x="238" y="126" textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#0F172A">Sprint Planning</text>
      <text x="238" y="146" textAnchor="middle" fontSize="10" fill="#475569">Sprint Backlog</text>

      <line x1="296" y1="132" x2="342" y2="132" stroke="#1D4ED8" strokeWidth="1.6" markerEnd="url(#arrow-blue)" />

      {/* Main Sprint Circle */}
      <circle cx="422" cy="134" r="68" fill="#F8FAFC" stroke="#1D4ED8" strokeWidth="2.5" strokeDasharray="340 40" />
      <text x="422" y="120" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1D4ED8">Sprint Cycle</text>
      <text x="422" y="138" textAnchor="middle" fontSize="10.5" fill="#334155">1–4 Weeks</text>
      <text x="422" y="155" textAnchor="middle" fontSize="10" fill="#64748B">Design · Code · Test</text>

      {/* Daily Standup mini-loop */}
      <circle cx="422" cy="48" r="22" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.5" />
      <text x="422" y="45" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#92400E">Daily</text>
      <text x="422" y="57" textAnchor="middle" fontSize="9" fill="#92400E">24 hrs</text>

      <line x1="490" y1="132" x2="546" y2="132" stroke="#047857" strokeWidth="1.8" markerEnd="url(#arrow-emerald)" />

      <rect x="552" y="88" width="160" height="86" rx="6" fill="#ECFDF5" stroke="#047857" strokeWidth="1.6" />
      <text x="632" y="114" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#065F46">Working Increment</text>
      <text x="632" y="134" textAnchor="middle" fontSize="10.5" fill="#334155">1. Sprint Review (Demo)</text>
      <text x="632" y="152" textAnchor="middle" fontSize="10.5" fill="#334155">2. Retrospective</text>

      {/* Feedback loop */}
      <path d="M 632 174 L 632 238 L 81 238 L 81 172" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#arrow-slate)" />
      <text x="356" y="229" textAnchor="middle" fontSize="10.5" fontWeight="500" fill="#475569">Customer Feedback & Continuous Improvement → Next Sprint</text>
    </svg>
  );
}

export function DiagramU1Xp() {
  return (
    <svg viewBox="0 0 740 270" className="w-full h-auto bg-white dark:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-700" role="img" aria-label="Extreme Programming XP 4-Phase Process">
      {ARROW_DEFS}
      <text x="20" y="26" fontSize="13" fontWeight="600" fill="#0F172A">Extreme Programming (XP) — 4 Core Phases & Feedback Loops</text>

      {[
        { x: 24, title: '1. Planning', lines: ['User Stories', 'Effort Estimation', 'Small Releases'], bg: '#EFF6FF', st: '#1D4ED8' },
        { x: 200, title: '2. Design', lines: ['Simple Design (KIS)', 'CRC Cards', 'Refactoring'], bg: '#F8FAFC', st: '#334155' },
        { x: 376, title: '3. Coding', lines: ['Pair Programming', 'TDD Unit Tests', 'Continuous Integration'], bg: '#FEF3C7', st: '#B45309' },
        { x: 552, title: '4. Testing', lines: ['Automated Unit Tests', 'Acceptance Testing', 'Software Increment'], bg: '#ECFDF5', st: '#047857' },
      ].map((p, idx) => (
        <g key={p.title}>
          <rect x={p.x} y="66" width="152" height="106" rx="7" fill={p.bg} stroke={p.st} strokeWidth="1.6" />
          <text x={p.x + 76} y="90" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0F172A">{p.title}</text>
          <line x1={p.x + 14} y1="100" x2={p.x + 138} y2="100" stroke="#CBD5E1" strokeWidth="1" />
          {p.lines.map((l, li) => (
            <text key={l} x={p.x + 76} y={120 + li * 18} textAnchor="middle" fontSize="10.5" fill="#334155">{l}</text>
          ))}
          {idx < 3 && (
            <line x1={p.x + 152} y1="119" x2={p.x + 174} y2="119" stroke="#334155" strokeWidth="1.6" markerEnd="url(#arrow-slate)" />
          )}
        </g>
      ))}

      {/* Refactoring loop */}
      <path d="M 452 172 L 452 204 L 276 204 L 276 176" fill="none" stroke="#B45309" strokeWidth="1.5" markerEnd="url(#arrow-amber)" />
      <text x="364" y="198" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400E">Continuous Refactoring</text>

      {/* Customer feedback */}
      <path d="M 628 172 L 628 240 L 100 240 L 100 176" fill="none" stroke="#1D4ED8" strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#arrow-blue)" />
      <text x="364" y="232" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#1D4ED8">On-Site Customer Feedback & New User Stories</text>
    </svg>
  );
}

export function DiagramU2Srs() {
  return (
    <svg viewBox="0 0 740 285" className="w-full h-auto bg-white dark:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-700" role="img" aria-label="IEEE SRS Structure and Library System Overview">
      {ARROW_DEFS}
      <text x="20" y="26" fontSize="13" fontWeight="600" fill="#0F172A">IEEE SRS Document Hierarchy & Library System Scope</text>

      <rect x="260" y="42" width="220" height="34" rx="6" fill="#1D4ED8" />
      <text x="370" y="63" textAnchor="middle" fontSize="12" fontWeight="700" fill="#FFFFFF">Software Requirements Spec (SRS)</text>

      {[
        { x: 24, title: '1. Introduction', items: ['Purpose & Scope', 'Definitions / Acronyms', 'References'], stroke: '#1D4ED8', bg: '#EFF6FF' },
        { x: 200, title: '2. Overall Desc.', items: ['Product Perspective', 'User Roles (Admin/Lib)', 'Constraints & OS'], stroke: '#334155', bg: '#F8FAFC' },
        { x: 376, title: '3. Functional Req.', items: ['Login & Search Books', 'Issue / Return Books', 'Fine Calculation'], stroke: '#047857', bg: '#ECFDF5' },
        { x: 552, title: '4. Non-Functional', items: ['Performance (<2s)', 'Security & Auth', 'Reliability & Scale'], stroke: '#B45309', bg: '#FEF3C7' },
      ].map((col) => (
        <g key={col.title}>
          <path d={`M 370 76 L 370 96 L ${col.x + 82} 96 L ${col.x + 82} 112`} fill="none" stroke="#64748B" strokeWidth="1.4" markerEnd="url(#arrow-slate)" />
          <rect x={col.x} y="116" width="164" height="122" rx="6" fill={col.bg} stroke={col.stroke} strokeWidth="1.5" />
          <text x={col.x + 82} y="138" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#0F172A">{col.title}</text>
          <line x1={col.x + 12} y1="148" x2={col.x + 152} y2="148" stroke="#CBD5E1" strokeWidth="1" />
          {col.items.map((it, idx) => (
            <text key={it} x={col.x + 14} y={170 + idx * 22} fontSize="10.5" fill="#334155">• {it}</text>
          ))}
        </g>
      ))}
      <text x="370" y="266" textAnchor="middle" fontSize="11" fill="#475569">
        Baseline Contract shared by Customer, Developers, and QA Testing Team
      </text>
    </svg>
  );
}

export function DiagramU2Uml() {
  const [umlType, setUmlType] = useState<'usecase' | 'class' | 'sequence' | 'activity' | 'state'>('usecase');

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-fit">
        {(
          [
            ['usecase', 'Use Case'],
            ['class', 'Class'],
            ['sequence', 'Sequence'],
            ['activity', 'Activity'],
            ['state', 'State Chart'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setUmlType(id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              umlType === id ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {umlType === 'usecase' && (
        <svg viewBox="0 0 740 280" className="w-full h-auto bg-white dark:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-700" role="img" aria-label="Library Management Use Case Diagram">
          {ARROW_DEFS}
          <text x="20" y="24" fontSize="13" fontWeight="600" fill="#0F172A">UML Use Case Diagram — Library Management System</text>

          {/* System Boundary */}
          <rect x="190" y="38" width="360" height="224" rx="8" fill="#F8FAFC" stroke="#334155" strokeWidth="1.6" />
          <text x="370" y="58" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#0F172A">Library Management System</text>

          {/* Student Actor */}
          <g stroke="#1D4ED8" strokeWidth="1.8" fill="none">
            <circle cx="84" cy="108" r="12" />
            <line x1="84" y1="120" x2="84" y2="156" />
            <line x1="66" y1="132" x2="102" y2="132" />
            <line x1="84" y1="156" x2="70" y2="180" />
            <line x1="84" y1="156" x2="98" y2="180" />
          </g>
          <text x="84" y="198" textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#0F172A">Student</text>

          {/* Librarian Actor */}
          <g stroke="#047857" strokeWidth="1.8" fill="none">
            <circle cx="656" cy="108" r="12" />
            <line x1="656" y1="120" x2="656" y2="156" />
            <line x1="638" y1="132" x2="674" y2="132" />
            <line x1="656" y1="156" x2="642" y2="180" />
            <line x1="656" y1="156" x2="670" y2="180" />
          </g>
          <text x="656" y="198" textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#0F172A">Librarian</text>

          {/* Use Cases */}
          {[
            { cx: 310, cy: 96, label: 'Search Book' },
            { cx: 310, cy: 152, label: 'Borrow Book' },
            { cx: 310, cy: 210, label: 'Return Book' },
            { cx: 468, cy: 112, label: 'Add / Update Book' },
            { cx: 468, cy: 190, label: 'Verify Member' },
          ].map((u) => (
            <g key={u.label}>
              <ellipse cx={u.cx} cy={u.cy} rx="64" ry="20" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="1.4" />
              <text x={u.cx} y={u.cy + 4} textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#0F172A">{u.label}</text>
            </g>
          ))}

          {/* Associations */}
          <line x1="102" y1="132" x2="246" y2="96" stroke="#334155" strokeWidth="1.4" />
          <line x1="102" y1="138" x2="246" y2="152" stroke="#334155" strokeWidth="1.4" />
          <line x1="102" y1="146" x2="246" y2="210" stroke="#334155" strokeWidth="1.4" />
          <line x1="638" y1="132" x2="532" y2="112" stroke="#334155" strokeWidth="1.4" />
          <line x1="638" y1="142" x2="532" y2="190" stroke="#334155" strokeWidth="1.4" />

          {/* Include arrow */}
          <line x1="370" y1="162" x2="408" y2="182" stroke="#B45309" strokeWidth="1.4" strokeDasharray="4 3" markerEnd="url(#arrow-amber)" />
          <text x="396" y="160" fontSize="9.5" fontWeight="600" fill="#92400E">&lt;&lt;include&gt;&gt;</text>
        </svg>
      )}

      {umlType === 'class' && (
        <svg viewBox="0 0 740 270" className="w-full h-auto bg-white dark:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-700" role="img" aria-label="Library Management Class Diagram">
          {ARROW_DEFS}
          <text x="20" y="24" fontSize="13" fontWeight="600" fill="#0F172A">UML Class Diagram — Static Structure & Multiplicities</text>
          {[
            { x: 24, y: 54, name: 'Student', attrs: ['- studentId: int', '- name: String'], methods: ['+ searchBook()', '+ borrowBook()'] },
            { x: 266, y: 54, name: 'Loan', attrs: ['- issueDate: Date', '- dueDate: Date'], methods: ['+ calculateFine()', '+ closeLoan()'] },
            { x: 514, y: 54, name: 'Book', attrs: ['- bookId: int', '- title: String', '- available: bool'], methods: ['+ checkAvailability()', '+ updateStatus()'] },
          ].map((c) => (
            <g key={c.name}>
              <rect x={c.x} y={c.y} width="196" height="164" rx="5" fill="#FFFFFF" stroke="#1D4ED8" strokeWidth="1.6" />
              <rect x={c.x} y={c.y} width="196" height="30" rx="4" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="1.2" />
              <text x={c.x + 98} y={c.y + 20} textAnchor="middle" fontSize="12" fontWeight="700" fill="#0F172A">{c.name}</text>
              {c.attrs.map((a, i) => (
                <text key={a} x={c.x + 12} y={c.y + 52 + i * 18} fontSize="10.5" fontFamily="monospace" fill="#334155">{a}</text>
              ))}
              <line x1={c.x} y1={c.y + 106} x2={c.x + 196} y2={c.y + 106} stroke="#CBD5E1" strokeWidth="1.2" />
              {c.methods.map((m, i) => (
                <text key={m} x={c.x + 12} y={c.y + 128 + i * 18} fontSize="10.5" fontFamily="monospace" fill="#1D4ED8">{m}</text>
              ))}
            </g>
          ))}
          <line x1="220" y1="132" x2="266" y2="132" stroke="#334155" strokeWidth="1.6" />
          <text x="226" y="124" fontSize="10" fontWeight="600" fill="#0F172A">1</text>
          <text x="248" y="124" fontSize="10" fontWeight="600" fill="#0F172A">0..*</text>

          <line x1="462" y1="132" x2="514" y2="132" stroke="#334155" strokeWidth="1.6" />
          <text x="468" y="124" fontSize="10" fontWeight="600" fill="#0F172A">0..*</text>
          <text x="502" y="124" fontSize="10" fontWeight="600" fill="#0F172A">1</text>
        </svg>
      )}

      {umlType === 'sequence' && (
        <svg viewBox="0 0 740 280" className="w-full h-auto bg-white dark:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-700" role="img" aria-label="Book Issue Sequence Diagram">
          {ARROW_DEFS}
          <text x="20" y="24" fontSize="13" fontWeight="600" fill="#0F172A">UML Sequence Diagram — Book Issue Time-Ordered Messages</text>
          {[
            { x: 110, label: ':Student' },
            { x: 350, label: ':LibrarySystem' },
            { x: 590, label: ':BookDatabase' },
          ].map((l) => (
            <g key={l.label}>
              <rect x={l.x - 62} y="40" width="124" height="30" rx="5" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="1.5" />
              <text x={l.x} y="59" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#0F172A">{l.label}</text>
              <line x1={l.x} y1="70" x2={l.x} y2="260" stroke="#94A3B8" strokeWidth="1.4" strokeDasharray="5 4" />
            </g>
          ))}

          {[
            { y: 102, x1: 110, x2: 344, text: '1: requestBook(bookId)', dashed: false },
            { y: 136, x1: 350, x2: 584, text: '2: checkAvailability(bookId)', dashed: false },
            { y: 170, x1: 590, x2: 356, text: '3: return isAvailable = true', dashed: true },
            { y: 204, x1: 350, x2: 584, text: '4: saveLoanRecord(studentId, bookId)', dashed: false },
            { y: 238, x1: 350, x2: 116, text: '5: issueConfirmation(dueDate)', dashed: true },
          ].map((m) => (
            <g key={m.text}>
              <line
                x1={m.x1}
                y1={m.y}
                x2={m.x2}
                y2={m.y}
                stroke={m.dashed ? '#047857' : '#1D4ED8'}
                strokeWidth="1.5"
                strokeDasharray={m.dashed ? '5 3' : undefined}
                markerEnd={m.dashed ? 'url(#arrow-emerald)' : 'url(#arrow-blue)'}
              />
              <text x={(m.x1 + m.x2) / 2} y={m.y - 6} textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#0F172A">
                {m.text}
              </text>
            </g>
          ))}
        </svg>
      )}

      {umlType === 'activity' && (
        <svg viewBox="0 0 740 250" className="w-full h-auto bg-white dark:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-700" role="img" aria-label="Book Borrowing Activity Diagram">
          {ARROW_DEFS}
          <text x="20" y="24" fontSize="13" fontWeight="600" fill="#0F172A">UML Activity Diagram — Book Borrowing Workflow</text>
          <circle cx="44" cy="118" r="10" fill="#0F172A" />
          <line x1="54" y1="118" x2="86" y2="118" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow-slate)" />

          {[
            { x: 90, label: 'Login' },
            { x: 196, label: 'Search Book' },
          ].map((a) => (
            <g key={a.label}>
              <rect x={a.x} y="98" width="84" height="40" rx="14" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="1.5" />
              <text x={a.x + 42} y="122" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0F172A">{a.label}</text>
            </g>
          ))}
          <line x1="174" y1="118" x2="192" y2="118" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow-slate)" />
          <line x1="280" y1="118" x2="318" y2="118" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow-slate)" />

          {/* Decision diamond */}
          <polygon points="354,88 394,118 354,148 314,118" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.6" />
          <text x="354" y="122" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400E">Available?</text>

          {/* Yes branch */}
          <path d="M 394 118 L 434 118 L 434 80 L 456 80" fill="none" stroke="#047857" strokeWidth="1.6" markerEnd="url(#arrow-emerald)" />
          <text x="414" y="94" fontSize="10" fontWeight="700" fill="#047857">Yes</text>
          <rect x="460" y="60" width="110" height="38" rx="14" fill="#ECFDF5" stroke="#047857" strokeWidth="1.5" />
          <text x="515" y="83" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#065F46">Issue & Update DB</text>

          {/* No branch */}
          <path d="M 394 118 L 434 118 L 434 166 L 456 166" fill="none" stroke="#B45309" strokeWidth="1.6" markerEnd="url(#arrow-amber)" />
          <text x="414" y="156" fontSize="10" fontWeight="700" fill="#B45309">No</text>
          <rect x="460" y="146" width="110" height="38" rx="14" fill="#FFFBEB" stroke="#B45309" strokeWidth="1.5" />
          <text x="515" y="169" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#92400E">Show Unavailable</text>

          {/* End Node */}
          <path d="M 570 80 L 630 80 L 630 118 L 664 118" fill="none" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow-slate)" />
          <path d="M 570 166 L 630 166 L 630 118" fill="none" stroke="#334155" strokeWidth="1.5" />
          <circle cx="684" cy="118" r="13" fill="none" stroke="#0F172A" strokeWidth="2" />
          <circle cx="684" cy="118" r="7.5" fill="#0F172A" />
        </svg>
      )}

      {umlType === 'state' && (
        <svg viewBox="0 0 740 230" className="w-full h-auto bg-white dark:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-700" role="img" aria-label="Book Lifecycle State Chart Diagram">
          {ARROW_DEFS}
          <text x="20" y="24" fontSize="13" fontWeight="600" fill="#0F172A">UML State Chart Diagram — Book Object States & Transitions</text>
          <circle cx="38" cy="114" r="9" fill="#0F172A" />
          <line x1="47" y1="114" x2="78" y2="114" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow-slate)" />

          {[
            { x: 82, label: 'Available', bg: '#ECFDF5', st: '#047857' },
            { x: 232, label: 'Reserved', bg: '#EFF6FF', st: '#1D4ED8' },
            { x: 382, label: 'Issued', bg: '#EFF6FF', st: '#1D4ED8' },
            { x: 532, label: 'Overdue', bg: '#FEF3C7', st: '#B45309' },
          ].map((s, i) => (
            <g key={s.label}>
              <rect x={s.x} y="92" width="102" height="44" rx="12" fill={s.bg} stroke={s.st} strokeWidth="1.6" />
              <text x={s.x + 51} y="118" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#0F172A">{s.label}</text>
              {i < 3 && (
                <>
                  <line x1={s.x + 102} y1="114" x2={s.x + 146} y2="114" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow-slate)" />
                  <text x={s.x + 124} y="104" textAnchor="middle" fontSize="9.5" fill="#475569">
                    {['reserve', 'issue', 'past due'][i]}
                  </text>
                </>
              )}
            </g>
          ))}

          {/* Return transitions back to Available */}
          <path d="M 433 136 L 433 184 L 133 184 L 133 140" fill="none" stroke="#047857" strokeWidth="1.5" markerEnd="url(#arrow-emerald)" />
          <path d="M 583 136 L 583 184 L 433 184" fill="none" stroke="#047857" strokeWidth="1.5" />
          <text x="350" y="176" textAnchor="middle" fontSize="10" fontWeight="600" fill="#047857">returnBook() / payFine() → Returned to Shelf</text>
        </svg>
      )}
    </div>
  );
}

export function DiagramU2Dfd() {
  const [level, setLevel] = useState<'0' | '1' | '2'>('0');
  const [system, setSystem] = useState<'food' | 'atm'>('food');

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
          {(['0', '1', '2'] as const).map((lv) => (
            <button
              key={lv}
              type="button"
              onClick={() => setLevel(lv)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                level === lv ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Level {lv}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <button
            type="button"
            onClick={() => setSystem('food')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              system === 'food' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Food Ordering
          </button>
          <button
            type="button"
            onClick={() => setSystem('atm')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              system === 'atm' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            ATM System
          </button>
        </div>
      </div>

      {level === '0' && system === 'food' && (
        <svg viewBox="0 0 740 270" className="w-full h-auto bg-white dark:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-700" role="img" aria-label="Level 0 Context DFD Food Ordering">
          {ARROW_DEFS}
          <text x="20" y="24" fontSize="13" fontWeight="600" fill="#0F172A">DFD Level 0 (Context Diagram) — Online Food Ordering System</text>

          <circle cx="370" cy="145" r="64" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="2" />
          <text x="370" y="138" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#1D4ED8">0.0 Online</text>
          <text x="370" y="155" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#1D4ED8">Food Ordering</text>

          {/* Entities */}
          {[
            { x: 30, y: 54, label: 'Customer', arrow1: [148, 72, 314, 118, 'Order & Payment'], arrow2: [314, 134, 148, 86, 'Confirmation'] },
            { x: 586, y: 54, label: 'Restaurant', arrow1: [428, 120, 582, 74, 'Order Ticket'], arrow2: [582, 90, 430, 136, 'Menu / Prep'] },
            { x: 30, y: 192, label: 'Payment Gateway', arrow1: [314, 166, 148, 206, 'Auth Request'], arrow2: [148, 222, 316, 180, 'Receipt'] },
            { x: 586, y: 192, label: 'Delivery Partner', arrow1: [428, 168, 582, 206, 'Pickup Task'], arrow2: [582, 222, 424, 182, 'Live Status'] },
          ].map((e) => (
            <g key={e.label}>
              <rect x={e.x} y={e.y} width="124" height="42" rx="4" fill="#F8FAFC" stroke="#0F172A" strokeWidth="1.6" />
              <text x={e.x + 62} y={e.y + 25} textAnchor="middle" fontSize="11" fontWeight="600" fill="#0F172A">{e.label}</text>
              <line x1={e.arrow1[0] as number} y1={e.arrow1[1] as number} x2={e.arrow1[2] as number} y2={e.arrow1[3] as number} stroke="#1D4ED8" strokeWidth="1.4" markerEnd="url(#arrow-blue)" />
              <line x1={e.arrow2[0] as number} y1={e.arrow2[1] as number} x2={e.arrow2[2] as number} y2={e.arrow2[3] as number} stroke="#047857" strokeWidth="1.4" markerEnd="url(#arrow-emerald)" />
            </g>
          ))}
          <text x="218" y="82" fontSize="9.5" fill="#1D4ED8">Order / Pay</text>
          <text x="488" y="82" fontSize="9.5" fill="#1D4ED8">Order Ticket</text>
          <text x="214" y="216" fontSize="9.5" fill="#047857">Payment Auth</text>
          <text x="488" y="216" fontSize="9.5" fill="#047857">Delivery Status</text>
        </svg>
      )}

      {level === '0' && system === 'atm' && (
        <svg viewBox="0 0 740 240" className="w-full h-auto bg-white dark:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-700" role="img" aria-label="Level 0 Context DFD ATM System">
          {ARROW_DEFS}
          <text x="20" y="24" fontSize="13" fontWeight="600" fill="#0F172A">DFD Level 0 (Context Diagram) — ATM Banking System</text>
          <rect x="34" y="102" width="120" height="48" rx="4" fill="#F8FAFC" stroke="#0F172A" strokeWidth="1.6" />
          <text x="94" y="130" textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#0F172A">Cardholder</text>

          <circle cx="370" cy="126" r="56" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="2" />
          <text x="370" y="122" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1D4ED8">0.0 ATM</text>
          <text x="370" y="139" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#1D4ED8">System</text>

          <rect x="580" y="102" width="128" height="48" rx="4" fill="#F8FAFC" stroke="#0F172A" strokeWidth="1.6" />
          <text x="644" y="130" textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#0F172A">Bank Core Server</text>

          <line x1="154" y1="112" x2="310" y2="112" stroke="#1D4ED8" strokeWidth="1.5" markerEnd="url(#arrow-blue)" />
          <text x="232" y="104" textAnchor="middle" fontSize="10" fill="#1D4ED8">Card, PIN, Withdrawal Amt</text>
          <line x1="312" y1="140" x2="158" y2="140" stroke="#047857" strokeWidth="1.5" markerEnd="url(#arrow-emerald)" />
          <text x="232" y="156" textAnchor="middle" fontSize="10" fill="#047857">Cash & Printed Receipt</text>

          <line x1="426" y1="112" x2="576" y2="112" stroke="#1D4ED8" strokeWidth="1.5" markerEnd="url(#arrow-blue)" />
          <text x="502" y="104" textAnchor="middle" fontSize="10" fill="#1D4ED8">Verify PIN & Debit Req</text>
          <line x1="578" y1="140" x2="430" y2="140" stroke="#047857" strokeWidth="1.5" markerEnd="url(#arrow-emerald)" />
          <text x="502" y="156" textAnchor="middle" fontSize="10" fill="#047857">Auth & Updated Balance</text>
        </svg>
      )}

      {level === '1' && (
        <svg viewBox="0 0 740 270" className="w-full h-auto bg-white dark:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-700" role="img" aria-label="DFD Level 1 Main Processes">
          {ARROW_DEFS}
          <text x="20" y="24" fontSize="13" fontWeight="600" fill="#0F172A">
            {system === 'food' ? 'DFD Level 1 — Online Food Ordering Sub-Processes & Data Stores' : 'DFD Level 1 — ATM System Sub-Processes & Account Store'}
          </text>
          {(system === 'food'
            ? [
                { p: '1.0 User Mgmt', ds: 'D1 | User DB', x: 32 },
                { p: '2.0 Menu Mgmt', ds: 'D2 | Menu DB', x: 172 },
                { p: '3.0 Order Proc.', ds: 'D3 | Order DB', x: 312 },
                { p: '4.0 Payment', ds: 'D4 | Payment DB', x: 452 },
                { p: '5.0 Delivery', ds: 'D5 | Dispatch', x: 592 },
              ]
            : [
                { p: '1.0 Auth PIN', ds: 'D1 | Card DB', x: 64 },
                { p: '2.0 Select Txn', ds: 'D2 | Limits', x: 236 },
                { p: '3.0 Cash Debit', ds: 'D3 | Account DB', x: 408 },
                { p: '4.0 Print Slip', ds: 'D4 | Audit Log', x: 580 },
              ]
          ).map((item, idx, arr) => (
            <g key={item.p}>
              <rect x={item.x} y="62" width="114" height="46" rx="22" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="1.5" />
              <text x={item.x + 57} y="89" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#0F172A">{item.p}</text>
              {idx < arr.length - 1 && (
                <line x1={item.x + 114} y1="85" x2={arr[idx + 1].x - 2} y2="85" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow-slate)" />
              )}
              <line x1={item.x + 57} y1="108" x2={item.x + 57} y2="174" stroke="#047857" strokeWidth="1.4" markerEnd="url(#arrow-emerald)" />
              {/* Open-ended Data Store */}
              <path d={`M ${item.x + 114} 178 L ${item.x} 178 L ${item.x} 214 L ${item.x + 114} 214`} fill="#F8FAFC" stroke="#334155" strokeWidth="1.5" />
              <text x={item.x + 57} y="200" textAnchor="middle" fontSize="10" fontWeight="600" fill="#334155">{item.ds}</text>
            </g>
          ))}
          <text x="370" y="248" textAnchor="middle" fontSize="10.5" fill="#64748B">
            Symbols: Rounded Circle = Process · Open-Ended Box = Data Store · Arrows = Balanced Data Flows
          </text>
        </svg>
      )}

      {level === '2' && (
        <svg viewBox="0 0 740 230" className="w-full h-auto bg-white dark:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-700" role="img" aria-label="DFD Level 2 Explosion">
          {ARROW_DEFS}
          <text x="20" y="24" fontSize="13" fontWeight="600" fill="#0F172A">
            {system === 'food' ? 'DFD Level 2 — Exploding Process 3.0 (Order Processing)' : 'DFD Level 2 — Exploding Process 3.0 (Cash Withdrawal)'}
          </text>
          {(system === 'food'
            ? ['3.1 Receive Cart', '3.2 Check Stock', '3.3 Calc Bill', '3.4 Save Order', '3.5 Notify Kitchen', '3.6 Confirm User']
            : ['3.1 Check Limit', '3.2 Check Balance', '3.3 Debit Account', '3.4 Dispense Cash', '3.5 Log Audit', '3.6 Print Slip']
          ).map((step, idx) => {
            const x = 22 + idx * 118;
            return (
              <g key={step}>
                <rect x={x} y="92" width="98" height="50" rx="16" fill={idx === 2 ? '#FEF3C7' : '#EFF6FF'} stroke={idx === 2 ? '#B45309' : '#1D4ED8'} strokeWidth="1.5" />
                <text x={x + 49} y="121" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0F172A">{step}</text>
                {idx < 5 && (
                  <line x1={x + 98} y1="117" x2={x + 116} y2="117" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow-slate)" />
                )}
              </g>
            );
          })}
          <text x="370" y="188" textAnchor="middle" fontSize="10.5" fill="#475569">
            Every Level 2 input & output balances with its parent Process 3.0 in Level 1.
          </text>
        </svg>
      )}
    </div>
  );
}

export function DiagramU2FsmPetri() {
  const [petriStep, setPetriStep] = useState(0);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <span className="text-xs text-slate-600 dark:text-slate-300">
          Interactive Petri Net Token State: <strong className="text-slate-900 dark:text-slate-100">{['P1: Order Received', 'P2: Order Confirmed', 'P3: Ready for Delivery'][petriStep]}</strong>
        </span>
        <button
          type="button"
          onClick={() => setPetriStep((prev) => (prev + 1) % 3)}
          className="px-3 py-1.5 text-xs font-medium bg-blue-700 dark:bg-sky-600 text-white rounded-md hover:bg-blue-800 dark:hover:bg-sky-500 transition-colors whitespace-nowrap"
        >
          {petriStep < 2 ? 'Fire Next Transition' : 'Reset Token to P1'}
        </button>
      </div>

      <svg viewBox="0 0 740 270" className="w-full h-auto bg-white dark:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-700" role="img" aria-label="Finite State Machine and Petri Net Diagrams">
        {ARROW_DEFS}
        {/* Left: FSM */}
        <text x="20" y="24" fontSize="12.5" fontWeight="700" fill="#0F172A">1. Finite State Machine (Traffic Signal)</text>
        <rect x="16" y="36" width="320" height="218" rx="8" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.2" />

        <circle cx="88" cy="126" r="32" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2" />
        <text x="88" y="130" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#991B1B">RED</text>

        <circle cx="256" cy="96" r="32" fill="#ECFDF5" stroke="#047857" strokeWidth="2" />
        <text x="256" y="100" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#065F46">GREEN</text>

        <circle cx="218" cy="204" r="32" fill="#FEF3C7" stroke="#B45309" strokeWidth="2" />
        <text x="218" y="208" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400E">YELLOW</text>

        <line x1="120" y1="116" x2="220" y2="98" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow-slate)" />
        <text x="168" y="96" textAnchor="middle" fontSize="9.5" fill="#475569">60s timer</text>

        <line x1="252" y1="128" x2="232" y2="170" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow-slate)" />
        <text x="276" y="156" fontSize="9.5" fill="#475569">45s</text>

        <line x1="188" y1="194" x2="118" y2="148" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow-slate)" />
        <text x="132" y="186" fontSize="9.5" fill="#475569">5s</text>

        {/* Right: Petri Net */}
        <text x="364" y="24" fontSize="12.5" fontWeight="700" fill="#0F172A">2. Petri Net (Online Order Processing)</text>
        <rect x="358" y="36" width="366" height="218" rx="8" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.2" />

        {/* Places */}
        {[
          { x: 416, label: 'P1', sub: 'Order Recv', active: petriStep === 0 },
          { x: 540, label: 'P2', sub: 'Confirmed', active: petriStep === 1 },
          { x: 664, label: 'P3', sub: 'Ready', active: petriStep === 2 },
        ].map((p) => (
          <g key={p.label}>
            <circle cx={p.x} cy="136" r="24" fill={p.active ? '#EFF6FF' : '#FFFFFF'} stroke={p.active ? '#1D4ED8' : '#334155'} strokeWidth={p.active ? '2.2' : '1.5'} />
            {p.active && <circle cx={p.x} cy="136" r="7" fill="#1D4ED8" />}
            <text x={p.x} y="102" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F172A">{p.label}</text>
            <text x={p.x} y="178" textAnchor="middle" fontSize="10" fill="#475569">{p.sub}</text>
          </g>
        ))}

        {/* Transitions */}
        {[
          { x: 472, label: 'T1: Paid' },
          { x: 596, label: 'T2: Cooked' },
        ].map((t) => (
          <g key={t.label}>
            <rect x={t.x} y="114" width="12" height="44" rx="2" fill="#0F172A" />
            <text x={t.x + 6} y="204" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#334155">{t.label}</text>
          </g>
        ))}

        <line x1="440" y1="136" x2="468" y2="136" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow-slate)" />
        <line x1="484" y1="136" x2="512" y2="136" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow-slate)" />
        <line x1="564" y1="136" x2="592" y2="136" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow-slate)" />
        <line x1="608" y1="136" x2="636" y2="136" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow-slate)" />
      </svg>
    </div>
  );
}

export function DiagramU3CouplingCohesion() {
  const coupling = ['1. Content (Worst)', '2. Common', '3. External', '4. Control', '5. Stamp', '6. Data (Best)'];
  const cohesion = ['7. Functional (Best)', '6. Sequential', '5. Communicational', '4. Procedural', '3. Temporal', '2. Logical', '1. Coincidental (Worst)'];

  return (
    <svg viewBox="0 0 740 295" className="w-full h-auto bg-white dark:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-700" role="img" aria-label="Coupling and Cohesion Spectrum Diagram">
      {ARROW_DEFS}
      <text x="20" y="24" fontSize="13" fontWeight="600" fill="#0F172A">Coupling & Cohesion Quality Ladders (Goal: Low Coupling + High Cohesion)</text>

      {/* Coupling Column */}
      <text x="180" y="50" textAnchor="middle" fontSize="12" fontWeight="700" fill="#B45309">Coupling (Aim Low ↓)</text>
      {coupling.map((item, i) => (
        <g key={item}>
          <rect
            x="60"
            y={62 + i * 35}
            width="240"
            height="28"
            rx="5"
            fill={i === 5 ? '#ECFDF5' : i === 0 ? '#FEE2E2' : '#F8FAFC'}
            stroke={i === 5 ? '#047857' : i === 0 ? '#DC2626' : '#CBD5E1'}
            strokeWidth="1.4"
          />
          <text x="180" y={80 + i * 35} textAnchor="middle" fontSize="11" fontWeight={i === 0 || i === 5 ? '700' : '500'} fill="#0F172A">
            {item}
          </text>
        </g>
      ))}

      {/* Cohesion Column */}
      <text x="550" y="50" textAnchor="middle" fontSize="12" fontWeight="700" fill="#047857">Cohesion (Aim High ↑)</text>
      {cohesion.map((item, i) => (
        <g key={item}>
          <rect
            x="430"
            y={60 + i * 31}
            width="240"
            height="25"
            rx="5"
            fill={i === 0 ? '#ECFDF5' : i === 6 ? '#FEE2E2' : '#F8FAFC'}
            stroke={i === 0 ? '#047857' : i === 6 ? '#DC2626' : '#CBD5E1'}
            strokeWidth="1.4"
          />
          <text x="550" y={76 + i * 31} textAnchor="middle" fontSize="10.8" fontWeight={i === 0 || i === 6 ? '700' : '500'} fill="#0F172A">
            {item}
          </text>
        </g>
      ))}

      {/* Center Target Callout */}
      <rect x="316" y="132" width="98" height="68" rx="6" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="1.5" />
      <text x="365" y="158" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#1D4ED8">Optimal</text>
      <text x="365" y="174" textAnchor="middle" fontSize="10" fill="#334155">Data Coupling</text>
      <text x="365" y="189" textAnchor="middle" fontSize="10" fill="#334155">+ Functional</text>
    </svg>
  );
}

export function DiagramU3DesignApproaches() {
  return (
    <svg viewBox="0 0 740 265" className="w-full h-auto bg-white dark:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-700" role="img" aria-label="Top-Down vs Bottom-Up vs Hybrid Design">
      {ARROW_DEFS}
      <text x="20" y="24" fontSize="13" fontWeight="600" fill="#0F172A">Software Design Strategies: Top-Down, Bottom-Up & Hybrid</text>

      {/* Top-Down */}
      <rect x="18" y="42" width="222" height="206" rx="8" fill="#F8FAFC" stroke="#E2E8F0" />
      <text x="129" y="64" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1D4ED8">Top-Down (Decompose ↓)</text>
      <rect x="74" y="78" width="110" height="28" rx="5" fill="#1D4ED8" />
      <text x="129" y="96" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#FFFFFF">Main System</text>
      <line x1="106" y1="106" x2="74" y2="132" stroke="#1D4ED8" strokeWidth="1.4" markerEnd="url(#arrow-blue)" />
      <line x1="152" y1="106" x2="184" y2="132" stroke="#1D4ED8" strokeWidth="1.4" markerEnd="url(#arrow-blue)" />
      <rect x="34" y="136" width="80" height="26" rx="5" fill="#EFF6FF" stroke="#1D4ED8" />
      <text x="74" y="153" textAnchor="middle" fontSize="10" fill="#0F172A">Sub-Mod A</text>
      <rect x="144" y="136" width="80" height="26" rx="5" fill="#EFF6FF" stroke="#1D4ED8" />
      <text x="184" y="153" textAnchor="middle" fontSize="10" fill="#0F172A">Sub-Mod B</text>
      <line x1="74" y1="162" x2="74" y2="192" stroke="#1D4ED8" strokeWidth="1.4" markerEnd="url(#arrow-blue)" />
      <line x1="184" y1="162" x2="184" y2="192" stroke="#1D4ED8" strokeWidth="1.4" markerEnd="url(#arrow-blue)" />
      <rect x="34" y="196" width="80" height="26" rx="5" fill="#FFFFFF" stroke="#94A3B8" />
      <text x="74" y="213" textAnchor="middle" fontSize="9.5" fill="#334155">Leaf Func</text>
      <rect x="144" y="196" width="80" height="26" rx="5" fill="#FFFFFF" stroke="#94A3B8" />
      <text x="184" y="213" textAnchor="middle" fontSize="9.5" fill="#334155">Leaf Func</text>

      {/* Bottom-Up */}
      <rect x="259" y="42" width="222" height="206" rx="8" fill="#F8FAFC" stroke="#E2E8F0" />
      <text x="370" y="64" textAnchor="middle" fontSize="12" fontWeight="700" fill="#047857">Bottom-Up (Integrate ↑)</text>
      <rect x="315" y="78" width="110" height="28" rx="5" fill="#ECFDF5" stroke="#047857" strokeWidth="1.5" />
      <text x="370" y="96" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#065F46">Final System</text>
      <line x1="315" y1="136" x2="348" y2="110" stroke="#047857" strokeWidth="1.4" markerEnd="url(#arrow-emerald)" />
      <line x1="425" y1="136" x2="392" y2="110" stroke="#047857" strokeWidth="1.4" markerEnd="url(#arrow-emerald)" />
      <rect x="275" y="136" width="80" height="26" rx="5" fill="#ECFDF5" stroke="#047857" />
      <text x="315" y="153" textAnchor="middle" fontSize="10" fill="#0F172A">Subsystem 1</text>
      <rect x="385" y="136" width="80" height="26" rx="5" fill="#ECFDF5" stroke="#047857" />
      <text x="425" y="153" textAnchor="middle" fontSize="10" fill="#0F172A">Subsystem 2</text>
      <line x1="315" y1="196" x2="315" y2="166" stroke="#047857" strokeWidth="1.4" markerEnd="url(#arrow-emerald)" />
      <line x1="425" y1="196" x2="425" y2="166" stroke="#047857" strokeWidth="1.4" markerEnd="url(#arrow-emerald)" />
      <rect x="275" y="196" width="80" height="26" rx="5" fill="#047857" />
      <text x="315" y="213" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#FFFFFF">Reusable Util</text>
      <rect x="385" y="196" width="80" height="26" rx="5" fill="#047857" />
      <text x="425" y="213" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#FFFFFF">Reusable Lib</text>

      {/* Hybrid */}
      <rect x="500" y="42" width="222" height="206" rx="8" fill="#F8FAFC" stroke="#E2E8F0" />
      <text x="611" y="64" textAnchor="middle" fontSize="12" fontWeight="700" fill="#B45309">Hybrid (Meet-in-Middle)</text>
      <rect x="546" y="78" width="130" height="28" rx="5" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="1.4" />
      <text x="611" y="96" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1D4ED8">Top-Down Architecture</text>
      <line x1="611" y1="106" x2="611" y2="132" stroke="#1D4ED8" strokeWidth="1.5" markerEnd="url(#arrow-blue)" />
      <rect x="536" y="136" width="150" height="30" rx="5" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.6" />
      <text x="611" y="155" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#92400E">Integrated Modules</text>
      <line x1="611" y1="196" x2="611" y2="170" stroke="#047857" strokeWidth="1.5" markerEnd="url(#arrow-emerald)" />
      <rect x="546" y="196" width="130" height="28" rx="5" fill="#ECFDF5" stroke="#047857" strokeWidth="1.4" />
      <text x="611" y="214" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065F46">Bottom-Up Core Libs</text>
    </svg>
  );
}

export function DiagramU3FodOod() {
  return (
    <svg viewBox="0 0 740 255" className="w-full h-auto bg-white dark:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-700" role="img" aria-label="Functional Oriented vs Object Oriented Design">
      {ARROW_DEFS}
      <text x="20" y="24" fontSize="13" fontWeight="600" fill="#0F172A">Functional-Oriented Design (FOD) vs Object-Oriented Design (OOD)</text>

      {/* Left: FOD */}
      <rect x="18" y="42" width="336" height="198" rx="8" fill="#F8FAFC" stroke="#CBD5E1" />
      <text x="186" y="64" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">FOD — Functions + Shared Global Data</text>
      <rect x="108" y="78" width="156" height="28" rx="5" fill="#FFFFFF" stroke="#334155" strokeWidth="1.4" />
      <text x="186" y="96" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#0F172A">Student System Main()</text>

      {['Add()', 'Update()', 'Report()'].map((fn, i) => (
        <g key={fn}>
          <rect x={38 + i * 106} y="128" width="84" height="28" rx="5" fill="#EFF6FF" stroke="#1D4ED8" />
          <text x={80 + i * 106} y="146" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0F172A">{fn}</text>
          <line x1="186" y1="106" x2={80 + i * 106} y2="126" stroke="#475569" strokeWidth="1.2" markerEnd="url(#arrow-slate)" />
          <line x1={80 + i * 106} y1="156" x2={80 + i * 106} y2="188" stroke="#B45309" strokeWidth="1.2" markerEnd="url(#arrow-amber)" />
        </g>
      ))}
      <rect x="66" y="192" width="240" height="32" rx="4" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.4" />
      <text x="186" y="212" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#92400E">Shared Student Data Store</text>

      {/* Right: OOD */}
      <rect x="382" y="42" width="340" height="198" rx="8" fill="#F8FAFC" stroke="#CBD5E1" />
      <text x="552" y="64" textAnchor="middle" fontSize="12" fontWeight="700" fill="#047857">OOD — Encapsulated Autonomous Objects</text>

      {[
        { x: 404, y: 88, title: 'Student Object', data: 'id, name', method: 'displayDetails()' },
        { x: 564, y: 88, title: 'Course Object', data: 'code, credits', method: 'enrollStudent()' },
      ].map((o) => (
        <g key={o.title}>
          <rect x={o.x} y={o.y} width="136" height="92" rx="10" fill="#ECFDF5" stroke="#047857" strokeWidth="1.6" />
          <text x={o.x + 68} y={o.y + 22} textAnchor="middle" fontSize="11" fontWeight="700" fill="#065F46">{o.title}</text>
          <rect x={o.x + 14} y={o.y + 32} width="108" height="22" rx="4" fill="#FFFFFF" stroke="#10B981" />
          <text x={o.x + 68} y={o.y + 47} textAnchor="middle" fontSize="9.5" fontFamily="monospace" fill="#0F172A">Data: {o.data}</text>
          <text x={o.x + 68} y={o.y + 74} textAnchor="middle" fontSize="9.5" fontFamily="monospace" fill="#1D4ED8">{o.method}</text>
        </g>
      ))}

      <line x1="540" y1="134" x2="560" y2="134" stroke="#1D4ED8" strokeWidth="1.8" markerEnd="url(#arrow-blue)" />
      <text x="552" y="212" textAnchor="middle" fontSize="10.5" fill="#065F46">
        Private data protected inside each object · Message Passing
      </text>
    </svg>
  );
}
