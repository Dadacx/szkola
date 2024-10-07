import plan_lekcji from '../PlanLekcji.json';
import SetName from './SetName';
import { useState } from 'react';

function genTD(items, i, gr) {
    // Filtrujemy lekcje dla odpowiedniej godziny (nr === i+1)
    const filteredItems = items.filter(item => item.nr === i + 1 && (item.grupa === gr || item.grupa === ''));

    // Mapujemy każdy przedmiot na string i dołączamy znaczniki <br> dla nowych linii
    return filteredItems.map(item => <>
        {SetName("przedmioty", item.przedmiot)} <b>{item.sala}</b>
    </>);
}

const PlanLekcji = () => {
    const [gr, setGr] = useState(localStorage.getItem('gr') || 'gr1')

    function toggleGr(e) {
        if (e.target.checked === true) {
            setGr('gr2')
            localStorage.setItem('gr', 'gr2')
        } else {
            setGr('gr1')
            localStorage.setItem('gr', 'gr1')
        }
    }
    return (
        <details className="plan_lekcji">
            <summary>PLAN LEKCJI</summary>
            <div className='details'>
                <div>
                <label className="toggler-wrapper style-15">
                    <input type="checkbox" checked={gr === 'gr1' ? false : true} onChange={toggleGr} />
                    <div className="toggler-slider">
                        <div className="toggler-knob"></div>
                    </div>
                </label>
                <div className='tableBox'>
                    <table>
                        <thead>
                            <tr>
                                <th>Nr</th>
                                <th>Godzina</th>
                                <th>Poniedziałek</th>
                                <th>Wtorek</th>
                                <th>Środa</th>
                                <th>Czwartek</th>
                                <th>Piątek</th>
                            </tr>
                        </thead>
                        <tbody>
                            {plan_lekcji.godziny.map((g, i) => {
                                // Sprawdzamy, czy dla tej godziny są lekcje w którymkolwiek dniu
                                const hasLessons = ['poniedzialek', 'wtorek', 'sroda', 'czwartek', 'piatek'].some(day => plan_lekcji[day].some(item => item.nr === i + 1 && item.grupa === gr)
                                );

                                // Jeśli nie ma lekcji w żadnym dniu dla tej godziny, pomijamy ten wiersz
                                if (!hasLessons) {
                                    return null;
                                }

                                return (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{g}</td>
                                        <td>{genTD(plan_lekcji.poniedzialek, i, gr)}</td>
                                        <td>{genTD(plan_lekcji.wtorek, i, gr)}</td>
                                        <td>{genTD(plan_lekcji.sroda, i, gr)}</td>
                                        <td>{genTD(plan_lekcji.czwartek, i, gr)}</td>
                                        <td>{genTD(plan_lekcji.piatek, i, gr)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
        </details>
    );
}

export default PlanLekcji;
