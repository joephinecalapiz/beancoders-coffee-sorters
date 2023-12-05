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
import { logout } from "../../redux/services/auth/authSlice";
import { fetchUserDetails } from "../../redux/services/user/userActions";

const Topbar = ({ handleToggleSidebar, collapsed }) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const user_id = useSelector(state => state.auth.user_id);
  const companyInfo = useSelector(state => state.user.companyInfo);
  const userInfo = useSelector(state => state.user.userInfo);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const navigate = useNavigate();
  // const [userInfo, setUserInfo] = useState(null);
  const dropdownRef = useRef();
  const [isRotated, setRotated] = useState(false);
  const [compInfo, setCompInfo] = useState("");
  const [profileIcon, setProfileIcon] = useState({
    profileAvatar: compInfo.profileAvatar,
  });

  useEffect(() => {
    dispatch(fetchUserDetails({ token }));
  }, [dispatch]);

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

  // Update profileData when userInfo changes
  useEffect(() => {
    setProfileIcon((prevProfileData) => ({
      ...prevProfileData,
      profileAvatar: compInfo.profileAvatar,
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
  //   } catch (error) {
  //     console.error("Error fetching company details data:", error);
  //   }
  // };

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
    // setUserInfo(null);

    // Check for saved email and password in localStorage
    localStorage.getItem("savedEmail");
    localStorage.getItem("savedPassword");
    Cookies.remove('uid')
    Cookies.remove('rl')
    Cookies.remove('tk')

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
              className="z-50 text-textTitle dark:text-textTitle absolute dark:bg-container top-12 right-0 my-4 text-base list-none bg-mainbg divide-y divide-gray-100 rounded shadow"
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
                    className="mx-2 hover:rounded-full flex items-center px-4 py-2 poppins-font text-sm text-textTitle dark:text-textTitle hover:bg-mainBrown dark:hover:bg-lightBrown dark:hover:text-textTitle cursor-pointer"
                    role="menuitem"
                    aria-expanded={isProfileMenuOpen}
                  >
                    {/* <span class="profile pr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" /></svg>
                    </span> */}
                    <span className="material-symbols-outlined pr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </span>
                    Profile
                  </a>
                </li>
                <li onClick={handleSignOut}>
                  <a
                    className="mx-2 hover:rounded-full flex items-center px-4 py-2 poppins-font text-sm text-textTitle dark:text-textTitle hover:bg-mainBrown dark:hover:bg-lightBrown dark:hover:text-textTitle cursor-pointer"
                    role="menuitem"
                  >
                    <span className="material-symbols-outlined pr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-power"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
                    </span>
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
