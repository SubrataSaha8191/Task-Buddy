import React from 'react';

const WeekdayTabs = ({ selectedDate, onChange }) => {
  const days = [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - date.getDay() + i); // start from Sunday
    const iso = date.toISOString().split('T')[0];
    const label = date.toLocaleDateString('en-US', { weekday: 'short' }); // Mon, Tue, etc.
    return { label, iso };
  });

  return (
    <div className="flex gap-2 overflow-auto pb-2">
      {days.map(({ label, iso }) => (
        <button
          key={iso}
          onClick={() => onChange(iso)}
          className={`px-3 py-1 rounded-full ${
            iso === selectedDate
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default WeekdayTabs;
