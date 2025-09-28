import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";

export default function DailyTaskForm() {
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("General");

  const resetForm = () => {
    setTitle("");
    setTime("");
    setCategory("General");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split("T")[0];

    const newTask = {
      id: Date.now(),
      title,
      type: "daily",
      dueDate: today, // auto set today
      time,
      category,
      completed: false,
    };

    addTask(newTask);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        required
        className="w-full p-2 rounded bg-gray-800 text-white"
      />

      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="w-full p-2 rounded bg-gray-800 text-white"
      />

      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        className="w-full p-2 rounded bg-gray-800 text-white"
      />

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
      >
        Add Task
      </button>
    </form>
  );
}
