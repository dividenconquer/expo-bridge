declare global {
  interface Window {
    RNScreenParams: any;
    ReactNativeWebView: {
      postMessage: (message: string) => void;
    };
  }
}

export {};
