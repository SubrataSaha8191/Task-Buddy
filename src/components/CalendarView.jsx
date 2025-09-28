import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';

const CalendarView = () => {
  const { tasks } = useTasks();
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date().toISOString().split('T')[0];
    return today;
  });

  const filteredTasks = tasks.filter(task => task.date === selectedDate);

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-semibold mb-4">Tasks by Day</h2>

      <div className="mb-6">
        <label className="block text-gray-600 mb-1">Select Date:</label>
        <input
          type="date"
          className="border px-3 py-2 rounded"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <ul className="space-y-3">
        {filteredTasks.length === 0 ? (
          <p className="text-gray-500">No tasks scheduled for this day.</p>
        ) : (
          filteredTasks.map(task => (
            <li
              key={task.id}
              className="p-4 bg-white rounded shadow flex justify-between"
            >
              <div>
                <p className="font-medium">{task.title}</p>
                <p className="text-sm text-gray-500">
                  {task.label} | {task.time}
                </p>
              </div>
              <span
                className={`text-sm font-semibold px-2 py-1 rounded ${
                  task.completed ? 'text-green-600' : 'text-yellow-600'
                }`}
              >
                {task.completed ? 'Done' : 'Pending'}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CalendarView;
