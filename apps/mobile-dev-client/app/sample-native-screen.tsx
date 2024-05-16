import { Stack } from "expo-router";
import { Button, SafeAreaView, Text, View } from "react-native";
import { useCoreNavigation } from "@repo/core-navigation";
import { useCoreContext } from "@repo/core-mobile";

export default () => {
  const context = useCoreContext();
  const { pop, push } = useCoreNavigation();
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerShown: false,
          fullScreenGestureEnabled: true,
        }}
      />
      <View style={{ gap: 20 }}>
        <Text style={{ fontSize: 40 }}>Sample Native Screen</Text>
        <Button
          title="Event"
          onPress={() => {
            context.coreBridge.emitEvent("event");
          }}
        />
        <Button
          title="Push webview"
          onPress={() => {
            push("/core-webview");
          }}
        />
        <Button title="Pop current screen" onPress={() => pop()} />
      </View>
    </SafeAreaView>
  );
};
