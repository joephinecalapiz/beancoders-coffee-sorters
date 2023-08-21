import React from "react";
import { useNavigate } from "react-router-dom";


const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="modal-container bg-white p-10 max-w-sm mx-auto rounded z-50">
        <span
          className="modal-close absolute top-4 right-4 text-xl cursor-pointer"
          onClick={onClose}
        >
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
