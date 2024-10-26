import { useRef } from 'react';
import '../styles/Buttons.css'

const Buttons = (props) => {

  return (
    <div className='buttons'>
      <button className={props.screen == "past" ? "btnActive btn" : "btn"} onClick={() => props.setScreen("past")}>Pokaż starsze</button>
      <button className={props.screen == "today" ? "btnActive btn" : "btn"} onClick={() => props.setScreen("today")}>Na dzisiaj / jutro</button>
      <button className={props.screen == "week" ? "btnActive btn" : "btn"} onClick={() => props.setScreen("week")}>Na ten tydzień</button>
      <button className={props.screen == "all" ? "btnActive btn" : "btn"} onClick={() => props.setScreen("all")}>Wszystko</button>
    </div>
  );
}

export default Buttons;
