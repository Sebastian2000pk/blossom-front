import "./App.css";
import { HeartIcon } from "./icons/HearIcon";
import { useCharacters } from "./hooks/useCharacters";

function App() {
  const { characters } = useCharacters();

  return (
    <div className="px-4">
      <h1 className="text-2xl font-bold text-[#1F2937]">Rick and Morty list</h1>

      <h3 className="text-[#6B7280] font-semibold">
        Characters ({characters.length})
      </h3>
      {characters.map((character) => (
        <div
          key={character.id}
          className="flex items-center justify-between gap-4 px-4 py-2 border-t border-[#E5E7EB] cursor-pointer hover:bg-[#F3F4F6] transition-all duration-300 ease-in-out"
        >
          <picture className="w-10 h-10 overflow-hidden">
            <img
              src={character.image}
              alt={`Image of ${character.name}`}
              className="w-full h-full object-cover rounded-full"
            />
          </picture>
          <div className="flex-grow">
            <p className="text-[#111827] font-semibold">{character.name}</p>
            <p className="text-[#6B7280]">{character.species}</p>
          </div>
          <span>
            <HeartIcon filled={false} color="#D1D5DB" />
          </span>
        </div>
      ))}
    </div>
  );
}

export default App;
