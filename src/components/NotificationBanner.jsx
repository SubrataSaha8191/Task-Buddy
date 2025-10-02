import React from "react";
import { useTasks } from "../context/TaskContext";
import { AlertCircle, CheckCircle } from "lucide-react";

const NotificationBanner = () => {
  const { tasks } = useTasks();

  if (!tasks || tasks.length === 0) return null;

  const now = new Date();

  // separate daily and weekly tasks
  const dailyTasks = tasks.filter((task) => task.type === "daily");
  const weeklyTasks = tasks.filter((task) => task.type === "weekly");

  const dailyIncomplete = dailyTasks.filter((t) => !t.completed);
  const weeklyIncomplete = weeklyTasks.filter((t) => !t.completed);

  // helper: find closest deadline
  const getClosestDeadline = (taskList) => {
    const deadlines = taskList
      .filter((task) => task.dueDate)
      .map((task) => new Date(`${task.dueDate}T${task.time || "23:59"}`))
      .filter((d) => d > now); // only future deadlines

    if (deadlines.length === 0) return null;

    return new Date(Math.min(...deadlines)); // closest
  };

  // decide what to show
  let bannerType = null;
  let closestDeadline = null;

  if (dailyIncomplete.length > 0) {
    bannerType = "daily";
    closestDeadline = getClosestDeadline(dailyIncomplete);
  } else if (weeklyIncomplete.length > 0) {
    bannerType = "weekly";
    closestDeadline = getClosestDeadline(weeklyIncomplete);
  } else {
    bannerType = "allDone";
  }

  // 🎉 All tasks completed
  if (bannerType === "allDone") {
    return (
      <div className="bg-green-200 text-green-900 px-6 py-4 my-4 rounded-lg shadow-md flex items-center gap-3">
        <CheckCircle className="w-5 h-5 text-green-700" />
        <div>
          <div className="font-semibold">
            🎉 Great job! You’ve completed all your tasks!
          </div>
        </div>
      </div>
    );
  }

  // 🔔 Show deadline reminder
  if (closestDeadline) {
    return (
      <div className="bg-yellow-200 text-yellow-900 px-6 py-4 my-4 rounded-lg shadow-md flex items-center gap-3">
        <AlertCircle className="w-5 h-5 " />
        <div>
          <strong>
            {bannerType === "daily"
              ? "Daily task deadline approaching"
              : "Weekly task deadline approaching"}
            :
          </strong>{" "}
          <span className="font-medium">
            {closestDeadline.toLocaleDateString()}{" "}
            {closestDeadline.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    );
  }

  return null;
};

export default NotificationBanner;
