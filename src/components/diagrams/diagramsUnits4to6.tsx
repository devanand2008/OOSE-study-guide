import { useState } from 'react';

const ARROW_DEFS_4_6 = (
  <defs>
    <marker id="arr-s" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8.5 5 L 0 8.5 z" fill="#334155" />
    </marker>
    <marker id="arr-b" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8.5 5 L 0 8.5 z" fill="#1D4ED8" />
    </marker>
    <marker id="arr-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8.5 5 L 0 8.5 z" fill="#B45309" />
    </marker>
    <marker id="arr-e" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8.5 5 L 0 8.5 z" fill="#047857" />
    </marker>
    <marker id="arr-r" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8.5 5 L 0 8.5 z" fill="#DC2626" />
    </marker>
  </defs>
);

export function DiagramU4Mvc() {
  return (
    <svg viewBox="0 0 740 280" className="w-full h-auto bg-white dark:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-700" role="img" aria-label="MVC Architecture Pattern Diagram">
      {ARROW_DEFS_4_6}
      <text x="20" y="24" fontSize="13" fontWeight="600" fill="#0F172A">MVC Architecture — Online Shopping "Add to Cart" Cycle</text>

      {/* User */}
      <rect x="26" y="114" width="96" height="52" rx="6" fill="#F8FAFC" stroke="#0F172A" strokeWidth="1.6" />
      <text x="74" y="137" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#0F172A">User</text>
      <text x="74" y="154" textAnchor="middle" fontSize="10" fill="#475569">Browser / App</text>

      {/* Controller */}
      <rect x="240" y="48" width="184" height="62" rx="7" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="1.8" />
      <text x="332" y="74" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1D4ED8">Controller</text>
      <text x="332" y="94" textAnchor="middle" fontSize="10" fill="#334155">CartController · Input Routing</text>

      {/* Model */}
      <rect x="518" y="116" width="194" height="72" rx="7" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.8" />
      <text x="615" y="142" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400E">Model</text>
      <text x="615" y="160" textAnchor="middle" fontSize="10" fill="#334155">Cart & Product Business Logic</text>
      <text x="615" y="176" textAnchor="middle" fontSize="10" fill="#64748B">Database Read / Write</text>

      {/* View */}
      <rect x="240" y="188" width="184" height="62" rx="7" fill="#ECFDF5" stroke="#047857" strokeWidth="1.8" />
      <text x="332" y="214" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065F46">View</text>
      <text x="332" y="234" textAnchor="middle" fontSize="10" fill="#334155">ShoppingCart UI · Renders HTML</text>

      {/* Arrows */}
      <path d="M 122 126 L 236 82" fill="none" stroke="#1D4ED8" strokeWidth="1.6" markerEnd="url(#arr-b)" />
      <text x="164" y="90" fontSize="9.8" fontWeight="600" fill="#1D4ED8">1. Click Add</text>

      <path d="M 424 78 L 514 128" fill="none" stroke="#B45309" strokeWidth="1.6" markerEnd="url(#arr-a)" />
      <text x="492" y="88" fontSize="9.8" fontWeight="600" fill="#92400E">2. Update Cart</text>

      <path d="M 516 172 L 428 214" fill="none" stroke="#047857" strokeWidth="1.6" markerEnd="url(#arr-e)" />
      <text x="498" y="210" fontSize="9.8" fontWeight="600" fill="#065F46">3. Updated Data</text>

      <path d="M 332 110 L 332 184" fill="none" stroke="#334155" strokeWidth="1.4" strokeDasharray="4 3" markerEnd="url(#arr-s)" />
      <text x="340" y="152" fontSize="9.5" fill="#475569">Selects View</text>

      <path d="M 240 218 L 126 158" fill="none" stroke="#047857" strokeWidth="1.6" markerEnd="url(#arr-e)" />
      <text x="150" y="206" fontSize="9.8" fontWeight="600" fill="#065F46">4. Display UI</text>
    </svg>
  );
}

