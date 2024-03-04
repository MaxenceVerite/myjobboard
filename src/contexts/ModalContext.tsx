import React, { createContext, useContext, ReactNode, useState } from 'react';

interface ModalContextType {
  modalOpen: boolean;
  modalContent: ReactNode | null;
  modalTitle: string;
  openModal: (title: string, content: ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [modalContent, setModalContent] = useState<ReactNode | null>(null);
    const [modalTitle, setModalTitle] = useState<string>('');
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const openModal = (title: string, content: ReactNode) => {
        setModalTitle(title);
        setModalContent(content);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setModalContent(null);
        setModalTitle('');
    };

    return (
        <ModalContext.Provider value={{ modalOpen, modalContent, modalTitle, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
