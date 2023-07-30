/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BeansLogo from ".././assets/beansLogo.png";
//import { userInfo } from "os";

const Topbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };
  useEffect(() => {
    fetchUserInfo();
  }, []);
  const fetchUserInfo = async () => {
    let token = localStorage.getItem("token");
    try {
      const response = await fetch("http://192.168.254.111:8000/api/user", {
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
  return (
    <div className="absolute flex flex-row w-full text-white text-[14px]">
      <div className="bg-black h-full w-full flex items-center">
        <img src={BeansLogo} alt="BeansLogo" className="h-16 w-16 mt-1" />
        <h1 className="text-white text-16px ml-2">BeanCoders</h1>
      </div>
      <div className="flex bg-black items-center">
        <div className="flex items-center mr-8 relative">
          <button
            type="button"
            onClick={toggleDropdown}
            className="flex bg-white-800 relative"
            aria-expanded={isDropdownOpen}
          >
            <span className="invisible">Dropwdown user</span>
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
                  role="none"
                >
                  {userInfo.name}
                </p>
                {userInfo && (
                  <p
                    className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                    role="none"
                  >
                    {userInfo.email}
                  </p>
                )}
              </div>
              <ul className="py-1" role="none">
                <li
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                >
                  <a
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                  >
                    Dashboard
                  </a>
                </li>
                <li
                  onClick={() => {
                    navigate("/settings");
                    console.log(userInfo.name);
                  }}
                >
                  <a
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                  >
                    Settings
                  </a>
                </li>
                <li
                  onClick={() => {
                    navigate("/signout");
                  }}
                >
                  <a
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
        <h1 className="text-white text-14px mr-8">Admin</h1>
      </div>
    </div>
  );
};

export default Topbar;
