import React, { useState, useEffect } from "react";
import "./RightButton.css";

const RightButton = (props) => {
  const clickHandler = (event) => {
    console.log("RIGHT CLICKED");
    const endString = Date.parse("12/23/2021");
    const endDate = new Date(endString);
    const timestamp = Date.parse(props.selectedDay);
    const selectedDayObj = new Date(timestamp);

    if (
      endDate.getFullYear() !== selectedDayObj.getFullYear() ||
      endDate.getMonth() !== selectedDayObj.getMonth() ||
      endDate.getDate() !== selectedDayObj.getDate()
    ) {
      console.log(selectedDayObj);
      selectedDayObj.setDate(selectedDayObj.getDate() - 1);
      console.log("GOT TO CLAUSE");
      console.log(selectedDayObj);

      const options = { year: "numeric", month: "2-digit", day: "numeric" };

      console.log(endDate.toLocaleDateString("en-US", options));
      props.onNewDay(endDate.toLocaleDateString("en-US", options));
    }
  };

  return (
    <div onClick={clickHandler} className="rightButton">
      <div> → </div>
    </div>
  );
};

export default RightButton;
