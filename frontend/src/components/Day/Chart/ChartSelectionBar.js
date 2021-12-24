import React, { useState, useEffect } from "react";
import "./ChartSelectionBar.css";
import SongRow from "../List/SongRow";

const ChartDisplay = (props) => {
  return <SongRow song={props.selectedSong} />;
};

export default ChartDisplay;
