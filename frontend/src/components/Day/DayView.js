import React, { useState, useEffect } from "react";
import "./DayView.css";

const DayView = (props) => {
  return (
    <div className="dayView">
      <DayMenu day={props.selectedDay} />
      <DayChart day={props.selectedDay} />
      <SongList day={props.selectedDay} />
    </div>
  );
};

export default DayView;
