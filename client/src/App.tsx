import "./App.css";
import Metrics from "./Components/Metrics";
import Time from "./Components/Time";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Server-epoch-test</h1>
      </header>
      <main className="Dashboard">
        <Time />
        <Metrics />
      </main>
    </div>
  );
}

export default App;
