import './styles/App.css';
import Form from "./components/Form"
import { useState } from 'react';
import Table from './components/Table';
import PlanLekcji from './components/PlanLekcji';
import Buttons from './components/Buttons'

function App() {
  const [screen, setScreen] = useState("today");
  var table
  switch (screen) {
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
      <Form />
      <PlanLekcji />
      <br></br>
      <Buttons screen={screen} setScreen={setScreen} />
      {table}
    </div>
  );
}

export default App;
