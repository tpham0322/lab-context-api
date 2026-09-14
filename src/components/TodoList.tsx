import { useMemo } from "react";
import { useFilter } from "../contexts/FilterContext";
import { useTodos } from "../contexts/TodoContext";
import { useTheme } from "../contexts/ThemeContext";
import { TodoItem } from "./TodoItem";

export function TodoList() {
  const { todos } = useTodos();
  const { filter } = useFilter();
  const { theme } = useTheme();

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);

      case "completed":
        return todos.filter((todo) => todo.completed);

      case "all":
      default:
        return todos;
    }
  }, [todos, filter]);

  if (filteredTodos.length === 0) {
    return (
      <div
        className={
          theme === "dark"
            ? "rounded-xl border border-dashed border-slate-700 bg-slate-950 p-10 text-center"
            : "rounded-xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center"
        }
      >
        <p
          className={
            theme === "dark"
              ? "text-slate-400"
              : "text-slate-600"
          }
        >
          {filter === "all"
            ? "No todos yet."
            : `No ${filter} todos.`}
        </p>

        {filter === "all" && (
          <p
            className={
              theme === "dark"
                ? "mt-1 text-sm text-slate-500"
                : "mt-1 text-sm text-slate-400"
            }
          >
            Add a task above to get started.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}