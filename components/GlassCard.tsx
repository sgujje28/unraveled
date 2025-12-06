import { ReactNode } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

interface GlassCardProps {
  children: ReactNode;
  style?: ViewStyle;
  opacity?: number;
  borderOpacity?: number;
}

export default function GlassCard({
  children,
  style,
  opacity = 0.15,
  borderOpacity = 0.3,
}: GlassCardProps) {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: `rgba(255, 255, 255, ${opacity})`,
          borderColor: `rgba(255, 255, 255, ${borderOpacity})`,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
