/** @format */

import React from "react";
import { useNavigate } from "react-router-dom";
//import BgLanding from "../assets/background_landing.jpg";
import Navbar from "../component/Navbar.jsx";

const Landing = () => {
  const navigate = useNavigate();
  // automatic na pag set sa radius sa box2
  const borderRadius = "25px";

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center bg-CoffeeBeans bg-cover h-screen w-full">
        {/* Row 1*/}
        <div className="grid grid-cols-3 gap-4 justify-items-center items-center bg-black">
          <div
            className="bg-red-500 h-48 w-48 rounded-lg p-4"
            style={{ borderRadius }}
          >
            <p className="text-white font-bold">Name</p>
            <p className="text-white">Address</p>
            <p className="text-white">Phone</p>
          </div>
          <div
            className="bg-blue-500 h-48 w-48 rounded-lg p-4"
            style={{ borderRadius }}
          >
            <p className="text-white font-bold">Name</p>
            <p className="text-white">Address</p>
            <p className="text-white">Phone</p>
          </div>
          <div
            className="bg-green-500 h-48 w-48 rounded-lg p-4"
            style={{ borderRadius }}
          >
            <p className="text-white font-bold">Name</p>
            <p className="text-white">Address</p>
            <p className="text-white">Phone</p>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-3 gap-4 justify-items-center items-center bg-black">
          <div
            className="bg-yellow-500 h-48 w-48 rounded-lg p-4"
            style={{ borderRadius }}
          >
            <p className="text-white font-bold">Name</p>
            <p className="text-white">Address</p>
            <p className="text-white">Phone</p>
          </div>
          <div
            className="bg-purple-500 h-48 w-48 rounded-lg p-4"
            style={{ borderRadius }}
          >
            <p className="text-white font-bold">Name</p>
            <p className="text-white">Address</p>
            <p className="text-white">Phone</p>
          </div>
          <div
            className="bg-pink-500 h-48 w-48 rounded-lg p-4"
            style={{ borderRadius }}
          >
            <p className="text-white font-bold">Name</p>
            <p className="text-white">Address</p>
            <p className="text-white">Phone</p>
          </div>
        </div>

        {/* Grid 3 */}
        <div className="grid grid-cols-3 gap-4 justify-items-center items-center bg-black">
          <div
            className="bg-orange-500 h-48 w-48 rounded-lg p-4"
            style={{ borderRadius }}
          >
            <p className="text-white font-bold">Name</p>
            <p className="text-white">Address</p>
            <p className="text-white">Phone</p>
          </div>
          <div
            className="bg-gray-500 h-48 w-48 rounded-lg p-4"
            style={{ borderRadius }}
          >
            <p className="text-white font-bold">Name</p>
            <p className="text-white">Address</p>
            <p className="text-white">Phone</p>
          </div>
          <div
            className="bg-indigo-500 h-48 w-48 rounded-lg p-4"
            style={{ borderRadius }}
          >
            <p className="text-white font-bold">Name</p>
            <p className="text-white">Address</p>
            <p className="text-white">Phone</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
