import { Image } from "expo-image";
import { View, Text } from "react-native";
import BannerImage from "../../assets/images/banner.png";

export const Banner = ({ from }: { from: "native" | "webview" }) => {
  return (
    <View
      style={{
        borderColor: "rgba(0,0,0,0.4)",
        borderWidth: 1,
        padding: 10,
        borderStyle: "dashed",
      }}
    >
      <Image source={BannerImage} style={{ height: 100 }} />
      <Text
        style={{
          fontSize: 20,
          textAlign: "center",
          marginVertical: 20,
          fontWeight: "700",
          lineHeight: 24,
        }}
      >
        Example {from === "native" ? "Expo App" : "Webview"} for Expo Bridge
      </Text>
    </View>
  );
};
