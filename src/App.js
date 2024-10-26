import './styles/App.css';
import Form from "./components/Form"
import { useState } from 'react';
import Table from './components/Table';
import PlanLekcji from './components/PlanLekcji';
import Buttons from './components/Buttons'
import ThemeSwitch from './components/ThemeSwitch';

function App() {
  const [screen, setScreen] = useState("today");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")
  document.querySelector("body").setAttribute("data-theme", theme)
  var table
  switch (screen) {
    case "past":
      table = <Table zakres="past" />
      break;
    case "today":
      table = <Table zakres="today" />
      break;
    case "week":
      table = <Table zakres="week" />
      break;
    case "all":
      table = <Table zakres="all" />
      break;
    default:
      break;
  }
  return (
    <div className="App">
      <ThemeSwitch theme={theme} setTheme={setTheme} />
      <Form />
      <PlanLekcji />
      <br></br>
      <Buttons screen={screen} setScreen={setScreen} />
      {table}
    </div>
  );
}

export default App;
