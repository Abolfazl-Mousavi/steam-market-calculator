import axios from "axios";

export default async function getCurrencyRatio(from, to) {
  if (from === to) {
    return { rate: 1 };
  }

  const options = {
    method: "GET",
    url: "https://currency-converter241.p.rapidapi.com/conversion_rate",
    params: {
      from: from,
      to: to,
      q: "1.0",
    },
    headers: {
      "X-RapidAPI-Key": `871eaed90amsh3ffdf74ffd98d89p169ee0jsn7af99fe00c1c`,
      "X-RapidAPI-Host": "currency-converter241.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
