import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";
import { useRevenueCat } from "../contexts/RevenueCatContext";
import { colors, spacing, typography } from "../theme/colors";

const SettingsScreen = () => {
  const { logout } = useAuth();
  const { isSubscribed } = useRevenueCat();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  const handleLogout = async () => {
    await logout();
  };

  const handleManageSubscription = () => {
    console.log("Manage subscription");
  };

  const handlePrivacyPolicy = () => {
    console.log("Privacy policy");
  };

  const handleTermsOfService = () => {
    console.log("Terms of service");
  };

  const handleRateApp = () => {
    console.log("Rate app");
  };

  const SettingItem = ({
    icon,
    title,
    value,
    onValueChange,
    showSwitch = false,
    onPress,
  }: any) => (
    <View style={styles.settingItem}>
      <View style={styles.settingLeft}>
        <Ionicons name={icon} size={24} color={colors.primary} />
        <Text style={styles.settingTitle}>{title}</Text>
      </View>
      {showSwitch ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: colors.gray.medium, true: colors.primary }}
          thumbColor={value ? colors.secondary : colors.gray.light}
        />
      ) : (
        <View style={styles.settingRight}>
          {value && <Text style={styles.settingValue}>{value}</Text>}
          <Ionicons name="chevron-forward" size={20} color={colors.gray.dark} />
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>

        {/* Settings sections */}
        <View style={styles.sectionsContainer}>
          {/* Preferences */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            <SettingItem
              icon="notifications"
              title="Push Notifications"
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              showSwitch={true}
            />
            <SettingItem
              icon="moon"
              title="Dark Mode"
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              showSwitch={true}
            />
          </View>

          {/* Account */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            <SettingItem
              icon="card"
              title="Manage Subscription"
              value={isSubscribed ? "Premium" : "Free"}
              onPress={handleManageSubscription}
            />
            <SettingItem
              icon="person"
              title="Account Settings"
              onPress={() => console.log("Account settings")}
            />
            <SettingItem
              icon="archive"
              title="Data & Privacy"
              onPress={() => console.log("Data & Privacy")}
            />
          </View>

          {/* Support */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support</Text>
            <SettingItem
              icon="help-circle"
              title="Help Center"
              onPress={() => console.log("Help center")}
            />
            <SettingItem
              icon="mail"
              title="Contact Support"
              onPress={() => console.log("Contact support")}
            />
            <SettingItem
              icon="star"
              title="Rate Cuts AI"
              onPress={handleRateApp}
            />
          </View>

          {/* Legal */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Legal</Text>
            <SettingItem
              icon="document-text"
              title="Privacy Policy"
              onPress={handlePrivacyPolicy}
            />
            <SettingItem
              icon="document-text"
              title="Terms of Service"
              onPress={handleTermsOfService}
            />
          </View>

          {/* App Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>App Info</Text>
            <View style={styles.appInfo}>
              <Text style={styles.appInfoText}>Version 1.0.0</Text>
              <Text style={styles.appInfoText}>© 2024 HairStyle AI</Text>
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
  },
  title: {
    fontSize: typography.sizes.xxlarge,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
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
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray.light,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingTitle: {
    fontSize: typography.sizes.medium,
    color: colors.text.primary,
    marginLeft: spacing.md,
  },
  settingRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingValue: {
    fontSize: typography.sizes.medium,
    color: colors.gray.dark,
    marginRight: spacing.sm,
  },
  appInfo: {
    alignItems: "center",
    paddingVertical: spacing.md,
  },
  appInfoText: {
    fontSize: typography.sizes.small,
    color: colors.gray.dark,
    marginBottom: spacing.xs,
  },
  logoutContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  logoutButton: {
    borderColor: colors.error,
  },
});

export default SettingsScreen;
