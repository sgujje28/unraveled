import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { useSidebar } from "./SidebarContext";

type PageContainerProps = {
  children: React.ReactNode;
};

export default function PageContainer({ children }: PageContainerProps) {
  const { isExpanded, isMobile } = useSidebar();

  const marginLeft = isMobile ? 0 : isExpanded ? 200 : 70;
  const paddingBottom = isMobile ? 100 : 20;
  const paddingLeft = isMobile ? 0 : 20;

  return (
    <View
      style={[
        styles.container,
        {
          marginLeft,
          paddingBottom,
          paddingLeft,
          ...(Platform.OS === "web"
            ? { transition: "margin-left 0.3s ease" }
            : {}),
        },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: "transparent",
  },
});
