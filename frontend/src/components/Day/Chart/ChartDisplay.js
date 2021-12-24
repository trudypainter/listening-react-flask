import React, { useState, useEffect } from "react";
import "./ChartDisplay.css";
import ChartColumn from "./ChartColumn";

const ChartDisplay = (props) => {
  return (
    <div className="chartDisplay">
      {props.hours.map((hour) => (
        <ChartColumn
          key={hour}
          hour={hour}
          songs={props.songs}
          enterNodeHanlder={props.enterNodeHanlder}
          exitNodeHanlder={props.exitNodeHanlder}
        />
      ))}
    </div>
  );
};

export default ChartDisplay;
