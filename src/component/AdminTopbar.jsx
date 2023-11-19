/** @format */

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BeansLogo from ".././assets/beansLogo.png";
import api_endpoint from "../config";
import "../css/topbar.css";
import "./../css/sidebar.css";
import { FaBars } from "react-icons/fa";
import ".././css/font.css"; // Replace with the correct path to your CSS file
import image_endpoint from "../image-config";
import { useDispatch, useSelector } from 'react-redux'
import { logout } from "../../redux/authSlice";

const Topbar = ({ handleToggleSidebar, collapsed }) => {
  const token = useSelector(state => state.auth.token);
  const user_id = useSelector(state => state.auth.user_id);
  const dispatch = useDispatch()
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const dropdownRef = useRef();
  const [isRotated, setRotated] = useState(false);
  const [compInfo, setCompInfo] = useState("");
  const [profileIcon, setProfileIcon] = useState({
    profileAvatar: compInfo.profileAvatar,
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

  // Update profileData when userInfo changes
  useEffect(() => {
    setProfileIcon((prevProfileData) => ({
      ...prevProfileData,
      profileAvatar: compInfo.profileAvatar,
    }));
  }, [userInfo]);

  const fetchCompanyInfo = async () => {
    try {
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
    } catch (error) {
      console.error("Error fetching company details data:", error);
    }
  };

  const fetchUserInfo = async () => {
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

  // Function to clear session storage on logout
  function clearSessionStorage() {
    sessionStorage.clear(); // This will remove all data from session storage
  }

  const handleLogoutConfirmed = () => {
    // Clear session storage
    clearSessionStorage();

    // Clear the user's local storage
    dispatch(logout())
    localStorage.removeItem("isLoggedIn");
    // Clear the user data from state, if necessary
    setUserInfo(null);

    // Check for saved email and password in localStorage
    localStorage.getItem("savedEmail");
    localStorage.getItem("savedPassword");

    // Close the confirmation modal
    setConfirmationModalOpen(false);

    // Navigate the user back to the login page
    // navigate("/login");
    window.location.reload();
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

  return (
    <div className="z-20 fixed top-0 left-0 right-0 flex flex-row w-full text-[14px]">
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
        <span className="px-5 pt-5 text-textTitle dark:text-textTitle poppins-font text-xl h-16 font-semibold">
          BeanCoders
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
              className="w-12 h-12 rounded-full bg-white mr-9"
            />
          </button>
          {isDropdownOpen && (
            <div
              className="z-50 text-textTitle dark:text-textTitle absolute dark:bg-container top-12 right-0 my-4 text-base list-none bg-gray divide-y divide-gray-100 rounded shadow"
              id="dropdown-user"
            >
              {/* Dropdown content */}
              <div className="px-4 py-3" role="none">
                <p
                  className="text-sm poppins-font"
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
                    navigate("/superadmin/profile");
                  }}
                >
                  <a
                    className="block px-4 py-2 poppins-font font-semibold text-sm dark:text-textTitle hover:bg-lightBrown text-textTitle dark:hover:bg-lightBrown cursor-pointer"
                    role="menuitem"
                    aria-expanded={isProfileMenuOpen}
                  >
                    Profile
                  </a>
                </li>
                <li onClick={handleSignOut}>
                  <a
                    className="block px-4 py-2 text-sm poppins-font font-semibold text-textTitle dark:text-textTitle hover:bg-lightBrown dark:hover:bg-lightBrown cursor-pointer"
                    role="menuitem"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
        <h1 className=" text-textTitle poppins-font hidden md:block font-semibold md:text-base px-5 pt-2 mr-10 whitespace-nowrap">
          Super Admin
        </h1>
      </div>

      {/* Confirmation Modal */}
      {isConfirmationModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-6 rounded shadow">
            <p className="text-gray-800 text-base poppins-font mb-4">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-center">
              <button
                className="bg-red-500 text-textTitle dark:bg-container poppins-font px-4 py-2 rounded mr-2 cursor-pointer"
                onClick={handleLogoutConfirmed}
              >
                Logout
              </button>
              <button
                className="bg-gray text-textTitle poppins-font px-4 py-2 rounded cursor-pointer"
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
