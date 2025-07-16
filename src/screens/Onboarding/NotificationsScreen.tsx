import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { borderRadius, colors, spacing, typography } from '../../theme/colors';

interface NotificationsScreenProps {
  onComplete: () => void;
  onBack: () => void;
  progress: number;
}

const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ onComplete, onBack, progress }) => {
  const handleAllow = async () => {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    const { status } = await Notifications.requestPermissionsAsync();
    console.log('Notification status:', status);
    onComplete();
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onBack} hitSlop={{ top: 16, left: 16, right: 16, bottom: 16 }}>
          <Ionicons name="arrow-back" size={28} color={colors.text.primary} />
        </TouchableOpacity>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Reach your goals with notifications</Text>

        <View style={styles.iconContainer}>
          <Ionicons name="notifications-outline" size={80} color={colors.primary} />
        </View>

        <View style={styles.dialogBox}>
          <Text style={styles.dialogTitle}>Notifications</Text>
          <Text style={styles.dialogText}>
            Allow us to send you notifications and updates on your progress
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.dialogButton} onPress={onComplete}>
              <Text style={styles.dialogButtonText}>Don&apos;t Allow</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity style={styles.dialogButton} onPress={handleAllow}>
              <Text style={[styles.dialogButtonText, styles.allowText]}>Allow</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1,    paddingTop: spacing.xl,marginHorizontal: spacing.lg, },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  progressBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    marginLeft: spacing.md,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.lg,
  },
  title: {
    fontFamily: typography.fonts.rounded,
    fontSize: typography.sizes.xxlarge,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  iconContainer: {
    marginBottom: spacing.xl,
    padding: spacing.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: borderRadius.full,
  },
  dialogBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: borderRadius.lg,
    padding: spacing.sm,
    width: '100%',
    alignItems: 'center',
  },
  dialogTitle: {
    fontFamily: typography.fonts.rounded,
    fontSize: typography.sizes.large,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  dialogText: {
    fontFamily: typography.fonts.rounded,
    fontSize: typography.sizes.medium,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  buttonRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.gray.medium,
    width: '100%',
  },
  dialogButton: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  separator: {
    width: 1,
    backgroundColor: colors.gray.medium,
  },
  dialogButtonText: {
    fontFamily: typography.fonts.rounded,
    fontSize: typography.sizes.medium,
    fontWeight: typography.weights.medium,
    color: colors.text.secondary,
  },
  allowText: {
    color: colors.primary,
    fontWeight: typography.weights.bold,
  },
});

export default NotificationsScreen; 