/** @format */

import React from "react";
import { useNavigate } from "react-router-dom";
import BeansLogo from "../assets/beansLogo.png";
import Navbar from "../component/Navbar.jsx";

const Landing = () => {
  const navigate = useNavigate();
  const borderRadius = "26px";
  const margin = "10px";

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center bg-BgLanding bg-cover h-full w-full">
        <div className="text-white font-bold text-2xl">
          <p
            style={{
              fontSize: "40px",
              marginBottom: "1px",
              position: "absolute",
              top: "50%",
              left: "52%",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            BeanCoders:
          </p>
          <p
            style={{
              fontSize: "48px",
              position: "absolute",
              top: "58%",
              left: "60%",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Quality Bean Sorter
          </p>
        </div>
        <div
          className="logocontainer"
          style={{
            position: "absolute",
            top: "34%",
            left: "60%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <img src={BeansLogo} alt="BeansLogo" className="h-80 w-80 mt-1" />
        </div>
      </div>

      <div className="bg-black">
        <div className="text-center justify-center items-center">
          <h1
            style={{ color: "white", marginBottom: "20px" }}
            className="mt-0 font-bold text-[40px]"
          >
            Coffee Sorting Establishments
          </h1>
        </div>

        {/* Row 1*/}
        <div className="grid grid-cols-4 gap-4 justify-items-center items-center mb-8 ml-8 mr-8">
          <div
            className="bg-gray-200 h-59 w-74 rounded-lg p-4"
            style={{ borderRadius, margin }}
          >
            <img
              src={BeansLogo}
              alt="beansLogo"
              className="h-25 w-25 mb-1"
              style={{
                position: "relative",
                top: "-45px",
                left: "1px",
              }}
            />
            <p
              className="text-black font-bold"
              style={{
                position: "relative",
                top: "-70px",
                fontSize: "24px",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Name
            </p>
            <p
              className="text-black"
              style={{
                position: "relative",
                top: "-45px",
                fontSize: "24px",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Address
            </p>
            <p
              className="text-black"
              style={{
                position: "relative",
                top: "-20px",
                fontSize: "24px",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Phone
            </p>
          </div>

          <div
            className="bg-gray-200 h-59 w-74 rounded-lg p-4"
            style={{ borderRadius, margin }}
          >
            <img
              src={BeansLogo}
              alt="beansLogo"
              className="h-25 w-25 mb-1"
              style={{
                position: "relative",
                top: "-45px",
                left: "1px",
              }}
            />
            <p
              className="text-black font-bold"
              style={{
                position: "relative",
                top: "-70px",
                fontSize: "24px",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Name
            </p>
            <p
              className="text-black"
              style={{
                position: "relative",
                top: "-45px",
                fontSize: "24px",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Address
            </p>
            <p
              className="text-black"
              style={{
                position: "relative",
                top: "-20px",
                fontSize: "24px",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Phone
            </p>
          </div>

          <div
            className="bg-gray-200 h-59 w-74 rounded-lg p-4"
            style={{ borderRadius, margin }}
          >
            <img
              src={BeansLogo}
              alt="beansLogo"
              className="h-25 w-25 mb-1"
              style={{
                position: "relative",
                top: "-45px",
                left: "1px",
              }}
            />
            <p
              className="text-black font-bold"
              style={{
                position: "relative",
                top: "-70px",
                fontSize: "24px",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Name
            </p>
            <p
              className="text-black"
              style={{
                position: "relative",
                top: "-45px",
                fontSize: "24px",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Address
            </p>
            <p
              className="text-black"
              style={{
                position: "relative",
                top: "-20px",
                fontSize: "24px",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Phone
            </p>
          </div>

          <div
            className="bg-gray-200 h-59 w-74 rounded-lg p-4"
            style={{ borderRadius, margin }}
          >
            <img
              src={BeansLogo}
              alt="beansLogo"
              className="h-25 w-25 mb-1"
              style={{
                position: "relative",
                top: "-45px",
                left: "1px",
              }}
            />
            <p
              className="text-black font-bold"
              style={{
                position: "relative",
                top: "-70px",
                fontSize: "24px",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Name
            </p>
            <p
              className="text-black"
              style={{
                position: "relative",
                top: "-45px",
                fontSize: "24px",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Address
            </p>
            <p
              className="text-black"
              style={{
                position: "relative",
                top: "-20px",
                fontSize: "24px",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Phone
            </p>
          </div>
        </div>

        {/* Row 2*/}
        <div className="grid grid-cols-4 gap-4 justify-items-center items-center mb-8 ml-8 mr-8">
          <div
            className="bg-gray-200 h-59 w-74 rounded-lg p-4"
            style={{ borderRadius, margin }}
          >
            <img
              src={BeansLogo}
              alt="beansLogo"
              className="h-25 w-25 mb-1"
              style={{
                position: "relative",
                top: "-45px",
                left: "1px",
              }}
            />
            <p
              className="text-black font-bold"
              style={{
                position: "relative",
                top: "-70px",
                fontSize: "24px",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Name
            </p>
            <p
              className="text-black"
              style={{
                position: "relative",
                top: "-45px",
                fontSize: "24px",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Address
            </p>
            <p
              className="text-black"
              style={{
                position: "relative",
                top: "-20px",
                fontSize: "24px",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Phone
            </p>
          </div>

          <div
            className="bg-gray-200 h-59 w-74 rounded-lg p-4"
            style={{ borderRadius, margin }}
          >
            <img
              src={BeansLogo}
              alt="beansLogo"
              className="h-25 w-25 mb-1"
              style={{
                position: "relative",
                top: "-45px",
                left: "1px",
              }}
            />
            <p
              className="text-black font-bold"
              style={{
                position: "relative",
                top: "-70px",
                fontSize: "24px",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Name
            </p>
            <p
              className="text-black"
              style={{
                position: "relative",
                top: "-45px",
                fontSize: "24px",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Address
            </p>
            <p
              className="text-black"
              style={{
                position: "relative",
                top: "-20px",
                fontSize: "24px",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Phone
            </p>
          </div>

          <div
            className="bg-gray-200 h-59 w-74 rounded-lg p-4"
            style={{ borderRadius, margin }}
          >
            <img
              src={BeansLogo}
              alt="beansLogo"
              className="h-25 w-25 mb-1"
              style={{
                position: "relative",
                top: "-45px",
                left: "1px",
              }}
            />
            <p
              className="text-black font-bold"
              style={{
                position: "relative",
                top: "-70px",
                fontSize: "24px",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Name
            </p>
            <p
              className="text-black"
              style={{
                position: "relative",
                top: "-45px",
                fontSize: "24px",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Address
            </p>
            <p
              className="text-black"
              style={{
                position: "relative",
                top: "-20px",
                fontSize: "24px",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Phone
            </p>
          </div>

          <div
            className="bg-gray-200 h-59 w-74 rounded-lg p-4"
            style={{ borderRadius, margin }}
          >
            <img
              src={BeansLogo}
              alt="beansLogo"
              className="h-25 w-25 mb-1"
              style={{
                position: "relative",
                top: "-45px",
                left: "1px",
              }}
            />
            <p
              className="text-black font-bold"
              style={{
                position: "relative",
                top: "-70px",
                fontSize: "24px",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Name
            </p>
            <p
              className="text-black"
              style={{
                position: "relative",
                top: "-45px",
                fontSize: "24px",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Address
            </p>
            <p
              className="text-black"
              style={{
                position: "relative",
                top: "-20px",
                fontSize: "24px",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Phone
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
