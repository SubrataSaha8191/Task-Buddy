import React, { createContext, useContext, useReducer, useEffect } from "react";

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

    default:
      return state;
  }
}

// 3️⃣ Provider component
export function GoalProvider({ children }) {
  const [goals, dispatch] = useReducer(goalReducer, [], () => {
    // load from localStorage if available
    const stored = localStorage.getItem("goals");
    return stored ? JSON.parse(stored) : [];
  });

  // persist to localStorage
  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

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
