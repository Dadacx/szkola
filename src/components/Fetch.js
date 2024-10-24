import { useState, useEffect } from 'react';
const Fetch = () => {
  const [data, setData] = useState([]);
  const dataOd = new Date().toISOString()
  const dataDo = new Date()
  dataDo.setMonth(dataDo.getMonth() + 2)
  useEffect(() => {
    const bodyString = `dataOd=${dataOd}&dataDo=${dataDo.toISOString()}`
    // console.log(bodyString)
    fetch(`http://frog01.mikr.us:21339?${bodyString}`)
      .then(async (res) => {
        return res.json()
      })
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch(error => {console.error('Error:', error)
        setData([{"grupa":"error","przedmiot":"","typ":"","data":"","opis":"serwer is kaput"}])
      })
  }, []);
  return data
};
export default Fetch;