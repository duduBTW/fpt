import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "sanitize.css";
import "./_variables.css";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
