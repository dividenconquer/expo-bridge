import React, { ReactNode, useCallback, useEffect, useMemo } from "react";
import {
  CoreBridge,
  CoreBridgeProvider,
  useCoreBridge,
  useCoreBridgeListener,
} from "@expo-bridge/core-bridge";
import { postMessageToNative } from "../utils/bridge";

type CoreWebviewContextType = {};

const CoreWebviewContext = React.createContext<
  CoreWebviewContextType | undefined
>(undefined);

const Providers: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { bridge } = useCoreBridge();

  useEffect(() => {
    window.handleCoreBridgeFromNative = (data: any) => {
      const message = JSON.parse(data);
      bridge.propagate(message);
    };
  }, [bridge]);

  // pass event from webview to RN
  // or deal with event from RN => webview window handleCoreBridgeFromNative propagation
  useCoreBridgeListener(
    bridge,
    useCallback((data: any) => {
      // 본 웹뷰에서 시작된 것만 native 로 다시 쏴준다.
      if (data._from.at(0)?.uuid === bridge._uuid) {
        postMessageToNative(data);
      }
    }, [])
  );

  return (
    <CoreWebviewContext.Provider value={{}}>
      {children}
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

type CoreWebviewProviderProps = {
  children: React.ReactNode;
  providers: any[][];
};

export const CoreWebviewProvider = ({
  children,
  providers,
  ...props
}: CoreWebviewProviderProps) => {
  let content = children;

  [...providers, [Providers, props]].forEach(([Provider, props]) => {
    content = <Provider {...(props ?? {})}>{content}</Provider>;
  });

  return <CoreBridgeProvider>{content}</CoreBridgeProvider>;
};
