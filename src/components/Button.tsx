import React from "react";
import {
  ActivityIndicator,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { borderRadius, colors, spacing, typography } from "../theme/colors";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  withShadow?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  style,
  textStyle,
  leftIcon,
  withShadow = true,
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: borderRadius.lg,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    };

    if (withShadow) {
      // Shadow for iOS
      baseStyle.shadowColor = "#000";
      baseStyle.shadowOffset = { width: 0, height: 2 };
      baseStyle.shadowOpacity = 0.15;
      baseStyle.shadowRadius = 4;
      // Shadow for Android
      baseStyle.elevation = 3;
    }

    // Size styles
    switch (size) {
      case "small":
        baseStyle.paddingHorizontal = spacing.md;
        baseStyle.paddingVertical = spacing.sm;
        baseStyle.minHeight = 36;
        break;
      case "large":
        baseStyle.paddingHorizontal = spacing.xl;
        baseStyle.paddingVertical = spacing.lg;
        baseStyle.minHeight = 56;
        break;
      default: // medium
        baseStyle.paddingHorizontal = spacing.lg;
        baseStyle.paddingVertical = spacing.md;
        baseStyle.minHeight = 48;
    }

    // Variant styles
    switch (variant) {
      case "secondary":
        baseStyle.backgroundColor = colors.secondary;
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = colors.gray.medium;
        break;
      case "outline":
        baseStyle.backgroundColor = "transparent";
        baseStyle.borderWidth = 2;
        baseStyle.borderColor = colors.primary;
        break;
      default: // primary
        baseStyle.backgroundColor = colors.primary;
    }

    // Disabled state
    if (disabled || loading) {
      baseStyle.opacity = 0.6;
    }

    return baseStyle;
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontWeight: typography.weights.semibold,
      textAlign: "center",
    };

    // Size styles
    switch (size) {
      case "small":
        baseStyle.fontSize = typography.sizes.small;
        break;
      case "large":
        baseStyle.fontSize = typography.sizes.large;
        break;
      default: // medium
        baseStyle.fontSize = typography.sizes.medium;
    }

    // Variant styles
    switch (variant) {
      case "secondary":
        baseStyle.color = colors.text.primary;
        break;
      case "outline":
        baseStyle.color = colors.primary;
        break;
      default: // primary
        baseStyle.color = colors.secondary;
    }

    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === "primary" ? colors.secondary : colors.primary}
          style={{ marginRight: spacing.sm }}
        />
      ) : leftIcon ? (
        leftIcon
      ) : null}
      <Text style={[getTextStyle(), textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
