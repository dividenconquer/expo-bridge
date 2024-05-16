import {
  CoreBridge,
  useCoreBridgeRoundTripListener,
} from "@seoulcomix/core-bridge";
import {
  CoreStorageGetJSONParams,
  CoreStorageSetJSONParams,
} from "@seoulcomix/core-storage";
import { useCallback } from "react";
import { MMKV } from "react-native-mmkv";

export const useCoreStorageEventHandler = (
  coreBridge: CoreBridge,
  mmkv: MMKV
) => {
  useCoreBridgeRoundTripListener(
    coreBridge,
    useCallback((data, event) => {
      if (data.functionName === "core-storage-set-json") {
        let params = data.functionArgs[0] as CoreStorageSetJSONParams;
        mmkv.set(params.key, JSON.stringify(params.value));
        coreBridge.respondToRoundTrip(event);
      } else if (data.functionName === "core-storage-get-json") {
        let params = data.functionArgs[0] as CoreStorageGetJSONParams;
        let value = mmkv.getString(params.key);
        if (value) {
          coreBridge.respondToRoundTrip(event, JSON.parse(value));
        } else {
          coreBridge.respondToRoundTrip(event, undefined);
        }
      }
    }, [])
  );
};
