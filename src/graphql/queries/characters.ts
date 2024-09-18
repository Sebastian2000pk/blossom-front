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

export const GET_CHARACTER = gql`
  query character($id: ID!) {
    character(id: $id) {
      name
      status
      species
      image
      gender
    }
  }
`;
