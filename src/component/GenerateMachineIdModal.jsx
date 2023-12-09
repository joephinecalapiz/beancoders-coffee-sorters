import React, { useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import api_endpoint from "../config";
import { useSelector } from 'react-redux'

const GenerateMachineIdModal = ({ isOpen, onClose }) => {
  const token = useSelector(state => state.auth.token);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const sendOTP = () => {
    setLoading(true);
  
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
  
    axios
      .post(api_endpoint + '/generate-machineid', {}, config)
      .then((response) => {
        if (response.status === 200) {
          setOtpSent(true);
        }
      })
      .catch((error) => {
        console.error('Error', error.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  
  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <h2 className="text-2xl font-bold mb-4 text-center">Generate Key</h2>
      {/* <p className="mb-4">
        Enter your email address below to receive a special key.
      </p>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="email">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-400 p-2 rounded w-full"
          placeholder="Enter your email"
        />
      </div> */}
      {otpSent ? (
        <div className="mb-4">
        <label className="block mb-2" htmlFor="otpInput">
          Sucessfully Generate Machine ID!
        </label>
        <button
          className="bg-blue-500 hover.bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 w-full"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
          onClick={sendOTP}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Key"}
        </button>
      )}
    </Modal>
  );
};

export default GenerateMachineIdModal;
