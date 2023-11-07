/** @format */

import React from "react";

const Modal = ({ isOpen, onClose, children, showCloseButton }) => {
  if (!isOpen) return null;

  const onCloseButtonClick = () => {
    if (showCloseButton) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="modal-container bg-white dark:bg-container p-10 max-w-sm mx-auto rounded z-50">
        {showCloseButton && (
          <span
            className="modal-close absolute top-4 right-4 text-xl cursor-pointer"
            onClick={onCloseButtonClick}
          >
            &times;
          </span>
        )}
        <div className="mb-2 flex flex-col items-center text-black font-bold text-1xl">
          {children}
        </div>
        <br />
        {showCloseButton && (
          <div className="flex flex-col items-center">
            {/* Center the button */}
            <button
              className="modal-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={onCloseButtonClick}
            >
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
