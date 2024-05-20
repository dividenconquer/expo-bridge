import {
  useCoreBridge,
  useCoreBridgeRoundTripListener,
} from "@expo-bridge/core-bridge";
import type {
  CoreStorageGetJSONParams,
  CoreStorageSetJSONParams,
} from "@expo-bridge/core-storage";
import { useCallback } from "react";
import { MMKV } from "react-native-mmkv";

export const useCoreStorageEventHandler = (storage: MMKV) => {
  const { bridge } = useCoreBridge();
  useCoreBridgeRoundTripListener(
    bridge,
    useCallback((data, event) => {
      if (data.functionName === "core-storage-set-json") {
        let params = data.functionArgs[0] as CoreStorageSetJSONParams;
        storage.set(params.key, JSON.stringify(params.value));
        bridge.respondToRoundTrip(event);
      } else if (data.functionName === "core-storage-get-json") {
        let params = data.functionArgs[0] as CoreStorageGetJSONParams;
        let value = storage.getString(params.key);
        if (value) {
          bridge.respondToRoundTrip(event, JSON.parse(value));
        } else {
          bridge.respondToRoundTrip(event, undefined);
        }
      }
    }, [])
  );
};
