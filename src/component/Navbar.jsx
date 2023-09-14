/** @format */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative text-white">
      {/* Mobile menu button */}
      <div
        className="md:hidden absolute top-4 right-4 cursor-pointer"
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
        <ul className="md:hidden flex flex-col justify-center items-center space-y-4 absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-90">
          <li
            className="my-4 hover:text-[#FF3535] cursor-pointer hover:underline"
            onClick={() => {
              navigate("/");
              setMenuOpen(false);
            }}
          >
            Home
          </li>
          <li
            className="my-4 hover:text-[#FF3535] cursor-pointer hover:underline"
            onClick={() => {
              navigate("/aboutus");
              setMenuOpen(false);
            }}
          >
            About Us
          </li>
          <li
            className="my-4 hover:text-[#FF3535] cursor-pointer hover:underline"
            onClick={() => {
              navigate("/signup");
              setMenuOpen(false);
            }}
          >
            Register
          </li>
          <li
            className="my-4 hover:text-[#FF3535] cursor-pointer hover:underline"
            onClick={() => {
              navigate("/login");
              setMenuOpen(false);
            }}
          >
            Login
          </li>
        </ul>
      )}

      {/* Desktop menu */}
      <div className="absolute flex flex-row justify-end w-full text-white ">
        <ul className="hidden md:flex md:flex-row md:justify-between md:mt-5 md:space-x-8 ">
          <li
            className="my-4 hover:text-[#FF3535] cursor-pointer hover:underline md:text-[26px]"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </li>
          <li
            className="my-4 hover:text-[#FF3535] cursor-pointer hover:underline md:text-[26px]"
            onClick={() => {
              navigate("/aboutus");
            }}
          >
            About Us
          </li>
          <li
            className="my-4 hover:text-[#FF3535] cursor-pointer hover:underline md:text-[26px]"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Register
          </li>
          <li
            className="my-4 hover:text-[#FF3535] cursor-pointer hover:underline md:text-[26px]"
            onClick={() => {
              navigate("/login");
            }}
          >
            <span className=" sm:mr-[75px]">Login</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
