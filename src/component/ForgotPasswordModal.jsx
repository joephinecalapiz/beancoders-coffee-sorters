import React, { useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import api_endpoint from "../config";

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [newPassword, setNewPassword] = useState(""); // State to store the new password

  const handleClose = () => {
    onClose();
  };

  const sendOTP = () => {
    setLoading(true);

    axios
      .post(api_endpoint + "/reset-password", { email })
      .then((response) => {
        if (response.status === 200) {
          const otp = response.data.otp;
          const uID = response.data.uID;
          sessionStorage.setItem('otp', otp);
          sessionStorage.setItem('uid', uID);
          setOtpSent(true);
        }
      })
      .catch((error) => {
        console.error("Error", error.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const verifyOTP = () => {
    setVerifyLoading(true);
    const otp = sessionStorage.getItem('otp');

    axios
      .post(api_endpoint + "/verify-otp", { otpInput, otp })
      .then((response) => {
        if (response.status === 200) {
          console.log(otp)
          console.log(otpInput)
          console.log('True')
          setVerificationSuccess(true);
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

  const updatePassword = () => {
    setVerifyLoading(true);
    const userId = sessionStorage.getItem('uid')
    console.log(newPassword)
    axios
      .put(api_endpoint + `/user-edit/${userId}`, { password: newPassword })
      .then((response) => {
        if (response.status === 200) {
          console.log(newPassword);
          alert(newPassword)
          console.log('Password updated successfully');
        }
      })
      .catch((error) => {
        console.error("Error", error.response.data);
      })
      .finally(() => {
        setVerifyLoading(false);
        //setVerificationSuccess(true);
      });
  };
  
  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <h2 className="text-2xl font-bold mb-4">Forgot Password?</h2>
      <p className="mb-4">
        Enter your email address below to receive a password reset OTP.
      </p>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="email">
          Email:
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
      </div>
      {otpSent ? (
        verificationSuccess ? (
          <div>
            <p>OTP sent successfully!</p>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="newPassword">
                New Password:
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border border-gray-400 p-2 rounded w-full"
                placeholder="Enter your new password"
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={updatePassword}
            >
              Update Password
            </button>
          </div>
        ) : (
          <div className="mb-4">
            <label className="block mb-2" htmlFor="otpInput">
              Enter OTP:
            </label>
            <input
              type="text"
              id="otpInput"
              name="otpInput"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              className="border border-gray-400 p-2 rounded w-full"
              placeholder="Enter OTP"
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={verifyOTP}
              disabled={verifyLoading}
            >
              {verifyLoading ? "Verifying OTP..." : "Verify OTP"}
            </button>
          </div>
        )
      ) : (
        <button
          className="bg-blue-500 hover.bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={sendOTP}
          disabled={loading}
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      )}
    </Modal>
  );
};

export default ForgotPasswordModal;
