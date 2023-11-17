import React, { useState, useEffect } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import MonthView from '../componets/MonthView';
import WeekView from '../componets/WeekView';
import './Calendar.css'

function Calendar(props) {
  const [activeView, setActiveView] = useState('month'); // Initial active view
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => { 
    if (props.data.length > 0) {
      setTasks(props.data);
    }
  }, [props.data]);

  

  return (
    <div>
      <Tabs
        id="calendar-tabs"
        activeKey={activeView}
        onSelect={(key) => setActiveView(key)}
      >
        <Tab eventKey="month" title="Month View">
          <MonthView data={tasks} />
        </Tab>
        <Tab eventKey="week" title="Week View">
          <WeekView data={tasks} />
        </Tab>
        
      </Tabs>
    </div>
  );
}

export default Calendar;
