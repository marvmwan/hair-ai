import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Confetti from "react-native-confetti";
import Button from "../components/Button";
import { colors, spacing, typography } from "../theme/colors";

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const confettiRef = useRef<Confetti>(null);

  useEffect(() => {
    if (confettiRef.current) {
      confettiRef.current.startConfetti();
    }
  }, []);

  const handleGetStarted = () => {
    navigation.navigate("Onboarding" as never);
  };

  return (
    <LinearGradient
      colors={[colors.gradient.light, colors.gradient.dark]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <Confetti ref={confettiRef} />
        <View style={styles.emojiContainer}>
          <Text style={styles.emojiIcon}>✂️</Text>
          <Text style={styles.title}>Cuts</Text>
          <Text style={styles.subtitle}>Get Your Dream Hair!</Text>
        </View>

        {/* Get Started Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Get Started"
            onPress={handleGetStarted}
            size="medium"
            style={styles.getStartedButton}
            textStyle={styles.getStartedButtonText}
          />

          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By continuing, you understand and agree to our{" "}
              <Text style={styles.termsLink}>Terms & Conditions</Text> and{" "}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  emojiContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  emojiIcon: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 120,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 48,
    fontWeight: typography.weights.bold,
    color: colors.secondary,
    textAlign: "center",
    marginBottom: spacing.md,
    fontFamily: typography.fonts.rounded,
  },
  subtitle: {
    fontSize: typography.sizes.xlarge,
    fontWeight: typography.weights.medium,
    color: colors.secondary,
    textAlign: "center",
    opacity: 0.9,
    fontFamily: typography.fonts.rounded,
  },
  buttonContainer: {
    padding: spacing.xl,
  },
  getStartedButton: {
    backgroundColor: colors.secondary,
    marginBottom: spacing.lg,
    borderRadius: spacing.xxl,
  },
  getStartedButtonText: {
    color: colors.text.primary,
    fontSize: typography.sizes.xxlarge,
    fontFamily: typography.fonts.rounded,
  },
  termsContainer: {
    alignItems: "center",
  },
  termsText: {
    fontSize: typography.sizes.small,
    color: colors.text.secondary,
    textAlign: "center",
    opacity: 0.8,
    lineHeight: 18,
    fontFamily: typography.fonts.rounded,
  },
  termsLink: {
    fontWeight: typography.weights.semibold,
    textDecorationLine: "underline",
    fontFamily: typography.fonts.rounded,
  },
});

export default WelcomeScreen;
