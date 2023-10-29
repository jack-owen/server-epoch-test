import "./App.css";
import Metrics from "./Components/Metrics";
import Time from "./Components/Time";

function App() {
  return (
    <div className="App">
      <main className="Dashboard">
        <Time />
        <Metrics />
      </main>
    </div>
  );
}

export default App;
