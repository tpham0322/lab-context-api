import { useState } from "react";
import { useTodos } from "../contexts/TodoContext";
import type { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const {
    toggleTodo,
    deleteTodo,
    editTodo,
  } = useTodos();

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (!editText.trim()) return;

    editTodo(todo.id, editText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <div
      className="
        flex
        items-center
        gap-3
        rounded-xl
        border border-slate-200
        bg-white
        p-4
        shadow-sm
        transition
        hover:shadow-md

        dark:border-slate-700
        dark:bg-slate-800
        dark:hover:border-slate-600
      "
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className="
          h-5
          w-5
          shrink-0
          cursor-pointer
          accent-indigo-600
        "
      />

      {/* Todo Text */}
      {isEditing ? (
        <input
          autoFocus
          value={editText}
          onChange={(event) => setEditText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSave();
            }

            if (event.key === "Escape") {
              handleCancel();
            }
          }}
          className="
            min-w-0
            flex-1
            rounded-lg
            border border-indigo-400
            bg-white
            px-3 py-2
            text-slate-900
            outline-none
            focus:ring-2
            focus:ring-indigo-100

            dark:bg-slate-700
            dark:text-white
            dark:focus:ring-indigo-900
          "
        />
      ) : (
        <span
          className={`
            min-w-0
            flex-1
            break-words
            ${
              todo.completed
                ? "text-slate-400 line-through"
                : "text-slate-800 dark:text-slate-100"
            }
          `}
        >
          {todo.text}
        </span>
      )}

      {/* Buttons */}
      <div className="flex shrink-0 gap-1">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="
                rounded-lg
                px-3 py-2
                text-sm
                font-medium
                text-green-600
                transition
                hover:bg-green-50
                dark:hover:bg-green-950
              "
            >
              Save
            </button>

            <button
              onClick={handleCancel}
              className="
                rounded-lg
                px-3 py-2
                text-sm
                font-medium
                text-slate-500
                transition
                hover:bg-slate-100
                dark:hover:bg-slate-700
              "
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="
              rounded-lg
              px-3 py-2
              text-sm
              font-medium
              text-indigo-600
              transition
              hover:bg-indigo-50
              dark:text-indigo-400
              dark:hover:bg-indigo-950
            "
          >
            Edit
          </button>
        )}

        <button
          onClick={() => deleteTodo(todo.id)}
          className="
            rounded-lg
            px-3 py-2
            text-sm
            font-medium
            text-red-600
            transition
            hover:bg-red-50
            dark:hover:bg-red-950
          "
        >
          Delete
        </button>
      </div>
    </div>
  );
}