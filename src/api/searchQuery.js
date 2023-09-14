import axios from "axios";
import { searchQueryEndpoint } from "../constants";

export default async function searchQuery(searchQuery) {
  try {
    const options = {
      method: "GET",
      url: searchQueryEndpoint,
      params: {
        searchQuery: searchQuery,
      },
    };

    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error.response.data);
  }
}
