import React from "react";
import { motion } from "framer-motion";
import { Bell, Moon, Sun, Zap } from "lucide-react";
import SidebarMenu from "../components/SidebarMenu";
import { useSettings } from "../context/SettingsContext";
import { useSidebar } from "../context/SidebarContext";

const SettingsPage = () => {
  const { settings, dispatch } = useSettings();
  const { getContentMargin } = useSidebar();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const handleThemeChange = (theme) => {
    dispatch({ type: "SET_THEME", payload: theme });
  };

  const handleNotificationToggle = (setting) => {
    dispatch({ type: "TOGGLE_NOTIFICATION", payload: setting });
  };

  const ToggleSwitch = ({ enabled, onChange, disabled = false }) => (
    <motion.button
      onClick={disabled ? undefined : onChange}
      className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
        disabled 
          ? "bg-gray-500 cursor-not-allowed opacity-50"
          : enabled 
          ? "bg-gradient-to-r from-purple-500 to-pink-500" 
          : "bg-gray-600 hover:bg-gray-500"
      }`}
      whileTap={disabled ? {} : { scale: 0.95 }}
      disabled={disabled}
    >
      <motion.div
        className="w-5 h-5 bg-white rounded-full shadow-md absolute top-0.5"
        animate={{ x: enabled ? 24 : 2 }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  );

  const SettingCard = ({ title, description, children, icon: Icon }) => (
    <motion.div
      variants={itemVariants}
      className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 group"
      whileHover={{ y: -2 }}
    >
      <div className="flex items-start gap-4">
        {Icon && (
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Icon size={20} className="text-purple-400" />
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          <p className="text-gray-400 text-sm mb-4">{description}</p>
          {children}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <SidebarMenu />

      {/* Background Elements */}
      <div className="absolute -z-10 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Main Content with left margin for fixed sidebar */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`${getContentMargin()} p-4 md:p-8 relative z-10 transition-all duration-300`}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-4xl h-12 font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Settings
          </h1>
          <p className="text-gray-400 my-3">Customize your TaskBuddy experience</p>
        </motion.div>

        <div className="space-y-8 max-w-4xl">
          {/* Theme Settings */}
          <SettingCard
            title="Appearance"
            description="Switch between light and dark themes"
            icon={settings.theme === "light" ? Sun : Moon}
          >
            <div className="flex items-center justify-between">
              <span className="text-white">Theme</span>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleThemeChange("light")}
                  className={`p-3 rounded-xl border transition-all duration-300 flex items-center gap-2 ${
                    settings.theme === "light"
                      ? "bg-yellow-500/20 border-yellow-500/50 text-yellow-400"
                      : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  <Sun size={18} />
                  <span className="text-sm font-medium">Light</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleThemeChange("dark")}
                  className={`p-3 rounded-xl border transition-all duration-300 flex items-center gap-2 ${
                    settings.theme === "dark"
                      ? "bg-purple-500/20 border-purple-500/50 text-purple-400"
                      : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  <Moon size={18} />
                  <span className="text-sm font-medium">Dark</span>
                </motion.button>
              </div>
            </div>
          </SettingCard>

          {/* Notifications */}
          <SettingCard
            title="Notifications"
            description="Manage your notification preferences"
            icon={Bell}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-white font-medium">Task Reminders</span>
                  <p className="text-gray-400 text-sm">Get notified when tasks are due</p>
                </div>
                <ToggleSwitch
                  enabled={settings.notifications.taskReminders}
                  onChange={() => handleNotificationToggle("taskReminders")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-white font-medium">Goal Deadlines</span>
                  <p className="text-gray-400 text-sm">Receive alerts for goal deadlines</p>
                </div>
                <ToggleSwitch
                  enabled={settings.notifications.goalDeadlines}
                  onChange={() => handleNotificationToggle("goalDeadlines")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-white font-medium">Weekly Reports</span>
                  <p className="text-gray-400 text-sm">Get weekly productivity summaries</p>
                </div>
                <ToggleSwitch
                  enabled={settings.notifications.weeklyReports}
                  onChange={() => handleNotificationToggle("weeklyReports")}
                />
              </div>
            </div>
          </SettingCard>

          {/* App Information */}
          <SettingCard
            title="About TaskBuddy"
            description="Application information and details"
            icon={Zap}
          >
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Version</span>
                <span className="text-white font-medium">1.0.0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Last Updated</span>
                <span className="text-white font-medium">October 2025</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Developer</span>
                <span className="text-white font-medium">TaskBuddy Team</span>
              </div>
            </div>
          </SettingCard>
        </div>

        {/* Settings Status */}
        <motion.div
          variants={itemVariants}
          className="mt-8 p-4 bg-green-500/10 border border-green-500/20 rounded-xl"
        >
          <p className="text-green-400 text-sm text-center">
            ✓ All settings are automatically saved
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SettingsPage;