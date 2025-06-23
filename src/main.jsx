/**
 * Entry point for the React application.
 *
 * - Imports React's StrictMode for highlighting potential problems.
 * - Uses React 18's createRoot API to render the app.
 * - Wraps the main <App /> component with MUI's ThemeProvider to apply a custom theme.
 * - The theme is imported from the local theme configuration.
 * - Renders the application into the DOM element with id "root".
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material";
import App from "./App.jsx";
import { theme } from "./lib/theme.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
