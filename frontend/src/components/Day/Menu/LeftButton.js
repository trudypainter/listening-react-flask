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
      console.log(selectedDayObj);
      selectedDayObj.setDate(selectedDayObj.getDate() + 1);
      console.log("GOT TO CLAUSE");
      console.log(selectedDayObj);

      const options = { year: "numeric", month: "2-digit", day: "numeric" };

      console.log(today.toLocaleDateString("en-US", options));
      props.onNewDay(today.toLocaleDateString("en-US", options));
    }
  };

  return (
    <div onClick={clickHandler} className="leftButton">
      <div> ← </div>
    </div>
  );
};

export default LeftButton;
