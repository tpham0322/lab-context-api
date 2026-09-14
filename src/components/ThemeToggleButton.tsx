import { useTheme } from "../contexts/ThemeContext";

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
        rounded-xl
        border border-slate-300
        bg-white
        px-4 py-2.5
        text-sm
        font-semibold
        text-slate-700
        shadow-sm
        transition
        hover:bg-slate-50
        hover:shadow

        dark:border-slate-700
        dark:bg-slate-800
        dark:text-slate-200
        dark:hover:bg-slate-700
      "
    >
      {theme === "light"
        ? "🌙 Dark Mode"
        : "☀️ Light Mode"}
    </button>
  );
}