import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./components/LandingPage";
import AuthPage from "./pages/AuthPage";
import Dashboard from './pages/Dashboard';
import DailyTasks from './pages/DailyTasks';
import WeeklyTasks from './pages/WeeklyTasks';
import Goals from './pages/Goals';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import { AnimatePresence, motion } from "framer-motion";
import { TaskProvider } from './context/TaskContext';
import LearnMore from "./pages/LearnMore";

const App = () => {

  return (
      <TaskProvider>
        <Router>
          <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
            {/* Sidebar */}

            {/* Main Content */}
            <main className="flex-1 ">
              
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<LandingPage/>} />

                <Route path="/auth" element={<motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                >
                  <AuthPage />
                </motion.div>} />

                <Route path="/Dashboard" element={<motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                >
                  <Dashboard />
                </motion.div>} />

                <Route path="/daily" element={<motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                >
                  <DailyTasks />
                </motion.div>} />

                <Route path="/weekly" element={<motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                >
                  <WeeklyTasks />
                </motion.div>} />

                <Route path="/goals" element={<motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                >
                  <Goals />
                </motion.div>} />

                <Route path="/learn-more" element={<motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                >
                  <LearnMore />
                </motion.div>} />

                <Route path="/profile" element={<motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                >
                  <Profile />
                </motion.div>} />

                <Route path="/settings" element={<motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                >
                  <Settings />
                </motion.div>} />
                
              </Routes>
            </AnimatePresence>
            </main>
          </div>
        </Router>
      </TaskProvider>
  );
};

export default App;
