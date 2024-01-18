/** @format */

import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./DashboardScreen/Dashboard";
import Customers from "./DashboardScreen/Customers";
import CustomerArchived from "./Archives/CustomerArchived";
import StatusArchived from "./Archives/StatusArchived";
import Sorters from "./DashboardScreen/Sorters";
import Status from "./DashboardScreen/Status";
import Profile from "./ProfileScreen/Profile";
import CustomerHistory from "./DashboardScreen/CustomerHistory";
import Receipt from "./ReceiptScreen/Receipt";
import Error from "./Error";
import PermissionDenied from "./DeniedAccess";
import Main from "./Mainpage";

function RootPage() {

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
                path="/archive/customer"
                element={
                    <CustomerArchived />
                }
            />
            <Route
                path="/archive/status"
                element={
                    <StatusArchived />
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
                    <Profile />
                }
            />
            <Route
                path="/customers/history/:customerName/:customerId"
                element={
                    <CustomerHistory />
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
                    <Error />
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
