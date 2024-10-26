const Fetch = async (dataOd, dataDo) => {
  const bodyString = `dataOd=${dataOd}&dataDo=${dataDo}`;
  // console.log(bodyString);
  try {
      const res = await fetch(`http://frog01.mikr.us:21339/?${bodyString}`);
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const data = await res.json();

      return data;
  } catch (error) {
      console.log('Error:', error);
      return [{ "grupa": "error", "przedmiot": "", "typ": "", "data": "", "opis": `Serwer niedostępny: ${error.message}` }];
  }
};

export default Fetch;