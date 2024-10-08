import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useCharacters } from "../hooks/useCharacters";

// Icons
import { ArrowIcon } from "../icons/ArrowIcon";

// Components
import { CharacterItem } from "../components/CharacterItem";
import { SearchBar } from "../components/SerachBar";
import { SwitchButtons } from "../components/SwitchButtons";
import { Button } from "../components/Button";
import { Tag } from "../components/Tag";

const SPECIE: string[] = ["All", "Human", "Alien"];
const STATUS: string[] = ["All", "Alive", "Dead", "unknown"];
const GENDER: string[] = ["All", "Female", "Male", "unknown"];

export const CharacterList = () => {
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>("");
  const [specie, setSpecie] = useState<string>("All");
  const [status, setStatus] = useState<string>("All");
  const [gender, setGender] = useState<string>("All");

  const { characters, addToFavorites, removeFromFavorites } = useCharacters({
    species: specie,
    status,
    gender,
    name: search,
  });

  const favorites = useMemo(
    () => characters.filter((character) => character.favorite),
    [characters]
  );

  const loadQueryParams = () => {
    const species = searchParams.get("species");
    const status = searchParams.get("status");
    const gender = searchParams.get("gender");
    const search = searchParams.get("search");

    if (species) {
      setSpecie(species);
    }
    if (status) {
      setStatus(status);
    }
    if (gender) {
      setGender(gender);
    }
    if (search) {
      setSearch(search);
    }
  };

  const updateQueryParams = () => {
    if (specie !== "All") {
      searchParams.set("species", specie);
    } else {
      searchParams.delete("species");
    }

    if (status !== "All") {
      searchParams.set("status", status);
    } else {
      searchParams.delete("status");
    }

    if (gender !== "All") {
      searchParams.set("gender", gender);
    } else {
      searchParams.delete("gender");
    }

    setSearchParams(searchParams);
  };

  const handleFilter = () => {
    setIsOpenFilter(false);
    updateQueryParams();
  };

  const saveSearchParam = () => {
    if (search !== "") {
      searchParams.set("search", search);
    } else {
      searchParams.delete("search");
    }

    setSearchParams(searchParams);
  };

  useEffect(() => {
    loadQueryParams();
  }, []);

  const filterCount = useMemo(() => {
    return [specie, status, gender].filter((item) => item !== "All").length;
  }, [specie, status, gender]);

  return (
    <div className="bg-[#fbfbfb] relative">
      <div className=" h-screen overflow-y-auto py-6 gap-4 px-4 flex flex-col">
        <h1 className="text-2xl font-medium text-[#1F2937]">
          Rick and Morty list
        </h1>

        <div className="md:relative">
          <SearchBar
            openModel={() => setIsOpenFilter(true)}
            onChange={setSearch}
            value={search}
            onBlur={saveSearchParam}
          />
          {isOpenFilter && (
            <div className="flex flex-col absolute bg-white w-full h-full md:h-auto border border-[#E5E7EB] md:rounded-md top-0 left-0 z-100 py-2 px-4 md:top-11">
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

        {Boolean(filterCount) && (
          <div className="flex justify-end gap-2">
            <Tag>
              {filterCount} Filter{filterCount > 1 ? "s" : ""}
            </Tag>
          </div>
        )}

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
