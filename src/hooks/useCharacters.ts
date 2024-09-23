import { useState, useEffect } from "react";
import { Character } from "../interfaces/character";
import { client } from "../graphql/apolloClient";
import { GET_CHARACTERS } from "../graphql/queries/characters";
import { favoriteService } from "../services/favoriteService";

interface UseCharactersProps {
  species?: string;
}

export const useCharacters = ({ species = "" }: UseCharactersProps) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        if (species === "All") species = "";
        const { data } = await client.query({
          query: GET_CHARACTERS,
          variables: { name: "", species },
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
  }, [species]);

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
