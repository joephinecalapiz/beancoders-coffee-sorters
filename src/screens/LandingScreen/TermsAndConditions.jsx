/** @format */

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BeansLogo from "../../assets/beansLogo.png";
import Navbar from "../../component/Navbar";
import Footer from "./Footer";

const TermsAndConditions = () => {

  useEffect(() => {
    document.title = "Terms and Conditions";
  }, []);

  return (
    <>
      <Navbar />
      <div className="md:mt-12 flex flex-col justify-center items-center bg-CoffeeBeans bg-cover h-full w-full">
        {/* Use min-h-screen to make sure the div takes at least the height of the screen */}

        <img src={BeansLogo} alt="BeansLogo" className="h-80 w-80 mt-20" />
        <div className="text-center poppins-font text-white">
          <h1 className="font-bold md:text-[40px] text-[30px] z-50">
            Terms and Conditions
          </h1>
          <div className="terms-and-conditions mx-10 text-justify">
            <p className="text-center">Welcome to Beancoders Website!</p>
            <p className="mb-5 text-center">By accessing this website, you agree to be bound by these terms and conditions.</p>
            <div className="mb-5">
              <h3>1. Acceptance of Terms</h3>
              <p>By using the Coffee Bean Sorter machine provided by beancoders.online, you acknowledge and agree that you have read, understood, and accepted the terms outlined herein. These terms govern your use of the machine and related services.</p>
              <p>When you use our coffee bean sorting website, you're agreeing to follow these rules. If you don't agree, please don't use our site.</p>
            </div>
            <div className="mb-5">
              <h3>2. Use of the Website</h3>
              <p>The website facilitates the tracking and management of bean counts sorted by our machines, allowing customers, sorter operators, and coffee bean sorter stores to monitor the status of sorting requests. Customers can submit bean count requests, and the website provides real-time updates on the sorting process, including details on the sorter responsible for the task.</p>
              <p>Unauthorized use, reproduction, or distribution of content from this website, including proprietary information related to bean counts, sorting statuses, and operational details, is strictly prohibited. Any breach of these terms may result in the revocation of access to the website and legal action.</p>
            </div>
            <div className="mb-10">
              <h3>3. Privacy Policy</h3>
              <p>We take your privacy seriously. By using our Coffee Bean Sorter machine and services, you consent to the collection and use of your information as outlined in our Privacy Policy. We may collect data related to the operation of the machine for improvement purposes, and we assure you that we handle your information with the utmost care and confidentiality.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default TermsAndConditions;
