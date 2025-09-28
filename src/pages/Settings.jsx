import React, { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Bell, Moon, Sun, Globe, Shield, Palette, Zap, Volume2 } from "lucide-react";
import SidebarMenu from "../components/SidebarMenu";

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      taskReminders: true,
      goalDeadlines: true,
      weeklyReports: false
    },
    appearance: {
      theme: "dark",
      accentColor: "purple",
      fontSize: "medium",
      animation: true
    },
    privacy: {
      analytics: false,
      crashReports: true,
      dataSync: true
    },
    general: {
      language: "english",
      timezone: "auto",
      soundEnabled: true
    }
  });

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

  const handleToggle = (category, setting) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting]
      }
    }));
  };

  const handleSelect = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const ToggleSwitch = ({ enabled, onChange }) => (
    <motion.button
      onClick={onChange}
      className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
        enabled ? "bg-purple-500" : "bg-gray-600"
      }`}
      whileTap={{ scale: 0.95 }}
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
        className="ml-80 p-8 relative z-10 transition-all duration-300"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Settings
          </h1>
          <p className="text-gray-400">Customize your TaskBuddy experience</p>
        </motion.div>

        <div className="space-y-8 max-w-4xl">
          {/* Notifications */}
          <SettingCard
            title="Notifications"
            description="Control how and when you receive notifications"
            icon={Bell}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white">Email Notifications</span>
                <ToggleSwitch
                  enabled={settings.notifications.email}
                  onChange={() => handleToggle("notifications", "email")}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">Push Notifications</span>
                <ToggleSwitch
                  enabled={settings.notifications.push}
                  onChange={() => handleToggle("notifications", "push")}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">Task Reminders</span>
                <ToggleSwitch
                  enabled={settings.notifications.taskReminders}
                  onChange={() => handleToggle("notifications", "taskReminders")}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">Goal Deadlines</span>
                <ToggleSwitch
                  enabled={settings.notifications.goalDeadlines}
                  onChange={() => handleToggle("notifications", "goalDeadlines")}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">Weekly Reports</span>
                <ToggleSwitch
                  enabled={settings.notifications.weeklyReports}
                  onChange={() => handleToggle("notifications", "weeklyReports")}
                />
              </div>
            </div>
          </SettingCard>

          {/* Appearance */}
          <SettingCard
            title="Appearance"
            description="Customize the look and feel of the application"
            icon={Palette}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white">Theme</span>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelect("appearance", "theme", "light")}
                    className={`p-2 rounded-lg border transition-all duration-300 ${
                      settings.appearance.theme === "light"
                        ? "bg-yellow-500/20 border-yellow-500/50 text-yellow-400"
                        : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    <Sun size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelect("appearance", "theme", "dark")}
                    className={`p-2 rounded-lg border transition-all duration-300 ${
                      settings.appearance.theme === "dark"
                        ? "bg-purple-500/20 border-purple-500/50 text-purple-400"
                        : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    <Moon size={16} />
                  </motion.button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">Accent Color</span>
                <div className="flex gap-2">
                  {["purple", "blue", "green", "pink"].map((color) => (
                    <motion.button
                      key={color}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleSelect("appearance", "accentColor", color)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        settings.appearance.accentColor === color
                          ? "border-white/50 scale-110"
                          : "border-white/20"
                      }`}
                      style={{ backgroundColor: `var(--${color}-500)` }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">Animations</span>
                <ToggleSwitch
                  enabled={settings.appearance.animation}
                  onChange={() => handleToggle("appearance", "animation")}
                />
              </div>
            </div>
          </SettingCard>

          {/* Privacy & Security */}
          <SettingCard
            title="Privacy & Security"
            description="Manage your data and privacy settings"
            icon={Shield}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white">Usage Analytics</span>
                <ToggleSwitch
                  enabled={settings.privacy.analytics}
                  onChange={() => handleToggle("privacy", "analytics")}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">Crash Reports</span>
                <ToggleSwitch
                  enabled={settings.privacy.crashReports}
                  onChange={() => handleToggle("privacy", "crashReports")}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">Data Sync</span>
                <ToggleSwitch
                  enabled={settings.privacy.dataSync}
                  onChange={() => handleToggle("privacy", "dataSync")}
                />
              </div>
            </div>
          </SettingCard>

          {/* General */}
          <SettingCard
            title="General"
            description="General application preferences"
            icon={Settings}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white">Language</span>
                <select
                  value={settings.general.language}
                  onChange={(e) => handleSelect("general", "language", e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white focus:outline-none focus:border-purple-500/50"
                >
                  <option value="english">English</option>
                  <option value="spanish">Español</option>
                  <option value="french">Français</option>
                  <option value="german">Deutsch</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">Sound Effects</span>
                <ToggleSwitch
                  enabled={settings.general.soundEnabled}
                  onChange={() => handleToggle("general", "soundEnabled")}
                />
              </div>
            </div>
          </SettingCard>

          {/* Performance */}
          <SettingCard
            title="Performance"
            description="Optimize app performance and resource usage"
            icon={Zap}
          >
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Zap size={20} className="text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-medium group-hover:text-green-300 transition-colors">Clear Cache</h4>
                    <p className="text-sm text-gray-400">Free up storage space</p>
                  </div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Globe size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium group-hover:text-blue-300 transition-colors">Sync Data</h4>
                    <p className="text-sm text-gray-400">Sync with cloud storage</p>
                  </div>
                </div>
              </motion.button>
            </div>
          </SettingCard>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsPage;