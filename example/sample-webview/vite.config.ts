import { defineConfig } from "vite";

import reactNativeWeb from "vite-plugin-react-native-web";

export default defineConfig({
  plugins: [reactNativeWeb()],
});
