import React, { useMemo } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { CoreContextProvider } from "./option-context";
import { CoreBridgeProvider, useCoreBridge } from "@expo-bridge/core-bridge";
import { useCoreStorageEventHandler } from "../event-handlers/storage";
import { useCoreNagivationEventHandler } from "../event-handlers/navigation";

export type CoreProviderProps = {
  option: {
    RNWebviewScreenPath: string;
    webviewBaseUrl: string;
  };
  children: React.ReactNode;
};

const Providers = ({ children, option }: CoreProviderProps) => {
  const { bridge } = useCoreBridge();
  const _option = useMemo(() => ({ ...option, bridge }), [option]);

  // useCoreBridgeListener(
  //   bridge,
  //   useCallback((data: CoreBridgeEventType) => {
  //     // 예시
  //   }, [])
  // );

  // useCoreBridgeRoundTripListener(
  //   bridge,
  //   useCallback((data, event) => {
  //     switch (data.functionName) {
  //       case "test":
  //         bridge.respondToRoundTrip(event, { args: data.functionArgs });
  //         break;

  //       case "getOS":
  //         bridge.respondToRoundTrip(event, Platform.OS);
  //         break;
  //     }
  //   }, [])
  // );

  useCoreNagivationEventHandler(option.RNWebviewScreenPath);
  useCoreStorageEventHandler();

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
        {/* <BottomSheetModalProvider> */}
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
        {/* </BottomSheetModalProvider> */}
      </GestureHandlerRootView>
    </CoreContextProvider>
  );
};

export const CoreMobileProvider = ({ children, option }: CoreProviderProps) => {
  return (
    <CoreBridgeProvider>
      <Providers option={option}>{children}</Providers>
    </CoreBridgeProvider>
  );
};
