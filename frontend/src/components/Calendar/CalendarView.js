import React, { useState } from "react";
import DaysOfTheWeek from "./DaysOfTheWeek";
import CalendarList from "./CalendarList";

import "./CalendarView.css";

const CalendarView = (props) => {
  return (
    <div className="calendarView">
      <DaysOfTheWeek />
      <CalendarList onNewDay={props.onNewDay} dates={props.dates} />
    </div>
  );
};

export default CalendarView;
