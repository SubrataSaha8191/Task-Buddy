import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, CheckCircle, Target, Calendar, TrendingUp, Award, Clock, Users } from "lucide-react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import NotificationBanner from "../components/NotificationBanner";
import SidebarMenu from "../components/SidebarMenu";
import Card from "../components/Card";
import GoalList from "../components/GoalList";
import DailyProgress from "../components/DailyProgress";
import WeeklyProgress from "../components/WeeklyProgress";
import TaskList from "../components/TaskList";
import { useTasks } from "../context/TaskContext";
import { useGoals } from "../context/GoalContext";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const { tasks } = useTasks();
  const { goals } = useGoals();
  const today = new Date().toISOString().split("T")[0];

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Get display name or fallback to email or default
  const getDisplayName = () => {
    if (!user) return "User";
    if (user.displayName) return user.displayName.split(' ')[0]; // First name only
    if (user.email) return user.email.split('@')[0]; // Email username
    return "User";
  };

  // Calculate dynamic stats
  const calculateStats = () => {
    // Tasks completed today
    const completedToday = tasks.filter(task => {
      if (!task.completed) return false;
      
      // Check if task has a specific date
      const taskDate = task.date || task.dueDate || task.createdAt?.split('T')[0];
      return taskDate === today;
    }).length;

    // Estimate hours focused based on completed tasks and complexity
    const hoursPerTask = 0.75; // Estimate 45 minutes per task on average
    const hoursToday = (completedToday * hoursPerTask).toFixed(1);

    // Goals progress percentage - calculate across all goals
    let totalSubtasks = 0;
    let completedSubtasks = 0;
    
    goals.forEach(goal => {
      if (goal.subtasks && goal.subtasks.length > 0) {
        totalSubtasks += goal.subtasks.length;
        completedSubtasks += goal.subtasks.filter(st => st.completed).length;
      } else {
        // If goal has no subtasks, consider the goal itself as 1 task
        totalSubtasks += 1;
        // Check if goal has a completed status or if it's marked as completed
        if (goal.completed || goal.status === 'completed') {
          completedSubtasks += 1;
        }
      }
    });
    
    const goalsProgress = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;

    // Productivity calculation (compare to yesterday and last week)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];
    
    const completedYesterday = tasks.filter(task => {
      if (!task.completed) return false;
      const taskDate = task.date || task.dueDate || task.createdAt?.split('T')[0];
      return taskDate === yesterdayStr;
    }).length;

    // Calculate last week's average for more stable comparison
    const lastWeekTasks = [];
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      
      const dayTasks = tasks.filter(task => {
        if (!task.completed) return false;
        const taskDate = task.date || task.dueDate || task.createdAt?.split('T')[0];
        return taskDate === dateStr;
      }).length;
      
      lastWeekTasks.push(dayTasks);
    }
    
    const lastWeekAverage = lastWeekTasks.length > 0 ? 
      lastWeekTasks.reduce((sum, count) => sum + count, 0) / lastWeekTasks.length : 0;

    let productivityChange = 0;
    const baselineComparison = Math.max(completedYesterday, lastWeekAverage);
    
    if (baselineComparison > 0) {
      productivityChange = Math.round(((completedToday - baselineComparison) / baselineComparison) * 100);
    } else if (completedToday > 0) {
      productivityChange = 100; // Significant improvement if no baseline
    }

    const productivityText = productivityChange > 0 ? `↑${productivityChange}%` : 
                           productivityChange < 0 ? `↓${Math.abs(productivityChange)}%` : '→0%';

    return {
      completedToday,
      hoursToday,
      goalsProgress,
      productivityText,
      productivityChange
    };
  };

  const stats = calculateStats();

  // ----- Week range (Mon–Sun) without mutating the same Date object -----
  const now = new Date();
  const day = now.getDay(); // 0 Sun -> 6 Sat
  const diffToMonday = (day + 6) % 7;

  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  start.setDate(now.getDate() - diffToMonday);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  const weekStart = start.toISOString().split("T")[0];
  const weekEnd = end.toISOString().split("T")[0];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
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
      transition: { duration: 0.5 }
    }
  };

  const statsData = [
    { 
      icon: CheckCircle, 
      label: "Completed Today", 
      value: stats.completedToday.toString(), 
      color: "text-green-400", 
      bgColor: "from-green-500/20 to-green-600/20" 
    },
    { 
      icon: Clock, 
      label: "Hours Focused", 
      value: stats.hoursToday, 
      color: "text-blue-400", 
      bgColor: "from-blue-500/20 to-blue-600/20" 
    },
    { 
      icon: Target, 
      label: "Goals Progress", 
      value: `${stats.goalsProgress}%`, 
      color: "text-purple-400", 
      bgColor: "from-purple-500/20 to-purple-600/20" 
    },
    { 
      icon: TrendingUp, 
      label: "Productivity", 
      value: stats.productivityText, 
      color: stats.productivityChange >= 0 ? "text-pink-400" : "text-red-400", 
      bgColor: stats.productivityChange >= 0 ? "from-pink-500/20 to-pink-600/20" : "from-red-500/20 to-red-600/20" 
    },
  ];
  // ----------------------------------------------------------------------

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Sidebar */}
      <SidebarMenu />

      {/* Enhanced decorative blobs with more variety */}
      <div className="absolute -z-10 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-r from-green-500/10 to-purple-500/10 rounded-full blur-2xl animate-pulse delay-3000" />
      </div>

      {/* Main content with left margin for sidebar */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="ml-80 p-8 relative z-10 transition-all duration-300"
      >
        {/* Welcome Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Welcome back, {getDisplayName()}! 
          </h1>
          <p className="text-gray-400 text-lg">Here's your productivity overview for today</p>
        </motion.div>

        <NotificationBanner />

        {/* Stats Cards Row */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`bg-gradient-to-br ${stat.bgColor} backdrop-blur-xl rounded-2xl border border-white/10 p-4 shadow-xl hover:shadow-2xl transition-all duration-300 group`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon size={20} className={stat.color} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-gray-300">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Grid layout */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 auto-rows-[minmax(0,1fr)] items-stretch"
        >
          
          {/* Progress Overview */}
          <motion.div variants={itemVariants}>
            <Card title="Daily Progress" icon={TrendingUp} className="h-full">
              <DailyProgress />
            </Card>
          </motion.div>

          {/* Weekly Overview */}
          <motion.div variants={itemVariants}>
            <Card title="Weekly Overview" icon={Calendar} className="h-full">
              <WeeklyProgress />
            </Card>
          </motion.div>

          {/* Today's Tasks */}
          <motion.div variants={itemVariants}>
            <Card title="Today's Tasks" icon={CheckCircle} className="h-full">
              <div className="max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                <TaskList type="daily" dateFilter={today} />
              </div>
            </Card>
          </motion.div>

          {/* Active Goals */}
          <motion.div variants={itemVariants}>
            <Card title="Active Goals" icon={Target} className="h-full">
              <div className="max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                <GoalList />
              </div>
            </Card>
          </motion.div>

          {/* Weekly Tasks Preview */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card title="This Week's Tasks" icon={Calendar} className="h-full">
              <div className="max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                <TaskList type="weekly" weekFilter={{ start: weekStart, end: weekEnd }} />
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
