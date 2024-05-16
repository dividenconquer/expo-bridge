import { StyleSheet, View } from "react-native";

import { CoreWebview } from "@seoulcomix/core-mobile";

export default function TabTwoScreen() {
  return (
    <View style={{ flex: 1 }}>
      <CoreWebview isScreen={false} />
    </View>
  );
}
