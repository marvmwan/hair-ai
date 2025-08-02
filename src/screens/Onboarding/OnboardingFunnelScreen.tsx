import { OnboardingStackParamList } from "@/src/navigation/OnboardingNavigator";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import MultiSelect from "../../components/MultiSelect";
import QuestionCard from "../../components/QuestionCard";
import { FunnelAnswers, useFunnel } from "../../contexts/FunnelContext";
import { colors } from "../../theme/colors";
import HairScanInfoScreen, { ScanType } from "./HairScanInfoScreen";
import NotificationsScreen from "./NotificationsScreen";
import ReviewScreen from "./ReviewScreen";

interface OnboardingStep {
  key: keyof FunnelAnswers | "review" | "notifications" | "hairScanInfo";
  title?: string;
  subtitle?: string;
  options?: { id: string; label: string; emoji: string }[];
  maxSelections?: number;
  parse?: (v: string) => any;
}

const onboardingSteps: OnboardingStep[] = [
  {
    key: "hairGoal",
    title: "What would you like help with?",
    subtitle: "Choose what you want to achieve with our app",
    options: [
      {
        id: "find-cuts",
        label: "Find haircuts for my face shape",
        emoji: "🔍",
      },
      { id: "try-styles", label: "Try on different hairstyles", emoji: "💇" },
    ],
    maxSelections: 1,
  },
  {
    key: "gender",
    title: "What's your gender?",
    subtitle: "This helps us provide personalized hair recommendations",
    options: [
      { id: "male", label: "Male", emoji: "👨" },
      { id: "female", label: "Female", emoji: "👩" },
      { id: "non-binary", label: "Non-binary", emoji: "🧑" },
      { id: "prefer-not-to-say", label: "Prefer not to say", emoji: "❓" },
    ],
    maxSelections: 1,
  },
  {
    key: "ageGroup",
    title: "What's your age group?",
    subtitle: "Hair needs change with age - let's find what works for you",
    options: [
      { id: "16-24", label: "16-24", emoji: "🧒" },
      { id: "25-34", label: "25-34", emoji: "👨" },
      { id: "35-44", label: "35-44", emoji: "🧑" },
      { id: "45-54", label: "45-54", emoji: "👨‍🦳" },
      { id: "55+", label: "55+", emoji: "👴" },
    ],
    maxSelections: 1,
  },
  {
    key: "dailyHairConfidence",
    title: "How confident do you feel about your hair on a daily basis?",
    subtitle: "Rate your current hair confidence level",
    options: [
      { id: "1", label: "Not confident", emoji: "😟" },
      { id: "2", label: "Slightly confident", emoji: "😕" },
      { id: "3", label: "Moderately confident", emoji: "😐" },
      { id: "4", label: "Confident", emoji: "🙂" },
      { id: "5", label: "Very confident", emoji: "😃" },
    ],
    maxSelections: 1,
    parse: (v: string) => Number(v),
  },
  {
    key: "commonHairHurdles",
    title: "What are your most common hair hurdles?",
    subtitle: "Select up to 3 challenges you face regularly",
    options: [
      { id: "frizz", label: "Frizz & Flyaways", emoji: "🌪️" },
      { id: "thinning", label: "Thinning Hair", emoji: "📉" },
      { id: "oily", label: "Oily Scalp", emoji: "💧" },
      { id: "dry", label: "Dry & Brittle", emoji: "🏜️" },
      { id: "dandruff", label: "Dandruff", emoji: "❄️" },
      { id: "styling", label: "Hard to Style", emoji: "🤯" },
      { id: "growth", label: "Slow Growth", emoji: "🐌" },
      { id: "color-damage", label: "Color Damage", emoji: "🎨" },
    ],
    maxSelections: 3,
  },
  {
    key: "stylingFrustrations",
    title: "What's your biggest styling frustration?",
    subtitle: "Tell us what makes styling your hair challenging",
    options: [
      { id: "takes-too-long", label: "Takes Too Long", emoji: "⏰" },
      {
        id: "looks-different",
        label: "Looks Different Than Expected",
        emoji: "😕",
      },
      { id: "falls-flat", label: "Falls Flat Quickly", emoji: "📉" },
      { id: "too-complicated", label: "Too Complicated", emoji: "🤔" },
      {
        id: "product-overload",
        label: "Too Many Products Needed",
        emoji: "🧴",
      },
      { id: "inconsistent", label: "Inconsistent Results", emoji: "🎲" },
    ],
    maxSelections: 1,
  },
  {
    key: "badHairDayTriggers",
    title: "What triggers your bad hair days?",
    subtitle: "Select up to 2 main culprits behind your hair struggles",
    options: [
      { id: "humidity", label: "Humidity & Weather", emoji: "🌦️" },
      { id: "sleep", label: "How I Slept", emoji: "😴" },
      { id: "washing", label: "Washing Too Often/Little", emoji: "🚿" },
      { id: "stress", label: "Stress Levels", emoji: "😰" },
      { id: "hormones", label: "Hormonal Changes", emoji: "🌙" },
      { id: "products", label: "Wrong Products", emoji: "🧴" },
      { id: "touching", label: "Touching Hair Too Much", emoji: "✋" },
      { id: "heat", label: "Heat Damage", emoji: "🔥" },
    ],
    maxSelections: 2,
  },
  {
    key: "barberSalonRegrets",
    title: "What's your biggest barber or salon regret?",
    subtitle: "Help us understand what went wrong in the past",
    options: [
      { id: "miscommunication", label: "Miscommunication", emoji: "🗣️" },
      { id: "too-short", label: "Cut Too Short", emoji: "✂️" },
      { id: "wrong-style", label: "Wrong Style Choice", emoji: "💇" },
      { id: "damaged-hair", label: "Hair Got Damaged", emoji: "😱" },
      { id: "maintenance", label: "Too High Maintenance", emoji: "🔄" },
      { id: "face-shape", label: "Didn't Suit Face Shape", emoji: "👤" },
      { id: "no-regrets", label: "No Major Regrets", emoji: "😊" },
    ],
    maxSelections: 1,
  },
  {
    key: "productOverwhelm",
    title: "How overwhelmed do you feel by hair product choices?",
    subtitle: "Rate your level of confusion when choosing hair products",
    options: [
      { id: "1", label: "Not overwhelmed", emoji: "😌" },
      { id: "2", label: "Slightly overwhelmed", emoji: "😐" },
      { id: "3", label: "Somewhat overwhelmed", emoji: "😶" },
      { id: "4", label: "Overwhelmed", emoji: "😬" },
      { id: "5", label: "Very overwhelmed", emoji: "😱" },
    ],
    maxSelections: 1,
    parse: (v: string) => Number(v),
  },
  {
    key: "lifestyleHairClashes",
    title: "What lifestyle factor clashes most with your hair goals?",
    subtitle: "Help us understand your daily challenges",
    options: [
      {
        id: "work-professional",
        label: "Work/Professional Image",
        emoji: "👔",
      },
      { id: "workout", label: "Workout Routine", emoji: "🏃" },
      { id: "travel", label: "Travel Schedule", emoji: "✈️" },
      { id: "time-constraints", label: "Time Constraints", emoji: "⏰" },
      { id: "budget", label: "Budget Limitations", emoji: "💰" },
      { id: "social-events", label: "Social Events", emoji: "🎉" },
      { id: "climate", label: "Climate/Weather", emoji: "🌡️" },
      { id: "no-clash", label: "No Major Clashes", emoji: "✅" },
    ],
    maxSelections: 1,
  },
  {
    key: "emotionalHairImpact",
    title: "How does your hair impact your emotional well-being?",
    subtitle: "Select up to 3 areas where hair affects your life",
    options: [
      { id: "confidence", label: "Confidence Levels", emoji: "💪" },
      { id: "mood", label: "Daily Mood", emoji: "😊" },
      { id: "social", label: "Social Interactions", emoji: "👥" },
      { id: "productivity", label: "Work Productivity", emoji: "📈" },
      { id: "relationships", label: "Romantic Relationships", emoji: "💕" },
      { id: "self-image", label: "Self-Image", emoji: "🪞" },
      { id: "stress", label: "Stress Levels", emoji: "😰" },
      { id: "minimal", label: "Minimal Impact", emoji: "🤷" },
    ],
    maxSelections: 3,
  },
  {
    key: "hairGoalsDreaming",
    title: "What hair goals are you dreaming of?",
    subtitle: "Select up to 2 main goals you want to achieve",
    options: [
      { id: "healthier", label: "Healthier Hair", emoji: "🌱" },
      { id: "longer", label: "Longer Hair", emoji: "📏" },
      { id: "fuller", label: "Fuller/Thicker Hair", emoji: "🦁" },
      { id: "manageable", label: "More Manageable", emoji: "🎯" },
      { id: "stylish", label: "More Stylish Looks", emoji: "✨" },
      { id: "low-maintenance", label: "Lower Maintenance", emoji: "⚡" },
      { id: "color", label: "Perfect Color", emoji: "🎨" },
      { id: "confident", label: "Feel More Confident", emoji: "👑" },
    ],
    maxSelections: 2,
  },
  {
    key: "pastAttempts",
    title: "What have you tried in the past to improve your hair?",
    subtitle: "Tell us about your previous hair journey attempts",
    options: [
      { id: "diy-treatments", label: "DIY Hair Treatments", emoji: "🏠" },
      { id: "expensive-products", label: "Expensive Products", emoji: "💸" },
      { id: "multiple-stylists", label: "Multiple Stylists", emoji: "💇" },
      { id: "youtube-tutorials", label: "YouTube Tutorials", emoji: "📱" },
      { id: "supplements", label: "Hair Supplements", emoji: "💊" },
      { id: "different-cuts", label: "Different Haircuts", emoji: "✂️" },
      { id: "nothing-worked", label: "Nothing Worked", emoji: "😞" },
      { id: "havent-tried", label: "Haven't Tried Much", emoji: "🤔" },
    ],
    maxSelections: 1,
  },
  {
    key: "readinessForChange",
    title: "How ready are you to make a change?",
    subtitle: "Rate your commitment to transforming your hair routine",
    options: [
      { id: "1", label: "Not ready", emoji: "😴" },
      { id: "2", label: "Slightly ready", emoji: "😐" },
      { id: "3", label: "Somewhat ready", emoji: "😶" },
      { id: "4", label: "Ready", emoji: "🙂" },
      { id: "5", label: "Very ready", emoji: "💪" },
    ],
    maxSelections: 1,
    parse: (v: string) => Number(v),
  },
  {
    key: "review",
  },
  {
    key: "notifications",
  },
  {
    key: "unlockCustomFix",
    title: "Ready to unlock your custom hair fix?",
    subtitle:
      "We can analyze your hair with AI or create recommendations based on your answers",
    options: [
      { id: "scan-hair", label: "Scan My Hair", emoji: "📸" },
      { id: "skip-scan", label: "Skip Hair Scan", emoji: "⏭️" },
    ],
    maxSelections: 1,
  },
  {
    key: "hairScanInfo",
  },
];

