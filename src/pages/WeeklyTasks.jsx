import React from "react";
import { motion } from "framer-motion";
import { Calendar, TrendingUp, Target, Plus } from "lucide-react";
import SidebarMenu from "../components/SidebarMenu";
import TaskProgress from "../components/TaskProgress";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import WeeklyProgress from "../components/WeeklyProgress";
import Card from "../components/Card";

const WeeklyTasks = () => {
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
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Main Content with left margin for fixed sidebar */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="ml-80 p-8 space-y-8 relative z-10 transition-all duration-300"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center">
          <h1 className="text-4xl h-12 font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Weekly Planning 
          </h1>
          <p className="text-gray-400 text-lg">Plan your week for maximum productivity</p>
        </motion.div>

        {/* Weekly Progress */}
        <motion.div variants={itemVariants}>
          <Card title="Weekly Progress" icon={TrendingUp}>
            <WeeklyProgress />
          </Card>
        </motion.div>

        {/* Task Form */}
        <motion.div variants={itemVariants}>
          <Card title="Add Weekly Task" icon={Plus}>
            <TaskForm type="weekly" showDateInput={true} />
          </Card>
        </motion.div>

        {/* Task List */}
        <motion.div variants={itemVariants}>
          <Card title="This Week's Tasks" icon={Calendar}>
            <div className="max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              <TaskList type="weekly" />
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WeeklyTasks;
