import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ScreenSizeProvider } from "./context/useScreenSize";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ScreenSizeProvider>
      <App />
    </ScreenSizeProvider>
  </React.StrictMode>
);
