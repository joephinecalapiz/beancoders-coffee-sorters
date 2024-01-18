import React, { useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import api_endpoint from "../config";

const KeyVerificationModal = ({ isOpen, onClose }) => {
  const [key, setKey] = useState("");
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const verifyOTP = () => {
    setVerifyLoading(true);
    localStorage.setItem('savedEmail', email);

    axios
      .post(api_endpoint + "/verify-key", { email, key  })
      .then((response) => {
        if (response.status === 200) {
          setVerifyLoading(false);
        }
        if(response.status === 401){
          console.log('Error')
        }
      })
      .catch((error) => {
        console.error("Error", error.response.data);
      })
      .finally(() => {
        setVerifyLoading(false);
      });
  };
  
  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <h2 className="text-2xl font-bold mb-4 text-center">Verify Key</h2>
      <p className="mb-4">
        Enter the special key below from the email you receive.
      </p>
      <div className="mb-4">
      <label className="block mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-400 p-2 rounded w-full"
          placeholder="Enter your Email"
        />
        <label className="block mb-2" htmlFor="specialKey">
          Special key
        </label>
        <input
          type="text"
          id="specialKey"
          name="specialKey"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="border border-gray-400 p-2 rounded w-full"
          placeholder="Enter your special key"
        />
      </div>
      {otpSent ? (
        <div className="mb-4">
        <label className="block mb-2" htmlFor="otpInput">
          Verified Special Key!
        </label>
        <button
          className="bg-blue-500 hover.bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 w-full"
          onClick={handleClose}
        >
          Proceed
        </button>
      </div>
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
          onClick={verifyOTP}
          disabled={verifyLoading}
        >
          {verifyLoading ? "Veryfing..." : "Verify Key"}
        </button>
      )}
    </Modal>
  );
};

export default KeyVerificationModal;
