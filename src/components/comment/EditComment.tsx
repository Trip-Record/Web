import { ChangeEvent, FormEvent } from "react";
import ColorButton from "../ui/ColorButton";

interface Props {
  handleSubmit: (e: FormEvent) => void;
  onchange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}
export default function EditComment({ handleSubmit, onchange, value }: Props) {
  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        className="border-b outline-none w-full h-10 rounded-md bg-slate-50"
        type="text"
        onChange={onchange}
        value={value}
      />
      <ColorButton text="확인" className="w-14" />
    </form>
  );
}
