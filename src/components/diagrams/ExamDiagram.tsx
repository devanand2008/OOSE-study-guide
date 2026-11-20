import type { DiagramId } from '../../types/syllabus';
import {
  DiagramU1Sdlc,
  DiagramU1Agile,
  DiagramU1Xp,
  DiagramU2Srs,
  DiagramU2Uml,
  DiagramU2Dfd,
  DiagramU2FsmPetri,
  DiagramU3CouplingCohesion,
  DiagramU3DesignApproaches,
  DiagramU3FodOod,
} from './diagramsUnits1to3';
import {
  DiagramU4Mvc,
  DiagramU4Patterns,
  DiagramU4Architecture,
  DiagramU4UiProcess,
  DiagramU5TestingLevels,
  DiagramU5RailwayTest,
  DiagramU5DebuggingFormal,
  DiagramU6PertCpm,
  DiagramU6Devops,
  DiagramU6Scm,
} from './diagramsUnits4to6';

interface ExamDiagramProps {
  diagramId: DiagramId;
}

export function ExamDiagram({ diagramId }: ExamDiagramProps) {
  switch (diagramId) {
    case 'u1-sdlc':
      return <DiagramU1Sdlc />;
    case 'u1-agile':
      return <DiagramU1Agile />;
    case 'u1-xp':
      return <DiagramU1Xp />;
    case 'u2-srs':
      return <DiagramU2Srs />;
    case 'u2-uml':
      return <DiagramU2Uml />;
    case 'u2-dfd':
      return <DiagramU2Dfd />;
    case 'u2-fsm-petri':
      return <DiagramU2FsmPetri />;
    case 'u3-coupling-cohesion':
      return <DiagramU3CouplingCohesion />;
    case 'u3-design-approaches':
      return <DiagramU3DesignApproaches />;
    case 'u3-fod-ood':
      return <DiagramU3FodOod />;
    case 'u4-mvc':
      return <DiagramU4Mvc />;
    case 'u4-patterns':
      return <DiagramU4Patterns />;
    case 'u4-architecture':
      return <DiagramU4Architecture />;
    case 'u4-ui-process':
      return <DiagramU4UiProcess />;
    case 'u5-testing-levels':
      return <DiagramU5TestingLevels />;
    case 'u5-railway-test':
      return <DiagramU5RailwayTest />;
    case 'u5-debugging-formal':
      return <DiagramU5DebuggingFormal />;
    case 'u6-pert-cpm':
      return <DiagramU6PertCpm />;
    case 'u6-devops':
      return <DiagramU6Devops />;
    case 'u6-scm':
      return <DiagramU6Scm />;
  }
}
