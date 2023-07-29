import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import BeansLogo from ".././assets/beansLogo.png";

const Topbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  return (
    <div className="absolute flex flex-row w-full text-white text-[14px]">
      <div className="bg-black h-full w-full flex items-center">
        <img src={BeansLogo} alt="BeansLogo" className="h-16 w-16 mt-1" />
        <h1 className="text-white text-16px ml-2">BeanCoders</h1>
      </div>
      <div className="flex bg-black items-center">
        <div className="flex items-center ml-2 relative">
          <button
            type="button"
            onClick={toggleDropdown}
            className="flex text-sm mr-2 bg-white-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            aria-expanded={isDropdownOpen}
          >
            <span className="sr-only">Dropwdown user</span>
            <img
              className="w-12 h-12 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="user photo"
            />
          </button>
          {isDropdownOpen && (
            <div
              className="z-50 absolute top-12 right-0 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
              id="dropdown-user"
            >
              {/* Dropdown content */}
              <div className="px-4 py-3" role="none">
                <p className="text-sm text-gray-900 dark:text-white" role="none">
                  Jeremiah Ungsod
                </p>
                <p
                  className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                  role="none"
                >
                  j.ungsod019@gmail.com
                </p>
              </div>
              <ul className="py-1" role="none">
                <li onClick={() => {
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
                <li onClick={() => {
                  navigate("/settings");
                }}
                >
                  <a
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                  >
                    Settings
                  </a>
                </li>
                <li onClick={() => {
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
      </div>
    </div>
  );
};

export default Topbar;
