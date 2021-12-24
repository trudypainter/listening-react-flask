import React, { useState, useEffect } from "react";
import "./ChartColumn.css";
import SongNode from "./SongNode";

const ChartColumn = (props) => {
  const songNodes = [];
  for (var i = 0; i < props.songs.length; i++) {
    if (String(props.songs[i].time_of_day.substring(0, 2)) == props.hour) {
      songNodes.push(props.songs[i]);
    }
  }

  return (
    <div className="chartColumn">
      <div className="nodeContainer">
        {songNodes.map((song) => (
          <SongNode
            key={song.id}
            song={song}
            enterNodeHanlder={props.enterNodeHanlder}
            exitNodeHandler={props.exitNodeHanlder}
          />
        ))}
      </div>
    </div>
  );
};

export default ChartColumn;
