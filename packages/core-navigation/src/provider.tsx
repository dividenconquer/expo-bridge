import { CoreBridge } from "@repo/core-bridge";
import { ReactNode, createContext, useContext } from "react";
import React from "react";

type CoreNavigationContextType = {
  bridge: CoreBridge;
};

export const CoreNavigationContext = createContext<
  CoreNavigationContextType | undefined
>(undefined);

export const CoreNavigationProvider = ({
  children,
  ...context
}: CoreNavigationContextType & { children: ReactNode }) => {
  return (
    <CoreNavigationContext.Provider value={context}>
      {children}
    </CoreNavigationContext.Provider>
  );
};
export const useCoreNavigationContext = () => {
  const context = useContext(CoreNavigationContext);
  if (!context) {
    throw new Error(
      "useCoreNavigationContext must be used within a CoreNavigationProvider"
    );
  }
  return context;
};
