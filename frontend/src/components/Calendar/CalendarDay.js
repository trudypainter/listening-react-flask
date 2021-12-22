import React, { useState } from "react";

import "./CalendarDay.css";

const CalendarDay = (props) => {
  return <div className="calendarDay">{props.date}</div>;
};

export default CalendarDay;
