declare global {
  interface Window {
    RNScreenParams: any;
    ReactNativeWebView: {
      postMessage: (message: string) => void;
    };
    handleCoreBridgeFromNative: (data: any) => void;
  }
}

export {};
