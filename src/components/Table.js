import Fetch from './Fetch';
import testData from '../testData.json'
import SetName from './SetName';
function date_format(date) {
    const data = new Date(date)

    var days = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"]
    var day = data.getDate()
    var month = data.getMonth() + 1
    var year = data.getFullYear()
    var week_day = data.getDay()

    if (day < 10)
        day = "0" + day;
    if (month < 10)
        month = "0" + month;
    return `${days[week_day]}, ${day}.${month}.${year}`
}
function isToday(date) {
    const aktualna_data = new Date()
    const data = new Date(date)
    //jtr
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (aktualna_data.toDateString() === data.toDateString() || tomorrow.toDateString() === data.toDateString()) {
        return true
    }
    return false
}
function isWeek(date) {
    const todayObj = new Date();
    const todayDate = todayObj.getDate();
    const todayDay = todayObj.getDay();

    // get first date of week
    const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));

    // get last date of week
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 8);

    // if date is equal or within the first and last dates of the week
    return date >= firstDayOfWeek && date <= lastDayOfWeek;
}
const Table = (props) => {
    let data = Fetch()
    //let data = testData
    const filteredData = data.filter(data => {
        if (props.zakres === "today" && isToday(data.data)) return true;
        if (props.zakres === "week" && isWeek(new Date(data.data))) return true;
        if (props.zakres === "all") return true;
        return false;
    });
    return (
        <div className='tableBox'>
            <table className='table'>
                <tbody>
                    <tr><th>Grupa</th><th>Przedmiot</th><th>Typ</th><th>Opis</th><th>Data</th></tr>
                    {filteredData.length > 0 ? (
                        filteredData.map((dataItem, index) => (
                            <tr key={index}>
                                <td>{SetName("grupy", dataItem.grupa)}</td>
                                <td>{SetName("przedmioty", dataItem.przedmiot)}</td>
                                <td>{SetName("typ", dataItem.typ)}</td>
                                <td>{dataItem.opis}</td>
                                <td>{date_format(dataItem.data)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center' }}>Nie ma nic do nauki w tym okresie</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

        /*<table>
        <tr><th>Grupa</th><th>Przedmiot</th><th>Typ</th><th>Opis</th><th>Data</th></tr>
        {data.map(data => <tr><td>{config.grupy.find(x => data.grupa == x.id).nazwa}</td><td>{config.przedmioty.find(x => data.przedmiot == x.id).nazwa}</td><td>{config.typ.find(x => data.typ == x.id).nazwa}</td><td>{data.opis}</td><td>{data.data}</td></tr>)}
        </table>*/
    );
};
export default Table;