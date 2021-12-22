import React, { useState, useEffect } from "react";
import "./LeftButton.css";

const LeftButton = (props) => {
  const clickHandler = (event) => {
    console.log("LEFT CLICKED");
  };

  return (
    <div onClick={clickHandler} className="leftButton">
      <div> ← </div>
    </div>
  );
};

export default LeftButton;
