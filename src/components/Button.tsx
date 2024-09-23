interface ButtonProps {
  label: string;
  onClick?: () => void;
}

export const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button
      className="flex justify-center bg-[#8054C7] text-white px-4 py-2 rounded-lg hover:bg-[#6D28D9] active:bg-[#4C1D95]"
      onClick={onClick}
    >
      {label}
    </button>
  );
};
