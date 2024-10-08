import '../styles/Form.css'
import config from '../config.json'
import { useState } from 'react';

const Form = () => {
    const [value, setValue] = useState('')
    var day = new Date(value).getUTCDay();
    if ([6, 0].includes(day)) {
        setValue('')
        alert('Nie możesz wybrać weekendu!');
    }
    return (
        <form action='http://frog01.mikr.us:21339' target='iframe' method='POST'>
            <div className='form'>
                <div className="nice-form-group">
                    <label>Wybierz grupe</label>
                    <select name='grupa'>
                        {config.grupy.map(grupa => <option value={grupa.id}>{grupa.nazwa}</option>)}
                    </select>
                </div>
                <div className="nice-form-group">
                    <label>Wybierz przedmiot</label>
                    <select name='przedmiot'>
                        {config.przedmioty.map(przedmiot => <option value={przedmiot.id}>{przedmiot.nazwa}</option>)}
                    </select>
                </div>
                <div class="nice-form-group">
                    <label>Text</label>
                    <input type="text" placeholder="Your name" value="" />
                </div>
                <div className="nice-form-group">
                    <label>Wybierz typ</label>
                    <select name='typ'>
                        {config.typ.map(typ => <option value={typ.id}>{typ.nazwa}</option>)}
                    </select>
                </div>
                <div className="nice-form-group">
                    <label>Wybierz date</label>
                    <input name='data' id='date' type='date' value={value} onChange={(e) => setValue(e.currentTarget.value)}></input>
                </div>
                <div className="nice-form-group">
                    <label>Dodaj opis</label>
                    <textarea name='opis' rows="3"></textarea>
                </div>
                <div className="nice-form-group">
                    <label>Podaj hasło</label>
                    <input type="password" className="icon-left" />
                </div>
                <button onClick={() => console.log(document.querySelector("#date").value)}>Dodaj</button>
            </div >
            <iframe id='iframe' name='iframe' style={{ display: 'none' }}></iframe>
        </form>
    )
}

export default Form;