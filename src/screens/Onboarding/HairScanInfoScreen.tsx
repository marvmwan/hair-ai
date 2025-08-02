import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../../components/Button";
import { borderRadius, colors, spacing, typography } from "../../theme/colors";

export enum ScanType {
  FaceShapeAnalysis = "faceShapeAnalysis",
  HairAnalysis = "hairAnalysis",
  HaircutTryOn = "haircutTryOn",
}

interface HairScanInfoScreenProps {
  onContinue: () => void;
  onBack: () => void;
  progress: number;
  scanType: ScanType;
}

const allScanSlides = {
  side: {
    key: "side",
    image: require("../../../assets/images/hair-scan-info/male-side-view.png"),
    title: "Side view",
    description:
      "Helps assess hair recession along the temples and density across the sides. This also contributes to an accurate Norwood stage and hair texture.",
  },
  back: {
    key: "back",
    image: require("../../../assets/images/hair-scan-info/back-view.jpeg"),
    title: "Occipital area (back view)",
    description:
      "It is okay if your head is not centered in the view, as long as the lower hairline is visible.",
  },
  top: {
    key: "top",
    image: require("../../../assets/images/hair-scan-info/top-view.jpeg"),
    title: "Top view (Crown)",
    description:
      "For density, volume, and Norwood stage. Ensure hair is spread evenly so the scalp can be seen.",
  },
  front: {
    key: "front",
    image: require("../../../assets/images/hair-scan-info/front-view.jpeg"),
    title: "Front view",
    description:
      "To estimate the risk of recession, Norwood stage, porosity and more. Pull your hair back with your hand or combed to expose the hairline clearly.",
  },
  face: {
    key: "face",
    image: require("../../../assets/images/hair-scan-info/male-face-view.png"),
    title: "Face Scan",
    description:
      "A clear view of your face helps us determine your face shape for personalized recommendations.",
  },
};

const scanConfigs = {
  [ScanType.HairAnalysis]: {
    title: "Scan for 20+ hair attributes",
    subtitle:
      "Make sure your hair is clearly visible in each angle. Use the example images to guide your positioning.",
    slides: ["side", "back", "top", "front"],
  },
  [ScanType.FaceShapeAnalysis]: {
    title: "Scan for Face Shape Analysis",
    subtitle: "Provide a clear picture of your face.",
    slides: ["face"],
  },
  [ScanType.HaircutTryOn]: {
    title: "Scan for Haircut Try On",
    subtitle: "Provide a clear picture of your face and side profile.",
    slides: ["face", "side"],
  },
};

const { width } = Dimensions.get("window");

const HairScanInfoScreen: React.FC<HairScanInfoScreenProps> = ({
  onContinue,
  onBack,
  progress,
  scanType,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const config = scanConfigs[scanType];
  const scanSlides = config.slides.map(
    (key) => allScanSlides[key as keyof typeof allScanSlides],
  );

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const renderSlide = ({ item }: { item: (typeof scanSlides)[0] }) => (
    <View style={styles.slide}>
      <View style={styles.card}>
        <Image
          source={item.image}
          style={styles.slideImage}
          resizeMode="cover"
        />
        <View style={styles.cardContent}>
          <Text style={styles.slideTitle}>{item.title}</Text>
          <Text style={styles.slideDescription}>{item.description}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={onBack}
          hitSlop={{ top: 16, left: 16, right: 16, bottom: 16 }}
        >
          <Ionicons name="arrow-back" size={28} color={colors.text.primary} />
        </TouchableOpacity>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
        </View>
      </View>

      {/* <ScrollView> */}
      <View style={styles.header}>
        <Text style={styles.title}>{config.title}</Text>
        <Text style={styles.subtitle}>{config.subtitle}</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={scanSlides}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
      />

      <View style={styles.pagination}>
        {scanSlides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor:
                  index === activeIndex ? colors.primary : colors.gray.medium,
              },
            ]}
          />
        ))}
      </View>
      {/* </ScrollView> */}

      <View style={styles.buttonContainer}>
        <Button
          title="Start Scanning"
          onPress={onContinue}
          size="large"
          style={styles.button}
          textStyle={styles.buttonText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // container: { flex: 1,    paddingTop: spacing.xl,marginHorizontal: spacing.lg},
  // topBar: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginBottom: spacing.xl,
  // },
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
    marginHorizontal: spacing.lg,
  },
  progressBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 4,
    marginLeft: spacing.md,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  header: {
    marginBottom: spacing.lg,
    marginHorizontal: spacing.lg,
  },
  title: {
    fontFamily: typography.fonts.rounded,
    fontSize: typography.sizes.xxlarge,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    textAlign: "left",
  },
  subtitle: {
    fontFamily: typography.fonts.rounded,
    fontSize: typography.sizes.medium,
    color: colors.text.secondary,
    textAlign: "left",
    marginTop: spacing.sm,
  },
  slide: {
    width: width,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
  },
  card: {
    width: "100%",
    borderRadius: borderRadius.xl,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    overflow: "hidden",
  },
  slideImage: {
    width: "100%",
    height: 250,
  },
  cardContent: {
    padding: spacing.md,
  },
  slideTitle: {
    fontFamily: typography.fonts.rounded,
    fontSize: typography.sizes.large,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  slideDescription: {
    fontFamily: typography.fonts.rounded,
    fontSize: typography.sizes.medium,
    color: colors.text.secondary,
    textAlign: "center",
    lineHeight: 22,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  buttonContainer: {
    paddingVertical: spacing.md,
    marginHorizontal: spacing.lg,
  },
  button: {
    backgroundColor: colors.button.primary,
    borderRadius: borderRadius.full,
  },
  buttonText: {
    color: colors.text.primary,
  },
});

export default HairScanInfoScreen;
