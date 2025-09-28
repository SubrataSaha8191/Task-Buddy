import React, { useMemo } from "react";
import { useTasks } from "../context/TaskContext";

function normalizeDate(dateStr) {
  return dateStr ? dateStr.split("T")[0] : "";
}

export default function WeeklyProgress({showEmptyText = false}) {
  const { tasks } = useTasks();

  // week start (Mon) → end (Sun)
  const now = new Date();
  const day = now.getDay();
  const diffToMonday = (day + 6) % 7;

  const start = new Date(now);
  start.setDate(now.getDate() - diffToMonday);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  const weekStart = start.toISOString().split("T")[0];
  const weekEnd = end.toISOString().split("T")[0];

  const weeklyTasks = useMemo(
    () =>
      tasks.filter((t) => {
        if (t.type !== "weekly") return false;
        const d = normalizeDate(t.dueDate);
        return d >= weekStart && d <= weekEnd;
      }),
    [tasks, weekStart, weekEnd]
  );

  const completed = weeklyTasks.filter((t) => t.completed);
  const percent =
    weeklyTasks.length === 0
      ? 0
      : Math.round((completed.length / weeklyTasks.length) * 100);

  if (weeklyTasks.length === 0) {
    return showEmptyText?(
      <p className="text-gray-400 text-center">
        No tasks for this week.
      </p>
    ): null;
  }

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          This Week's Progress
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {completed.length} / {weeklyTasks.length} tasks
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
        <div
          className="bg-blue-500 h-3 rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
}
