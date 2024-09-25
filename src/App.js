import './App.css';
import Form from "./components/Form"
import { useState } from 'react';
import Table from './components/Table';

function App() {
  const [screen, setScreen] = useState("today");
  var component
  switch (screen) {
    case "today":
      component = <Table zakres="today" />
      break;
    case "week":
      component = <Table zakres="week" />
      break;
    case "all":
      component = <Table zakres="all" />
      break;
    default:
      break;
  }
  return (
    <div className="App">
      <Form />
      <br></br>
      <div className='buttons'>
        <button className={screen == "today" ? "btnActive" : ""} onClick={() => setScreen("today")}>Na dzisiaj / jutro</button>
        <button className={screen == "week" ? "btnActive" : ""} onClick={() => setScreen("week")}>Na ten tydzień</button>
        <button className={screen == "all" ? "btnActive" : ""} onClick={() => setScreen("all")}>Wszystko</button>
      </div>
      {component}
    </div>
  );
}

export default App;
