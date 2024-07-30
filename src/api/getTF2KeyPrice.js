import axios from "axios";
import SteamSupportedCurrencys from "../constants/SteamSupportedCurrencys";

export default async function getTF2KeyPrice(currency) {
  try {
    const apiUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
      `https://steamcommunity.com/market/priceoverview/?currency=${findCurrencyIdWithAcronym(
        currency
      )}&appid=440&market_hash_name=Mann%20Co.%20Supply%20Crate%20Key`
    )}`;
    const response = await axios.get(apiUrl);

    return JSON.parse(response.data.contents);
  } catch (error) {
    console.error(error.response.data);
  }
}
const findCurrencyIdWithAcronym = (currencyAcronym) => {
  if (currencyAcronym == null) {
    return "USD";
  }

  const filteredItem = SteamSupportedCurrencys.find(
    (currency) => currency.acronym === currencyAcronym
  );

  return filteredItem ? filteredItem.id : "1";
};
