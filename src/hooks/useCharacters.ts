import { useState, useEffect } from "react";
import { Character } from "../interfaces/character";
import { client } from "../graphql/apolloClient";
import { GET_CHARACTERS } from "../graphql/queries/characters";

export const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const { data } = await client.query({
          query: GET_CHARACTERS,
          variables: { name: "" },
        });
        setCharacters(data.characters);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  return { characters, loading, error };
};
