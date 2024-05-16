import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";

import React, { useCallback, useEffect, useState } from "react";
import { router } from "expo-router";
import { CoreWebview, useCoreContext } from "@seoulcomix/core-mobile";
import { useCoreNavigation } from "@seoulcomix/core-navigation";
import { useCoreStorage } from "@seoulcomix/core-storage";
export default function HomeScreen() {
  // const [eventHistory, setEventHistory] = useState<string[]>([]);
  const { coreBridge } = useCoreContext();
  // const onEvent = useCallback((data: any) => {
  //   setEventHistory((p) => [...p, data]);
  // }, []);

  // useCoreBridgeListener(coreBridge, onEvent);
  const { push, pop } = useCoreNavigation();
  const { getJSON, setJSON } = useCoreStorage();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <View style={{ height: 200 }}>
        {eventHistory.map((event, index) => (
          <View key={index} style={styles.stepContainer}>
            <Text>{JSON.stringify(event)}</Text>
          </View>
        ))}
      </View> */}

      <Button
        title="setJSON"
        onPress={async () => {
          await setJSON("test", { test: "test" });
          alert(JSON.stringify(await getJSON("test")));
        }}
      />
      {/* <Button
        title="Clear event"
        onPress={() => {
          setEventHistory([]);
        }}
      /> */}
      <Button title="push webview" onPress={() => push("/core-webview")} />
      <Button
        title="push native screen"
        onPress={() => push("/sample-native-screen", { isNative: true })}
      />
      <Button title="pop" onPress={() => pop()} />
      <CoreWebview isScreen={false} style={{ flex: 0.5 }} />
      <CoreWebview isScreen={false} />
    </SafeAreaView>
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
