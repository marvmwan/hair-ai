import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFunnel } from '../../contexts/FunnelContext';
import { api } from '../../services/api';
import { colors, typography, spacing } from '../../theme/colors';
import LoadingSpinner from '../../components/LoadingSpinner';
import { LinearGradient } from 'expo-linear-gradient';

const LoadingScreen = () => {
  const navigation = useNavigation();
  const { answers } = useFunnel();
  const [loadingText, setLoadingText] = React.useState('Analyzing your hair...');
  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    const analyzeHair = async () => {
      try {
        // Simulate analysis process with different steps
        const steps = [
          { text: 'Analyzing your hair type...', duration: 1000 },
          { text: 'Determining face shape...', duration: 1000 },
          { text: 'Processing your preferences...', duration: 1000 },
          { text: 'Generating recommendations...', duration: 1000 },
          { text: 'Finalizing your profile...', duration: 1000 },
        ];

        for (let i = 0; i < steps.length; i++) {
          setLoadingText(steps[i].text);
          setProgress(((i + 1) / steps.length) * 100);
          await new Promise(resolve => setTimeout(resolve, steps[i].duration));
        }

        // Submit funnel data to API
        await api.submitFunnelData(answers);

        // If hair scan was taken, analyze the image
        if (answers.hairScanImage) {
          await api.analyzeHairImage(answers.hairScanImage, answers);
        }

        // Navigate to paywall
        navigation.navigate('Paywall' as never);
      } catch (error) {
        console.error('Error analyzing hair:', error);
        // Still navigate to paywall even if analysis fails
        navigation.navigate('Paywall' as never);
      }
    };

    analyzeHair();
  }, [answers, navigation]);

  return (
    <LinearGradient
      colors={[colors.gradient.light, colors.gradient.dark]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* AI Analysis Animation */}
          <View style={styles.animationContainer}>
            <View style={styles.aiIcon}>
              <Text style={styles.aiIconText}>🧠</Text>
            </View>
            <View style={styles.pulseContainer}>
              <View style={[styles.pulse, styles.pulse1]} />
              <View style={[styles.pulse, styles.pulse2]} />
              <View style={[styles.pulse, styles.pulse3]} />
            </View>
          </View>

          {/* Loading text */}
          <Text style={styles.loadingText}>{loadingText}</Text>

          {/* Progress bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${progress}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>{Math.round(progress)}%</Text>
          </View>

          {/* Spinner */}
          <LoadingSpinner
            size="large"
            color={colors.secondary}
            style={styles.spinner}
          />

          {/* Info text */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Creating Your Hair Profile</Text>
            <Text style={styles.infoText}>
              Our AI is analyzing your responses and creating a personalized hair profile just for you.
            </Text>
          </View>

          {/* Fun facts */}
          <View style={styles.factsContainer}>
            <Text style={styles.factTitle}>💡 Did you know?</Text>
            <Text style={styles.factText}>
              Hair grows about 6 inches per year on average, but this can vary based on genetics, diet, and hair care routine.
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationContainer: {
    position: 'relative',
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  aiIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  aiIconText: {
    fontSize: 40,
  },
  pulseContainer: {
    position: 'absolute',
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulse: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  pulse1: {
    // Animation would be added here in a real implementation
  },
  pulse2: {
    // Animation would be added here in a real implementation
  },
  pulse3: {
    // Animation would be added here in a real implementation
  },
  loadingText: {
    fontSize: typography.sizes.xlarge,
    fontWeight: typography.weights.bold,
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: spacing.xl,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    marginRight: spacing.md,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.secondary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: typography.sizes.medium,
    color: colors.secondary,
    fontWeight: typography.weights.medium,
    minWidth: 40,
    textAlign: 'right',
  },
  spinner: {
    marginBottom: spacing.xl,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  infoTitle: {
    fontSize: typography.sizes.large,
    fontWeight: typography.weights.bold,
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  infoText: {
    fontSize: typography.sizes.medium,
    color: colors.secondary,
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 22,
    paddingHorizontal: spacing.md,
  },
  factsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: spacing.lg,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  factTitle: {
    fontSize: typography.sizes.medium,
    fontWeight: typography.weights.bold,
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  factText: {
    fontSize: typography.sizes.small,
    color: colors.secondary,
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 18,
  },
});

export default LoadingScreen;