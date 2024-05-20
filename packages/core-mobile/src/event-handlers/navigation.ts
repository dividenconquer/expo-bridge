import {
  CoreBridge,
  useCoreBridge,
  useCoreBridgeRoundTripListener,
} from "@expo-bridge/core-bridge";
import type { CoreNavigationPushParams } from "@expo-bridge/core-navigation";
import { router } from "expo-router";
import { useCallback } from "react";

export const useCoreNagivationEventHandler = (webviewScreenPath: string) => {
  const { bridge } = useCoreBridge();
  useCoreBridgeRoundTripListener(
    bridge,
    useCallback((data, event) => {
      if (data.functionName === "core-navigation-push") {
        let params = data.functionArgs[0] as CoreNavigationPushParams;
        if (params.options?.isNative) {
          router.push({
            pathname: params.path,
            params: params.options?.params ?? {},
          });
        } else {
          router.push({
            pathname: webviewScreenPath,
            params: Object.assign(
              { _webview_inner_path: params.path },
              params.options?.params ?? {}
            ),
          });
        }

        bridge.respondToRoundTrip(event);
      } else if (data.functionName === "core-navigation-pop") {
        if (router.canGoBack()) {
          router.dismiss(1);

          bridge.respondToRoundTrip(event);
        }
      }
    }, [])
  );
};
