interface SwitchButtonsProps {
  items: string[];
  value?: string;
  onChange?: (value: string) => void;
}
export const SwitchButtons = ({
  items,
  value,
  onChange,
}: SwitchButtonsProps) => {
  return (
    <div className="flex gap-2 w-full flex-wrap">
      {items.map((item) => (
        <Button
          label={item}
          key={item}
          selected={item === value}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

interface ButtonProps {
  label: string;
  selected?: boolean;
  onChange?: (value: string) => void;
}
const Button = ({ label, selected, onChange }: ButtonProps) => {
  const handleClick = () => {
    onChange?.(label);
  };
  return (
    <button
      className={`bg-[#FFFFFF] border border-[#E5E7EB] text-[#111827] px-4 py-2 rounded-lg hover:bg-[#F3E8FF] active:bg-[#E9D8FD] hover:border-[#C084FC] active:border-[#8054C7] w-24 ${
        selected ? "bg-[#F3E8FF]" : ""
      }`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};
