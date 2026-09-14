import { useFilter } from "../contexts/FilterContext";
import { useTheme } from "../contexts/ThemeContext";
import type { Filter } from "../types";

const filters: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
];

export function FilterButtons() {
  const { filter, setFilter } = useFilter();
  const { theme } = useTheme();

  return (
    <div
      className={
        theme === "dark"
          ? "flex rounded-xl bg-slate-800 p-1.5"
          : "flex rounded-xl bg-slate-100 p-1.5"
      }
    >
      {filters.map((item) => {
        const active = filter === item.value;

        return (
          <button
            key={item.value}
            onClick={() => setFilter(item.value)}
            className={
              active
                ? theme === "dark"
                  ? "flex-1 rounded-lg bg-slate-700 px-4 py-2.5 text-sm font-semibold text-indigo-400 shadow-sm transition"
                  : "flex-1 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm transition"
                : theme === "dark"
                  ? "flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-400 transition hover:text-slate-200"
                  : "flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
            }
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}