import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import React, { useCallback, useEffect, useState } from "react";
import { router } from "expo-router";
import { CoreWebview, useCoreContext } from "@expo-bridge/core-mobile";
import { useCoreNavigation } from "@expo-bridge/core-navigation";
import { useCoreStorage } from "@expo-bridge/core-storage";
import { Image } from "expo-image";
import { Banner, Button, StorageSection } from "@expo-bridge/sample-ui";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  // const [eventHistory, setEventHistory] = useState<string[]>([]);
  // const {} = useCoreContext();
  // const onEvent = useCallback((data: any) => {
  //   setEventHistory((p) => [...p, data]);
  // }, []);

  // useCoreBridgeListener(coreBridge, onEvent);
  const { push, pop } = useCoreNavigation();
  const { getJSON, setJSON } = useCoreStorage();

  const { top } = useSafeAreaInsets();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white", paddingTop: top }}>
      <View style={{ paddingHorizontal: 20, gap: 20 }}>
        <Banner from="native" />

        <StorageSection />

        {/* <View
          style={{
            gap: 20,
          }}
        >
          <Button text="hello" />
        </View> */}
        {/* <View style={{ height: 200 }}>
        {eventHistory.map((event, index) => (
          <View key={index} style={styles.stepContainer}>
            <Text>{JSON.stringify(event)}</Text>
          </View>
        ))}
      </View> */}

        {/* <Button
        title="setJSON"
        onPress={async () => {
          await setJSON("test", { test: "test" });
          alert(JSON.stringify(await getJSON("test")));
        }}
      /> */}
        {/* <Button
        title="Clear event"
        onPress={() => {
          setEventHistory([]);
        }}
      /> */}
        {/* <Button title="push webview" onPress={() => push("/core-webview")} /> */}
        {/* <Button
        title="push native screen"
        onPress={() => push("/sample-native-screen", { isNative: true })}
      /> */}
        {/* <Button title="pop" onPress={() => pop()} /> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
