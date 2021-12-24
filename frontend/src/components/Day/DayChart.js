import React, { useState, useEffect } from "react";
import "./DayChart.css";
import ChartDisplay from "./Chart/ChartDisplay";
import ChartSelectionBar from "./Chart/ChartSelectionBar";
import ChartAxis from "./Chart/ChartAxis";

const DayChart = (props) => {
  // build list of hours for chart columns
  const hours = [];
  for (var i = 0; i < 24; i++) {
    if (i < 10) {
      hours.push("0" + String(i));
    } else {
      hours.push(String(i));
    }
  }

  // handle hovering
  const [selectedSong, setSelectedSong] = useState({});

  const enterNodeHanlder = (song) => {
    console.log("playing: ", song.preview_url);
    setSelectedSong(song);
  };

  const exitNodeHanlder = () => {
    console.log("there was an exit");
    setSelectedSong({});
  };

  return (
    <div className="dayChart">
      <ChartAxis />
      <ChartDisplay
        hours={hours}
        songs={props.songs}
        enterNodeHanlder={enterNodeHanlder}
        exitNodeHanlder={exitNodeHanlder}
      />
      <ChartSelectionBar selectedSong={selectedSong} />
    </div>
  );
};

export default DayChart;
