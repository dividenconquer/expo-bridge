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
    setJSON: async <T>(key: string, value: T) => {
      await bridge.runOnNative("core-storage-set-json", {
        key,
        value,
      });
    },
    getJSON: async <T>(key: string): Promise<T> => {
      return await bridge.runOnNative("core-storage-get-json", {
        key,
      });
    },
  };
};
