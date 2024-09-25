import { useState, useEffect } from 'react';
import Table from "./Table"
const Fetch = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('http://frog01.mikr.us:21339')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);
  return data
};
export default Fetch;