import { useEffect, useRef } from "react";
import { switchModalFnType } from "../hooks/useModal";

interface Props {
  button: React.ReactNode;
  modal: React.ReactNode;
  buttonClassName?: string;
  isOpenModal: boolean;
  setModal: switchModalFnType;
}
export default function ModalButton({
  button,
  modal,
  buttonClassName,
  isOpenModal,
  setModal,
}: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpenModal) ref.current?.showModal();
    else ref.current?.close();
  }, [isOpenModal]);

  return (
    <>
      <dialog
        ref={ref}
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) setModal(false);
        }}
        className="backdrop:bg-black/50 max-w-[100vw] bg-transparent outline-none"
      >
        {modal}
      </dialog>
      <div
        className={`w-full ${buttonClassName}`}
        onClick={() => setModal(true)}
      >
        {button}
      </div>
    </>
  );
}
