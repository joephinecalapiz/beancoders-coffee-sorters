/** @format */

import React from "react";
import { useNavigate } from "react-router-dom";
import BeansLogo from "../assets/beansLogo.png";
import Navbar from "../component/Navbar";

const About = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center bg-CoffeeBeans bg-cover h-screen w-full">
        <img src={BeansLogo} alt="BeansLogo" className="h-80 w-80 mt-1" />

        <div className="text-center">
          <h1
            style={{ color: "white" }}
            className="mt-1 mb-14 font-bold text-[40px]"
          >
            About Arabica Coffee Beans Sorter
          </h1>
          <h3
            style={{ color: "white" }}
            className="mb-12 font-bold text-[18px] ml-20 mr-20"
          >
            The Arabica coffee beans sorter is a sophisticated machine designed
            to separate coffee beans based on their size, shape, and color. This
            sorting process is essential to remove defective or damaged beans,
            foreign materials, and any other impurities that might have been
            mixed with the coffee cherries during harvesting or processing.
          </h3>
          <h3
            style={{ color: "white" }}
            className="font-bold text-[18px] ml-14 mr-14"
          >
            The sorter uses advanced technology, such as optical sensors, to
            identify and categorize the beans accurately. As the coffee beans
            pass through the machine, the sensors detect variations in size,
            color, and shape, and based on predetermined criteria, the machine
            sorts the beans into different grades or quality levels. This
            ensures that only the highest-quality beans are used for roasting
            and brewing, while lower-grade beans can be used for other purposes
            or blends.
          </h3>
        </div>
      </div>
    </>
  );
};

export default About;
