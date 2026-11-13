export interface ConceptItem {
  id: string;
  chapter: string;
  title: string;
  summary: string;
  fromZero: string;
  inPractice: string;
  attention: string;
  keyTakeaway: string;
}

export interface SimulatorStep {
  id: string;
  label: string;
  shortDesc: string;
  detail: string;
  payload: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface MemoryPair {
  id: string;
  term: string;
  definition: string;
}

export interface UnitContent {
  unitNumber: string;
  unitTitle: string;
  unitSubtitle: string;
  overview: string;
  simulatorTitle: string;
  simulatorSubtitle: string;
  simulatorSteps: SimulatorStep[];
  concepts: ConceptItem[];
  quiz: QuizQuestion[];
  memoryPairs: MemoryPair[];
}
