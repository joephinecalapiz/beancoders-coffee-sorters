/** @format */

import React from 'react';
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
import { NavLink } from "react-router-dom";
import "./sidebar.css";

const ICON_SIZE = 20;

function Sidebar({visible, show}) {

	return (
		<>
			<div className="mobile-nav">
				<button
					className="mobile-nav-btn"
					onClick={() => show(!visible)}
				>
					<FaBars size={24}  />
				</button>
			</div>
			<nav className={!visible ? 'navbar' : ''}>
				<button
					type="button"
					className="nav-btn"
					onClick={() => show(!visible)}
				>
					{ !visible
						? <FaAngleRight size={30} /> : <FaAngleLeft size={30} />}
				</button>
				<div>
					{/* <NavLink
						className="logo"
						to="/"
					>
							<img
								src={require("../assets/Images/logo.png")}
								alt="logo"
							/>
					</NavLink> */}
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
							<span>Status </span>
						</NavLink>
					</div>
				</div>
				<div className="links">
				</div>
			</nav>
		</>
  );
}

export default Sidebar;
