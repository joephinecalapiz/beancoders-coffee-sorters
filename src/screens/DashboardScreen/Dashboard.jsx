import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../../component/Topbar";
import Sidebar from "../../component/Sidebar";
import "../../Sidebar.css";
// import { Chart, LinearScale } from "chart.js";

const Dashboard = () => {
  const [navVisible, showNavbar] = useState(false);

  // Function to toggle the sidebar visibility
  const toggleSidebar = () => {
    showNavbar(!navVisible);
  };

  const gridStyle = {
    borderRadius: "25px",
    backgroundColor: "#CDCDCD",
  };
  const dashboardTitleSize = "32px";
  const dataTitleSize = "24px";
  const dataSize = "32px";
  const dataSizeColor = "#7F1F19";
  const centerText = { textAlign: "center" };
  const dashboardMarginTop = "60px";

  return (
    <>
      <Sidebar visible={navVisible} show={showNavbar} />
      <Topbar onToggleSidebar={toggleSidebar} />
      <div className={`App ${navVisible ? "content-shift-right" : ""}`}>
        <div className="p-5 sm:ml-32">
          <h1
            className="text-black mb-5"
            style={{
              fontSize: dashboardTitleSize,
              fontWeight: "bold",
              marginTop: dashboardMarginTop,
            }}
          >
            Dashboard
          </h1>

          <div className="grid grid-cols-1 gap-12 mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-9">
              <div
                className="flex items-center justify-center h-28"
                style={{ ...gridStyle, ...centerText }}
              >
                <div>
                  <h1 className="text-black" style={{ fontSize: dataTitleSize }}>
                    Pieces of Bad Beans
                  </h1>
                  <h1
                    className="text-black"
                    style={{ fontSize: dataSize, fontWeight: "bold", color: dataSizeColor }}
                  >
                    60g
                  </h1>
                </div>
              </div>
              <div
                className="flex items-center justify-center h-28"
                style={{ ...gridStyle, ...centerText }}
              >
                <div>
                  <h1 className="text-black" style={{ fontSize: dataTitleSize }}>
                    Pieces of Good Beans
                  </h1>
                  <h1
                    className="text-black"
                    style={{ fontSize: dataSize, fontWeight: "bold", color: dataSizeColor }}
                  >
                    60g
                  </h1>
                </div>
              </div>
              <div
                className="flex items-center justify-center h-28"
                style={{ ...gridStyle, ...centerText }}
              >
                <div>
                  <h1 className="text-black" style={{ fontSize: dataTitleSize }}>
                    KG of Bad Beans
                  </h1>
                  <h1
                    className="text-black"
                    style={{ fontSize: dataSize, fontWeight: "bold", color: dataSizeColor }}
                  >
                    60kg
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
