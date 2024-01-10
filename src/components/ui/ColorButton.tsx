interface Props {
  text: string;
  className?: string;
}
export default function ColorButton({ className, text }: Props) {
  return (
    <button
      className={`bg-blue-300 rounded-md text-white p-2 ${className} text-xs md:text-base`}
    >
      {text}
    </button>
  );
}
