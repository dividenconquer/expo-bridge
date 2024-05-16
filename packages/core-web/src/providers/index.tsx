import React, { useCallback, useEffect, useMemo } from "react";
import { CoreBridge, useCoreBridgeListener } from "@repo/core-bridge";
import { postMessageToNative } from "../utils/bridge";
import { CoreNavigationProvider } from "@repo/core-navigation";

type CoreWebviewContextType = {};

const CoreWebviewContext = React.createContext<
  | (CoreWebviewContextType & {
      event: InstanceType<typeof CoreBridge>;
    })
  | undefined
>(undefined);

type CoreWebviewProviderProps = {
  option: CoreWebviewContextType;
  children: React.ReactNode;
};

export const CoreWebviewProvider: React.FC<CoreWebviewProviderProps> = ({
  children,
  option,
}) => {
  const coreBridge = useMemo(() => new CoreBridge(), []);
  const _option = useMemo(() => ({ ...option, event: coreBridge }), [option]);

  useEffect(() => {
    window.handleCoreBridgeFromNative = (data: any) => {
      const message = JSON.parse(data);
      coreBridge.propagate(message);
    };
  }, [coreBridge]);

  // pass event from webview to RN
  // or deal with event from RN => webview window handleCoreBridgeFromNative propagation
  useCoreBridgeListener(
    coreBridge,
    useCallback((data: any) => {
      // 본 웹뷰에서 시작된 것만 native 로 다시 쏴준다.
      if (data._from.at(0)?.uuid === coreBridge._uuid) {
        postMessageToNative(data);
      }
    }, [])
  );

  return (
    <CoreWebviewContext.Provider value={_option}>
      <CoreNavigationProvider bridge={coreBridge}>
        {children}
      </CoreNavigationProvider>
    </CoreWebviewContext.Provider>
  );
};

export const useCoreWebviewContext = () => {
  const context = React.useContext(CoreWebviewContext);
  if (!context) {
    throw new Error(
      "useCoreWebviewContext must be used within a CoreWebviewContextProvider"
    );
  }
  return context;
};
