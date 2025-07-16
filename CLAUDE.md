# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Native mobile app built with Expo and TypeScript, targeting iOS and Android platforms. The app appears to be for hair analysis/AI functionality based on the name "hair-ai" and package identifier "com.skinalyzeteam.hairai".

## Development Commands

### Core Development
- `npm install` - Install dependencies
- `npx expo start` or `npm start` - Start development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run web version

### Code Quality
- `npm run lint` - Run ESLint (uses expo lint configuration)

### Project Management
- `npm run reset-project` - Reset project to blank state (moves existing code to app-example)

## Architecture

### File-Based Routing
The app uses Expo Router with file-based routing in the `/app` directory:
- `/app/_layout.tsx` - Root layout with navigation theme and font loading
- `/app/(tabs)/_layout.tsx` - Tab navigation layout with Home and Explore tabs
- `/app/(tabs)/index.tsx` - Home screen
- `/app/(tabs)/explore.tsx` - Explore screen
- `/app/+not-found.tsx` - 404 error screen

### Component Structure
- `/components/` - Reusable UI components including themed components (ThemedText, ThemedView)
- `/components/ui/` - Lower-level UI components (IconSymbol, TabBarBackground)
- `/hooks/` - Custom React hooks (useColorScheme, useThemeColor)
- `/constants/` - App constants including Colors for light/dark theme

### Theme System
The app implements a comprehensive theming system:
- Light/dark theme support via `useColorScheme` hook
- Theme colors defined in `/constants/Colors.ts`
- Themed components that automatically adapt to color scheme
- Platform-specific styling for iOS and Android

### Key Dependencies
- Expo SDK 53 with new architecture enabled
- React Native 0.79.5 with React 19
- Navigation: React Navigation with bottom tabs
- UI: Expo Vector Icons, Expo Image, Expo Blur
- Animations: React Native Reanimated and Gesture Handler

## Configuration Files

- `app.json` - Expo configuration with app metadata, icons, and build settings
- `tsconfig.json` - TypeScript configuration with strict mode and path aliases (@/*)
- `eslint.config.js` - ESLint configuration using Expo's flat config
- `expo-env.d.ts` - TypeScript environment definitions

## Platform Support

The app is configured for:
- iOS: iPad support, bundle ID: com.skinalyzeteam.hairai
- Android: Edge-to-edge display, adaptive icon, package: com.skinalyzeteam.hairai  
- Web: Static output with Metro bundler

## Development Notes

- Uses TypeScript with strict mode enabled
- Implements platform-specific code (iOS/Android) where needed
- Follows Expo and React Native best practices
- No testing framework currently configured