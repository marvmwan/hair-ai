import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from '../../components/Button';
import { borderRadius, colors, spacing, typography } from '../../theme/colors';

interface ReviewScreenProps {
  onContinue: () => void;
  onBack: () => void;
  progress: number;
}

const AVATAR_SIZE = 48;

const ReviewScreen: React.FC<ReviewScreenProps> = ({ onContinue, onBack, progress }) => {
  return (
    <View style={styles.container}>
      {/* Top Bar: Back Button & Progress */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onBack} hitSlop={{ top: 16, left: 16, right: 16, bottom: 16 }}>
          <Ionicons name="arrow-back" size={28} color={colors.text.primary} />
        </TouchableOpacity>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Image source={require('../../../assets/images/social-proof/badge.png')} style={styles.badgeImage} resizeMode="contain" />
        {/* Social Proof */}
        <View style={styles.socialProofContainer}>
          <View style={styles.ratingContainer}>
            <View style={styles.starsContainer}>
              {[...Array(5)].map((_, i) => (
                <View key={i} style={styles.starBox}>
                  <Ionicons name="star" size={24} color="#FFD600" />
                </View>
              ))}
            </View>
            <Text style={styles.ratingText}>4.8</Text>
          </View>
          <View style={styles.avatarsContainer}>
            <Image source={{ uri: 'https://i.pravatar.cc/150?u=a' }} style={styles.avatar} />
            <Image source={{ uri: 'https://i.pravatar.cc/150?u=b' }} style={[styles.avatar, { marginLeft: -spacing.md }]} />
            <Image source={{ uri: 'https://i.pravatar.cc/150?u=c' }} style={[styles.avatar, { marginLeft: -spacing.md }]} />
          </View>
          <Text style={styles.usersCountText}>⭐️ 500,000+ users have already joined</Text>
        </View>

        {/* Reviews */}
        <View style={styles.reviewCard}>
        <View style={styles.reviewHeader}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?u=joe' }}
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                marginRight: spacing.md,
                borderWidth: 1,
                borderColor: '#fff',
              }}
            />
            <View>
              <Text style={styles.reviewName}>Joseph Wilkens</Text>
              <View style={styles.reviewStars}>
                {[...Array(5)].map((_, i) => <Text key={i}>⭐️</Text>)}
              </View>
            </View>
          </View>
          <Text style={styles.reviewBody}>
            This app is incredible! It scans my hair type perfectly and gives personalized care tips. It&apos;s easy to use and has really helped improve my hair health.
          </Text>
        </View>

        <View style={styles.reviewCard}>
          <View style={styles.reviewHeader}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?u=sarah' }}
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                marginRight: spacing.md,
                borderWidth: 1,
                borderColor: '#fff',
              }}
            />
            <View>
              <Text style={styles.reviewName}>Audrey Heper</Text>
              <View style={styles.reviewStars}>
                {[...Array(5)].map((_, i) => <Text key={i}>⭐️</Text>)}
              </View>
            </View>
          </View>
          <Text style={styles.reviewBody}>
            The AI technology in this app is impressive. It scanned my hair and recommended products that actually work for my hair type. My hair is growing back already!
          </Text>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.buttonContainer}>
        <Button
          title="Continue"
          onPress={onContinue}
          size="large"
          style={styles.button}
          textStyle={styles.buttonText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1,    paddingTop: spacing.xl,marginHorizontal: spacing.lg},
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
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  badgeImage: {
    width: '100%',
    height: 150,
    alignSelf: 'center',
  },
  socialProofContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.full,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  starBox: {
    backgroundColor: `${colors.accent}20`, // Light green background
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    marginHorizontal: spacing.xs,
  },
  ratingText: {
    fontFamily: typography.fonts.rounded,
    fontSize: 22,
    fontWeight: '700',
    color: colors.text.primary,
    marginLeft: spacing.md,
  },
  avatarsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  usersCountText: {
    fontFamily: typography.fonts.rounded,
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.secondary,
    marginTop: spacing.sm,
  },
  reviewCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  reviewName: {
    fontFamily: typography.fonts.rounded,
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginRight: spacing.sm,
  },
  reviewStars: {
    flexDirection: 'row',
  },
  reviewBody: {
    fontFamily: typography.fonts.rounded,
    fontSize: 15,
    color: colors.text.secondary,
    lineHeight: 22,
  },
    buttonContainer: {
      paddingVertical: spacing.md,

    },
    button: {
      borderRadius: borderRadius.full,
      backgroundColor: colors.button.primary,
    },
    buttonText: {
      color: colors.text.primary,
    },
});

export default ReviewScreen; 