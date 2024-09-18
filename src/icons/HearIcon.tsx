interface HeartIconProps {
  filled: boolean;
  color: string;
}

export const HeartIcon = ({ filled, color }: HeartIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill={filled ? color : "none"}
      viewBox="0 0 24 24"
      stroke={color}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 21l-1.45-1.316C5.4 16.1 2 12.4 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.9-3.4 7.6-8.55 11.18L12 21z"
      />
    </svg>
  );
};
