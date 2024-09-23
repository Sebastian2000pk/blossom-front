import { useMemo, useState } from "react";
import { useCharacters } from "../hooks/useCharacters";

// Icons
import { ArrowIcon } from "../icons/ArrowIcon";

// Components
import { CharacterItem } from "../components/CharacterItem";
import { SearchBar } from "../components/SerachBar";

export const CharacterList = () => {
  const { characters, addToFavorites, removeFromFavorites } = useCharacters();
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);

  const favorites = useMemo(
    () => characters.filter((character) => character.favorite),
    [characters]
  );

  return (
    <div className=" bg-[#fbfbfb] relative">
      <div className=" h-screen overflow-y-auto py-6 gap-4 px-4 flex flex-col">
        <h1 className="text-2xl font-medium text-[#1F2937]">
          Rick and Morty list
        </h1>

        <div className="">
          <SearchBar openModel={() => setIsOpenFilter(true)} />
          {isOpenFilter && (
            <div className="absolute bg-white w-full h-full border border-[#E5E7EB] md:rounded-md top-0 left-0 z-100 py-2 px-4">
              <button
                className="flex items-center gap-2 hover:bg-[#F3E8FF] px-2 py-1 rounded-full w-10 h-10 active:bg-[#E9D8FD]"
                onClick={() => setIsOpenFilter(false)}
              >
                <ArrowIcon color="#8054C7" />
              </button>
            </div>
          )}
        </div>

        {favorites.length ? (
          <section className="flex flex-col gap-4">
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

        <section className="flex flex-col gap-4">
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
    </div>
  );
};
