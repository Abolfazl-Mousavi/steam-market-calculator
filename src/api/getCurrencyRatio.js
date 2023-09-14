import axios from "axios";
import { currencyExchangeApiKey } from "../constants";

export default async function getCurrencyRatio(from, to) {
  if (from === to) {
    return 1;
  }

  const options = {
    method: "GET",
    url: "https://currency-exchange.p.rapidapi.com/exchange",
    params: {
      from: from,
      to: to,
      q: "1.0",
    },
    headers: {
      "X-RapidAPI-Key": currencyExchangeApiKey,
      "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
