import { useEffect, useRef } from "react";

interface Props {
  button: React.ReactNode;
  modal: React.ReactNode;
  buttonClassName?: string;
  showModal: boolean;
  switchModal: (value?: boolean) => void;
}
export default function ModalButton({
  button,
  modal,
  buttonClassName,
  showModal,
  switchModal,
}: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (showModal) ref.current?.showModal();
    else ref.current?.close();
  }, [showModal]);

  return (
    <>
      <dialog
        ref={ref}
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) switchModal(false);
        }}
        className="backdrop:bg-black/50 max-w-[100vw] bg-transparent"
      >
        {modal}
      </dialog>
      <div
        className={`w-full ${buttonClassName}`}
        onClick={() => switchModal(true)}
      >
        {button}
      </div>
    </>
  );
}
