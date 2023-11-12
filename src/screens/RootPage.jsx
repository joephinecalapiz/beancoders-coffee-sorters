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
import Main from "./mainpage";

function RootPage() {
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
                    <Main>
                        <Dashboard />
                    </Main>
                }
            />
            <Route
                path="/customers"
                element={
                    <Main>
                    <Customers />
                </Main>
                }
            />
            <Route
                path="/customer-archived"
                element={
                    <Main>
                    <CustomerArchived />
                </Main>
                }
            />
            <Route
                path="/status-archived"
                element={
                    <Main>
                    <StatusArchived />
                </Main>
                }
            />
            <Route
                path="/sorters"
                element={
                     <Main>
                     <Sorters />
                 </Main>

                }
            />
            <Route
                path="/status"
                element={
                    <Main>
                    <Status />
                </Main>
                    
                }
            />
            <Route
                path="/profile"
                element={
                    <Main>
                    <Profile />
                </Main>
                }
            />
            <Route
                path="/customers/customerstatus/:customerName/:customerId"
                element={
                    <Main>
                    <SortingStatus />
                </Main>
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
                    <Main>
                    <Error />
                </Main>
                }
            />
            <Route
                path="/permission-denied"
                element={
                    <Main>
                    <PermissionDenied />
                </Main>
                }
            />
            <Route path="*" element={<Error />} />
        </Routes>
    );
}

export default RootPage;
