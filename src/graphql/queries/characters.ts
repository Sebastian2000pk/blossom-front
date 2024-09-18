import { gql } from "@apollo/client";

// Define la consulta para obtener personajes
export const GET_CHARACTERS = gql`
  query characters($name: String!) {
    characters(name: $name) {
      name
      id
      species
      image
    }
  }
`;
