import React, { createContext, useContext, useReducer, useEffect, useState } from "react";
import { auth } from "../firebase";

// 1️⃣ Create context
const GoalContext = createContext();

// 2️⃣ Reducer function
function goalReducer(state, action) {
  switch (action.type) {
    case "ADD_GOAL":
      return [...state, action.payload];

    case "DELETE_GOAL":
      return state.filter((goal) => goal.id !== action.payload);

    case "ADD_SUBTASK":
      return state.map((goal) =>
        goal.id === action.payload.goalId
          ? { ...goal, subtasks: [...goal.subtasks, action.payload.subtask] }
          : goal
      );

    case "TOGGLE_SUBTASK":
      return state.map((goal) =>
        goal.id === action.payload.goalId
          ? {
              ...goal,
              subtasks: goal.subtasks.map((st) =>
                st.id === action.payload.subtaskId
                  ? { ...st, completed: !st.completed }
                  : st
              ),
            }
          : goal
      );

    case "DELETE_SUBTASK":
      return state.map((goal) =>
        goal.id === action.payload.goalId
          ? {
              ...goal,
              subtasks: goal.subtasks.filter(
                (st) => st.id !== action.payload.subtaskId
              ),
            }
          : goal
      );

    case "LOAD_GOALS":
      return action.payload;

    default:
      return state;
  }
}

// 3️⃣ Provider component
export function GoalProvider({ children }) {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [goals, dispatch] = useReducer(goalReducer, []);

  // Listen for auth state changes and load user-specific goals
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUserId(user.uid);
        // Load goals for this specific user
        const userGoalKey = `taskbuddy-goals-${user.uid}`;
        const stored = localStorage.getItem(userGoalKey);
        if (stored) {
          dispatch({ type: "LOAD_GOALS", payload: JSON.parse(stored) });
        } else {
          dispatch({ type: "LOAD_GOALS", payload: [] });
        }
      } else {
        setCurrentUserId(null);
        dispatch({ type: "LOAD_GOALS", payload: [] });
      }
    });

    return () => unsubscribe();
  }, []);

  // persist to localStorage (user-specific)
  useEffect(() => {
    if (currentUserId) {
      const userGoalKey = `taskbuddy-goals-${currentUserId}`;
      localStorage.setItem(userGoalKey, JSON.stringify(goals));
    }
  }, [goals, currentUserId]);

  return (
    <GoalContext.Provider value={{ goals, dispatch }}>
      {children}
    </GoalContext.Provider>
  );
}

// 4️⃣ Custom hook
export function useGoals() {
  return useContext(GoalContext);
}
