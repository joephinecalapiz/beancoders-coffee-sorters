/** @format */

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../../component/Topbar";
import Sidebar from "../../component/Sidebar";
// import { Chart, LinearScale } from "chart.js";

const Dashboard = () => {
  const [navVisible, showNavbar] = useState(false);

  return (
    <>
      <Sidebar visible={navVisible} show={showNavbar} />
      <Topbar />
      <div className="App">
        <div className="m-auto p-4 sm:ml-64">
          <p class="text-2xl text-gray-400 dark:text-gray-500">
            <h1 className="text-black text-16px">Dashboard</h1>
          </p>
          <div className="mt-auto">
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div className="flex items-center justify-center h-24 rounded bg-gray-300 dark:bg-gray-800">
                <div>
                  <h1 className="text-black text-16px">Bad Beans</h1>
                  <h1 className="text-2xl text-black text-16px ml-2 justify-center flex items-center">
                    60g
                  </h1>
                </div>
              </div>
              <div className="flex items-center justify-center h-24 rounded bg-gray-300 dark:bg-gray-800">
                <div>
                  <h1 className="text-black text-16px">Good Beans</h1>
                  <h1 className="text-2xl text-black text-16px ml-2 justify-center flex items-center">
                    60g
                  </h1>
                </div>
              </div>
              <div className="flex items-center justify-center h-24 rounded bg-gray-300 dark:bg-gray-800">
                <div>
                  <h1 className="text-black text-16px ml-10 mr-10">
                    KG of Bad Beans
                  </h1>
                  <h1 className="text-2xl text-black text-16px ml-2 justify-center flex items-center">
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
