import { Platform } from "react-native";

export const _ = {
  primary: "#4A90E2", // Blue for buttons, accents
  accent: "#50C878", // Green for highlights
  background: "#F5F5F5", // Light gray bg
  // text: '#333333',       // Dark text
  secondary: "#FFFFFF", // White for cards/buttons
  error: "#FF0000", // Red for errors
  gradient: {
    // light: "#E8F4F8", // Light blue for gradient start
    // dark: "#4A90E2", // Primary blue for gradient end
        light: "#E8E4F0", 
    dark: "#F5F1EB",
  // Soft Neutral Blue-Grey - Calm, neutral, and high-end
  softNeutral: {
    light: "#DDECFB",
    dark: "#F2F6F9",
  },
  // Muted Lavender to Sand - Elevated and inclusive
  muted: {
    light: "#E8E4F0", 
    dark: "#F5F1EB",
  },
  // Warm Grey to Sage - Unisex, calming, earthy
  warmSage: {
    light: "#F4F3F1",
    dark: "#D9E4DC",
  },
  // Fresh Mint to Sky - Clean, refreshing tech feel
  freshMint: {
    light: "#E3F9F4",
    dark: "#E4F1FB",
  },
  // Charcoal Fade - Pure grayscale, ultra neutral
  charcoal: {
    light: "#F5F6F7",
    dark: "#E6E8EB",
  },
  // Male-Oriented Gradients
  // Slate to Steel - Cool greys with structure
  slate: {
    light: "#D7DBE3",
    dark: "#C1C9D6",
  },
  // Ocean Depths - Mature blue palette
  ocean: {
    light: "#A2C5DD",
    dark: "#567C96",
  },
  // Asphalt Fade - Dark, grounded
  asphalt: {
    light: "#2C3E50",
    dark: "#4C5B66",
  },
  // Olive to Graphite - Masculine without aggression
  olive: {
    light: "#BCC9B3",
    dark: "#A1AEB2",
  },
  // Midnight Teal - Rich and modern
  midnight: {
    light: "#2C3E50",
    dark: "#0B8793",
  },

  },
  gray: {
    light: "#F0F0F0",
    medium: "#CCCCCC",
    dark: "#999999",
  },
  success: "#50C878",
  warning: "#FFA500",
  text: {
    primary: "#282024",
    secondary: "#41464C",
    tertiary: "#6B7278",
  },
  button: {
    primary: "#FFFFFF",
    secondary: "#50C878",
  },
};

export const colors = {
  primary: "#7E6FA3",        // deeper lavender
  accent: "#D8A657",         // soft warm gold
  background: "#FBF9F7",     // pale sand
  secondary: "#FFFFFF",
  error: "#E53E3E",
  gradient: {
    light: "#E8E4F0",
    dark: "#F5F1EB",
  },
  gray: {
    light: "#F5F5F5",
    medium: "#D1C7CF",
    dark: "#A39BA2",
  },
  success: "#50C878",
  warning: "#FFA500",
  text: {
    primary: "#2C1F2F",
    secondary: "#5A4A66",
    tertiary: "#837993",
  },
  button: {
    primary: "#FFFFFF",
    secondary: "#D8A657",
  },
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
    light: "300" as const,
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },
  fonts: {
    // SF Rounded for iOS, fallback to system fonts for Android
    primary: Platform.select({
      ios: "SFProRounded-Regular",
      android: "sans-serif",
      default: "sans-serif",
    }),
    // Alternative with more specific fallbacks
    rounded: Platform.select({
      ios: "SFProRounded-Regular",
      android: "Roboto",
      default: "sans-serif",
    }),
  },
};

// Utility function to get SF Rounded font family
export const getSFRoundedFont = () => {
  return Platform.select({
    ios: "SFProRounded-Regular",
    android: "Roboto",
    default: "sans-serif",
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
