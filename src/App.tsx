import "./App.css";
import { useCharacters } from "./hooks/useCharacters";

// Components
import { CharacterItem } from "./components/CharacterItem";

function App() {
  const { characters, addToFavorites, removeFromFavorites } = useCharacters();

  return (
    <div className="px-4">
      <h1 className="text-2xl font-bold text-[#1F2937]">Rick and Morty list</h1>

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
    </div>
  );
}

export default App;
