import React from "react";
import { CoreProviderProps } from "./core";
import { CoreBridge } from "@repo/core-bridge";

const CoreContext = React.createContext<
  | (CoreProviderProps["option"] & {
      coreBridge: InstanceType<typeof CoreBridge>;
    })
  | undefined
>(undefined);

export const CoreContextProvider = CoreContext.Provider;
export const CoreContextConsumer = CoreContext.Consumer;
export const useCoreContext = () => {
  const context = React.useContext(CoreContext);
  if (!context) {
    throw new Error("useCoreContext must be used within a CoreContextProvider");
  }
  return context;
};
