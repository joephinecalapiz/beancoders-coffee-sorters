/** @format */

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api_endpoint from "../../config";
import Sidebar from "../../component/Sidebar";
import Topbar from "../../component/Topbar";

const Receipt = ({ toggleSidebar }) => {
  const { customerId } = useParams();
  const [receiptDetails, setReceiptDetails] = useState([]);
  const [navVisible, setNavVisible] = useState(false); // Use setNavVisible to update the navVisible state

  useEffect(() => {
    fetchReceiptDetails();
  }, []);

  const fetchReceiptDetails = async () => {
    try {
      const response = await fetch(api_endpoint + `/receipts/${customerId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch receipt details");
      }
      const data = await response.json();
      setReceiptDetails(data);
    } catch (error) {
      console.error("Error fetching receipt details:", error);
    }
  };

  const handleToggleSidebar = () => {
    setNavVisible(!navVisible); // Toggle the navVisible state
    toggleSidebar(); // Call the parent component's toggleSidebar function
  };

  return (
    <>
      <div>
        <Sidebar
          collapsed={navVisible}
          handleToggleSidebar={handleToggleSidebar}
        />
        <Topbar onToggleSidebar={handleToggleSidebar} />

        <div
          className={`App ${navVisible ? "content-shift-right" : ""}`}
          style={{ backgroundColor: "#d4d4d4" }}
        >
          <div className={`p-10 ${navVisible ? "ml-0" : "sm:ml-64"}`}>
            <div className="flex items-center">
              <h1 className="profile-title">
                Receipt for Customer ID: {customerId}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Receipt;
