export const getExecutionContext = (): "webview" | "web" | "rn" => {
  if (typeof window === "undefined") {
    return "rn";
  } else if (window.ReactNativeWebView) {
    return "webview";
  } else {
    return "web";
  }
};
