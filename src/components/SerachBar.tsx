import { FilterIcon } from "../icons/FilterIcon";

interface SearchBarProps {
  openModel: () => void;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

export const SearchBar = ({
  openModel,
  value,
  onChange,
  onBlur,
}: SearchBarProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleBlur = () => {
    onBlur?.();
  };

  return (
    <div className="bg-[#F3F4F6] flex items-center justify-between rounded-md">
      <input
        type="text"
        placeholder="Search or filter results"
        className="w-full px-4 py-2 border border-[#F3F4F6] rounded-md focus:outline-none bg-[#F3F4F6] text-[#6B7280] font-medium"
        onChange={handleChange}
        value={value}
        onBlur={handleBlur}
      />

      <button
        className="px-2 py-2 bg-[#F3F4F6] rounded-md hover:bg-[#E5E7EB] transition-all duration-300 ease-in-out active:bg-[#D1D5DB]"
        onClick={openModel}
        data-testid="filter-button"
      >
        <FilterIcon color="#8054C7" />
      </button>
    </div>
  );
};
