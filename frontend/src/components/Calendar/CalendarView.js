import React, { useState } from "react";
import DaysOfTheWeek from "./DaysOfTheWeek";
import CalendarList from "./CalendarList";

import "./CalendarView.css";

const CalendarView = (props) => {
  return (
    <div className="calendarView">
      <DaysOfTheWeek />
      <CalendarList dates={props.dates} />
    </div>
  );
};

export default CalendarView;
