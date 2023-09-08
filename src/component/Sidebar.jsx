/** @format */
import { NavLink } from "react-router-dom";
import "./../css/sidebar.css";
import React from "react";
import {
  FaAngleRight,
  FaAngleLeft,
  FaChartBar,
  FaThLarge,
  FaUsers,
  FaUserFriends,
  FaBars,
} from "react-icons/fa";

  const ICON_SIZE = 20;

function Sidebar({ collapsed, handleToggleSidebar }) {
  return (
    <>
      {/* <div className="mobile-nav">
        <button className="mobile-nav-btn" onClick={handleToggleSidebar}>
          <FaBars size={24} />
        </button>
      </div> */}
      <nav className={collapsed ? "collapsed" : "fixed z-20 inset-0 top-[3.4rem] left-[max(0px,calc(10%-100rem))] right-auto w-[12.5rem]"}>
        <button type="button" className="nav-btn" onClick={handleToggleSidebar}>
          {collapsed ? <FaAngleRight size={30} /> : <FaAngleLeft size={30} />}
        </button>
        <div>
          {/* Your logo NavLink (commented out for this example) */}
          <div className="links nav-top">
            <NavLink to="/dashboard" className="nav-link">
              <span className="icon">
                <FaThLarge size={ICON_SIZE} />
              </span>
              <span
                className={!collapsed ? "text-visible" : ""}
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Dashboard
              </span>
            </NavLink>
            <NavLink to="/customers" className="nav-link">
              <span className="icon">
                <FaUsers size={ICON_SIZE} />{" "}
                {/* Use FaUser icon for Customers */}
              </span>
              <span
                className={!collapsed ? "text-visible" : ""}
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Customers
              </span>
            </NavLink>
            <NavLink to="/sorters" className="nav-link">
              <span className="icon">
                <FaUserFriends size={ICON_SIZE} />{" "}
                {/* Use FaSort icon for Sorters */}
              </span>
              <span
                className={!collapsed ? "text-visible" : ""}
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Sorters
              </span>
            </NavLink>
            <NavLink to="/status" className="nav-link">
              <span className="icon">
                <FaChartBar size={ICON_SIZE} />
              </span>
              <span
                className={!collapsed ? "text-visible" : ""}
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Status
              </span>
            </NavLink>
          </div>
        </div>
        <div className="links">{/* Add any other links you need here */}</div>
      </nav>
    </>
  );
}

  export default Sidebar;
