import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Alert, SafeAreaView } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import { useFunnel } from "../../contexts/FunnelContext";
import { colors, typography, spacing } from "../../theme/colors";
import Button from "../../components/Button";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const HairScanScreen = () => {
  const navigation = useNavigation();
  const { updateAnswer, getProgress } = useFunnel();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const cameraRef = useRef<Camera>(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      setIsLoading(true);
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.7,
          base64: false,
        });
        setPhotoUri(photo.uri);
        setPhotoTaken(true);
        updateAnswer("hairScanImage", photo.uri);
      } catch (error) {
        console.error("Error taking picture:", error);
        Alert.alert("Error", "Failed to take picture. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const retakePicture = () => {
    setPhotoTaken(false);
    setPhotoUri(null);
  };

  const handleContinue = () => {
    navigation.navigate("Loading" as never);
  };

  const handleSkip = () => {
    updateAnswer("unlockCustomFix", "skip-scan");
    navigation.navigate("Loading" as never);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  if (hasPermission === null) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          Requesting camera permission...
        </Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <LinearGradient
        colors={[colors.gradient.light, colors.gradient.dark]}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.permissionContainer}>
            <Ionicons name="camera-off" size={80} color={colors.secondary} />
            <Text style={styles.permissionTitle}>
              Camera Permission Required
            </Text>
            <Text style={styles.permissionText}>
              We need access to your camera to analyze your hair and provide
              personalized recommendations.
            </Text>
            <Button
              title="Grant Permission"
              onPress={async () => {
                const { status } = await Camera.requestCameraPermissionsAsync();
                setHasPermission(status === "granted");
              }}
              style={styles.permissionButton}
            />
            <Button
              title="Skip Hair Scan"
              onPress={handleSkip}
              variant="outline"
              style={styles.skipButton}
            />
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={[colors.gradient.light, colors.gradient.dark]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        {/* Progress bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${getProgress()}%` }]}
            />
          </View>
          <Text style={styles.progressText}>{Math.round(getProgress())}%</Text>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.title}>Hair Analysis</Text>
          <Text style={styles.subtitle}>
            Position your face in the center and take a clear photo for the best
            results
          </Text>
        </View>

        {/* Camera or Preview */}
        <View style={styles.cameraContainer}>
          {!photoTaken ? (
            <Camera
              ref={cameraRef}
              style={styles.camera}
              type={CameraType.front}
              ratio="4:3"
            >
              <View style={styles.cameraOverlay}>
                <View style={styles.faceGuide} />
              </View>
            </Camera>
          ) : (
            <View style={styles.previewContainer}>
              <Ionicons
                name="checkmark-circle"
                size={80}
                color={colors.accent}
              />
              <Text style={styles.previewText}>
                Photo captured successfully!
              </Text>
            </View>
          )}
        </View>

        {/* Controls */}
        <View style={styles.controlsContainer}>
          {!photoTaken ? (
            <>
              <Button
                title="Take Photo"
                onPress={takePicture}
                loading={isLoading}
                disabled={isLoading}
                size="large"
                style={styles.takePhotoButton}
              />
              <Button
                title="Skip Hair Scan"
                onPress={handleSkip}
                variant="outline"
                style={styles.skipButton}
              />
            </>
          ) : (
            <>
              <Button
                title="Continue"
                onPress={handleContinue}
                size="large"
                style={styles.continueButton}
              />
              <Button
                title="Retake Photo"
                onPress={retakePicture}
                variant="outline"
                style={styles.retakeButton}
              />
            </>
          )}

          <Button
            title="Back"
            onPress={handleBack}
            variant="outline"
            style={styles.backButton}
          />
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
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 4,
    marginRight: spacing.md,
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.secondary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: typography.sizes.small,
    color: colors.secondary,
    fontWeight: typography.weights.medium,
    minWidth: 40,
    textAlign: "right",
  },
  instructionsContainer: {
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.sizes.xxlarge,
    fontWeight: typography.weights.bold,
    color: colors.secondary,
    textAlign: "center",
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: typography.sizes.medium,
    color: colors.secondary,
    textAlign: "center",
    opacity: 0.9,
    paddingHorizontal: spacing.md,
  },
  cameraContainer: {
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
    marginVertical: spacing.lg,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  faceGuide: {
    width: 200,
    height: 250,
    borderWidth: 3,
    borderColor: colors.secondary,
    borderRadius: 100,
    borderStyle: "dashed",
  },
  previewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  previewText: {
    fontSize: typography.sizes.large,
    color: colors.secondary,
    textAlign: "center",
    marginTop: spacing.md,
  },
  controlsContainer: {
    gap: spacing.md,
    paddingVertical: spacing.lg,
  },
  takePhotoButton: {
    backgroundColor: colors.secondary,
  },
  continueButton: {
    backgroundColor: colors.secondary,
  },
  skipButton: {
    borderColor: colors.secondary,
  },
  retakeButton: {
    borderColor: colors.secondary,
  },
  backButton: {
    borderColor: colors.secondary,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
  },
  permissionTitle: {
    fontSize: typography.sizes.xlarge,
    fontWeight: typography.weights.bold,
    color: colors.secondary,
    textAlign: "center",
    marginVertical: spacing.lg,
  },
  permissionText: {
    fontSize: typography.sizes.medium,
    color: colors.secondary,
    textAlign: "center",
    opacity: 0.9,
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  permissionButton: {
    backgroundColor: colors.secondary,
    marginBottom: spacing.md,
  },
});

export default HairScanScreen;
