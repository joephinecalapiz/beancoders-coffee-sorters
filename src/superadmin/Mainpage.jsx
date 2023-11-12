import React, { useState } from "react";
import AdminSidebar from "../component/AdminSidebar";
import AdminTop from "../component/AdminTopbar";

function Main({ children }) {
    const [navVisible, showNavbar] = useState(false);

    const toggleSidebar = () => {
        showNavbar(!navVisible);
    };

    return (
        <>
            <AdminTop onToggleSidebar={toggleSidebar}
                collapsed={navVisible}
                handleToggleSidebar={toggleSidebar} />
            <AdminSidebar collapsed={navVisible} handleToggleSidebar={toggleSidebar} />
            <div className={`main relative z-5 inset-0 mt-16  ${!navVisible ? "sm:ml-60" : "sm:ml-16"}`}
                style={{
                    transition: "margin-left 0.3s ease",
                }}
            >
                {children}
            </div>
        </>
    )
}

export default Main