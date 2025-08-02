import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import { useRevenueCat } from "../contexts/RevenueCatContext";
import { colors, spacing, typography } from "../theme/colors";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { isSubscribed } = useRevenueCat();

  useEffect(() => {
    // If user is not subscribed, show paywall modal
    if (!isSubscribed) {
      navigation.navigate("Paywall" as never);
    }
  }, [isSubscribed, navigation]);

  const handleAnalyzeHair = () => {
    // Navigate to hair analysis flow
    console.log("Navigate to hair analysis");
  };

  const handleViewRecommendations = () => {
    // Navigate to recommendations
    console.log("Navigate to recommendations");
  };

  const handleBookBarber = () => {
    // Navigate to barber booking
    console.log("Navigate to barber booking");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome back!</Text>
          <Text style={styles.subtitle}>Your Hair Dashboard</Text>
        </View>

        {/* Main action cards */}
        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <View style={styles.cardIcon}>
              <Ionicons name="camera" size={32} color={colors.primary} />
            </View>
            <Text style={styles.cardTitle}>Analyze Your Hair</Text>
            <Text style={styles.cardDescription}>
              Get instant AI-powered analysis of your hair type and face shape
            </Text>
            <Button
              title="Start Analysis"
              onPress={handleAnalyzeHair}
              style={styles.cardButton}
            />
          </View>

          <View style={styles.card}>
            <View style={styles.cardIcon}>
              <Ionicons name="star" size={32} color={colors.accent} />
            </View>
            <Text style={styles.cardTitle}>Hair Recommendations</Text>
            <Text style={styles.cardDescription}>
              Discover personalized hairstyles and products just for you
            </Text>
            <Button
              title="View Recommendations"
              onPress={handleViewRecommendations}
              variant="outline"
              style={styles.cardButton}
            />
          </View>

          <View style={styles.card}>
            <View style={styles.cardIcon}>
              <Ionicons name="cut" size={32} color={colors.primary} />
            </View>
            <Text style={styles.cardTitle}>Barber Instructions</Text>
            <Text style={styles.cardDescription}>
              Get detailed instructions to show your barber or stylist
            </Text>
            <Button
              title="Get Instructions"
              onPress={handleBookBarber}
              variant="secondary"
              style={styles.cardButton}
            />
          </View>
        </View>

        {/* Quick stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Your Hair Journey</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Analyses</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Recommendations</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Saved Styles</Text>
            </View>
          </View>
        </View>

        {/* Recent activity placeholder */}
        <View style={styles.activityContainer}>
          <Text style={styles.activityTitle}>Recent Activity</Text>
          <Text style={styles.activityPlaceholder}>
            Your recent hair analyses and recommendations will appear here
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    backgroundColor: colors.secondary,
  },
  greeting: {
    fontSize: typography.sizes.xxlarge,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.sizes.medium,
    color: colors.gray.dark,
  },
  cardsContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    gap: spacing.lg,
  },
  card: {
    backgroundColor: colors.secondary,
    borderRadius: 16,
    padding: spacing.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  cardTitle: {
    fontSize: typography.sizes.large,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  cardDescription: {
    fontSize: typography.sizes.medium,
    color: colors.gray.dark,
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  cardButton: {
    alignSelf: "flex-start",
  },
  statsContainer: {
    marginHorizontal: spacing.lg,
    marginVertical: spacing.md,
    backgroundColor: colors.secondary,
    borderRadius: 16,
    padding: spacing.lg,
  },
  statsTitle: {
    fontSize: typography.sizes.large,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.lg,
    textAlign: "center",
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: typography.sizes.xxlarge,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: typography.sizes.small,
    color: colors.gray.dark,
    textAlign: "center",
  },
  activityContainer: {
    marginHorizontal: spacing.lg,
    marginVertical: spacing.md,
    backgroundColor: colors.secondary,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  activityTitle: {
    fontSize: typography.sizes.large,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  activityPlaceholder: {
    fontSize: typography.sizes.medium,
    color: colors.gray.dark,
    textAlign: "center",
    fontStyle: "italic",
  },
});

export default HomeScreen;
