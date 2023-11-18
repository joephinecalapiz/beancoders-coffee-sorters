/** @format */

import React, { useEffect, useState } from "react";
import "../.././css/Sidebar.css";
import "../.././css/dashboard.css";
import axios from "axios";
import api_endpoint from "../../config";
import "react-datepicker/dist/react-datepicker.css";
import UpdateCompanyInfo from "../ModalScreen/UpdateCompanyInfo";
import Activities from "./Activities";
import YesterdayAct from "./YesterdayAct";
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const { token, user_id } = useSelector(
    (state) => state.auth
  )
  const [navVisible, showNavbar] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const [beanCount, setBeanCount] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const fetchUserInfo = async () => {
    try {
      const response = await fetch(api_endpoint + "/fetch-info/" + user_id, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUserInfo(data.details);

      // Now that userInfo is set, you can check companyName
      if (data.details.companyName === "") {
        console.log("No company info yet");
        openModal();
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

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

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleSidebar = () => {
    showNavbar(!navVisible);
  };

  useEffect(() => {
    axios.get(api_endpoint + "/count").then((response) => {
      const bean = response.data.beans;
      setBeanCount(bean);
    });
  }, []);

  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  return (
    <>
      <div className="header">
        <div className="md:pl-5 md:pr-5 pr-2 pl-2 pt-0.5 mb-2">
          <h1 className="text-black poppins-font font-bold bg-white dark:text-textTitle dark:bg-container mt-5 text-base p-3 rounded-lg shadow-xl">
            Dashboard
          </h1>
        </div>
      </div>
      <div
        className="p-5"
        style={{
          transition: "margin-left 0.3s ease",
        }}
      >
        <div className="grid grid-cols-1 gap-12 mb-4 ">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-9 ">
            <div className="flex items-center bg-white dark:bg-container justify-center h-28 grid-item">
              <div>
                <h1 className="text-black dark:text-textTitle poppins-font font-medium data-title m-auto ml-5 mr-5">
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
                <h1 className="text-black dark:text-textTitle poppins-font font-medium data-title m-auto">
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
                <h1 className="text-black dark:text-textTitle poppins-font font-medium data-title m-auto">
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
        className="md:pl-5 md:pr-5 pr-2 pl-2 p-5 activities"
        style={{
          transition: "margin-left 0.3s ease",
          marginTop: "-20px",
        }}
      >
        <div>
          <h1 className="text-black poppins-font dark:text-textTitle mt-1 font-bold text-base p-3 rounded-lg shadow-xl">
            Recent Activities
          </h1>
          <Activities />
          <YesterdayAct />
        </div>
      </div>
      <UpdateCompanyInfo
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Dashboard;
