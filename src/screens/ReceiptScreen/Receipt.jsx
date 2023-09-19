/** @format */

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import api_endpoint from "../../config";
import Sidebar from "../../component/Sidebar";
import Topbar from "../../component/Topbar";
import html2canvas from "html2canvas";
import "../../css/receipt.css";
import jsPDF from "jspdf";
import BeansLogo from "../../assets/beansLogo.png"; // Import the image here

const Receipt = () => {
  const { customerId } = useParams();
  const [receiptDetails, setReceiptDetails] = useState([]);
  const [navVisible, showNavbar] = useState(false);
  const contentRef = useRef(null);

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

  const toggleSidebar = () => {
    showNavbar(!navVisible);
  };

  const handleConvertToPDF = () => {
    const pageContent = contentRef.current;

    if (pageContent) {
      const originalBorderStyles = pageContent.style.border;
      pageContent.style.border = "none";

      const pdf = new jsPDF("p", "mm", "a4");

      // Calculate the width and height of the PDF based on the page content's dimensions
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      html2canvas(pageContent, { scale: 2, scrollY: -window.scrollY }).then(
        (canvas) => {
          const imgData = canvas.toDataURL("image/jpeg", 1.0);

          // Calculate the aspect ratio of the captured image
          const imgAspectRatio = canvas.width / canvas.height;

          // Calculate the dimensions to fit the entire page width and maintain aspect ratio
          const imgWidth = pdfWidth;
          const imgHeight = pdfWidth / imgAspectRatio;

          // Calculate the vertical position to center the image on the page
          const imgY = (pdfHeight - imgHeight) / 2;

          // Add the image to the PDF with correct dimensions and positioning
          pdf.addImage(imgData, "JPEG", 0, imgY, imgWidth, imgHeight);

          // Save the PDF
          pdf.save("receipt.pdf");
        }
      );
    }
  };

  return (
    <>
      <div>
        <Sidebar collapsed={navVisible} handleToggleSidebar={toggleSidebar} />
        <Topbar
          onToggleSidebar={toggleSidebar}
          collapsed={navVisible}
          handleToggleSidebar={toggleSidebar}
        />

        <div
          className={`App ${navVisible ? "content-shift-right" : ""}`}
          style={{ backgroundColor: "#d4d4d4" }}
        >
          <div className={`p-10 ${navVisible ? "ml-0" : "sm:ml-64"}`}>
            <div className="flex justify-center items-center h-screen">
              <div
                className="border rounded p-10 mb-10 bg-white whole-receipt"
                ref={contentRef}
              >
                <div className="header-container">
                  <div className="logo">
                    <img
                      src={BeansLogo}
                      alt="Beans Logo"
                      style={{
                        width: "100px",
                        height: "100px",
                        marginTop: "-20px",
                        marginRight: "20px",
                      }}
                    />
                  </div>
                  <div className="company-info">
                    <p className="company-name">Company Name</p>
                    <p className="company-details">Company Address</p>
                    <p className="company-details">Contact Number:</p>
                  </div>
                </div>
                <div className="receipt-header">OFFICIAL RECEIPT</div>
                <div className="receipt-info-container">
                  <div className="receipt-name">Customer Name: {customerId}</div>
                  <div className="receipt-date">Date: December 2, 2020</div>
                </div>
                <div className="receipt-address">Address:</div>
                <div className="receipt-table-container">
                <table className="receipt-table">
                  <thead>
                    <tr>
                      <th className="qty">Qty</th>
                      <th className="unit">Unit</th>
                      <th className="item">Item</th>
                      <th className="price">U/Price</th>
                      <th className="amount">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Add table rows with data here */}
                    <tr>
                      <td className="qty">1</td>
                      <td className="unit">Kg</td>
                      <td className="item">Beans</td>
                      <td className="price">5.00</td>
                      <td className="amount">5.00</td>
                    </tr>
                  </tbody>
                </table>
                </div>
                <div className="receipt-table-container">
                  <table className="receipt-table-low">
                    <tbody>
                      <tr>
                        <td className="description">Sub Total</td>
                        <td className="amount">25.00</td>
                      </tr>
                      <tr>
                        <td className="description">VAT 12%</td>
                        <td className="amount">25.00</td>
                      </tr>
                      <tr>
                        <td className="description">PWD/SC Discount</td>
                        <td className="amount">25.00</td>
                      </tr>
                      <tr>
                        <td className="description">Total Amount</td>
                        <td className="amount">25.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="receipt-assisted">
                  ASSISTED BY: Name sa admin or sorter
                </div>
              </div>
            </div>
            {/* Convert button */}
            <div style={{ textAlign: "center", marginTop: "-70px" }}>
              <button className="btn" onClick={handleConvertToPDF}>
                Convert to PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Receipt;
