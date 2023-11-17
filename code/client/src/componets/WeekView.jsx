import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";



function WeekView(props) {
  const [tasks, setTasks] = useState([]);
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());

  useEffect(() => {
    if (props.data.length > 0) {
      setTasks(props.data);
    }
  }, [props.data]);

  // Helper function to get the name of the month
  const getMonthName = (date) => {
    const options = { month: 'long' };
    return date.toLocaleDateString('en-US', options);
  };

  // Helper function to get the start of the current week
  const getStartOfWeek = (date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when Sunday
    return new Date(date.setDate(diff));
  };

  const handlePreviousWeek = () => {
    const previousWeekStart = new Date(currentWeekStart);
    previousWeekStart.setDate(currentWeekStart.getDate() - 7);
    setCurrentWeekStart(previousWeekStart);
  };

  const handleNextWeek = () => {
    const nextWeekStart = new Date(currentWeekStart);
    nextWeekStart.setDate(currentWeekStart.getDate() + 7);
    setCurrentWeekStart(nextWeekStart);
  };

  return (
    <div className="week-view-container">
      <div className="month-title">
        <h2>{getMonthName(currentWeekStart)}</h2>
      </div>
      
      <div className="day-boxes">
        {Array.from({ length: 7 }, (_, index) => {
          const day = new Date(currentWeekStart);
          day.setDate(currentWeekStart.getDate() + index);
          return (
            <div className="day-box" key={index}>
              <div className="day-header">{day.toLocaleDateString('en-US', { weekday: 'long' })}</div>
              <div className="day-date">{day.getDate()}</div>
              <div className="task">
                {tasks
                  .filter((task) => {
                    const taskDate = new Date(task.due_date);
                    return (
                      taskDate.getFullYear() === day.getFullYear() &&
                      taskDate.getMonth() === day.getMonth() &&
                      taskDate.getDate() === day.getDate()
                    );
                  })
                  .map((task) => (
                    <div key={task.task_id}>
                        <Link to={`/task/${task.task_id}`}>{task.title}</Link>
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="calendar-navigation">
        <button onClick={handlePreviousWeek}>Previous Week</button>
        
        <button onClick={handleNextWeek}>Next Week</button>
      </div>
    </div>
  );
}

export default WeekView;
