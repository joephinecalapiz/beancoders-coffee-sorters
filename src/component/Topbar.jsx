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
import { logout, setCredentials } from "../../redux/authSlice";
import { fetchCompanyDetails, fetchUserDetails } from "../../redux/userActions";
import { useGetUserDetailsQuery } from '../../redux/authService'

const Topbar = ({ handleToggleSidebar, collapsed }) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const user_id = useSelector(state => state.auth.user_id);
  const companyInfo = useSelector(state => state.company.companyInfo);
  const userInfo = useSelector(state => state.user.userInfo);
  const { user } = useSelector((state) => state.auth)
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

  // console.log('user crendentials', data.user) // user object
  // console.log('details', user.details[0].companyName)
  
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
          className={`ml-6 transform transition-transform duration-300 ${collapsed ? "rotate-clockwise" : "rotate-counterclockwise"
            }`}
        >
          <FaBars size={20} />
        </button>
        {/* <img src={BeansLogo} alt="BeansLogo" className="h-16 w-16 mt-1 ml-2" /> */}
        <span className="px-5 pt-5 text-textTitle dark:text-textTitle poppins-font text-xl h-16 font-semibold">
          {profileIcon.companyName}
          {/* {isFetching
            ? `Fetching your credentials...`
            : user !== null
              ? `${user.details[0].companyName}`
              : "You're not logged in"} */}
        </span>
      </div>
      <div className="flex bg-mainbg dark:bg-gray items-center md:pb-1">
        <div className="flex items-center relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={toggleDropdown}
            className={`flex relative ${isDropdownOpen ? "bg-white-800" : "bg-mainbg dark:bg-gray"
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
                    className="mx-2 hover:rounded-full flex items-center px-4 py-2 poppins-font text-sm text-textTitle dark:text-textTitle hover:bg-mainBrown dark:hover:bg-lightBrown dark:hover:text-textTitle cursor-pointer"
                    role="menuitem"
                    aria-expanded={isProfileMenuOpen}
                  >
                    <span className="material-symbols-outlined pr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </span>
                    Profile
                  </a>
                </li>
                <li
                  onClick={toggleProfileMenu}
                >
                  <a className={`mx-2 hover:rounded-full flex justify-between items-center px-4 py-2 poppins-font text-sm text-textTitle dark:text-textTitle hover:bg-mainBrown dark:hover:bg-lightBrown dark:hover:text-textTitle  ${isProfileMenuOpen ? "" : ""
                    } `}
                    aria-expanded={isProfileMenuOpen}
                    role="menuitem"
                  >
                    <span className="material-symbols-outlined md-light">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-archive"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>
                    </span>
                    Archive
                    <span
                      className={`transform transition-transform duration-300 inline-block ${isProfileMenuOpen ? "rotate-180" : "rotate-0"
                        } `}
                    >
                      <IoIosArrowDown size={20} className="justify-end" />
                    </span>
                  </a>
                </li>
                {isProfileMenuOpen && (
                  <div className="pl-10 items-center ">
                    <ul className="py-1" role="none">
                      <li onClick={() => navigate("/customer-archived")}>
                        <a
                          className="mx-2 pl-5 hover:rounded-full flex justify-start py-2 poppins-font text-sm text-textTitle dark:text-textTitle hover:bg-mainBrown dark:hover:bg-lightBrown dark:hover:text-textTitle cursor-pointer"
                          role="menuitem"
                        >
                          Customer
                        </a>
                      </li>
                      <li onClick={() => navigate("/status-archived")}>
                        <a
                          className="mx-2 pl-5 hover:rounded-full flex justify-start py-2 poppins-font text-sm text-textTitle dark:text-textTitle hover:bg-mainBrown dark:hover:bg-lightBrown dark:hover:text-textTitle cursor-pointer"
                          role="menuitem"
                        >
                          Status
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
                <ul
                >
                  <li
                    onClick={() => {
                      navigate("/contact-us");
                    }}
                  >
                    <a
                      className="mx-2 hover:rounded-full flex items-center px-4 py-2 poppins-font text-sm text-textTitle dark:text-textTitle hover:bg-mainBrown dark:hover:bg-lightBrown dark:hover:text-textTitle cursor-pointer"
                      role="menuitem"
                      aria-expanded={isProfileMenuOpen}
                    >
                      <span className="material-symbols-outlined pr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                      </span>
                      Contact Us
                    </a>
                  </li>
                  <li
                    onClick={() => {
                      navigate("/aboutus");
                    }}
                  >
                    <a
                      className="mx-2 hover:rounded-full flex items-center px-4 py-2 poppins-font text-sm text-textTitle dark:text-textTitle hover:bg-mainBrown dark:hover:bg-lightBrown dark:hover:text-textTitle cursor-pointer"
                      role="menuitem"
                      aria-expanded={isProfileMenuOpen}
                    >
                      <span className="material-symbols-outlined pr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                      </span>
                      About Us
                    </a>
                  </li>
                </ul>
                <li onClick={handleSignOut}>
                  <a
                    className="mx-2 hover:rounded-full flex items-center px-4 py-2 poppins-font text-sm text-textTitle dark:text-textTitle hover:bg-mainBrown dark:hover:bg-lightBrown dark:hover:text-textTitlee cursor-pointer"
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
