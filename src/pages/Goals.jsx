import React from "react";
import { motion } from "framer-motion";
import { Target, Plus, TrendingUp, Award } from "lucide-react";
import GoalForm from "../components/GoalForm";
import GoalList from "../components/GoalList";
import SidebarMenu from "../components/SidebarMenu";
import Card from "../components/Card";
import { useGoals } from "../context/GoalContext";

const Goals = () => {
  const { dispatch } = useGoals();

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

      {/* Enhanced animated blobs */}
      <div className="absolute -z-10 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl animate-pulse delay-3000" />
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Goal Achievement 
          </h1>
          <p className="text-gray-400 text-lg">Transform your dreams into achievable milestones</p>
        </motion.div>

        {/* Goal Form */}
        <motion.div variants={itemVariants}>
          <Card title="Create New Goal" icon={Plus}>
            <div className="tb-form">
              <GoalForm
                onAddGoal={(goal) =>
                dispatch({
                  type: "ADD_GOAL",
                  payload: { ...goal, id: Date.now(), subtasks: [] }, // add id + subtasks
                })
              } 
              />
            </div>
          </Card>
        </motion.div>

        {/* Goal List */}
        <motion.div variants={itemVariants}>
          <Card title="Your Goals" icon={Target}>
            <div className="max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              <div className="min-h-32 flex items-center justify-center">
                <GoalList />
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Goals;
