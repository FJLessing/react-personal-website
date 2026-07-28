import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import App from "./app/App.tsx";
import "./styles/index.css";

hydrateRoot(
  document.getElementById("root")!,
  <BrowserRouter>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </BrowserRouter>,
);
