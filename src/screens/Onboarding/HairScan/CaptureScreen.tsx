import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from '../../../components/Button';
import { FunnelAnswers, useFunnel } from '../../../contexts/FunnelContext';
import { HairScanStackParamList } from '../../../navigation/HairScanNavigator';
import { borderRadius, colors, spacing, typography } from '../../../theme/colors';

type CaptureScreenRouteProp = RouteProp<HairScanStackParamList, 'Capture'>;
type CaptureScreenNavigationProp = StackNavigationProp<HairScanStackParamList, 'Capture'>;

const scanOrder: (keyof FunnelAnswers)[] = [
  'faceShapeImage',
  'topViewImage',
  'sideViewImage',
  'backViewImage',
  'frontViewImage',
];

const scanDetails: { [key: string]: { title: string; instructions: string; example: any } } = {
  faceShapeImage: {
    title: 'Face shape scan',
    instructions: 'For jaw curvature, cheekbones, forehead width, and chin structure. Ensure your entire face is in the frame.',
    example: require('../../../../assets/images/hair-scan-info/front-view.jpeg'), // Placeholder
  },
  topViewImage: {
    title: 'Top view scan',
    instructions: 'Hold your phone over your head. Capture your scalp and hair density from above.',
    example: require('../../../../assets/images/hair-scan-info/top-view.jpeg'),
  },
  sideViewImage: {
    title: 'Side view scan',
    instructions: 'Helps assess hairline recession along the temples and density across the sides.',
    example: require('../../../../assets/images/hair-scan-info/side-view.jpeg'),
  },
  backViewImage: {
    title: 'Back view scan',
    instructions: 'It’s okay if your head isn’t centered, as long as the lower hairline is visible.',
    example: require('../../../../assets/images/hair-scan-info/back-view.jpeg'),
  },
  frontViewImage: {
    title: 'Front hairline scan',
    instructions: 'To estimate recession risk, pull hair back with your hand or comb to expose the hairline clearly.',
    example: require('../../../../assets/images/hair-scan-info/front-view.jpeg'),
  },
};

const CaptureScreen = () => {
  const navigation = useNavigation<CaptureScreenNavigationProp>();
  const route = useRoute<CaptureScreenRouteProp>();
  const { answers, updateAnswer } = useFunnel();

  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<'front' | 'back'>('back');
  const cameraRef = useRef<CameraView>(null);

  const currentScanKey = route.params?.scanType 
    ? `${route.params.scanType}ViewImage` as keyof FunnelAnswers
    : scanOrder.find(key => !answers[key]) || 'faceShapeImage';

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
    const nextScanKey = scanOrder.find((key, index) => index > currentIndex && !answers[key]);

    if (nextScanKey) {
      const nextScanType = nextScanKey.replace('ViewImage', '') as 'top' | 'side' | 'back' | 'front' | 'face';
      navigation.push('Capture', { scanType: nextScanType });
    } else {
      navigation.navigate('Review');
    }
  };

  const handleBack = () => {
    const currentIndex = scanOrder.indexOf(currentScanKey);
    if (currentIndex > 0) {
      const prevScanKey = scanOrder[currentIndex - 1];
      const prevScanType = prevScanKey.replace('ViewImage', '') as 'top' | 'side' | 'back' | 'front' | 'face';
      navigation.navigate('Capture', { scanType: prevScanType });
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
    <View style={styles.container}>
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
          <Image source={{ uri: typeof capturedImage === 'string' ? capturedImage : undefined }} style={styles.previewImage} />
        ) : (
          <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
            <Image source={details.example} style={styles.exampleImage} />
          </CameraView>
        )}
      </View>

      {capturedImage ? (
        <View style={styles.buttonContainer}>
          <Button
            title={`Continue to ${scanOrder[scanOrder.indexOf(currentScanKey) + 1]?.replace('ViewImage', ' view') || 'Review'}`}
            onPress={handleContinue}
            size="large"
          />
          <TouchableOpacity onPress={() => updateAnswer(currentScanKey, undefined)} style={styles.retakeButton}>
            <Text style={styles.retakeButtonText}>Retake the scan</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.controlsContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.controlButton}>
            <Ionicons name="images-outline" size={30} color={colors.text.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={takePicture} style={styles.shutterButton}>
            <View style={styles.shutterButtonInner} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFacing(
            facing === 'back' ? 'front' : 'back'
          )} style={styles.controlButton}>
            <Ionicons name="camera-reverse-outline" size={30} color={colors.text.primary} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    paddingTop: Platform.OS === 'android' ? spacing.xl : spacing.lg,
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
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
  previewImage: {
    flex: 1,
  },
  exampleImage: {
    position: 'absolute',
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
  },
  retakeButton: {
    marginTop: spacing.md,
    alignItems: 'center',
  },
  retakeButtonText: {
    fontFamily: typography.fonts.rounded,
    fontSize: typography.sizes.medium,
    color: colors.primary,
    fontWeight: typography.weights.semibold,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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
    justifyContent: 'center',
    alignItems: 'center',
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
