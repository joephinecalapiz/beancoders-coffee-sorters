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
      <div className="block inset-0">
        <div className="bg-BgLanding md:bg-cover bg-cover bg-opacity-20 h-screen w-full">
          <div className="relative text-white font-bold text-2xl py-[5%] flex flex-col items-end">
            <div className="mt-1">
              {/* <img src={BeansLogo} alt="BeansLogo" className="flex h-80 w-80 mt-5" /> */}
              <div className="px-4 poppins-font">
              <img src={BeansLogo} alt="BeansLogo" className="h-80 w-80" />
                <p className="text-4xl mb-4 md:text-5xl md:mb-12 md:block hidden">
                  BeanCoders:
                </p>
                <p className="mb-4 text-4xl md:text-6xl">
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
          <h1 className="text-white mb-8 md:mb-20 poppins-font text-3xl md:text-5xl mt-0 font-bold">
            Coffee Sorting Establishments
          </h1>
        </div>

        {/* Row 1*/}
        <div className="grid grid-cols-1 gap-10 sm:gap-10 md:gap-10 lg:gap-10 items-center">
          {companyData.length > 0 ? (
            companyData.map((detail, index) => (
              <div key={index} className={`mx-10 md:mx-20 lg:mx-48  h-64 relative col-span-3`}>
                <div className="relative">
                  {/* company info */}
                  <div className={`flex  text-white ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className="w-[45%] p-5 absolute text-base sm:text-3xl md:text-2xl lg:text-4xl text-white ml-5 mt-5">
                      {detail && (
                        <div className="font-bold font-['Poppins']">
                          <FontAwesomeIcon icon={faBuilding} className="mr-5" />
                          <span>{detail.companyName}</span>
                        </div>
                      )}
                      {detail && (
                        <div className="font-medium font-['Poppins']">
                          <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-5 mt-5" />
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
                          <FontAwesomeIcon icon={faPhone} className="mr-5 mt-5" />
                          <span>{detail.companyNumber}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* company image */}
                  <div className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
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
                <div className="inset-0 h-64 bg-stone-950 rounded-[20px]">
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center">No company data available.</div>
          )}
          <div className="flex items-center"></div>
          <br />
        </div>
      </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Landing;
