/** @format */

import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ManageUsers from "./ManageUsers";
import Feedbacks from "./Feedbacks";
import Error from "./Error";

function AdminRootPage() {
    const [navVisible, showNavbar] = useState(false);

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
                path="/error404"
                element={
                    <div className={!navVisible ? "max-w-8xl mx-auto" : "page page-with-navbar"}>
                        <Error />
                    </div>
                }
            />
            <Route path="*" element={<Error />} />
        </Routes>
    );
}

export default AdminRootPage;
