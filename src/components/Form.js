import '../styles/Form.css'
import config from '../config.json'
import { useState } from 'react';
import password_hide from '../images/password_hide.svg'
import password_show from '../images/password_show.svg'

const Form = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [grupa, setGrupa] = useState('');
  const [przedmiot, setPrzedmiot] = useState('');
  const [typ, setTyp] = useState('');
  const [data, setData] = useState('');
  const [opis, setOpis] = useState('');
  const [haslo, setHaslo] = useState('');

  var day = new Date(data).getUTCDay();
  if ([6, 0].includes(day)) {
    setData('')
    alert('Nie możesz wybrać weekendu!');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const bodyString = `${haslo}\n&grupa=${grupa}&przedmiot=${przedmiot}&typ=${typ}&data=${data}&opis=${opis}`
    console.log(bodyString)
    fetch('http://frog01.mikr.us:21339', {
      method: 'POST',
      body: bodyString
    }).then(response => console.log('Success:', response.json()))
      .then(result => console.log('Success:', result))
      .catch(error => console.error('Error:', error));
    //window.location.reload()
  };

  return (
    <details className="dodaj">
      <summary>DODAJ</summary>
      <div className='details'>
        <div>
          <form onSubmit={handleSubmit}>
            <div className='form'>
              <div className="nice-form-group">
                <label>Wybierz grupę</label>
                <select className='grupa' value={grupa} onChange={(e) => setGrupa(e.target.value)} required>
                  <option value='' hidden disabled></option>
                  {config.grupy.map(grupa => <option value={grupa.id}>{grupa.nazwa}</option>)}
                </select>
              </div>
              <div className="nice-form-group">
                <label>Wybierz przedmiot</label>
                <select className='przedmiot' value={przedmiot} onChange={(e) => setPrzedmiot(e.target.value)} required>
                <option value='' hidden disabled></option>
                  {config.przedmioty.map(przedmiot => <option value={przedmiot.id}>{przedmiot.nazwa}</option>)}
                </select>
              </div>
              <div className="nice-form-group">
                <label>Wybierz typ</label>
                <select className='typ' value={typ} onChange={(e) => setTyp(e.target.value)} required>
                <option value='' hidden disabled></option>
                  {config.typ.map(typ => <option value={typ.id}>{typ.nazwa}</option>)}
                </select>
              </div>
              <div className="nice-form-group">
                <label>Wybierz datę</label>
                <input
                  type='date'
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  required
                />
              </div>
              <div className="nice-form-group">
                <label>Dodaj opis</label>
                <textarea
                  className='opis'
                  rows="3"
                  value={opis}
                  onChange={(e) => setOpis(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="nice-form-group">
                <label>Podaj hasło</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={haslo}
                  onChange={(e) => setHaslo(e.target.value)}
                  className='icon-left password'
                  required
                />
                <div className="input-group-append">
                  <span className="input-group-text" onClick={() => setShowPassword(e => !e)}>
                    <img width={20} height={20} src={password_hide} className={showPassword ? 'password_hide' : 'password_show'}></img>
                    <img width={20} height={20} src={password_show} className={showPassword ? 'password_show' : 'password_hide'}></img>
                  </span>
                </div>
              </div>
              <br />
              <button type="submit" className='btn'>Dodaj</button>
            </div>
          </form>
        </div>
      </div>
    </details>
  );
}

export default Form;