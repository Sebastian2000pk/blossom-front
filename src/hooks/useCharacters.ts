import { useState, useEffect } from "react";
import { Character } from "../interfaces/character";
import { client } from "../graphql/apolloClient";
import { GET_CHARACTERS } from "../graphql/queries/characters";
import { favoriteService } from "../services/favoriteService";

interface UseCharactersProps {
  species?: string;
  status?: string;
  gender?: string;
  name?: string;
}

export const useCharacters = ({
  species = "",
  status = "",
  gender = "",
  name = "",
}: UseCharactersProps) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      if (species === "All") species = "";
      if (status === "All") status = "";
      if (gender === "All") gender = "";

      try {
        const { data } = await client.query({
          query: GET_CHARACTERS,
          variables: { name, species, status, gender },
        });
        const favorites = favoriteService.getFavorites();
        const dataCharacters = data.characters.map((character: Character) => ({
          ...character,
          favorite: favorites.includes(character.id!.toString()),
        }));
        setCharacters(dataCharacters);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [species, status, gender, name]);

  const addToFavorites = (id: number) => {
    favoriteService.addFavorite(id);
    setCharacters((prevCharacters) =>
      prevCharacters.map((character) =>
        character.id === id ? { ...character, favorite: true } : character
      )
    );
  };

  const removeFromFavorites = (id: number) => {
    favoriteService.removeFavorite(id);
    setCharacters((prevCharacters) =>
      prevCharacters.map((character) =>
        character.id === id ? { ...character, favorite: false } : character
      )
    );
  };

  return {
    characters,
    loading,
    error,
    addToFavorites,
    removeFromFavorites,
  };
};
