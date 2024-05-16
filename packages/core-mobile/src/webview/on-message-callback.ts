import { router } from "expo-router";
import { WebViewMessageEvent } from "react-native-webview";
import { CoreProviderProps } from "../providers/core";

export const onMessageCallback = (
  event: WebViewMessageEvent,
  coreContext: CoreProviderProps["option"]
) => {
  //   const _data = JSON.parse(event.nativeEvent.data);
  //   if (_data.type === "navigation-push") {
  //     const data = _data as CoreNavigationPushParams;
  //     if (data.options?.isNative) {
  //       router.push({
  //         pathname: data.path,
  //         params: data.options?.params ?? {},
  //       });
  //     } else {
  //       router.push({
  //         pathname: coreContext.RNWebviewScreenPath,
  //         params: Object.assign(
  //           { _webview_inner_path: data.path },
  //           data.options?.params ?? {}
  //         ),
  //       });
  //     }
  //   } else if (_data.type === "navigation-pop") {
  //     const data = _data as CoreNavigationPopParams;
  //     if (router.canGoBack()) {
  //       router.back();
  //     }
  //   }
};
