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
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="block mb-10 mt-20 top-9">
        <div className="bg-BgLanding bg-fixed md:bg-cover bg-cover bg-opacity-20 md:h-screen w-full sm:bg-scroll">
          <div className="text-white poppins-font font-bold text-2xl py-[5%] flex flex-col items-center md:items-end">
            <div className="mt-10 md:mt-1">
              <div className="px-6 md:mr-20">
                <div>
                  <img
                    src={BeansLogo}
                    alt="BeansLogo"
                    className="md:h-80 md:w-80 h-30 w-30 mt-8 md:mt-0 "
                  />
                  <p className="ml-26 poppins-font text-2xl block text-center md:hidden">
                    Arabica Coffee Beans Sorter
                  </p>
                </div>

                <p className="md:ml-36 poppins-font md:text-5xl md:mb-10 md:block hidden">
                  Bean Coders:
                </p>
                <p className="md:ml-36 poppins-font text-4xl md:block hidden md:text-6xl">
                  Quality Bean Sorter
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black">
          <div className="flex items-center"></div>
          <br />
          <div className="text-center justify-center items-center">
            <h1 className="text-white mb-8 md:mb-20 poppins-font text-3xl md:text-5xl mt-0 font-bold leading-[1.5]">
              Coffee Sorting Establishments
            </h1>
          </div>

          {/* Row 1*/}
          <div className="grid grid-cols-1 gap-10 sm:gap-10 md:gap-10 lg:gap-10 items-center">
            {companyData.length > 0 ? (
              companyData.map((detail, index) => (
                <div
                  key={index}
                  className={`mx-10 md:mx-20 lg:mx-48  h-64 relative col-span-3`}
                >
                  <div className="relative">
                    {/* company info */}
                    <div
                      className={`flex  text-white ${
                        index % 2 === 0 ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      <div className="w-[45%] p-5 absolute text-base sm:text-3xl md:text-2xl lg:text-4xl text-white ml-5 mt-5">
                        {detail && (
                          <div className="font-bold font-['Poppins']">
                            <FontAwesomeIcon
                              icon={faBuilding}
                              className="mr-2 md:mr-5s"
                            />
                            <span>{detail.companyName}</span>
                          </div>
                        )}
                        {detail && (
                          <div className="font-medium font-['Poppins']">
                            <FontAwesomeIcon
                              icon={faMapMarkerAlt}
                              className="mr-2 md:mr-5 mt-5"
                            />
                            <a
                              href={`https://www.google.com/maps/search/?q=${encodeURIComponent(
                                detail.companyLocation
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="cursor-pointer"
                            >
                              {detail.companyLocation}
                            </a>
                          </div>
                        )}
                        {detail && (
                          <div className="font-medium font-['Poppins']">
                            <FontAwesomeIcon
                              icon={faPhone}
                              className="mr-2 sm:mr-5 mt-5"
                            />
                            <span>{detail.companyNumber}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* company image */}
                    <div
                      className={`flex ${
                        index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                      }`}
                    >
                      <div className="w-[50%] absolute">
                        {detail && (
                          <img
                            src={`${image_endpoint}/storage/${detail.images}`}
                            alt="Coffee Beans"
                            className="min-w-full h-64 rounded-[20px]"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  {/* background container */}
                  <div className="inset-0 h-64 bg-stone-950 rounded-[20px]"></div>
                </div>
              ))
            ) : (
              <div className="col-span-4 text-center">
                No company data available.
              </div>
            )}
            <div className="flex items-center "></div>
            <br />
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Landing;
