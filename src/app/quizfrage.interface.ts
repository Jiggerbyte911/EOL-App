export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number; // Index der korrekten Antwort (0-3)
  explanation: string;
}

export interface QuizData {
  title: string;
  questions: QuizQuestion[];
}

export interface QuizDataMap {
  [oceanId: string]: QuizData;
}

// Legacy Interface (falls noch verwendet)
export interface Quizfrage {
  id: string;
  frage: string;
  antworten: { text: string; korrekt: boolean }[];
  erlaeuterung?: string;
}
