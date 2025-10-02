import React, { createContext, useContext, useReducer, useEffect } from "react";

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
  const [settings, dispatch] = useReducer(settingsReducer, initialSettings, () => {
    // Load from localStorage if available
    const stored = localStorage.getItem("taskbuddy-settings");
    return stored ? { ...initialSettings, ...JSON.parse(stored) } : initialSettings;
  });

  // Persist to localStorage whenever settings change
  useEffect(() => {
    localStorage.setItem("taskbuddy-settings", JSON.stringify(settings));
    
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