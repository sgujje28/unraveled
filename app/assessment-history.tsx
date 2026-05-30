import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Redirect, useRouter } from "expo-router";
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
import {
  getUserAssessments,
  StoredAssessment,
} from "../utils/assessmentStorage";
import {
  calculateArrowPosition,
  getHealthStatus,
} from "../utils/scoreCalculations";

export default function AssessmentHistory() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [assessments, setAssessments] = useState<
    (StoredAssessment & { id: string })[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAssessments();
  }, [user]);

  if (!FeatureFlags.assessments) {
    return <Redirect href="/" />;
  }

  const loadAssessments = async () => {
    if (!user?.id) {
      console.log("No user ID found");
      setLoading(false);
      return;
    }

    console.log("Loading assessments for user:", user.id);
    setLoading(true);
    const data = await getUserAssessments(user.id);
    console.log("Fetched assessments:", data.length, data);
    setAssessments(data);
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

  if (!isAuthenticated) {
    return (
      <PageContainer>
        <View style={styles.container}>
          <Ionicons
            name="lock-closed-outline"
            size={64}
            color="rgba(255, 255, 255, 0.5)"
          />
          <Text style={styles.emptyTitle}>Sign In Required</Text>
          <Text style={styles.emptyText}>
            Please sign in to view your assessment history.
          </Text>
          <GlassButton
            onPress={() => router.push("/account")}
            style={styles.button}
          >
            Go to Account
          </GlassButton>
        </View>
      </PageContainer>
    );
  }

  if (loading) {
    return (
      <PageContainer>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.loadingText}>Loading your assessments...</Text>
        </View>
      </PageContainer>
    );
  }

  if (assessments.length === 0) {
    return (
      <PageContainer>
        <View style={styles.container}>
          <Ionicons
            name="clipboard-outline"
            size={64}
            color="rgba(255, 255, 255, 0.5)"
          />
          <Text style={styles.emptyTitle}>No Assessments Yet</Text>
          <Text style={styles.emptyText}>
            Take your first assessment to see your history here.
          </Text>
          <GlassButton onPress={() => router.back()} style={styles.button}>
            Take Assessment
          </GlassButton>
        </View>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Assessment History</Text>
          <Text style={styles.subtitle}>
            {assessments.length} assessment{assessments.length !== 1 ? "s" : ""}{" "}
            completed
          </Text>
        </View>

        <View style={styles.listContainer}>
          {assessments.map((assessment, index) => {
            const arrowPosition = calculateArrowPosition(assessment.totalScore);
            const healthStatus = getHealthStatus(assessment.totalScore);
            const timestamp = formatTimestamp(
              assessment.completedAt instanceof Date
                ? assessment.completedAt
                : new Date(assessment.completedAt)
            );

            return (
              <GlassCard key={assessment.id} style={styles.assessmentCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.cardHeaderLeft}>
                    <Text style={styles.cardTitle}>
                      {formatType(
                        assessment.assessmentType,
                        assessment.assessmentSubType
                      )}
                    </Text>
                    <Text style={styles.cardTimestamp}>{timestamp}</Text>
                  </View>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{healthStatus}</Text>
                  </View>
                </View>

                <View style={styles.scoreSection}>
                  <Text style={styles.scoreLabel}>Score Spectrum</Text>
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
                  <View style={styles.spectrumLabels}>
                    <Text style={styles.spectrumLabel}>Unhealthy</Text>
                    <Text style={styles.spectrumLabel}>Healthy</Text>
                  </View>
                </View>

                <GlassButton
                  onPress={() => {
                    router.push(`/assessment-breakdown?id=${assessment.id}`);
                  }}
                  style={styles.viewButton}
                  opacity={0.2}
                  borderOpacity={0.4}
                >
                  <Text style={styles.viewButtonText}>View Breakdown</Text>
                </GlassButton>
              </GlassCard>
            );
          })}
        </View>

        <GlassButton
          onPress={() => router.back()}
          style={styles.backButton}
          opacity={0.1}
          borderOpacity={0.2}
        >
          Back to Assessments
        </GlassButton>
      </ScrollView>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  headerContainer: {
    marginBottom: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#FFFFFF",
    marginTop: 24,
    marginBottom: 12,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  button: {
    minWidth: 200,
  },
  listContainer: {
    width: "100%",
    gap: 16,
  },
  assessmentCard: {
    width: "100%",
    padding: 20,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  cardHeaderLeft: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 6,
  },
  cardTimestamp: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.7)",
  },
  statusBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  statusText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  scoreSection: {
    marginBottom: 16,
  },
  scoreLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 8,
  },
  spectrumContainer: {
    width: "100%",
    position: "relative",
    marginBottom: 8,
  },
  spectrum: {
    width: "100%",
    height: 32,
    borderRadius: 8,
  },
  arrow: {
    position: "absolute",
    top: -16,
    marginLeft: -8,
  },
  arrowText: {
    fontSize: 16,
    color: "#FFFFFF",
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  spectrumLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  spectrumLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
  },
  viewButton: {
    width: "100%",
    paddingVertical: 12,
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },
  backButton: {
    marginTop: 8,
    width: "100%",
  },
});