export function DiagramU4Patterns() {
  const [pat, setPat] = useState<'observer' | 'adapter' | 'strategy' | 'facade'>('observer');

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-fit">
        {(
          [
            ['observer', 'Observer'],
            ['adapter', 'Adapter'],
            ['strategy', 'Strategy'],
            ['facade', 'Facade'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setPat(id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              pat === id ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {pat === 'observer' && (
        <svg viewBox="0 0 740 235" className="w-full h-auto bg-white dark:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-700" role="img" aria-label="Observer Pattern Diagram">
          {ARROW_DEFS_4_6}
          <text x="20" y="24" fontSize="13" fontWeight="600" fill="#0F172A">Observer Pattern — One-to-Many Event Notification (YouTube Channel)</text>
          <rect x="40" y="78" width="180" height="84" rx="7" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="1.8" />
          <text x="130" y="106" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1D4ED8">Subject (Channel)</text>
          <text x="130" y="128" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="#334155">+ subscribe(obs)</text>
          <text x="130" y="146" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="#334155">+ notifyAll()</text>

          {[
            { y: 52, label: 'Observer 1: Mobile App' },
            { y: 112, label: 'Observer 2: Email Alert' },
            { y: 172, label: 'Observer 3: Web Feed' },
          ].map((o) => (
            <g key={o.label}>
              <rect x="440" y={o.y} width="230" height="38" rx="6" fill="#ECFDF5" stroke="#047857" strokeWidth="1.5" />
              <text x="555" y={o.y + 23} textAnchor="middle" fontSize="11" fontWeight="600" fill="#065F46">{o.label} → update()</text>
              <line x1="220" y1="120" x2="436" y2={o.y + 19} stroke="#1D4ED8" strokeWidth="1.5" markerEnd="url(#arr-b)" />
            </g>
          ))}
          <text x="328" y="88" fontSize="10" fontWeight="600" fill="#1D4ED8">Automatic notify()</text>
        </svg>
      )}

      {pat === 'adapter' && (
        <svg viewBox="0 0 740 215" className="w-full h-auto bg-white dark:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-700" role="img" aria-label="Adapter Pattern Diagram">
          {ARROW_DEFS_4_6}
          <text x="20" y="24" fontSize="13" fontWeight="600" fill="#0F172A">Adapter Pattern — Bridging Incompatible Payment Interfaces</text>
          {[
            { x: 34, title: 'Client App', sub: 'Expects payJSON()', bg: '#F8FAFC', st: '#0F172A' },
            { x: 266, title: 'PaymentAdapter', sub: 'Translates JSON → XML', bg: '#FEF3C7', st: '#B45309' },
            { x: 516, title: 'Legacy Gateway', sub: 'Accepts processXML()', bg: '#EFF6FF', st: '#1D4ED8' },
          ].map((b, i) => (
            <g key={b.title}>
              <rect x={b.x} y="82" width="184" height="72" rx="7" fill={b.bg} stroke={b.st} strokeWidth="1.7" />
              <text x={b.x + 92} y="112" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0F172A">{b.title}</text>
              <text x={b.x + 92} y="134" textAnchor="middle" fontSize="10.5" fontFamily="monospace" fill="#334155">{b.sub}</text>
              {i < 2 && (
                <line x1={b.x + 184} y1="118" x2={b.x + 228} y2="118" stroke="#334155" strokeWidth="1.7" markerEnd="url(#arr-s)" />
              )}
            </g>
          ))}
        </svg>
      )}

      {pat === 'strategy' && (
        <svg viewBox="0 0 740 235" className="w-full h-auto bg-white dark:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-700" role="img" aria-label="Strategy Pattern Diagram">
          {ARROW_DEFS_4_6}
          <text x="20" y="24" fontSize="13" fontWeight="600" fill="#0F172A">Strategy Pattern — Swappable Runtime Checkout Algorithms</text>
          <rect x="36" y="88" width="150" height="66" rx="7" fill="#F8FAFC" stroke="#0F172A" strokeWidth="1.6" />
          <text x="111" y="116" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#0F172A">CheckoutContext</text>
          <text x="111" y="136" textAnchor="middle" fontSize="10" fill="#475569">setStrategy(s)</text>

          <line x1="186" y1="121" x2="254" y2="121" stroke="#1D4ED8" strokeWidth="1.6" markerEnd="url(#arr-b)" />

          <rect x="260" y="88" width="166" height="66" rx="7" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="1.6" />
          <text x="343" y="114" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#1D4ED8">&lt;&lt;interface&gt;&gt;</text>
          <text x="343" y="134" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0F172A">PaymentStrategy</text>

          {[
            { y: 50, name: 'UPIPaymentStrategy' },
            { y: 108, name: 'CardPaymentStrategy' },
            { y: 166, name: 'NetBankingStrategy' },
          ].map((st) => (
            <g key={st.name}>
              <rect x="504" y={st.y} width="194" height="36" rx="6" fill="#ECFDF5" stroke="#047857" strokeWidth="1.5" />
              <text x="601" y={st.y + 22} textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#065F46">{st.name}</text>
              <line x1="504" y1={st.y + 18} x2="430" y2="121" stroke="#047857" strokeWidth="1.4" strokeDasharray="4 3" markerEnd="url(#arr-e)" />
            </g>
          ))}
        </svg>
      )}

      {pat === 'facade' && (
        <svg viewBox="0 0 740 235" className="w-full h-auto bg-white dark:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-700" role="img" aria-label="Facade Pattern Diagram">
          {ARROW_DEFS_4_6}
          <text x="20" y="24" fontSize="13" fontWeight="600" fill="#0F172A">Facade Pattern — Unified Entry Point Over Complex Subsystems</text>
          <rect x="34" y="92" width="132" height="58" rx="7" fill="#F8FAFC" stroke="#0F172A" strokeWidth="1.6" />
          <text x="100" y="125" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#0F172A">Client UI</text>

          <line x1="166" y1="121" x2="234" y2="121" stroke="#1D4ED8" strokeWidth="1.8" markerEnd="url(#arr-b)" />

          <rect x="240" y="78" width="174" height="86" rx="7" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="2" />
          <text x="327" y="114" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1D4ED8">BookingFacade</text>
          <text x="327" y="136" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="#334155">bookTicket()</text>

          <rect x="478" y="42" width="232" height="172" rx="8" fill="#F8FAFC" stroke="#CBD5E1" strokeDasharray="4 3" />
          <text x="594" y="62" textAnchor="middle" fontSize="10" fontWeight="600" fill="#64748B">Hidden Complex Subsystem</text>
          {[
            { y: 74, name: 'SeatLockService' },
            { y: 118, name: 'PaymentProcessor' },
            { y: 162, name: 'Ticket & SMS Generator' },
          ].map((sub) => (
            <g key={sub.name}>
              <rect x="502" y={sub.y} width="184" height="32" rx="5" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.4" />
              <text x="594" y={sub.y + 20} textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#92400E">{sub.name}</text>
              <line x1="414" y1="121" x2="498" y2={sub.y + 16} stroke="#334155" strokeWidth="1.4" markerEnd="url(#arr-s)" />
            </g>
          ))}
        </svg>
      )}
    </div>
  );
}

export function DiagramU4Architecture() {
  const [style, setStyle] = useState<'layered' | 'client-server' | 'tiered' | 'pipe'>('layered');

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-fit">
        {(
          [
            ['layered', 'Layered'],
            ['client-server', 'Client-Server'],
            ['tiered', '3-Tier'],
            ['pipe', 'Pipe & Filter'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setStyle(id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              style === id ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {style === 'layered' && (
        <svg viewBox="0 0 740 245" className="w-full h-auto bg-white dark:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-700" role="img" aria-label="Layered Architecture Diagram">
          {ARROW_DEFS_4_6}
          <text x="20" y="24" fontSize="13" fontWeight="600" fill="#0F172A">Layered Architecture — Strict Separation of Responsibilities</text>
          {[
            { y: 42, title: '1. Presentation Layer (UI / Views)', bg: '#EFF6FF', st: '#1D4ED8' },
            { y: 92, title: '2. Business Logic Layer (Domain Rules & Validation)', bg: '#ECFDF5', st: '#047857' },
            { y: 142, title: '3. Data Access Layer (Repositories / ORM)', bg: '#FEF3C7', st: '#B45309' },
            { y: 192, title: '4. Database Layer (PostgreSQL / MySQL Storage)', bg: '#F1F5F9', st: '#334155' },
          ].map((l, idx) => (
            <g key={l.title}>
              <rect x="130" y={l.y} width="480" height="36" rx="6" fill={l.bg} stroke={l.st} strokeWidth="1.6" />
              <text x="370" y={l.y + 22} textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#0F172A">{l.title}</text>
              {idx < 3 && (
                <line x1="370" y1={l.y + 36} x2="370" y2={l.y + 50} stroke="#334155" strokeWidth="1.5" markerEnd="url(#arr-s)" />
              )}
            </g>
          ))}
        </svg>
      )}

      {style === 'client-server' && (
        <svg viewBox="0 0 740 230" className="w-full h-auto bg-white dark:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-700" role="img" aria-label="Client Server Architecture Diagram">
          {ARROW_DEFS_4_6}
          <text x="20" y="24" fontSize="13" fontWeight="600" fill="#0F172A">Client-Server Architecture — Centralized Request / Response</text>
          {['Web Client', 'Mobile Client', 'Desktop Client'].map((c, i) => (
            <g key={c}>
              <rect x="44" y={50 + i * 56} width="136" height="38" rx="6" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="1.5" />
              <text x="112" y={73 + i * 56} textAnchor="middle" fontSize="11" fontWeight="600" fill="#0F172A">{c}</text>
              <line x1="180" y1={69 + i * 56} x2="334" y2="122" stroke="#1D4ED8" strokeWidth="1.5" markerEnd="url(#arr-b)" />
            </g>
          ))}
          <ellipse cx="378" cy="122" rx="44" ry="26" fill="#F8FAFC" stroke="#64748B" strokeDasharray="4 3" />
          <text x="378" y="126" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#475569">HTTP / Net</text>
          <line x1="422" y1="122" x2="496" y2="122" stroke="#047857" strokeWidth="1.7" markerEnd="url(#arr-e)" />
          <rect x="502" y="74" width="194" height="96" rx="8" fill="#ECFDF5" stroke="#047857" strokeWidth="1.8" />
          <text x="599" y="114" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065F46">Central Server</text>
          <text x="599" y="136" textAnchor="middle" fontSize="10.5" fill="#334155">Auth · Business Logic · DB</text>
        </svg>
      )}

      {style === 'tiered' && (
        <svg viewBox="0 0 740 220" className="w-full h-auto bg-white dark:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-700" role="img" aria-label="Three Tier Architecture Diagram">
          {ARROW_DEFS_4_6}
          <text x="20" y="24" fontSize="13" fontWeight="600" fill="#0F172A">3-Tier Architecture — Physically Distributed Nodes</text>
          {[
            { x: 36, t: 'Tier 1: Presentation', sub: 'User Devices / Browsers', bg: '#EFF6FF', st: '#1D4ED8' },
            { x: 276, t: 'Tier 2: Application', sub: 'Load-Balanced App Servers', bg: '#ECFDF5', st: '#047857' },
            { x: 516, t: 'Tier 3: Data Tier', sub: 'Dedicated DB Cluster', bg: '#FEF3C7', st: '#B45309' },
          ].map((tier, idx) => (
            <g key={tier.t}>
              <rect x={tier.x} y="74" width="186" height="86" rx="8" fill={tier.bg} stroke={tier.st} strokeWidth="1.8" />
              <text x={tier.x + 93} y="110" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#0F172A">{tier.t}</text>
              <text x={tier.x + 93} y="132" textAnchor="middle" fontSize="10" fill="#475569">{tier.sub}</text>
              {idx < 2 && (
                <line x1={tier.x + 186} y1="117" x2={tier.x + 236} y2="117" stroke="#334155" strokeWidth="1.7" markerEnd="url(#arr-s)" />
              )}
            </g>
          ))}
        </svg>
      )}

      {style === 'pipe' && (
        <svg viewBox="0 0 740 210" className="w-full h-auto bg-white dark:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-700" role="img" aria-label="Pipe and Filter Compiler Diagram">
          {ARROW_DEFS_4_6}
          <text x="20" y="24" fontSize="13" fontWeight="600" fill="#0F172A">Pipe-and-Filter Architecture — Compiler Processing Chain</text>
          {['Source Code', 'Lexical Filter', 'Syntax Parser', 'Semantic Check', 'Code Gen', 'Machine Code'].map((node, i) => {
            const x = 16 + i * 120;
            const isEdge = i === 0 || i === 5;
            return (
              <g key={node}>
                <rect
                  x={x}
                  y="86"
                  width="96"
                  height="48"
                  rx={isEdge ? '18' : '5'}
                  fill={isEdge ? '#ECFDF5' : '#EFF6FF'}
                  stroke={isEdge ? '#047857' : '#1D4ED8'}
                  strokeWidth="1.5"
                />
                <text x={x + 48} y="114" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0F172A">{node}</text>
                {i < 5 && (
                  <line x1={x + 96} y1="110" x2={x + 116} y2="110" stroke="#B45309" strokeWidth="2.2" markerEnd="url(#arr-a)" />
                )}
              </g>
            );
          })}
          <text x="370" y="170" textAnchor="middle" fontSize="10.5" fill="#92400E">Pipes carry token / AST streams between independent stateless Filters</text>
        </svg>
      )}
    </div>
  );
}

export function DiagramU4UiProcess() {
  const steps = [
    '1. User Research',
    '2. Req Analysis',
    '3. Info Architecture',
    '4. Wireframing',
    '5. Prototyping',
    '6. Visual Design',
    '7. Usability Test',
    '8. Implementation',
    '9. Evaluation',
  ];
  return (
    <svg viewBox="0 0 740 250" className="w-full h-auto bg-white dark:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-700" role="img" aria-label="9-Step UI Design Process">
      {ARROW_DEFS_4_6}
      <text x="20" y="24" fontSize="13" fontWeight="600" fill="#0F172A">User Interface (UI) Design — 9-Step Iterative Process</text>
      {steps.map((s, idx) => {
        const row = Math.floor(idx / 3);
        const col = idx % 3;
        const x = 44 + col * 234;
        const y = 48 + row * 64;
        return (
          <g key={s}>
            <rect
              x={x}
              y={y}
              width="184"
              height="38"
              rx="6"
              fill={idx === 6 ? '#FEF3C7' : idx >= 7 ? '#ECFDF5' : '#EFF6FF'}
              stroke={idx === 6 ? '#B45309' : idx >= 7 ? '#047857' : '#1D4ED8'}
              strokeWidth="1.5"
            />
            <text x={x + 92} y={y + 23} textAnchor="middle" fontSize="11" fontWeight="600" fill="#0F172A">{s}</text>
            {col < 2 && (
              <line x1={x + 184} y1={y + 19} x2={x + 230} y2={y + 19} stroke="#334155" strokeWidth="1.5" markerEnd="url(#arr-s)" />
            )}
          </g>
        );
      })}
      <path d="M 604 86 L 604 98 L 136 98 L 136 108" fill="none" stroke="#64748B" strokeWidth="1.3" markerEnd="url(#arr-s)" />
      <path d="M 604 150 L 604 162 L 136 162 L 136 172" fill="none" stroke="#64748B" strokeWidth="1.3" markerEnd="url(#arr-s)" />
      <text x="370" y="236" textAnchor="middle" fontSize="10.5" fill="#92400E">Usability Testing feeds improvements back into Wireframing & Prototyping</text>
    </svg>
  );
}

export function DiagramU5TestingLevels() {
  return (
    <svg viewBox="0 0 740 275" className="w-full h-auto bg-white dark:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-700" role="img" aria-label="Software Testing Pyramid and Black vs White Box">
      {ARROW_DEFS_4_6}
      <text x="20" y="24" fontSize="13" fontWeight="600" fill="#0F172A">Software Testing Pyramid & Black-Box vs White-Box Comparison</text>

      {/* Pyramid on Left */}
      <polygon points="196,46 270,96 122,96" fill="#ECFDF5" stroke="#047857" strokeWidth="1.6" />
      <text x="196" y="84" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#065F46">System</text>

      <polygon points="122,100 270,100 308,150 84,150" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.6" />
      <text x="196" y="130" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400E">Integration Testing</text>

      <polygon points="84,154 308,154 346,204 46,204" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="1.6" />
      <text x="196" y="184" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#1D4ED8">Unit Testing (Foundation)</text>

      <rect x="46" y="216" width="300" height="32" rx="6" fill="#F1F5F9" stroke="#334155" strokeWidth="1.4" />
      <text x="196" y="236" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#0F172A">Regression Testing (After Every Change)</text>

      {/* Black vs White Box on Right */}
      <rect x="386" y="48" width="330" height="92" rx="8" fill="#F8FAFC" stroke="#CBD5E1" />
      <text x="404" y="70" fontSize="11.5" fontWeight="700" fill="#0F172A">Black Box (Opaque Spec Check)</text>
      <text x="404" y="108" fontSize="10.5" fill="#334155">Inputs</text>
      <line x1="444" y1="104" x2="486" y2="104" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arr-s)" />
      <rect x="492" y="84" width="108" height="40" rx="5" fill="#0F172A" />
      <text x="546" y="108" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#FFFFFF">Opaque Code</text>
      <line x1="600" y1="104" x2="640" y2="104" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arr-s)" />
      <text x="650" y="108" fontSize="10.5" fill="#334155">Outputs</text>

      <rect x="386" y="156" width="330" height="92" rx="8" fill="#F8FAFC" stroke="#CBD5E1" />
      <text x="404" y="178" fontSize="11.5" fontWeight="700" fill="#1D4ED8">White Box (Transparent Logic Coverage)</text>
      <text x="404" y="216" fontSize="10.5" fill="#334155">Inputs</text>
      <line x1="444" y1="212" x2="486" y2="212" stroke="#1D4ED8" strokeWidth="1.5" markerEnd="url(#arr-b)" />
      <rect x="492" y="190" width="108" height="44" rx="5" fill="#FFFFFF" stroke="#1D4ED8" strokeWidth="1.6" />
      <text x="546" y="209" textAnchor="middle" fontSize="9.5" fontFamily="monospace" fill="#1D4ED8">if (m &gt;= 50)</text>
      <text x="546" y="224" textAnchor="middle" fontSize="9.5" fontFamily="monospace" fill="#047857">Branch 1 / 2</text>
      <line x1="600" y1="212" x2="640" y2="212" stroke="#1D4ED8" strokeWidth="1.5" markerEnd="url(#arr-b)" />
      <text x="650" y="216" fontSize="10.5" fill="#334155">Outputs</text>
    </svg>
  );
}

export function DiagramU5RailwayTest() {
  return (
    <svg viewBox="0 0 740 245" className="w-full h-auto bg-white dark:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-700" role="img" aria-label="Boundary Value Analysis and Railway Ticket States">
      {ARROW_DEFS_4_6}
      <text x="20" y="24" fontSize="13" fontWeight="600" fill="#0F172A">Boundary Value Analysis (Age 18–60) & Railway Ticket State Transitions</text>

      {/* BVA Axis */}
      <text x="30" y="54" fontSize="11.5" fontWeight="700" fill="#334155">1. Boundary Value Analysis & Equivalence Partitions</text>
      <rect x="40" y="66" width="150" height="32" rx="4" fill="#FEE2E2" stroke="#DC2626" />
      <text x="115" y="86" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#991B1B">Invalid (&lt; 18)</text>

      <rect x="190" y="66" width="360" height="32" rx="4" fill="#ECFDF5" stroke="#047857" strokeWidth="1.6" />
      <text x="370" y="86" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#065F46">Valid Partition (18 to 60)</text>

      <rect x="550" y="66" width="150" height="32" rx="4" fill="#FEE2E2" stroke="#DC2626" />
      <text x="625" y="86" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#991B1B">Invalid (&gt; 60)</text>

      {[
        { x: 164, v: '17' },
        { x: 190, v: '18' },
        { x: 218, v: '19' },
        { x: 522, v: '59' },
        { x: 550, v: '60' },
        { x: 578, v: '61' },
      ].map((pt) => (
        <g key={pt.v}>
          <circle cx={pt.x} cy="98" r="4" fill="#1D4ED8" />
          <text x={pt.x} y="116" textAnchor="middle" fontSize="10" fontFamily="monospace" fontWeight="700" fill="#1D4ED8">{pt.v}</text>
        </g>
      ))}

      {/* State Transition */}
      <text x="30" y="152" fontSize="11.5" fontWeight="700" fill="#334155">2. Railway Reservation Ticket State Transition Testing</text>
      {[
        { x: 34, label: 'Available', bg: '#F8FAFC', st: '#334155' },
        { x: 184, label: 'Reserved', bg: '#EFF6FF', st: '#1D4ED8' },
        { x: 334, label: 'Confirmed (PNR)', bg: '#ECFDF5', st: '#047857' },
        { x: 498, label: 'Cancelled', bg: '#FEF3C7', st: '#B45309' },
        { x: 626, label: 'Refunded', bg: '#F1F5F9', st: '#475569' },
      ].map((s, idx, arr) => (
        <g key={s.label}>
          <rect x={s.x} y="170" width={idx === 2 ? 122 : 106} height="40" rx="8" fill={s.bg} stroke={s.st} strokeWidth="1.5" />
          <text x={s.x + (idx === 2 ? 61 : 53)} y="194" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#0F172A">{s.label}</text>
          {idx < arr.length - 1 && (
            <line
              x1={s.x + (idx === 2 ? 122 : 106)}
              y1="190"
              x2={arr[idx + 1].x - 2}
              y2="190"
              stroke="#334155"
              strokeWidth="1.5"
              markerEnd="url(#arr-s)"
            />
          )}
        </g>
      ))}
    </svg>
  );
}

export function DiagramU5DebuggingFormal() {
  return (
    <svg viewBox="0 0 740 270" className="w-full h-auto bg-white dark:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-700" role="img" aria-label="Debugging Process, Symbolic Execution Tree, and Model Checking">
      {ARROW_DEFS_4_6}
      <text x="20" y="24" fontSize="13" fontWeight="600" fill="#0F172A">Symbolic Execution Path Tree & Formal Model Checking Flow</text>

      {/* Left: Symbolic Execution */}
      <rect x="18" y="42" width="332" height="210" rx="8" fill="#F8FAFC" stroke="#CBD5E1" />
      <text x="184" y="64" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1D4ED8">Symbolic Execution (x = α)</text>
      <rect x="122" y="78" width="124" height="32" rx="6" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="1.5" />
      <text x="184" y="98" textAnchor="middle" fontSize="11" fontFamily="monospace" fontWeight="600" fill="#0F172A">if (α &gt; 10)</text>

      <line x1="156" y1="110" x2="96" y2="152" stroke="#047857" strokeWidth="1.5" markerEnd="url(#arr-e)" />
      <text x="98" y="132" fontSize="9.5" fontWeight="700" fill="#047857">PC1: α &gt; 10</text>
      <rect x="34" y="156" width="128" height="46" rx="6" fill="#ECFDF5" stroke="#047857" />
      <text x="98" y="176" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#065F46">print(&quot;Large&quot;)</text>
      <text x="98" y="194" textAnchor="middle" fontSize="9.5" fontFamily="monospace" fill="#334155">Solved: x = 11</text>

      <line x1="212" y1="110" x2="270" y2="152" stroke="#B45309" strokeWidth="1.5" markerEnd="url(#arr-a)" />
      <text x="272" y="132" fontSize="9.5" fontWeight="700" fill="#B45309">PC2: α &lt;= 10</text>
      <rect x="206" y="156" width="128" height="46" rx="6" fill="#FEF3C7" stroke="#B45309" />
      <text x="270" y="176" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#92400E">print(&quot;Small&quot;)</text>
      <text x="270" y="194" textAnchor="middle" fontSize="9.5" fontFamily="monospace" fill="#334155">Solved: x = 5</text>

      {/* Right: Model Checking */}
      <rect x="372" y="42" width="350" height="210" rx="8" fill="#F8FAFC" stroke="#CBD5E1" />
      <text x="547" y="64" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0F172A">Formal Model Checking (Railway Safety)</text>

      <rect x="392" y="84" width="120" height="36" rx="5" fill="#FFFFFF" stroke="#334155" />
      <text x="452" y="106" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#0F172A">System Model</text>

      <rect x="392" y="138" width="120" height="36" rx="5" fill="#FFFFFF" stroke="#334155" />
      <text x="452" y="160" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#0F172A">Safety Property</text>

      <line x1="512" y1="102" x2="548" y2="124" stroke="#334155" strokeWidth="1.4" markerEnd="url(#arr-s)" />
      <line x1="512" y1="156" x2="548" y2="136" stroke="#334155" strokeWidth="1.4" markerEnd="url(#arr-s)" />

      <rect x="552" y="104" width="148" height="52" rx="6" fill="#1D4ED8" />
      <text x="626" y="127" textAnchor="middle" fontSize="11" fontWeight="700" fill="#FFFFFF">Model Checker</text>
      <text x="626" y="144" textAnchor="middle" fontSize="9.5" fill="#DBEAFE">Exhaustive State Scan</text>

      <line x1="590" y1="156" x2="570" y2="196" stroke="#047857" strokeWidth="1.5" markerEnd="url(#arr-e)" />
      <text x="542" y="218" fontSize="10.5" fontWeight="700" fill="#047857">✓ Verified</text>

      <line x1="660" y1="156" x2="676" y2="196" stroke="#DC2626" strokeWidth="1.5" markerEnd="url(#arr-r)" />
      <text x="652" y="218" fontSize="10.5" fontWeight="700" fill="#DC2626">✗ Counterexample</text>
    </svg>
  );
}

export function DiagramU6PertCpm() {
  return (
    <svg viewBox="0 0 740 275" className="w-full h-auto bg-white dark:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-700" role="img" aria-label="CPM Critical Path Network Diagram">
      {ARROW_DEFS_4_6}
      <text x="20" y="24" fontSize="13" fontWeight="600" fill="#0F172A">CPM Network Diagram — Critical Path A → C → D → E (13 Days)</text>

      {/* Nodes */}
      {[
        { x: 80, y: 138, id: 'A', name: 'Req', d: '2d', crit: true },
        { x: 256, y: 74, id: 'B', name: 'Design', d: '3d', crit: false },
        { x: 256, y: 200, id: 'C', name: 'Database', d: '4d', crit: true },
        { x: 454, y: 138, id: 'D', name: 'Coding', d: '5d', crit: true },
        { x: 644, y: 138, id: 'E', name: 'Testing', d: '2d', crit: true },
      ].map((n) => (
        <g key={n.id}>
          <circle
            cx={n.x}
            cy={n.y}
            r="34"
            fill={n.crit ? '#FEF2F2' : '#F8FAFC'}
            stroke={n.crit ? '#DC2626' : '#64748B'}
            strokeWidth={n.crit ? '2.5' : '1.5'}
          />
          <text x={n.x} y={n.y - 6} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={n.crit ? '#991B1B' : '#0F172A'}>
            {n.id} ({n.d})
          </text>
          <text x={n.x} y={n.y + 12} textAnchor="middle" fontSize="10" fill="#475569">{n.name}</text>
        </g>
      ))}

      {/* Non-critical path edges */}
      <line x1="112" y1="124" x2="220" y2="84" stroke="#64748B" strokeWidth="1.6" strokeDasharray="5 3" markerEnd="url(#arr-s)" />
      <line x1="290" y1="84" x2="418" y2="124" stroke="#64748B" strokeWidth="1.6" strokeDasharray="5 3" markerEnd="url(#arr-s)" />
      <text x="358" y="84" fontSize="10" fill="#64748B">Path 1 = 12 days (Slack = 1d)</text>

      {/* Critical Path edges */}
      <line x1="112" y1="152" x2="220" y2="190" stroke="#DC2626" strokeWidth="2.6" markerEnd="url(#arr-r)" />
      <line x1="290" y1="190" x2="418" y2="152" stroke="#DC2626" strokeWidth="2.6" markerEnd="url(#arr-r)" />
      <line x1="488" y1="138" x2="606" y2="138" stroke="#DC2626" strokeWidth="2.6" markerEnd="url(#arr-r)" />

      <rect x="190" y="242" width="360" height="24" rx="5" fill="#FEF2F2" stroke="#FECACA" />
      <text x="370" y="258" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#991B1B">
        Critical Path: A → C → D → E = 2 + 4 + 5 + 2 = 13 Days (Zero Slack)
      </text>
    </svg>
  );
}

export function DiagramU6Devops() {
  return (
    <svg viewBox="0 0 740 245" className="w-full h-auto bg-white dark:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-700" role="img" aria-label="DevOps CI/CD Deployment Pipeline">
      {ARROW_DEFS_4_6}
      <text x="20" y="24" fontSize="13" fontWeight="600" fill="#0F172A">DevOps Automated CI/CD Deployment Pipeline (Cloud Platform)</text>

      {[
        { x: 18, step: '1. Plan & Code', tool: 'Git / GitHub', bg: '#EFF6FF', st: '#1D4ED8' },
        { x: 140, step: '2. Build', tool: 'Docker / Maven', bg: '#EFF6FF', st: '#1D4ED8' },
        { x: 262, step: '3. Auto Test', tool: 'Unit & Int.', bg: '#FEF3C7', st: '#B45309' },
        { x: 384, step: '4. Staging', tool: 'Acceptance', bg: '#FEF3C7', st: '#B45309' },
        { x: 506, step: '5. Deploy', tool: 'Blue-Green / K8s', bg: '#ECFDF5', st: '#047857' },
        { x: 628, step: '6. Monitor', tool: 'Grafana / Alerts', bg: '#F1F5F9', st: '#334155' },
      ].map((s, idx) => (
        <g key={s.step}>
          <rect x={s.x} y="76" width="98" height="68" rx="7" fill={s.bg} stroke={s.st} strokeWidth="1.6" />
          <text x={s.x + 49} y="104" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#0F172A">{s.step}</text>
          <text x={s.x + 49} y="125" textAnchor="middle" fontSize="9.5" fill="#475569">{s.tool}</text>
          {idx < 5 && (
            <line x1={s.x + 98} y1="110" x2={s.x + 118} y2="110" stroke="#334155" strokeWidth="1.6" markerEnd="url(#arr-s)" />
          )}
        </g>
      ))}

      {/* Continuous Feedback loop */}
      <path d="M 677 144 L 677 196 L 67 196 L 67 148" fill="none" stroke="#1D4ED8" strokeWidth="1.6" strokeDasharray="5 3" markerEnd="url(#arr-b)" />
      <text x="370" y="187" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#1D4ED8">Continuous Telemetry Feedback → Next Plan & Code Cycle (AWS / GCP / Azure Cloud)</text>
    </svg>
  );
}

export function DiagramU6Scm() {
  return (
    <svg viewBox="0 0 740 260" className="w-full h-auto bg-white dark:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-700" role="img" aria-label="SCM Change Control and Git Branching Diagram">
      {ARROW_DEFS_4_6}
      <text x="20" y="24" fontSize="13" fontWeight="600" fill="#0F172A">SCM Change Control Process & Parallel Git Branching</text>

      {/* Top: Change Control */}
      <text x="24" y="52" fontSize="11" fontWeight="700" fill="#334155">1. Formal Change Control Workflow</text>
      {['Change Request', 'Impact Analysis', 'CCB Approval', 'Implement & Test', 'New Baseline'].map((st, idx) => {
        const x = 24 + idx * 142;
        return (
          <g key={st}>
            <rect x={x} y="62" width="118" height="36" rx="5" fill={idx === 2 ? '#FEF3C7' : '#EFF6FF'} stroke={idx === 2 ? '#B45309' : '#1D4ED8'} strokeWidth="1.4" />
            <text x={x + 59} y="84" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0F172A">{st}</text>
            {idx < 4 && (
              <line x1={x + 118} y1="80" x2={x + 138} y2="80" stroke="#334155" strokeWidth="1.4" markerEnd="url(#arr-s)" />
            )}
          </g>
        );
      })}

      {/* Bottom: Git Branches */}
      <text x="24" y="136" fontSize="11" fontWeight="700" fill="#334155">2. Team Version Control (College Portal Git Workflow)</text>
      <line x1="60" y1="184" x2="680" y2="184" stroke="#0F172A" strokeWidth="2.4" />
      <circle cx="80" cy="184" r="7" fill="#0F172A" />
      <text x="80" y="206" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0F172A">v1.0 main</text>

      {/* Feature branches */}
      <path d="M 120 184 C 150 184, 150 154, 190 154 L 460 154 C 500 154, 500 184, 530 184" fill="none" stroke="#1D4ED8" strokeWidth="2" />
      <text x="325" y="148" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1D4ED8">Dev 1: feature/login + PR Review</text>

      <path d="M 160 184 C 190 184, 190 222, 230 222 L 500 222 C 540 222, 540 184, 570 184" fill="none" stroke="#047857" strokeWidth="2" />
      <text x="365" y="240" textAnchor="middle" fontSize="10" fontWeight="600" fill="#047857">Dev 2: feature/attendance + CI Tests</text>

      <circle cx="636" cy="184" r="9" fill="#047857" />
      <text x="636" y="208" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#065F46">Release v1.1</text>
    </svg>
  );
}
