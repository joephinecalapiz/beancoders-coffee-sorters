/** @format */

import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import ManageUsers from "./ManageUsers";
import Feedbacks from "./Feedbacks";
import Error from "./Error";
import Profile from "./Profile";
import GenerateKeys from "./GenerateKey";
import Main from "./mainpage";
import {useSelector } from 'react-redux'

function AdminRootPage() {
    const navigate = useNavigate();
    const role = useSelector(state => state.auth.role);
    
    useEffect(() => {
        // const role = localStorage.getItem('token')
        // Check if the user_id is not 1 and navigate back if necessary
        if (role !== '1') {
            navigate("/superadmin/permission-denied"); // Go back to the previous page
            // window.location.reload();
        }
    }, []);

    return (
        <Routes>
            <Route
                path="/manageusers"
                element={
                    <Main>
                        <ManageUsers />
                    </Main>
                }
            />
            <Route
                path="/feedbacks"
                element={
                    <Main>
                        <Feedbacks />
                    </Main>
                }
            />
            <Route
                path="/generate-keys"
                element={
                    <Main>
                        <GenerateKeys />
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
                path="/error"
                element={
                    <Main>
                        <Error />
                    </Main>

                }
            />
            <Route path="*" element={<Error />} />
        </Routes>
    );
}

export default AdminRootPage;
