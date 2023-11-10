/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BeansLogo from "../../assets/beansLogo.png";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import api_endpoint from "../../config";
import Navbar from "../../component/Navbar";
import Footer from "./Footer";
import image_endpoint from "../../image-config";

const Landing = () => {
  const [companyData, setCompanyData] = useState([]);

  useEffect(() => {
    document.title = "Home";
  }, []);

  useEffect(() => {
    axios.get(api_endpoint + "/companies").then((response) => {
      const data = response.data;
      if (data.companies) {
        // Check if data.companies is defined
        setCompanyData(
          data.companies.map((company) => {
            const detail = company.details[0];
            if (detail && detail.images) {
              detail.images = detail.images.replace(/[\[\]\\\"]/g, "");
            }
            return detail;
          })
        );
      } else {
        setCompanyData([]); // Handle the case where data.companies is undefined or null
      }
      console.log(companyData);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-BgLanding md:bg-cover bg-cover bg-opacity-20 h-screen w-full">
        <div className="text-white font-bold text-2xl text-center py-4 md:py-16 flex flex-col items-center">
          <div className="md:ml-4 mt-1">
            <img src={BeansLogo} alt="BeansLogo" className="h-80 w-80 mt-5" />
          </div>
          <div className="text-center md:ml-32 px-4">
            <p className="text-4xl mb-4 md:text-5xl md:mb-12 font-poppins md:block hidden poppins-font">
              BeanCoders:
            </p>
            <p className=" mb-4 text-4xl md:text-6xl md:ml-96 poppins-font">
              Quality Bean Sorter
            </p>
          </div>
        </div>
      </div>

      <div className="bg-black">
        <div className="text-center justify-center items-center">
          <h1 className="text-white mb-8 md:mb-20 poppins-font text-3xl md:text-5xl mt-0 font-bold">
            Coffee Sorting Establishments
          </h1>
        </div>

        {/* Row 1*/}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 justify-items-center items-center mb-14 mx-4 md:mx-8">
          {companyData.length > 0 ? (
            companyData.map((detail, index) => (
              <div
                key={index}
                className="bg-brown md:min-h-[450px] md:w-76  rounded-lg p-2  flex flex-col relative shadow-4xl z-100"
              >
                {detail && detail.images ? (
                  <img
                    src={`${image_endpoint}/storage/${detail.images}`}
                    alt="beansLogo"
                    className="w-70 h-64 max-h-full max-w-full mb-4 items-center rounded-lg"
                  />
                ) : (
                  <div>No image available</div>
                )}

                {detail && detail.companyName ? (
                  <div className="text-white dark:text-textTitle font-bold text-3xl font-poppins mt-3 flex items-center">
                    <FontAwesomeIcon icon={faBuilding} className="mr-10" />
                    <span className="flex-grow">{detail.companyName}</span>
                  </div>
                ) : (
                  <div>No data available</div>
                )}

                {/* <div className="text-white dark:text-textTitle font-bold text-3xl font-poppins mt-3 flex items-center">
                  <FontAwesomeIcon icon={faBuilding} className="mr-10" />
                  <span className="flex-grow">{detail.companyName}</span>
                </div> */}

                {detail && (
                  <div className="text-white dark:text-textDesc text-3xl font-poppins mt-5 flex items-center">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-10" />
                    <a
                      href={`https://www.google.com/maps/search/?q=${encodeURIComponent(
                        detail.companyLocation
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-grow cursor-pointer"
                    >
                      {detail.companyLocation}
                    </a>
                  </div>
                )}

                {detail && (
                  <div className="text-white dark:text-textDesc text-3xl font-poppins mt-5 flex items-center">
                    <FontAwesomeIcon icon={faPhone} className="mr-10" />
                    <span className="flex-grow">{detail.companyNumber}</span>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div>No company data available.</div>
          )}
        </div>

        <div className="flex items-center"></div>
        <br />
      </div>
      <Footer></Footer>
    </>
  );
};

export default Landing;
