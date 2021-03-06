import CalendarView from "./components/Calendar/CalendarView";
import DayView from "./components/Day/DayView";
import Popup from "./components/Popup";
import "./App.css";
import React, { useState, useEffect } from "react";
import ClickAwayListener from "react-click-away-listener";
import CoverUp from "./components/CoverUp";

const App = () => {
  const [selectedDay, setSelectedDay] = useState("test");
  const [dates, updateDates] = useState([]);
  const [songs, updateSongs] = useState([]);

  // on load perform get request to get dates
  useEffect(function effectFunction() {
    fetch("/api/dates")
      .then((response) => response.json())
      .then((data) => {
        updateDates(data.dates);
        newDayHandler(data.dates[0]);
      });
  }, []);

  // getting new date information
  // 1 - update the selected day
  // 2 - update the song list
  const newDayHandler = (newDay) => {
    setSelectedDay(newDay);
    const formattedDate = newDay.split("/").join(".");
    fetch("/api/" + formattedDate)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.songs);
        updateSongs(data.songs);
        console.log(data.songs);
      });
  };

  //popup trigger
  const [popup, setPopup] = useState(true);

  return (
    <div className="App">
      <CoverUp></CoverUp>
      <CalendarView dates={dates} onNewDay={newDayHandler} />
      <DayView
        onNewDay={newDayHandler}
        selectedDay={selectedDay}
        songs={songs}
      />
      {popup && (
        <ClickAwayListener onClickAway={() => setPopup(false)}>
          <Popup />
        </ClickAwayListener>
      )}
    </div>
  );
};

export default App;
