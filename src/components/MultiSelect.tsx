import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { borderRadius, colors, spacing, typography } from '../theme/colors';

interface MultiSelectOption {
  id: string;
  label: string;
  emoji?: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  maxSelections?: number;
  title?: string;
  subtitle?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedValues,
  onSelectionChange,
  maxSelections,
  title,
  subtitle,
}) => {
  const handleOptionPress = (optionId: string) => {
    const isSelected = selectedValues.includes(optionId);
    if (maxSelections === 1) {
      // Single select: just select the new option
      onSelectionChange([optionId]);
      return;
    }
    if (isSelected) {
      // Remove from selection
      const newValues = selectedValues.filter(id => id !== optionId);
      onSelectionChange(newValues);
    } else {
      // Add to selection if under max limit
      if (maxSelections && selectedValues.length >= maxSelections) {
        return; // Don't add if at max limit
      }
      const newValues = [...selectedValues, optionId];
      onSelectionChange(newValues);
    }
  };

  const getOptionStyle = (isSelected: boolean, isDisabled: boolean) => {
    return [
      styles.option,
      isSelected && styles.selectedOption,
      isDisabled && styles.disabledOption,
    ];
  };

  const getOptionTextStyle = (isSelected: boolean, isDisabled: boolean) => {
    return [
      styles.optionText,
      isSelected && styles.selectedOptionText,
      isDisabled && styles.disabledOptionText,
    ];
  };

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}


      {/* Options list is now scrollable if too long */}
      <ScrollView
        style={styles.optionsScroll}
        contentContainerStyle={styles.optionsContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.id);
          // Only disable for multi-select
          const isDisabled = maxSelections && maxSelections > 1
            ? selectedValues.length >= maxSelections && !isSelected
            : false;

          return (
            <TouchableOpacity
              key={option.id}
              style={getOptionStyle(isSelected, isDisabled)}
              onPress={() => handleOptionPress(option.id)}
              disabled={isDisabled}
              activeOpacity={0.7}
            >
              {option.emoji && (
                <Text style={styles.emoji}>{option.emoji}</Text>
              )}
              <Text style={getOptionTextStyle(isSelected, isDisabled)}>
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    fontSize: typography.sizes.large,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.sizes.medium,
    color: colors.gray.dark,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  maxSelectionsText: {
    fontSize: typography.sizes.small,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spacing.md,
    fontWeight: typography.weights.medium,
  },
  optionsContainer: {
    flexDirection: 'column',
    width: '100%',
    gap: spacing.lg,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "rgba(227, 242, 253, 0.5)",
    borderWidth: 0,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    marginBottom: 0,
    minHeight: 64,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  selectedOption: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.15,
    borderColor: colors.primary,
  },
  disabledOption: {
    opacity: 0.4,
  },
  optionText: {
    fontSize: typography.sizes.large,
    fontWeight: typography.weights.medium,
    color: colors.text.primary,
    textAlign: 'left',
    fontFamily: typography.fonts.rounded,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  selectedOptionText: {
    color: colors.secondary,
  },
  disabledOptionText: {
    color: colors.gray.dark,
  },
  emoji: {
    fontSize: 28,
    marginRight: spacing.lg,
    marginBottom: 0,
  },
  optionsScroll: {
    maxHeight: 400,
    width: '100%',
    marginBottom: 0,
  },
});

export default MultiSelect;