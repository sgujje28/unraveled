export interface Answer {
  text: string;
  value: number;
}

export interface Question {
  block: string;
  question: string;
  answers: Answer[];
}

export type AssessmentCategory = "romantic" | "platonic" | "professional";
export type AssessmentPerspective = "self" | "them";

export interface CategoryScore {
  name: string;
  score: number;
}

export interface AssessmentResult {
  category: AssessmentCategory;
  perspective?: AssessmentPerspective;
  totalScore: number;
  scoreArray: number[];
  categoryScores: CategoryScore[];
  completedAt: Date;
}

export interface UserAssessmentData extends AssessmentResult {
  userId?: string;
  id?: string;
}

export interface AssessmentData {
  category: AssessmentCategory;
  perspective?: AssessmentPerspective;
  title: string;
  questions: Question[];
  totalQuestions: number;
}
