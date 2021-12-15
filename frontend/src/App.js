import CalendarView from "./components/CalendarView";
import DayView from "./components/DayView";
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
