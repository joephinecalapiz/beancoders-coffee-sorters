/** @format */

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BeansLogo from ".././assets/beansLogo.png";
import api_endpoint from "../config";
import "../css/topbar.css";
import "./../css/sidebar.css";
import { FaBars } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import ".././css/font.css"; // Replace with the correct path to your CSS file
import image_endpoint from "../image-config";

const Topbar = ({ handleToggleSidebar, collapsed }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const dropdownRef = useRef();
  const [isRotated, setRotated] = useState(false);
  const [compInfo, setCompInfo] = useState("");
  const [profileIcon, setProfileIcon] = useState({
    profileAvatar: compInfo.profileAvatar,
    companyName: compInfo.companyName
  });

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
    fetchCompanyInfo();
    
    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  useEffect(() => {
    const cachedCustomerData = sessionStorage.getItem("profile photo");

    if (cachedCustomerData) {
      setCompInfo(JSON.parse(cachedCustomerData));
    }
  }, [])

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

  // Update profileData when userInfo changes
  useEffect(() => {
    setProfileIcon((prevProfileData) => ({
      ...prevProfileData,
      profileAvatar: compInfo.profileAvatar,
      companyName: compInfo.companyName
    }));
  }, [userInfo]);

  const fetchCompanyInfo = async () => {
    try {
      let token = localStorage.getItem("token");
      let user_id = localStorage.getItem("user_id");
      const response = await fetch(api_endpoint + "/fetch-info/" + user_id, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch company details data");
      }
      const compData = await response.json();
      setCompInfo(compData.details);
      if (sessionStorage.getItem("profile photo") === null) {
        sessionStorage.setItem("profile photo", JSON.stringify(compData.details));
      }
    } catch (error) {
      console.error("Error fetching company details data:", error);
    }
  };

  const handleSignOut = () => {
    // Show the confirmation modal
    setConfirmationModalOpen(true);
  };

  // Function to clear session storage on logout
  function clearSessionStorage() {
    sessionStorage.clear(); // This will remove all data from session storage
  }

  const handleLogoutConfirmed = () => {
    // Clear session storage
    clearSessionStorage();

    // Clear the user's local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("role");
    localStorage.removeItem("isLoggedIn");
    // Clear the user data from state, if necessary
    setUserInfo(null);

    // Check for saved email and password in localStorage
    localStorage.getItem("savedEmail");
    localStorage.getItem("savedPassword");

    // Close the confirmation modal
    setConfirmationModalOpen(false);

    // Navigate the user back to the login page
    navigate("/login");
  };

  const handleLogoutCancelled = () => {
    // Close the confirmation modal
    setConfirmationModalOpen(false);
  };

  const handleRotate = () => {
    // Toggle the rotation state
    setRotated(!isRotated);
  };

  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);

  const toggleProfileMenu = () => {
    setProfileMenuOpen((prevState) => !prevState);
  };

  // Add code to get the user_id from local storage
  const user_id = localStorage.getItem("id");

  return (
    <div className="z-20 fixed top-0 left-0 right-0 flex flex-row w-full text-white text-[14px]">
      <div className="bg-black dark:bg-gray h-full w-full flex items-center">
        <button
          type="button"
          onClick={handleToggleSidebar}
          className={`ml-6 text-white transform transition-transform duration-300 ${
            collapsed ? "rotate-clockwise" : "rotate-counterclockwise"
          }`}
        >
          <FaBars size={20} />
        </button>

        {/* <img src={BeansLogo} alt="BeansLogo" className="h-16 w-16 mt-1 ml-2" /> */}
        <span className="px-5 pt-5 text-lightBrown dark:text-lightBrown poppins-font text-xl h-16 font-semibold">
        {profileIcon.companyName}
          </span>{" "}
      </div>
      <div className="flex bg-black dark:bg-gray items-center">
        <div className="flex items-center relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={toggleDropdown}
            className={`flex relative ${
              isDropdownOpen ? "bg-white-800" : "bg-black dark:bg-gray"
            } bg-black dark:bg-gray`}
            aria-expanded={isDropdownOpen}
          >
            <span className="invisible">Dropdown user</span>
            <img
              src={
                profileIcon.profileAvatar &&
                profileIcon.profileAvatar.length > 0
                  ? `${image_endpoint}/storage/${profileIcon.profileAvatar.slice(
                      2,
                      -2
                    )}`
                  : BeansLogo
              }
              alt="BeansLogo"
              className="w-12 h-12 rounded-full bg-white mr-5"
            />
          </button>
          {isDropdownOpen && (
            <div
              className="z-50 absolute dark:bg-container top-12 right-0 my-4 text-base list-none bg-gray divide-y divide-gray-100 rounded shadow"
              id="dropdown-user"
            >
              {/* Dropdown content */}
              <div className="px-4 py-3" role="none">
                <p
                  className="text-sm poppins-font dark:text-textTitle"
                  role="none"
                >
                  {userInfo.name}
                </p>
                {userInfo && (
                  <p
                    className="text-sm dark:text-textDesc truncate poppins-font"
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
                  }}
                >
                  <a
                    className="block px-4 py-2 poppins-font font-semibold text-sm dark:text-textTitle hover:bg-gray-100 text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                    role="menuitem"
                    aria-expanded={isProfileMenuOpen}
                  >
                    Profile
                  </a>
                </li>
                <button
                  type="button"
                  onClick={toggleProfileMenu}
                  className={`block px-4 py-2 poppins-font font-semibold text-sm dark:text-textTitle hover:bg-gray-100 text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white  ${
                    isProfileMenuOpen ? "" : ""
                  } `}
                  aria-expanded={isProfileMenuOpen}
                  role="menuitem"
                >
                  Archive
                  <span
                    className={`transform transition-transform duration-300 inline-block ${
                      isProfileMenuOpen ? "rotate-180" : "rotate-0"
                    } `}
                  >
                    <IoIosArrowDown size={20} className="inline" />
                  </span>
                </button>

                {isProfileMenuOpen && (
                  <ul className="py-1" role="none">
                    <li onClick={() => navigate("/customer-archived")}>
                      <a
                        className="block px-10 py-2 poppins-font text-sm dark:text-textTitle hover:bg-gray-100 text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                        role="menuitem"
                      >
                        Customer
                      </a>
                    </li>
                    <li onClick={() => navigate("/status-archived")}>
                      <a
                        className="block px-10 py-2 poppins-font text-sm dark:text-textTitle hover:bg-gray-100 text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                        role="menuitem"
                      >
                        Status
                      </a>
                    </li>
                    {/* Add more sub-menu items as needed */}
                  </ul>
                )}
                <li onClick={handleSignOut}>
                  <a
                    className="block px-4 py-2 text-sm poppins-font font-semibold dark:text-textTitle hover:bg-gray-100  dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                    role="menuitem"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
        <h1 className="admin-user text-white text-lg mr-8 poppins-font font-semibold mx-5">
          Admin
        </h1>
      </div>

      {/* Confirmation Modal */}
      {isConfirmationModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-6 rounded shadow">
            <p className="text-gray-800 text-lg poppins-font mb-4">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white dark:bg-container poppins-font px-4 py-2 rounded mr-2 cursor-pointer"
                onClick={handleLogoutConfirmed}
              >
                Logout
              </button>
              <button
                className="bg-gray text-white poppins-font px-4 py-2 rounded cursor-pointer"
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
