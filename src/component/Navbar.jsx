import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div
      className="absolute flex flex-row justify-end w-full text-white
    text-[20px]
    "
    >
      <ul className="flex flex-row justify-between mr-[75px] w-[480px] mt-5">
        <li
          className="my-4 hover:text-[#FF3535] cursor-pointer onClick hover:underline"
          onClick={() => {
            navigate("/");
          }}
          
        >
          Home
        </li>
        <li
          className="my-4 hover:text-[#FF3535] cursor-pointer hover:underline"
          onClick={() => {
            navigate("/aboutus");
          }}
        >
          About Us
        </li>
        <li
          className="my-4 hover:text-[#FF3535] cursor-pointer hover:underline"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Register
        </li>
        <li
          className="my-4 hover:text-[#FF3535] cursor-pointer hover:underline"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
