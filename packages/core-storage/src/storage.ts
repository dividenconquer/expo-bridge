import { useCoreStorageContext } from "./provider";

export type CoreStorageSetJSONParams = {
  key: string;
  value: any;
};

export type CoreStorageGetJSONParams = {
  key: string;
};

export const useCoreStorage = () => {
  const { bridge } = useCoreStorageContext();
  return {
    setJSON: (key: string, value: any) => {
      bridge.runOnNative("core-storage-set-json", {
        key,
        value,
      });
    },
    getJSON: (key: string) => {
      bridge.runOnNative("core-storage-get-json", {
        key,
      });
    },
  };
};
