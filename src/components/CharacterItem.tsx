import { Character } from "../interfaces/character";
import { HeartIcon } from "../icons/HearIcon";

interface CharacterItemProps {
  character: Character;
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
}

export const CharacterItem = ({
  character,
  addFavorite,
  removeFavorite,
}: CharacterItemProps) => {
  const handleFavorite = () => {
    if (character.favorite) {
      removeFavorite(character.id!);
    } else {
      addFavorite(character.id!);
    }
  };
  return (
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
      <button onClick={handleFavorite}>
        <HeartIcon
          filled={Boolean(character.favorite)}
          color={Boolean(character.favorite) ? "#53C629" : "#D1D5DB"}
        />
      </button>
    </div>
  );
};
