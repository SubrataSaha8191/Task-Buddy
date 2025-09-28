import { useTasks } from "../context/TaskContext";

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
      <p className="text-gray-400 text-center p-5">
        No tasks for {type === "daily" ? "today" : "this week"}.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {filteredTasks.map((task) => (
        <li
          key={task.id}
          className={`flex items-center justify-between p-4 rounded-xl shadow-md 
                     ${task.completed ? "bg-blue-500" : "bg-white/10"}`}
        >
          {/* Left: checkbox + title */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              className="w-5 h-5 rounded accent-green-500"
            />
            <div>
              <p
                className={`font-semibold ${
                  task.completed ? "line-through text-gray-100" : ""
                }`}
              >
                {task.title}
              </p>
              <p className="text-sm text-gray-400">
                {task.dueDate} {task.time && `at ${task.time}`}
              </p>
              <span className="text-xs bg-blue-500 px-2 py-1 rounded-full">
                {task.category}
              </span>
            </div>
          </div>

          {/* Delete button */}
          <button
            onClick={() => deleteTask(task.id)}
            className="text-red-400 hover:text-red-600 transition"
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}
