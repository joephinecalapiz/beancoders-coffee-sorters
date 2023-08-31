/** @format */

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BeansLogo from ".././assets/beansLogo.png";
import api_endpoint from "../config";
import { FaBars } from "react-icons/fa";

const Topbar = ({ collapsed, handleToggleSidebar}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const dropdownRef = useRef();

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  const fetchUserInfo = async () => {
    let token = localStorage.getItem("token");
    try {
      const response = await fetch(api_endpoint + "/user", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUserInfo(data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSignOut = () => {
    // Show the confirmation modal
    setConfirmationModalOpen(true);
  };

  const handleLogoutConfirmed = () => {
    // Clear the user's token from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("isLoggedIn");
    // Clear the user data from state, if necessary
    setUserInfo(null);

    // Close the confirmation modal
    setConfirmationModalOpen(false);

    // Navigate the user back to the login page
    navigate("/login");
  };

  const handleLogoutCancelled = () => {
    // Close the confirmation modal
    setConfirmationModalOpen(false);
  };

  return (
    <div className="poppins-font fixed top-0 left-0 right-0 flex flex-row w-full text-white text-[14px]">
      <div className="poppins-font bg-black h-full w-full flex items-center">
        <img src={BeansLogo} alt="BeansLogo" className="h-16 w-16 mt-1 ml-2" />
        <h1
          className="text-white text-16px ml-2"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          BeanCoders
        </h1>
      </div>
      <div className="flex bg-black items-center">
        <div className="flex items-center mr-8 relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={toggleDropdown}
            className={`flex relative ${
              isDropdownOpen ? "bg-white-800" : "bg-black"
            } dark:bg-gray-900`}
            aria-expanded={isDropdownOpen}
          >
            <span className="invisible">Dropdown user</span>
            <img
              src={BeansLogo}
              alt="BeansLogo"
              className="w-12 h-12 rounded-full bg-white"
            />
          </button>
          {isDropdownOpen && (
            <div
              className="z-50 absolute top-12 right-0 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
              id="dropdown-user"
            >
              {/* Dropdown content */}
              <div className="px-4 py-3" role="none">
                <p
                  className="text-sm text-gray-900 dark:text-white"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                  role="none"
                >
                  {userInfo.name}
                </p>
                {userInfo && (
                  <p
                    className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                    role="none"
                  >
                    {userInfo.email}
                  </p>
                )}
              </div>
              <ul className="py-1" role="none">
                <li
                  onClick={() => {
                    navigate("/profile");
                    console.log(userInfo.name);
                  }}
                >
                  <a
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                    role="menuitem"
                  >
                    Profile
                  </a>
                </li>
                <li onClick={handleSignOut}>
                  <a
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                    role="menuitem"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
        <h1
          className="text-white text-14px mr-8"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Admin
        </h1>
      </div>

      {/* Confirmation Modal */}
      {isConfirmationModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-6 rounded shadow">
            <p
              className="text-gray-800 text-lg mb-4"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                style={{ fontFamily: "Poppins, sans-serif" }}
                onClick={handleLogoutConfirmed}
              >
                Yes
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                style={{ fontFamily: "Poppins, sans-serif" }}
                onClick={handleLogoutCancelled}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Topbar;
