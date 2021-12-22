import React, { useState, useEffect } from "react";
import "./RightButton.css";

const RightButton = (props) => {
  const clickHandler = (event) => {
    console.log("RIGHT CLICKED");
  };

  return (
    <div onClick={clickHandler} className="rightButton">
      <div> → </div>
    </div>
  );
};

export default RightButton;
