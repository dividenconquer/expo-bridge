import React from "react";
import { CoreProviderProps } from "./core";

const CoreContext = React.createContext<
  CoreProviderProps["option"] | undefined
>(undefined);

export const CoreContextProvider = CoreContext.Provider;

export const useCoreContext = () => {
  const context = React.useContext(CoreContext);
  if (!context) {
    throw new Error("useCoreContext must be used within a CoreContextProvider");
  }
  return context;
};
