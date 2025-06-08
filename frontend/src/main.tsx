import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";
import CalendarDataContextProvider from "./contexts/CalendarDataContextProvider.tsx";
import { ThemeProvider } from "./contexts/theme-provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <CalendarDataContextProvider>
        <App />
      </CalendarDataContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
