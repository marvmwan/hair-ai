import { FontAwesome } from "@expo/vector-icons";
import * as AppleAuthentication from "expo-apple-authentication";
import * as WebBrowser from "expo-web-browser";

import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import {
    GoogleSignin,
    isErrorWithCode,
    isSuccessResponse,
    statusCodes,
} from "@react-native-google-signin/google-signin";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { appleAuth, googleAuth } from "../api/auth";
import { useAuth } from "../contexts/AuthContext";
import { useFunnel } from "../contexts/FunnelContext";
import { OnboardingStackParamList } from "../navigation/OnboardingNavigator";
import { startHaircutTryOn } from "../services/api/haircut";
import { updateProfile } from "../services/api/profile";
import { borderRadius, colors, spacing, typography } from "../theme/colors";
import { generatePassword } from "../utils/generatePassword";
import { getItem, setOnboardingCompleted, StorageKeys } from "../utils/storage";

WebBrowser.maybeCompleteAuthSession();

type SignInScreenRouteProp = RouteProp<OnboardingStackParamList, "SignIn">;

const SignInScreen = () => {
  const { login, logout, accessToken } = useAuth();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const { answers } = useFunnel();
  const route = useRoute<SignInScreenRouteProp>();

  useEffect(() => {
    GoogleSignin.configure({
      iosClientId:
        "298504905971-pkhbl7urc8e1sh3ghtr05u14tgsojqqi.apps.googleusercontent.com",
    });
  }, []);

  console.log("access token", accessToken);

  const handleSuccessfulLogin = async () => {
    const completed = await getItem(StorageKeys.ONBOARDING_COMPLETED);
    if (!completed) {
      await setOnboardingCompleted();
      await updateProfile(answers);
      const haircut = route.params?.haircut;
      if (haircut && answers.sideViewImage && answers.faceShapeImage) {
        await startHaircutTryOn(
          haircut.id,
          answers.sideViewImage,
          answers.faceShapeImage
        );
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await GoogleSignin.hasPlayServices();
      const signInResponse = await GoogleSignin.signIn();

      if (isSuccessResponse(signInResponse)) {
        const { user } = signInResponse.data;
        const { name, email } = user;
        const password = generatePassword();
        const res = await googleAuth(name, email, password);
        login(res.tokens.access, res.tokens.refresh)
          .then(async () => {
            await handleSuccessfulLogin();
          })
          .then(() => {
            setIsLoading(false);
          });
      } else {
        alert("Authentication failed. Please try again.");
        setIsLoading(false);
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        if (error.code === statusCodes.IN_PROGRESS) {
          alert("Please wait for the sign in to complete.");
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          alert("Play services not available. Please try again.");
        } else if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          alert("Authentication cancelled.");
        } else {
          alert("Authentication failed. Please try again.");
        }
      } else {
        alert("Authentication failed. Please try again.");
      }
      logout();
      setIsLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      setIsLoading(true);
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      const res = await appleAuth(credential);
      login(res.tokens.access, res.tokens.refresh).then(async () => {
        handleSuccessfulLogin();
      });
    } catch (e: any) {
      logout();
      if (e.code !== "ERR_REQUEST_CANCELED") {
        alert("Failed to sign in with Apple. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#F5F1EB", "#E8E4F0"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {isLoading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={"#fff"} />
          </View>
        )}
        <View style={styles.content}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Join us to unlock your personalized hair journey.
          </Text>

          <TouchableOpacity
            style={[styles.button, styles.googleButton]}
            onPress={handleGoogleSignIn}
            disabled={isLoading}
          >
            <FontAwesome name="google" size={20} color={"#fff"} />
            <Text style={styles.buttonText}>Continue with Google</Text>
          </TouchableOpacity>

          {Platform.OS === "ios" && (
            <AppleAuthentication.AppleAuthenticationButton
              buttonType={
                AppleAuthentication.AppleAuthenticationButtonType.CONTINUE
              }
              buttonStyle={
                AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
              }
              cornerRadius={borderRadius.full}
              style={styles.appleButton}
              onPress={handleAppleSignIn}
            />
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: "center",
  },
  content: {
    padding: spacing.lg,
  },
  title: {
    fontFamily: typography.fonts.rounded,
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: colors.text.primary,
  },
  subtitle: {
    fontFamily: typography.fonts.rounded,
    fontSize: 18,
    textAlign: "center",
    marginBottom: 40,
    color: colors.text.secondary,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: borderRadius.full,
    marginBottom: 15,
  },
  googleButton: {
    backgroundColor: "#4285F4",
  },
  appleButton: {
    height: 54,
  },
  buttonText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "600",
    fontFamily: typography.fonts.rounded,
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
});

export default SignInScreen;
