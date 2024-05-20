import { CoreBridge } from "@expo-bridge/core-bridge";
import { ReactNode, createContext, useContext } from "react";
import React from "react";

type CoreStorageContextType = {};

export const CoreStorageContext = createContext<
  CoreStorageContextType | undefined
>(undefined);

export const CoreStorageProvider = ({
  children,
  ...context
}: CoreStorageContextType & { children: ReactNode }) => {
  return (
    <CoreStorageContext.Provider value={context}>
      {children}
    </CoreStorageContext.Provider>
  );
};

export const useCoreStorageContext = () => {
  const context = useContext(CoreStorageContext);
  if (!context) {
    throw new Error(
      "useCoreStorageContext must be used within a CoreStorageProvider"
    );
  }
  return context;
};
