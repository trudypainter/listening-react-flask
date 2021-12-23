import React, { useState, useEffect } from "react";
import "./SongRow.css";

const SongRow = (props) => {
  const songClickHandler = (event) => {
    console.log(props.song.spotify_track_link);
    window.open(props.song.spotify_track_link);
    console.log(props.song.spotify_track_link);
  };

  const contextClickHanlder = (evnt) => {
    window.open(props.song.context_link);
  };

  return (
    <div className="songRow">
      <div className="thumb">
        <img src={props.song.spotify_img_link}></img>
      </div>

      <div className="song">
        <div>{props.song.artist}</div>
        <div>{props.song.album}</div>
        <div onClick={songClickHandler} className="songItem">
          {props.song.song}
        </div>
      </div>

      <div className="context">
        <div>{props.song.time_of_day}</div>
        <div onClick={contextClickHanlder} className="contextItem">
          {props.song.context_name}
        </div>
      </div>
    </div>
  );
};

export default SongRow;
