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

const Receipt = ({ toggleSidebar }) => {
  const { customerId } = useParams();
  const [receiptDetails, setReceiptDetails] = useState([]);
  const [navVisible, setNavVisible] = useState(false);
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

  const handleToggleSidebar = () => {
    setNavVisible(!navVisible);
    toggleSidebar();
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
            <div className="flex justify-center items-center h-screen">
              <div
                className="border rounded p-10 mb-10 bg-white whole-receipt"
                style={{ width: "450px", height: "600px" }}
                ref={contentRef}
              >
                <div className="flex flex-row text-black font-bold">
                  <div className="printable-content">
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

                  <div>
                    {/* HEADER TEXT */}
                    <div className="header-text">
                      <p className="company-name">Company Name</p>
                      <p className="company-address">Company Address</p>
                      <p className="contact-number">Contact Number:</p>
                    </div>

                    {/* RECEIPT HEADER */}
                    <h1 className="receipt-header">OFFICIAL RECEIPT</h1>

                    {/* RECEIPT NAME AND DATE */}
                    <div className="flex flex-row">
                      <h2 className="receipt-name">
                        Customer Name: {customerId}
                      </h2>
                      <h2 className="receipt-date">Date: December 2, 2020</h2>
                    </div>

                    {/* address */}
                    <h2 className="receipt-address">Address:</h2>
                    <div className="receipt-table-container">
                      <table className="receipt-table">
                        <thead>
                          <tr>
                            <th>Qty</th>
                            <th>Unit</th>
                            <th>Item</th>
                            <th>U/Price</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Add table rows with data here */}
                          <tr>
                            <td>1</td>
                            <td>Kg</td>
                            <td>Beans</td>
                            <td>5.00</td>
                            <td>5.00</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>lbs</td>
                            <td>Coffee</td>
                            <td>10.00</td>
                            <td>20.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="receipt-table-container">
                      <table className="receipt-table-low">
                        <tbody>
                          <tr>
                            <td>Sub Total </td>
                            <td>25.00</td>
                          </tr>
                          <tr>
                            <td>VAT 12% </td>
                            <td>25.00</td>
                          </tr>
                          <tr>
                            <td>PWD/SC Discount </td>
                            <td>25.00</td>
                          </tr>
                          <tr>
                            <td>Total Amount </td>
                            <td>25.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <h2 className="receipt-address">
                      ASSISTED BY: Name sa admin or sorter
                    </h2>
                  </div>
                </div>
              </div>
            </div>
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
