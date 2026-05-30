import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useAuth } from "../components/AuthContext";
import { FeatureFlags } from "../utils/featureFlags";
import GlassButton from "../components/GlassButton";
import GlassCard from "../components/GlassCard";
import GlassDialog from "../components/GlassDialog";
import PageContainer from "../components/PageContainer";
import {
  isEmailVerified,
  resendVerificationEmail,
  validateEmail,
  validatePassword,
} from "../utils/auth";

export default function Account() {
  const { user, isAuthenticated, signIn, signUp, signOut } = useAuth();
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [checkingVerification, setCheckingVerification] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
  }>({});
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogConfig, setDialogConfig] = useState<{
    title: string;
    message: string;
    icon?: keyof typeof Ionicons.glyphMap;
    iconColor?: string;
    buttons: {
      text: string;
      onPress: () => void;
      variant?: "primary" | "secondary" | "destructive";
    }[];
  } | null>(null);

  useEffect(() => {
    console.log("Auth state changed:", { isAuthenticated, user: user?.email });
    if (isAuthenticated) {
      checkEmailVerification();
    }
  }, [isAuthenticated, user]);

  const checkEmailVerification = async () => {
    const verified = await isEmailVerified();
    setEmailVerified(verified);
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (isSignUp) {
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.errors[0];
      }
    }

    // Sign-up specific validations
    if (isSignUp) {
      if (!firstName?.trim()) {
        newErrors.firstName = "First name is required";
      } else if (firstName.trim().length < 2) {
        newErrors.firstName = "First name must be at least 2 characters";
      }

      if (!lastName?.trim()) {
        newErrors.lastName = "Last name is required";
      } else if (lastName.trim().length < 2) {
        newErrors.lastName = "Last name must be at least 2 characters";
      }

      // Phone number validation (if provided)
      if (phoneNumber && phoneNumber.trim()) {
        const phoneRegex =
          /^[+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
        if (!phoneRegex.test(phoneNumber.replace(/\s/g, ""))) {
          newErrors.phoneNumber = "Please enter a valid phone number";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field: keyof typeof errors) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const handleResendVerification = async () => {
    setCheckingVerification(true);
    const result = await resendVerificationEmail();
    setCheckingVerification(false);

    if (result.success) {
      setDialogConfig({
        title: "Email Sent",
        message: "Verification email has been sent. Please check your inbox.",
        icon: "mail-outline",
        iconColor: "#4ade80",
        buttons: [
          {
            text: "OK",
            onPress: () => setDialogVisible(false),
          },
        ],
      });
      setDialogVisible(true);
    } else {
      setDialogConfig({
        title: "Error",
        message: result.error || "Failed to send verification email",
        icon: "alert-circle-outline",
        iconColor: "#ef4444",
        buttons: [
          {
            text: "OK",
            onPress: () => setDialogVisible(false),
          },
        ],
      });
      setDialogVisible(true);
    }
  };

  const handleSignIn = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    console.log("Attempting sign in...");
    const success = await signIn(email, password);
    console.log("Sign in result:", success);
    setLoading(false);

    if (!success) {
      setDialogConfig({
        title: "Error",
        message: "Invalid email or password",
        icon: "alert-circle-outline",
        iconColor: "#ef4444",
        buttons: [
          {
            text: "OK",
            onPress: () => setDialogVisible(false),
          },
        ],
      });
      setDialogVisible(true);
    }
    // If successful, the component will automatically re-render to show account page
  };

  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    console.log("Attempting to sign up...");
    const result = await signUp({
      email,
      password,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phoneNumber: phoneNumber?.trim() || undefined,
    });
    console.log("Sign up result:", result);
    setLoading(false);

    if (result.success) {
      const name = firstName.trim();
      setDialogConfig({
        title: "Account Created! 🎉",
        message: `Welcome ${name}!\n\nYour account has been successfully created.\n\nA verification email has been sent to:\n${email}\n\nPlease check your inbox and verify your email address.`,
        icon: "checkmark-circle-outline",
        iconColor: "#4ade80",
        buttons: [
          {
            text: "Log In",
            onPress: async () => {
              setDialogVisible(false);
              // User is already logged in from signup, just need to close dialog
              // The component will automatically show the account page
            },
            variant: "primary",
          },
          {
            text: "Back",
            onPress: async () => {
              setDialogVisible(false);
              // Sign out the user since they were auto-logged in
              await signOut();
              setIsSignUp(false);
              setEmail("");
              setPassword("");
              setFirstName("");
              setLastName("");
              setPhoneNumber("");
              setErrors({});
            },
            variant: "secondary",
          },
        ],
      });
      setDialogVisible(true);
    } else {
      const errorMsg =
        result.error || "Failed to create account. Please try again.";
      console.error("Sign up failed:", errorMsg);
      setDialogConfig({
        title: "Error",
        message: errorMsg,
        icon: "alert-circle-outline",
        iconColor: "#ef4444",
        buttons: [
          {
            text: "OK",
            onPress: () => setDialogVisible(false),
          },
        ],
      });
      setDialogVisible(true);
    }
  };

  const handleSignOut = async () => {
    setDialogConfig({
      title: "Sign Out",
      message: "Are you sure you want to sign out?",
      icon: "log-out-outline",
      iconColor: "#fbbf24",
      buttons: [
        {
          text: "Sign Out",
          onPress: async () => {
            setDialogVisible(false);
            try {
              console.log("Signing out...");
              await signOut();
              console.log("Sign out successful");
              setEmail("");
              setPassword("");
              setFirstName("");
              setLastName("");
              setPhoneNumber("");
            } catch (error) {
              console.error("Sign out error:", error);
              setDialogConfig({
                title: "Error",
                message: "Failed to sign out. Please try again.",
                icon: "alert-circle-outline",
                iconColor: "#ef4444",
                buttons: [
                  {
                    text: "OK",
                    onPress: () => setDialogVisible(false),
                  },
                ],
              });
              setDialogVisible(true);
            }
          },
          variant: "destructive",
        },
        {
          text: "Cancel",
          onPress: () => setDialogVisible(false),
          variant: "secondary",
        },
      ],
    });
    setDialogVisible(true);
  };

  const handleAccountSettings = () => {
    setDialogConfig({
      title: "Account Settings",
      message: "Account settings coming soon!",
      icon: "settings-outline",
      iconColor: "#60a5fa",
      buttons: [
        {
          text: "OK",
          onPress: () => setDialogVisible(false),
        },
      ],
    });
    setDialogVisible(true);
  };

  if (isAuthenticated && user) {
    // Get user initials for profile picture
    const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(
      0
    )}`.toUpperCase();

    return (
      <PageContainer>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            {/* Profile Picture */}
            <View style={styles.profilePicContainer}>
              <View style={styles.profilePic}>
                <Text style={styles.initials}>{initials}</Text>
              </View>
            </View>

            {/* User Name */}
            <Text style={styles.userName}>
              {user.firstName} {user.lastName}
            </Text>

            {/* Email Verification Status */}
            <View style={styles.verificationBadge}>
              <Ionicons
                name={emailVerified ? "checkmark-circle" : "alert-circle"}
                size={16}
                color={emailVerified ? "#4ade80" : "#fbbf24"}
              />
              <Text
                style={[
                  styles.verificationText,
                  emailVerified ? styles.verified : styles.unverified,
                ]}
              >
                {emailVerified ? "Verified" : "Not Verified"}
              </Text>
            </View>

            {/* Resend Verification */}
            {!emailVerified && (
              <GlassButton
                onPress={handleResendVerification}
                style={styles.resendButton}
                opacity={0.15}
                borderOpacity={0.3}
                disabled={checkingVerification}
              >
                {checkingVerification
                  ? "Sending..."
                  : "Resend Verification Email"}
              </GlassButton>
            )}

            {/* Account Details Card */}
            <GlassCard style={styles.card}>
              <View style={styles.detailRow}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color="rgba(255, 255, 255, 0.9)"
                />
                <Text style={styles.detailText}>{user.email}</Text>
              </View>

              {user.phoneNumber && (
                <View style={styles.detailRow}>
                  <Ionicons
                    name="call-outline"
                    size={20}
                    color="rgba(255, 255, 255, 0.9)"
                  />
                  <Text style={styles.detailText}>{user.phoneNumber}</Text>
                </View>
              )}

              <View style={styles.detailRow}>
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color="rgba(255, 255, 255, 0.9)"
                />
                <Text style={styles.detailText}>
                  Member since {new Date(user.createdAt).toLocaleDateString()}
                </Text>
              </View>
            </GlassCard>

            {/* Action Buttons */}
            <GlassButton
              onPress={handleAccountSettings}
              style={styles.button}
              opacity={0.2}
              borderOpacity={0.4}
            >
              <View style={styles.buttonContent}>
                <Ionicons name="settings-outline" size={20} color="#FFFFFF" />
                <Text style={styles.buttonText}>Account Settings</Text>
              </View>
            </GlassButton>

            {FeatureFlags.assessments && (
              <GlassButton
                onPress={() => router.push("/assessment-history")}
                style={styles.button}
                opacity={0.2}
                borderOpacity={0.4}
              >
                <View style={styles.buttonContent}>
                  <Ionicons name="clipboard-outline" size={20} color="#FFFFFF" />
                  <Text style={styles.buttonText}>Assessment History</Text>
                </View>
              </GlassButton>
            )}

            <GlassButton
              onPress={() => {
                console.log("Sign Out button pressed!");
                handleSignOut();
              }}
              style={styles.button}
              opacity={0.15}
              borderOpacity={0.3}
            >
              <View style={styles.buttonContent}>
                <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
                <Text style={styles.buttonText}>Sign Out</Text>
              </View>
            </GlassButton>
          </View>
        </ScrollView>
        {dialogConfig && (
          <GlassDialog
            visible={dialogVisible}
            title={dialogConfig.title}
            message={dialogConfig.message}
            icon={dialogConfig.icon}
            iconColor={dialogConfig.iconColor}
            buttons={dialogConfig.buttons}
            onClose={() => setDialogVisible(false)}
          />
        )}
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
          <Text style={styles.title}>
            {isSignUp ? "Create Account" : "Sign In"}
          </Text>

          <GlassCard style={styles.card}>
            {isSignUp && (
              <>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                  style={[styles.input, errors.firstName && styles.inputError]}
                  value={firstName}
                  onChangeText={(text) => {
                    setFirstName(text);
                    if (errors.firstName) clearError("firstName");
                  }}
                  placeholder="John"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  autoCapitalize="words"
                />
                {errors.firstName && (
                  <Text style={styles.errorText}>{errors.firstName}</Text>
                )}

                <Text style={styles.label}>Last Name</Text>
                <TextInput
                  style={[styles.input, errors.lastName && styles.inputError]}
                  value={lastName}
                  onChangeText={(text) => {
                    setLastName(text);
                    if (errors.lastName) clearError("lastName");
                  }}
                  placeholder="Doe"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  autoCapitalize="words"
                />
                {errors.lastName && (
                  <Text style={styles.errorText}>{errors.lastName}</Text>
                )}

                <Text style={styles.label}>Phone Number (Optional)</Text>
                <TextInput
                  style={[
                    styles.input,
                    errors.phoneNumber && styles.inputError,
                  ]}
                  value={phoneNumber}
                  onChangeText={(text) => {
                    setPhoneNumber(text);
                    if (errors.phoneNumber) clearError("phoneNumber");
                  }}
                  placeholder="+1 (555) 123-4567"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  keyboardType="phone-pad"
                />
                {errors.phoneNumber && (
                  <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                )}
              </>
            )}

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) clearError("email");
              }}
              placeholder="email@example.com"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) clearError("password");
              }}
              placeholder={
                isSignUp
                  ? "Min 8 chars, 1 number, 1 special char"
                  : "Enter password"
              }
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              secureTextEntry
              autoCapitalize="none"
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            {isSignUp && (
              <Text style={styles.hint}>
                Password must be at least 8 characters with at least 1 number
                and 1 special character
              </Text>
            )}
          </GlassCard>

          <GlassButton
            onPress={isSignUp ? handleSignUp : handleSignIn}
            style={styles.button}
            disabled={loading}
          >
            {loading ? "Please wait..." : isSignUp ? "Sign Up" : "Sign In"}
          </GlassButton>

          <GlassButton
            onPress={() => {
              setIsSignUp(!isSignUp);
              setErrors({});
            }}
            style={styles.button}
            opacity={0.1}
            borderOpacity={0.2}
          >
            {isSignUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </GlassButton>
        </View>
      </ScrollView>
      {dialogConfig && (
        <GlassDialog
          visible={dialogVisible}
          title={dialogConfig.title}
          message={dialogConfig.message}
          icon={dialogConfig.icon}
          iconColor={dialogConfig.iconColor}
          buttons={dialogConfig.buttons}
          onClose={() => setDialogVisible(false)}
        />
      )}
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
    maxWidth: 500,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 24,
    textAlign: "center",
  },
  profilePicContainer: {
    marginBottom: 16,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  initials: {
    fontSize: 36,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  userName: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
    textAlign: "center",
  },
  verificationBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
  },
  verificationText: {
    fontSize: 14,
    fontWeight: "600",
  },
  card: {
    width: "100%",
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  detailText: {
    fontSize: 16,
    color: "#FFFFFF",
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.9)",
    marginTop: 16,
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  hint: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    marginTop: 8,
    fontStyle: "italic",
  },
  inputError: {
    borderColor: "rgba(239, 68, 68, 0.6)",
    borderWidth: 1,
  },
  errorText: {
    fontSize: 12,
    color: "#ef4444",
    marginTop: 4,
    marginBottom: 8,
  },
  button: {
    width: "100%",
    marginBottom: 12,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  verified: {
    color: "#4ade80",
  },
  unverified: {
    color: "#fbbf24",
  },
  resendButton: {
    width: "100%",
    marginBottom: 16,
  },
});
