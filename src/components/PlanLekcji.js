import plan_lekcji from '../PlanLekcji.json';
import SetName from './SetName';

function genTD(items, i) {
    // Filtrujemy lekcje dla odpowiedniej godziny (nr === i+1)
    const filteredItems = items.filter(item => item.nr === i + 1);
    
    // Mapujemy każdy przedmiot na string i dołączamy znaczniki <br> dla nowych linii
    return filteredItems.map(item => `
        ${item.grupa !== "" ? SetName("grupy", item.grupa) + ": " : ""}
        ${SetName("przedmioty", item.przedmiot)} 
        <b>${item.sala}</b>`).join('<br>');
}

const PlanLekcji = () => {
    return (
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
                        const hasLessons = ['poniedzialek', 'wtorek', 'sroda', 'czwartek', 'piatek'].some(day =>
                            plan_lekcji[day].some(item => item.nr === i + 1)
                        );

                        // Jeśli nie ma lekcji w żadnym dniu dla tej godziny, pomijamy ten wiersz
                        if (!hasLessons) {
                            return null;
                        }

                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{g}</td>
                                <td dangerouslySetInnerHTML={{ __html: genTD(plan_lekcji.poniedzialek, i) }}></td>
                                <td dangerouslySetInnerHTML={{ __html: genTD(plan_lekcji.wtorek, i) }}></td>
                                <td dangerouslySetInnerHTML={{ __html: genTD(plan_lekcji.sroda, i) }}></td>
                                <td dangerouslySetInnerHTML={{ __html: genTD(plan_lekcji.czwartek, i) }}></td>
                                <td dangerouslySetInnerHTML={{ __html: genTD(plan_lekcji.piatek, i) }}></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default PlanLekcji;
