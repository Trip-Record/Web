interface Props {
  text: string;
  className?: string;
  disabled?: boolean;
}
export default function ColorButton({
  className,
  text,
  disabled = false,
}: Props) {
  return (
    <button
      className={`bg-blue-300 rounded-md text-white p-2 ${className} text-xs md:text-base`}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
