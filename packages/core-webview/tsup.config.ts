import { defineConfig, Options } from "tsup";

export default defineConfig((options: Options) => ({
  entry: {
    index: "src/index.tsx",
  },
  clean: true,
  format: ["cjs", "esm"],
  external: ["react"],
  dts: true,
  minify: false,
  ...options,
}));
