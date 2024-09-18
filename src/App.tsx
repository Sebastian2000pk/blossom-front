import "./App.css";
import { useEffect, useState } from "react";
import type { Character } from "./interfaces/character";
import { HeartIcon } from "./icons/HearIcon";

// Services
import { getCharacters } from "./services/characterServices";
getCharacters();
function App() {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    getCharactersList();
  }, []);

  const getCharactersList = async () => {
    const charactersList = await getCharacters();
    setCharacters(charactersList);
  };

  return (
    <>
      <h1 className="text-3xl font-bold">Rick and Morty list</h1>
      {characters.map((character) => (
        <div key={character.id}>
          <picture>
            <img src={character.image} alt={`Image of ${character.name}`} />
          </picture>
          <div>
            <p>{character.name}</p>
            <p>{character.species}</p>
          </div>
          <span>
            <HeartIcon filled={false} color="gray" />
          </span>
        </div>
      ))}
    </>
  );
}

export default App;
