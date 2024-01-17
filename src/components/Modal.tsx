import { useRef } from "react";

interface Props {
  button: React.ReactNode;
  modal: React.ReactNode;
  buttonClassName?: string;
}
export default function ModalButton({ button, modal, buttonClassName }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <>
      <dialog
        ref={ref}
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) ref.current?.close();
        }}
        className="backdrop:bg-black/50 max-w-[100vw] bg-transparent"
      >
        {modal}
      </dialog>
      <div
        className={`w-full ${buttonClassName}`}
        onClick={() => {
          ref.current?.showModal();
        }}
      >
        {button}
      </div>
    </>
  );
}
