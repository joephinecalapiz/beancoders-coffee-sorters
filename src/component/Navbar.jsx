/** @format */

import React, { useState, Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BeansLogo from ".././assets/beansLogo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const [menuOpen, setMenuOpen] = useState(false);
  // Initialize the navigation items
  const [navigation, setNavigation] = useState([
    { name: 'Home', href: '/', current: location.pathname === '/' },
    { name: 'About Us', href: '/aboutus', current: location.pathname === '/aboutus' },
    { name: 'Register', href: '/signup', current: location.pathname === '/signup' },
    { name: 'Login', href: '/login', current: location.pathname === '/login' },
  ]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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


  return (
    <div className="relative text-white">
      {/* Mobile menu button */}
      <div
        className="md:hidden absolute top-6 right-4 cursor-pointer z-50"
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
        <ul className="md:hidden flex flex-col justify-center items-center absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-90">
          {navigation.map((item) => (
            <li
              key={item.href}
              className={`my-4 hover:text-[#FF3535] cursor-pointer hover:underline md:text-[26px] ${item.current ? 'text-red-500' : ''
                }`}
              onClick={() => {
                handleNavigationClick(item.href);
                setMenuOpen(false);
                // Add your navigation logic here, e.g., navigate(item.href);
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}

      {/* Desktop menu */}
      <div className="top-0 bg-black bg-opacity-5 backdrop-blur-md absolute flex flex-row justify-between w-full text-white px-10">
        <img src={BeansLogo} alt="BeansLogo" className="h-20 w-20 md:mt-5 md:space-x-8" />
        <ul className="hidden md:flex md:flex-row md:justify-between md:mt-5 md:space-x-8">
          {navigation.map((item) => (
            <li
              key={item.href}
              className={`my-4 hover:text-[#FF3535] cursor-pointer hover:underline md:text-[26px] ${item.current ? 'text-red-500' : ''
                }`}
              onClick={() => {
                handleNavigationClick(item.href);
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );


};

export default Navbar;
