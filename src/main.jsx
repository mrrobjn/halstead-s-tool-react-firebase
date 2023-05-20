import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { FileProvider } from "./context/FileContext.jsx";
import { TabBarProvider } from "./context/TabBarContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <TabBarProvider>
    <FileProvider>
      <App />
    </FileProvider>
  </TabBarProvider>
  // </React.StrictMode>,
);
