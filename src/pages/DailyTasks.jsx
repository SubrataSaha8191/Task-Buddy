import React from "react";
import { motion } from "framer-motion";
import { Calendar, CheckCircle, Clock, Plus } from "lucide-react";
import SidebarMenu from "../components/SidebarMenu";
import TaskProgress from "../components/TaskProgress";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import DailyProgress from "../components/DailyProgress";
import DailyTaskForm from "../components/DailyTaskForm";
import Card from "../components/Card";
import { useSidebar } from "../context/SidebarContext";

const DailyTasks = () => {
  const { getContentMargin } = useSidebar();
  const today = new Date().toISOString().split("T")[0];
  const displayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Sidebar */}
      <SidebarMenu />

      {/* Enhanced background blobs */}
      <div className="absolute -z-10 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Main Content with left margin for fixed sidebar */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`${getContentMargin()} p-4 md:p-8 space-y-8 relative z-10 transition-all duration-300`}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center">
          <h1 className="text-4xl h-12 font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            {displayDate}
          </h1>
          <p className="text-gray-400 text-lg">Focus on what matters today</p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div variants={itemVariants}>
          <Card title="Today's Progress" icon={CheckCircle}>
            <DailyProgress />
          </Card>
        </motion.div>

        {/* Task Form */}
        <motion.div variants={itemVariants}>
          <Card title="Add New Task" icon={Plus}>
            <DailyTaskForm />
          </Card>
        </motion.div>

        {/* Task List */}
        <motion.div variants={itemVariants}>
          <Card title="Today's Tasks" icon={Clock}>
            <div className="max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              <TaskList type="daily" dateFilter={today} />
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DailyTasks;
