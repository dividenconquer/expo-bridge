import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { CoreContextProvider } from "./option-context";
import {
  CoreBridge,
  CoreBridgeEventType,
  useCoreBridgeListener,
  useCoreBridgeRoundTripListener,
} from "@repo/core-bridge";
import { Platform } from "react-native";
import {
  CoreNavigationProvider,
  CoreNavigationPushParams,
} from "@repo/core-navigation";
import { router } from "expo-router";

export type CoreProviderProps = {
  option: {
    RNWebviewScreenPath: string;
    webviewBaseUrl: string;
  };
  children: React.ReactNode;
};

export const CoreProviders = ({ children, option }: CoreProviderProps) => {
  const coreBridge = useMemo(() => new CoreBridge(), []);
  const _option = useMemo(() => ({ ...option, coreBridge }), [option]);

  useCoreBridgeListener(
    coreBridge,
    useCallback((data: CoreBridgeEventType) => {
      // 예시
    }, [])
  );

  useCoreBridgeRoundTripListener(
    coreBridge,
    useCallback((data, event) => {
      switch (data.functionName) {
        case "test":
          coreBridge.respondToRoundTrip(event, { args: data.functionArgs });
          break;

        case "getOS":
          coreBridge.respondToRoundTrip(event, Platform.OS);
          break;

        case "core-navigation-push":
          let params = data.functionArgs[0] as CoreNavigationPushParams;
          if (params.options?.isNative) {
            router.push({
              pathname: params.path,
              params: params.options?.params ?? {},
            });
          } else {
            router.push({
              pathname: option.RNWebviewScreenPath,
              params: Object.assign(
                { _webview_inner_path: params.path },
                params.options?.params ?? {}
              ),
            });
          }
          coreBridge.respondToRoundTrip(event);
          break;

        case "core-navigation-pop":
          if (router.canGoBack()) {
            router.dismiss(1);

            coreBridge.respondToRoundTrip(event);
          } else {
            coreBridge.respondToRoundTrip(
              event,
              undefined,
              new Error("Can't go back.")
            );
          }

          break;
      }
    }, [])
  );
  // const [bottomSheets, setBottomSheets] = useState<string[]>([]);
  // const bottomSheetRefs = useRef<Map<string, BottomSheetModalMethods | null>>(
  //   new Map()
  // );

  // useEffect(() => {
  // for (let i = 0; i < 2; i++) {
  //   setTimeout(
  //     () => {
  //       console.log(i);
  //       console.log(bottomSheetRefs.current);
  //       bottomSheetRefs.current.set(i.toString(), null);
  //       setBottomSheets(
  //         new Array(i + 1).fill(0).map((_, index) => index.toString())
  //       );
  //       setTimeout(() => {
  //         bottomSheetRefs.current.get(i.toString())?.present();
  //       }, 300);
  //     },
  //     2000 * (i + 1)
  //   );
  // }
  // }, []);

  return (
    <CoreContextProvider value={_option}>
      <GestureHandlerRootView>
        <CoreNavigationProvider bridge={coreBridge}>
          <BottomSheetModalProvider>
            {children}
            {/* {bottomSheets.map((id, index) => {
            return (
              <BottomSheetModal
                stackBehavior="push"
                key={id}
                index={1}
                snapPoints={["25%", "50%"]}
                ref={(elem) => bottomSheetRefs.current.set(id, elem)}
                backdropComponent={BottomSheetBackdrop}
                enableDynamicSizing
                maxDynamicContentSize={Dimensions.get("screen").height * 0.8}
              >
                <BottomSheetView style={{ flex: 1, backgroundColor: "white" }}>
                  <CoreWebview />
                </BottomSheetView>
              </BottomSheetModal>
            );
          })} */}
          </BottomSheetModalProvider>
        </CoreNavigationProvider>
      </GestureHandlerRootView>
    </CoreContextProvider>
  );
};
