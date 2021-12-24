import React, { useState, useEffect } from "react";
import "./DayView.css";
import DayMenu from "./DayMenu";
import DayChart from "./DayChart";
import SongList from "./SongList";

const DayView = (props) => {
  return (
    <div className="dayView">
      <DayMenu selectedDay={props.selectedDay} onNewDay={props.onNewDay} />
      <DayChart selectedDay={props.selectedDay} songs={props.songs} />
      <SongList selectedDay={props.selectedDay} songs={props.songs} />
    </div>
  );
};

export default DayView;
