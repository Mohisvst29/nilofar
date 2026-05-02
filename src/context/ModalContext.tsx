"use client";

import React, { createContext, useContext, useState } from "react";

type ModalType = "none" | "request" | "apply";

interface ModalContextType {
  activeModal: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
  activeModal: "none",
  openModal: () => {},
  closeModal: () => {},
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeModal, setActiveModal] = useState<ModalType>("none");

  const openModal = (type: ModalType) => setActiveModal(type);
  const closeModal = () => setActiveModal("none");

  return (
    <ModalContext.Provider value={{ activeModal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModals = () => useContext(ModalContext);
