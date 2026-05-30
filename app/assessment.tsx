import { Redirect, useRouter } from "expo-router";
import { FeatureFlags } from "../utils/featureFlags";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import AssessmentQuiz from "../components/AssessmentQuiz";
import AssessmentResults from "../components/AssessmentResults";
import GlassButton from "../components/GlassButton";
import GlassCard from "../components/GlassCard";
import PageContainer from "../components/PageContainer";
import {
  getAssessmentQuestions,
  getAssessmentTitle,
} from "../data/assessments";
import {
  AssessmentCategory,
  AssessmentPerspective,
  AssessmentResult,
} from "../types/assessment";

type AssessmentStep = "category" | "perspective" | "quiz" | "results";

export default function Assessment() {
  const router = useRouter();
  const [step, setStep] = useState<AssessmentStep>("category");
  const [category, setCategory] = useState<AssessmentCategory | null>(null);
  const [perspective, setPerspective] = useState<AssessmentPerspective | null>(
    null
  );
  const [result, setResult] = useState<AssessmentResult | null>(null);

  if (!FeatureFlags.assessments) {
    return <Redirect href="/" />;
  }

  const handleCategorySelect = (selectedCategory: AssessmentCategory) => {
    setCategory(selectedCategory);

    if (selectedCategory === "professional") {
      // Professional has no perspective selection, go directly to quiz
      setStep("quiz");
    } else {
      // Romantic and Platonic need perspective selection
      setStep("perspective");
    }
  };

  const handlePerspectiveSelect = (
    selectedPerspective: AssessmentPerspective
  ) => {
    setPerspective(selectedPerspective);
    setStep("quiz");
  };

  const handleQuizComplete = (assessmentResult: AssessmentResult) => {
    setResult(assessmentResult);
    setStep("results");
  };

  const handleRestart = () => {
    setStep("category");
    setCategory(null);
    setPerspective(null);
    setResult(null);
  };

  if (step === "quiz" && category) {
    const questions = getAssessmentQuestions(
      category,
      perspective || undefined
    );
    const title = getAssessmentTitle(category, perspective || undefined);

    return (
      <AssessmentQuiz
        category={category}
        perspective={perspective || undefined}
        questions={questions}
        title={title}
        onComplete={handleQuizComplete}
        onCancel={handleRestart}
      />
    );
  }

  if (step === "results" && result) {
    return <AssessmentResults result={result} onRestart={handleRestart} />;
  }

  return (
    <PageContainer>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {step === "category" && (
            <>
              <Text style={styles.title}>Choose Assessment Type</Text>
              <Text style={styles.subtitle}>
                Select the type of relationship you&apos;d like to assess
              </Text>

              <View style={styles.cardContainer}>
                <GlassCard style={styles.card}>
                  <Text style={styles.cardTitle}>Romantic</Text>
                  <Text style={styles.cardDescription}>
                    Assess your romantic relationship dynamics
                  </Text>
                  <GlassButton
                    onPress={() => handleCategorySelect("romantic")}
                    style={styles.button}
                  >
                    Select
                  </GlassButton>
                </GlassCard>

                <GlassCard style={styles.card}>
                  <Text style={styles.cardTitle}>Platonic</Text>
                  <Text style={styles.cardDescription}>
                    Assess your friendship and platonic relationships
                  </Text>
                  <GlassButton
                    onPress={() => handleCategorySelect("platonic")}
                    style={styles.button}
                  >
                    Select
                  </GlassButton>
                </GlassCard>

                <GlassCard style={styles.card}>
                  <Text style={styles.cardTitle}>Professional</Text>
                  <Text style={styles.cardDescription}>
                    Assess your workplace relationship dynamics
                  </Text>
                  <GlassButton
                    onPress={() => handleCategorySelect("professional")}
                    style={styles.button}
                  >
                    Select
                  </GlassButton>
                </GlassCard>
              </View>

              <GlassButton
                onPress={() => router.push("/assessment-history")}
                style={styles.historyButton}
                opacity={0.15}
                borderOpacity={0.3}
              >
                <Text style={styles.historyButtonText}>
                  View Assessment History
                </Text>
              </GlassButton>
            </>
          )}

          {step === "perspective" && (
            <>
              <Text style={styles.title}>Choose Perspective</Text>
              <Text style={styles.subtitle}>
                Are you assessing yourself or your partner?
              </Text>

              <View style={styles.cardContainer}>
                <GlassCard style={styles.card}>
                  <Text style={styles.cardTitle}>Self</Text>
                  <Text style={styles.cardDescription}>
                    Assess your own behaviors and contributions to the
                    relationship
                  </Text>
                  <GlassButton
                    onPress={() => handlePerspectiveSelect("self")}
                    style={styles.button}
                  >
                    Select
                  </GlassButton>
                </GlassCard>

                <GlassCard style={styles.card}>
                  <Text style={styles.cardTitle}>Them</Text>
                  <Text style={styles.cardDescription}>
                    Assess your partner&apos;s behaviors and contributions to
                    the relationship
                  </Text>
                  <GlassButton
                    onPress={() => handlePerspectiveSelect("them")}
                    style={styles.button}
                  >
                    Select
                  </GlassButton>
                </GlassCard>
              </View>

              <GlassButton
                onPress={handleRestart}
                style={styles.backButton}
                opacity={0.1}
                borderOpacity={0.2}
              >
                Back
              </GlassButton>
            </>
          )}
        </View>
      </ScrollView>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    maxWidth: 700,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 40,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  cardContainer: {
    width: "100%",
    gap: 20,
  },
  card: {
    width: "100%",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    width: "100%",
  },
  backButton: {
    marginTop: 20,
    width: "100%",
  },
  historyButton: {
    marginTop: 32,
    width: "100%",
  },
  historyButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
