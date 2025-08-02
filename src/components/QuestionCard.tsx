import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, spacing, typography } from "../theme/colors";
import Button from "./Button";

interface QuestionCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onContinue?: () => void;
  onBack?: () => void;
  continueDisabled?: boolean;
  continueText?: string;
  showBackButton?: boolean;
  progress?: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  title,
  subtitle,
  children,
  onContinue,
  onBack,
  continueDisabled = false,
  continueText = "Continue",
  showBackButton = true,
  progress,
}) => {
  return (
    <View style={styles.container}>
      {/* Progress bar and back button */}
      <View style={styles.topBar}>
        {showBackButton && onBack && (
          <TouchableOpacity
            onPress={onBack}
            style={styles.backButton}
            hitSlop={{ top: 16, left: 16, right: 16, bottom: 16 }}
          >
            <Ionicons name="arrow-back" size={28} color={colors.text.primary} />
          </TouchableOpacity>
        )}
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBg}>
            <View
              style={[styles.progressBarFill, { width: `${progress ?? 0}%` }]}
            />
          </View>
        </View>
      </View>

      {/* Question content */}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        <View style={styles.childrenContainer}>{children}</View>
      </View>

      {/* Navigation button */}
      <View style={styles.buttonContainer}>
        {onContinue && (
          <Button
            title={continueText}
            onPress={onContinue}
            disabled={continueDisabled}
            size="large"
            style={styles.continueButton}
            textStyle={styles.continueButtonText}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.xl,
    marginHorizontal: spacing.lg,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  backButton: {
    marginRight: spacing.md,
    zIndex: 2,
  },
  progressBarContainer: {
    flex: 1,
    justifyContent: "center",
  },
  progressBarBg: {
    height: 6,
    backgroundColor: colors.gray.light,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
  },
  title: {
    fontSize: 32,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    fontFamily: typography.fonts.rounded,
    marginBottom: spacing.md,
    textAlign: "left",
  },
  subtitle: {
    fontSize: typography.sizes.large,
    color: colors.text.secondary,
    fontFamily: typography.fonts.rounded,
    marginBottom: spacing.xl,
    textAlign: "left",
  },
  childrenContainer: {
    width: "100%",
    gap: spacing.lg,
  },
  buttonContainer: {
    width: "100%",
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  continueButton: {
    borderRadius: spacing.xxl,
    backgroundColor: colors.button.primary,
  },
  continueButtonText: {
    fontFamily: typography.fonts.rounded,
    fontSize: typography.sizes.large,
    color: colors.text.primary,
  },
});

export default QuestionCard;
