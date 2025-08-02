# HairStyle AI - React Native Boilerplate

A complete React Native boilerplate for a hair care and styling app with AI analysis, built with Expo, TypeScript, and React Navigation.

## 🚀 Features

- **Complete Authentication Flow**: Auth context with async storage persistence
- **14-Question Onboarding Funnel**: Modular, A/B testable questionnaire
- **AI Hair Analysis**: Camera integration for hair scanning
- **Subscription Management**: RevenueCat integration for premium features
- **Responsive Design**: Gender-inclusive color scheme and professional UI
- **Modern Architecture**: Context-based state management, TypeScript, hooks

## 📱 App Flow

1. **Launch Check**: Authenticated + completed onboarding → Home, else → Welcome
2. **Welcome Screen**: Gradient design with "Get Started" CTA
3. **Onboarding Funnel**: 14 questions → Hair scan → Loading → Paywall
4. **Home Dashboard**: Tab navigation with hair analysis features
5. **Subscription**: Paywall modal if user isn't subscribed

## 🏗️ Architecture

```
src/
├── contexts/          # Auth, Funnel, RevenueCat providers
├── navigation/        # Stack and tab navigators
├── screens/           # All app screens
│   ├── Onboarding/    # 14 questions + scan + paywall
│   ├── WelcomeScreen.tsx
│   ├── HomeScreen.tsx
│   ├── ProfileScreen.tsx
│   └── SettingsScreen.tsx
├── components/        # Reusable UI components
├── services/          # API calls and mock data
├── theme/            # Colors, typography, spacing
└── utils/            # Storage helpers
```

## 🔧 Installation

```bash
# Install dependencies
npm install

# Install additional required packages
npm install @react-navigation/stack @react-native-async-storage/async-storage
npm install @react-native-community/slider expo-camera expo-linear-gradient

# Start development server
npm start
```

## 📋 Required Dependencies

```json
{
  "@react-navigation/native": "^7.1.6",
  "@react-navigation/stack": "^7.1.1",
  "@react-navigation/bottom-tabs": "^7.3.10",
  "@react-native-async-storage/async-storage": "^1.24.0",
  "@react-native-community/slider": "^4.5.2",
  "expo-camera": "~16.0.8",
  "expo-linear-gradient": "~14.0.1",
  "@expo/vector-icons": "^14.1.0"
}
```

## 🎨 Theme System

Gender-inclusive color palette:

- Primary: #4A90E2 (Blue)
- Accent: #50C878 (Green)
- Background: #F5F5F5 (Light Gray)
- Text: #333333 (Dark)
- Secondary: #FFFFFF (White)

## 📊 State Management

### AuthContext

- `isAuthenticated`: Boolean
- `userId`: String | null
- `login()`, `logout()`, `checkAuthStatus()`

### RevenueCatContext

- `isSubscribed`: Boolean
- `purchase()`, `restorePurchases()`

### FunnelContext

- `answers`: FunnelAnswers object
- `updateAnswer()`, `getProgress()`, `resetAnswers()`

## 🔄 Navigation Flow

```
App Launch
├── Authenticated + Completed Onboarding
│   ├── Subscribed → Home (Tab Navigator)
│   └── Not Subscribed → Home + Paywall Modal
├── Authenticated + Not Completed → Continue Onboarding
└── Not Authenticated → Welcome → Onboarding
```

## 📱 Onboarding Questions

1. **Gender**: Single-select (Male, Female, Non-binary, Prefer not to say)
2. **Age Group**: Single-select (16-24, 25-34, 35-44, 45-54, 55+)
3. **Daily Hair Confidence**: Slider (1-10)
4. **Common Hair Hurdles**: Multi-select (up to 3)
5. **Styling Frustrations**: Single-select
6. **Bad Hair Day Triggers**: Multi-select (up to 2)
7. **Barber/Salon Regrets**: Single-select
8. **Product Overwhelm**: Slider (1-10)
9. **Lifestyle Hair Clashes**: Single-select
10. **Emotional Hair Impact**: Multi-select (up to 3)
11. **Hair Goals**: Multi-select (up to 2)
12. **Past Attempts**: Single-select
13. **Readiness for Change**: Slider (1-10)
14. **Unlock Custom Fix**: Scan hair or skip

## 🎯 A/B Testing

Easily modify onboarding flow by editing the `onboardingSteps` array in `OnboardingNavigator.tsx`:

```typescript
const onboardingSteps = [
  { name: "Question1", component: Question1 },
  { name: "Question2", component: Question2 },
  // Reorder, add, or remove steps here
];
```

## 🔌 API Integration

Mock API service in `src/services/api.ts` with functions for:

- `submitFunnelData()`: Submit onboarding answers
- `analyzeHairImage()`: Process hair scan
- `processPayment()`: Handle subscriptions
- `getUserProfile()`: Get user data

## 🚀 Getting Started

1. **Install dependencies**: `npm install`
2. **Update app.json**: Change bundle identifiers
3. **Run the app**: `npm start`
4. **Test flow**: Welcome → Onboarding → Home
5. **Customize**: Edit questions, colors, or add features

## 📝 Development Notes

- All screens use TypeScript with proper typing
- Modular component structure for easy maintenance
- Comprehensive error handling and loading states
- Platform-specific code where needed (iOS/Android)
- Ready for RevenueCat integration (mock implemented)

## 🎉 Ready to Use!

The boilerplate is complete and ready to run with `expo start`. All screens, navigation, and core functionality are implemented with best practices and modern React Native architecture.
