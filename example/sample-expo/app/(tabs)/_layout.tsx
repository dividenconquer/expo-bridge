import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Native",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "phone-portrait" : "phone-portrait-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="webview"
        options={{
          title: "Webview",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "browsers" : "browsers-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
