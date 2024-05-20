import { View } from "react-native";

import { CoreWebview } from "@expo-bridge/core-mobile";

export default function WebviewScreen() {
  return (
    <View style={{ flex: 1 }}>
      <CoreWebview isScreen={false} />
    </View>
  );
}
