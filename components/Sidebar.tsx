import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useSidebar } from "./SidebarContext";

type NavItem = {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
};

const navItems: NavItem[] = [
  { name: "Home", icon: "home-outline", route: "/" },
  { name: "Assessment", icon: "clipboard-outline", route: "/assessment" },
];

const accountItem: NavItem = {
  name: "Account",
  icon: "person-outline",
  route: "/account",
};

export default function Sidebar() {
  const { isExpanded, setIsExpanded, isMobile } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();

  const handlePress = (route: string) => {
    router.push(route as any);
  };

  const allItems = [...navItems, accountItem];

  // Mobile: Bottom bar
  if (isMobile) {
    return (
      <View style={styles.bottomBar}>
        {allItems.map((item) => {
          const isActive = pathname === item.route;
          return (
            <Pressable
              key={item.route}
              style={styles.bottomBarItem}
              onPress={() => handlePress(item.route)}
            >
              <View
                style={[
                  styles.bottomBarIconContainer,
                  isActive && styles.bottomBarIconContainerActive,
                ]}
              >
                <Ionicons
                  name={item.icon}
                  size={24}
                  color={isActive ? "#ffffff" : "#e0e0e0"}
                />
              </View>
              <Text
                style={[
                  styles.bottomBarText,
                  isActive && styles.bottomBarTextActive,
                ]}
              >
                {item.name}
              </Text>
            </Pressable>
          );
        })}
      </View>
    );
  }

  // Desktop/Tablet: Side bar
  const renderNavItem = (item: NavItem) => {
    const isActive = pathname === item.route;
    return (
      <Pressable
        key={item.route}
        style={[styles.navItem, isActive && styles.navItemActive]}
        onPress={() => handlePress(item.route)}
      >
        <Ionicons
          name={item.icon}
          size={24}
          color={isActive ? "#ffffff" : "#e0e0e0"}
        />
        <Text
          style={[
            styles.navText,
            isActive && styles.navTextActive,
            {
              opacity: isExpanded ? 1 : 0,
              ...(Platform.OS === "web"
                ? { transition: "opacity 0.3s ease" }
                : {}),
            },
          ]}
        >
          {item.name}
        </Text>
      </Pressable>
    );
  };

  return (
    <View
      style={[
        styles.sidebar,
        {
          width: isExpanded ? 200 : 70,
          ...(Platform.OS === "web" ? { transition: "width 0.3s ease" } : {}),
        },
      ]}
      onPointerEnter={() => Platform.OS === "web" && setIsExpanded(true)}
      onPointerLeave={() => Platform.OS === "web" && setIsExpanded(false)}
    >
      <View style={{ flex: 1 }}>{navItems.map(renderNavItem)}</View>
      <View style={{ paddingBottom: 20 }}>{renderNavItem(accountItem)}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    paddingTop: 60,
    paddingHorizontal: 10,
    zIndex: 1000,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRightWidth: 1,
    borderRightColor: "rgba(255, 255, 255, 0.2)",
    ...(Platform.OS === "web"
      ? ({
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        } as any)
      : {}),
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  navItemActive: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  navText: {
    color: "#e0e0e0",
    fontSize: 16,
    marginLeft: 15,
    fontWeight: "500",
  },
  navTextActive: {
    color: "#ffffff",
    fontWeight: "600",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 8,
    paddingTop: 8,
    zIndex: 1000,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.2)",
    ...(Platform.OS === "web"
      ? ({
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        } as any)
      : {}),
  },
  bottomBarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  bottomBarIconContainer: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    marginBottom: 4,
  },
  bottomBarIconContainerActive: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  bottomBarText: {
    fontSize: 11,
    color: "#e0e0e0",
    fontWeight: "500",
  },
  bottomBarTextActive: {
    color: "#ffffff",
    fontWeight: "600",
  },
});
