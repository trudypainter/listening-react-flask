import React, { useState } from "react";

import "./CalendarDay.css";

const CalendarDay = (props) => {
  const clickHandler = (event) => {
    console.log("clicked: ", props.date);
    props.onNewDay(props.date);
  };

  return (
    <div onClick={clickHandler} className="calendarDay">
      {props.date}
    </div>
  );
};

export default CalendarDay;
