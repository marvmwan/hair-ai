import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from '../../../components/Button';
import { useFunnel } from '../../../contexts/FunnelContext';
import { HairScanStackParamList } from '../../../navigation/HairScanNavigator';
import { borderRadius, colors, spacing, typography } from '../../../theme/colors';

type ReviewScreenNavigationProp = StackNavigationProp<HairScanStackParamList, 'Review'>;

const scanOrder = ['topViewImage', 'sideViewImage', 'backViewImage', 'frontViewImage', 'faceShapeImage'];

const ReviewScreen = () => {
  const navigation = useNavigation<ReviewScreenNavigationProp>();
  const { answers } = useFunnel();

  const capturedImages = scanOrder.map(key => ({
    key,
    uri: answers[key as keyof typeof answers],
    title: key.replace('ViewImage', ' view').replace('ShapeImage', ' shape'),
  }));

  const allRequiredScansDone = scanOrder.every(key => key === 'faceShapeImage' || !!answers[key as keyof typeof answers]);

  const handleRetake = (scanType: string) => {
    const type = scanType.replace('ViewImage', '').replace('ShapeImage', '') as 'top' | 'side' | 'back' | 'front' | 'face';
    navigation.navigate('Capture', { scanType: type });
  };
  
  const handleConfirm = () => {
    // TODO: Implement analysis logic
    console.log('Starting analysis with:', answers);
    navigation.getParent()?.getParent()?.navigate('Loading');
  };

  const renderScanItem = ({ item }: { item: typeof capturedImages[0] }) => (
    <View style={styles.scanItem}>
      {item.uri ? (
        <Image source={{ uri: item.uri as string }} style={styles.thumbnail} />
      ) : (
        <View style={styles.placeholder}>
          <Ionicons name="camera-outline" size={40} color={colors.gray.dark} />
        </View>
      )}
      <Text style={styles.itemTitle}>{item.title}</Text>
      <TouchableOpacity onPress={() => handleRetake(item.key)} style={styles.retakeButton}>
        <Text style={styles.retakeText}>Retake</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Review Scans</Text>
      </View>

      <FlatList
        data={capturedImages}
        renderItem={renderScanItem}
        numColumns={2}
        keyExtractor={item => item.key}
        contentContainerStyle={styles.grid}
      />
      
      {!answers.faceShapeImage && (
        <View style={styles.addFaceScanCard}>
          <Text style={styles.addFaceScanTitle}>Recommended Hairstyle?</Text>
          <Text style={styles.addFaceScanText}>
            Add a face scan to analyze for optimal Haircut style&apos;s tailored to your face shape and hair capabilities
          </Text>
          <Button
            title="Add Face Scan"
            onPress={() => handleRetake('faceShapeImage')}
            size="small"
            leftIcon={<Ionicons name="scan-outline" size={20} color={colors.text.primary} />}
          />
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button
          title="Confirm and Start Analysis"
          onPress={handleConfirm}
          disabled={!allRequiredScansDone}
          size="large"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
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
  grid: {
    justifyContent: 'space-between',
  },
  scanItem: {
    width: '48%',
    aspectRatio: 4 / 5,
    marginBottom: spacing.md,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: colors.secondary,
  },
  thumbnail: {
    flex: 1,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray.light,
  },
  itemTitle: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    fontFamily: typography.fonts.rounded,
    fontSize: typography.sizes.small,
    fontWeight: typography.weights.semibold,
    color: colors.secondary,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  retakeButton: {
    position: 'absolute',
    bottom: spacing.sm,
    right: spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.6)',
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
    marginVertical: spacing.lg,
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
});

export default ReviewScreen;
