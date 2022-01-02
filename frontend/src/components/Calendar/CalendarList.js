import React, { useState, useEffect } from "react";
import CalendarDay from "./CalendarDay";

import "./CalendarList.css";

const CalendarList = (props) => {
  const date = new Date();

  const emptyDays = [];
  for (var i = 0; i < 6 - date.getDay(); i++) {
    emptyDays.push("");
  }

  return (
    <div className="calendarList">
      {emptyDays.map((empty) => (
        <div className="empty"> </div>
      ))}
      {props.dates.map((date) => (
        <CalendarDay onNewDay={props.onNewDay} key={date.id} date={date} />
      ))}
      <div className="final"></div>
    </div>
  );
};

export default CalendarList;
