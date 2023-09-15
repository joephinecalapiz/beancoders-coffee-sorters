/** @format */

import React from "react";
import { NavLink } from "react-router-dom";
import {
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
      <nav
        className={`fixed z-20 inset-0 top-[2rem] left-[max(0px,calc(10%-100rem))] w-[15rem] ${
          collapsed ? "collapsed" : ""
        }`}
      >
        <div className="flex justify-between items-center">
          <div>{/* Your logo or other content here */}</div>
        </div>
        <div>
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
