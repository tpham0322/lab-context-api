import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { FilterProvider } from "./contexts/FilterContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { TodoProvider } from "./contexts/TodoContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <TodoProvider>
        <FilterProvider>
          <App />
        </FilterProvider>
      </TodoProvider>
    </ThemeProvider>
  </StrictMode>
);