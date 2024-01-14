import { useRef } from "react";

interface Props {
  button: React.ReactNode;
  modal: React.ReactNode;
}
export default function ModalButton({ button, modal }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <>
      <dialog
        ref={ref}
        onClick={(e) => {
          if (e.target === e.currentTarget) ref.current?.close();
        }}
        className="backdrop:bg-black/50 max-w-[100vw]"
      >
        {modal}
      </dialog>
      <div
        onClick={() => {
          ref.current?.showModal();
        }}
      >
        {button}
      </div>
    </>
  );
}
