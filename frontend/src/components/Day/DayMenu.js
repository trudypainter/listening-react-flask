import React, { useState, useEffect } from "react";
import "./DayMenu.css";
import RightButton from "./Menu/RightButton";
import LeftButton from "./Menu/LeftButton";

const DayMenu = (props) => {
  return (
    <div className="dayMenu">
      <LeftButton selectedDay={props.selectedDay} onNewDay={props.onNewDay} />
      <div>{props.selectedDay}</div>
      <RightButton selectedDay={props.selectedDay} onNewDay={props.onNewDay} />
    </div>
  );
};

export default DayMenu;
