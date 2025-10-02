import { useTasks } from "../context/TaskContext";
import { motion } from "framer-motion";
import { Calendar, Clock, Tag, Trash2, CheckCircle2 } from "lucide-react";

function normalizeDate(dateStr) {
  if (!dateStr) return "";
  return dateStr.split("T")[0];
}

export default function TaskList({ type, dateFilter, weekFilter }) {
  const { tasks, toggleTask, deleteTask } = useTasks();

  // filter tasks by type and (optionally) by date/week
  const filteredTasks = tasks.filter((task) => {
    if (task.type !== type) return false;

    const taskDate = normalizeDate(task.dueDate);

    if (dateFilter && taskDate !== dateFilter) return false;

    if (weekFilter) {
      if (taskDate < weekFilter.start || taskDate > weekFilter.end) return false;
    }

    return true;
  });

  if (filteredTasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-8"
      >
        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-purple-400" />
        </div>
        <p className="text-gray-400 text-lg">
          No tasks for {type === "daily" ? "today" : "this week"}.
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Add a new task to get started!
        </p>
      </motion.div>
    );
  }

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
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.ul 
      variants={listVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {filteredTasks.map((task) => (
        <motion.li
          key={task.id}
          variants={itemVariants}
          whileHover={{ scale: 1.02, y: -2 }}
          className={`relative overflow-hidden rounded-2xl border backdrop-blur-xl transition-all duration-300 ${
            task.completed 
              ? "bg-gradient-to-r from-green-500/20 to-emerald-500/30 border-green-500/30 shadow-lg shadow-green-500/10" 
              : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 shadow-lg hover:shadow-xl"
          }`}
        >
          {/* Completion glow effect */}
          {task.completed && (
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 animate-pulse" />
          )}

          <div className="relative p-5">
            <div className="flex items-start justify-between">
              {/* Left: checkbox + content */}
              <div className="flex items-start gap-4 flex-1">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="mt-1"
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="w-5 h-5 rounded-full accent-green-500 cursor-pointer transition-all duration-200"
                  />
                </motion.div>

                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-semibold text-lg mb-2 transition-all duration-300 ${
                      task.completed 
                        ? "line-through text-green-100/80" 
                        : "text-white"
                    }`}
                  >
                    {task.title}
                  </h3>

                  {/* Task metadata */}
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    {task.dueDate && (
                      <div className={`flex items-center gap-1 ${
                        task.completed ? "text-green-200/70" : "text-gray-300"
                      }`}>
                        <Calendar size={14} />
                        <span>{task.dueDate}</span>
                      </div>
                    )}

                    {task.time && (
                      <div className={`flex items-center gap-1 ${
                        task.completed ? "text-green-200/70" : "text-gray-300"
                      }`}>
                        <Clock size={14} />
                        <span>{task.time}</span>
                      </div>
                    )}

                    {task.category && (
                      <div className={`flex items-center gap-1 ${
                        task.completed ? "text-green-200/70" : "text-gray-300"
                      }`}>
                        <Tag size={14} />
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          task.completed
                            ? "bg-green-500/20 text-green-200"
                            : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        }`}>
                          {task.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Completion indicator */}
                  {task.completed && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-3 flex items-center gap-2 text-green-300"
                    >
                      <CheckCircle2 size={16} />
                      <span className="text-sm font-medium">Completed</span>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Delete button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => deleteTask(task.id)}
                className="p-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-200 border border-red-500/20"
                title="Delete task"
              >
                <Trash2 size={16} />
              </motion.button>
            </div>
          </div>

          {/* Bottom accent line for completed tasks */}
          {task.completed && (
            <div className="h-1 bg-gradient-to-r from-green-400 to-emerald-400" />
          )}
        </motion.li>
      ))}
    </motion.ul>
  );
}
