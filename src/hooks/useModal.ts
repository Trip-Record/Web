import { useState } from "react";

export type switchModalFnType = (value?: boolean) => void;

export function useModal() {
  const [showModal, setShowModal] = useState(false);

  console.log("현재:", showModal);

  const switchModal: switchModalFnType = (value?: boolean) => {
    if (value) {
      setShowModal(value);
    } else {
      setShowModal(!showModal);
    }
  };

  return {
    switchModal,
    showModal,
  };
}
