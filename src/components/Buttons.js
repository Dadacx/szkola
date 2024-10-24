import { useRef } from 'react';
import '../styles/Buttons.css'

const Buttons = (props) => {
  const dataOd = useRef(null)
  const dataDo = useRef(null)

  function handleClick() {
    console.log(dataOd.current.value, dataDo.current.value)
  }
  return (
    <>
      <div className='buttons'>
        <button className={props.screen == "today" ? "btnActive btn" : "btn"} onClick={() => props.setScreen("today")}>Na dzisiaj / jutro</button>
        <button className={props.screen == "week" ? "btnActive btn" : "btn"} onClick={() => props.setScreen("week")}>Na ten tydzień</button>
        <button className={props.screen == "all" ? "btnActive btn" : "btn"} onClick={() => props.setScreen("all")}>Wszystko</button>
      </div>
      <span className='range_text'>Wybierz zakres</span>
      <div className='range'>
        <div className="nice-form-group">
          <input
            type='date'
            ref={dataOd}
          />
        </div>
        <span className='minus'>-</span>
        <div className="nice-form-group">
          <input
            type='date'
            ref={dataDo}
          />
        </div>
        <button className='btn btn-accept' onClick={handleClick}>Potwierdź</button>
      </div>
    </>
  );
}

export default Buttons;
