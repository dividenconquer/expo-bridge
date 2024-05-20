import { ReactNode, createContext, useContext, useMemo } from "react";
import { CoreBridge } from ".";
import React from "react";

export type CoreBridgeContextData = {
  bridge: CoreBridge;
};
export const CoreBridgeContext = createContext<CoreBridgeContextData | null>(
  null
);

export const CoreBridgeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const bridge = useMemo(() => new CoreBridge(), []);
  return (
    <CoreBridgeContext.Provider value={{ bridge: bridge }}>
      {children}
    </CoreBridgeContext.Provider>
  );
};

export const useCoreBridge = () => {
  const bridge = useContext(CoreBridgeContext);
  if (!bridge) {
    throw new Error("CoreBridgeProvider is not found");
  }
  return bridge;
};