type OnboardingStackNavigationProp =
  StackNavigationProp<OnboardingStackParamList>;

const OnboardingFunnelScreen = () => {
  const navigation = useNavigation<OnboardingStackNavigationProp>();
  const { answers, updateAnswer } = useFunnel();
  const [step, setStep] = useState(0);

  const totalSteps = onboardingSteps.length;
  const progress = Math.round(((step + 1) / totalSteps) * 100);

  const currentStep = onboardingSteps[step];
  const answerValue =
    currentStep.key !== "review" &&
    currentStep.key !== "notifications" &&
    currentStep.key !== "hairScanInfo"
      ? answers[currentStep.key]
      : undefined;

  const selected = answerValue
    ? Array.isArray(answerValue)
      ? answerValue
      : [String(answerValue)]
    : [];

  const handleContinue = () => {
    if (step < onboardingSteps.length - 1) {
      setStep(step + 1);
    } else {
      const hairGoal = answers.hairGoal;
      let scanType = ScanType.HairAnalysis;
      if (hairGoal === "find-cuts") {
        scanType = ScanType.FaceShapeAnalysis;
      } else if (hairGoal === "try-styles") {
        scanType = ScanType.HaircutTryOn;
      }
      if (answers.unlockCustomFix === "scan-hair") {
        navigation.navigate("HairScan", {
          screen: "Capture",
          params: { scanType: scanType },
        });
      } else {
        navigation.navigate("Loading", { scanType: scanType });
      }
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      navigation.goBack();
    }
  };

  const renderStep = () => {
    switch (currentStep.key) {
      case "review":
        return (
          <ReviewScreen
            onContinue={handleContinue}
            onBack={handleBack}
            progress={progress}
          />
        );
      case "notifications":
        return (
          <NotificationsScreen
            onComplete={handleContinue}
            onBack={handleBack}
            progress={progress}
          />
        );
      case "hairScanInfo":
        const hairGoal = answers.hairGoal;
        let scanType = ScanType.HairAnalysis;
        if (hairGoal === "find-cuts") {
          scanType = ScanType.FaceShapeAnalysis;
        } else if (hairGoal === "try-styles") {
          scanType = ScanType.HaircutTryOn;
        }
        return (
          <HairScanInfoScreen
            onContinue={handleContinue}
            onBack={handleBack}
            progress={progress}
            scanType={scanType}
          />
        );
      default:
        // This is a question step
        if (
          !currentStep.title ||
          !currentStep.options ||
          !currentStep.maxSelections
        ) {
          return null; // Should not happen with valid data
        }
        return (
          <QuestionCard
            title={currentStep.title}
            subtitle={currentStep.subtitle}
            onContinue={handleContinue}
            onBack={handleBack}
            continueDisabled={selected.length === 0}
            progress={progress}
          >
            <MultiSelect
              options={currentStep.options}
              selectedValues={selected}
              onSelectionChange={(vals) =>
                updateAnswer(
                  currentStep.key as keyof FunnelAnswers,
                  currentStep.maxSelections === 1 ? vals[0] : vals,
                )
              }
              maxSelections={currentStep.maxSelections}
            />
          </QuestionCard>
        );
    }
  };

  return (
    <LinearGradient
      colors={[colors.gradient.light, colors.gradient.dark]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>{renderStep()}</SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    // marginHorizontal: spacing.lg,
  },
});

export default OnboardingFunnelScreen;
