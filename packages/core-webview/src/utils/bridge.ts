export const postMessageToNative = (data: unknown) => {
  window.ReactNativeWebView.postMessage(JSON.stringify(data));
};
