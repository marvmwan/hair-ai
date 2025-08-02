import { BlurView } from "expo-blur";
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { borderRadius, colors, spacing, typography } from "../theme/colors";
import Button from "./Button";

const { width } = Dimensions.get("window");

export interface Product {
  id: string;
  image: any;
  recommended: boolean;
}

export interface Haircut {
  id: string;
  label: string;
  image: any;
  products: Product[];
}

interface HaircutCardProps {
  haircut: Haircut;
  onChooseLook: (haircutId: string) => void;
}

const HaircutCard: React.FC<HaircutCardProps> = ({ haircut, onChooseLook }) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={haircut.image} style={styles.backgroundImage} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentContainer}>
          {/* This empty view is a spacer to push content to the bottom */}
          <View style={{ flex: 1 }} />

          {/*    
          <View style={styles.labelContainer}>
              <View style={styles.labelChip}>
                <Text style={styles.labelText}>{haircut.label}</Text>
              </View>
            </View> */}

          <BlurView intensity={50} tint="dark" style={styles.productsSheet}>
            {/* <Text style={styles.productsTitle}>Products just for you</Text>
            <View style={{flexDirection: 'row', flexWrap: 'nowrap', gap: 0}}>
              {haircut.products.map(product => (
                  <View style={styles.productCard} key={product.id}>
                    <Image source={product.image} style={styles.productImage} />
                    <BlurView intensity={5} tint="light" style={StyleSheet.absoluteFill} />
                  </View>
              ))}
            </View> */}
            <Button
              title="Choose this look"
              onPress={() => onChooseLook(haircut.id)}
              size="large"
              style={styles.chooseButton}
              textStyle={styles.chooseButtonText}
            />
          </BlurView>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: width,
    height: "100%",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8, // For Android shadow
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 20,
  },
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  productsSheet: {
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginHorizontal: spacing.md,
    overflow: "hidden",
  },
  productsTitle: {
    fontFamily: typography.fonts.primary,
    fontSize: typography.sizes.large,
    fontWeight: "bold",
    color: colors.text.primary,
    textAlign: "center",
    marginBottom: spacing.lg,
  },
  productCard: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.md,
    marginRight: spacing.xs,
    backgroundColor: colors.gray.dark,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  recommendationIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
  },
  chooseButton: {
    backgroundColor: "white",
    //   marginTop: spacing.lg,
  },
  chooseButtonText: {
    color: "black",
    fontWeight: "bold",
  },
  labelContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
  },
  labelChip: {
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    width: 150,
    height: 30,
  },

  labelText: {
    color: "white",
    fontFamily: typography.fonts.primary,
    fontWeight: "600",
  },
});

export default HaircutCard;
