import { Ionicons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  FlatList,
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

type ReviewScreenRouteProp = RouteProp<HairScanStackParamList, "Review">;
type ReviewScreenNavigationProp = StackNavigationProp<
  HairScanStackParamList,
  "Review"
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
const optionalScan = "faceShapeImage";

const ReviewScreen = ({
  navigation,
  route,
}: {
  navigation: ReviewScreenNavigationProp;
  route: ReviewScreenRouteProp;
}) => {
  // const navigation = useNavigation<ReviewScreenNavigationProp>();
  // const route = useRoute<ReviewScreenRouteProp>();
  const { answers, clearScanAnswers } = useFunnel();

  const scanType = route.params?.scanType;
  const scanOrder = scanType ? scanRequirements[scanType] : [];

  const capturedImages = [
    ...scanOrder,
    ...(answers[optionalScan] && !scanOrder.includes(optionalScan)
      ? [optionalScan]
      : []),
  ].map((key) => ({
    key,
    uri: answers[key as keyof typeof answers],
    title: key.replace("ViewImage", " view").replace("ShapeImage", " shape"),
  }));

  const allRequiredScansDone = scanOrder.every(
    (key) => !!answers[key as keyof typeof answers],
  );

  const handleRetake = (scanTypeToRetake: string) => {
    const type = scanTypeToRetake
      .replace("ViewImage", "")
      .replace("ShapeImage", "") as "top" | "side" | "back" | "front" | "face";
    navigation.navigate("Capture", { scanType: scanType });
  };

  const handleConfirm = () => {
    // TODO: Implement analysis logic
    console.log("Starting analysis with:", answers);
    navigation.getParent()?.navigate("Loading", { scanType: scanType });
  };

  const handleClearAndRestart = () => {
    clearScanAnswers();
    navigation.getParent()?.getParent()?.goBack();
  };

  const renderScanItem = ({ item }: { item: (typeof capturedImages)[0] }) => (
    <View style={styles.scanItem}>
      {item.uri ? (
        <Image source={{ uri: item.uri as string }} style={styles.thumbnail} />
      ) : (
        <View style={styles.placeholder}>
          <Ionicons name="camera-outline" size={40} color={colors.gray.dark} />
        </View>
      )}
      <Text style={styles.itemTitle}>{item.title}</Text>
      <TouchableOpacity
        onPress={() => handleRetake(item.key)}
        style={styles.retakeButton}
      >
        <Text style={styles.retakeText}>Retake</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient
      colors={[colors.gradient.light, colors.gradient.dark]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={28} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>Review Scans</Text>
        </View>

        <FlatList
          data={capturedImages}
          renderItem={renderScanItem}
          numColumns={2}
          keyExtractor={(item) => item.key}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
        />

        {!answers.faceShapeImage && (
          <View style={styles.addFaceScanCard}>
            <Text style={styles.addFaceScanTitle}>Recommended Hairstyle?</Text>
            <Text style={styles.addFaceScanText}>
              Add a face scan to analyze for optimal Haircut style&apos;s
              tailored to your face shape and hair capabilities
            </Text>
            <View style={styles.buttonContainer}>
              <Button
                title="Add Face Scan"
                onPress={() => handleRetake(optionalScan)}
                size="medium"
                leftIcon={
                  <Ionicons
                    name="scan-outline"
                    size={20}
                    color={colors.text.primary}
                  />
                }
                style={styles.button}
                textStyle={styles.buttonText}
                withShadow={false}
              />
            </View>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <Button
            title="Confirm and Start Analysis"
            onPress={handleConfirm}
            disabled={!allRequiredScansDone}
            size="large"
            style={styles.button}
            textStyle={styles.buttonText}
          />
          <Button
            title="Clear Images and Restart"
            onPress={handleClearAndRestart}
            variant="outline"
            style={{ marginTop: spacing.md }}
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
    backgroundColor: "transparent",

    marginHorizontal: spacing.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg,
    paddingTop: Platform.OS === "android" ? spacing.xl : spacing.lg,
  },
  backButton: {
    marginRight: spacing.md,
  },
  title: {
    fontFamily: typography.fonts.rounded,
    fontSize: typography.sizes.xlarge,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
  },
  columnWrapper: {
    gap: spacing.md,
  },
  grid: {
    gap: spacing.md,
  },
  scanItem: {
    width: "48%",
    aspectRatio: 1,
    marginBottom: spacing.md,
    borderRadius: borderRadius.lg,
    overflow: "hidden",
    backgroundColor: colors.secondary,
  },
  thumbnail: {
    flex: 1,
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.gray.light,
  },
  itemTitle: {
    position: "absolute",
    top: spacing.sm,
    left: spacing.sm,
    fontFamily: typography.fonts.rounded,
    fontSize: typography.sizes.small,
    fontWeight: typography.weights.semibold,
    color: colors.secondary,
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  retakeButton: {
    position: "absolute",
    bottom: spacing.sm,
    right: spacing.sm,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  retakeText: {
    color: colors.secondary,
    fontFamily: typography.fonts.rounded,
    fontWeight: typography.weights.bold,
  },
  addFaceScanCard: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginVertical: spacing.sm,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    // Shadow for Android
    elevation: 6,
  },
  addFaceScanTitle: {
    fontFamily: typography.fonts.rounded,
    fontSize: typography.sizes.large,
    fontWeight: typography.weights.bold,
    color: colors.secondary,
  },
  addFaceScanText: {
    fontFamily: typography.fonts.rounded,
    fontSize: typography.sizes.medium,
    color: colors.secondary,
    marginVertical: spacing.sm,
  },
  buttonContainer: {
    paddingVertical: spacing.sm,
  },
  button: {
    backgroundColor: colors.button.primary,
    borderRadius: borderRadius.full,
  },
  buttonText: {
    color: colors.text.primary,
  },
});

export default ReviewScreen;
