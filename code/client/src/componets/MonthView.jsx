import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function MonthView({ tasks }) {
  // You can use the 'tasks' prop to display tasks in the month view
  return (
    <div>
      <h2>Month View</h2>
      <Calendar
        /* Customize calendar options as needed */
        tileContent={({ date }) => (
          <div>
            {/* Display tasks for the selected date */}
            {tasks
              .filter((task) => {
                const taskDate = new Date(task.due_date);
                return (
                  taskDate.getFullYear() === date.getFullYear() &&
                  taskDate.getMonth() === date.getMonth() &&
                  taskDate.getDate() === date.getDate()
                );
              })
              .map((task) => (
                <div key={task.id}>{task.title}</div>
              ))}
          </div>
        )}
      />
    </div>
  );
}

export default MonthView;
