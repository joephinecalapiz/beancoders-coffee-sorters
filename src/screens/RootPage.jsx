/** @format */

import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Dashboard from "./DashboardScreen/Dashboard";
import Customers from "./DashboardScreen/Customers";
import CustomerArchived from "./Archives/CustomerArchived";
import StatusArchived from "./Archives/StatusArchived";
import Sorters from "./DashboardScreen/Sorters";
import Status from "./DashboardScreen/Status";
import Profile from "./ProfileScreen/Profile";
import SortingStatus from "./DashboardScreen/SortingStatus";
import Receipt from "./ReceiptScreen/Receipt";
import Error from "./error";
import PermissionDenied from "./DeniedAccess";

function RootPage() {
    const [navVisible, showNavbar] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem("role");
        // Check if the user_id is not 1 and navigate back if necessary
        if (role !== "2") {
          navigate("/error404"); // Go back to the previous page
          // window.location.reload();
        }
      }, []);

    return (
        <Routes>
            <Route
                path="/dashboard"
                element={
                    <div className={!navVisible ? "max-w-8xl mx-auto pl-16" : "page page-with-navbar"} >
                        <Dashboard />
                    </div>
                }
            />
            <Route
                path="/customers"
                element={
                    <div className={!navVisible ? "max-w-8xl mx-auto pl-16" : "page page-with-navbar"}>
                        <Customers />
                    </div>
                }
            />
            <Route
                path="/customer-archived"
                element={
                    <div className={!navVisible ? "max-w-8xl mx-auto pl-16" : "page page-with-navbar"}>
                        <CustomerArchived />
                    </div>
                }
            />
            <Route
                path="/status-archived"
                element={
                    <div className={!navVisible ? "max-w-8xl mx-auto pl-16" : "page page-with-navbar"}>
                        <StatusArchived />
                    </div>
                }
            />
            <Route
                path="/sorters"
                element={
                    <div className={!navVisible ? "max-w-8xl mx-auto pl-16" : "page page-with-navbar"}>
                        <Sorters />
                    </div>
                }
            />
            <Route
                path="/status"
                element={
                    <div className={!navVisible ? "max-w-8xl mx-auto pl-16" : "page page-with-navbar"}>
                        <Status />
                    </div>
                }
            />
            <Route
                path="/profile"
                element={
                    <div>
                        <Profile />
                    </div>
                }
            />
            <Route
                path="/customers/customerstatus/:customerName/:customerId"
                element={
                    <div>
                        <SortingStatus />
                    </div>
                }
            />
            <Route
                path="/status/receipt/:customerId"
                element={
                    <div>
                        <Receipt />
                    </div>
                }
            />
            <Route
                path="/error404"
                element={
                    <div className={!navVisible ? "max-w-8xl mx-auto" : "page page-with-navbar"}>
                        <Error />
                    </div>
                }
            />
            <Route
                path="/permission-denied"
                element={
                    <div className={!navVisible ? "max-w-8xl mx-auto" : "page page-with-navbar"}>
                        <PermissionDenied />
                    </div>
                }
            />
            <Route path="*" element={<Error />} />
        </Routes>
    );
}

export default RootPage;
