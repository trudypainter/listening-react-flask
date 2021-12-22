import React, { useState, useEffect } from "react";
import CalendarDay from "./CalendarDay";

import "./CalendarList.css";

const CalendarList = (props) => {
  return (
    <div className="calendarList">
      {props.dates.map((date) => (
        <CalendarDay key={date.id} date={date} />
      ))}
    </div>
  );
};

export default CalendarList;
