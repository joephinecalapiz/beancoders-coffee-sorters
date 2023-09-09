/** @format */

// ForgotPasswordModal.jsx
import React from "react";
import Modal from "./Modal"; // Import your Modal component
// import Modal from "../../component/Modal";

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <h2 className="text-2xl font-bold mb-4">Forgot Password?</h2>
      <p className="mb-4">
        Enter your email address below to receive a password reset link.
      </p>
      {/* Add form fields for email input and submit button */}
      <div className="mb-4">
        <label className="block mb-2" htmlFor="email">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="border border-gray-400 p-2 rounded w-full"
          placeholder="Enter your email"
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClose}
      >
        Send Reset Link
      </button>
    </Modal>
  );
};

export default ForgotPasswordModal;
