import { Tabs } from "expo-router";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

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
        // options={{
        //   title: "Home",
        //   tabBarIcon: ({ color, focused }) => (
        //     <TabBarIcon
        //       name={focused ? "globe" : "globe-outline"}
        //       color={color}
        //     />
        //   ),
        // }}
      />
    </Tabs>
  );
}
