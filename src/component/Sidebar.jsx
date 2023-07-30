import React, { useState } from 'react';
import {
  FaAngleRight,
  FaAngleLeft,
  FaChartBar,
  FaThLarge,
  FaShoppingCart,
  FaCog,
  FaSignOutAlt,
  FaBars
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import '../sidebar.css';

const ICON_SIZE = 20;

function Sidebar() {
  const [visible, setVisible] = useState(true); // Set the initial state to true

  const handleToggleSidebar = () => {
    setVisible(!visible); // Toggle the visibility of the sidebar
  };

  return (
    <>
      <div className="mobile-nav">
        <button className="mobile-nav-btn" onClick={handleToggleSidebar}>
          <FaBars size={24} />
        </button>
      </div>
      <nav className={!visible ? 'navbar' : ''}>
        <button type="button" className="nav-btn" onClick={handleToggleSidebar}>
          {!visible ? <FaAngleRight size={30} /> : <FaAngleLeft size={30} />}
        </button>
        <div>
          {/* Your logo NavLink (commented out for this example) */}
          <div className="links nav-top">
            <NavLink to="/dashboard" className="nav-link">
              <FaThLarge size={ICON_SIZE} />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/customers" className="nav-link">
              <FaShoppingCart size={ICON_SIZE} />
              <span>Customers</span>
            </NavLink>
            <NavLink to="/sorters" className="nav-link">
              <FaShoppingCart size={ICON_SIZE} />
              <span>Sorters</span>
            </NavLink>
            <NavLink to="/status" className="nav-link">
              <FaChartBar size={ICON_SIZE} />
              <span>Status</span>
            </NavLink>
          </div>
        </div>
        <div className="links">{/* Add any other links you need here */}</div>
      </nav>
    </>
  );
}

export default Sidebar;
