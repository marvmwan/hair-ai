import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, StyleSheet, Text, View } from "react-native";
import Carousel from 'react-native-reanimated-carousel';
import { OnboardingStackParamList } from "../../navigation/OnboardingNavigator";
import { typography } from "../../theme/colors";
import { ScanType } from "./HairScanInfoScreen";

type LoadingScreenRouteProp = RouteProp<OnboardingStackParamList, "Loading">;

const { width } = Dimensions.get('window');
const carouselData = [
  "Analyzing your hair type...",
  "Matching styles to your face shape...",
  "Finding the perfect products...",
  "Finalizing your recommendations...",
];

const LoadingScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<LoadingScreenRouteProp>();
    const progress = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(progress, {
            toValue: 1,
            duration: 10000,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();

        const timer = setTimeout(() => {
            if (route.params?.scanType === ScanType.HaircutTryOn) {
                navigation.navigate("HaircutTryOn" as never);
            } else {
                navigation.navigate("Paywall" as never);
            }
        }, 10000);

        return () => clearTimeout(timer);
    }, [navigation, progress, route.params?.scanType]);


    const animatedWidth = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    return (
        <LinearGradient colors={['#FEE7F0', '#F6D9E3']} style={styles.container}>
            <Text style={styles.emoji}>🧠</Text>
            <Carousel
                loop
                width={width}
                height={100}
                autoPlay={true}
                data={carouselData}
                scrollAnimationDuration={1500}
                autoPlayInterval={2500}
                renderItem={({ item }) => (
                    <View style={styles.carouselItem}>
                        <Text style={styles.text}>{item}</Text>
                    </View>
                )}
            />
            <View style={styles.progressBarContainer}>
                <Animated.View style={[styles.progressBar, { width: animatedWidth }]} />
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emoji: {
        fontSize: 60,
        marginBottom: 20,
    },
    text: {
        fontFamily: typography.fonts.rounded,
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        paddingHorizontal: 40,
    },
    carouselItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressBarContainer: {
        height: 8,
        width: width * 0.6,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 4,
        marginTop: 30,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#333',
        borderRadius: 4,
    },
});

export default LoadingScreen;
