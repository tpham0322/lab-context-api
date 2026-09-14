# Todo App – React Context API

A functional Todo application built with React, TypeScript, and Tailwind CSS. This project demonstrates how to use the React Context API to manage global application state without prop drilling.

## Features

- Add new todos
- Mark todos as completed
- Edit existing todos
- Delete todos
- Clear all completed todos
- Filter todos by:
  - All
  - Active
  - Completed
- Toggle between light and dark mode
- Persist todos using localStorage
- Persist the selected theme using localStorage
- Automatically restore saved todos and theme when the application loads
- Uses useReducer for Todo state management
- Uses useMemo and useCallback for Context optimization
- Fully written in TypeScript
- Styled with Tailwind CSS

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Vite
- React Context API
- React Hooks
- Browser localStorage

## Project Structure

```text
src/
├── components/
│   ├── FilterButtons.tsx
│   ├── ThemeToggleButton.tsx
│   ├── TodoInput.tsx
│   ├── TodoItem.tsx
│   └── TodoList.tsx
│
├── contexts/
│   ├── FilterContext.tsx
│   ├── ThemeContext.tsx
│   └── TodoContext.tsx
│
├── types/
│   └── index.ts
│
├── App.tsx
├── index.css
└── main.tsx
```

## Contexts

### TodoContext

TodoContext manages the application's todo state.

It provides the following actions:

- `addTodo()`
- `toggleTodo()`
- `deleteTodo()`
- `editTodo()`
- `clearCompleted()`

Todo state is managed with `useReducer` to keep state transitions organized and immutable.

### FilterContext

FilterContext manages the current todo visibility filter.

Available filters:

- `all`
- `active`
- `completed`

The TodoList uses the selected filter to determine which todos are displayed.

### ThemeContext

ThemeContext manages the application's theme.

Available themes:

- `light`
- `dark`

The ThemeToggleButton switches between the two themes.

## Local Storage

The application uses browser `localStorage` to persist:

- `todos`
- `theme`

When the application starts, previously saved todos and the selected theme are restored.

Changes to todos and theme are automatically saved to localStorage.

## Installation

Clone the repository:

```bash
git clone <your-github-repository-url>
```

Navigate into the project:

```bash
cd <project-folder>
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local development URL provided by Vite in your browser.

## Build

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## How to Use

### Add a Todo

Enter a task in the input field and click **Add**.

### Complete a Todo

Click the checkbox next to a todo to mark it as completed.

### Edit a Todo

Click **Edit**, modify the text, then select **Save**.

You can also press:

- `Enter` to save
- `Escape` to cancel

### Delete a Todo

Click **Delete** next to the todo you want to remove.

### Filter Todos

Use the filter buttons to display:

- **All** – displays every todo
- **Active** – displays unfinished todos
- **Completed** – displays completed todos

### Clear Completed

Click **Clear Completed** to remove all completed todos.

### Change Theme

Click the theme button in the upper-right corner to switch between light and dark mode.

## React Context API

This project uses separate contexts for independent pieces of global state.

```text
App
│
├── ThemeProvider
│   │
│   └── TodoProvider
│       │
│       └── FilterProvider
│           │
│           └── Todo App
```

This allows components to access the state they need without passing props through multiple levels of the component tree.

## State Management

Todo state is managed using `useReducer` because the TodoContext contains multiple state transitions.

The reducer handles:

- Adding todos
- Toggling todos
- Deleting todos
- Editing todos
- Clearing completed todos

Filter and theme state use `useState` because they have simpler state requirements.

## Optimization

The Context providers use:

- `useCallback` to stabilize action functions
- `useMemo` to stabilize Context values
- `useMemo` in TodoList to avoid unnecessary filtering calculations

These techniques help reduce unnecessary re-renders and calculations when using the Context API.

## Learning Objectives

This project demonstrates:

- Designing multiple independent React contexts
- Creating Context Providers
- Consuming Context with `useContext`
- Managing complex state with `useReducer`
- Managing simpler state with `useState`
- Sharing state between contexts
- Persisting application state with `localStorage`
- Using memoization to improve performance

## Author

**Truong Pham**