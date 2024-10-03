import config from '../config.json'
import { useEffect, useState } from 'react';

const Form = () => {
    const [value, setValue] = useState('')
    var day = new Date(value).getUTCDay();
    if ([6, 0].includes(day)) {
        setValue('')
        alert('Nie możesz wybrać weekendu!');
    }
    return (
        <div className='form'>
            <form action='http://frog01.mikr.us:21339' target='iframe' method='POST'>
                <select name='grupa'>
                    {config.grupy.map(grupa => <option value={grupa.id}>{grupa.nazwa}</option>)}
                </select>
                <select name='przedmiot'>
                    {config.przedmioty.map(przedmiot => <option value={przedmiot.id}>{przedmiot.nazwa}</option>)}
                </select>
                <select name='typ'>
                    {config.typ.map(typ => <option value={typ.id}>{typ.nazwa}</option>)}
                </select>
                <input name='data' id='date' type='date' value={value} onChange={(e) => setValue(e.currentTarget.value)}></input>
                <input name='opis' placeholder='Opis' type='text'></input>
                <button onClick={() => console.log(document.querySelector("#date").value)}>Dodaj</button>
            </form>
            <iframe id='iframe' name='iframe' style={{ display: 'none' }}></iframe>
        </div >
    )
}

export default Form;