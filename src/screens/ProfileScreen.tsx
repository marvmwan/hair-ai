import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";
import { useRevenueCat } from "../contexts/RevenueCatContext";
import { colors, spacing, typography } from "../theme/colors";

const ProfileScreen = () => {
  const { logout } = useAuth();
  const { isSubscribed } = useRevenueCat();

  const handleLogout = async () => {
    await logout();
  };

  const handleEditProfile = () => {
    console.log("Edit profile");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={60} color={colors.primary} />
          </View>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>john.doe@example.com</Text>
          <View style={styles.subscriptionBadge}>
            <Text style={styles.subscriptionText}>
              {isSubscribed ? "Premium Member" : "Free Account"}
            </Text>
          </View>
        </View>

        {/* Profile sections */}
        <View style={styles.sectionsContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            <View style={styles.sectionContent}>
              <Button
                title="Edit Profile"
                onPress={handleEditProfile}
                variant="outline"
                style={styles.sectionButton}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hair Profile</Text>
            <View style={styles.profileStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>Wavy</Text>
                <Text style={styles.statLabel}>Hair Type</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>Oval</Text>
                <Text style={styles.statLabel}>Face Shape</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>Medium</Text>
                <Text style={styles.statLabel}>Hair Length</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            <View style={styles.preferenceItem}>
              <Ionicons name="notifications" size={24} color={colors.primary} />
              <Text style={styles.preferenceText}>Push Notifications</Text>
              <Text style={styles.preferenceValue}>On</Text>
            </View>
            <View style={styles.preferenceItem}>
              <Ionicons name="moon" size={24} color={colors.primary} />
              <Text style={styles.preferenceText}>Dark Mode</Text>
              <Text style={styles.preferenceValue}>Off</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support</Text>
            <View style={styles.supportItem}>
              <Ionicons name="help-circle" size={24} color={colors.primary} />
              <Text style={styles.supportText}>Help Center</Text>
            </View>
            <View style={styles.supportItem}>
              <Ionicons name="mail" size={24} color={colors.primary} />
              <Text style={styles.supportText}>Contact Us</Text>
            </View>
          </View>
        </View>

        {/* Logout button */}
        <View style={styles.logoutContainer}>
          <Button
            title="Logout"
            onPress={handleLogout}
            variant="outline"
            style={styles.logoutButton}
          />
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
    backgroundColor: colors.secondary,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  name: {
    fontSize: typography.sizes.xlarge,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  email: {
    fontSize: typography.sizes.medium,
    color: colors.gray.dark,
    marginBottom: spacing.md,
  },
  subscriptionBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
  },
  subscriptionText: {
    fontSize: typography.sizes.small,
    color: colors.secondary,
    fontWeight: typography.weights.medium,
  },
  sectionsContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  section: {
    backgroundColor: colors.secondary,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.sizes.large,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  sectionContent: {
    gap: spacing.md,
  },
  sectionButton: {
    alignSelf: "flex-start",
  },
  profileStats: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: typography.sizes.large,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: typography.sizes.small,
    color: colors.gray.dark,
  },
  preferenceItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm,
  },
  preferenceText: {
    flex: 1,
    fontSize: typography.sizes.medium,
    color: colors.text.primary,
    marginLeft: spacing.md,
  },
  preferenceValue: {
    fontSize: typography.sizes.medium,
    color: colors.primary,
    fontWeight: typography.weights.medium,
  },
  supportItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm,
  },
  supportText: {
    fontSize: typography.sizes.medium,
    color: colors.text.primary,
    marginLeft: spacing.md,
  },
  logoutContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  logoutButton: {
    borderColor: colors.error,
  },
});

export default ProfileScreen;
