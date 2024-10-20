import { Tabs } from "expo-router";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

export default function LoginLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarLabelStyle: { color: "black" }, // Set tab label text color to black
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Sign In", headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={"black"} // Icon color is black
            />
          ),
        }}
      />
      <Tabs.Screen
        name="registration"
        options={{
          title: "Register", headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? "star" : "star-outline"}
              color={"black"} // Icon color is black
            />
          ),
        }}
      />
    </Tabs>
  );
}
