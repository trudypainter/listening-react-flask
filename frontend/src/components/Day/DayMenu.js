import React, { useState, useEffect } from "react";
import "./DayMenu.css";
import RightButton from "./Menu/RightButton";
import LeftButton from "./Menu/LeftButton";

const DayMenu = (props) => {
  return (
    <div className="dayMenu">
      <LeftButton />
      <div>{props.selectedDay}</div>
      <RightButton />
    </div>
  );
};

export default DayMenu;
