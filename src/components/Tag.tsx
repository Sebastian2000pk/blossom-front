interface TagProps {
  children: React.ReactNode;
  onClick?: () => void;
}
export const Tag = ({ children }: TagProps) => {
  return (
    <span className="bg-[#63D83833] text-[#3B8520] px-2 py-1 rounded-full text-xs font-medium">
      {children}
    </span>
  );
};
