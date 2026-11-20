import type { UnitData } from '../types/syllabus';

export const UNITS_1_TO_3: UnitData[] = [
  {
    id: 'unit-1',
    unitNumber: 1,
    title: 'Software Process and Agile Development',
    shortTitle: 'Process & Agile',
    summary:
      'Covers SDLC models (Waterfall, Incremental, Spiral, Prototyping), Agile Manifesto & Sprint lifecycle, and Extreme Programming (XP) phases and 12 practices.',
    twoMarks: [
      {
        id: 'u1-2m-1',
        number: 1,
        question: 'Define Software Engineering. What is Software Crisis?',
        answerBullets: [
          'Software Engineering: The systematic, disciplined, quantifiable application of engineering principles, methods, and tools to develop, operate, test, and maintain reliable software.',
          'Software Crisis: The set of recurring difficulties in software development such as high cost, late delivery, poor quality, growing complexity, and high maintenance effort.',
        ],
        keyTerms: ['Systematic approach', 'Maintenance', 'Cost & schedule overrun', 'Quality'],
      },
      {
        id: 'u1-2m-2',
        number: 2,
        question: 'Compare Waterfall Model vs Incremental Model.',
        table: {
          headers: ['Waterfall Model', 'Incremental Model'],
          rows: [
            ['Development follows a strict sequential process.', 'Development occurs in small functional increments.'],
            ['Each phase must finish before the next starts.', 'Each increment adds new working functionality.'],
            ['Requirement changes are difficult late in lifecycle.', 'Changes can be incorporated more easily.'],
            ['Working software is delivered only at the very end.', 'Working software is delivered regularly in stages.'],
          ],
        },
        keyTerms: ['Sequential', 'Increments', 'Early delivery', 'Change tolerance'],
      },
      {
        id: 'u1-2m-3',
        number: 3,
        question: 'What are the Agile Manifesto values and principles?',
        answerBullets: [
          'Value 1: Individuals and interactions over processes and tools.',
          'Value 2: Working software over comprehensive documentation.',
          'Value 3: Customer collaboration over contract negotiation.',
          'Value 4: Responding to change over following a plan.',
          '12 Supporting Principles: Early and continuous delivery, welcoming changing requirements, frequent working software, daily business-developer collaboration, motivated teams, face-to-face communication, sustainable pace, technical excellence, simplicity, self-organizing teams, and regular retrospectives.',
        ],
        keyTerms: ['4 Core Values', '12 Principles', 'Customer collaboration', 'Responding to change'],
      },
      {
        id: 'u1-2m-4',
        number: 4,
        question: 'List the 12 Extreme Programming (XP) practices.',
        answerBullets: [
          '1. Planning Game · 2. Small Releases · 3. System Metaphor · 4. Simple Design',
          '5. Testing (Unit & Acceptance) · 6. Refactoring · 7. Pair Programming · 8. Collective Ownership',
          '9. Continuous Integration · 10. 40-Hour Week · 11. On-Site Customer · 12. Coding Standards',
        ],
        keyTerms: ['Pair programming', 'Refactoring', 'Continuous integration', 'On-site customer'],
      },
    ],
    longAnswers: [
      {
        id: 'u1-13m-1',
        number: 1,
        question:
          'Explain Waterfall, Incremental, Spiral, and Prototyping models with diagrams, advantages, disadvantages, and suitable applications.',
        isHighPriority: true,
        marksLabel: '13 / 16 Marks',
        diagramId: 'u1-sdlc',
        diagramTitle: 'SDLC Models: Waterfall, Incremental, Spiral & Prototyping',
        sketchTips: [
          'Draw Waterfall as 6 descending stepped boxes connected by downward arrows (Req → Design → Impl → Test → Deploy → Maint).',
          'Draw Incremental as parallel Mini-SDLC blocks (Increment 1, 2, 3) delivering cumulative builds.',
          'Draw Spiral with 4 labeled quadrants (Planning, Risk Analysis, Engineering, Evaluation) crossed by an expanding spiral curve.',
          'Draw Prototyping as a feedback loop (Quick Design → Build Prototype → Customer Evaluation → Refine Prototype → Final System).',
        ],
        introduction:
          'A Software Development Life Cycle (SDLC) model defines the structured sequence of activities followed to plan, design, build, test, deploy, and maintain a software product. Selecting the right SDLC model directly impacts delivery speed, risk control, and software quality.',
        sections: [
          {
            heading: '1. Waterfall Model (Linear Sequential Model)',
            paragraphs: [
              'The Waterfall Model is a classic sequential SDLC model where each phase must be completed and signed off before the next phase begins.',
            ],
            orderedSteps: [
              'Requirement Analysis — Gather and document all user and system requirements in an SRS.',
              'System Design — Define system architecture, database schema, modules, and interfaces.',
              'Implementation — Translate design blueprints into executable source code.',
              'Testing — Verify modules and integrated system to uncover and fix defects.',
              'Deployment — Install and configure the software in the user environment.',
              'Maintenance — Resolve post-release defects, adapt to changes, and enhance features.',
            ],
            prosCons: {
              advantages: [
                'Simple, disciplined, and easy to understand and manage.',
                'Clearly defined phase milestones and deliverables.',
                'Works effectively for small projects with stable, well-understood requirements.',
              ],
              disadvantages: [
                'Very difficult and costly to accommodate late requirement changes.',
                'Testing occurs late, delaying defect discovery.',
                'Working software is only visible near project completion.',
              ],
              applications: [
                'Small payroll systems, basic billing utilities, and compliance-bound projects with frozen requirements.',
              ],
            },
          },
          {
            heading: '2. Incremental Model',
            paragraphs: [
              'The Incremental Model builds and delivers software in small functional slices (increments). Each increment executes analysis, design, coding, and testing to add new capabilities to the core product.',
            ],
            orderedSteps: [
              'Collect high-level overall system requirements.',
              'Partition features into prioritized, deliverable modules.',
              'Design, build, test, and deploy Increment 1 (core product).',
              'Gather user feedback and build Increment 2, 3, etc. sequentially or in parallel.',
              'Integrate all verified increments into the complete production system.',
            ],
            prosCons: {
              advantages: [
                'Early delivery of usable working software.',
                'Easier testing, debugging, and risk isolation per increment.',
                'Accommodates evolving requirements between increments.',
              ],
              disadvantages: [
                'Requires solid upfront architectural planning so increments fit cleanly.',
                'Integration across increments can grow complex.',
                'Total cost can exceed Waterfall if interfaces shift repeatedly.',
              ],
              applications: [
                'E-commerce platforms, online banking portals, and College Management Systems.',
              ],
            },
          },
          {
            heading: '3. Spiral Model (Risk-Driven Iterative Model)',
            paragraphs: [
              'Proposed by Barry Boehm, the Spiral Model merges iterative prototyping with systematic risk analysis. Each loop (spiral) represents a phase producing an increasingly mature version of the system.',
            ],
            orderedSteps: [
              'Quadrant 1 — Planning: Determine objectives, alternatives, and constraints.',
              'Quadrant 2 — Risk Analysis: Identify technical/business risks, evaluate alternatives, and build prototypes to mitigate risks.',
              'Quadrant 3 — Engineering: Design, code, verify, and test the next level of the product.',
              'Quadrant 4 — Customer Evaluation: Review the build with stakeholders and plan the next spiral.',
            ],
            prosCons: {
              advantages: [
                'Strong, explicit risk identification and mitigation in every cycle.',
                'Flexible to changing requirements and continuous customer feedback.',
                'Ideal for large, mission-critical, high-risk systems.',
              ],
              disadvantages: [
                'Expensive and requires specialized risk-assessment expertise.',
                'Complex management overhead; unsuitable for small, low-risk apps.',
              ],
              applications: [
                'Aerospace flight control, defense software, core banking systems, and safety-critical medical devices.',
              ],
            },
          },
          {
            heading: '4. Prototyping Model',
            paragraphs: [
              'A prototype is an early, rapidly built working model of the software used to clarify ambiguous user requirements and validate user-interface expectations before full-scale engineering.',
            ],
            orderedSteps: [
              'Collect initial high-level requirements.',
              'Create a quick design focusing on visible user inputs and outputs.',
              'Construct a working prototype.',
              'Demonstrate to the customer and gather concrete feedback.',
              'Refine the prototype iteratively until requirements are finalized.',
              'Engineer, test, and deploy the final production system.',
            ],
            prosCons: {
              advantages: [
                'Clarifies unclear or evolving requirements early.',
                'High customer involvement reduces requirement misunderstandings.',
                'Significantly improves UI/UX usability.',
              ],
              disadvantages: [
                'Frequent scope creep and endless iterations can inflate cost.',
                'Customers may mistake a throwaway prototype for production-ready software.',
                'Rushed prototype code may hurt maintainability if reused blindly.',
              ],
              applications: [
                'Online shopping UIs, mobile apps, ticket booking interfaces, and novel consumer products.',
              ],
            },
          },
        ],
        comparisonTable: {
          title: 'SDLC Models Comparison Summary',
          headers: ['Model', 'Core Mechanism', 'Risk Handling', 'Requirement Flexibility', 'Best Suitable For'],
          rows: [
            ['Waterfall', 'Linear sequential phases', 'Low (late detection)', 'Very low', 'Fixed, stable requirements'],
            ['Incremental', 'Phased feature deliveries', 'Moderate', 'Moderate to High', 'Modular portals & e-commerce'],
            ['Spiral', 'Iterative cycles + risk quadrants', 'Very High', 'High', 'Large, high-risk, aerospace/defense'],
            ['Prototyping', 'Early mockups + user feedback loop', 'Moderate (UI/Req risk)', 'Very High', 'Unclear requirements & UI-heavy apps'],
          ],
        },
        realTimeExample: {
          title: 'Incremental Delivery — College Management System',
          points: [
            'Increment 1: Student registration and authentication module.',
            'Increment 2: Faculty attendance tracking and daily reports.',
            'Increment 3: Online tuition fee payment and receipt generation.',
            'Increment 4: Examination grading, GPA calculation, and transcripts.',
          ],
        },
        conclusion:
          'No single SDLC model fits every project. Engineers select Waterfall for fixed specs, Incremental for modular phased value, Spiral for high-risk enterprise systems, and Prototyping when user requirements are initially ambiguous.',
        pageBlueprint: [
          { page: 'Page 1', focus: 'Introduction & Waterfall Model', checklist: 'Define SDLC, explain Waterfall 6 phases + stepped diagram.' },
          { page: 'Page 2', focus: 'Incremental Model & Example', checklist: 'Draw multi-increment diagram, steps, College Management example, pros/cons.' },
          { page: 'Page 3', focus: 'Spiral Model (4 Quadrants)', checklist: 'Draw 4-quadrant spiral diagram neatly, explain Planning, Risk, Engineering, Evaluation.' },
          { page: 'Page 4', focus: 'Prototyping Model', checklist: 'Draw feedback loop diagram, 7 steps, advantages, disadvantages, applications.' },
          { page: 'Page 5', focus: 'Comparison Table & Conclusion', checklist: 'Write 4-row comparison table covering features, risk, and best-fit applications + conclusion.' },
        ],
        unit3DIndex: 0,
      },
      {
        id: 'u1-13m-2',
        number: 2,
        question: 'Explain Agile Process in detail. Compare Agile vs Traditional process.',
        marksLabel: '13 / 16 Marks',
        diagramId: 'u1-agile',
        diagramTitle: 'Agile Iterative Sprint Lifecycle (Scrum Flow)',
        sketchTips: [
          'Draw Product Backlog on the left feeding into Sprint Planning → Sprint Backlog.',
          'Draw a prominent circular Sprint Loop (1–4 weeks) with a smaller Daily Standup loop attached.',
          'Exit the Sprint loop into Working Increment → Sprint Review & Sprint Retrospective arrows looping back to Backlog.',
        ],
        introduction:
          'Agile software development is an iterative, incremental, people-centric methodology that delivers small slices of working software in time-boxed cycles (sprints) while continuously adapting to customer feedback.',
        sections: [
          {
            heading: '1. Step-by-Step Agile Process Workflow',
            orderedSteps: [
              'Requirement Collection — Collaborate with stakeholders to capture user stories.',
              'Product Backlog — Maintain a prioritized list of all desired product features and fixes.',
              'Sprint Planning — Select top-priority backlog items for the upcoming 1–4 week sprint.',
              'Design & Development — Collaboratively design and implement selected stories.',
              'Continuous Testing — Execute unit, integration, and acceptance tests within the sprint.',
              'Sprint Review — Demonstrate working software to customers and collect feedback.',
              'Sprint Retrospective — Inspect team workflow to identify improvements for the next sprint.',
              'Next Sprint — Repeat iteratively until release goals are achieved.',
            ],
          },
          {
            heading: '2. Core Agile Roles & Principles',
            bullets: [
              'Product Owner — Owns the product vision, defines requirements, and prioritizes the backlog.',
              'Scrum Master — Facilitates Agile ceremonies, coaches the team, and removes impediments.',
              'Development Team — Cross-functional engineers who design, code, and test each increment.',
              'Customer / Stakeholder — Actively reviews demos and validates business value.',
              'Guiding Principles — Frequent working software delivery, welcoming late changes, face-to-face communication, motivated individuals, technical excellence, and simplicity.',
            ],
            prosCons: {
              advantages: [
                'Faster time-to-market with frequent usable releases.',
                'High customer satisfaction through continuous visibility.',
                'Early defect detection via continuous testing.',
                'Adapts smoothly to changing business priorities.',
              ],
              disadvantages: [
                'Requires sustained, active customer participation.',
                'Final budget and timeline can be harder to fix upfront.',
                'Scope creep risk if backlog prioritization is weak.',
                'Depends on experienced, self-disciplined team members.',
              ],
            },
          },
        ],
        comparisonTable: {
          title: 'Agile Process vs Traditional (Plan-Driven) Process',
          headers: ['Criteria', 'Agile Process', 'Traditional Process (Waterfall)'],
          rows: [
            ['Approach', 'Iterative and incremental cycles', 'Sequential linear phases'],
            ['Releases', 'Frequent working releases per sprint', 'Single major release at the end'],
            ['Change Handling', 'Welcomes changing requirements even late', 'Changes are costly and discouraged'],
            ['Customer Role', 'Continuous collaboration and demo feedback', 'Limited mainly to start and final acceptance'],
            ['Testing', 'Continuous throughout every sprint', 'Occurs after implementation phase'],
            ['Planning', 'Adaptive, rolling-wave planning', 'Rigid upfront planning & heavy docs'],
            ['Best Fit', 'Dynamic, evolving product requirements', 'Stable, fixed, regulatory requirements'],
          ],
        },
        realTimeExample: {
          title: 'Agile Sprints for a College Management System',
          points: [
            'Sprint 1: User login, role-based access, and student registration.',
            'Sprint 2: Student profile dashboard and course enrollment.',
            'Sprint 3: Daily attendance entry and shortage alerts.',
            'Sprint 4: Online fee payment gateway and receipt downloads.',
            'Sprint 5: Exam results publication and automated analytics reports.',
          ],
        },
        conclusion:
          'Agile transforms software engineering from rigid upfront prediction into responsive value delivery, raising product quality and customer satisfaction through teamwork, short feedback loops, and continuous improvement.',
        pageBlueprint: [
          { page: 'Page 1', focus: 'Introduction & Agile Manifesto', checklist: 'Define Agile, list the 4 core Manifesto values and key principles.' },
          { page: 'Page 2', focus: 'Agile Roles & Ceremonies', checklist: 'Explain Product Owner, Scrum Master, Dev Team, Daily Standup, Review, Retro.' },
          { page: 'Page 3', focus: 'Agile Process Diagram', checklist: 'Draw Backlog → Sprint Planning → 2-Week Sprint Loop → Working Increment → Review.' },
          { page: 'Page 4', focus: 'College Portal Sprint Example & Comparison Table', checklist: 'Write 5-sprint example + full 7-row Agile vs Traditional table.' },
          { page: 'Page 5', focus: 'Advantages, Disadvantages & Conclusion', checklist: 'List pros/cons clearly and conclude when to choose Agile.' },
        ],
        unit3DIndex: 0,
      },
      {
        id: 'u1-13m-3',
        number: 3,
        question:
          'Explain Extreme Programming (XP) Process with Planning, Design, Coding, and Testing phases.',
        marksLabel: '13 / 16 Marks',
        diagramId: 'u1-xp',
        diagramTitle: 'Extreme Programming (XP) 4-Phase Process Loop',
        sketchTips: [
          'Draw 4 linked stage boxes in a cycle: Planning (User Stories) → Design (Simple Design / CRC) → Coding (Pair Programming / CI) → Testing (Unit & Acceptance).',
          'Add a Refactoring feedback arrow between Coding and Design.',
          'Show Release Increment exiting Testing to the On-Site Customer.',
        ],
        introduction:
          'Extreme Programming (XP), introduced by Kent Beck, is an Agile methodology that pushes proven engineering practices (code review, testing, simplicity, integration) to "extreme" levels to deliver high-quality software under rapidly changing requirements.',
        sections: [
          {
            heading: '1. Four Core Phases of XP',
            bullets: [
              'Phase 1 — Planning: Customer writes User Stories describing needed features. Developers estimate effort, prioritize stories in the Planning Game, and schedule small frequent releases.',
              'Phase 2 — Design: Follows KIS (Keep It Simple). Uses CRC (Class-Responsibility-Collaborator) cards, avoids speculative over-engineering, builds spike solutions for tough risks, and relies on continuous Refactoring.',
              'Phase 3 — Coding: Developers write automated unit tests before production code (TDD), practice Pair Programming (Driver writes code while Navigator reviews logic), enforce Coding Standards, share Collective Ownership, and run Continuous Integration.',
              'Phase 4 — Testing: Automated Unit Tests run continuously on every integration. Customer-defined Acceptance Tests validate complete user stories before release.',
            ],
          },
          {
            heading: '2. The 12 Core XP Practices',
            orderedSteps: [
              'Planning Game — Joint release & iteration planning with business and tech.',
              'Small Releases — Ship minimal valuable versions frequently.',
              'System Metaphor — Shared naming vocabulary describing how the system works.',
              'Simple Design — Simplest architecture that satisfies current stories.',
              'Testing — Continuous automated unit and customer acceptance testing.',
              'Refactoring — Continuously restructure code without changing external behavior.',
              'Pair Programming — Two engineers collaborating at one workstation.',
              'Collective Ownership — Any developer can improve any module at any time.',
              'Continuous Integration — Integrate and verify builds multiple times daily.',
              '40-Hour Week — Sustainable pace to avoid burnout and defects.',
              'On-Site Customer — Real customer representative available daily.',
              'Coding Standards — Uniform style guidelines across the entire codebase.',
            ],
            prosCons: {
              advantages: [
                'Significantly elevates code quality through pair programming and TDD.',
                'Detects and fixes defects immediately via continuous integration.',
                'Frequent small releases ensure strong alignment with customer needs.',
              ],
              disadvantages: [
                'Requires continuous on-site customer availability.',
                'Pair programming increases short-term staffing perception/overhead.',
                'Challenging to coordinate across very large geographically distributed teams.',
              ],
            },
          },
        ],
        realTimeExample: {
          title: 'XP in an Online Food Ordering App',
          points: [
            'Planning: User stories created for Login, Restaurant Search, Cart Management, and UPI Payment.',
            'Design: Simple CRC cards for User, Restaurant, MenuItem, Cart, and Order classes.',
            'Coding: Pairs implement Cart calculation with automated unit tests merged into main daily.',
            'Testing: Automated tests verify discount math; customer runs acceptance checkout test before Release 1.',
          ],
        },
        conclusion:
          'Extreme Programming combines disciplined technical practices—pair programming, TDD, refactoring, and continuous integration—with tight customer collaboration to consistently ship resilient software.',
        pageBlueprint: [
          { page: 'Page 1', focus: 'Introduction & XP Values', checklist: 'Define XP (Kent Beck), 5 values (Communication, Simplicity, Feedback, Courage, Respect).' },
          { page: 'Page 2', focus: 'Planning & Design Phases', checklist: 'Explain User Stories, Planning Game, Simple Design, CRC cards, Refactoring.' },
          { page: 'Page 3', focus: 'XP Process Diagram & Coding/Testing', checklist: 'Draw 4-phase XP loop; detail Pair Programming, CI, Unit & Acceptance tests.' },
          { page: 'Page 4', focus: '12 XP Practices & Food App Example', checklist: 'List all 12 XP practices concisely + Online Food Ordering walkthrough.' },
          { page: 'Page 5', focus: 'Pros, Cons & Conclusion', checklist: 'Write advantages, disadvantages, and crisp conclusion.' },
        ],
        unit3DIndex: 0,
      },
    ],
  },
  {
    id: 'unit-2',
    unitNumber: 2,
    title: 'Requirements Analysis and Specification',
    shortTitle: 'SRS, UML & DFD',
    summary:
      'Covers IEEE SRS structure with full system templates, all 5 core UML diagrams, Data Flow Diagrams (Levels 0, 1, 2), and formal modeling with Finite State Machines and Petri Nets.',
    twoMarks: [
      {
        id: 'u2-2m-1',
        number: 1,
        question: 'What is SRS? List the main contents of an SRS document.',
        answerParagraph:
          'SRS (Software Requirements Specification) is a formal baseline document describing the complete functional and non-functional requirements, constraints, and interfaces of a software system.',
        answerBullets: [
          'Contents: Introduction (Purpose, Scope), Overall Description, Functional Requirements, Non-Functional Requirements, External Interface Requirements, System Constraints, Assumptions & Dependencies.',
        ],
        keyTerms: ['IEEE 830', 'Functional', 'Non-functional', 'Agreement baseline'],
      },
      {
        id: 'u2-2m-2',
        number: 2,
        question: 'Differentiate Functional vs Non-Functional Requirements.',
        table: {
          headers: ['Functional Requirements', 'Non-Functional Requirements'],
          rows: [
            ['Describe WHAT the system should do.', 'Describe HOW WELL the system performs.'],
            ['Define specific features, inputs, and outputs.', 'Define quality attributes (speed, security, reliability).'],
            ['Example: Student can borrow a book.', 'Example: Book search must return within 2 seconds.'],
          ],
        },
        keyTerms: ['System features', 'Quality attributes', 'Performance', 'Security'],
      },
      {
        id: 'u2-2m-3',
        number: 3,
        question: 'List the standard Use Case Diagram symbols.',
        answerBullets: [
          'Actor (Stick Figure) — External user or system interacting with the software.',
          'Use Case (Oval) — Specific goal or functional capability.',
          'System Boundary (Rectangle) — Defines the scope of the system.',
          'Association (Solid Line) — Connects Actor to Use Case.',
          '<<include>> (Dashed Arrow) — Mandatory reusable sub-behavior.',
          '<<extend>> (Dashed Arrow) — Optional or conditional behavior.',
          'Generalization (Hollow Triangle Arrow) — Inheritance between actors or use cases.',
        ],
        keyTerms: ['Actor', 'Oval', 'System Boundary', 'Include & Extend'],
      },
      {
        id: 'u2-2m-4',
        number: 4,
        question: 'Explain DFD Level 0, Level 1, and Level 2.',
        answerBullets: [
          'Level 0 (Context Diagram): Shows the entire system as a single central process interacting with external entities.',
          'Level 1: Decomposes the single context process into major sub-processes and introduces data stores.',
          'Level 2: Further explodes a specific Level 1 sub-process into fine-grained operational steps and data flows.',
        ],
        keyTerms: ['Context diagram', 'Sub-processes', 'Data stores', 'Functional decomposition'],
      },
    ],
    longAnswers: [
      {
        id: 'u2-13m-1',
        number: 1,
        question:
          'Explain SRS in detail with structure. Prepare SRS for Library Management / Online Food Ordering / Railway Reservation System.',
        isHighPriority: true,
        marksLabel: '13 / 16 Marks',
        diagramId: 'u2-srs',
        diagramTitle: 'IEEE SRS Document Architecture & Library System Blueprint',
        sketchTips: [
          'Draw a hierarchical tree showing IEEE SRS sections: 1. Intro, 2. Overall Description, 3. Specific Requirements (Functional, Non-Functional, Interfaces).',
          'Beside it, draw the Library Management stakeholder map (Admin, Librarian, Student ↔ Core System ↔ Book/Loan DB).',
        ],
        introduction:
          'A Software Requirements Specification (SRS) is a comprehensive technical agreement between customers, developers, and testers that specifies what the system must do and the operational quality constraints it must satisfy before design begins.',
        sections: [
          {
            heading: '1. Importance & IEEE Standard Structure of SRS',
            bullets: [
              'Importance: Eliminates ambiguity, aids cost/schedule estimation, establishes validation criteria for testing, controls scope creep, and serves as a long-term maintenance reference.',
              'Section 1 — Introduction: Purpose, Scope, Definitions/Acronyms, References, Overview.',
              'Section 2 — Overall Description: Product Perspective, User Characteristics, Operating Environment, Design Constraints, Assumptions & Dependencies.',
              'Section 3 — Specific Requirements: Functional Requirements, Non-Functional Requirements (Performance, Security, Usability, Reliability), External Interfaces (UI, Hardware, Software, Comm), and Database Requirements.',
            ],
          },
          {
            heading: '2. Complete SRS: Library Management System',
            bullets: [
              'Purpose & Scope: Automates book cataloging, student registration, book issue/return tracking, overdue fine calculation, and reporting for Admins, Librarians, and Students.',
              'Functional Requirements: (1) Role-based Login/Logout, (2) Add/Update/Delete Book Records, (3) Search books by Title/Author/ISBN, (4) Issue & Return books with due-date validation, (5) Automatic overdue fine computation, (6) Borrowing history & administrative reports.',
              'Non-Functional Requirements: Performance (search < 2s), Security (encrypted passwords & role permissions), Reliability (daily DB backups, zero data loss), Usability (clean responsive UI), Availability (99.5% during working hours), Scalability (handles 100k+ books).',
              'Hardware & Software Interfaces: Server/PC with ≥ 4 GB RAM, Barcode scanner, Windows/Linux OS, HTML/CSS/JS frontend, Java/Python backend, MySQL/PostgreSQL database.',
              'Inputs & Outputs: Inputs (Student ID, Book ID, Title, Author, Issue/Return Date) → Outputs (Availability status, Issue slip, Fine receipt, Borrowing history report).',
              'Constraints & Assumptions: Only registered active students can borrow; unavailable books cannot be issued; max borrowing quota enforced by library policy.',
            ],
          },
        ],
        comparisonTable: {
          title: 'Quick SRS Adaptation Templates (Food Ordering & Railway Reservation)',
          headers: ['System', 'Primary Actors', 'Core Functional Requirements', 'Key Non-Functional Targets'],
          rows: [
            [
              'Library Management',
              'Admin, Librarian, Student',
              'Catalog books, search, issue/return, fine calculation, reports',
              'Search < 2s, accurate inventory locking, daily DB backup',
            ],
            [
              'Online Food Ordering',
              'Customer, Restaurant, Delivery Partner, Admin',
              'Registration, restaurant/menu search, cart, UPI/card payment, live order tracking, cancellation',
              'Real-time order updates, PCI-compliant payment security, 99.9% uptime',
            ],
            [
              'Railway Reservation',
              'Passenger, Ticket Clerk, Admin, Payment Gateway',
              'Train search, live seat availability, passenger details, PNR booking, payment, cancellation & refund',
              'ACID concurrency control (no double seat booking), high peak traffic resilience',
            ],
          ],
        },
        realTimeExample: {
          title: 'Exam Adaptation Tip for Alternate Systems',
          points: [
            'Keep the exact 12-heading IEEE SRS skeleton (Introduction through Assumptions).',
            'Swap Users, Functional Requirements, Inputs/Outputs, and Constraints using the table above if the exam asks for Online Food Ordering or Railway Reservation.',
          ],
        },
        conclusion:
          'A well-structured SRS forms the bedrock of successful software delivery by translating stakeholder needs into unambiguous, verifiable functional and non-functional specifications.',
        pageBlueprint: [
          { page: 'Page 1', focus: 'SRS Definition, Importance & IEEE Structure', checklist: 'Define SRS, list 6 benefits, draw SRS section hierarchy tree.' },
          { page: 'Page 2', focus: 'SRS Intro, Purpose, Scope & Users', checklist: 'Write Sections 1–4 for Library (or requested system).' },
          { page: 'Page 3', focus: 'Functional & Non-Functional Requirements', checklist: 'Detail 8–10 functional features + 6 NFR attributes (Performance, Security, etc.).' },
          { page: 'Page 4', focus: 'Hardware/Software, Inputs/Outputs, Constraints', checklist: 'List tech stack, input/output tables, constraints & assumptions.' },
          { page: 'Page 5', focus: 'Advantages & Conclusion', checklist: 'Summarize SRS qualities (Complete, Consistent, Verifiable) + conclusion.' },
        ],
        unit3DIndex: 1,
      },
      {
        id: 'u2-13m-2',
        number: 2,
        question:
          'Explain UML diagrams: Use Case, Class, Sequence, Activity, and State Chart diagram with examples.',
        marksLabel: '13 / 16 Marks',
        diagramId: 'u2-uml',
        diagramTitle: 'UML 5-Diagram Suite (Library Management System)',
        sketchTips: [
          'Use Case: Stick figures outside a rectangle; ovals inside; dashed <<include>> arrows.',
          'Class: 3-compartment boxes (Class Name | Attributes | Methods) linked by 1..* multiplicities.',
          'Sequence: Vertical dashed lifelines with horizontal labeled message arrows top-to-bottom.',
          'Activity: Solid black Start circle → rounded activity boxes → diamond decision branch → bullseye End circle.',
          'State Chart: Rounded state boxes (Available → Reserved → Issued → Overdue → Returned) with event-labeled arrows.',
        ],
        introduction:
          'Unified Modeling Language (UML) is an OMG standard graphical notation used to visualize, specify, construct, and document both the static structure and dynamic behavior of object-oriented software systems.',
        sections: [
          {
            heading: '1. Use Case Diagram (Functional View)',
            paragraphs: [
              'Captures high-level interactions between external actors and system functions inside a system boundary.',
            ],
            bullets: [
              'Elements: Actor, Use Case (oval), System Boundary, Association, <<include>>, <<extend>>, Generalization.',
              'Library Example: Student actor interacts with Search Book, Borrow Book, Return Book; Librarian manages Add/Remove Book and Issue Loan.',
            ],
          },
          {
            heading: '2. Class Diagram (Static Structural View)',
            paragraphs: [
              'Depicts system classes, their attributes, operations (methods), and relationships (Association, Inheritance, Aggregation, Composition).',
            ],
            bullets: [
              'Student: studentId, name | searchBook(), borrowBook().',
              'Book: bookId, title, author, isAvailable | checkAvailability().',
              'Librarian: librarianId, name | addBook(), removeBook().',
              'Loan: issueDate, dueDate | calculateFine().',
            ],
          },
          {
            heading: '3. Sequence Diagram (Time-Ordered Interaction View)',
            paragraphs: [
              'Shows how objects collaborate by exchanging messages in strict chronological order along vertical lifelines.',
            ],
            orderedSteps: [
              'Student sends requestBook(bookId) to LibrarySystem.',
              'LibrarySystem queries BookDatabase for availability.',
              'BookDatabase returns status = Available.',
              'LibrarySystem creates Loan record and updates status.',
              'LibrarySystem sends confirmation receipt back to Student.',
            ],
          },
          {
            heading: '4. Activity Diagram (Workflow / Control Flow View)',
            paragraphs: [
              'Models step-by-step business workflows, decision branches, and parallel forks/joins.',
            ],
            bullets: [
              'Book Borrowing Flow: Start → Login → Search Book → Check Availability → [Available? Yes → Issue Book → Update DB → End | No → Show Unavailable → End].',
            ],
          },
          {
            heading: '5. State Chart Diagram (Object Lifecycle View)',
            paragraphs: [
              'Illustrates all possible states of a single critical object and the events triggering state transitions.',
            ],
            bullets: [
              'Book Lifecycle States: Available → (reserve) → Reserved → (issue) → Issued → (past due) → Overdue → (return & clear fine) → Returned → Available.',
            ],
          },
        ],
        comparisonTable: {
          title: 'UML Diagrams Summary',
          headers: ['UML Diagram', 'Category', 'Primary Focus', 'Key Notation'],
          rows: [
            ['Use Case', 'Behavioral', 'User-system functional interactions', 'Stick figure, oval, boundary'],
            ['Class', 'Structural', 'Static classes, attributes, methods, links', '3-part box, multiplicity arrows'],
            ['Sequence', 'Behavioral', 'Chronological message flow between objects', 'Lifelines, activation bars, arrows'],
            ['Activity', 'Behavioral', 'Step-by-step workflow and branching logic', 'Start/End nodes, actions, diamonds'],
            ['State Chart', 'Behavioral', 'State transitions of an object over time', 'Rounded states, event transitions'],
          ],
        },
        realTimeExample: {
          title: 'Unified Library Management Example',
          points: [
            'Using ONE consistent domain (Library Management) across all 5 UML diagrams saves exam time and shows architectural coherence.',
            'Every diagram views the exact same book-borrowing scenario from a distinct perspective (Actors → Classes → Messages → Flow → States).',
          ],
        },
        conclusion:
          'Together, Use Case, Class, Sequence, Activity, and State Chart diagrams offer complete multi-view blueprints that expose design flaws early and align stakeholders and engineers.',
        pageBlueprint: [
          { page: 'Page 1', focus: 'UML Intro + Use Case Diagram', checklist: 'Define UML; draw Library Use Case diagram + explain symbols.' },
          { page: 'Page 2', focus: 'Class Diagram', checklist: 'Draw 4-class diagram (Student, Book, Librarian, Loan) with attributes, methods & links.' },
          { page: 'Page 3', focus: 'Sequence Diagram', checklist: 'Draw 4 lifelines (Student, UI, System, DB) with numbered message arrows.' },
          { page: 'Page 4', focus: 'Activity & State Chart Diagrams', checklist: 'Draw Borrowing Activity flowchart + Book State Chart transitions.' },
          { page: 'Page 5', focus: 'Comparison Table, Advantages & Conclusion', checklist: 'Include 5-row UML summary table, benefits, and conclusion.' },
        ],
        unit3DIndex: 1,
      },
      {
        id: 'u2-13m-3',
        number: 3,
        question:
          'Explain DFD with example. Draw DFD for Online Food Ordering / ATM System.',
        marksLabel: '13 / 16 Marks',
        diagramId: 'u2-dfd',
        diagramTitle: 'Data Flow Diagrams (Level 0, Level 1, Level 2)',
        sketchTips: [
          'Use exact 4 symbols: Rectangle (External Entity), Circle/Rounded Box (Process), Open-ended Rectangle (Data Store), Labeled Arrow (Data Flow).',
          'Rule Check: Never connect External Entity directly to Data Store — data must always pass through a Process!',
          'Number processes clearly: 0 (Context) → 1.0, 2.0, 3.0... (Level 1) → 3.1, 3.2, 3.3... (Level 2).',
        ],
        introduction:
          'A Data Flow Diagram (DFD) is a structured analysis technique that visually maps how input data enters a system, gets transformed by processes, is persisted in data stores, and exits as output to external entities.',
        sections: [
          {
            heading: '1. Four Standard DFD Symbols (Gane-Sarson / Yourdon)',
            bullets: [
              'External Entity (Rectangle): Source or sink of data outside system control (e.g., Customer, Restaurant).',
              'Process (Circle / Rounded Rectangle): Transforms incoming data flows into outgoing data flows (numbered 1.0, 2.0...).',
              'Data Flow (Labeled Arrow): Represents data packets moving between entities, processes, and stores.',
              'Data Store (Open Rectangle / Parallel Lines): Persistent repository holding data at rest (e.g., D1: Order DB).',
            ],
          },
          {
            heading: '2. Multi-Level DFD for Online Food Ordering System',
            bullets: [
              'Level 0 (Context Diagram): Single central process "0.0 Online Food Ordering System" connected to 4 external entities: Customer (Order/Payment ↔ Confirmation), Restaurant (Order Ticket ↔ Menu/Status), Payment Gateway (Transaction ↔ Auth), Delivery Partner (Pickup/Drop ↔ Status).',
              'Level 1 (Major Sub-Processes): (1.0) User Management ↔ D1 User DB; (2.0) Restaurant & Menu Management ↔ D2 Menu DB; (3.0) Order Processing ↔ D3 Order DB; (4.0) Payment Processing ↔ D4 Payment DB; (5.0) Delivery Management.',
              'Level 2 (Exploding 3.0 Order Processing): 3.1 Receive Cart Items → 3.2 Validate Availability → 3.3 Calculate Bill & Tax → 3.4 Persist Order to D3 → 3.5 Dispatch Ticket to Restaurant → 3.6 Send Confirmation to Customer.',
            ],
          },
          {
            heading: '3. Alternate Exam Example: ATM System DFD',
            bullets: [
              'Level 0: Cardholder & Bank Core System ↔ "0.0 ATM System".',
              'Level 1: 1.0 Authenticate Card & PIN (↔ Account DB), 2.0 Select Transaction, 3.0 Cash Withdrawal & Balance Update, 4.0 Mini-Statement & Receipt Printing.',
              'Level 2 (Cash Withdrawal 3.0): 3.1 Check Daily Limit → 3.2 Verify Sufficient Balance → 3.3 Debit Account DB → 3.4 Dispense Cash → 3.5 Print Receipt.',
            ],
            prosCons: {
              advantages: [
                'Intuitive visual trace of end-to-end data movement.',
                'Uncovers missing inputs, orphan processes, and redundant data stores.',
                'Bridges communication between business analysts and technical engineers.',
              ],
              disadvantages: [
                'Does not depict control flow, loops, or timing/sequence.',
                'Large enterprise systems require many nested levels.',
              ],
            },
          },
        ],
        realTimeExample: {
          title: 'End-to-End Online Food Order Data Trace',
          points: [
            'Customer logs in (1.0) → browses menu from D2 (2.0) → submits cart to Order Processing (3.0).',
            'Payment Gateway authorizes UPI/card (4.0) → Order written to D3 → Restaurant prepares food → Delivery Partner updates live status (5.0).',
          ],
        },
        conclusion:
          'DFDs progressively refine a high-level context boundary into detailed operational transformations, making them indispensable during structured requirements analysis.',
        pageBlueprint: [
          { page: 'Page 1', focus: 'DFD Definition, Rules & 4 Symbols', checklist: 'Define DFD, draw symbol key table, state DFD balancing rules.' },
          { page: 'Page 2', focus: 'Level 0 Context Diagram', checklist: 'Draw clean Level 0 diagram for Online Food Ordering (or ATM) with labeled flows.' },
          { page: 'Page 3', focus: 'Level 1 DFD', checklist: 'Draw 5 main processes + 4 data stores cleanly with balanced inputs/outputs.' },
          { page: 'Page 4', focus: 'Level 2 DFD & Step-by-Step Working', checklist: 'Explode Process 3.0 (Order Processing) into sub-steps 3.1–3.6 + walkthrough.' },
          { page: 'Page 5', focus: 'Advantages, Disadvantages & Conclusion', checklist: 'Summarize benefits, limitations, and final conclusion.' },
        ],
        unit3DIndex: 1,
      },
      {
        id: 'u2-13m-4',
        number: 4,
        question: 'Explain Finite State Machines (FSM) and Petri Nets with examples.',
        marksLabel: '13 / 16 Marks',
        diagramId: 'u2-fsm-petri',
        diagramTitle: 'Finite State Machine (Traffic Light) & Petri Net (Order Flow)',
        sketchTips: [
          'FSM: Draw circles for states (Red, Green, Yellow) connected by directional arrows labeled with events/timers; double circle for final state if applicable.',
          'Petri Net: Draw circles for Places, solid vertical bars/rectangles for Transitions, black dots inside circles for Tokens, and directed arcs connecting Place ↔ Transition.',
        ],
        introduction:
          'Finite State Machines (FSM) and Petri Nets are formal mathematical modeling techniques used to specify, simulate, and verify the dynamic behavior of event-driven, real-time, and concurrent software systems.',
        sections: [
          {
            heading: '1. Finite State Machine (FSM)',
            paragraphs: [
              'An FSM models a system as a finite set of states where exactly one state is active at a time, and discrete input events trigger deterministic transitions between states. Formally: M = (Q, Σ, δ, q0, F).',
            ],
            bullets: [
              'Components: States (Q), Input Alphabet (Σ), Transition Function (δ), Initial State (q0), Final/Accepting States (F).',
              'Example — Traffic Signal Controller: Red (Vehicles Stop) —[Timer 60s]→ Green (Vehicles Move) —[Timer 45s]→ Yellow (Prepare to Stop) —[Timer 5s]→ Red.',
              'Applications: Traffic controllers, vending machines, login/session flows, TCP protocol handshakes, lexical analyzers.',
            ],
            prosCons: {
              advantages: [
                'Simple, unambiguous mathematical representation.',
                'Easy to translate directly into code and state-transition test cases.',
              ],
              disadvantages: [
                'State explosion when modeling complex systems with many variables.',
                'Poorly suited for modeling parallel/concurrent activities.',
              ],
            },
          },
          {
            heading: '2. Petri Nets',
            paragraphs: [
              'Introduced by Carl Adam Petri, a Petri Net is a directed bipartite graph used to model concurrent, asynchronous, distributed, and resource-sharing systems.',
            ],
            bullets: [
              'Places (Circles): Represent conditions, buffers, or resource availability.',
              'Transitions (Bars / Rectangles): Represent discrete events or actions.',
              'Tokens (Black Dots): Reside inside places to signify active conditions or available resources.',
              'Firing Rule: A transition is enabled when every input place contains at least one token; firing consumes tokens from input places and produces tokens in output places.',
              'Example — Online Order Processing: P1 (Order Received, 1 token) → T1 (Payment Verified) → P2 (Order Confirmed) → T2 (Kitchen Prepared) → P3 (Ready for Delivery).',
            ],
            prosCons: {
              advantages: [
                'Natively models concurrency, synchronization, and shared resource conflicts.',
                'Enables mathematical deadlock and liveness analysis.',
              ],
              disadvantages: [
                'Complex nets become visually dense and harder for non-engineers to read.',
                'Large state reachability graphs require specialized analysis tools.',
              ],
            },
          },
        ],
        comparisonTable: {
          title: 'Finite State Machines vs Petri Nets',
          headers: ['Aspect', 'Finite State Machine (FSM)', 'Petri Net'],
          rows: [
            ['Core Elements', 'States, Inputs, Transitions', 'Places, Transitions, Arcs, Tokens'],
            ['Concurrency', 'Sequential (1 active state at a time)', 'Concurrent (multiple tokens active simultaneously)'],
            ['Resource Sharing', 'Difficult to model directly', 'Naturally represents shared resources & locks'],
            ['Deadlock Detection', 'Limited to reachability traps', 'Strong formal deadlock & liveness proofs'],
            ['Best Use Case', 'UI flows, traffic lights, protocols', 'Distributed workflows, manufacturing, railway control'],
          ],
        },
        realTimeExample: {
          title: 'Interactive Token Execution in Order Workflow',
          points: [
            'In the diagram above, click "Fire Next Transition" to watch tokens move from Order Received → Confirmed → Ready for Delivery.',
            'Notice how a Petri Net can spawn parallel branches (Kitchen Cooking + Rider Assignment) and synchronize them before delivery.',
          ],
        },
        conclusion:
          'Choose Finite State Machines for clean sequential event-driven behavior, and Petri Nets whenever parallelism, synchronization, and deadlock verification are critical.',
        pageBlueprint: [
          { page: 'Page 1', focus: 'Formal Modeling Intro & FSM Theory', checklist: 'Define FSM 5-tuple, list 5 components, explain state transitions.' },
          { page: 'Page 2', focus: 'FSM Diagram & Example', checklist: 'Draw Traffic Light FSM diagram, applications, pros & cons.' },
          { page: 'Page 3', focus: 'Petri Net Theory & Firing Rule', checklist: 'Explain Places, Transitions, Tokens, Arcs, and token firing rule.' },
          { page: 'Page 4', focus: 'Petri Net Diagram & Order Example', checklist: 'Draw Online Order Petri Net showing token movement before & after firing.' },
          { page: 'Page 5', focus: 'FSM vs Petri Net Comparison & Conclusion', checklist: 'Write 5-row comparison table + summary conclusion.' },
        ],
        unit3DIndex: 1,
      },
    ],
  },
  {
    id: 'unit-3',
    unitNumber: 3,
    title: 'Software Design',
    shortTitle: 'Software Design',
    summary:
      'Covers Coupling & Cohesion taxonomy, Modularity, Design Principles & Metrics (Cyclomatic Complexity), Top-Down / Bottom-Up / Hybrid design, and Functional vs Object-Oriented Design.',
    twoMarks: [
      {
        id: 'u3-2m-1',
        number: 1,
        question: 'Differentiate Coupling and Cohesion.',
        answerBullets: [
          'Coupling: The degree of interdependence between two or more distinct software modules.',
          'Cohesion: The degree to which elements inside a single module belong together to achieve one focused task.',
          'Golden Rule of Good Design: Always strive for LOW Coupling and HIGH Cohesion.',
        ],
        keyTerms: ['Inter-module dependency', 'Intra-module focus', 'Low coupling', 'High cohesion'],
      },
      {
        id: 'u3-2m-2',
        number: 2,
        question: 'List the types of Coupling and types of Cohesion.',
        answerBullets: [
          '6 Types of Coupling (Worst → Best): Content, Common, External, Control, Stamp, Data Coupling.',
          '7 Types of Cohesion (Worst → Best): Coincidental, Logical, Temporal, Procedural, Communicational, Sequential, Functional Cohesion.',
        ],
        keyTerms: ['Content → Data', 'Coincidental → Functional'],
      },
      {
        id: 'u3-2m-3',
        number: 3,
        question: 'What is Modularity in Software Design?',
        answerParagraph:
          'Modularity is the practice of decomposing a complex software system into smaller, independently named and addressable components (modules). Each module handles a well-defined responsibility and can be built, tested, reused, and maintained separately.',
        keyTerms: ['Decomposition', 'Independent modules', 'Maintainability', 'Reusability'],
      },
      {
        id: 'u3-2m-4',
        number: 4,
        question: 'Compare Top-Down Design vs Bottom-Up Design.',
        table: {
          headers: ['Top-Down Design', 'Bottom-Up Design'],
          rows: [
            ['Starts from the overall high-level system.', 'Starts from low-level basic components.'],
            ['Decomposes system into sub-modules (stepwise refinement).', 'Integrates reusable primitives into larger subsystems.'],
            ['Clear global architecture from day one.', 'Strong component reuse and early unit testing.'],
          ],
        },
        keyTerms: ['Stepwise refinement', 'Component integration', 'Reuse'],
      },
    ],
    longAnswers: [
      {
        id: 'u3-13m-1',
        number: 1,
        question:
          'Explain Coupling and Cohesion with types, examples, and how to achieve low coupling and high cohesion.',
        isHighPriority: true,
        marksLabel: '13 / 16 Marks',
        diagramId: 'u3-coupling-cohesion',
        diagramTitle: 'Coupling & Cohesion Quality Spectrums',
        sketchTips: [
          'Draw two side-by-side vertical ladders: Coupling Ladder (Content at top/Worst → Data at bottom/Best) and Cohesion Ladder (Functional at top/Best → Coincidental at bottom/Worst).',
          'Draw two mini module boxes below: High Coupling (tangled arrows) vs Low Coupling / High Cohesion (clean single parameter arrow).',
        ],
        introduction:
          'Coupling and Cohesion are the two primary structural quality criteria in modular software design. Together they determine how easy a codebase is to understand, test, extend, and maintain without introducing ripple-effect defects.',
        sections: [
          {
            heading: '1. Coupling — Dependency Between Modules (6 Types, Worst to Best)',
            orderedSteps: [
              'Content Coupling (Worst): Module A directly modifies internal variables or jumps into the code of Module B.',
              'Common Coupling: Multiple modules read and mutate the same shared global variables.',
              'External Coupling: Modules depend on an externally imposed hardware interface, file format, or protocol.',
              'Control Coupling: Module A passes control flags/switches dictating internal execution paths of Module B.',
              'Stamp Coupling: Modules pass entire composite data structures when only one or two fields are needed.',
              'Data Coupling (Best): Modules communicate strictly by passing only the exact primitive data parameters required.',
            ],
          },
          {
            heading: '2. Cohesion — Relatedness Within a Module (7 Types, Worst to Best)',
            orderedSteps: [
              'Coincidental Cohesion (Worst): Arbitrary unrelated utilities dumped into one file.',
              'Logical Cohesion: Tasks of similar category grouped together and chosen via a switch flag (e.g., all I/O routines).',
              'Temporal Cohesion: Tasks grouped solely because they execute at the same time (e.g., system startup/shutdown).',
              'Procedural Cohesion: Tasks grouped because they run in a specific control sequence.',
              'Communicational Cohesion: Tasks operate on the exact same input or output dataset.',
              'Sequential Cohesion: Output produced by one element serves directly as input to the next.',
              'Functional Cohesion (Best): Every single instruction contributes directly toward performing one cohesive, well-defined function.',
            ],
          },
          {
            heading: '3. Ten Practical Techniques to Achieve Low Coupling & High Cohesion',
            orderedSteps: [
              'Apply Single Responsibility Principle — assign each module one clear purpose.',
              'Eliminate unnecessary global mutable state.',
              'Pass only minimal required parameters (Data Coupling).',
              'Enforce Information Hiding / Encapsulation behind stable interfaces.',
              'Avoid passing behavioral control flags between modules.',
              'Use dependency injection / interfaces instead of concrete internal references.',
              'Group closely related data and operations inside cohesive classes.',
              'Refactor large "God classes" into focused smaller modules.',
              'Design clean layered or event-driven communication boundaries.',
              'Write isolated unit tests — hard-to-test modules signal tight coupling.',
            ],
          },
        ],
        comparisonTable: {
          title: 'Coupling vs Cohesion Comparison',
          headers: ['Dimension', 'Coupling', 'Cohesion'],
          rows: [
            ['Definition', 'Degree of dependency BETWEEN modules', 'Degree of unity WITHIN a single module'],
            ['Target Goal', 'LOW coupling is ideal', 'HIGH cohesion is ideal'],
            ['Best Type', 'Data Coupling', 'Functional Cohesion'],
            ['Worst Type', 'Content Coupling', 'Coincidental Cohesion'],
            ['Design Benefit', 'Limits ripple effect of changes', 'Maximizes clarity & reusability'],
          ],
        },
        realTimeExample: {
          title: 'College Portal Module Example',
          points: [
            'Data Coupling (Low): StudentModule passes only studentId to AttendanceModule to fetch attendance percentage — zero shared global state.',
            'Functional Cohesion (High): StudentRegistrationModule exclusively contains validateDetails(), generateStudentId(), and saveStudentRecord().',
          ],
        },
        conclusion:
          'Achieving low coupling and high cohesion produces modular systems where individual features can be modified, tested, and reused independently with minimal maintenance cost.',
        pageBlueprint: [
          { page: 'Page 1', focus: 'Introduction & Coupling Definition + Types 1–6', checklist: 'Define coupling; explain all 6 types from Content to Data with examples.' },
          { page: 'Page 2', focus: 'Cohesion Definition + Types 1–7', checklist: 'Define cohesion; explain all 7 types from Coincidental to Functional.' },
          { page: 'Page 3', focus: 'Spectrum Diagram & Comparison Table', checklist: 'Draw Coupling/Cohesion ladders + Low vs High visual module sketch + table.' },
          { page: 'Page 4', focus: 'How to Achieve Low Coupling & High Cohesion', checklist: 'List all 10 actionable engineering steps + College Portal example.' },
          { page: 'Page 5', focus: 'Benefits & Conclusion', checklist: 'Detail maintainability, testability, reuse benefits and conclude.' },
        ],
        unit3DIndex: 2,
      },
      {
        id: 'u3-13m-2',
        number: 2,
        question:
          'Explain Design Principles, Design Metrics, Top-Down, Bottom-Up, and Hybrid Design.',
        marksLabel: '13 / 16 Marks',
        diagramId: 'u3-design-approaches',
        diagramTitle: 'Top-Down, Bottom-Up & Hybrid Design Architecture',
        sketchTips: [
          'Draw Top-Down as a tree branching downwards from Main System → Subsystems → Leaf Modules.',
          'Draw Bottom-Up as reusable leaf utility blocks merging upwards into Subsystems → Complete System.',
          'Draw Hybrid showing top-down architectural blueprint meeting bottom-up reusable library components in the middle.',
        ],
        introduction:
          'Software Design transforms SRS requirements into a concrete technical blueprint specifying system architecture, modules, interfaces, and data structures. Design principles guide sound decisions while design metrics quantify structural quality.',
        sections: [
          {
            heading: '1. Ten Core Software Design Principles',
            bullets: [
              '1. Abstraction — Highlight essential concepts while suppressing low-level noise.',
              '2. Modularity — Partition complex systems into cohesive, manageable modules.',
              '3. Information Hiding — Encapsulate internal data and logic behind clean interfaces.',
              '4. Separation of Concerns — Isolate distinct system aspects (UI, business rules, persistence).',
              '5. Low Coupling & 6. High Cohesion — Minimize inter-module dependency and maximize intra-module focus.',
              '7. Reusability — Build generalized components usable across features.',
              '8. Simplicity (KISS) — Avoid speculative complexity.',
              '9. Maintainability & 10. Consistency — Enforce uniform conventions for effortless evolution.',
            ],
          },
          {
            heading: '2. Quantitative Software Design Metrics',
            formula: 'V(G) = E - N + 2P',
            bullets: [
              'Cyclomatic Complexity V(G) = E - N + 2P (E = edges, N = nodes, P = connected components, usually 1). Counts independent execution paths and minimum test cases.',
              'Fan-In: Number of higher-level modules calling a given module (high fan-in indicates strong reuse).',
              'Fan-Out: Number of lower-level modules called by a module (excessive fan-out signals poor decomposition).',
              'Coupling & Cohesion Metrics, Module Size (LOC / Function Points), and Depth of Inheritance Tree (DIT) in OOP.',
            ],
          },
          {
            heading: '3. Top-Down, Bottom-Up, and Hybrid Design Strategies',
            bullets: [
              'Top-Down Design: Begins with the complete problem and iteratively decomposes it into subsystems and atomic modules via stepwise refinement. Strong architectural clarity, but may miss existing reusable utilities.',
              'Bottom-Up Design: Builds and unit-tests foundational reusable components first, then composes them into larger subsystems. Maximizes reuse, but global architecture can drift if unguided.',
              'Hybrid Design: Combines both—establishes top-down architectural subsystems while building and plugging in bottom-up reusable service libraries.',
            ],
          },
        ],
        comparisonTable: {
          title: 'Top-Down vs Bottom-Up vs Hybrid Design',
          headers: ['Strategy', 'Starting Point', 'Primary Strength', 'Key Limitation'],
          rows: [
            ['Top-Down', 'Complete system vision', 'Clear architecture & planning', 'Low-level reuse may be overlooked'],
            ['Bottom-Up', 'Low-level reusable modules', 'High component reuse & easy unit testing', 'Overall structure harder to steer early'],
            ['Hybrid', 'Both architecture & core utilities', 'Balanced clarity + component reuse', 'Needs coordinated governance'],
          ],
        },
        realTimeExample: {
          title: 'Hybrid Design in an Online Shopping Platform',
          points: [
            'Top-Down: Partition platform into User Management, Product Catalog, Order Service, and Payment Service.',
            'Bottom-Up: Develop reusable Auth Token utility, DB Connection Pool, Notification Sender, and Currency Formatter libraries shared across all services.',
          ],
        },
        conclusion:
          'Combining timeless design principles, measurable complexity metrics like V(G), and a hybrid design strategy ensures architectures remain clean, scalable, and cost-effective to evolve.',
        pageBlueprint: [
          { page: 'Page 1', focus: 'Design Intro & 10 Principles', checklist: 'Define software design; explain Abstraction, Modularity, Info Hiding, Separation of Concerns, etc.' },
          { page: 'Page 2', focus: 'Design Metrics & Cyclomatic Formula', checklist: 'Explain Fan-in, Fan-out, DIT, and write V(G) = E - N + 2P with a worked example.' },
          { page: 'Page 3', focus: 'Top-Down & Bottom-Up Diagrams', checklist: 'Draw inverted tree (Top-Down) and upward composition (Bottom-Up) diagrams.' },
          { page: 'Page 4', focus: 'Hybrid Design & Shopping Example', checklist: 'Explain Hybrid approach + Online Shopping example + 3-way comparison table.' },
          { page: 'Page 5', focus: 'Pros/Cons & Conclusion', checklist: 'Summarize strengths/limits of each strategy and write conclusion.' },
        ],
        unit3DIndex: 2,
      },
      {
        id: 'u3-13m-3',
        number: 3,
        question: 'Explain Functional-Oriented Design (FOD) vs Object-Oriented Design (OOD).',
        marksLabel: '13 / 16 Marks',
        diagramId: 'u3-fod-ood',
        diagramTitle: 'Functional Decomposition vs Object-Oriented Class Architecture',
        sketchTips: [
          'Left side (FOD): Draw a top-down Structure Chart (Student System → Add / Update / Search / Report) sharing a central Data Store.',
          'Right side (OOD): Draw encapsulated Class boxes (Student, Course, Attendance) holding private data + public methods communicating via messages.',
        ],
        introduction:
          'Functional-Oriented Design (FOD) and Object-Oriented Design (OOD) represent the two foundational paradigms for structuring software systems: one organizes around procedures operating on shared data, while the other bundles state and behavior into autonomous objects.',
        sections: [
          {
            heading: '1. Functional-Oriented Design (FOD)',
            paragraphs: [
              'Decomposes a system top-down into a hierarchy of functions/procedures. System state is often centralized and passed between functions.',
            ],
            bullets: [
              'Tools: Data Flow Diagrams (DFD), Structure Charts, Flowcharts, Data Dictionaries.',
              'Example (Student System): Separate procedures addStudent(), updateStudent(), deleteStudent(), searchStudent(), generateReport().',
            ],
            prosCons: {
              advantages: [
                'Straightforward and intuitive for small, algorithmic, or procedural tasks.',
                'Functions can be coded and traced sequentially.',
              ],
              disadvantages: [
                'Changing a shared data structure can break multiple dependent functions.',
                'Limited encapsulation and weaker large-scale reuse.',
              ],
            },
          },
          {
            heading: '2. Object-Oriented Design (OOD)',
            paragraphs: [
              'Models the software around real-world entities (objects) that encapsulate both attributes (data) and methods (behavior) within classes.',
            ],
            bullets: [
              'Pillars: Encapsulation, Abstraction, Inheritance, and Polymorphism.',
              'Tools: UML Class, Sequence, Use Case, and State Diagrams.',
            ],
            codeBlock: {
              language: 'java',
              code: `class Student {
    private int studentId;
    private String name;

    public Student(int studentId, String name) {
        this.studentId = studentId;
        this.name = name;
    }

    public void displayDetails() {
        System.out.println(studentId + " - " + name);
    }
}`,
            },
            prosCons: {
              advantages: [
                'Strong data hiding improves security and localizes change impact.',
                'High reuse through inheritance and composition.',
                'Maps naturally to complex real-world domains.',
              ],
              disadvantages: [
                'Steeper initial modeling effort and conceptual learning curve.',
                'Can feel heavy for tiny one-off procedural scripts.',
              ],
            },
          },
        ],
        comparisonTable: {
          title: 'Functional-Oriented Design vs Object-Oriented Design',
          headers: ['Feature', 'Functional-Oriented Design (FOD)', 'Object-Oriented Design (OOD)'],
          rows: [
            ['Basic Unit', 'Function / Procedure', 'Class / Object'],
            ['Data & Logic', 'Separated; data shared across functions', 'Encapsulated together inside objects'],
            ['Decomposition', 'Top-down functional breakdown', 'Entity / responsibility modeling'],
            ['Modeling Notation', 'DFD & Structure Charts', 'UML Diagrams (Class, Sequence, etc.)'],
            ['Reuse Mechanism', 'Subroutine libraries', 'Classes, Inheritance, Polymorphism, Patterns'],
            ['Scalability', 'Best for small/medium procedural tools', 'Ideal for large, evolving enterprise apps'],
          ],
        },
        realTimeExample: {
          title: 'Student Management System in Both Paradigms',
          points: [
            'FOD structures files by actions: AddStudent(), MarkAttendance(), PrintResult() all mutating a shared student array.',
            'OOD defines Student, Course, Teacher, Attendance, and Result classes—each guarding its own state and exposing safe methods.',
          ],
        },
        conclusion:
          'While Functional-Oriented Design excels in streamlined computational pipelines, Object-Oriented Design dominates modern large-scale software engineering due to encapsulation, polymorphism, and superior long-term maintainability.',
        pageBlueprint: [
          { page: 'Page 1', focus: 'Introduction & FOD Characteristics', checklist: 'Define FOD, explain top-down functional decomposition, tools (DFD), pros/cons.' },
          { page: 'Page 2', focus: 'OOD Characteristics & 4 Pillars', checklist: 'Explain OOD, Encapsulation, Inheritance, Polymorphism, Abstraction + Java code.' },
          { page: 'Page 3', focus: 'Side-by-Side Architecture Diagram', checklist: 'Draw FOD Structure Chart vs OOD Class Interaction diagram.' },
          { page: 'Page 4', focus: 'Student System Example & Comparison Table', checklist: 'Compare Student Management in FOD vs OOD + 6-row comparison table.' },
          { page: 'Page 5', focus: 'Selection Guidance & Conclusion', checklist: 'Summarize when to pick FOD vs OOD + clean conclusion.' },
        ],
        unit3DIndex: 2,
      },
    ],
  },
];
