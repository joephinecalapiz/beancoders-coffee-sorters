/** @format */

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../../component/Topbar";
import Sidebar from "../../component/Sidebar";
import "../.././css/Sidebar.css";
import "../.././css/dashboard.css";
import axios from "axios";
import api_endpoint from "../../config";
import ChartComponent from "./Chart";
import Modal from "../../component/Modal";
import { Chart } from "chart.js/auto";
import feather from "feather-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Dashboard = () => {
  const [navVisible, showNavbar] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompanyInfoMissing, setCompanyInfoMissing] = useState(false);
  const [modalStep, setModalStep] = useState(1); // Track the current step of the modal
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [companyImage, setCompanyImage] = useState(null);

  useEffect(() => {
    // Function to check the screen width and update navVisible
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        showNavbar(true);
      } else {
        showNavbar(false);
      }
    };

    // Add an event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial check when the component mounts
    handleResize();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCompanyName("");
    setCompanyAddress("");
  };

  useEffect(() => {
    fetchUserInfo(); // Fetch user info when the component mounts
  }, []);

  useEffect(() => {
    // Check if company info is missing
    if (userInfo && !userInfo.name) {
      setCompanyInfoMissing(true);
      openModal(); // Open the modal when company info is missing
    }
  }, [userInfo]);

  const toggleSidebar = () => {
    showNavbar(!navVisible);
  };

  const handleNextStep = () => {
    setModalStep((step) => step + 1);
  };

  const handlePreviousStep = () => {
    setModalStep((step) => step - 1);
  };

  const handleSubmitCompanyInfo = async (e) => {
    // You can send the company info to the server here
    // Update user's company info in the database
    // Close the modal and update the state accordingly
    // setCompanyInfoMissing(false);
    // setModalStep(1);
    // setUserInfo(prevUserInfo => ({
    //   ...prevUserInfo,
    //   company: {
    //     name: companyName,
    //     address: companyAddress,
    //   },
    // }));
    // You might want to make an API call to update the company info in the database
  };

  const handleProfileImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleCompanyImageChange = (e) => {
    setCompanyImage(e.target.files[0]);
  };

  const handleUpdateCompanyImage = async (e) => {
    try {
      if (!companyImage) {
        return;
      }

      const formData = new FormData();
      formData.append("image", companyImage);

      const response = await axios.post(api_endpoint + "/fetch-info", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        // Profile image updated successfully
        // You can update the user's profile image state here if needed
        console.log("Company image updated");
      }
    } catch (error) {
      console.error("Error updating company image:", error);
    }
  };

  const handleUpdateProfileImage = async (e) => {
    try {
      if (!profileImage) {
        return;
      }

      const formData = new FormData();
      formData.append("image", profileImage);

      const response = await axios.post(api_endpoint + "/user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        // Profile image updated successfully
        // You can update the user's profile image state here if needed
        console.log("Profile image updated");
      }
    } catch (error) {
      console.error("Error updating profile image:", error);
    }
  };

  const [beanCount, setBeanCount] = useState("");

  useEffect(() => {
    axios.get(api_endpoint + "/count").then((response) => {
      const bean = response.data.beans;
      setBeanCount(bean);
    });
  }, []);

  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  const fetchUserInfo = async () => {
    let token = localStorage.getItem("token");
    try {
      const response = await fetch(api_endpoint + "/fetch-info/" + user_id, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Erro("Failed to fetch user data");
      }
      const data = await response.json();
      setUserInfo(data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  

  return (
    <>
      <Sidebar collapsed={navVisible} handleToggleSidebar={toggleSidebar} />
      <Topbar onToggleSidebar={toggleSidebar} collapsed={navVisible} handleToggleSidebar={toggleSidebar} />
      <div className={`mx-auto ${navVisible ? "" : ""}`}>
        <div className="header">
          <div
            className={`p-5 ${navVisible ? "" : "sm:ml-44"}`}
          >
            <div className="p-0.5 mb-2 w-full mt-6 relative">
              <h1 className="text-black bg-white dark:text-textTitle dark:bg-container mt-10 font-bold text-base p-3 rounded-lg shadow-xl">
                Dashboard
              </h1>
            </div>
          </div>
        </div>
        <div
          className={`p-5 ${navVisible ? "" : "sm:ml-44"}`}
          style={{
            transition: "margin-left 0.3s ease",
            marginTop: "-20px",
          }}
        >
          <div className="grid grid-cols-1 gap-12 mb-4 ">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-9 ">
              <div className="flex items-center bg-white dark:bg-container justify-center h-28 grid-item">
                <div>
                  <h1 className="text-black data-title m-auto ml-5 mr-5">
                    Pieces of Bad Beans
                  </h1>
                  <h1 className="text-secondBrown dark:text-mainBrown data-size m-auto">
                    {beanCount && beanCount.bad !== null
                      ? `${beanCount.bad} pieces`
                      : "0"}
                  </h1>
                </div>
              </div>
              <div className="flex items-center bg-white dark:bg-container justify-center h-28 grid-item">
                <div>
                  <h1 className="text-black data-title m-auto">
                    Pieces of Good Beans
                  </h1>
                  <h1 className="text-secondBrown dark:text-mainBrown data-size m-auto">
                    {beanCount && beanCount.good !== null
                      ? `${beanCount.good} pieces`
                      : "0"}
                  </h1>
                </div>
              </div>
              <div className="flex items-center bg-white dark:bg-container justify-center h-28 grid-item">
                <div>
                  <h1 className="text-black data-title m-auto">
                    KG of Bad Beans
                  </h1>
                  <h1 className="text-secondBrown dark:text-mainBrown data-size m-auto">
                    {beanCount && beanCount.kilograms !== null
                      ? `${beanCount.kilograms} kilograms`
                      : "0"}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`p-5 ${navVisible ? "" : "sm:ml-44"}`}
          style={{
            transition: "margin-left 0.3s ease",
            marginTop: "-20px",
          }}
        >
          {/* <ChartComponent /> */}
        </div>

      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="absolute inset-0 bg-black opacity-50"
      >
        <div className="bg-white rounded p-6 max-w-sm mx-auto z-50">
          <span
            className="modal-close absolute top-4 right-4 text-xl cursor-pointer"
            onClick={closeModal}
          >
            &times;
          </span>

          {modalStep === 1 && (
            <>
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Upload Profile Avatar
              </h2>
              <input
                type="file"
                onChange={handleProfileImageChange}
                accept="image/*"
                className="mb-2"
              />
              {/* ... Other content ... */}
              <div className="flex justify-center mt-4">
                {/* <button onClick={handlePreviousStep} className="bg-blue-500 text-white rounded px-4 py-2 mr-2">
            Previous
          </button> */}
                <button
                  onClick={handleUpdateProfileImage}
                  className="bg-green-500 text-white rounded px-4 py-2"
                >
                  Upload Image
                </button>
                <button
                  onClick={handleNextStep}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 ml-2 rounded focus:outline-none"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {modalStep === 2 && (
            <>
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Upload Company Image
              </h2>
              <input
                type="file"
                onChange={handleCompanyImageChange}
                accept="image/*"
                className="mb-2"
              />
              {/* ... Other content ... */}
              <div className="flex justify-center mt-4">
                <button
                  onClick={handlePreviousStep}
                  className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded focus:outline-none mr-2"
                >
                  Previous
                </button>
                <button
                  onClick={handleUpdateCompanyImage}
                  className="bg-green-500 text-white rounded px-4 py-2"
                >
                  Upload Image
                </button>
                <button
                  onClick={handleNextStep}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 ml-2 rounded focus:outline-none"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {modalStep === 3 && (
            <>
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Enter Company Name
              </h2>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400"
              />
              <div className="flex justify-center mt-4">
                <button
                  onClick={handlePreviousStep}
                  className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded focus:outline-none mr-2"
                >
                  Previous
                </button>
                <button
                  onClick={handleNextStep}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {modalStep === 4 && (
            <>
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Company Phone Number
              </h2>
              <input
                type="text"
                value={companyPhoneNumber}
                onChange={(e) => setCompanyPhoneNumber(e.target.value)}
                className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400"
              />
              <div className="flex justify-center mt-4">
                <button
                  onClick={handlePreviousStep}
                  className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded focus:outline-none mr-2"
                >
                  Previous
                </button>
                <button
                  onClick={handleNextStep}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {modalStep === 5 && (
            <>
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Company Address
              </h2>
              <input
                type="text"
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
                className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400"
              />
              <div className="flex justify-center mt-4">
                <button
                  onClick={handlePreviousStep}
                  className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded focus:outline-none mr-2"
                >
                  Previous
                </button>
                <button
                  onClick={handleSubmitCompanyInfo}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none"
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default Dashboard;
