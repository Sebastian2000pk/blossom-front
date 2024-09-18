import { useState, useEffect } from "react";
import { Character } from "../interfaces/character";
import { client } from "../graphql/apolloClient";
import { GET_CHARACTER } from "../graphql/queries/characters";

export const useCharacter = (id: string) => {
  const [data, setData] = useState<Character>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const { data } = await client.query({
          query: GET_CHARACTER,
          variables: { id },
        });

        setData(data.character);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [id]);

  return {
    data,
    loading,
    error,
  };
};
