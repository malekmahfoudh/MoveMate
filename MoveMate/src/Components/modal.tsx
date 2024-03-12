import React from 'react';
import "../Styles/Modal.scss";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    task: string;
    setTask: (task: string) => void;
    comment: string;
    setComment: (comment: string) => void;
    reminder: string;
    setReminder: (reminder: string) => void;
    onAdd: () => void;
    children?: React.ReactNode;
  }
  
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal_content">
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
