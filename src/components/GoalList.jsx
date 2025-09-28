import React, { useState } from 'react';
import { useGoals } from '../context/GoalContext';

const GoalList = () => {
  const { goals, dispatch } = useGoals();
  const [expandedId, setExpandedId] = useState(null);
  const [subtaskInputs, setSubtaskInputs] = useState({});

  const toggleExpand = (goalId) => {
    setExpandedId(expandedId === goalId ? null : goalId);
  };

  const handleSubtaskAdd = (goalId) => {
    const input = subtaskInputs[goalId]?.trim();
    if (!input) return;

    const newSubtask = {
      id: Date.now(),
      title: input,
      completed: false,
    };

    dispatch({ type: 'ADD_SUBTASK', payload: { goalId, subtask: newSubtask } });

    setSubtaskInputs((prev) => ({ ...prev, [goalId]: '' }));
  };

  const getProgress = (subtasks) => {
    if (!subtasks.length) return 0;
    const completed = subtasks.filter((st) => st.completed).length;
    return Math.round((completed / subtasks.length) * 100);
  };

  return (
    <div className="space-y-4 text-center items-center h-full w-full">
      {goals.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No goals yet.</p>
      ) : (
        goals.map((goal) => (
          <div
            key={goal.id}
            className="bg-white dark:bg-gray-800 rounded shadow p-4 space-y-2"
          >
            <div className="flex flex-row justify-center items-center">
              <div className="flex flex-col justify-center items-center">
                <h3 className="text-lg font-bold">{goal.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{goal.category}</p>
                {goal.dueDate && (
                  <p className="text-xs text-red-500">Deadline: {goal.dueDate}</p>
                )}
              </div>
              <button
                onClick={() => dispatch({ type: 'DELETE_GOAL', payload: goal.id })}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>

            {goal.description && (
              <p className="text-sm text-gray-700 dark:text-gray-300">{goal.description}</p>
            )}

            {/* Progress Bar */}
            {goal.subtasks.length > 0 && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded h-2">
                  <div
                    className="bg-green-500 h-2 rounded"
                    style={{ width: `${getProgress(goal.subtasks)}%` }}
                  ></div>
                </div>
                <p className="text-xs mt-1">
                  {getProgress(goal.subtasks)}% complete ({goal.subtasks.filter(st => st.completed).length}/{goal.subtasks.length})
                </p>
              </div>
            )}

            {/* Expand / Collapse */}
            <button
              onClick={() => toggleExpand(goal.id)}
              className="text-blue-500 text-sm mt-2"
            >
              {expandedId === goal.id ? 'Hide Subtasks' : 'Show Subtasks'}
            </button>

            {/* Subtasks UI */}
            {expandedId === goal.id && (
              <div className="space-y-2 mt-2">
                {goal.subtasks.map((subtask) => (
                  <div
                    key={subtask.id}
                    className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-2 rounded"
                  >
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={subtask.completed}
                        onChange={() =>
                          dispatch({
                            type: 'TOGGLE_SUBTASK',
                            payload: { goalId: goal.id, subtaskId: subtask.id },
                          })
                        }
                      />
                      <span
                        className={`${
                          subtask.completed ? 'line-through text-gray-500' : ''
                        }`}
                      >
                        {subtask.title}
                      </span>
                    </label>
                    <button
                      className="text-red-400 hover:text-red-600"
                      onClick={() =>
                        dispatch({
                          type: 'DELETE_SUBTASK',
                          payload: { goalId: goal.id, subtaskId: subtask.id },
                        })
                      }
                    >
                      ✕
                    </button>
                  </div>
                ))}

                {/* Subtask input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add subtask"
                    value={subtaskInputs[goal.id] || ''}
                    onChange={(e) =>
                      setSubtaskInputs((prev) => ({
                        ...prev,
                        [goal.id]: e.target.value,
                      }))
                    }
                    className="flex-1 px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                  />
                  <button
                    onClick={() => handleSubtaskAdd(goal.id)}
                    className="bg-blue-600 text-white px-3 rounded hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default GoalList;
