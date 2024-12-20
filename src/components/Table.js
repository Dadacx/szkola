import { useState, useEffect } from 'react';
import Fetch from './Fetch';
import testData from '../testData.json'
import SetName from './SetName';
import { SortAsc, SortDesc, Sortable } from './SortIndicators';

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
function isPast(date) {
    const aktualna_data = new Date()
    const data = new Date(date)
    if ((data.getTime() - aktualna_data.getTime()) < 0 && data.getDate() != aktualna_data.getDate()) {
        return true
    }
    return false
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
    const today = new Date()
    const next7Days = new Date()
    next7Days.setDate(next7Days.getDate() + 7)

    return date >= today && date <= next7Days;
}
function getSchoolYear() {
    const date = new Date()
    if ((date.getMonth() + 1) >= 9) return date.getFullYear()
    else return date.getFullYear() - 1
}
const Table = ({ zakres }) => {
    const [data, setData] = useState(null);
    const [sortMethod, setSortMethod] = useState('asc');
    const [lastSortedColumn, setLastSortedColumn] = useState(null);
    var useEffectController = 'past'
    zakres === 'past' ? useEffectController = 'past' : useEffectController = 'present'
    useEffect(() => {
        setData(null)
        console.log('useEffect')
        const fetchData = async () => {
            const dataOd = zakres === 'past'
                ? new Date(getSchoolYear() + '-09-01').toISOString()
                : new Date().toISOString();
            const dataDo = new Date();
            if (zakres !== 'past') dataDo.setMonth(dataDo.getMonth() + 2);
            const dataDoString = dataDo.toISOString();

            const fetchedData = await Fetch(dataOd, dataDoString);
            fetchedData.sort((a, b) => new Date(a.data) - new Date(b.data))
            setData(fetchedData);
        };
        fetchData();
        setLastSortedColumn('data')
    }, [useEffectController]);

    const sortTable = (column) => {
        const sortedData = [...data];
        const isSameColumn = lastSortedColumn === column;

        const newSortMethod = isSameColumn && sortMethod === 'asc' ? 'desc' : 'asc';
        setSortMethod(newSortMethod);
        setLastSortedColumn(column);

        const error = sortedData[0].grupa === 'error' ? sortedData.splice(0, 1) : null
        sortedData.sort((a, b) => {
            const aValue = a[column];
            const bValue = b[column];
            return newSortMethod === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        });
        if (error !== null) sortedData.unshift(error[0])
        setData(sortedData);
    };

    const getSortIndicator = (column) => {
        if (lastSortedColumn === column) {
            return sortMethod === 'asc'
                ? <SortAsc width='16' height='16' color="white" onClick={() => sortTable(column)} />
                : <SortDesc width='16' height='16' color="white" onClick={() => sortTable(column)} />
        }
        return <Sortable width='16' height='16' color="white" onClick={() => sortTable(column)} />;
    };
    var filteredData;
    if (data) {
        filteredData = data.filter(data => {
            if (zakres === "past" && isPast(data.data)) return true;
            if (zakres === "today" && isToday(data.data)) return true;
            if (zakres === "week" && isWeek(new Date(data.data))) return true;
            if (zakres === "all") return true;
            return false;
        })
    }

    const isError = data && data[0].typ === 'error'

    return (
        <div className='tableBox'>
            <table className='table' id='table'>
                <thead>
                    <tr>
                        <th>Grupa {getSortIndicator('grupa')}</th>
                        <th>Przedmiot {getSortIndicator('przedmiot')}</th>
                        <th>Typ {getSortIndicator('typ')}</th>
                        <th>Opis</th>
                        <th>Data {getSortIndicator('data')}</th>
                    </tr>
                </thead>
                <tbody>
                    {!data ? (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center', color: 'red' }}><div className="loader"></div></td>
                        </tr>
                    ) : null}
                    {isError ? (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center', color: 'red' }}>{data[0].opis}</td>
                        </tr>
                    ) : null}
                    {data && filteredData.length > 0 ? (
                        filteredData.map((dataItem, index) => (
                            !(isError && index === 0) && (
                                <tr key={index}>
                                    <td data-label="Grupa">{SetName("grupy", dataItem.grupa)}</td>
                                    <td data-label="Przedmiot">{SetName("przedmioty", dataItem.przedmiot)}</td>
                                    <td data-label="Typ">{SetName("typ", dataItem.typ)}</td>
                                    <td data-label="Opis">{dataItem.opis}</td>
                                    <td data-label="Data">{date_format(dataItem.data)}</td>
                                </tr>
                            )
                        ))
                    ) : (!isError && data) && (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center' }}>Nie ma nic do nauki w tym okresie</td>
                        </tr>
                    )
                    }
                </tbody>
            </table>
        </div>
    );
};
export default Table;