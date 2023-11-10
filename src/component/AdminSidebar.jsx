/** @format */

import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaComment, FaKey, FaUsers } from "react-icons/fa";
import "./../css/sidebar.css";

const ICON_SIZE = 20;

function AdminSidebar({ collapsed }) {
  const location = useLocation();
  const [adminNav, setAdminNav] = useState([
    {
      name: "Manage User",
      href: "/superadmin/manageusers",
      current: location.pathname === "/superadmin/manageusers",
      icon: <FaUsers size={ICON_SIZE} />,
    },
    {
      name: "Feedbacks",
      href: "/superadmin/feedbacks",
      current: location.pathname === "/superadmin/feedbacks",
      icon: <FaComment size={ICON_SIZE} />,
    },
    {
      name: "Generate Keys",
      href: "/superadmin/generate-keys",
      current: location.pathname === "/superadmin/generate-keys",
      icon: <FaKey size={ICON_SIZE} />,
    },
  ]);

  // Initialize dark mode state based on localStorage or user preference
  const [darkMode, setDarkMode] = useState(() => {
    // Check if the user prefers dark mode
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // Check if dark mode is stored in localStorage
    const storedDarkMode = localStorage.getItem("darkMode");

    // Use user preference if available, otherwise use localStorage, or default to false
    return (
      prefersDarkMode || (storedDarkMode ? JSON.parse(storedDarkMode) : false)
    );
  });

  const handleAdminNavigationClick = (href) => {
    const updatedNavigation = adminNav.map((item) => ({
      ...item,
      current: item.href === href,
    }));
    setAdminNav(updatedNavigation);

    // Use the navigate function to navigate to the clicked item's href
    navigate(href);
  };

  // Toggle the dark mode class when the component mounts and when darkMode changes
  useEffect(() => {
    // Check if dark mode is stored in localStorage
    const storedDarkMode = localStorage.getItem("darkMode");

    // Automatically set dark mode based on localStorage or default to light mode
    setDarkMode(storedDarkMode ? JSON.parse(storedDarkMode) : false);
  }, []);

  // Toggle the dark mode class when the component mounts and when darkMode changes
  useEffect(() => {
    // Check if dark mode is stored in localStorage
    const storedDarkMode = localStorage.getItem("darkMode");
    
    document.documentElement.classList.toggle("dark", darkMode);
    const appBody = document.getElementById("app-body");
    appBody.classList.toggle("dark:bg-dark", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newDarkModeState = !darkMode;
    setDarkMode(newDarkModeState);

    // Toggle the dark mode class on the document element and app body
    document.documentElement.classList.toggle("dark", newDarkModeState);
    const appBody = document.getElementById("app-body");
    appBody.classList.toggle("dark:bg-dark", newDarkModeState);

    // Save the dark mode state in localStorage
    localStorage.setItem("darkMode", JSON.stringify(newDarkModeState));
  };

  return (
    <>
      <nav
        className={`pl-4 pt-16 pr-4 pb-4 bg-black dark:bg-gray  fixed z-20 inset-0 mt-2 left-[max(0px,calc(10%-100rem))] w-[15rem] ${
          collapsed ? "collapsed" : ""
        }`}
      >
        <div className="mt-4">
          <div className="mt-4">
            {adminNav.map((item) => (
              <NavLink
                to={item.href}
                className={`nav-link hover:bg-bgHover ${
                  item.current ? "bg-bgActive text-white" : "text-white"
                } poppins-font`}
                key={item.href}
              >
                <span className="icon">{item.icon}</span>
                <span
                  className={!collapsed ? "text-visible" : ""}
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {item.name}
                </span>
              </NavLink>
            ))}
          </div>
          {/* Dark mode toggle button */}
          <div className="fixed bottom-4 left-4">
            <button
              className="p-2 text-white rounded-full flex items-center"
              onClick={toggleDarkMode}
            >
              {darkMode ? (
                <>
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 mr-2">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
                      className="fill-transparent"
                    ></path>
                    <path
                      d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"
                      className="fill-slate-400 dark:fill-slate-500"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"
                      className="fill-slate-400 dark:fill-slate-500"
                    ></path>
                  </svg>
                  {!collapsed && (
                    <span style={{ fontFamily: "Poppins, sans-serif" }}>
                      Dark
                    </span>
                  )}
                </>
              ) : (
                <>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 mr-2"
                  >
                    <path
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      className="fill-sky-400/20 stroke-sky-500"
                    ></path>
                    <path
                      d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"
                      className="stroke-sky-500"
                    ></path>
                  </svg>
                  {!collapsed && (
                    <span style={{ fontFamily: "Poppins, sans-serif" }}>
                      Light
                    </span>
                  )}
                </>
              )}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default AdminSidebar;
