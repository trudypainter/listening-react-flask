import CalendarView from "./components/Calendar/CalendarView";
import DayView from "./components/Day/DayView";
import "./App.css";
import React, { useState, useEffect } from "react";

const App = () => {
  const [selectedDay, setSelectedDay] = useState("");
  const [dates, updateDates] = useState([]);

  // on load perform get request to get dates
  useEffect(function effectFunction() {
    fetch("/api/dates")
      .then((response) => response.json())
      .then((data) => {
        updateDates(data.dates);
      });
  }, []);

  return (
    <div className="App">
      <CalendarView dates={dates} />
      <DayView />
    </div>
  );
};

export default App;
