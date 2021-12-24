import React, { useState, useEffect } from "react";
import "./SongNode.css";

const SongNode = (props) => {
  return (
    <button
      onMouseEnter={() => {
        props.enterNodeHanlder(props.song);
      }}
      onMouseLeave={() => {
        props.exitNodeHandler({});
      }}
      className="songNode"
      onClick={() => window.open(props.song.spotify_track_link)}
    ></button>
  );
};

export default SongNode;
