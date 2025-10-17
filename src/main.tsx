import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./lib/ThemeProvider";
import { ToolsProvider } from "./context/ToolsContext";
import { FavoritesProvider } from "./context/FavoritesContext";

// Ensure the root element exists
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

createRoot(rootElement).render(
  <ThemeProvider>
    <ToolsProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </ToolsProvider>
  </ThemeProvider>
);

// Service Worker disabled due to caching issues
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker
//       .register('/service-worker.js')
//       .then(() => console.log('✅ Service Worker registered successfully'))
//       .catch(err => console.log('❌ Service Worker registration failed:', err));
//   });
// }
