import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../../../components/Button";
import { FunnelAnswers, useFunnel } from "../../../contexts/FunnelContext";
import { HairScanStackParamList } from "../../../navigation/HairScanNavigator";
import {
  borderRadius,
  colors,
  spacing,
  typography,
} from "../../../theme/colors";
import { ScanType } from "../HairScanInfoScreen";

type CaptureScreenRouteProp = RouteProp<HairScanStackParamList, "Capture">;
type CaptureScreenNavigationProp = StackNavigationProp<
  HairScanStackParamList,
  "Capture"
>;

const scanRequirements: Record<ScanType, (keyof FunnelAnswers)[]> = {
  [ScanType.HairAnalysis]: [
    "topViewImage",
    "sideViewImage",
    "backViewImage",
    "frontViewImage",
  ],
  [ScanType.FaceShapeAnalysis]: ["faceShapeImage"],
  [ScanType.HaircutTryOn]: ["faceShapeImage", "sideViewImage"],
};

const scanDetails: {
  [key: string]: { title: string; instructions: string; example: any };
} = {
  faceShapeImage: {
    title: "Face shape scan",
    instructions:
      "For jaw curvature, cheekbones, forehead width, and chin structure. Ensure your entire face is in the frame.",
    example: require("../../../../assets/images/hair-scan-info/male-face-view.png"), // Placeholder
  },
  topViewImage: {
    title: "Top view scan",
    instructions:
      "Hold your phone over your head. Capture your scalp and hair density from above.",
    example: require("../../../../assets/images/hair-scan-info/top-view.jpeg"),
  },
  sideViewImage: {
    title: "Side view scan",
    instructions:
      "Helps assess hairline recession along the temples and density across the sides.",
    example: require("../../../../assets/images/hair-scan-info/male-side-view.png"),
  },
  backViewImage: {
    title: "Back view scan",
    instructions:
      "It’s okay if your head isn’t centered, as long as the lower hairline is visible.",
    example: require("../../../../assets/images/hair-scan-info/back-view.jpeg"),
  },
  frontViewImage: {
    title: "Front hairline scan",
    instructions:
      "To estimate recession risk, pull hair back with your hand or comb to expose the hairline clearly.",
    example: require("../../../../assets/images/hair-scan-info/front-view.jpeg"),
  },
};

const CaptureScreen = () => {
  const navigation = useNavigation<CaptureScreenNavigationProp>();
  const route = useRoute<CaptureScreenRouteProp>();
  const { answers, updateAnswer } = useFunnel();

  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<"front" | "back">("front");

  const scanType = route.params?.scanType;
  const scanOrder = scanType ? scanRequirements[scanType] : [];

  const [currentScanKey] = useState(() => {
    return (
      scanOrder.find((key: keyof FunnelAnswers) => !answers[key]) ||
      scanOrder[0]
    );
  });

  const cameraRef = useRef<CameraView>(null);

  const capturedImage = answers[currentScanKey];

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      if (photo) {
        updateAnswer(currentScanKey, photo.uri);
      }
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 1,
    });

    if (!result.canceled) {
      updateAnswer(currentScanKey, result.assets[0].uri);
    }
  };

  const handleContinue = () => {
    const currentIndex = scanOrder.indexOf(currentScanKey);
    const nextScanKey = scanOrder.find(
      (key: keyof FunnelAnswers, index: number) =>
        index > currentIndex && !answers[key],
    );

    if (nextScanKey) {
      navigation.push("Capture", { scanType: scanType });
    } else {
      navigation.navigate("Review", { scanType: scanType });
    }
  };

  const handleBack = () => {
    const currentIndex = scanOrder.indexOf(currentScanKey);
    console.log("currentIndex", currentIndex);
    if (currentIndex > 0) {
      const prevScanKey = scanOrder[currentIndex - 1];
      navigation.navigate("Capture", { scanType: scanType });
    } else {
      // If it's the first scan, go back to the main onboarding funnel.
      // This assumes the hair scan flow is presented modally or can be popped.
      navigation.getParent()?.goBack();
    }
  };

  const details = scanDetails[currentScanKey];

  if (!permission) {
    return <View />;
  }
  if (!permission.granted) {
    return <Text>No access to camera</Text>;
  }

  return (
    <LinearGradient
      colors={[colors.gradient.light, colors.gradient.dark]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={28} color={colors.text.primary} />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>{details.title}</Text>
            <Text style={styles.instructions}>{details.instructions}</Text>
          </View>
        </View>

        <View style={styles.cameraContainer}>
          {capturedImage ? (
            <Image
              source={{
                uri:
                  typeof capturedImage === "string" ? capturedImage : undefined,
              }}
              style={styles.previewImage}
            />
          ) : (
            <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
              <Image source={details.example} style={styles.exampleImage} />
            </CameraView>
          )}
        </View>

        <View style={styles.buttonContainer}>
          {capturedImage ? (
            <>
              <Button
                title={`Continue to ${scanOrder[scanOrder.indexOf(currentScanKey) + 1]?.replace("ViewImage", " view")?.replace("ShapeImage", " shape") || "Review"}`}
                onPress={handleContinue}
                size="large"
              />
              <Button
                title="Retake the scan"
                onPress={() => updateAnswer(currentScanKey, undefined)}
                variant="secondary"
                style={styles.retakeButton}
              />
            </>
          ) : (
            <View style={styles.controlsContainer}>
              <TouchableOpacity
                onPress={pickImage}
                style={styles.controlButton}
              >
                <Ionicons
                  name="images-outline"
                  size={30}
                  color={colors.text.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={takePicture}
                style={styles.shutterButton}
              >
                <View style={styles.shutterButtonInner} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setFacing(facing === "back" ? "front" : "back")}
                style={styles.controlButton}
              >
                <Ionicons
                  name="camera-reverse-outline"
                  size={30}
                  color={colors.text.primary}
                />
              </TouchableOpacity>
            </View>
          )}
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
    backgroundColor: "transparent",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.lg,
    paddingTop: Platform.OS === "android" ? spacing.xl : spacing.lg,
  },
  backButton: {
    marginRight: spacing.md,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontFamily: typography.fonts.rounded,
    fontSize: typography.sizes.large,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
  },
  instructions: {
    fontFamily: typography.fonts.rounded,
    fontSize: typography.sizes.medium,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  cameraContainer: {
    flex: 1,
    marginHorizontal: spacing.lg,
    borderRadius: borderRadius.xl,
    overflow: "hidden",
  },
  camera: {
    flex: 1,
  },
  previewImage: {
    flex: 1,
    transform: [{ scaleX: -1 }],
  },
  exampleImage: {
    position: "absolute",
    top: spacing.md,
    right: spacing.md,
    width: 80,
    height: 100,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  buttonContainer: {
    padding: spacing.lg,
    justifyContent: "flex-end",
  },
  retakeButton: {
    marginTop: spacing.md,
  },
  retakeButtonText: {
    fontFamily: typography.fonts.rounded,
    fontSize: typography.sizes.medium,
    color: colors.primary,
    fontWeight: typography.weights.semibold,
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: spacing.lg,
  },
  controlButton: {
    padding: spacing.md,
  },
  shutterButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  shutterButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
});

export default CaptureScreen;
