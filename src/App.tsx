import { FilterButtons } from "./components/FilterButtons";
import { ThemeToggleButton } from "./components/ThemeToggleButton";
import { TodoInput } from "./components/TodoInput";
import { TodoList } from "./components/TodoList";
import { useTodos } from "./contexts/TodoContext";
import { useTheme } from "./contexts/ThemeContext";

function App() {
  const { todos, clearCompleted } = useTodos();
  const { theme } = useTheme();

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter(
    (todo) => todo.completed
  ).length;

  return (
    <main
      className={
        theme === "dark"
          ? "min-h-screen bg-slate-950 text-white transition-colors duration-300"
          : "min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300"
      }
    >
      <div className="mx-auto min-h-screen max-w-2xl px-4 py-10">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1
              className={
                theme === "dark"
                  ? "text-4xl font-bold tracking-tight text-white"
                  : "text-4xl font-bold tracking-tight text-slate-900"
              }
            >
              Todo App
            </h1>

            <p
              className={
                theme === "dark"
                  ? "mt-2 text-slate-400"
                  : "mt-2 text-slate-600"
              }
            >
              Manage your tasks with React Context
            </p>
          </div>

          <ThemeToggleButton />
        </div>

        {/* Main Card */}
        <div
          className={
            theme === "dark"
              ? "rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl"
              : "rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-300/40"
          }
        >
          <div className="space-y-5">

            <TodoInput />

            <FilterButtons />

            <TodoList />

            {/* Footer */}
            <div
              className={
                theme === "dark"
                  ? "flex flex-col gap-3 border-t border-slate-800 pt-5 sm:flex-row sm:items-center sm:justify-between"
                  : "flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between"
              }
            >
              <div
                className={
                  theme === "dark"
                    ? "text-sm text-slate-400"
                    : "text-sm text-slate-500"
                }
              >
                <span
                  className={
                    theme === "dark"
                      ? "font-semibold text-slate-200"
                      : "font-semibold text-slate-700"
                  }
                >
                  {activeCount}
                </span>{" "}
                active ·{" "}
                <span
                  className={
                    theme === "dark"
                      ? "font-semibold text-slate-200"
                      : "font-semibold text-slate-700"
                  }
                >
                  {completedCount}
                </span>{" "}
                completed
              </div>

              <button
                onClick={clearCompleted}
                disabled={completedCount === 0}
                className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-red-950"
              >
                Clear Completed
              </button>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

export default App;