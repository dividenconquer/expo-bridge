import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { CoreWebviewProvider } from "@repo/core-web";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CoreWebviewProvider option={{}}>
      <App />
    </CoreWebviewProvider>
  </React.StrictMode>
);
