import React, { useMemo } from "react";
import { useTasks } from "../context/TaskContext";

function normalizeDate(dateStr) {
  if (!dateStr) return "";
  return dateStr.split("T")[0];
}

const TaskProgress = () => {
  const { tasks } = useTasks();

  const today = new Date().toISOString().split("T")[0];

  // Compute this week range (Mon–Sun)
  const now = new Date();
  const day = now.getDay();
  const diffToMonday = (day + 6) % 7;

  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  start.setDate(now.getDate() - diffToMonday);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  const weekStart = start.toISOString().split("T")[0];
  const weekEnd = end.toISOString().split("T")[0];

  // Daily tasks
  const todayTasks = useMemo(
    () =>
      tasks.filter(
        (t) => t.type === "daily" && normalizeDate(t.dueDate) === today
      ),
    [tasks, today]
  );
  const dailyCompleted = todayTasks.filter((t) => t.completed);

  // Weekly tasks
  const weeklyTasks = useMemo(
    () =>
      tasks.filter((t) => {
        if (t.type !== "weekly") return false;
        const d = normalizeDate(t.dueDate);
        return d >= weekStart && d <= weekEnd;
      }),
    [tasks, weekStart, weekEnd]
  );
  const weeklyCompleted = weeklyTasks.filter((t) => t.completed);

  const renderProgress = (label, total, done) => {
    const percent = total === 0 ? 0 : Math.round((done / total) * 100);
    return (
      <div className="mb-6">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 py-1">
            {label}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 py-1">
            {done} / {total} tasks
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {todayTasks.length > 0 && renderProgress("Today's Progress", todayTasks.length, dailyCompleted.length)}
      {weeklyTasks.length > 0 && renderProgress("This Week's Progress", weeklyTasks.length, weeklyCompleted.length)}
      {todayTasks.length === 0 && weeklyTasks.length === 0 }
    </div>
  );
};

export default TaskProgress;
