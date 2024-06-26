import {
  useCoreBridge,
  useCoreBridgeRoundTripListener,
} from "@expo-bridge/core-bridge";
import type {
  CoreStorageGetJSONParams,
  CoreStorageSetJSONParams,
} from "@expo-bridge/core-storage";
import { useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useCoreStorageEventHandler = () => {
  const { bridge } = useCoreBridge();
  useCoreBridgeRoundTripListener(
    bridge,
    useCallback(async (data, event) => {
      if (data.functionName === "core-storage-set-json") {
        let params = data.functionArgs[0] as CoreStorageSetJSONParams;
        await AsyncStorage.setItem(params.key, JSON.stringify(params.value));
        bridge.respondToRoundTrip(event);
      } else if (data.functionName === "core-storage-get-json") {
        let params = data.functionArgs[0] as CoreStorageGetJSONParams;
        let value = await AsyncStorage.getItem(params.key);
        if (value) {
          bridge.respondToRoundTrip(event, JSON.parse(value));
        } else {
          bridge.respondToRoundTrip(event, undefined);
        }
      }
    }, [])
  );
};
