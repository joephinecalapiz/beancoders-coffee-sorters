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
import { useDispatch, useSelector } from 'react-redux'
import { logout } from "../../redux/authSlice";
import { fetchCompanyDetails, fetchUserDetails } from "../../redux/userActions";

const Topbar = ({ handleToggleSidebar, collapsed }) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const user_id = useSelector(state => state.auth.user_id);
  const companyInfo = useSelector(state => state.company.companyInfo);
  const userInfo = useSelector(state => state.user.userInfo);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const navigate = useNavigate();
  // const [userInfo, setUserInfo] = useState(null);
  const dropdownRef = useRef();
  const [isRotated, setRotated] = useState(false);
  const [compInfo, setCompInfo] = useState("");
  // const { companyInfo, status, error } = useSelector((state) => state.company);
  const [profileIcon, setProfileIcon] = useState({
    profileAvatar: companyInfo.profileAvatar,
    companyName: companyInfo.companyName,
  });

  useEffect(() => {
    dispatch(fetchCompanyDetails({ user_id, token }));
    dispatch(fetchUserDetails({ token }));
  }, [dispatch]);

  console.log('details', companyInfo.companyName)

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    // fetchUserInfo();
    // fetchCompanyInfo();

    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  // useEffect(() => {
  //   const cachedProfileData = sessionStorage.getItem("profile photo");

  //   if (cachedProfileData) {
  //     setCompInfo(JSON.parse(cachedProfileData));
  //   }
  // }, []);

  // const fetchUserInfo = async () => {
  //   try {
  //     const response = await fetch(api_endpoint + "/user", {
  //       headers: {
  //         Authorization: "Bearer " + token,
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch user data");
  //     }

  //     const data = await response.json();
  //     setUserInfo(data.user);
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //   }
  // };

  // Update profileData when userInfo changes
  useEffect(() => {
    setProfileIcon((prevProfileData) => ({
      ...prevProfileData,
      profileAvatar: companyInfo.profileAvatar,
      companyName: companyInfo.companyName,
    }));
  }, [userInfo]);

  // const fetchCompanyInfo = async () => {
  //   try {
  //     const response = await fetch(api_endpoint + "/fetch-info/" + user_id, {
  //       headers: {
  //         Authorization: "Bearer " + token,
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch company details data");
  //     }
  //     const compData = await response.json();
  //     setCompInfo(compData.details);
  //     if (sessionStorage.getItem("profile photo") === null) {
  //       sessionStorage.setItem(
  //         "profile photo",
  //         JSON.stringify(compData.details)
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error fetching company details data:", error);
  //   }
  // };

  const handleSignOut = () => {
    // Show the confirmation modal
    setDropdownOpen(false);
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
    // setUserInfo(null);

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
    <div className="z-20 fixed top-0 left-0 right-0 flex flex-row w-full text-secondary text-[14px]">
      <div className="bg-mainbg dark:bg-gray h-full w-full flex items-center">
        <button
          type="button"
          onClick={handleToggleSidebar}
          className={`ml-6 transform transition-transform duration-300 ${
            collapsed ? "rotate-clockwise" : "rotate-counterclockwise"
          }`}
        >
          <FaBars size={20} />
        </button>
        {/* <img src={BeansLogo} alt="BeansLogo" className="h-16 w-16 mt-1 ml-2" /> */}
        <span className="px-5 pt-5 text-textTitle dark:text-textTitle poppins-font text-xl h-16 font-semibold">
          {profileIcon.companyName}
        </span>{" "}
      </div>
      <div className="flex bg-mainbg dark:bg-gray items-center md:pb-1">
        <div className="flex items-center relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={toggleDropdown}
            className={`flex relative ${
              isDropdownOpen ? "bg-white-800" : "bg-mainbg dark:bg-gray"
            } bg-mainbg dark:bg-gray`}
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
              className="fixed w-12 h-12 rounded-full bg-white border border-lightBrown shadow-xl shadow-green-900/20 ring-4 ring-lightBrown"
            />
          </button>
          {isDropdownOpen && (
            <div
              className="mx-5 z-50 absolute dark:bg-container top-12 right-0 my-4 text-base list-none bg-mainbg divide-y divide-gray-100 rounded shadow"
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
                    className="flex items-center px-4 py-2 poppins-font text-sm text-textTitle dark:text-textTitle hover:bg-mainBrown dark:hover:bg-lightBrown dark:hover:text-textTitle cursor-pointer"
                    role="menuitem"
                    aria-expanded={isProfileMenuOpen}
                  >
                    <span class="material-symbols-outlined pr-2">
                      account_circle
                    </span>
                    Profile
                  </a>
                </li>
                <li
                  type="button"
                  onClick={toggleProfileMenu}
                  className={`flex items-center px-4 py-2 poppins-font text-sm text-textTitle dark:text-textTitle hover:bg-mainBrown dark:hover:bg-lightBrown dark:hover:text-textTitle  ${
                    isProfileMenuOpen ? "" : ""
                  } `}
                  aria-expanded={isProfileMenuOpen}
                  role="menuitem"
                >
                  <span class="material-symbols-outlined pr-2">
                      archive
                  </span>
                  Archive
                  <span
                    className={`transform transition-transform duration-300 inline-block ${
                      isProfileMenuOpen ? "rotate-180" : "rotate-0"
                    } `}
                  >
                    <IoIosArrowDown size={20} className="inline" />
                  </span>
                </li>

                {isProfileMenuOpen && (
                  <ul className="py-1" role="none">
                    <li onClick={() => navigate("/customer-archived")}>
                      <a
                        className="flex pl-20 px-10 py-2 poppins-font text-sm text-textTitle dark:text-textTitle hover:bg-mainBrown dark:hover:bg-lightBrown dark:hover:text-textTitle cursor-pointer"
                        role="menuitem"
                      >
                        Customer
                      </a>
                    </li>
                    <li onClick={() => navigate("/status-archived")}>
                      <a
                        className="flex pl-20 px-10 py-2 poppins-font text-sm text-textTitle dark:text-textTitle hover:bg-mainBrown dark:hover:bg-lightBrown dark:hover:text-textTitle cursor-pointer"
                        role="menuitem"
                      >
                        Status
                      </a>
                    </li>
                  </ul>
                )}
                <li
                  onClick={() => {
                    navigate("/contact-us");
                  }}
                >
                  <a
                    className="flex items-center px-4 py-2 poppins-font text-sm text-textTitle dark:text-textTitle hover:bg-mainBrown dark:hover:bg-lightBrown dark:hover:text-textTitle cursor-pointer"
                    role="menuitem"
                    aria-expanded={isProfileMenuOpen}
                  >
                    <span class="material-symbols-outlined pr-2">
                      contact_support
                    </span>
                    Contact Us
                  </a>
                  <li
                    onClick={() => {
                      navigate("/aboutus");
                    }}
                  >
                    <a
                      className="flex items-center px-4 py-2 poppins-font text-sm text-textTitle dark:text-textTitle hover:bg-mainBrown dark:hover:bg-lightBrown dark:hover:text-textTitle cursor-pointer"
                      role="menuitem"
                      aria-expanded={isProfileMenuOpen}
                    >
                      <span class="material-symbols-outlined pr-2">
                        info
                      </span>
                      About Us
                    </a>
                  </li>
                </li>
                <li onClick={handleSignOut}>
                  <a
                    className="flex items-center px-4 py-2 poppins-font text-sm text-textTitle dark:text-textTitle hover:bg-mainBrown dark:hover:bg-lightBrown dark:hover:text-textTitlee cursor-pointer"
                    role="menuitem"
                  >
                    <span class="material-symbols-outlined pr-2">
                      power_settings_new
                    </span>
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
        <h1 className=" text-white poppins-font hidden md:block font-semibold md:text-base mt-3 mr-12 whitespace-nowrap">
            Admin
        </h1>
      </div>

      {/* Confirmation Modal */}
      {isConfirmationModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-mainbg bg-opacity-70 z-60">
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
