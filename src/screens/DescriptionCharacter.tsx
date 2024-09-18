import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCharacter } from "../hooks/useCharacter";

// Icons
import { ArrowIcon } from "../icons/ArrowIcon";

export const DescriptionCharacter = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useCharacter(id!);

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    // que sea casi como un modal, como esas pantallas de detalles que se abren desde abajo sobrepuestar como un modal
    <div className="flex flex-col gap-8 py-2 px-4 w-full absolute md:relative bottom-0 z-10 bg-white h-full">
      <button
        className="flex items-center gap-2 hover:bg-[#F3E8FF] px-2 py-1 rounded-full w-10 h-10 active:bg-[#E9D8FD]"
        onClick={handleGoBack}
      >
        <ArrowIcon color="#8054C7" />
      </button>

      <header className="flex flex-col items-center gap-4">
        <picture className="w-24 h-24 overflow-hidden rounded-full">
          <img
            src={data?.image}
            className="w-full h-full object-cover"
            alt={data?.name}
          />
        </picture>

        <h2 className="text-2xl font-bold">{data?.name}</h2>
      </header>

      <ul className="flex flex-col gap-4 w-full max-w-lg items-center mx-auto">
        <li className="border-b border-[#D1D5DB] w-full py-2">
          <h4 className="text-lg font-semibold text-[#111827]">Specie</h4>
          <p className="text-[#6B7280]">{data?.species}</p>
        </li>
        <li className="border-b border-[#D1D5DB] w-full py-2">
          <h4 className="text-lg font-semibold text-[#111827]">Status</h4>
          <p className="text-[#6B7280]">{data?.status}</p>
        </li>
        <li className="border-b border-[#D1D5DB] w-full py-2">
          <h4 className="text-lg font-semibold text-[#111827]">gender</h4>
          <p className="text-[#6B7280]">{data?.gender}</p>
        </li>
      </ul>
    </div>
  );
};
