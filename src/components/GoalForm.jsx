import { useState } from "react";

export default function GoalForm({ onAddGoal, className = "" }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Personal");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    const newGoal = { 
      id: Date.now(),           // ✅ unique id
      title, 
      category, 
      dueDate,                  // ✅ matches GoalList
      description, 
      subtasks: []              // ✅ default empty subtasks
    };

    onAddGoal(newGoal);

    // reset
    setTitle("");
    setCategory("Personal");
    setDueDate("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-4 ${className}`}
    >
      {/* Goal Title */}
      <input
        type="text"
        placeholder="Goal title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full p-3 rounded-xl bg-white/10 border border-white/20 
                   text-white placeholder-gray-400 focus:outline-none 
                   focus:ring-2 focus:ring-blue-400 shadow-md"
      />

      {/* Category */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-3 rounded-xl bg-white/10 border border-white/20 
                   text-white focus:outline-none 
                   focus:ring-2 focus:ring-blue-400 shadow-md"
      >
        <option value="Personal" className="bg-gray-800 text-white">Personal</option>
        <option value="Work" className="bg-gray-800 text-white">Work</option>
        <option value="Health" className="bg-gray-800 text-white">Health</option>
        <option value="Finance" className="bg-gray-800 text-white">Finance</option>
      </select>

      {/* Due Date */}
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full p-3 rounded-xl bg-white/10 border border-white/20 
                   text-white focus:outline-none 
                   focus:ring-2 focus:ring-blue-400 shadow-md"
      />

      {/* Description */}
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-3 rounded-xl bg-white/10 border border-white/20 
                   text-white focus:outline-none 
                   focus:ring-2 focus:ring-blue-400 shadow-md"
        rows={3}
      />

      {/* Submit */}
      <button
        type="submit"
        className="w-full p-3 bg-gradient-to-r from-green-500 to-emerald-600 
                   rounded-xl text-white font-semibold shadow-lg hover:opacity-90 
                   transition"
      >
        Add Goal
      </button>
    </form>
  );
}
