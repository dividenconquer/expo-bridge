import { useCoreBridge } from "@expo-bridge/core-bridge";

export type CoreNavigationPushParams = {
  path: string;
  options?: { params?: any; isNative?: boolean };
};

export type CoreNavigationPopParams = {};

export const useCoreNavigation = () => {
  const { bridge } = useCoreBridge();
  return {
    push: (path: string, options?: CoreNavigationPushParams["options"]) => {
      bridge.runOnNative("core-navigation-push", {
        path,
        options,
      });
    },
    pop: (_?: CoreNavigationPopParams) => {
      bridge.runOnNative("core-navigation-pop");
    },
  };
};
