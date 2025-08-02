import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { OnboardingStackParamList } from '../navigation/OnboardingNavigator';
import { borderRadius, spacing, typography } from '../theme/colors';

type UnlockHairTryOnScreenNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'UnlockHairTryOn'
>;
type UnlockHairTryOnScreenRouteProp = RouteProp<
  OnboardingStackParamList,
  'UnlockHairTryOn'
>;

type Props = {
  navigation: UnlockHairTryOnScreenNavigationProp;
  route: UnlockHairTryOnScreenRouteProp;
};

const UnlockHairTryOnScreen: React.FC<Props> = ({ navigation, route }) => {
  const { haircut } = route.params;

  return (
    <LinearGradient colors={['#FEE7F0', '#F6D9E3']} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.popToTop()} style={styles.closeButton}>
          <Ionicons name="close" size={32} color="#333" />
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>GET YOUR DREAM HAIR STYLE!</Text>
          <Text style={styles.subtitle}>Proven to help you transform your hair routine.</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>Reveal what you&apos;ll look like 👀</Text>
            <Image 
              source={{ uri: haircut.thumbnail_url }} 
              style={styles.image} 
              blurRadius={15} 
            />
          </View>
          <View style={styles.pagination}>
            {[...Array(4)].map((_, i) => (
              <View key={i} style={[styles.dot, i === 2 ? styles.activeDot : {}]} />
            ))}
          </View>
          <Text style={styles.price}>Glam AI Pro - $13.99/week</Text>
          <TouchableOpacity 
            style={styles.continueButton} 
            onPress={() => navigation.navigate('SignIn', { haircut })}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
          <Text style={styles.disclaimer}>Starts immediately. Cancel anytime</Text>
          <View style={styles.footer}>
            <TouchableOpacity><Text style={styles.footerText}>Terms of Use</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.footerText}>Restore Purchase</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.footerText}>Privacy Policy</Text></TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
  },
  scrollContent: {
    paddingTop: 120,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    paddingBottom: 40,
  },
  title: {
    fontFamily: typography.fonts.rounded,
    fontWeight: 'bold',
    fontSize: 28,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: typography.fonts.rounded,
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    alignItems: 'center',
    width: '100%',
  },
  cardText: {
    fontFamily: typography.fonts.rounded,
    fontWeight: '600',
    fontSize: 18,
    color: '#333',
    marginBottom: spacing.md,
  },
  image: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderRadius: borderRadius.xl,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0,0,0,0.2)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#333',
  },
  price: {
    fontFamily: typography.fonts.rounded,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  continueButton: {
    backgroundColor: 'white',
    borderRadius: borderRadius.full,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    width: '100%',
    alignItems: 'center',
    marginTop: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  continueButtonText: {
    fontFamily: typography.fonts.rounded,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
  },
  disclaimer: {
    fontFamily: typography.fonts.rounded,
    fontSize: 14,
    color: '#555',
    marginTop: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: spacing.xl,
  },
  footerText: {
    fontFamily: typography.fonts.rounded,
    fontSize: 14,
    color: '#555',
    textDecorationLine: 'underline',
  }
});

export default UnlockHairTryOnScreen; 