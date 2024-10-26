const Fetch = async (dataOd, dataDo) => {
  const bodyString = `dataOd=${dataOd}&dataDo=${dataDo}`;
  // console.log(bodyString);
  try {
      const res = await fetch(`http://frog01.mikr.us:21339/?${bodyString}`);
      //if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      var data = await res.json();
      if (!res.ok) data[0].opis = `[ERROR ${res.status} ${res.statusText}]: ${data[0].opis}`

      return data;
  } catch (error) {
      console.log('Error:', error);
      return [{ "grupa": "error", "przedmiot": "", "typ": "", "data": "", "opis": `[ERROR ${error.message}] Serwer jest niedostępny` }];
  }
};

export default Fetch;