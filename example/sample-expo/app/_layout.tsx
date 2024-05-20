import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import Constants from "expo-constants";

import { useColorScheme } from "@/hooks/useColorScheme";
import { CoreMobileProvider } from "@expo-bridge/core-mobile";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const CORE_MOBILE_OPTION = {};
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // for local development
  const url = new URL(`http://${Constants.expoConfig?.hostUri}`);
  url.port = "5173";

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <CoreMobileProvider
        option={{
          RNWebviewScreenPath: "/core-webview",
          webviewBaseUrl: url.toString(),
        }}
      >
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </CoreMobileProvider>
    </ThemeProvider>
  );
}
