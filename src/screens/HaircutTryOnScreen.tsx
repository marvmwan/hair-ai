import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
    Dimensions,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import HaircutCard, { Haircut } from "../components/HaircutCard";
import { colors, spacing, typography } from "../theme/colors";
//     import { ElementsText, window } from "../constants/sizes";
// import { useToggleButton } from "../hooks/useToggleButton";
import {
    Extrapolation,
    interpolate,
    interpolateColor,
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
const { width, height } = Dimensions.get("window");

const PAGE_WIDTH = 160;
const PAGE_HEIGHT = 40;

interface Props {
  animationValue: Animated.SharedValue<number>;
  label: string;
  onPress?: () => void;
}

const Item: React.FC<Props> = (props) => {
  const { animationValue, label, onPress } = props;

  const translateY = useSharedValue(0);

  const containerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [0.5, 1, 0.5],
      Extrapolation.CLAMP,
    );

    return {
      opacity,
    };
  }, [animationValue]);

  const labelStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [1, 1.25, 1],
      Extrapolation.CLAMP,
    );

    const color = interpolateColor(
      animationValue.value,
      [-1, 0, 1],
      ["#ffffff", "#ffffff", "#ffffff"],
    );

    const opacity = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [0.8, 1, 0.8],
    );

    return {
      transform: [{ scale }, { translateY: translateY.value }],
      color,
      opacity,
    };
  }, [animationValue, translateY]);

  const onPressIn = React.useCallback(() => {
    translateY.value = withTiming(-8, { duration: 250 });
  }, [translateY]);

  const onPressOut = React.useCallback(() => {
    translateY.value = withTiming(0, { duration: 250 });
  }, [translateY]);

  return (
    <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View
        style={[
          {
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          },
          containerStyle,
          styles.filterChip,
        ]}
      >
        <Animated.Text
          style={[
            { fontSize: 18, color: "#f1f1f1" },
            labelStyle,
            styles.filterText,
          ]}
        >
          {label}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
};

const looks: Haircut[] = [
  {
    id: "1",
    image: require("../../assets/images/haircuts/male-messy-fringe.png"),
    label: "Messy Fringe Mullet",
    products: [
      {
        id: "1",
        image: require("../../assets/images/product-placeholder.jpg"),
        recommended: true,
      },
      {
        id: "2",
        image: require("../../assets/images/product-placeholder.jpg"),
        recommended: false,
      },
      {
        id: "3",
        image: require("../../assets/images/product-placeholder.jpg"),
        recommended: true,
      },
    ],
  },
  {
    id: "2",
    image: require("../../assets/images/haircuts/male-curtain-bangs.png"),
    label: "Curtain bangs",
    products: [
      {
        id: "3",
        image: require("../../assets/images/product-placeholder.jpg"),
        recommended: true,
      },
      {
        id: "4",
        image: require("../../assets/images/product-placeholder.jpg"),
        recommended: true,
      },
      {
        id: "1",
        image: require("../../assets/images/product-placeholder.jpg"),
        recommended: true,
      },
    ],
  },
  {
    id: "3",
    image: require("../../assets/images/haircuts/male-buzzcut.png"),
    label: "Buzz cut",
    products: [
      {
        id: "3",
        image: require("../../assets/images/product-placeholder.jpg"),
        recommended: true,
      },
      {
        id: "4",
        image: require("../../assets/images/product-placeholder.jpg"),
        recommended: true,
      },
      {
        id: "1",
        image: require("../../assets/images/product-placeholder.jpg"),
        recommended: true,
      },
    ],
  },
  {
    id: "4",
    image: require("../../assets/images/haircuts/male-modern-quiff.png"),
    label: "Modern quiff",
    products: [
      {
        id: "3",
        image: require("../../assets/images/product-placeholder.jpg"),
        recommended: true,
      },
      {
        id: "4",
        image: require("../../assets/images/product-placeholder.jpg"),
        recommended: true,
      },
      {
        id: "1",
        image: require("../../assets/images/product-placeholder.jpg"),
        recommended: true,
      },
    ],
  },
  {
    id: "5",
    image: require("../../assets/images/haircuts/male-slicked-back-undercut.png"),
    label: "Slicked back",
    products: [
      {
        id: "3",
        image: require("../../assets/images/product-placeholder.jpg"),
        recommended: true,
      },
      {
        id: "4",
        image: require("../../assets/images/product-placeholder.jpg"),
        recommended: true,
      },
      {
        id: "1",
        image: require("../../assets/images/product-placeholder.jpg"),
        recommended: true,
      },
    ],
  },
  {
    id: "6",
    image: require("../../assets/images/haircuts/male-textured-french-crop.png"),
    label: "Textured crop",
    products: [
      {
        id: "3",
        image: require("../../assets/images/product-placeholder.jpg"),
        recommended: true,
      },
      {
        id: "4",
        image: require("../../assets/images/product-placeholder.jpg"),
        recommended: true,
      },
      {
        id: "1",
        image: require("../../assets/images/product-placeholder.jpg"),
        recommended: true,
      },
    ],
  },
];

