import { createContext, useContext, useReducer, useEffect, useState } from "react";
import { auth } from "../firebase";

const TaskContext = createContext();

const initialState = {
  tasks: [],
};

function taskReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };

    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case "LOAD_TASKS":
      return { ...state, tasks: action.payload };

    default:
      return state;
  }
}

export const TaskProvider = ({ children }) => {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Listen for auth state changes and load user-specific tasks
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUserId(user.uid);
        // Load tasks for this specific user
        const userTaskKey = `taskbuddy-tasks-${user.uid}`;
        const stored = localStorage.getItem(userTaskKey);
        if (stored) {
          dispatch({ type: "LOAD_TASKS", payload: JSON.parse(stored) });
        } else {
          dispatch({ type: "LOAD_TASKS", payload: [] });
        }
      } else {
        setCurrentUserId(null);
        dispatch({ type: "LOAD_TASKS", payload: [] });
      }
    });

    return () => unsubscribe();
  }, []);

  // Persist to localStorage whenever tasks change (user-specific)
  useEffect(() => {
    if (currentUserId) {
      const userTaskKey = `taskbuddy-tasks-${currentUserId}`;
      localStorage.setItem(userTaskKey, JSON.stringify(state.tasks));
    }
  }, [state.tasks, currentUserId]);

  const addTask = (task) => dispatch({ type: "ADD_TASK", payload: task });
  const toggleTask = (id) => dispatch({ type: "TOGGLE_TASK", payload: id });
  const deleteTask = (id) => dispatch({ type: "DELETE_TASK", payload: id });

  return (
    <TaskContext.Provider
      value={{ tasks: state.tasks, addTask, toggleTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
