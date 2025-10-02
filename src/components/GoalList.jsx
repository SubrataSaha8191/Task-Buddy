import React, { useState } from 'react';
import { useGoals } from '../context/GoalContext';
import { motion } from 'framer-motion';
import { Target, Calendar, ChevronDown, ChevronUp, Plus, Trash2, CheckCircle2, Trophy } from 'lucide-react';

const GoalList = () => {
  const { goals, dispatch } = useGoals();
  const [expandedId, setExpandedId] = useState(null);
  const [subtaskInputs, setSubtaskInputs] = useState({});

  const toggleExpand = (goalId) => {
    setExpandedId(expandedId === goalId ? null : goalId);
  };

  const handleSubtaskAdd = (goalId) => {
    const input = subtaskInputs[goalId]?.trim();
    if (!input) return;

    const newSubtask = {
      id: Date.now(),
      title: input,
      completed: false,
    };

    dispatch({ type: 'ADD_SUBTASK', payload: { goalId, subtask: newSubtask } });

    setSubtaskInputs((prev) => ({ ...prev, [goalId]: '' }));
  };

  const getProgress = (subtasks) => {
    if (!subtasks.length) return 0;
    const completed = subtasks.filter((st) => st.completed).length;
    return Math.round((completed / subtasks.length) * 100);
  };

  const isGoalCompleted = (goal) => {
    return goal.subtasks.length > 0 && getProgress(goal.subtasks) === 100;
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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

  if (goals.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-8"
      >
        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full flex items-center justify-center">
          <Target className="w-10 h-10 text-amber-400" />
        </div>
        <p className="text-gray-400 text-lg">No goals yet.</p>
        <p className="text-gray-500 text-sm mt-2">Create your first goal to get started!</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      variants={listVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {goals.map((goal) => {
        const progress = getProgress(goal.subtasks);
        const completed = isGoalCompleted(goal);
        
        return (
          <motion.div
            key={goal.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -2 }}
            className={`relative overflow-hidden rounded-2xl border backdrop-blur-xl transition-all duration-300 ${
              completed
                ? "bg-gradient-to-r from-amber-500/20 to-orange-500/30 border-amber-500/30 shadow-lg shadow-amber-500/10"
                : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 shadow-lg hover:shadow-xl"
            }`}
          >
            {/* Completion glow effect */}
            {completed && (
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-orange-400/10 animate-pulse" />
            )}

            <div className="relative p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${
                      completed ? "bg-amber-500/20" : "bg-purple-500/20"
                    }`}>
                      {completed ? (
                        <Trophy className="w-5 h-5 text-amber-400" />
                      ) : (
                        <Target className="w-5 h-5 text-purple-400" />
                      )}
                    </div>
                    <h3 className={`text-xl font-bold ${
                      completed ? "text-amber-100" : "text-white"
                    }`}>
                      {goal.title}
                    </h3>
                    {completed && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-1 px-2 py-1 bg-amber-500/20 rounded-full"
                      >
                        <CheckCircle2 size={14} className="text-amber-400" />
                        <span className="text-xs font-medium text-amber-300">Completed</span>
                      </motion.div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      completed
                        ? "bg-amber-500/20 text-amber-200 border border-amber-500/30"
                        : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    }`}>
                      {goal.category}
                    </span>

                    {goal.dueDate && (
                      <div className={`flex items-center gap-1 ${
                        completed ? "text-amber-200/70" : "text-gray-300"
                      }`}>
                        <Calendar size={14} />
                        <span>Due: {goal.dueDate}</span>
                      </div>
                    )}
                  </div>

                  {goal.description && (
                    <p className={`text-sm mb-4 ${
                      completed ? "text-amber-100/80" : "text-gray-300"
                    }`}>
                      {goal.description}
                    </p>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => dispatch({ type: 'DELETE_GOAL', payload: goal.id })}
                  className="p-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-200 border border-red-500/20"
                  title="Delete goal"
                >
                  <Trash2 size={16} />
                </motion.button>
              </div>

              {/* Progress Bar */}
              {goal.subtasks.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-medium ${
                      completed ? "text-amber-200" : "text-gray-300"
                    }`}>
                      Progress
                    </span>
                    <span className={`text-sm font-bold ${
                      completed ? "text-amber-300" : "text-white"
                    }`}>
                      {progress}%
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full rounded-full ${
                        completed
                          ? "bg-gradient-to-r from-amber-400 to-orange-400"
                          : "bg-gradient-to-r from-purple-400 to-pink-400"
                      }`}
                    />
                  </div>
                  <p className={`text-xs mt-1 ${
                    completed ? "text-amber-200/80" : "text-gray-400"
                  }`}>
                    {goal.subtasks.filter(st => st.completed).length} of {goal.subtasks.length} tasks completed
                  </p>
                </div>
              )}

              {/* Expand / Collapse Button */}
              {goal.subtasks.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleExpand(goal.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    completed
                      ? "bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30"
                      : "bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border border-purple-500/30"
                  }`}
                >
                  {expandedId === goal.id ? (
                    <>
                      <ChevronUp size={16} />
                      Hide Subtasks
                    </>
                  ) : (
                    <>
                      <ChevronDown size={16} />
                      Show Subtasks ({goal.subtasks.length})
                    </>
                  )}
                </motion.button>
              )}

              {/* Subtasks UI */}
              {expandedId === goal.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 space-y-3"
                >
                  {goal.subtasks.map((subtask) => (
                    <motion.div
                      key={subtask.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                        subtask.completed
                          ? "bg-green-500/20 border border-green-500/30"
                          : "bg-white/5 border border-white/10 hover:bg-white/10"
                      }`}
                    >
                      <label className="flex items-center gap-3 flex-1 cursor-pointer">
                        <motion.input
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          type="checkbox"
                          checked={subtask.completed}
                          onChange={() =>
                            dispatch({
                              type: 'TOGGLE_SUBTASK',
                              payload: { goalId: goal.id, subtaskId: subtask.id },
                            })
                          }
                          className="w-4 h-4 rounded accent-green-500"
                        />
                        <span
                          className={`font-medium transition-all duration-200 ${
                            subtask.completed 
                              ? 'line-through text-green-200/80' 
                              : 'text-white'
                          }`}
                        >
                          {subtask.title}
                        </span>
                        {subtask.completed && (
                          <CheckCircle2 size={14} className="text-green-400" />
                        )}
                      </label>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 rounded text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-all duration-200"
                        onClick={() =>
                          dispatch({
                            type: 'DELETE_SUBTASK',
                            payload: { goalId: goal.id, subtaskId: subtask.id },
                          })
                        }
                      >
                        <Trash2 size={14} />
                      </motion.button>
                    </motion.div>
                  ))}

                  {/* Add Subtask Input */}
                  <div className="flex gap-3 mt-4">
                    <input
                      type="text"
                      placeholder="Add a new subtask..."
                      value={subtaskInputs[goal.id] || ''}
                      onChange={(e) =>
                        setSubtaskInputs((prev) => ({
                          ...prev,
                          [goal.id]: e.target.value,
                        }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSubtaskAdd(goal.id);
                        }
                      }}
                      className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSubtaskAdd(goal.id)}
                      className="px-4 py-3 bg-purple-500/20 text-purple-300 rounded-xl hover:bg-purple-500/30 transition-all duration-200 border border-purple-500/30 flex items-center gap-2"
                    >
                      <Plus size={16} />
                      Add
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Bottom accent line for completed goals */}
              {completed && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-400" />
              )}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default GoalList;
