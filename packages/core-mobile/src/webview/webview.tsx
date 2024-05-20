import { UNSTABLE_usePreventRemove } from "@react-navigation/native";
import {
  Stack,
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import * as React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  Text,
  View,
  Button,
  ViewProps,
} from "react-native";
import WebView from "react-native-webview";
import { useCoreContext } from "../providers/option-context";
import { onMessageCallback } from "./on-message-callback";
import { useCallback, useEffect } from "react";
import { useCoreBridge, useCoreBridgeListener } from "@expo-bridge/core-bridge";

export type CoreWebviewProps = {
  isScreen?: boolean;
} & ViewProps;

export function CoreWebview({ isScreen, ...viewProps }: CoreWebviewProps) {
  const { _webview_inner_path, ...params } = useLocalSearchParams();
  const webviewRef = React.useRef<WebView>(null);
  const coreContext = useCoreContext();
  const { bridge } = useCoreBridge();

  // RN core bridge 에서 온 event 를 webview core event로 전달
  useCoreBridgeListener(
    bridge,
    useCallback((event: any) => {
      if (!webviewRef.current) return;
      const run = `
        window.handleCoreBridgeFromNative(\`${JSON.stringify(event)}\`);
        true;
      `;
      webviewRef.current.injectJavaScript(run);
    }, [])
  );

  const { style: viewStyle, ...restViewProps } = viewProps;

  return (
    <View style={[{ flex: 1 }, viewStyle]} {...restViewProps}>
      {isScreen && (
        <Stack.Screen
          options={{
            headerShown: false,
            // 뒤로 가기 막혀있는지 여부
            // headerBackButtonMenuEnabled: false,
            // gestureEnabled: false,

            // 페이지 중간에서부터 뒤로가기 제스처를 활성화할 수 있는지 여부
            fullScreenGestureEnabled: true,
          }}
        />
      )}

      <WebView
        ref={webviewRef}
        onLoadEnd={() => {
          if (!webviewRef.current) return;
          const run = `
          window.RNScreenParams = \`${JSON.stringify(params)}\`;
          true;
        `;
          webviewRef.current.injectJavaScript(run);
        }}
        sharedCookiesEnabled={true}
        source={{ uri: coreContext.webviewBaseUrl }}
        style={{ flex: 1, width: "100%", backgroundColor: "white" }}
        onMessage={(event) => {
          const message = JSON.parse(event.nativeEvent.data);
          bridge.propagate(message);
        }}
        // bounce 일 경우에 배경 색깔
        // style: backgroundColor: 'red'
        // debug mode 일 경우에만
        webviewDebuggingEnabled={true}
        // vertical scrollbar
        showsVerticalScrollIndicator={false}
        // bounce
        overScrollMode="never"
        bounces={true}
        // 필요할 수도..? 아닐수도? 일단 화면 길이에 따라서 발생하는 이벤트는 아닌 걸로 보임
        onContentSizeChange={(e) => {
          console.log(e.nativeEvent);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
