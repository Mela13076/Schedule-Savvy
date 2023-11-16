import React, { useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import MonthView from '../componets/MonthView';
import WeekView from '../componets/WeekView';
import DayView from '../componets/DayView';

function Calendar({ tasks }) {
  const [activeView, setActiveView] = useState('month'); // Initial active view

  return (
    <div>
      <Tabs
        id="calendar-tabs"
        activeKey={activeView}
        onSelect={(key) => setActiveView(key)}
      >
        <Tab eventKey="month" title="Month View">
          {/* <MonthView tasks={tasks} /> */}
        </Tab>
        <Tab eventKey="week" title="Week View">
          {/* <WeekView tasks={tasks} /> */}
        </Tab>
        <Tab eventKey="day" title="Day View">
          {/* <DayView tasks={tasks} /> */}
        </Tab>
      </Tabs>
    </div>
  );
}

export default Calendar;
