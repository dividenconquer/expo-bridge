import {
  CoreBridge,
  useCoreBridgeRoundTripListener,
} from "@seoulcomix/core-bridge";
import { CoreNavigationPushParams } from "@seoulcomix/core-navigation";
import { router } from "expo-router";
import { useCallback } from "react";

export const useCoreNagivationEventHandler = (
  coreBridge: CoreBridge,
  webviewScreenPath: string
) => {
  useCoreBridgeRoundTripListener(
    coreBridge,
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

        coreBridge.respondToRoundTrip(event);
      } else if (data.functionName === "core-navigation-pop") {
        if (router.canGoBack()) {
          router.dismiss(1);

          coreBridge.respondToRoundTrip(event);
        }
      }
    }, [])
  );
};
