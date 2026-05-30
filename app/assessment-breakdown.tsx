import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { FeatureFlags } from "../utils/featureFlags";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useAuth } from "../components/AuthContext";
import GlassButton from "../components/GlassButton";
import GlassCard from "../components/GlassCard";
import PageContainer from "../components/PageContainer";
import { getAssessment, StoredAssessment } from "../utils/assessmentStorage";
import {
  calculateArrowPosition,
  calculateCategoryArrowPosition,
  getHealthStatus,
} from "../utils/scoreCalculations";

export default function AssessmentBreakdown() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuth();
  const [assessment, setAssessment] = useState<StoredAssessment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAssessment();
  }, [id]);

  if (!FeatureFlags.assessments) {
    return <Redirect href="/" />;
  }

  const loadAssessment = async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const data = await getAssessment(id);
    setAssessment(data);
    setLoading(false);
  };

  const formatTimestamp = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;
    return `${month}/${day}/${year} at ${hours}:${minutes} ${ampm}`;
  };

  const formatType = (type: string, subType?: string) => {
    const typeCapitalized = type.charAt(0).toUpperCase() + type.slice(1);
    if (subType) {
      return `${typeCapitalized} - ${
        subType.charAt(0).toUpperCase() + subType.slice(1)
      }`;
    }
    return typeCapitalized;
  };

  if (loading) {
    return (
      <PageContainer>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.loadingText}>Loading assessment...</Text>
        </View>
      </PageContainer>
    );
  }

  if (!assessment) {
    return (
      <PageContainer>
        <View style={styles.centerContainer}>
          <Ionicons
            name="alert-circle-outline"
            size={64}
            color="rgba(255, 255, 255, 0.5)"
          />
          <Text style={styles.errorTitle}>Assessment Not Found</Text>
          <Text style={styles.errorText}>
            This assessment could not be loaded.
          </Text>
          <GlassButton onPress={() => router.back()} style={styles.button}>
            Go Back
          </GlassButton>
        </View>
      </PageContainer>
    );
  }

  const arrowPosition = calculateArrowPosition(assessment.totalScore);
  const healthStatus = getHealthStatus(assessment.totalScore);
  const timestamp = formatTimestamp(
    assessment.completedAt instanceof Date
      ? assessment.completedAt
      : new Date(assessment.completedAt)
  );

  return (
    <PageContainer>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Score Breakdown</Text>

          {/* Assessment Info */}
          <GlassCard style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons
                name="clipboard-outline"
                size={20}
                color="rgba(255, 255, 255, 0.7)"
              />
              <Text style={styles.infoText}>
                {formatType(
                  assessment.assessmentType,
                  assessment.assessmentSubType
                )}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons
                name="time-outline"
                size={20}
                color="rgba(255, 255, 255, 0.7)"
              />
              <Text style={styles.infoText}>{timestamp}</Text>
            </View>
          </GlassCard>

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
            {assessment.categoryScores.map((category, index) => {
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

          <GlassButton
            onPress={() => router.back()}
            style={styles.backButton}
            opacity={0.15}
            borderOpacity={0.3}
          >
            Back to History
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
    paddingVertical: 24,
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    maxWidth: 700,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 24,
    textAlign: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#FFFFFF",
    marginTop: 24,
    marginBottom: 12,
    textAlign: "center",
  },
  errorText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  button: {
    minWidth: 200,
  },
  infoCard: {
    width: "100%",
    marginBottom: 24,
    gap: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  infoText: {
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "500",
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
  backButton: {
    width: "100%",
  },
});
