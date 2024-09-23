interface SwitchButtonsProps {
  items: string[];
}
export const SwitchButtons = ({ items }: SwitchButtonsProps) => {
  return (
    <div className="flex gap-2">
      {items.map((item) => (
        <Button label={item} />
      ))}
    </div>
  );
};

interface ButtonProps {
  label: string;
}
const Button = ({ label }: ButtonProps) => {
  return (
    <button className="bg-[#FFFFFF] border border-[#E5E7EB] text-[#111827] px-4 py-2 rounded-lg hover:bg-[#F3E8FF] active:bg-[#E9D8FD] hover:border-[#C084FC] active:border-[#8054C7] w-24">
      {label}
    </button>
  );
};
