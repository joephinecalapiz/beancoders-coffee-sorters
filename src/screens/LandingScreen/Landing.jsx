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
      <div className="block">
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
          <div className="text-center justify-center items-center">
            <h1 className="text-white mb-8 md:mb-20 poppins-font text-3xl md:text-5xl mt-0 font-bold">
              Coffee Sorting Establishments
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center items-center mb-14 mx-4">
            {companyData.length > 0 ? (
              companyData.map((detail, index) => (
                <div
                  key={index}
                  className="bg-white md:min-h-[250px] md:w-65 rounded-lg p-2 flex flex-col relative shadow-4xl z-100 md:flex-row"
                >
                  {/* Image Section */}
                  {/* <div className="md:w-[50%] md:absolute"> */}
                  <div className="md:w-1/2 md:flex-shrink-0 md:relative md:h-full">
                    {detail && detail.images ? (
                      <img
                        src={`${image_endpoint}/storage/${detail.images}`}
                        alt="beansLogo"
                        className="w-70 h-64 md:w-70 md:h-64 max-h-full max-w-full mb-4 items-center  "
                      />
                    ) : (
                      <div>No image available</div>
                    )}
                  </div>

                  {/* Details Section */}
                  <div className="md:pl-6 md:order-2 md:w-50">
                    {detail && detail.companyName ? (
                      <div className="text-black poppins-font  dark:text-textTitle font-bold text-3xl mt-3 flex items-center">
                        <FontAwesomeIcon icon={faBuilding} className="mr-10" />
                        <span className="flex-grow">{detail.companyName}</span>
                      </div>
                    ) : (
                      <div>No data available</div>
                    )}

                    {detail && (
                      <div className="text-black poppins-font dark:text-textDesc text-3xl mt-5 flex items-center">
                        <FontAwesomeIcon
                          icon={faMapMarkerAlt}
                          className="mr-10"
                        />
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
                      <div className="text-black poppins-font dark:text-textDesc text-3xl font-poppins mt-5 flex items-center">
                        <FontAwesomeIcon icon={faPhone} className="mr-10" />
                        <span className="flex-grow">
                          {detail.companyNumber}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-4 text-center">
                No company data available.
              </div>
            )}
          </div>

          <div className="flex items-center"></div>
          <br />
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};

export default Landing;
