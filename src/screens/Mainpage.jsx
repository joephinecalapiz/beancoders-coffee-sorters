import Sidebar from '../component/Sidebar'
import Topbar from '../component/Topbar';
import React, { useState } from "react";

function Main({ children }) {
    const [navVisible, showNavbar] = useState(false);

    const toggleSidebar = () => {
        showNavbar(!navVisible);
    };

    return (
        <>
            <Topbar onToggleSidebar={toggleSidebar}
                collapsed={navVisible}
                handleToggleSidebar={toggleSidebar} />
            <Sidebar collapsed={navVisible} handleToggleSidebar={toggleSidebar} />
            <div className={`main relative z-5 inset-0 mt-16  ${!navVisible ? "sm:ml-60" : "ml-16"}`}
                style={{
                    transition: "margin-left 0.3s ease",
                }}
            >
                <div className={`mx-auto ${navVisible ? "" : ""}`}
                >
                    {children}
                </div>
            </div>
        </>
    )
}

export default Main