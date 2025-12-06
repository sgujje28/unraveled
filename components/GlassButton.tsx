import { ReactNode } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";

interface GlassButtonProps {
  children: ReactNode;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  opacity?: number;
  borderOpacity?: number;
  disabled?: boolean;
}

export default function GlassButton({
  children,
  onPress,
  style,
  textStyle,
  opacity = 0.2,
  borderOpacity = 0.4,
  disabled = false,
}: GlassButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: `rgba(255, 255, 255, ${opacity})`,
          borderColor: `rgba(255, 255, 255, ${borderOpacity})`,
          opacity: disabled ? 0.5 : pressed ? 0.8 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
        style,
      ]}
    >
      {typeof children === "string" ? (
        <Text style={[styles.text, textStyle]}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    borderWidth: 1.5,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    ...(Platform.OS === "web"
      ? ({
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        } as any)
      : {}),
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
