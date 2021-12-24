import React, { useState, useEffect } from "react";
import "./Popup.css";
import popupGif from "./tutorial.gif";

const Popup = (props) => {
  return (
    <div className="popup">
      <div className="center">
        <div className="center">
          Hi, I'm{" "}
          <a target="_blank" href="http://www.trudy.computer">
            Trudy
          </a>
          . This is what I've been listening to. Hover your mouse over the
          little dots to listen to the music. And click on the dots to explore!
        </div>
        <div className="center">
          <img className="tutorial" src={popupGif}></img>
        </div>
        <div className="button">Let's go 🐸</div>
      </div>
    </div>
  );
};

export default Popup;
