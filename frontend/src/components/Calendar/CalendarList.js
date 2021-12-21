import React, { useState } from "react";

import "./CalendarList.css";

const CalendarList = (props) => {
  let dates = [];

  return (
    <div className="calendarView">
      <DaysOfTheWeek />
      <CalendarList dates={dates} />
    </div>
  );
};

export default CalendarList;
