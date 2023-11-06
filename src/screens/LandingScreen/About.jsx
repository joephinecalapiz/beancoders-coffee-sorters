/** @format */

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BeansLogo from "../../assets/beansLogo.png";
import Navbar from "../../component/Navbar";
import Footer from "./Footer";

const About = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "About Us";
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center bg-CoffeeBeans bg-cover min-h-screen w-full">
        {/* Use min-h-screen to make sure the div takes at least the height of the screen */}

        <img src={BeansLogo} alt="BeansLogo" className="h-80 w-80 mt-20" />

        <div className="text-center poppins-font text-white ">
          <h1 className="mt-1 mb-14 font-bold md:text-[40px] text-[30px]">
            About Arabica Coffee Beans Sorter
          </h1>
          <h3 className="text-justify poppins-font mb-12 md:text-[18px] text-[16px] m-5 md:ml-20 md:mr-20 ml-22 mr-22 md:leading-[1.7] bg-yellow-500 bg-opacity-30 shadow-lg">
            The Arabica coffee beans sorter is a sophisticated machine designed
            to separate coffee beans based on their size, quality, and color.
            This sorting process is essential to remove defective or damaged
            beans, foreign materials, and any other impurities that might have
            been mixed with the coffee cherries during harvesting or processing.
          </h3>

          <h3 className="text-justify poppins-font mb-12 md:text-[18px] text-[16px] m-5 md:ml-20 md:mr-20 ml-22 mr-22 md:leading-[1.7]">
            The sorter uses advanced technology, such as high maginification
            camera, to identify and categorize the beans accurately. As the
            coffee beans pass through the machine, the cameras detect variations
            in size, color, and quality, and based on predetermined criteria,
            the machine sorts the beans into different grades or quality levels.
            This ensures that only the highest-quality beans are used for
            roasting and brewing, while lower-grade beans can be used for other
            purposes or blends.
          </h3>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default About;
