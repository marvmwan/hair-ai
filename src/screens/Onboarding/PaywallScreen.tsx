import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Button from "../../components/Button";
import { useAuth } from "../../contexts/AuthContext";
import { useRevenueCat } from "../../contexts/RevenueCatContext";
import { colors, spacing, typography } from "../../theme/colors";
import { saveItem, StorageKeys } from "../../utils/storage";

const PaywallScreen = () => {
  const navigation = useNavigation();
  const { login } = useAuth();
  const { purchase } = useRevenueCat();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("premium");

  const plans = [
    {
      id: "premium",
      title: "Premium",
      price: "$9.99",
      period: "month",
      features: [
        "AI Hair Analysis",
        "Personalized Recommendations",
        "Barber Instructions",
        "Product Suggestions",
        "Style Tutorials",
        "Face Shape Analysis",
      ],
      popular: true,
    },
    {
      id: "annual",
      title: "Annual",
      price: "$79.99",
      period: "year",
      features: [
        "Everything in Premium",
        "Save 33% vs Monthly",
        "Priority Support",
        "Advanced Analytics",
        "Exclusive Content",
        "Early Access to Features",
      ],
      popular: false,
    },
  ];

  const handlePurchase = async () => {
    setIsLoading(true);
    try {
      // Process purchase through RevenueCat
      const success = await purchase();

      if (success) {
        // Mark onboarding as completed
        await saveItem(StorageKeys.ONBOARDING_COMPLETED, "true");

        // Log in user (mock authentication)
        const mockToken = "mock_token_" + Date.now();
        const mockUserId = "user_" + Date.now();
        await login(mockToken, mockUserId);

        Alert.alert(
          "Success!",
          "Welcome to HairStyle AI Premium! Your personalized hair journey starts now.",
          [
            {
              text: "Get Started",
              onPress: () => {
                // Navigation will be handled by AppNavigator based on auth state
              },
            },
          ],
        );
      } else {
        Alert.alert("Purchase Failed", "Please try again or contact support.");
      }
    } catch (error) {
      console.error("Purchase error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestorePurchases = async () => {
    setIsLoading(true);
    try {
      // This would restore previous purchases in a real app
      Alert.alert("Restore Purchases", "No previous purchases found.");
    } catch (error) {
      console.error("Restore error:", error);
      Alert.alert("Error", "Failed to restore purchases.");
    } finally {
      setIsLoading(false);
    }
  };

  const PlanCard = ({ plan }: { plan: (typeof plans)[0] }) => (
    <View
      style={[
        styles.planCard,
        selectedPlan === plan.id && styles.selectedPlan,
        plan.popular && styles.popularPlan,
      ]}
    >
      {plan.popular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularBadgeText}>Most Popular</Text>
        </View>
      )}

      <Text style={styles.planTitle}>{plan.title}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{plan.price}</Text>
        <Text style={styles.period}>/{plan.period}</Text>
      </View>

      <View style={styles.featuresContainer}>
        {plan.features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <Ionicons name="checkmark" size={16} color={colors.accent} />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>

      <Button
        title={selectedPlan === plan.id ? "Selected" : "Select Plan"}
        onPress={() => setSelectedPlan(plan.id)}
        variant={selectedPlan === plan.id ? "primary" : "outline"}
        style={styles.selectButton}
      />
    </View>
  );

  return (
    <LinearGradient
      colors={[colors.gradient.light, colors.gradient.dark]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Unlock Your Hair Potential</Text>
            <Text style={styles.subtitle}>
              Get personalized recommendations and transform your hair routine
            </Text>
          </View>

          {/* Benefits */}
          <View style={styles.benefitsContainer}>
            <View style={styles.benefitItem}>
              <Ionicons name="sparkles" size={32} color={colors.secondary} />
              <Text style={styles.benefitTitle}>AI-Powered Analysis</Text>
              <Text style={styles.benefitText}>
                Advanced AI analyzes your hair type and face shape for perfect
                matches
              </Text>
            </View>

            <View style={styles.benefitItem}>
              <Ionicons name="person" size={32} color={colors.secondary} />
              <Text style={styles.benefitTitle}>Personalized Just for You</Text>
              <Text style={styles.benefitText}>
                Custom recommendations based on your unique hair goals and
                lifestyle
              </Text>
            </View>

            <View style={styles.benefitItem}>
              <Ionicons name="cut" size={32} color={colors.secondary} />
              <Text style={styles.benefitTitle}>Expert Barber Tips</Text>
              <Text style={styles.benefitText}>
                Professional instructions to show your barber or stylist
              </Text>
            </View>
          </View>

          {/* Pricing Plans */}
          <View style={styles.plansContainer}>
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </View>

          {/* CTA Button */}
          <View style={styles.ctaContainer}>
            <Button
              title="Start Your Hair Journey"
              onPress={handlePurchase}
              loading={isLoading}
              disabled={isLoading}
              size="large"
              style={styles.ctaButton}
            />

            <Button
              title="Restore Purchases"
              onPress={handleRestorePurchases}
              variant="outline"
              style={styles.restoreButton}
            />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Cancel anytime. No commitment. Terms apply.
            </Text>
            <View style={styles.footerLinks}>
              <Text style={styles.footerLink}>Privacy Policy</Text>
              <Text style={styles.footerSeparator}>•</Text>
              <Text style={styles.footerLink}>Terms of Service</Text>
            </View>
          </View>
        </ScrollView>
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
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  header: {
    alignItems: "center",
    paddingVertical: spacing.xl,
  },
  title: {
    fontSize: typography.sizes.xxlarge,
    fontWeight: typography.weights.bold,
    color: colors.secondary,
    textAlign: "center",
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: typography.sizes.medium,
    color: colors.secondary,
    textAlign: "center",
    opacity: 0.9,
    lineHeight: 22,
  },
  benefitsContainer: {
    marginBottom: spacing.xl,
  },
  benefitItem: {
    alignItems: "center",
    marginBottom: spacing.lg,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    padding: spacing.lg,
  },
  benefitTitle: {
    fontSize: typography.sizes.large,
    fontWeight: typography.weights.bold,
    color: colors.secondary,
    textAlign: "center",
    marginVertical: spacing.sm,
  },
  benefitText: {
    fontSize: typography.sizes.medium,
    color: colors.secondary,
    textAlign: "center",
    opacity: 0.9,
    lineHeight: 20,
  },
  plansContainer: {
    marginBottom: spacing.xl,
  },
  planCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: "transparent",
    position: "relative",
  },
  selectedPlan: {
    borderColor: colors.secondary,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  popularPlan: {
    borderColor: colors.accent,
  },
  popularBadge: {
    position: "absolute",
    top: -8,
    right: spacing.lg,
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  popularBadgeText: {
    fontSize: typography.sizes.small,
    fontWeight: typography.weights.bold,
    color: colors.secondary,
  },
  planTitle: {
    fontSize: typography.sizes.xlarge,
    fontWeight: typography.weights.bold,
    color: colors.secondary,
    textAlign: "center",
    marginBottom: spacing.md,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: spacing.lg,
  },
  price: {
    fontSize: typography.sizes.xxlarge,
    fontWeight: typography.weights.bold,
    color: colors.secondary,
  },
  period: {
    fontSize: typography.sizes.medium,
    color: colors.secondary,
    opacity: 0.8,
  },
  featuresContainer: {
    marginBottom: spacing.lg,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  featureText: {
    fontSize: typography.sizes.medium,
    color: colors.secondary,
    marginLeft: spacing.sm,
    flex: 1,
  },
  selectButton: {
    alignSelf: "center",
  },
  ctaContainer: {
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  ctaButton: {
    backgroundColor: colors.secondary,
    width: "100%",
    marginBottom: spacing.md,
  },
  restoreButton: {
    borderColor: colors.secondary,
  },
  footer: {
    alignItems: "center",
    paddingBottom: spacing.xl,
  },
  footerText: {
    fontSize: typography.sizes.small,
    color: colors.secondary,
    textAlign: "center",
    opacity: 0.8,
    marginBottom: spacing.md,
  },
  footerLinks: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerLink: {
    fontSize: typography.sizes.small,
    color: colors.secondary,
    textDecorationLine: "underline",
    opacity: 0.8,
  },
  footerSeparator: {
    fontSize: typography.sizes.small,
    color: colors.secondary,
    opacity: 0.8,
    marginHorizontal: spacing.sm,
  },
});

export default PaywallScreen;
