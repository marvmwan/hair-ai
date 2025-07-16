import { Platform } from 'react-native';

export const colors = {
  primary: '#4A90E2',    // Blue for buttons, accents
  accent: '#50C878',     // Green for highlights
  background: '#F5F5F5', // Light gray bg
  // text: '#333333',       // Dark text
  secondary: '#FFFFFF',  // White for cards/buttons
  error: '#FF0000',      // Red for errors
  gradient: {
    light: '#E8F4F8',    // Light blue for gradient start
    dark: '#4A90E2',     // Primary blue for gradient end
  },
  gray: {
    light: '#F0F0F0',
    medium: '#CCCCCC',
    dark: '#999999',
  },
  success: '#50C878',
  warning: '#FFA500',
  text: {
    primary: '#282024',
    secondary: '#41464C',
    tertiary: '#6B7278',
  },
  button: {
    primary: '#FFFFFF',
    secondary: '#50C878',
  }
};

export const typography = {
  sizes: {
    small: 12,
    medium: 16,
    large: 20,
    xlarge: 24,
    xxlarge: 32,
  },
  weights: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  fonts: {
    // SF Rounded for iOS, fallback to system fonts for Android
    primary: Platform.select({
      ios: 'SFProRounded-Regular',
      android: 'sans-serif',
      default: 'sans-serif',
    }),
    // Alternative with more specific fallbacks
    rounded: Platform.select({
      ios: 'SFProRounded-Regular',
      android: 'Roboto',
      default: 'sans-serif',
    }),
  },
};

// Utility function to get SF Rounded font family
export const getSFRoundedFont = () => {
  return Platform.select({
    ios: 'SFProRounded-Regular',
    android: 'Roboto',
    default: 'sans-serif',
  });
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 50,
};