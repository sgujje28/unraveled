import { CategoryScore } from "../types/assessment";

/**
 * Calculate individual category scores from the score array
 * Each category consists of 5 questions
 */
export function calculateCategoryScores(scoreArray: number[]): CategoryScore[] {
  const categories = [
    "Boundaries",
    "Communication",
    "Trust",
    "Freedom",
    "Conflict Resolution",
    "Compatibility",
    "Respect",
    "Honesty",
    "Safety",
    "Understanding",
  ];

  const scores: CategoryScore[] = [];

  // Each category is 5 questions apart in the scoreArray
  for (let i = 0; i < categories.length; i++) {
    const endIndex = (i + 1) * 5 - 1; // 4, 9, 14, 19, etc.
    const startIndex = i * 5 - 1; // -1, 4, 9, 14, etc.

    const score =
      i === 0
        ? scoreArray[endIndex]
        : scoreArray[endIndex] - scoreArray[startIndex];

    scores.push({
      name: categories[i],
      score,
    });
  }

  return scores;
}

/**
 * Calculate arrow position percentage based on score
 * Returns a value between 0-100 for positioning
 */
export function calculateArrowPosition(
  score: number,
  minScore: number = -122,
  maxScore: number = 112
): number {
  // Clamp score within range
  const clampedScore = Math.max(minScore, Math.min(maxScore, score));

  // Convert to 0-100 percentage
  const range = maxScore - minScore;
  const normalizedScore = clampedScore - minScore;
  const percentage = (normalizedScore / range) * 100;

  return percentage;
}

/**
 * Calculate arrow position percentage for category scores
 * Category scores typically range from -15 to +12
 */
export function calculateCategoryArrowPosition(score: number): number {
  // Most categories range from approximately -12 to +12
  // Safety has a slightly wider range: -15 to +15
  return calculateArrowPosition(score, -15, 15);
}

/**
 * Get health status text based on score
 */
export function getHealthStatus(score: number): string {
  if (score < -80) return "Very Unhealthy";
  if (score < -40) return "Unhealthy";
  if (score < 0) return "Somewhat Unhealthy";
  if (score < 40) return "Somewhat Healthy";
  if (score < 80) return "Healthy";
  return "Very Healthy";
}
