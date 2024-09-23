import { useMemo, useState } from "react";
import { useCharacters } from "../hooks/useCharacters";

// Icons
import { ArrowIcon } from "../icons/ArrowIcon";

// Components
import { CharacterItem } from "../components/CharacterItem";
import { SearchBar } from "../components/SerachBar";
import { SwitchButtons } from "../components/SwitchButtons";
import { Button } from "../components/Button";

const SPECIE: string[] = ["All", "Human", "Alien"];
const STATUS: string[] = ["All", "Alive", "Dead", "unknown"];
const GENDER: string[] = ["All", "Female", "Male", "unknown"];

export const CharacterList = () => {
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);
  const [specie, setSpecie] = useState<string>("All");
  const [status, setStatus] = useState<string>("All");
  const [gender, setGender] = useState<string>("All");

  const { characters, addToFavorites, removeFromFavorites } = useCharacters({
    species: specie,
    status,
    gender,
  });

  const favorites = useMemo(
    () => characters.filter((character) => character.favorite),
    [characters]
  );

  const handleFilter = () => {
    setIsOpenFilter(false);
  };

  return (
    <div className=" bg-[#fbfbfb] relative">
      <div className=" h-screen overflow-y-auto py-6 gap-4 px-4 flex flex-col">
        <h1 className="text-2xl font-medium text-[#1F2937]">
          Rick and Morty list
        </h1>

        <div className="">
          <SearchBar openModel={() => setIsOpenFilter(true)} />
          {isOpenFilter && (
            <div className="flex flex-col absolute bg-white w-full h-full border border-[#E5E7EB] md:rounded-md top-0 left-0 z-100 py-2 px-4">
              <header className="flex items-center">
                <button
                  className="flex items-center gap-2 hover:bg-[#F3E8FF] px-2 py-1 rounded-full w-10 h-10 active:bg-[#E9D8FD]"
                  onClick={() => setIsOpenFilter(false)}
                >
                  <ArrowIcon color="#8054C7" />
                </button>
                <h4 className="text-md font-medium w-full text-center pr-10">
                  Filters
                </h4>
              </header>

              <div className="p-2">
                <section className="flex flex-col gap-2">
                  <h4 className="text-md font-medium text-[#374151]">Specie</h4>
                  <SwitchButtons
                    items={SPECIE}
                    value={specie}
                    onChange={setSpecie}
                  />
                </section>
                <section>
                  <h4 className="text-md font-medium text-[#374151]">Status</h4>
                  <SwitchButtons
                    items={STATUS}
                    value={status}
                    onChange={setStatus}
                  />
                </section>
                <section>
                  <h4 className="text-md font-medium text-[#374151]">Gender</h4>
                  <SwitchButtons
                    items={GENDER}
                    value={gender}
                    onChange={setGender}
                  />
                </section>
              </div>

              <footer className="mt-auto flex flex-col mb-3">
                <Button label="Filter" onClick={handleFilter} />
              </footer>
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
