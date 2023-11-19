/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BeansLogo from ".././assets/beansLogo.png";
import "./../css/sidebar.css";
import ".././css/font.css"; // Replace with the correct path to your CSS file
import { useDispatch, useSelector } from 'react-redux'
import { logout } from "../../redux/authSlice";

const Navbar = () => {
  const token = useSelector(state => state.auth.token);
  const [authenticated, setAuthenticated] = useState(null);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const [menuOpen, setMenuOpen] = useState(false);
  const [mainMenuOpen, setMainMenuOpen] = useState(false);
  // Initialize the navigation items
  const [navigation, setNavigation] = useState([
    { name: "Home", href: "/", current: location.pathname === "/" },
    {
      name: "About Us",
      href: "/aboutus",
      current: location.pathname === "/aboutus",
    },
    {
      name: "Contact Us",
      href: "/contact-us",
      current: location.pathname === "/contact-us",
    },
    // { name: "Register", href: "/signup", current: location.pathname === "/signup" },
    { name: "Login", href: "/login", current: location.pathname === "/login" },
  ]);

  const [mobileNav, setMobileNav] = useState([
    { name: "Home", href: "/", current: location.pathname === "/" },
    {
      name: "About Us",
      href: "/aboutus",
      current: location.pathname === "/aboutus",
    },
    {
      name: "Contact Us",
      href: "/contact-us",
      current: location.pathname === "/contact-us",
    },
    {
      name: "Sign Up",
      href: "/signup",
      current: location.pathname === "/signup",
    },
    { name: "Login", href: "/login", current: location.pathname === "/login" },
  ]);

  const [mainNav, setMainNav] = useState([
    {
      name: "Dashboard",
      href: "/dashboard",
      current: location.pathname === "/dashboard",
    },
    {
      name: "Customers",
      href: "/customers",
      current: location.pathname === "/customers",
    },
    {
      name: "Sorters",
      href: "/sorters",
      current: location.pathname === "/sorters",
    },
    {
      name: "Status",
      href: "/status",
      current: location.pathname === "/status",
    },
    {
      name: "Profile",
      href: "/profile",
      current: location.pathname === "/profile",
    },
  ]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleMainMenu = () => {
    setMainMenuOpen(!mainMenuOpen);
  };

  const handleNavigationClick = (href) => {
    const updatedNavigation = navigation.map((item) => ({
      ...item,
      current: item.href === href,
    }));
    setNavigation(updatedNavigation);

    // Use the navigate function to navigate to the clicked item's href
    navigate(href);
  };

  const handleMainNavigationClick = (href) => {
    const updatedNavigation = mainNav.map((item) => ({
      ...item,
      current: item.href === href,
    }));
    setMainNav(updatedNavigation);

    // Use the navigate function to navigate to the clicked item's href
    navigate(href);
  };

  const handleMobileNavigationClick = (href) => {
    const updatedNavigation = mobileNav.map((item) => ({
      ...item,
      current: item.href === href,
    }));
    setMobileNav(updatedNavigation);

    // Use the navigate function to navigate to the clicked item's href
    navigate(href);
  };

  // Function to clear session storage on logout
  function clearSessionStorage() {
    sessionStorage.clear(); // This will remove all data from session storage
  }
  
  const isAuthenticated = () => {
    return token !== null;
  };

  useEffect(() => {
    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [token]);

  const handleButtonClick = () => {
    // Handle button click logic based on authentication status
    if (isAuthenticated()) {
      // Clear session storage
      clearSessionStorage();

      // Clear the user's local storage
      dispatch(logout())
      localStorage.removeItem("isLoggedIn");

      // temporary check for saved email and password in localStorage
      localStorage.getItem("savedEmail");
      localStorage.getItem("savedPassword");
      navigate("/login");
      // Additional logout logic here
    } else {
      // Handle sign up logic
      // For example, navigate to the sign-up page
      navigate(`/signup`);
    }
  };

  return (
    <div className=" text-red-700  fixed top-0 left-0 right-0 z-50 ">
      {/* Mobile menu button */}
      <div
        className={`md:hidden absolute top-8 right-4 cursor-pointer z-50 transition-transform transform ${
          menuOpen ? "rotate-clockwise" : ""
        }`}
        onClick={toggleMenu}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col justify-center items-center p-10 absolute left-50 right-0 max-h-screen w-full bg-black z-100">
          {mobileNav.map((item) => (
            <li
              key={item.href}
              className={`my-4 hover:text-[#FF3535] cursor-pointer text-white hover:underline md:text-[20px] ${
                item.current ? "text-[#883d3d]" : ""
              } poppins-font font-semibold`}
              onClick={() => {
                handleMobileNavigationClick(item.href);
                setMenuOpen(false);
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}

      {mainMenuOpen && (
        <ul className="flex flex-col justify-center items-center p-10 absolute left-0 right-0 w-full max-h-screen sm:min-h-screen bg-black z-100">
          {mainNav.map((item) => (
            <li
              key={item.href}
              className={`my-4 hover:text-[#FF3535] cursor-pointer text-white hover:underline md:text-[20px] ${
                item.current ? "text-[#883d3d]" : ""
              } poppins-font font-semibold`}
              onClick={() => {
                handleMainNavigationClick(item.href);
                setMainMenuOpen(false);
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}

      {/* Desktop menu */}
      <div className="bg-white justify-between flex w-full h-1/2 text-gray pl-2 pr-16">
        <div className="flex items-center">
          {" "}
          {/* Add a flex container */}
          <img src={BeansLogo} alt="BeansLogo" className="h-20 w-20 ml-1" />
          <span className="hidden md:block ml-2 text-red-800 mt-3 poppins-font md:text-xl font-semibold">
            BeanCoders
          </span>
          {isAuthenticated() ? (
            <div
              className={`absolute top-8 right-4 cursor-pointer z-50 transition-transform transform ${
                mainMenuOpen ? "rotate-clockwise" : ""
              }`}
              onClick={toggleMainMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
          ) : (
            ""
          )}
          {/* Add span */}
        </div>

        <div className="justify-end ">
          <ul className="hidden md:flex md:flex-row  md:justify-between md:mt-3 md:space-x-8 ">
            {navigation.map(
              (item) =>
                !(item.name === "Login" && isAuthenticated()) && (
                  <li
                    key={item.href}
                    className={`my-4 hover:text-[#783e3e] cursor-pointer  hover:underline md:text-[20px] ${
                      item.current ? "text-[#512b2b]" : ""
                    } poppins-font font-semibold `}
                    onClick={() => {
                      handleNavigationClick(item.href);
                    }}
                  >
                    {item.name}
                  </li>
                )
            )}

            <button
              onClick={handleButtonClick}
              className="btn btn-primary p-5 poppins-font rounded-md text-white poppins-font"
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#C4A484";
                e.target.style.transition = "background-color 0.3s ease";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#512615";
                e.target.style.transition = "background-color 0.3s ease";
              }}
              style={{
                backgroundColor: "#512615",
                boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.9)",
                border: "none",
                textShadow: "1px 1px 1px rgba(0, 0, 0, 1)",
              }}
            >
              {isAuthenticated() ? "Logout" : "Sign Up"}
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
