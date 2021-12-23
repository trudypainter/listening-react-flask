import React, { useState, useEffect } from "react";
import "./SongList.css";
import SongRow from "./List/SongRow";

const SongList = (props) => {
  let songsContent = <p>No songs found.</p>;

  if (props.songs.length > 0) {
    console.log("got to song list");
    songsContent = props.songs.map((song) => (
      <SongRow key={song.id} song={song} />
      // <div>test</div>
    ));
    console.log("finished make song content");
  }

  return (
    <div className="songList">
      {props.songs.map((song) => (
        <SongRow key={song.id} song={song} />
        // <div>test</div>
      ))}
    </div>
  );
};

export default SongList;
