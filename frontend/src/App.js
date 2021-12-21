import CalendarView from "./components/Calendar/CalendarView";
import DayView from "./components/Day/DayView";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <CalendarView />
      <DayView />
    </div>
  );
};

export default App;
