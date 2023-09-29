/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BeansLogo from "../assets/beansLogo.png";
import Navbar from "../component/Navbar.jsx";
import axios from "axios";
import api_endpoint from "../config";
const Landing = () => {
  const [authenticated, setAuthenticated] = useState(null);
  const [companyData, setCompanyData] = useState([]);
  const navigate = useNavigate();

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
    axios.get(api_endpoint + "/companies").then((response) => {
      const data = response.data;
      setCompanyData(data.companies.map((company) => company.details[0]));
    });
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
    // Add more establishment objects here
    {
      name: "The Coffee Haven",
      address: "Makati City, Metro Manila",
      phone: "123-456-7890",
    },
    {
      name: "The Coffee Haven",
      address: "Makati City, Metro Manila",
      phone: "123-456-7890",
    },
    {
      name: "The Coffee Haven",
      address: "Makati City, Metro Manila",
      phone: "123-456-7890",
    },
    {
      name: "The Coffee Haven",
      address: "Makati City, Metro Manila",
      phone: "123-456-7890",
    },
    {
      name: "The Coffee Haven",
      address: "Makati City, Metro Manila",
      phone: "123-456-7890",
    },
    {
      name: "The Coffee Haven",
      address: "Makati City, Metro Manila",
      phone: "123-456-7890",
    },
    {
      name: "The Coffee Haven",
      address: "Makati City, Metro Manila",
      phone: "123-456-7890",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="bg-BgLanding md:bg-cover bg-cover bg-opacity-20 h-screen w-full">
        <div className="text-white font-bold text-2xl text-center py-4 md:py-16 flex flex-col items-center">
          <div className="md:ml-4 mt-1">
            <img src={BeansLogo} alt="BeansLogo" className="h-80 w-80 mt-5" />
          </div>
          <div className="text-center md:ml-32 px-4">
            <p className="text-4xl mb-4 md:text-5xl md:mb-12 font-poppins md:block hidden">
              BeanCoders:
            </p>
            <p className=" mb-4 text-4xl md:text-6xl md:ml-96 font-poppins">
              Quality Bean Sorter
            </p>
          </div>
        </div>
      </div>

      <div className="bg-black ">
        <div className="text-center justify-center items-center">
          <h1 className="text-white mb-8 md:mb-20 font-poppins text-3xl md:text-5xl mt-0 font-bold">
            Coffee Sorting Establishments
          </h1>
        </div>

        {/* Row 1*/}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 justify-items-center items-center mb-8 mx-4 md:mx-8">
          {companyData.map((detail, index) => (
            <div
              key={index}
              className="bg-gray-200 h-59 w-full md:w-74 rounded-lg p-4 border border-gray-300"
            >
              <img
                src={BeansLogo}
                alt="beansLogo"
                className="h-25 w-25 mb-1 relative top-[-45px] md:left-0 md:mt-0"
              />
              <p className="text-black dark:text-textTitle font-bold relative top-[-70px] text-3xl font-poppins">
                {detail.companyName}
              </p>
              <p className="text-black dark:text-textDesc relative top-[-45px] text-3xl font-poppins">
                {detail.companyLocation}
              </p>
              <p className="text-black dark:text-textDesc relative top-[-20px] text-3xl font-poppins">
                {detail.companyNumber}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center"></div>
        <br />
      </div>
    </>
  );
};

export default Landing;
