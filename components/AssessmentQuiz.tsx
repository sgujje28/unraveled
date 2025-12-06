import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import {
  AssessmentCategory,
  AssessmentPerspective,
  AssessmentResult,
  Question,
} from "../types/assessment";
import { calculateCategoryScores } from "../utils/scoreCalculations";
import GlassButton from "./GlassButton";
import GlassCard from "./GlassCard";
import PageContainer from "./PageContainer";

interface AssessmentQuizProps {
  category: AssessmentCategory;
  perspective?: AssessmentPerspective;
  questions: Question[];
  title: string;
  onComplete: (result: AssessmentResult) => void;
  onCancel: () => void;
}

export default function AssessmentQuiz({
  category,
  perspective,
  questions,
  title,
  onComplete,
  onCancel,
}: AssessmentQuizProps) {
  const { height } = useWindowDimensions();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // Store answer INDEX instead of value to handle duplicate values
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );
  const selectedAnswerIndex = answers[currentQuestionIndex];

  // Calculate max height for question card: screen height - (padding + title + progress + buttons + margins)
  const questionCardMaxHeight = height - 400;

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setAnswers(newAnswers);

    // Log selected answer and calculate current score
    const selectedAnswer = currentQuestion.answers[answerIndex];
    let currentScore = 0;
    newAnswers.forEach((ansIdx, qIdx) => {
      if (ansIdx !== null) {
        currentScore += questions[qIdx].answers[ansIdx].value;
      }
    });
    console.log(
      `Q${currentQuestionIndex + 1}: Selected "${
        selectedAnswer.text
      }" (value: ${selectedAnswer.value}), Current Score: ${currentScore}`
    );
  };

  const handleNext = () => {
    if (selectedAnswerIndex === null) return;

    if (currentQuestionIndex < totalQuestions - 1) {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz complete - calculate final scores
      let cumulativeScore = 0;
      const scoreArray: number[] = [];

      answers.forEach((answerIndex, questionIndex) => {
        if (answerIndex !== null) {
          const value = questions[questionIndex].answers[answerIndex].value;
          cumulativeScore += value;
        }
        scoreArray.push(cumulativeScore);
      });

      const categoryScores = calculateCategoryScores(scoreArray);
      const result: AssessmentResult = {
        category,
        perspective,
        totalScore: cumulativeScore,
        scoreArray,
        categoryScores,
        completedAt: new Date(),
      };
      onComplete(result);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <PageContainer>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </Text>
            <View style={styles.progressBarBg}>
              <View
                style={[styles.progressBarFill, { width: `${progress}%` }]}
              />
            </View>
          </View>

          {/* Question Card */}
          <GlassCard style={styles.questionCard}>
            <ScrollView
              style={{ maxHeight: questionCardMaxHeight }}
              contentContainerStyle={styles.questionCardContent}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.blockLabel}>{currentQuestion.block}</Text>
              <Text style={styles.questionText}>
                {currentQuestion.question}
              </Text>

              <View style={styles.answersContainer}>
                {currentQuestion.answers.map((answer, index) => {
                  const isSelected = selectedAnswerIndex === index;
                  return (
                    <GlassButton
                      key={`${currentQuestionIndex}-${index}`}
                      onPress={() => handleAnswerSelect(index)}
                      style={
                        isSelected ? styles.selectedAnswer : styles.answerButton
                      }
                      opacity={isSelected ? 0.4 : 0.2}
                      borderOpacity={isSelected ? 0.8 : 0.4}
                    >
                      <Text
                        style={[
                          styles.answerText,
                          isSelected && styles.selectedAnswerText,
                        ]}
                      >
                        {answer.text}
                      </Text>
                    </GlassButton>
                  );
                })}
              </View>
            </ScrollView>
          </GlassCard>

          {/* Navigation Buttons */}
          <View style={styles.navigationContainer}>
            <GlassButton
              onPress={handlePrevious}
              disabled={currentQuestionIndex === 0}
              style={styles.previousButton}
              opacity={0.15}
              borderOpacity={0.3}
            >
              Previous
            </GlassButton>

            <GlassButton
              onPress={handleNext}
              disabled={selectedAnswerIndex === null}
              style={styles.nextButton}
            >
              {currentQuestionIndex < totalQuestions - 1 ? "Next" : "Submit"}
            </GlassButton>
          </View>

          <GlassButton
            onPress={onCancel}
            style={styles.cancelButton}
            opacity={0.1}
            borderOpacity={0.2}
          >
            Back to Assessments
          </GlassButton>
        </View>
      </ScrollView>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 140,
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    maxWidth: 700,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 24,
    textAlign: "center",
  },
  progressContainer: {
    width: "100%",
    marginBottom: 30,
  },
  progressText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    marginBottom: 8,
  },
  progressBarBg: {
    width: "100%",
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#E42B6F",
    borderRadius: 10,
  },
  questionCard: {
    width: "100%",
    marginBottom: 20,
  },
  questionCardContent: {
    flexGrow: 1,
  },
  blockLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#E42B6F",
    textTransform: "uppercase",
    marginBottom: 12,
    letterSpacing: 1,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 24,
    lineHeight: 26,
  },
  answersContainer: {
    gap: 12,
  },
  answerButton: {
    width: "100%",
  },
  selectedAnswer: {
    backgroundColor: "rgba(228, 43, 111, 0.3)",
  },
  answerText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  selectedAnswerText: {
    fontWeight: "700",
  },
  navigationContainer: {
    flexDirection: "row",
    width: "100%",
    gap: 12,
    marginBottom: 12,
    marginTop: 20,
  },
  previousButton: {
    flex: 1,
  },
  nextButton: {
    flex: 2,
  },
  cancelButton: {
    width: "100%",
  },
});
