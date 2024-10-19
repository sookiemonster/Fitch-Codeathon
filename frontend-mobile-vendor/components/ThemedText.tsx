import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { DaysOne_400Regular, useFonts } from "@expo-google-fonts/days-one";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "paragraph"
    | "buttonText";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  let [fontLoaded] = useFonts({
    DaysOne: DaysOne_400Regular,
  });
  if (fontLoaded) {
    return (
      <Text
        style={[
          { color },
          type === "default" ? styles.default : undefined,
          type === "title" ? styles.title : undefined,
          type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
          type === "subtitle" ? styles.subtitle : undefined,
          type === "link" ? styles.link : undefined,
          type === "paragraph" ? styles.paragraph : undefined,
          type === "buttonText" ? styles.buttonText : undefined,
          style,
        ]}
        {...rest}
      />
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "DaysOne",
    color: "black",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "left",
    left: 20,
  },
  subtitle: {
    fontFamily: "DaysOne",
    color: "black",
    fontSize: 24,
    textAlign: "left",
    marginTop: 0,
    left: 20,
  },
  paragraph: {
    color: "black",
    fontSize: 18,
    textAlign: "center",
    lineHeight: 30,
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#178249",
  },
  buttonText: {
    fontFamily: "DaysOne",
    fontSize: 22,
    color: "white",
    alignSelf: "center",
  },
});