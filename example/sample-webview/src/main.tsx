import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { CoreWebviewProvider } from "../../../packages/core-webview/dist";
import { CoreNavigationProvider } from "@expo-bridge/core-navigation";
import { CoreStorageProvider } from "@expo-bridge/core-storage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CoreWebviewProvider
      providers={[[CoreNavigationProvider, CoreStorageProvider]]}
    >
      <App />
    </CoreWebviewProvider>
  </React.StrictMode>
);
