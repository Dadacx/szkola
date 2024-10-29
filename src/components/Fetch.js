const Fetch = async (dataOd, dataDo) => {
  const bodyString = `dataOd=${dataOd}&dataDo=${dataDo}`;
  // console.log(bodyString);
  try {
      const res = await fetch(`https://frog01-21339.wykr.es/?${bodyString}`);
      //if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      var data = await res.json();
      if (!res.ok) data[0].opis = `[ERROR ${res.status} ${res.statusText}]: ${data[0].opis}`

      return data;
  } catch (error) {
      console.log('Error:', error);
      return [{ "typ": "error", "opis": `[ERROR: ${error.message}] Serwer jest niedostępny` }];
  }
};

export default Fetch;