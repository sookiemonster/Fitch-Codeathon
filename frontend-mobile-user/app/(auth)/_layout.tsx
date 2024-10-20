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
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Sign In",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "home" : "home-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="registration"
          options={{
            title: "Register",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "star" : "star-outline"}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    );
}
