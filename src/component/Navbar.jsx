/** @format */

import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute flex flex-row justify-end w-full text-white text-[20px]">
      <ul className="flex flex-row justify-between mt-5 space-x-6 sm:space-x-8">
        {/* Mobile styles */}
        <li
          className="my-4 hover:text-[#FF3535] cursor-pointer hover:underline"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "20px", // Additional size for mobile
          }}
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </li>
        <li
          className="my-4 hover:text-[#FF3535] cursor-pointer hover:underline"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "20px", // Additional size for mobile
          }}
          onClick={() => {
            navigate("/aboutus");
          }}
        >
          About Us
        </li>
        <li
          className="my-4 hover:text-[#FF3535] cursor-pointer hover:underline"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "20px", // Additional size for mobile
          }}
          onClick={() => {
            navigate("/signup");
          }}
        >
          Register
        </li>
        <li
          className="my-4 hover:text-[#FF3535] cursor-pointer hover:underline items-center"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "20px", // Additional size for mobile
          }}
          onClick={() => {
            navigate("/login");
          }}
        >
          {/* Web styles */}
          <span className=" sm:mr-[75px]">Login</span>
        </li>
      </ul>
      <br />
      <br />
      <br />
    </div>
  );
};

export default Navbar;
