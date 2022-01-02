import React, { useState, useEffect } from "react";
import "./LeftButton.css";

const LeftButton = (props) => {
  const clickHandler = (event) => {
    console.log("LEFT CLICKED");
    const today = new Date();
    const timestamp = Date.parse(props.selectedDay);
    const selectedDayObj = new Date(timestamp);

    if (
      today.getFullYear() !== selectedDayObj.getFullYear() ||
      today.getMonth() !== selectedDayObj.getMonth() ||
      today.getDate() !== selectedDayObj.getDate()
    ) {
      selectedDayObj.setDate(selectedDayObj.getDate() + 1);

      const options = { year: "numeric", month: "2-digit", day: "2-digit" };

      props.onNewDay(selectedDayObj.toLocaleDateString("en-US", options));
    }
  };

  return (
    <div onClick={clickHandler} className="leftButton">
      <div> ← </div>
    </div>
  );
};

export default LeftButton;
