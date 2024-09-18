import { useMemo } from "react";
import { useCharacters } from "../hooks/useCharacters";

// Components
import { CharacterItem } from "../components/CharacterItem";

export const Sidebar = () => {
  const { characters, addToFavorites, removeFromFavorites } = useCharacters();

  const favorites = useMemo(
    () => characters.filter((character) => character.favorite),
    [characters]
  );

  return (
    <div className="px-4 flex flex-col gap-4 bg-[#fbfbfb]">
      <h1 className="text-2xl font-bold text-[#1F2937]">Rick and Morty list</h1>

      {favorites.length ? (
        <section>
          <h3 className="text-[#6B7280] font-semibold">
            Starred Characters ({favorites.length})
          </h3>
          {favorites.length &&
            favorites.map((character) => (
              <CharacterItem
                key={character.id}
                character={character}
                addFavorite={addToFavorites}
                removeFavorite={removeFromFavorites}
              />
            ))}
        </section>
      ) : null}

      <section>
        <h3 className="text-[#6B7280] font-semibold">
          Characters ({characters.length})
        </h3>
        {characters.map((character) => (
          <CharacterItem
            key={character.id}
            character={character}
            addFavorite={addToFavorites}
            removeFavorite={removeFromFavorites}
          />
        ))}
      </section>
    </div>
  );
};
