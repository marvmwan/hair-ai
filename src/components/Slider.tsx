import Slider from '@react-native-community/slider';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme/colors';

interface SliderProps {
  value: number;
  onValueChange: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  label?: string;
  minimumLabel?: string;
  maximumLabel?: string;
  showValue?: boolean;
}

const CustomSlider: React.FC<SliderProps> = ({
  value,
  onValueChange,
  minimumValue = 0,
  maximumValue = 10,
  step = 1,
  label,
  minimumLabel,
  maximumLabel,
  showValue = true,
}) => {
  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>{label}</Text>
      )}
      
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={minimumValue}
          maximumValue={maximumValue}
          value={value}
          onValueChange={onValueChange}
          step={step}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.gray.medium}
          // thumbStyle={styles.thumb}
          // trackStyle={styles.track}
        />
      </View>

      <View style={styles.labelsContainer}>
        {minimumLabel && (
          <Text style={styles.minMaxLabel}>{minimumLabel}</Text>
        )}
        {showValue && (
          <Text style={styles.valueLabel}>{Math.round(value)}</Text>
        )}
        {maximumLabel && (
          <Text style={styles.minMaxLabel}>{maximumLabel}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: typography.sizes.medium,
    fontWeight: typography.weights.medium,
    color: colors.text.primary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  sliderContainer: {
    paddingHorizontal: spacing.md,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  thumb: {
    backgroundColor: colors.primary,
    width: 24,
    height: 24,
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    marginTop: spacing.sm,
  },
  minMaxLabel: {
    fontSize: typography.sizes.small,
    color: colors.gray.dark,
    fontWeight: typography.weights.medium,
  },
  valueLabel: {
    fontSize: typography.sizes.large,
    color: colors.primary,
    fontWeight: typography.weights.bold,
    backgroundColor: colors.gray.light,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    minWidth: 50,
    textAlign: 'center',
  },
});

export default CustomSlider;