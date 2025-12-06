import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import Sidebar from "../components/Sidebar";
import { SidebarProvider } from "../components/SidebarContext";

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

export default function RootLayout() {
  return (
    <ThemeProvider value={navTheme}>
      <SidebarProvider>
        <View style={styles.container}>
          <LinearGradient
            colors={["#0a3c9a", "#e52b6f"]}
            style={styles.gradient}
          />
          <Sidebar />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "transparent" },
              animation: "fade",
            }}
          />
        </View>
      </SidebarProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
