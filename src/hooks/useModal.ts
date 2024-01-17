import { useState } from "react";

export function useModal() {
  const [showModal, setShowModal] = useState(false);

  console.log("현재:", showModal);

  const switchModal = (value?: boolean) => {
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
