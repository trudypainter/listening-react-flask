import React, { useState, useEffect } from "react";
import "./SongNode.css";

const SongNode = (props) => {
  return (
    <button
      onMouseEnter={() => {
        props.enterNodeHanlder(props.song);
      }}
      onMouseLeave={() => {
        props.enterNodeHanlder({});
      }}
      className="songNode"
    ></button>
  );
};

export default SongNode;
