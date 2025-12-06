import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { AssessmentResult } from "../types/assessment";
import { saveAssessmentResult } from "../utils/assessmentStorage";
import {
  calculateArrowPosition,
  calculateCategoryArrowPosition,
  getHealthStatus,
} from "../utils/scoreCalculations";
import GlassButton from "./GlassButton";
import GlassCard from "./GlassCard";
import PageContainer from "./PageContainer";

interface AssessmentResultsProps {
  result: AssessmentResult;
  onRestart: () => void;
}

export default function AssessmentResults({
  result,
  onRestart,
}: AssessmentResultsProps) {
  const [showBreakdown, setShowBreakdown] = useState(false);

  const arrowPosition = calculateArrowPosition(result.totalScore);
  const healthStatus = getHealthStatus(result.totalScore);

  const handleSave = async () => {
    try {
      await saveAssessmentResult(result);
      // TODO: Show success message
    } catch (error) {
      console.error("Failed to save result:", error);
      // TODO: Show error message
    }
  };

  if (showBreakdown) {
    return (
      <PageContainer>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <Text style={styles.title}>Score Breakdown</Text>

            {/* Overall Score */}
            <GlassCard style={styles.overallCard}>
              <Text style={styles.sectionTitle}>Overall</Text>
              <Text style={styles.healthStatus}>{healthStatus}</Text>

              <View style={styles.spectrumContainer}>
                <LinearGradient
                  colors={["#E42B6F", "#0A3D99"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.spectrum}
                />
                <View style={[styles.arrow, { left: `${arrowPosition}%` }]}>
                  <Text style={styles.arrowText}>▼</Text>
                </View>
              </View>

              <View style={styles.labels}>
                <Text style={styles.labelText}>Unhealthy</Text>
                <Text style={styles.labelText}>Healthy</Text>
              </View>
            </GlassCard>

            {/* Category Scores */}
            <Text style={styles.categoriesTitle}>Category Breakdown</Text>
            <View style={styles.categoriesGrid}>
              {result.categoryScores.map((category, index) => {
                const categoryPosition = calculateCategoryArrowPosition(
                  category.score
                );

                return (
                  <GlassCard key={index} style={styles.categoryCard}>
                    <Text style={styles.categoryName}>{category.name}</Text>

                    <View style={styles.miniSpectrumContainer}>
                      <LinearGradient
                        colors={["#E42B6F", "#0A3D99"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.miniSpectrum}
                      />
                      <View
                        style={[
                          styles.miniArrow,
                          { left: `${categoryPosition}%` },
                        ]}
                      >
                        <Text style={styles.miniArrowText}>▼</Text>
                      </View>
                    </View>
                  </GlassCard>
                );
              })}
            </View>

            <View style={styles.buttonContainer}>
              <GlassButton
                onPress={() => setShowBreakdown(false)}
                style={styles.button}
                opacity={0.15}
                borderOpacity={0.3}
              >
                Back to Summary
              </GlassButton>
              <GlassButton onPress={onRestart} style={styles.button}>
                New Assessment
              </GlassButton>
            </View>
          </View>
        </ScrollView>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.title}>THE UNRAVELED SPECTRUM</Text>
          <Text style={styles.subtitle}>{healthStatus}</Text>

          <GlassCard style={styles.resultsCard}>
            <View style={styles.spectrumContainer}>
              <LinearGradient
                colors={["#E42B6F", "#0A3D99"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.spectrum}
              />
              <View style={[styles.arrow, { left: `${arrowPosition}%` }]}>
                <Text style={styles.arrowText}>▼</Text>
              </View>
            </View>

            <View style={styles.labels}>
              <Text style={styles.labelText}>Unhealthy</Text>
              <Text style={styles.labelText}>Healthy</Text>
            </View>
          </GlassCard>

          <View style={styles.buttonContainer}>
            <GlassButton
              onPress={() => setShowBreakdown(true)}
              style={styles.button}
            >
              Show Breakdown
            </GlassButton>
            <GlassButton
              onPress={handleSave}
              style={styles.button}
              opacity={0.15}
              borderOpacity={0.3}
            >
              Save Result
            </GlassButton>
            <GlassButton
              onPress={onRestart}
              style={styles.button}
              opacity={0.1}
              borderOpacity={0.2}
            >
              New Assessment
            </GlassButton>
          </View>
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
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#E42B6F",
    marginBottom: 32,
    textAlign: "center",
  },
  resultsCard: {
    width: "100%",
    marginBottom: 24,
    alignItems: "center",
  },
  spectrumContainer: {
    width: "100%",
    position: "relative",
    marginBottom: 12,
  },
  spectrum: {
    width: "100%",
    height: 60,
    borderRadius: 12,
  },
  arrow: {
    position: "absolute",
    top: -24,
    marginLeft: -12,
  },
  arrowText: {
    fontSize: 24,
    color: "#FFFFFF",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  labels: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  labelText: {
    fontSize: 14,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.9)",
  },
  buttonContainer: {
    width: "100%",
    gap: 12,
  },
  button: {
    width: "100%",
  },
  overallCard: {
    width: "100%",
    marginBottom: 32,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  healthStatus: {
    fontSize: 18,
    fontWeight: "600",
    color: "#E42B6F",
    marginBottom: 20,
  },
  categoriesTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  categoriesGrid: {
    width: "100%",
    gap: 16,
    marginBottom: 24,
  },
  categoryCard: {
    width: "100%",
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  miniSpectrumContainer: {
    width: "100%",
    position: "relative",
  },
  miniSpectrum: {
    width: "100%",
    height: 32,
    borderRadius: 8,
  },
  miniArrow: {
    position: "absolute",
    top: -16,
    marginLeft: -8,
  },
  miniArrowText: {
    fontSize: 16,
    color: "#FFFFFF",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
