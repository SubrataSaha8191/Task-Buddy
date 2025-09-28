import React, { useMemo } from "react";
import { useTasks } from "../context/TaskContext";

function normalizeDate(dateStr) {
  return dateStr ? dateStr.split("T")[0] : "";
}

export default function DailyProgress({ showEmptyText = false }) {
  const { tasks } = useTasks();
  const today = new Date().toISOString().split("T")[0];

  const todayTasks = useMemo(
    () =>
      tasks.filter(
        (t) => t.type === "daily" && normalizeDate(t.dueDate) === today
      ),
    [tasks, today]
  );

  const completed = todayTasks.filter((t) => t.completed);
  const percent =
    todayTasks.length === 0
      ? 0
      : Math.round((completed.length / todayTasks.length) * 100);

  if (todayTasks.length === 0) {
    return showEmptyText ?(
      <p className="text-gray-400 text-center">No tasks for today</p>
    ): null;
  }

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Today's Progress
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {completed.length} / {todayTasks.length} tasks
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
}
