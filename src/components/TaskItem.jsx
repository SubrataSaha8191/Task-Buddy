import { useTasks } from '../context/TaskContext';
import { getLabelStyle } from '../utils/labelColors';

const TaskItem = ({ task }) => {
  const { dispatch } = useTasks();

  const handleToggle = () => {
    dispatch({ type: 'TOGGLE_TASK', payload: task.id });
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_TASK', payload: task.id });
  };

  // ✅ fallback if old tasks still use "category"
  const label = task.label || task.category || "General";

  return (
    <li className="bg-white dark:bg-gray-800 p-4 shadow rounded flex justify-between items-center">
      <div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggle}
            className="h-4 w-4 text-blue-600"
          />
          <p
            className={`font-medium ${
              task.completed ? 'line-through text-gray-400' : ''
            }`}
          >
            {task.title}
          </p>
        </div>
        <p className="text-sm text-gray-500">
          {task.date ? task.date : "No date"} {task.time ? `at ${task.time}` : ""}
        </p>
        <span
          className={`text-xs px-2 py-1 rounded-full font-semibold mt-1 inline-block ${getLabelStyle(
            label
          )}`}
        >
          {label}
        </span>
      </div>
      <button
        onClick={handleDelete}
        className="text-red-500 hover:text-red-700 text-sm"
      >
        🗑️
      </button>
    </li>
  );
};

export default TaskItem;
