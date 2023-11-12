/** @format */

import AdminSidebar from "../component/AdminSidebar";
import AdminTop from "../component/AdminTopbar";
import React, { useState, useEffect } from "react";

function Main({ children }) {
  const [navVisible, showNavbar] = useState(window.innerWidth <= 767);

  useEffect(() => {
    const handleResize = () => {
      showNavbar(window.innerWidth <= 767);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    showNavbar(!navVisible);
  };

  return (
    <>
      <AdminTop
        onToggleSidebar={toggleSidebar}
        collapsed={navVisible}
        handleToggleSidebar={toggleSidebar}
      />
      <AdminSidebar
        collapsed={navVisible}
        handleToggleSidebar={toggleSidebar}
      />
      <div
        className={`main relative z-5 inset-0 mt-16  ${
          !navVisible ? "sm:ml-60" : "sm:ml-16"
        }`}
        style={{
          transition: "margin-left 0.3s ease",
        }}
      >
        {children}
      </div>
    </>
  );
}

export default Main;
