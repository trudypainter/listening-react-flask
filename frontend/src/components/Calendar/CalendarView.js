import React, { useState } from "react";
import DaysOfTheWeek from "./DaysOfTheWeek";

import "./CalendarView.css";

const CalendarView = (props) => {
  let dates = [];

  return (
    <div className="calendarView">
      <DaysOfTheWeek />
      <CalendarList dates={dates} />
    </div>
  );
};

export default CalendarView;