const HaircutTryOnScreen = ({ navigation }: any) => {
  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const [movingIndex, setMovingIndex] = useState(0);
  const progress = useSharedValue<number>(0);
  const haircutCarouselRef = React.useRef<ICarouselInstance>(null);

  useEffect(() => {
    // Get the direction of movement
    const isMovingUp = movingIndex > activeLookIndex;
    const isMovingDown = movingIndex < activeLookIndex;

    // Calculate the halfway point between indices
    const halfwayPoint = isMovingUp
      ? activeLookIndex + 0.5
      : activeLookIndex - 0.5;

    // Update activeLookIndex when crossing halfway point
    if (isMovingUp && movingIndex >= halfwayPoint) {
      setActiveLookIndex(Math.ceil(movingIndex));
    } else if (isMovingDown && movingIndex <= halfwayPoint) {
      setActiveLookIndex(Math.floor(movingIndex));
    }
  }, [activeLookIndex, movingIndex]);

  const handleChooseLook = (haircutId: string) => {
    console.log("Chose look:", haircutId);
    const selectedHaircut = looks.find((h) => h.id === haircutId);
    if (selectedHaircut) {
      navigation.navigate("HaircutDetail", { haircut: selectedHaircut });
    }
  };

  const onPressPagination = (index: number) => {
    haircutCarouselRef.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <LinearGradient
      colors={[colors.gradient.light, colors.gradient.dark]}
      style={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[
              styles.headerIcon,
              {
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 1,
                shadowRadius: 8,
                elevation: 5, // For Android
              },
            ]}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={colors.text.primary}
              style={
                {
                  // textShadowColor: 'rgba(0, 0, 0, 0.75)',
                  // textShadowOffset: {width: -1, height: 1},
                  // textShadowRadius: 8,
                }
              }
            />
          </TouchableOpacity>
          <View style={styles.headerTitle}>
            <View style={styles.logoContainer}>
              <Text style={styles.appName}>
                <Text
                  style={{
                    color: colors.button.primary,
                    fontSize: 40,
                    fontWeight: "bold",
                    textShadowColor: "rgba(0, 0, 0, 0.75)",
                    textShadowOffset: { width: -1, height: 1 },
                    textShadowRadius: 8,
                    borderColor: colors.text.primary,
                    borderWidth: 2,
                    borderRadius: 10,
                    padding: 5,
                  }}
                >
                  {" "}
                  <Text
                    style={{
                      fontSize: 40,
                      fontWeight: "bold",
                    }}
                  >
                    ✂️{"  "}
                  </Text>
                  Cuts
                </Text>
                {/* <Text style={{color: colors.text.primary}}> AI</Text> */}
              </Text>
            </View>
          </View>
          <View style={styles.headerIcon} />
        </View>

        <View style={styles.carouselContainer}>
          <Carousel
            ref={haircutCarouselRef}
            autoPlayInterval={2000}
            data={looks}
            height={height * 0.9}
            // loop={true}
            loop={false}
            pagingEnabled={true}
            snapEnabled={true}
            width={width}
            onSnapToItem={(index) => {
              setActiveLookIndex(index);
            }}
            // style={{
            //     width: width * .8,
            //     height: height * .8
            // }}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 50,
            }}
            onProgressChange={progress}
            renderItem={({ item }) => {
              return (
                <HaircutCard haircut={item} onChooseLook={handleChooseLook} />
              );
            }}
          />

          <TouchableOpacity
            style={[styles.arrow, styles.arrowLeft]}
            onPress={() => haircutCarouselRef.current?.prev()}
          >
            <Ionicons name="chevron-back" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.arrow, styles.arrowRight]}
            onPress={() => haircutCarouselRef.current?.next()}
          >
            <Ionicons name="chevron-forward" size={30} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.filtersContainer}>
          <Pagination.Custom<{ color: string; index: number }>
            progress={progress}
            data={looks.map((look, index) => ({ color: look.label, index }))}
            renderItem={({ color, index }) => {
              return (
                <View style={[styles.filterChip]}>
                  {index === activeLookIndex && (
                    <Text style={[styles.filterText, styles.activeFilterText]}>
                      {color}
                    </Text>
                  )}
                </View>
              );
            }}
            size={20}
            dotStyle={{
              borderRadius: 16,
              backgroundColor: "rgba(255,255,255,0.8)",
              // backgroundColor: 'black',
            }}
            activeDotStyle={{
              borderRadius: 20,
              width: 150,
              height: 30,
              overflow: "hidden",
              backgroundColor: "white",
              opacity: 1,
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
            }}
            containerStyle={{
              gap: 5,
              marginBottom: 10,
              alignItems: "center",
              height: 10,
              width: "90%",
            }}
            horizontal
            onPress={onPressPagination}
            customReanimatedStyle={(progress, index, length) => {
              let val = Math.abs(progress - index);
              if (index === 0 && progress > length - 1) {
                val = Math.abs(progress - length);
              }
              // console.log('{ANIMATED} progress', progress);
              setMovingIndex(progress);
              // console.log('{ANIMATED} index', index);
              // console.log('{ANIMATED} length', length);
              // console.log('{ANIMATED} val', val);

              return {
                transform: [
                  {
                    translateY: interpolate(
                      val,
                      [0, 1],
                      [0, 0],
                      Extrapolation.CLAMP,
                    ),
                  },
                ],
              };
            }}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    zIndex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoContainer: {
    // width: 32,
    // height: 32,
    borderRadius: 10,
    // backgroundColor: 'white',
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginRight: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  appName: {
    fontFamily: typography.fonts.primary,
    fontSize: typography.sizes.xlarge,
    fontWeight: "bold",
    paddingHorizontal: spacing.sm,
  },
  headerIcon: {
    width: 24,
  },
  carouselContainer: {
    flex: 1,
    marginTop: 80,
  },
  arrow: {
    position: "absolute",
    top: "50%",
    marginTop: -20,
    padding: spacing.sm,
    zIndex: 1,
  },
  arrowLeft: {
    left: spacing.md,
  },
  arrowRight: {
    right: spacing.md,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: spacing.lg,
  },
  filtersContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
    marginBottom: 175,
    gap: spacing.md,
  },
  filterChip: {
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    width: 150,
    height: 30,
  },
  activeFilterChip: {
    backgroundColor: "white",
  },
  filterText: {
    color: "white",
    fontFamily: typography.fonts.primary,
    fontWeight: "600",
  },
  activeFilterText: {
    color: "black",
  },
});

export default HaircutTryOnScreen;
