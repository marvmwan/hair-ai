import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from "react";
import {
    Animated,
    Image,
    LayoutAnimation,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { borderRadius, colors, spacing, typography } from "../theme/colors";

// --- TYPE DEFINITIONS ---
interface HeadShape {
  code: string;
  label: string;
}
interface HairType {
  code: string;
  label: string;
}
interface Product {
  id: string;
  name: string;
  brand: string;
  product_url: string;
  image: string;
  notes: string;
}
interface Requirement {
  id: string;
  min_length_top_cm: number;
  min_length_sides_cm: number;
  min_length_back_cm: number;
  min_density: string;
  strand_thickness: string;
  grow_out_weeks: number;
  maintenance_interval_weeks: number;
  color_safe: boolean;
  chemical_treatment_ok: boolean;
  notes: string;
}
export interface Haircut {
  id: string;
  name: string;
  slug: string;
  thumbnail_url: string;
  tagline: string;
  description: string;
  styling_tips: string[];
  barber_details: string[];
  difficulty_1_5: number;
  duration_mins: number;
  price_level: number;
  suitable_gender: string;
  trending_score: number;
  head_shapes: HeadShape[];
  hair_types: HairType[];
  products: Product[];
  requirement: Requirement;
  created_at: string;
  updated_at: string;
}

// --- SAMPLE DATA ---
const sampleHaircut: Haircut = {
  id: "c40ed9db-22a6-471e-b489-8fb562e3bbe5",
  name: "Curtain Bangs",
  slug: "curtain-bangs",
  thumbnail_url:
    "https://d3j12jyat56uhr.cloudfront.net/hair-app/users/80/side.jpg",
  tagline: "Soft middle-part fringe that frames the eyes and slims the cheeks.",
  description:
    "Curtain bangs are a medium-length fringe that parts down the center (or slightly off-center) and sweeps away, creating an effortless, face-framing drape. They give straight-to-wavy hair instant 90-s heart-throb vibes while flattering longer, oval-ish faces by adding width at the temples.",
  styling_tips: [
    "Blow-dry with a round brush, rolling bangs back and away from the face.",
    "Finish with a light sea-salt or texture spray for separation.",
    "Touch up with a flat-iron ‘C-bend’ at the cheekbone if hair drops during the day.",
  ],
  barber_details: [
    "Start with 7-8 cm length at the brow line, 10 cm through the top.",
    "Point-cut the fringe to remove bulk; no blunt lines.",
    "Long scissor-over-comb taper on the sides into a #4 guard at the temple.",
    "Maintain natural neck length; avoid hard weight lines in the nape.",
  ],
  difficulty_1_5: 2,
  duration_mins: 25,
  price_level: 2,
  suitable_gender: "M",
  trending_score: 0.87,
  head_shapes: [
    { code: "OV", label: "Oval" },
    { code: "HT", label: "Heart" },
    { code: "RE", label: "Rectangle / Oblong" },
    { code: "DM", label: "Diamond" },
  ],
  hair_types: [
    { code: "1A", label: "1A – Straight • Very Fine" },
    { code: "1B", label: "1B – Straight • Normal" },
    { code: "1C", label: "1C – Straight • Coarse" },
    { code: "2A", label: "2A – Wavy • Loose" },
    { code: "2B", label: "2B – Wavy • Medium" },
  ],
  products: [
    {
      id: "9e1af6c5-3227-430f-9df4-4da5220b9f2a",
      name: "Sea Salt Spray",
      brand: "Baxter of California",
      product_url: "https://amzn.to/3SEA123",
      image: "https://m.media-amazon.com/images/I/414XKcGYwOL._SX679_.jpg",
      notes: "Adds airy, matte texture so bangs stay separated.",
    },
    {
      id: "49bf5aad-0d74-462c-ba6d-9c87a4c0e5c9",
      name: "Medium-Hold Styling Cream",
      brand: "American Crew",
      product_url: "https://amzn.to/4CREW456",
      image: "https://m.media-amazon.com/images/I/61Kb48da5YL._SX522_.jpg",
      notes: "Controls fly-aways without weighing hair down.",
    },
  ],
  requirement: {
    id: "af2a5f85-9e68-469a-b6ae-8875f44bb712",
    min_length_top_cm: 8.0,
    min_length_sides_cm: 7.0,
    min_length_back_cm: 4.0,
    min_density: "M",
    strand_thickness: "F",
    grow_out_weeks: 4,
    maintenance_interval_weeks: 4,
    color_safe: true,
    chemical_treatment_ok: true,
    notes:
      "Ideal on hair that can hold a soft bend; recommend a keratin blowout if natural frizz is high.",
  },
  created_at: "2025-07-31T15:40:22Z",
  updated_at: "2025-07-31T15:40:22Z",
};

const Accordion = ({ title, data }: { title: string; data: string[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity onPress={toggleOpen} style={styles.accordionHeader}>
        <Text style={styles.accordionTitle}>{title}</Text>
        <Ionicons
          name={isOpen ? "chevron-up-outline" : "chevron-down-outline"}
          size={24}
          color={colors.text.secondary}
        />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.accordionContent}>
          {data.map((item, index) => (
            <Text key={index} style={styles.listItem}>
              • {item}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

interface RequirementBarProps {
    label: string;
    value: number;
    maxValue: number;
    unit: string;
    color: string;
}

const RequirementBar: React.FC<RequirementBarProps> = ({ label, value, maxValue, unit, color }) => {
    const percentage = Math.min((value / maxValue) * 100, 100);
    return (
      <View style={styles.requirementRow}>
        <Text style={styles.requirementLabel}>{label}</Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBarFill, { width: `${percentage}%`, backgroundColor: color }]} />
        </View>
        <Text style={styles.requirementValue}>{`${value} ${unit}`}</Text>
      </View>
    );
};

interface StatBarProps {
    label: string;
    value: number;
    maxValue: number;
    color: string;
    displayValue: string;
}

const StatBar: React.FC<StatBarProps> = ({ label, value, maxValue, color, displayValue }) => {
    const percentage = Math.min((value / maxValue) * 100, 100);
    return (
        <View style={styles.statBarRow}>
            <Text style={styles.statBarLabel}>{label}</Text>
            <View style={styles.statBarContainer}>
                <View style={[styles.statBarFill, { width: `${percentage}%`, backgroundColor: color }]} />
                <View style={styles.statBarMarkers}>
                    {[...Array(4)].map((_, i) => <View key={i} style={styles.statBarMarker} />)}
                </View>
            </View>
            <Text style={styles.statBarValue}>{displayValue}</Text>
        </View>
    );
};


const HaircutDetailScreen = ({ route, navigation }: any) => {
  const haircut = sampleHaircut;
  //   const haircut = route.params?.haircut || sampleHaircut; 
  const [isReadMore, setIsReadMore] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerOpacity = scrollY.interpolate({
    inputRange: [200, 300],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {haircut.name}
        </Text>
      </Animated.View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.headerButton, styles.backButton]}
      >
        <Ionicons name="arrow-back" size={24} color={"white"} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {}}
        style={[styles.headerButton, styles.favoriteButton]}
      >
        <Ionicons name="heart-outline" size={24} color={"white"} />
      </TouchableOpacity>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Image
          source={{ uri: haircut.thumbnail_url }}
          style={styles.heroImage}
        />
        <View style={styles.detailsContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{haircut.name}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFC107" />
              <Text style={styles.ratingText}>
                {(haircut.trending_score * 5).toFixed(1)}
              </Text>
            </View>
          </View>
          <Text style={styles.tagline}>{haircut.tagline}</Text>

          <View style={styles.statsCard}>
            <StatBar label="Difficulty" value={haircut.difficulty_1_5} maxValue={5} color="#FF6B6B" displayValue={`${haircut.difficulty_1_5} / 5`} />
            <StatBar label="Price" value={haircut.price_level} maxValue={5} color="#4ECDC4" displayValue={"$".repeat(haircut.price_level)} />
            <StatBar label="Time" value={haircut.duration_mins} maxValue={60} color="#45B7D1" displayValue={`${haircut.duration_mins} min`} />
          </View>

          <Text
            style={styles.description}
            numberOfLines={isReadMore ? undefined : 3}
          >
            {haircut.description}{" "}
            <Text
              style={styles.readMore}
              onPress={() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut,
                );
                setIsReadMore(!isReadMore);
              }}
            >
              {isReadMore ? "Read less" : "Read more"}
            </Text>
          </Text>

          <Accordion title="Styling Tips" data={haircut.styling_tips} />
          <Accordion title="For Your Barber" data={haircut.barber_details} />

          <Text style={styles.sectionTitle}>Ideal For</Text>
          <View style={styles.card}>
              <Text style={styles.cardSubtitle}>Head Shape</Text>
              <View style={styles.tagContainer}>
                  {haircut.head_shapes.map(shape => <View key={shape.code} style={[styles.tag, styles.problemTag]}><Text style={[styles.tagText, styles.problemTagText]}>{shape.label}</Text></View>)}
              </View>
              <Text style={styles.cardSubtitle}>Hair Type</Text>
              <View style={styles.tagContainer}>
                  {haircut.hair_types.map(type => <View key={type.code} style={[styles.tag, styles.solutionTag]}><Text style={[styles.tagText, styles.solutionTagText]}>{type.label}</Text></View>)}
              </View>
          </View>

          <Text style={styles.sectionTitle}>Requirements</Text>
          <View style={styles.card}>
                  <RequirementBar label="Min Length (Top)" value={haircut.requirement.min_length_top_cm} maxValue={20} unit="cm" color="#a7c7e7" />
                  <RequirementBar label="Min Length (Sides)" value={haircut.requirement.min_length_sides_cm} maxValue={20} unit="cm" color="#f2b5a7" />
                  <RequirementBar label="Grow Out" value={haircut.requirement.grow_out_weeks} maxValue={12} unit="weeks" color="#a7e7c7" />
                  <RequirementBar label="Maintenance" value={haircut.requirement.maintenance_interval_weeks} maxValue={12} unit="weeks" color="#e7a7c7" />
                  <Text style={styles.notes}>{haircut.requirement.notes}</Text>
              </View>

          <Text style={styles.sectionTitle}>Recommended Products</Text>
          <View style={styles.productsListContainer}>
              {haircut.products.map(product => (
                  <TouchableOpacity key={product.id} style={styles.productRow}>
                      <Image source={{ uri: product.image }} style={styles.productRowImage} />
                      <View style={styles.productRowTextContainer}>
                          <Text style={styles.productRowName} numberOfLines={2}>{product.name}</Text>
                          <Text style={styles.productRowBrand} numberOfLines={1}>{product.brand}</Text>
                          <Text style={styles.productRowNotes} numberOfLines={3}>{product.notes}</Text>
                      </View>
                  </TouchableOpacity>
              ))}
          </View>
        </View>
      </Animated.ScrollView>

      <LinearGradient
        colors={['rgba(244, 244, 248, 0)', '#f4f4f8']}
        style={styles.gradient}
      >

        <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.selectButton}
          onPress={() => navigation.navigate('HairTryOnLoading', { haircut })}
        >
          <Text style={styles.selectButtonText}>Try on this style</Text>
        </TouchableOpacity>
      </View>
      </LinearGradient>


    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f8" },
  heroImage: { width: "100%", height: 400 },
  detailsContainer: {
    marginTop: -50,
    backgroundColor: "#f4f4f8",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: spacing.lg,
    paddingBottom: 100, // Space for footer
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#f4f4f8",
    paddingTop: 70,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.lg,
    zIndex: 1,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: typography.sizes.large,
    fontWeight: "bold",
    color: colors.text.primary,
    fontFamily: typography.fonts.rounded,
  },
  headerButton: {
    position: "absolute",
    top: 60,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 11,
  },
  backButton: { left: spacing.lg },
  favoriteButton: { right: spacing.lg },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: typography.sizes.xxlarge,
    fontWeight: "bold",
    color: colors.text.primary,
    flex: 1,
    fontFamily: typography.fonts.rounded,
  },
  tagline: {
    fontSize: typography.sizes.medium,
    color: colors.text.secondary,
    marginVertical: spacing.sm,
    fontFamily: typography.fonts.rounded,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,193,7,0.1)",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  ratingText: { marginLeft: spacing.sm, color: "#FFC107", fontWeight: "bold", fontFamily: typography.fonts.rounded },
  description: {
    fontSize: typography.sizes.medium,
    color: colors.text.secondary,
    lineHeight: 24,
    marginVertical: spacing.md,
    fontFamily: typography.fonts.rounded,
  },
  readMore: { color: colors.primary, fontWeight: "bold", fontFamily: typography.fonts.rounded },
  statsCard: {
    backgroundColor: 'white',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginVertical: spacing.lg,
    borderWidth: 1,
    borderColor: colors.gray.light,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    gap: spacing.lg,
  },
  statBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statBarLabel: {
    width: '25%',
    fontSize: typography.sizes.medium,
    color: colors.text.secondary,
    fontFamily: typography.fonts.rounded,
  },
  statBarContainer: {
    flex: 1,
    height: 10,
    backgroundColor: colors.gray.light,
    borderRadius: 5,
    justifyContent: 'center',
  },
  statBarFill: {
    height: '100%',
    borderRadius: 5,
  },
  statBarMarkers: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '10%', // Don't put markers at the very start/end
  },
  statBarMarker: {
    width: 2,
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  statBarValue: {
    width: '20%',
    textAlign: 'right',
    fontSize: typography.sizes.medium,
    fontWeight: '600',
    color: colors.text.primary,
    fontFamily: typography.fonts.rounded,
  },
  accordionContainer: {
    backgroundColor: "white",
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.gray.light,
    overflow: "hidden",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  accordionTitle: {
    fontSize: typography.sizes.large,
    fontWeight: "bold",
    color: colors.text.primary,
    fontFamily: typography.fonts.rounded,
  },
  accordionContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  listItem: {
    color: colors.text.secondary,
    fontSize: typography.sizes.medium,
    marginBottom: spacing.sm,
    lineHeight: 22,
    fontFamily: typography.fonts.rounded,
  },
  notes: {
    color: colors.text.secondary,
    fontSize: typography.sizes.medium,
    marginTop: spacing.md,
    fontStyle: "italic",
    fontFamily: typography.fonts.rounded,
  },
  card: {
    backgroundColor: "white",
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.gray.light,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardSubtitle: {
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: spacing.sm,
    fontFamily: typography.fonts.rounded,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  tag: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  problemTag: {
    backgroundColor: '#FFE3E3',
  },
  solutionTag: {
    backgroundColor: '#D4EDDA',
  },
  tagText: { 
    fontFamily: typography.fonts.rounded,
    fontWeight: "600",
  },
  problemTagText: {
    color: '#D83B01',
  },
  solutionTagText: {
    color: '#155724',
  },
  requirementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  requirementLabel: {
    width: '35%',
    fontSize: typography.sizes.medium,
    color: colors.text.secondary,
    fontFamily: typography.fonts.rounded,
    paddingRight: spacing.md,
  },
  progressBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: colors.gray.light,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
  },
  requirementValue: {
    fontSize: typography.sizes.medium,
    fontWeight: '600',
    color: colors.text.primary,
    fontFamily: typography.fonts.rounded,
    minWidth: 60,
    textAlign: 'right',
    marginLeft: spacing.md,
  },

  // New styles for product list
  productsListContainer: {
      gap: spacing.md,
  },
  productRow: {
      flexDirection: 'row',
      backgroundColor: 'white',
      borderRadius: borderRadius.lg,
      padding: spacing.md,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
  },
  productRowImage: {
      width: 80,
      height: 80,
      borderRadius: borderRadius.md,
      marginRight: spacing.md,
      resizeMode: 'cover',
  },
  productRowTextContainer: {
      flex: 1,
      gap: spacing.xs,
  },
  productRowName: {
      fontSize: typography.sizes.large,
      fontWeight: 'bold',
      color: colors.text.primary,
      fontFamily: typography.fonts.rounded,
  },
  productRowBrand: {
      fontSize: typography.sizes.medium,
      color: colors.text.secondary,
      fontFamily: typography.fonts.rounded,
  },
  productRowNotes: {
      fontSize: typography.sizes.medium,
      color: colors.text.secondary,
      fontFamily: typography.fonts.rounded,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 250,
    pointerEvents: 'box-none',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    paddingBottom: 60,
  },
  selectButton: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: borderRadius.full,
    alignItems: "center",
  },
  selectButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: typography.sizes.large,
    fontFamily: typography.fonts.rounded,
  },
  sectionTitle: { fontSize: typography.sizes.xlarge, fontWeight: 'bold', color: colors.text.primary, marginBottom: spacing.md, marginTop: spacing.lg, fontFamily: typography.fonts.rounded },
});

export default HaircutDetailScreen;
