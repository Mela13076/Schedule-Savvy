import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { Link } from "react-router-dom";
import 'react-calendar/dist/Calendar.css';

function MonthView(props) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (props.data.length > 0) {
      setTasks(props.data);
    }
  }, [props.data]);



  return (
    <div>
      {/* <h2>Month View</h2> */}
      <Calendar className="Calendar"
        
        tileContent={({ date }) => (
          <div>
            
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
                <div key={task.task_id}>
                    <Link to={`/task/${task.id}`}>{task.title}</Link>
                </div>
              ))}
          </div>
        )}
      />
    </div>
  );
}

export default MonthView;
