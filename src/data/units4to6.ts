import type { UnitData } from '../types/syllabus';

export const UNITS_4_TO_6: UnitData[] = [
  {
    id: 'unit-4',
    unitNumber: 4,
    title: 'Design Patterns & Software Architecture',
    shortTitle: 'Patterns & UI',
    summary:
      'Covers MVC architecture with real-time e-commerce trace, GoF Design Patterns (Observer, Adapter, Strategy, Facade, Command, Proxy, Pub-Sub), Architectural Styles, and UI Design.',
    twoMarks: [
      {
        id: 'u4-2m-1',
        number: 1,
        question: 'What is a Design Pattern? Mention its three main categories.',
        answerParagraph:
          'A Design Pattern is a general, proven, reusable solution template to a recurring software design problem within a given context.',
        answerBullets: [
          '1. Creational Patterns (object instantiation — e.g., Singleton, Factory).',
          '2. Structural Patterns (class/object composition — e.g., Adapter, Facade, Proxy).',
          '3. Behavioral Patterns (object communication & responsibility — e.g., Observer, Strategy, Command).',
        ],
        keyTerms: ['Creational', 'Structural', 'Behavioral', 'Reusable solution'],
      },
      {
        id: 'u4-2m-2',
        number: 2,
        question: 'What is the MVC (Model-View-Controller) Pattern?',
        answerBullets: [
          'Model: Manages core application data, database access, and business validation rules.',
          'View: Renders the user interface and presents data to the user.',
          'Controller: Accepts user input, invokes the Model, and selects the View to render.',
        ],
        keyTerms: ['Model', 'View', 'Controller', 'Separation of concerns'],
      },
      {
        id: 'u4-2m-3',
        number: 3,
        question: 'Differentiate Adapter Pattern vs Facade Pattern.',
        table: {
          headers: ['Adapter Pattern', 'Facade Pattern'],
          rows: [
            ['Converts one existing interface into another expected interface.', 'Provides a simplified unified interface over a complex subsystem.'],
            ['Makes two incompatible classes cooperate.', 'Hides internal complexity of multiple subsystem classes.'],
            ['Example: Wrapping a legacy payment API for a new checkout.', 'Example: One "Book Ticket" facade coordinating payment, seat lock, and SMS.'],
          ],
        },
        keyTerms: ['Interface conversion', 'Subsystem simplification', 'Structural patterns'],
      },
      {
        id: 'u4-2m-4',
        number: 4,
        question: 'What is an Architectural Style? Give examples.',
        answerParagraph:
          'An Architectural Style is a high-level structural blueprint specifying component types, connectors, and interaction rules for organizing an entire software system.',
        answerBullets: [
          'Examples: Layered Architecture, Client-Server, N-Tiered Architecture, Pipe-and-Filter, Event-Driven / Microservices.',
        ],
        keyTerms: ['Components & connectors', 'Layered', 'Client-Server', 'Pipe-and-Filter'],
      },
    ],
    longAnswers: [
      {
        id: 'u4-13m-1',
        number: 1,
        question: 'Explain MVC Pattern with diagram and real-time example.',
        isHighPriority: true,
        marksLabel: '13 / 16 Marks',
        diagramId: 'u4-mvc',
        diagramTitle: 'Model-View-Controller (MVC) Request-Response Cycle',
        sketchTips: [
          'Draw a triangle of 3 labeled boxes: Controller (top/left), Model (right/bottom), View (bottom/left), with the User icon outside.',
          'Number the arrows 1 through 5: User Action → Controller → Model Update → Model Notifies/Returns Data → View Renders UI back to User.',
        ],
        introduction:
          'Model-View-Controller (MVC) is a foundational architectural pattern that separates an application into three decoupled concerns—data/business logic (Model), user presentation (View), and request coordination (Controller)—boosting maintainability and parallel team development.',
        sections: [
          {
            heading: '1. Three Core Components of MVC',
            bullets: [
              'Model: Encapsulates domain entities, business rules, data validation, and database queries. Independent of UI formatting.',
              'View: Presents data visually to the user (HTML/React screens, dashboards, forms) and captures user gestures without embedding heavy business logic.',
              'Controller: Acts as the traffic coordinator—receives HTTP/UI requests, parses parameters, invokes Model operations, and binds results to the appropriate View.',
            ],
          },
          {
            heading: '2. Eight-Step Working Cycle of MVC',
            orderedSteps: [
              'User interacts with a control in the View (e.g., clicks "Add to Cart").',
              'The request is routed to the corresponding Controller.',
              'Controller validates and extracts request payload.',
              'Controller invokes the relevant Model method.',
              'Model applies business rules and reads/writes the database.',
              'Model returns updated state/results to the Controller.',
              'Controller chooses the appropriate View and passes the updated data.',
              'View renders the refreshed interface to the user.',
            ],
            prosCons: {
              advantages: [
                'Clean separation of concerns simplifies debugging and maintenance.',
                'Frontend (View) and backend (Model/Controller) teams can work in parallel.',
                'Multiple Views (Web, Mobile, PDF report) can share one Model.',
                'Highly testable business logic isolated from UI rendering.',
              ],
              disadvantages: [
                'Introduces extra files and indirection for trivial micro-apps.',
                'Requires disciplined conventions so logic does not leak into Views or bloated Controllers.',
              ],
              applications: [
                'E-commerce sites, College portals, Banking web apps, Spring MVC, Django, Ruby on Rails, ASP.NET MVC.',
              ],
            },
          },
        ],
        realTimeExample: {
          title: 'Real-Time Example — Online Shopping "Add to Cart"',
          points: [
            'Model: Product, Customer, Cart, and Order classes managing prices, stock checks, and totals.',
            'View: ProductListingPage, ShoppingCartView, and CheckoutPaymentView.',
            'Controller: CartController.addItem(productId) checks inventory via Product Model, updates Cart Model, and renders the refreshed ShoppingCartView.',
          ],
        },
        conclusion:
          'By cleanly decoupling presentation, control flow, and domain logic, MVC remains one of the most durable and scalable patterns for interactive web and mobile software.',
        pageBlueprint: [
          { page: 'Page 1', focus: 'Introduction & Role of Separation of Concerns', checklist: 'Define MVC, explain why decoupling UI from logic matters.' },
          { page: 'Page 2', focus: 'Detailed Breakdown of Model, View, Controller', checklist: 'Explain responsibilities and examples of each of the 3 components.' },
          { page: 'Page 3', focus: 'MVC Architecture Diagram & 8-Step Flow', checklist: 'Draw labeled MVC triangle with numbered arrows + 8-step request trace.' },
          { page: 'Page 4', focus: 'Real-Time Online Shopping Example', checklist: 'Walk through Add-to-Cart showing exact Model, View, and Controller classes.' },
          { page: 'Page 5', focus: 'Advantages, Disadvantages, Frameworks & Conclusion', checklist: 'List pros/cons, real frameworks (Rails, Spring, Django) + conclusion.' },
        ],
        unit3DIndex: 3,
      },
      {
        id: 'u4-13m-2',
        number: 2,
        question:
          'Explain any 4 Design Patterns: Observer, Adapter, Strategy, Facade (plus Publish-Subscribe, Command, Proxy) with examples.',
        marksLabel: '13 / 16 Marks',
        diagramId: 'u4-patterns',
        diagramTitle: 'Design Patterns Visual Reference (Observer, Adapter, Strategy, Facade)',
        sketchTips: [
          'Observer: Subject box with attach()/notify() pointing to multiple ConcreteObserver boxes.',
          'Adapter: Client → Target Interface ← Adapter → Adaptee (legacy service).',
          'Strategy: Context holding a Strategy interface implemented by UPI, Card, NetBanking strategies.',
          'Facade: Client → Single Facade box → 3 hidden Subsystem boxes (Payment, SeatLock, TicketGen).',
        ],
        introduction:
          'Design patterns capture time-tested architectural solutions from the Gang of Four (GoF) catalog, enabling developers to build flexible, loosely coupled systems using a shared design vocabulary.',
        sections: [
          {
            heading: '1. Observer Pattern (Behavioral)',
            paragraphs: [
              'Defines a one-to-many dependency so that whenever a Subject changes state, all subscribed Observers are notified and updated automatically.',
            ],
            bullets: [
              'Working: Observers register with Subject → Subject state changes → Subject iterates list and calls update() on every Observer.',
              'Real-Time Example: YouTube Channel subscriptions—uploading a video triggers automatic push notifications to all subscribed users.',
              'Benefit: Loose coupling; new subscribers can be added without modifying the Subject.',
            ],
          },
          {
            heading: '2. Adapter Pattern (Structural)',
            paragraphs: [
              'Acts as a bridge converting the interface of an existing class (Adaptee) into the target interface expected by the Client.',
            ],
            bullets: [
              'Working: Client calls Target interface → Adapter translates call parameters → Adaptee executes operation → Adapter returns normalized output.',
              'Real-Time Example: Integrating a legacy XML-based Bank Gateway into a modern JSON-based e-commerce checkout.',
              'Benefit: Reuses battle-tested legacy code without altering its source.',
            ],
          },
          {
            heading: '3. Strategy Pattern (Behavioral)',
            paragraphs: [
              'Encapsulates a family of interchangeable algorithms behind a common interface so the algorithm can be swapped dynamically at runtime.',
            ],
            bullets: [
              'Working: Context holds a reference to Strategy interface → Client selects concrete algorithm at runtime → Context delegates execution.',
              'Real-Time Example: E-commerce Payment Checkout switching dynamically between UPIPayment, CreditCardPayment, and NetBankingPayment without massive if-else ladders.',
              'Benefit: Follows Open/Closed Principle—add new payment strategies without editing checkout logic.',
            ],
          },
          {
            heading: '4. Facade Pattern (Structural)',
            paragraphs: [
              'Provides a single high-level unified entry point that orchestrates a complex web of underlying subsystem classes.',
            ],
            bullets: [
              'Working: Client calls one simple Facade method → Facade coordinates Subsystem A, B, and C in order → returns concise result.',
              'Real-Time Example: A single bookTicket() method on BookingFacade orchestrating SeatInventory, PaymentService, PNRGenerator, and EmailNotifier.',
              'Benefit: Simplifies client code and shields callers from subsystem refactoring.',
            ],
          },
          {
            heading: '5. Quick Exam Bonus Notes (Command, Proxy & Publish-Subscribe)',
            bullets: [
              'Command (Behavioral): Encapsulates a request as an object (e.g., Text Editor Undo/Redo action stack).',
              'Proxy (Structural): Provides a surrogate placeholder controlling access, caching, or lazy loading to a real object (e.g., Image Proxy loading high-res assets on demand).',
              'Publish-Subscribe (Messaging/Event): Decouples Publishers and Subscribers via an intermediate Message Broker/Event Bus (e.g., Kafka order events notifying Inventory and Analytics independently).',
            ],
          },
        ],
        comparisonTable: {
          title: 'Design Patterns Comparison Matrix',
          headers: ['Pattern', 'Category', 'Core Intent', 'Real-Time Example'],
          rows: [
            ['Observer', 'Behavioral', 'Notify multiple dependents on state change', 'YouTube channel notifications'],
            ['Adapter', 'Structural', 'Translate incompatible interfaces', 'Legacy payment gateway wrapper'],
            ['Strategy', 'Behavioral', 'Swap algorithms cleanly at runtime', 'UPI / Card / NetBanking checkout'],
            ['Facade', 'Structural', 'Simplify a complex multi-class subsystem', 'One-click online ticket booking'],
            ['Command', 'Behavioral', 'Encapsulate actions for queuing & undo', 'Editor Undo/Redo stack'],
            ['Proxy', 'Structural', 'Control access or lazy-load target object', 'API auth proxy / virtual image'],
          ],
        },
        realTimeExample: {
          title: 'How All 4 Patterns Work Together in E-Commerce',
          points: [
            'CheckoutFacade hides inventory, shipping, and billing complexity.',
            'PaymentStrategy lets shoppers pick UPI or Card at runtime, using BankAdapter for legacy banks.',
            'OrderObserver automatically alerts Email, SMS, and Warehouse services once payment succeeds.',
          ],
        },
        conclusion:
          'Mastering structural and behavioral design patterns eliminates brittle conditional code and yields clean, extensible architectures that adapt effortlessly to new requirements.',
        pageBlueprint: [
          { page: 'Page 1', focus: 'Pattern Intro & Observer Pattern', checklist: 'Define Design Pattern + GoF categories; draw & explain Observer + YouTube example.' },
          { page: 'Page 2', focus: 'Adapter Pattern', checklist: 'Draw Client-Adapter-Adaptee diagram, steps, payment API example, pros.' },
          { page: 'Page 3', focus: 'Strategy Pattern', checklist: 'Draw Context-Strategy hierarchy, payment checkout example, Open/Closed benefit.' },
          { page: 'Page 4', focus: 'Facade Pattern (+ Bonus Notes)', checklist: 'Draw Facade hiding 3 subsystems, booking example, plus brief Command/Proxy/Pub-Sub note.' },
          { page: 'Page 5', focus: 'Comparison Matrix & Conclusion', checklist: 'Write 4–6 row comparison table + concise concluding summary.' },
        ],
        unit3DIndex: 3,
      },
      {
        id: 'u4-13m-3',
        number: 3,
        question:
          'Explain Architectural Styles: Layered, Client-Server, Tiered, and Pipe-and-Filter with diagrams.',
        marksLabel: '13 / 16 Marks',
        diagramId: 'u4-architecture',
        diagramTitle: 'Software Architectural Styles (Layered, Client-Server, Tiered, Pipe-and-Filter)',
        sketchTips: [
          'Layered: 4 stacked horizontal rectangles (Presentation → Business Logic → Data Access → Database) with vertical neighbor-only arrows.',
          'Client-Server: Multiple Client nodes sending Request arrows across a Network cloud to a central Server + DB.',
          'Tiered (3-Tier): Physically separated Client Machine ↔ Application Server ↔ Database Server.',
          'Pipe-and-Filter: Left-to-right chain of Filter boxes joined by Pipe arrows (Source → Lexer → Parser → Semantic → CodeGen → Binary).',
        ],
        introduction:
          'Software Architecture defines the macro-level organization of a system into components, connectors, and deployment boundaries. Architectural styles offer battle-tested structural patterns tailored to different scalability, modularity, and processing goals.',
        sections: [
          {
            heading: '1. Layered Architecture',
            paragraphs: [
              'Organizes code into strict horizontal layers where each layer provides services only to the layer directly above it.',
            ],
            bullets: [
              '4 Standard Layers: Presentation Layer (UI) → Business Logic Layer (Rules) → Data Access Layer (ORM/Queries) → Database Layer (Storage).',
              'Example: College Management Portal.',
              'Pros: Clear separation of responsibilities, easy testing and maintenance. Cons: Request traversal overhead across layers.',
            ],
          },
          {
            heading: '2. Client-Server Architecture',
            paragraphs: [
              'Partitions the system into service requesters (Clients) and centralized service providers (Servers) communicating over a network.',
            ],
            bullets: [
              'Working: Client sends request → Server authenticates & processes → Server queries DB → Server returns response.',
              'Example: Web browser requesting pages from an HTTP Web Server.',
              'Pros: Centralized data management and security. Cons: Single point of failure & server bottleneck under heavy load.',
            ],
          },
          {
            heading: '3. Tiered (3-Tier / N-Tier) Architecture',
            paragraphs: [
              'Physically distributes logical layers across separate computing nodes (tiers) to scale and secure each tier independently.',
            ],
            bullets: [
              'Three Physical Tiers: Presentation Tier (Browser/Mobile) ↔ Application Tier (App Servers / API Cluster) ↔ Data Tier (Dedicated Database Server).',
              'Example: Large-scale Online Shopping / Banking systems.',
              'Pros: Independent horizontal scaling, stronger firewall isolation. Cons: Network latency and deployment complexity.',
            ],
          },
          {
            heading: '4. Pipe-and-Filter Architecture',
            paragraphs: [
              'Processes data streams sequentially through independent, stateless transformation components (Filters) connected by unidirectional data channels (Pipes).',
            ],
            bullets: [
              'Example — Compiler Pipeline: Source Code → [Lexical Analyzer] → [Syntax Parser] → [Semantic Analyzer] → [Optimizer] → [Code Generator] → Machine Code.',
              'Pros: Highly reusable filters, easy to insert/reorder steps, supports concurrent streaming. Cons: Poor fit for interactive GUI workflows; parsing overhead between pipes.',
            ],
          },
        ],
        comparisonTable: {
          title: 'Architectural Styles Comparison',
          headers: ['Style', 'Core Structure', 'Primary Advantage', 'Typical Example'],
          rows: [
            ['Layered', 'Stacked logical layers', 'Modular maintainability', 'College Portal / Enterprise ERP'],
            ['Client-Server', 'Request-Response nodes', 'Centralized data & security', 'Web Browser & Web Server'],
            ['Tiered (3-Tier)', 'Physically separated servers', 'Independent tier scalability', 'E-commerce & Cloud Banking'],
            ['Pipe-and-Filter', 'Sequential stream filters', 'Filter reuse & composable pipeline', 'Compilers, Unix shell, ETL'],
          ],
        },
        realTimeExample: {
          title: 'Compiler as a Classic Pipe-and-Filter System',
          points: [
            'Each compiler phase (Lexer, Parser, Semantic Checker, Code Generator) acts as an isolated filter reading token/AST streams from the previous pipe.',
            'Adding an optimization filter requires zero edits to the Lexer or Parser.',
          ],
        },
        conclusion:
          'Selecting the right architectural style early aligns the codebase with non-functional targets such as scalability, security, maintainability, and throughput.',
        pageBlueprint: [
          { page: 'Page 1', focus: 'Architecture Intro & Layered Style', checklist: 'Define architectural style; draw 4-layer stack + pros/cons/example.' },
          { page: 'Page 2', focus: 'Client-Server Style', checklist: 'Draw multi-client to server diagram, 5-step working, pros/cons.' },
          { page: 'Page 3', focus: 'Tiered (3-Tier) Style', checklist: 'Draw 3 physical tiers (Client, App Server, DB Server), explain difference from Layered.' },
          { page: 'Page 4', focus: 'Pipe-and-Filter Style & Compiler Example', checklist: 'Draw horizontal compiler filter chain + explain pipes & filters.' },
          { page: 'Page 5', focus: 'Comparison Table & Conclusion', checklist: 'Write 4-row style comparison matrix and conclusion.' },
        ],
        unit3DIndex: 3,
      },
      {
        id: 'u4-13m-4',
        number: 4,
        question: 'Explain User Interface (UI) Design — Principles and Process.',
        marksLabel: '13 / 16 Marks',
        diagramId: 'u4-ui-process',
        diagramTitle: '9-Stage User Interface (UI) Design Lifecycle',
        sketchTips: [
          'Draw a crisp 3x3 snake-flow diagram: 1. User Research → 2. Requirement Analysis → 3. Info Architecture → 4. Wireframing → 5. Prototyping → 6. Visual Design → 7. Usability Testing → 8. Implementation → 9. Evaluation.',
          'Add an iterative feedback arrow from Usability Testing back to Wireframing/Prototyping.',
        ],
        introduction:
          'User Interface (UI) Design focuses on crafting the visual screens, navigation structures, controls, and interactive feedback through which humans communicate with software. Even a powerful backend fails if its UI is confusing or inaccessible.',
        sections: [
          {
            heading: '1. Ten Essential UI Design Principles',
            orderedSteps: [
              'Simplicity — Keep screens uncluttered; remove unnecessary controls.',
              'Consistency — Reuse predictable colors, fonts, icons, and button positions.',
              'Visibility — Keep critical status and primary actions immediately discoverable.',
              'Immediate Feedback — Confirm every user action clearly (e.g., "Payment Successful").',
              'Error Prevention — Use inline validation and confirmation prompts to stop costly mistakes.',
              'User Control & Freedom — Support Cancel, Back, and Undo actions gracefully.',
              'Accessibility (WCAG) — Ensure 4.5:1 contrast, readable typography, and keyboard navigation.',
              'Learnability — Enable first-time users to accomplish tasks without manuals.',
              'Efficiency — Provide shortcuts and fast access to frequent actions.',
              'Responsive Design — Adapt cleanly across mobile, tablet, and desktop viewports.',
            ],
          },
          {
            heading: '2. Nine-Step UI Design Process',
            orderedSteps: [
              'User Research — Interview target users, define personas and pain points.',
              'Requirement Analysis — Map user tasks into required screens and interactions.',
              'Information Architecture — Organize menus, hierarchy, and navigation flows.',
              'Wireframing — Sketch low-fidelity structural layouts.',
              'Prototyping — Build clickable interactive mockups.',
              'Visual Design — Apply typography, color hierarchy, spacing, and iconography.',
              'Usability Testing — Observe real users completing tasks to uncover friction.',
              'Implementation — Translate verified designs into semantic frontend code.',
              'Post-Launch Evaluation — Monitor analytics and user feedback for continuous refinement.',
            ],
            prosCons: {
              advantages: [
                'Dramatically increases user satisfaction and adoption.',
                'Reduces human input errors and support tickets.',
                'Shortens onboarding time and improves accessibility for all abilities.',
              ],
              disadvantages: [
                'Requires upfront user research and iterative testing time.',
                'Poorly governed visual changes can create inconsistency across teams.',
              ],
            },
          },
        ],
        realTimeExample: {
          title: 'Good UI Design — College Student Portal',
          points: [
            'Clean single-screen login with inline validation and password-reset recovery.',
            'Role-based Student Dashboard displaying Attendance %, Exam Results, and Fee Payment status at a glance.',
            'Consistent top navigation and responsive mobile layout so students check timetables effortlessly on phones.',
          ],
        },
        conclusion:
          'Disciplined UI design unites human-centered research, clear visual principles, and iterative usability testing to turn complex software capabilities into effortless everyday experiences.',
        pageBlueprint: [
          { page: 'Page 1', focus: 'UI Design Intro & Principles 1–5', checklist: 'Define UI design; explain Simplicity, Consistency, Visibility, Feedback, Error Prevention.' },
          { page: 'Page 2', focus: 'Principles 6–10', checklist: 'Explain User Control, Accessibility, Learnability, Efficiency, Responsive Design.' },
          { page: 'Page 3', focus: '9-Step UI Process Diagram', checklist: 'Draw 9-step flowchart with Usability Testing feedback loop.' },
          { page: 'Page 4', focus: 'Detailed Process Steps & College Portal Example', checklist: 'Explain each step briefly + walk through the College Portal UI.' },
          { page: 'Page 5', focus: 'Benefits & Conclusion', checklist: 'List advantages of good UI design + wrap up cleanly.' },
        ],
        unit3DIndex: 3,
      },
    ],
  },
  {
    id: 'unit-5',
    unitNumber: 5,
    title: 'Software Testing and Maintenance',
    shortTitle: 'Testing & Debug',
    summary:
      'Covers Black-Box vs White-Box testing, Unit/Integration/System/Regression levels, Testing Techniques, a full 14-case Railway Reservation Test Plan, Debugging, Static/Dynamic Analysis, Symbolic Execution, and Model Checking.',
    twoMarks: [
      {
        id: 'u5-2m-1',
        number: 1,
        question: 'Compare Black Box Testing vs White Box Testing.',
        table: {
          headers: ['Black Box Testing', 'White Box Testing'],
          rows: [
            ['Tests external functional behavior against specs.', 'Tests internal code structure, logic, and paths.'],
            ['No source-code knowledge required.', 'Requires full programming & source-code access.'],
            ['Techniques: Equivalence Partitioning, BVA.', 'Techniques: Statement, Branch, Path Coverage.'],
          ],
        },
        keyTerms: ['Input/Output', 'Internal logic', 'BVA', 'Branch coverage'],
      },
      {
        id: 'u5-2m-2',
        number: 2,
        question: 'Compare Unit Testing vs Integration Testing.',
        table: {
          headers: ['Unit Testing', 'Integration Testing'],
          rows: [
            ['Tests individual functions, classes, or modules in isolation.', 'Tests combined modules interacting across interfaces.'],
            ['Performed first by developers.', 'Performed after unit testing (Top-Down, Bottom-Up, Big Bang).'],
            ['Uncovers internal logic bugs inside a module.', 'Uncovers data-transfer & interface mismatches between modules.'],
          ],
        },
        keyTerms: ['Isolated module', 'Module interfaces', 'Stubs & drivers'],
      },
      {
        id: 'u5-2m-3',
        number: 3,
        question: 'What is Regression Testing?',
        answerParagraph:
          'Regression Testing is the selective re-execution of previously passed test suites after code modifications, bug fixes, or feature additions to ensure existing working functionality has not been broken.',
        answerBullets: [
          'Example: After adding UPI payment, re-testing Login, Cart, and Credit Card checkout.',
        ],
        keyTerms: ['Re-testing after changes', 'Prevent regressions', 'Automation'],
      },
      {
        id: 'u5-2m-4',
        number: 4,
        question: 'Differentiate Testing vs Debugging.',
        table: {
          headers: ['Testing', 'Debugging'],
          rows: [
            ['Goal: Detect the presence of defects/failures.', 'Goal: Locate the root cause and fix the defect.'],
            ['Can be planned and automated upfront.', 'Investigative process triggered after a failure occurs.'],
            ['Performed by QA testers and developers.', 'Performed primarily by developers.'],
          ],
        },
        keyTerms: ['Detect defects', 'Root cause & fix', 'QA vs Developer'],
      },
    ],
    longAnswers: [
      {
        id: 'u5-13m-1',
        number: 1,
        question:
          'Explain Black Box, White Box, Unit, Integration, System, and Regression Testing with examples.',
        isHighPriority: true,
        marksLabel: '13 / 16 Marks',
        diagramId: 'u5-testing-levels',
        diagramTitle: 'Software Testing Levels Pyramid & Black/White Box Comparison',
        sketchTips: [
          'Draw the 4-tier Testing Pyramid / Progression: Unit Testing (Base) → Integration Testing → System Testing → Acceptance Testing, with a Regression Testing loop wrapping updates.',
          'Draw two mini diagrams: Black Box (Input → Opaque Box → Output) and White Box (Input → Visible if/else Flowchart → Output).',
        ],
        introduction:
          'Software Testing is the systematic evaluation of software artifacts to verify conformance to requirements and expose defects before release, ensuring high reliability, security, and performance.',
        sections: [
          {
            heading: '1. Black Box Testing (Behavioral / Specification-Based)',
            paragraphs: [
              'Validates external inputs and outputs strictly against requirements without inspecting internal code.',
            ],
            table: {
              title: 'Black Box Example — Login Validation',
              headers: ['Test Input', 'Expected Output'],
              rows: [
                ['Valid username & valid password', 'Login successful → Dashboard'],
                ['Valid username & wrong password', 'Error: Invalid credentials'],
                ['Empty username or password', 'Validation prompt: Fields required'],
              ],
            },
            bullets: [
              'Techniques: Equivalence Partitioning, Boundary Value Analysis (BVA), Decision Tables, State Transition Testing.',
            ],
          },
          {
            heading: '2. White Box Testing (Structural / Glass-Box)',
            paragraphs: [
              'Examines internal source code, control flow branches, loops, and conditions to maximize structural code coverage.',
            ],
            codeBlock: {
              language: 'python',
              code: `if marks >= 50:
    print("Pass")   # Branch 1: test with marks = 65
else:
    print("Fail")   # Branch 2: test with marks = 40`,
            },
            bullets: [
              'Techniques: Statement Coverage, Branch Coverage, Path Coverage, Condition Coverage, Loop Testing.',
            ],
          },
          {
            heading: '3. Levels of Testing: Unit, Integration, System & Regression',
            bullets: [
              'Unit Testing: Tests smallest testable code units in isolation (e.g., testing calculateCartTotal() function). Catches errors cheapest and earliest.',
              'Integration Testing: Verifies data flow across connected modules (e.g., Login → Cart → Payment → Order). Approaches: Top-Down (uses Stubs), Bottom-Up (uses Drivers), Big Bang, Sandwich.',
              'System Testing: Validates the fully integrated application end-to-end against SRS (Functional, Performance, Security, Usability, Compatibility). Example: Full Railway Reservation workflow.',
              'Regression Testing: Re-runs automated suites after every modification (e.g., ensuring existing Card checkout still passes after adding UPI) so fixed bugs never resurface.',
            ],
          },
        ],
        comparisonTable: {
          title: 'Six Testing Types Overview',
          headers: ['Testing Type', 'Scope / Focus', 'Who Performs', 'Example'],
          rows: [
            ['Black Box', 'External inputs & outputs', 'QA Testers', 'Login form test matrix'],
            ['White Box', 'Internal code paths & branches', 'Developers', '100% branch coverage on grading'],
            ['Unit', 'Single function / class', 'Developers', 'calculateTotal() price math'],
            ['Integration', 'Inter-module data exchange', 'Dev / QA', 'Cart passing totals to Payment'],
            ['System', 'Complete end-to-end app', 'QA Team', 'Full Railway booking flow'],
            ['Regression', 'Unchanged features after edits', 'Automated CI / QA', 'Re-test Card after adding UPI'],
          ],
        },
        realTimeExample: {
          title: 'Food Delivery App Testing Pipeline',
          points: [
            'Unit: Verify GST tax calculation function.',
            'Integration: Verify Cart passes exact subtotal to Payment Gateway.',
            'System: Place full order from login to delivery tracking.',
            'Regression: Re-verify coupon codes after releasing dark mode.',
          ],
        },
        conclusion:
          'Combining Black Box and White Box perspectives across Unit, Integration, System, and Regression tiers builds multi-layered defense against production failures.',
        pageBlueprint: [
          { page: 'Page 1', focus: 'Testing Intro & Black Box Testing', checklist: 'Define testing; draw Black Box sketch + Login table + techniques.' },
          { page: 'Page 2', focus: 'White Box Testing & Code Example', checklist: 'Explain structural testing, write if/else branch example, list coverage metrics.' },
          { page: 'Page 3', focus: 'Testing Levels Diagram + Unit & Integration', checklist: 'Draw Testing Pyramid; explain Unit & Integration (Top-Down/Bottom-Up/Big Bang).' },
          { page: 'Page 4', focus: 'System & Regression Testing + Comparison Table', checklist: 'Detail System testing types, Regression example + 6-row summary table.' },
          { page: 'Page 5', focus: 'End-to-End Example & Conclusion', checklist: 'Summarize Food/Railway example + crisp conclusion.' },
        ],
        unit3DIndex: 4,
      },
      {
        id: 'u5-13m-2',
        number: 2,
        question:
          'Explain Testing Techniques in detail. Create a complete Test Plan for Railway Reservation System.',
        marksLabel: '13 / 16 Marks',
        diagramId: 'u5-railway-test',
        diagramTitle: 'Boundary Value Analysis Axis & Railway Reservation State Flow',
        sketchTips: [
          'Draw a number line for Age (18–60): mark Invalid (<18: 17), Valid Boundaries (18, 19 ... 59, 60), Invalid (>60: 61).',
          'Draw Railway Ticket States: Available → Reserved → Confirmed → Cancelled → Refunded.',
        ],
        introduction:
          'Testing techniques provide systematic strategies to select high-yield test inputs without exhaustive testing, while a formal IEEE Test Plan defines the scope, strategy, schedule, environment, and test cases for validating a real-world system.',
        sections: [
          {
            heading: '1. Black Box & White Box Test Design Techniques',
            bullets: [
              'Equivalence Partitioning: Divides input domain into valid/invalid classes and picks one representative per class (e.g., Valid age 18–60 → test 12 [Invalid], 30 [Valid], 70 [Invalid]).',
              'Boundary Value Analysis (BVA): Targets error-prone edges: for 18–60, test 17, 18, 19, 59, 60, 61.',
              'Decision Table Testing: Maps combinations of conditions (Seat Available? × Payment OK?) to exact actions.',
              'State Transition Testing: Verifies valid/invalid transitions (Available → Reserved → Confirmed → Cancelled).',
              'White Box Coverage: Statement, Branch, Path, Condition, and Loop Testing (0, 1, n iterations).',
              'Non-Functional Testing: Performance, Load, Stress, Security, Usability, Compatibility, and Acceptance Testing.',
            ],
          },
          {
            heading: '2. IEEE Test Plan — Railway Reservation System',
            bullets: [
              'Objective & Scope: Verify Registration/Login, Train Search, Live Seat Availability, Passenger Entry, Booking, Payment, PNR Ticket Generation, Cancellation, and Refund.',
              'Test Environment: Windows/Linux/Android, Chrome/Firefox, MySQL/PostgreSQL, Sandbox Payment Gateway.',
              'Entry Criteria: Approved SRS, staging build deployed, test database & dummy payment cards seeded.',
              'Exit Criteria: 100% critical/high defects fixed, ≥ 95% test cases passed, Test Summary Report signed off.',
              'Deliverables: Test Plan, Test Case Matrix, Execution Log, Defect Report, Test Summary Report.',
              'Risks: Payment gateway timeout, high Tatkal traffic spikes, race conditions on last seat, network drops.',
            ],
            table: {
              title: '14-Case Railway Reservation Test Case Matrix',
              headers: ['Test ID', 'Test Scenario', 'Expected Result'],
              rows: [
                ['TC01', 'Register with valid user details', 'Account created & verification sent'],
                ['TC02', 'Login with valid credentials', 'Redirected to booking dashboard'],
                ['TC03', 'Login with wrong password', 'Clear invalid-credentials error shown'],
                ['TC04', 'Search valid Source, Destination & Date', 'Matching trains with schedules listed'],
                ['TC05', 'Search with missing destination field', 'Inline validation message displayed'],
                ['TC06', 'Check live seat availability for class', 'Accurate RAC/WL/Available count shown'],
                ['TC07', 'Enter valid passenger name, age, berth', 'Passenger details accepted'],
                ['TC08', 'Book available seat and lock inventory', 'Booking moves to payment step'],
                ['TC09', 'Complete valid UPI / Card payment', 'Payment confirmed & receipt logged'],
                ['TC10', 'Simulate payment gateway failure', 'Booking NOT confirmed; seat released'],
                ['TC11', 'Generate confirmed ticket', 'Unique 10-digit PNR & PDF ticket issued'],
                ['TC12', 'Cancel confirmed ticket before chart', 'Ticket cancelled & seat freed'],
                ['TC13', 'Check refund status post-cancellation', 'Correct deduction & refund timeline shown'],
                ['TC14', 'Search invalid train number or past date', 'Graceful error message displayed'],
              ],
            },
          },
        ],
        realTimeExample: {
          title: 'BVA Applied to Passenger Age in Railway Booking',
          points: [
            'Child free travel (0–4), Half-fare (5–11), Adult (12–59), Senior Citizen (60+): BVA tests 4, 5, 11, 12, 59, 60 to verify fare-tier boundary rules.',
          ],
        },
        conclusion:
          'Applying disciplined techniques like BVA and Equivalence Partitioning within a comprehensive Test Plan guarantees the Railway Reservation System operates accurately, securely, and reliably under peak passenger demand.',
        pageBlueprint: [
          { page: 'Page 1', focus: 'Black Box Techniques', checklist: 'Explain Equivalence Partitioning, BVA (with age axis), Decision Tables, State Transitions.' },
          { page: 'Page 2', focus: 'White Box & Non-Functional Techniques', checklist: 'Explain Statement/Branch/Path/Loop coverage + Load, Stress, Security, Usability.' },
          { page: 'Page 3', focus: 'Test Plan Structure (Sections 1–5)', checklist: 'Write ID, Objective, Scope, Test Environment, Entry/Exit Criteria for Railway System.' },
          { page: 'Page 4', focus: '14-Case Railway Test Case Table', checklist: 'Draw crisp TC01–TC14 table covering Login, Search, Payment, PNR, Cancellation, Refund.' },
          { page: 'Page 5', focus: 'Deliverables, Risks & Conclusion', checklist: 'List test deliverables, 5 project risks, and final conclusion.' },
        ],
        unit3DIndex: 4,
      },
      {
        id: 'u5-13m-3',
        number: 3,
        question:
          'Explain Debugging Process, Program Analysis, Symbolic Execution, and Model Checking.',
        marksLabel: '13 / 16 Marks',
        diagramId: 'u5-debugging-formal',
        diagramTitle: 'Debugging Lifecycle, Symbolic Path Tree & Model Checking Loop',
        sketchTips: [
          'Draw 7-Step Debugging loop: Detect → Reproduce → Locate → Root Cause → Fix → Verify → Regression.',
          'Draw Symbolic Execution binary tree for `if (x > 10)`: Root `x = α` splitting into `α > 10 ("Large")` and `α <= 10 ("Small")`.',
          'Draw Model Checking box: [System Model + Safety Property] → [Model Checker] → Pass (Verified) OR Fail (Counterexample Trace).',
        ],
        introduction:
          'While testing reveals the presence of software failures, Debugging locates and repairs their root causes. Advanced verification techniques—Program Analysis, Symbolic Execution, and Model Checking—mathematically inspect code and state spaces to prevent critical defects.',
        sections: [
          {
            heading: '1. Debugging Process & Techniques',
            orderedSteps: [
              'Error Detection — Capture failure symptom from test suite or bug report.',
              'Error Reproduction — Reliably recreate the failure with minimal input.',
              'Error Location — Narrow down the offending module and line of code.',
              'Root Cause Analysis — Identify the underlying faulty assumption or logic.',
              'Error Correction — Implement a clean, minimal code fix.',
              'Verification — Re-run the failing scenario to confirm resolution.',
              'Regression Testing — Run full test suite to ensure no collateral breakage.',
            ],
            bullets: [
              'Techniques: Print/Log tracing, IDE Breakpoints, Step-by-step execution, Backtracking from crash point, Binary search / git bisect.',
            ],
          },
          {
            heading: '2. Program Analysis (Static vs Dynamic)',
            bullets: [
              'Static Analysis: Inspects source/bytecode WITHOUT executing the program (linters, type checkers, unused variable detection, SQL-injection taint scanners).',
              'Dynamic Analysis: Observes the program WHILE executing (memory leak profilers, runtime coverage, sanitizer checks, performance flamegraphs).',
            ],
          },
          {
            heading: '3. Symbolic Execution',
            paragraphs: [
              'Executes a program using abstract symbolic variables (e.g., α) instead of concrete numbers, accumulating path constraints along every branch and using SMT solvers to synthesize test inputs automatically.',
            ],
            codeBlock: {
              language: 'python',
              code: `# Symbolic input: x = α
if x > 10:
    print("Large")   # Path Condition 1: α > 10  -> Solver picks x = 11
else:
    print("Small")   # Path Condition 2: α <= 10 -> Solver picks x = 5`,
            },
            bullets: [
              'Pros: Automatically discovers deep hidden paths and edge-case bugs. Cons: Path explosion in programs with loops and complex nonlinear constraints.',
            ],
          },
          {
            heading: '4. Model Checking',
            paragraphs: [
              'An automated formal verification technique that exhaustively explores all reachable states of a finite-state system model to verify temporal-logic safety/liveness properties.',
            ],
            bullets: [
              'Working: Build formal system model → Specify property (e.g., Temporal Logic) → Exhaustively search state graph → Output "Verified" or generate an exact Counterexample trace.',
              'Example — Railway Signal Safety: Property states "Never show Green signal while track segment is occupied." Model checker proves safety or outputs the exact event sequence causing a collision.',
              'Pros: Exhaustive design-level assurance for safety-critical systems. Cons: State-space explosion on massive systems.',
            ],
          },
        ],
        comparisonTable: {
          title: 'Verification & Debugging Techniques Comparison',
          headers: ['Technique', 'Core Mechanism', 'Key Strength', 'Main Challenge'],
          rows: [
            ['Debugging', 'Reproduce, trace & patch bugs', 'Fixes concrete runtime defects', 'Manual investigative effort'],
            ['Program Analysis', 'Static inspection / Dynamic profiling', 'Fast automated bug & leak detection', 'Static false positives / runtime cost'],
            ['Symbolic Execution', 'Symbolic inputs + path constraint solving', 'Auto-generates deep path test inputs', 'Path explosion with loops'],
            ['Model Checking', 'Exhaustive state-space property check', 'Proves safety or gives counterexample', 'State-space explosion'],
          ],
        },
        realTimeExample: {
          title: 'Safety Verification in Railway Signaling',
          points: [
            'Static analysis catches null-pointer bugs in signal controller firmware.',
            'Model checking mathematically verifies that opposing tracks can never simultaneously enter the Green state.',
          ],
        },
        conclusion:
          'Combining structured debugging with static/dynamic program analysis, symbolic execution, and model checking yields high-assurance software capable of powering safety-critical domains.',
        pageBlueprint: [
          { page: 'Page 1', focus: 'Debugging 7-Step Process & Techniques', checklist: 'List all 7 debugging steps + 5 practical techniques (breakpoints, backtracking, etc.).' },
          { page: 'Page 2', focus: 'Static vs Dynamic Program Analysis', checklist: 'Contrast static (no execution) vs dynamic (runtime) analysis with clear examples.' },
          { page: 'Page 3', focus: 'Symbolic Execution + Path Tree Diagram', checklist: 'Write x > 10 code, draw symbolic branch tree, explain path conditions & path explosion.' },
          { page: 'Page 4', focus: 'Model Checking + Railway Safety Example', checklist: 'Draw Model Checker block diagram, explain counterexample trace + Railway signal example.' },
          { page: 'Page 5', focus: '4-Way Comparison Table & Conclusion', checklist: 'Write comparison matrix + strong concluding paragraph.' },
        ],
        unit3DIndex: 4,
      },
    ],
  },
  {
    id: 'unit-6',
    unitNumber: 6,
    title: 'Project Management & DevOps',
    shortTitle: 'CPM, DevOps & SCM',
    summary:
      'Covers Project Scheduling, Gantt Charts, PERT & CPM calculations (with worked critical path), DevOps Lifecycle & CI/CD Deployment Pipeline, and Software Configuration Management (SCM).',
    twoMarks: [
      {
        id: 'u6-2m-1',
        number: 1,
        question: 'What is a Gantt Chart?',
        answerParagraph:
          'A Gantt Chart is a visual project scheduling bar chart that plots project activities on the vertical axis against time on the horizontal axis, displaying task start dates, end dates, durations, overlaps, and completion progress.',
        keyTerms: ['Horizontal timeline', 'Task duration', 'Overlapping tasks', 'Progress tracking'],
      },
      {
        id: 'u6-2m-2',
        number: 2,
        question: 'Compare PERT vs CPM.',
        table: {
          headers: ['PERT', 'CPM'],
          rows: [
            ['Program Evaluation and Review Technique.', 'Critical Path Method.'],
            ['Probabilistic: uses 3 estimates (O, M, P).', 'Deterministic: uses 1 fixed duration estimate.'],
            ['Best for uncertain, R&D projects.', 'Best for predictable, repeatable projects.'],
            ['Focuses on time uncertainty & variance.', 'Focuses on critical path & time-cost trade-off.'],
          ],
        },
        keyTerms: ['3 time estimates', 'Critical path', 'Probabilistic vs Deterministic'],
      },
      {
        id: 'u6-2m-3',
        number: 3,
        question: 'What is DevOps?',
        answerParagraph:
          'DevOps is a cultural and technical methodology uniting Software Development (Dev) and IT Operations (Ops) through automation, Continuous Integration (CI), Continuous Delivery/Deployment (CD), and continuous monitoring to ship reliable software faster.',
        keyTerms: ['Dev + Ops', 'CI/CD automation', 'Continuous monitoring'],
      },
      {
        id: 'u6-2m-4',
        number: 4,
        question: 'What is Software Configuration Management (SCM)?',
        answerParagraph:
          'Software Configuration Management (SCM) is the discipline of identifying, organizing, versioning, controlling, auditing, and tracking changes to Software Configuration Items (source code, SRS, designs, tests, configs) throughout the software lifecycle.',
        keyTerms: ['Version control', 'Change control', 'SCIs', 'Auditing'],
      },
    ],
    longAnswers: [
      {
        id: 'u6-13m-1',
        number: 1,
        question:
          'Explain Project Scheduling, Gantt Chart, PERT, and CPM with worked example calculations.',
        isHighPriority: true,
        marksLabel: '13 / 16 Marks',
        diagramId: 'u6-pert-cpm',
        diagramTitle: 'Gantt Chart Timeline & CPM Critical Path Network (A → C → D → E = 13d)',
        sketchTips: [
          'Draw a 4-week Gantt chart grid with shaded horizontal bars for Requirements, Design, Coding, Testing, Deployment.',
          'Draw the CPM Network nodes A(2) → branching to B(3) and C(4) → converging at D(5) → E(2). Highlight critical path A → C → D → E with double/bold arrows!',
          'Box both PERT formulas clearly: TE = (O + 4M + P) / 6 and Variance σ² = ((P - O) / 6)².',
        ],
        introduction:
          'Software Project Scheduling organizes work breakdown tasks, estimates effort, maps inter-task dependencies, and assigns people along a timeline so the software finishes on time and within budget.',
        sections: [
          {
            heading: '1. Project Scheduling Steps & Gantt Chart',
            orderedSteps: [
              'Identify project tasks via Work Breakdown Structure (WBS).',
              'Estimate duration and effort for every task.',
              'Determine task dependencies (Finish-to-Start, parallel tasks).',
              'Allocate team members and technical resources.',
              'Build visual timeline (Gantt Chart) and monitor actual vs planned progress.',
            ],
            table: {
              title: 'Gantt Chart Example — 4-Week Module Schedule',
              headers: ['Activity', 'Week 1', 'Week 2', 'Week 3', 'Week 4'],
              rows: [
                ['Requirements', '████████', '', '', ''],
                ['System Design', '', '████████', '', ''],
                ['Coding', '', '████', '████████', ''],
                ['Testing', '', '', '', '████'],
                ['Deployment', '', '', '', '████'],
              ],
            },
          },
          {
            heading: '2. PERT (Program Evaluation and Review Technique) — Worked Calculation',
            formula: 'TE = (O + 4M + P) / 6   |   Variance σ² = ((P - O) / 6)²',
            bullets: [
              'Uses three estimates: Optimistic (O), Most Likely (M), and Pessimistic (P).',
              'Worked Exam Example: Given O = 2 days, M = 4 days, P = 8 days:',
              'Expected Time TE = (2 + 4 × 4 + 8) / 6 = 26 / 6 = 4.33 days.',
              'Variance σ² = ((8 - 2) / 6)² = (6 / 6)² = 1.00 day² (Standard Deviation σ = 1 day).',
            ],
          },
          {
            heading: '3. CPM (Critical Path Method) — Worked Network Calculation',
            table: {
              title: 'Project Activities & Dependencies',
              headers: ['Activity', 'Duration', 'Predecessor', 'Slack', 'Critical?'],
              rows: [
                ['A — Requirements', '2 days', 'None', '0 days', 'Yes'],
                ['B — Design', '3 days', 'A', '1 day', 'No'],
                ['C — Database', '4 days', 'A', '0 days', 'Yes'],
                ['D — Coding', '5 days', 'B and C', '0 days', 'Yes'],
                ['E — Testing', '2 days', 'D', '0 days', 'Yes'],
              ],
            },
            bullets: [
              'Path 1: A → B → D → E = 2 + 3 + 5 + 2 = 12 days (Slack on B = 1 day).',
              'Path 2: A → C → D → E = 2 + 4 + 5 + 2 = 13 days (Longest Path = Critical Path!).',
              'Minimum Project Duration = 13 days. Any delay on A, C, D, or E directly delays the final deadline because their total slack is zero.',
            ],
          },
        ],
        comparisonTable: {
          title: 'PERT vs CPM Summary',
          headers: ['Feature', 'PERT', 'CPM'],
          rows: [
            ['Time Model', 'Probabilistic (O, M, P)', 'Deterministic (single duration)'],
            ['Orientation', 'Event-oriented', 'Activity-oriented'],
            ['Primary Goal', 'Manage uncertain duration risk', 'Find critical path & optimize cost/time'],
            ['Best For', 'Research & novel software builds', 'Predictable engineering deployments'],
          ],
        },
        realTimeExample: {
          title: 'Try Live Calculations in the Calculators Tab',
          points: [
            'Open the Calculators view from the top navigation bar to test custom O, M, P values and edit CPM activity durations interactively.',
          ],
        },
        conclusion:
          'Gantt Charts offer instant visual tracking, PERT quantifies schedule uncertainty, and CPM pinpoints zero-slack critical tasks so project managers focus attention where delays hurt most.',
        pageBlueprint: [
          { page: 'Page 1', focus: 'Project Scheduling & Gantt Chart', checklist: 'List scheduling steps, draw 4-week Gantt chart table, pros & cons.' },
          { page: 'Page 2', focus: 'PERT Theory & Worked Calculation', checklist: 'Define O, M, P; box TE & Variance formulas; solve O=2, M=4, P=8 → 4.33d.' },
          { page: 'Page 3', focus: 'CPM Network Diagram & Path Calculation', checklist: 'Draw A–E network diagram; compute Path 1 (12d) & Path 2 (13d); mark Critical Path.' },
          { page: 'Page 4', focus: 'Slack Explanation & PERT vs CPM Table', checklist: 'Define Slack/Float (0 on critical path) + 4-row PERT vs CPM table.' },
          { page: 'Page 5', focus: 'Advantages, Disadvantages & Conclusion', checklist: 'Summarize benefits/limits of scheduling tools + wrap up.' },
        ],
        unit3DIndex: 5,
      },
      {
        id: 'u6-13m-2',
        number: 2,
        question:
          'Explain DevOps: Cloud as Platform, Deployment Pipeline, Building and Testing, and Deployment.',
        marksLabel: '13 / 16 Marks',
        diagramId: 'u6-devops',
        diagramTitle: 'DevOps 8-Stage Infinity Lifecycle & CI/CD Deployment Pipeline',
        sketchTips: [
          'Draw the DevOps Infinity Loop (∞): Left loop (Dev: Plan → Code → Build → Test), Right loop (Ops: Release → Deploy → Operate → Monitor).',
          'Below it, draw the linear CI/CD Deployment Pipeline: Git Commit → Automated Build → Unit/Integration Tests → Staging Deploy → Acceptance → Production.',
        ],
        introduction:
          'DevOps bridges the traditional wall between Software Development (Dev) and IT Operations (Ops) by combining collaborative culture, cloud infrastructure, and automated CI/CD pipelines to deliver software rapidly and reliably.',
        sections: [
          {
            heading: '1. The 8-Stage DevOps Lifecycle',
            bullets: [
              '1. Plan (user stories, sprints) → 2. Code (Git version control) → 3. Build (compile & package) → 4. Test (automated verification) → 5. Release (tag & approve) → 6. Deploy (ship to production) → 7. Operate (scale & manage infra) → 8. Monitor (metrics, logs, alerts).',
            ],
          },
          {
            heading: '2. Cloud as a Platform',
            paragraphs: [
              'Cloud platforms (AWS, Microsoft Azure, Google Cloud) supply on-demand elastic compute, managed databases, storage, and container orchestration over the internet.',
            ],
            bullets: [
              'Benefits: Auto-scaling during traffic spikes, zero physical server maintenance, Infrastructure as Code (Terraform), pay-as-you-go pricing, global availability.',
            ],
          },
          {
            heading: '3. Automated CI/CD Deployment Pipeline, Building & Testing',
            orderedSteps: [
              'Developer commits code to Git repository.',
              'CI server (GitHub Actions / Jenkins) triggers automatically.',
              'Build Stage compiles code, installs dependencies, and builds container image (Docker).',
              'Automated Test Stage runs Unit, Integration, Security, and Lint checks.',
              'Artifact deploys to Staging environment for Acceptance & Performance verification.',
              'Approved build promotes smoothly to Production with live telemetry monitoring.',
            ],
          },
          {
            heading: '4. Modern Production Deployment Strategies',
            bullets: [
              'Rolling Deployment: Gradually replaces old server instances with new version batches.',
              'Blue-Green Deployment: Runs two identical environments (Blue = live, Green = new); switches router traffic instantaneously with instant rollback.',
              'Canary Deployment: Routes 5–10% of real traffic to the new build first to verify stability before 100% rollout.',
              'Continuous Deployment: Automatically ships every commit that passes all automated quality gates.',
            ],
            prosCons: {
              advantages: [
                'Rapid, frequent releases with lower failure rates.',
                'Automated quality gates catch defects minutes after commit.',
                'Instant rollback and stronger Dev-Ops accountability.',
              ],
              disadvantages: [
                'Initial toolchain & pipeline setup requires skilled engineering.',
                'Automated pipelines and cloud security demand ongoing maintenance.',
              ],
            },
          },
        ],
        comparisonTable: {
          title: 'Standard DevOps Toolchain',
          headers: ['Pipeline Stage', 'Popular Industry Tools'],
          rows: [
            ['Version Control', 'Git, GitHub, GitLab'],
            ['Build Automation', 'Maven, Gradle, npm / Vite'],
            ['CI / CD Orchestration', 'Jenkins, GitHub Actions, GitLab CI'],
            ['Containers & Orchestration', 'Docker, Kubernetes'],
            ['Cloud Platform', 'AWS, Google Cloud, Microsoft Azure'],
            ['Monitoring & Observability', 'Prometheus, Grafana, ELK Stack'],
          ],
        },
        realTimeExample: {
          title: 'Cloud CI/CD for a University Exam Portal',
          points: [
            'During result-day traffic spikes, Cloud auto-scaling provisions extra Kubernetes pods.',
            'Blue-Green deployment ensures zero downtime when pushing urgent bug fixes during exam registration.',
          ],
        },
        conclusion:
          'DevOps combines cloud elasticity with automated build, test, and deployment pipelines so teams ship higher-quality software faster and recover from incidents in minutes.',
        pageBlueprint: [
          { page: 'Page 1', focus: 'DevOps Intro & 8-Stage Lifecycle', checklist: 'Define DevOps; draw Infinity Loop and explain Plan through Monitor.' },
          { page: 'Page 2', focus: 'Cloud as Platform', checklist: 'Explain AWS/GCP/Azure benefits (elasticity, IaC, distributed teams) + example.' },
          { page: 'Page 3', focus: 'CI/CD Deployment Pipeline Diagram', checklist: 'Draw 8-stage Commit → Build → Test → Stage → Prod pipeline; detail Build & Test.' },
          { page: 'Page 4', focus: 'Deployment Strategies & Toolchain Table', checklist: 'Explain Rolling, Blue-Green, Canary, Continuous Deployment + Tools table.' },
          { page: 'Page 5', focus: 'Advantages, Disadvantages & Conclusion', checklist: 'Summarize business & technical benefits, challenges, and conclusion.' },
        ],
        unit3DIndex: 5,
      },
      {
        id: 'u6-13m-3',
        number: 3,
        question:
          'Explain Software Configuration Management (SCM) and Software Project Management Activities.',
        marksLabel: '13 / 16 Marks',
        diagramId: 'u6-scm',
        diagramTitle: 'SCM Change Control Process & Parallel Git Branch Workflow',
        sketchTips: [
          'Draw the Change Control workflow: Change Request → Impact Analysis → CCB Approval/Reject → Implement & Test → Update Baseline & Audit.',
          'Draw a Git Branch diagram showing `main` branch with parallel feature branches (`login`, `attendance`, `dashboard`) merging via Pull Request into `v1.1`.',
        ],
        introduction:
          'Software constantly evolves through bug fixes, feature updates, and multi-developer edits. Software Configuration Management (SCM) safeguards codebase integrity across versions, while Software Project Management steers overall scope, cost, schedule, risk, and quality.',
        sections: [
          {
            heading: '1. Software Configuration Items (SCIs) & 6 Core SCM Activities',
            bullets: [
              'SCIs Managed Under SCM: Source code, SRS documents, architectural designs, test suites, database migration scripts, user manuals, and environment configs.',
              '1. Configuration Identification: Uniquely naming, cataloging, and baselining every SCI.',
              '2. Version Control: Tracking full revision history (v1.0, v1.1, v2.0) and enabling rollback via Git/GitHub/GitLab.',
              '3. Change Control: Formal workflow — Submit Change Request → Analyze Impact → Change Control Board (CCB) Approve/Reject → Implement → Test → Close.',
              '4. Configuration Status Accounting: Recording and reporting what changed, who approved it, and current baseline status.',
              '5. Configuration Auditing: Independently verifying the released build matches approved specifications.',
              '6. Build & Release Management: Reproducibly packaging and tagging release artifacts.',
            ],
          },
          {
            heading: '2. Ten Core Software Project Management Activities',
            orderedSteps: [
              'Project Planning — Define vision, WBS scope, milestones, and deliverables.',
              'Cost Estimation — Forecast budget using COCOMO, Function Points, or expert judgment.',
              'Time Estimation & Scheduling — Estimate task durations and build Gantt/PERT/CPM timelines.',
              'Resource Management — Assign engineers, testers, hardware, and software licenses.',
              'Risk Management — Identify, prioritize, and mitigate threats (attrition, tech failure, delays).',
              'Team Management — Clarify roles, resolve conflicts, and foster collaboration.',
              'Quality Management — Enforce reviews, coding standards, and QA gates.',
              'Project Monitoring & Tracking — Measure earned value and actual vs planned progress.',
              'Communication Management — Deliver transparent status updates to stakeholders.',
              'Project Closure — Finalize handover, documentation, and lessons-learned retrospective.',
            ],
          },
        ],
        comparisonTable: {
          title: 'SCM vs Software Project Management',
          headers: ['Aspect', 'Software Configuration Management (SCM)', 'Software Project Management (SPM)'],
          rows: [
            ['Primary Scope', 'Controls software artifacts, versions & changes', 'Manages overall scope, cost, time, people & risk'],
            ['Managed Units', 'SCIs (code, docs, tests, schemas)', 'Tasks, budgets, schedules, teams'],
            ['Primary Tools', 'Git, GitHub, GitLab, Artifactory', 'Jira, MS Project, Gantt, PERT/CPM'],
            ['Core Objective', 'Prevent version chaos & unauthorized edits', 'Deliver quality product on time and budget'],
          ],
        },
        realTimeExample: {
          title: 'Parallel Team SCM in a College Portal (Git Workflow)',
          points: [
            'Developer 1 works on `feature/login`, Developer 2 on `feature/attendance`, Developer 3 on `feature/dashboard`.',
            'Each opens a Pull Request reviewed by peers, passes automated tests, merges into `main`, and tags Release `v1.2` without overwriting each other’s work.',
          ],
        },
        conclusion:
          'SCM ensures technical integrity and fearless parallel collaboration, while Project Management provides strategic governance over time, budget, and risk—together forming the backbone of predictable software delivery.',
        pageBlueprint: [
          { page: 'Page 1', focus: 'SCM Definition, Objectives & SCIs', checklist: 'Define SCM, list 7 objectives and 7 SCI examples.' },
          { page: 'Page 2', focus: '6 Main SCM Activities', checklist: 'Explain Identification, Version Control, Change Control, Status Accounting, Auditing, Release.' },
          { page: 'Page 3', focus: 'Change Control & Git Branch Diagrams', checklist: 'Draw CCB Change Control flow + 3-developer Git branching diagram.' },
          { page: 'Page 4', focus: '10 Project Management Activities', checklist: 'Explain Planning, Cost, Time, Resource, Risk, Team, Quality, Monitoring, Comm, Closure.' },
          { page: 'Page 5', focus: 'SCM vs PM Table, Pros & Conclusion', checklist: 'Write 4-row comparison table, benefits of both, and conclusion.' },
        ],
        unit3DIndex: 5,
      },
    ],
  },
];
