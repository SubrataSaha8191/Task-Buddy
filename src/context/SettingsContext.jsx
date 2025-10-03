import React, { createContext, useContext, useReducer, useEffect, useState } from "react";
import { auth } from "../firebase";

// Create context
const SettingsContext = createContext();

// Initial settings state
const initialSettings = {
  theme: "dark",
  notifications: {
    taskReminders: true,
    goalDeadlines: true,
    weeklyReports: false
  },
  general: {
    soundEnabled: true,
    animations: true
  }
};

// Settings reducer
function settingsReducer(state, action) {
  switch (action.type) {
    case "SET_THEME":
      return { ...state, theme: action.payload };
    
    case "TOGGLE_NOTIFICATION":
      return {
        ...state,
        notifications: {
          ...state.notifications,
          [action.payload]: !state.notifications[action.payload]
        }
      };
    
    case "TOGGLE_GENERAL_SETTING":
      return {
        ...state,
        general: {
          ...state.general,
          [action.payload]: !state.general[action.payload]
        }
      };
    
    case "LOAD_SETTINGS":
      return { ...state, ...action.payload };
    
    default:
      return state;
  }
}

// Provider component
export function SettingsProvider({ children }) {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [settings, dispatch] = useReducer(settingsReducer, initialSettings);

  // Listen for auth state changes and load user-specific settings
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUserId(user.uid);
        // Load settings for this specific user
        const userSettingsKey = `taskbuddy-settings-${user.uid}`;
        const stored = localStorage.getItem(userSettingsKey);
        if (stored) {
          dispatch({ type: "LOAD_SETTINGS", payload: JSON.parse(stored) });
        } else {
          dispatch({ type: "LOAD_SETTINGS", payload: initialSettings });
        }
      } else {
        setCurrentUserId(null);
        dispatch({ type: "LOAD_SETTINGS", payload: initialSettings });
      }
    });

    return () => unsubscribe();
  }, []);

  // Persist to localStorage whenever settings change (user-specific)
  useEffect(() => {
    if (currentUserId) {
      const userSettingsKey = `taskbuddy-settings-${currentUserId}`;
      localStorage.setItem(userSettingsKey, JSON.stringify(settings));
    }
    
    // Apply theme to document
    document.documentElement.setAttribute("data-theme", settings.theme);
    
    // Apply theme class to document element for better CSS targeting
    if (settings.theme === "light") {
      document.documentElement.classList.add("light-theme");
      document.documentElement.classList.remove("dark-theme");
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    } else {
      document.documentElement.classList.add("dark-theme");
      document.documentElement.classList.remove("light-theme");
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    }
  }, [settings]);

  // Initialize theme on mount
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", settings.theme);
    
    if (settings.theme === "light") {
      document.documentElement.classList.add("light-theme");
      document.body.classList.add("light-theme");
    } else {
      document.documentElement.classList.add("dark-theme");
      document.body.classList.add("dark-theme");
    }
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, dispatch }}>
      {children}
    </SettingsContext.Provider>
  );
}

// Custom hook
export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}