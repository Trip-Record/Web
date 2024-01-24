import { useState } from "react";

export type switchModalFnType = (value?: boolean) => void;

export function useModal(): [boolean, switchModalFnType] {
  const [showModal, setShowModal] = useState(false);

  const switchModal: switchModalFnType = (value?: boolean) => {
    if (value) {
      setShowModal(value);
    } else {
      setShowModal(!showModal);
    }
  };

  return [showModal, switchModal];
}
