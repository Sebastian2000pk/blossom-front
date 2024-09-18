import axios from "axios";
import { API_URL } from "../config";

export const getCharacters = async () => {
  try {
    const response = await axios.post(`${API_URL}/graphql`, {
      query: `{
        characters(name: "") {
          name
          id
          species
          image
        }
      }`,
    });

    return response.data.data.characters;
  } catch (error) {
    console.error(error);
  }
};
