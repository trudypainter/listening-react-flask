import React, { useState } from "react";
import DaysOfTheWeek from "./DaysOfTheWeek";

import "./CalendarView.css";

const CalendarView = (props) => {
  return (
    <div className="calendarView">
      <DaysOfTheWeek />
    </div>
  );
};

export default CalendarView;
