/** @format */

import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ManageUsers from "./ManageUsers";
import Feedbacks from "./Feedbacks";
import Error from "./Error";
import Profile from "./Profile";
import GenerateKeys from "./GenerateKey";
import PermissionDenied from "./DeniedAccess";

function AdminRootPage() {
    const [navVisible, showNavbar] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem("role");
        // Check if the user_id is not 1 and navigate back if necessary
        if (role !== "1") {
          navigate("/superadmin/permission-denied"); // Go back to the previous page
          // window.location.reload();
        }
      }, []);

    return (
        <Routes>
            <Route
                path="/manageusers"
                element={
                    <div className={!navVisible ? "max-w-8xl mx-auto pl-16" : "page page-with-navbar"}>
                        <ManageUsers />
                    </div>
                }
            />
            <Route
                path="/feedbacks"
                element={
                    <div className={!navVisible ? "max-w-8xl mx-auto pl-16" : "page page-with-navbar"}>
                        <Feedbacks />
                    </div>
                }
            />
            <Route
                path="/generate-keys"
                element={
                    <div className={!navVisible ? "max-w-8xl mx-auto pl-16" : "page page-with-navbar"}>
                        <GenerateKeys />
                    </div>
                }
            />
            <Route
                path="/profile"
                element={
                    <div className={!navVisible ? "max-w-8xl mx-auto pl-16" : "page page-with-navbar"}>
                        <Profile />
                    </div>
                }
            />
            <Route
                path="/error"
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

export default AdminRootPage;
