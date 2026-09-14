import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { Todo } from "../types";

type TodoAction =
  | { type: "ADD_TODO"; payload: string }
  | { type: "TOGGLE_TODO"; payload: string }
  | { type: "DELETE_TODO"; payload: string }
  | { type: "EDIT_TODO"; payload: { id: string; text: string } }
  | { type: "CLEAR_COMPLETED" };

interface TodoContextType {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, newText: string) => void;
  clearCompleted: () => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const todoReducer = (state: Todo[], action: TodoAction): Todo[] => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: crypto.randomUUID(),
          text: action.payload,
          completed: false,
        },
      ];

    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);

    case "EDIT_TODO":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo
      );

    case "CLEAR_COMPLETED":
      return state.filter((todo) => !todo.completed);

    default:
      return state;
  }
};

const getInitialTodos = (): Todo[] => {
  try {
    const savedTodos = localStorage.getItem("todos");

    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
  } catch (error) {
    console.error("Failed to load todos:", error);
  }

  return [];
};

interface TodoProviderProps {
  children: ReactNode;
}

export function TodoProvider({ children }: TodoProviderProps) {
  const [todos, dispatch] = useReducer(todoReducer, [], getInitialTodos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((text: string) => {
    const trimmedText = text.trim();

    if (!trimmedText) return;

    dispatch({
      type: "ADD_TODO",
      payload: trimmedText,
    });
  }, []);

  const toggleTodo = useCallback((id: string) => {
    dispatch({
      type: "TOGGLE_TODO",
      payload: id,
    });
  }, []);

  const deleteTodo = useCallback((id: string) => {
    dispatch({
      type: "DELETE_TODO",
      payload: id,
    });
  }, []);

  const editTodo = useCallback((id: string, newText: string) => {
    const trimmedText = newText.trim();

    if (!trimmedText) return;

    dispatch({
      type: "EDIT_TODO",
      payload: {
        id,
        text: trimmedText,
      },
    });
  }, []);

  const clearCompleted = useCallback(() => {
    dispatch({
      type: "CLEAR_COMPLETED",
    });
  }, []);

  const value = useMemo(
    () => ({
      todos,
      addTodo,
      toggleTodo,
      deleteTodo,
      editTodo,
      clearCompleted,
    }),
    [
      todos,
      addTodo,
      toggleTodo,
      deleteTodo,
      editTodo,
      clearCompleted,
    ]
  );

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("useTodos must be used inside TodoProvider");
  }

  return context;
}