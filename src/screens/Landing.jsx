/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BeansLogo from "../assets/beansLogo.png";
import Navbar from "../component/Navbar.jsx";

const Landing = () => {
  const [authenticated, setAuthenticated] = useState(null);
  const navigate = useNavigate();
  const borderRadius = "26px";
  const margin = "10px";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
    document.title = "Home";
  }, []);

  useEffect(() => {
    if (authenticated) {
      navigate("/dashboard");
    }
  }, [authenticated]);

  if (authenticated === null) {
    return <div>Loading...</div>;
  }

  const establishmentData = [
    {
      name: "The Coffee Haven",
      address: "Makati City, Metro Manila",
      phone: "123-456-7890",
    },
    {
      name: "Bean & Brews",
      address: "Quezon City, Metro Manila",
      phone: "987-654-3210",
    },
    {
      name: "Kape Kabitenyo",
      address: "Cavite City, Cavite",
      phone: "555-123-4567",
    },
    {
      name: "Baguio Beans",
      address: "Baguio City, Benguet",
      phone: "888-555-9999",
    },
    {
      name: "Batangas Brew",
      address: "Batangas City, Batangas",
      phone: "777-333-1111",
    },
    {
      name: "Cebu Coffee Co.",
      address: "Cebu City, Cebu",
      phone: "444-777-2222",
    },
    {
      name: "Davao Delight",
      address: "Davao City, Davao del Sur",
      phone: "666-888-4444",
    },
    {
      name: "Iloilo Infusion",
      address: "Iloilo City, Iloilo",
      phone: "999-222-8888",
    },
    // Add more establishment objects here
  ];

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center bg-BgLanding bg-cover h-screen w-full">
        <div className="text-white font-bold text-2xl">
          <p
            style={{
              fontSize: "40px",
              marginBottom: "1px",
              position: "absolute",
              top: "55%",
              left: "48%",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            BeanCoders:
          </p>
          <p
            style={{
              fontSize: "48px",
              position: "absolute",
              top: "65%",
              left: "55%",
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
            top: "38%",
            left: "57%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <img src={BeansLogo} alt="BeansLogo" className="h-80 w-80 mt-1" />
        </div>
      </div>

      <div className="bg-black h-full">
        <div className="text-center justify-center items-center">
          <h1
            style={{
              color: "white",
              marginBottom: "20px",
              fontFamily: "Poppins, sans-serif",
            }}
            className="mt-0 font-bold text-[40px]"
          >
            Coffee Sorting Establishments
          </h1>
        </div>

        {/* Row 1*/}
        <div className="grid grid-cols-4 gap-4 justify-items-center items-center mb-8 ml-8 mr-8">
          {establishmentData.map((establishment, index) => (
            <div
              key={index}
              className="bg-gray-200 h-59 w-74 rounded-lg p-4"
              style={{ borderRadius: "26px", margin: "10px" }}
            >
              <img
                src={BeansLogo}
                alt="beansLogo"
                className="h-25 w-25 mb-1"
                style={{ position: "relative", top: "-45px", left: "1px" }}
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
                {establishment.name}
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
                {establishment.address}
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
                {establishment.phone}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Landing;
