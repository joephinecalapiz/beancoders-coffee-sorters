/** @format */

import React from "react";
import { useNavigate } from "react-router-dom";

import BeansLogo from ".././assets/beansLogo.png";

const Topbar = () => {
  return (
    <div className="absolute flex flex-row w-full text-white text-[14px]">
      <div className="bg-black h-full w-full flex items-center">
        <img src={BeansLogo} alt="BeansLogo" className="h-16 w-16 mt-1" />
        <h1 className="text-white text-16px ml-2">BeanCoders</h1>
      </div>
    </div>
  );
};

export default Topbar;
