import { FilterIcon } from "../icons/FilterIcon";

interface SearchBarProps {
  openModel: () => void;
}

export const SearchBar = ({ openModel }: SearchBarProps) => {
  return (
    <div className="bg-[#F3F4F6] flex items-center justify-between rounded-md">
      <input
        type="text"
        placeholder="Search or filter results"
        className="w-full px-4 py-2 border border-[#F3F4F6] rounded-md focus:outline-none bg-[#F3F4F6] text-[#6B7280] font-medium"
      />

      <button
        className="px-2 py-2 bg-[#F3F4F6] rounded-md hover:bg-[#E5E7EB] transition-all duration-300 ease-in-out active:bg-[#D1D5DB]"
        onClick={openModel}
      >
        <FilterIcon color="#8054C7" />
      </button>
    </div>
  );
};
