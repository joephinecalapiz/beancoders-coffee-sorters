/** @format */

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import api_endpoint from "../../config";
import Sidebar from "../../component/Sidebar";
import Topbar from "../../component/Topbar";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import BeansLogo from "../../assets/beansLogo.png"; // Import the image here
import { useSelector } from 'react-redux'

const Receipt = () => {
  const token = useSelector(state => state.auth.token);
  const user_id = useSelector(state => state.auth.user_id);
  const { customerId } = useParams();
  const [receiptDetails, setReceiptDetails] = useState([]);
  const [navVisible, showNavbar] = useState(true);
  const contentRef = useRef(null);
  const [compInfo, setCompInfo] = useState("");
  const [customerInfoReceipt, setcustomerInfoReceipt] = useState("");
  const [pricesAndDiscounts, setPricesAndDiscounts] = useState("");
  useEffect(() => {
    fetchReceiptDetails();
    fetchCompanyInfo();
  }, []);

  const fetchCompanyInfo = async () => {
    try {
      const response = await fetch(api_endpoint + "/fetch-info/" + user_id, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch company details data");
      }
      const compData = await response.json();
      setCompInfo(compData.details);
    } catch (error) {
      console.error("Error fetching company details data:", error);
    }
  };

  const fetchReceiptDetails = async () => {
    try {
      const response = await fetch(
        `${api_endpoint}/customer-receipt/${customerId}/${user_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch receipt details");
      }
      const data = await response.json();

      setReceiptDetails(data.customerStatus);
      setcustomerInfoReceipt(data.customerInfo);
      setPricesAndDiscounts(data.total);
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
          const date = new Date(receiptDetails.created_at);
          const options = { year: "numeric", month: "long", day: "numeric" };
          const formattedDate = date.toLocaleString("en-US", options);
          pdf.text(`Date:${formattedDate}`, 10, 10);
          // Save the PDF
          pdf.save("receipt.pdf");
        }
      );
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleString("en-US", options);
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
        <div className={`p-4 mt-10 ${navVisible ? "ml-20" : "sm:ml-44"}`}>
          <div className="md:ml-32 md:grid md:tablet:grid-cols-3 tablet:grid-cols-2 gap-20 mt-10 ">
            <div className="flex self-center">
              <div className="white-box">
                <div className="white-box-greeting">
                  Hi,{" "}
                  <span className="bold-customer-id">
                    {receiptDetails.customerName}
                  </span>
                  !
                </div>
                <div className="white-box-text">
                  Would you like to save this as a PDF file?
                </div>
                <button
                  className="btn white-box-button custom-button"
                  onClick={handleConvertToPDF}
                >
                  Click here
                </button>
              </div>
            </div>

            <div
              className="md:flex flex-col sm:flex-row border rounded p-2 mt-4 bg-white whole-receipt"
              ref={contentRef}
            >
              <div className="">
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
                    <p className="company-name">{compInfo.companyName}</p>
                    <p className="company-details">
                      Address: {compInfo.companyLocation}
                    </p>
                    <p className="company-details">
                      Contact Number: {compInfo.companyNumber}
                    </p>
                  </div>
                </div>
                <div className="receipt-header">OFFICIAL RECEIPT</div>
                <div className="receipt-info-container">
                  <div className="receipt-name">
                    Customer Name: {receiptDetails.customerName}
                  </div>
                  <div className="receipt-date">
                    Date: {formatDate(receiptDetails.created_at)}
                  </div>
                </div>
                <div className="receipt-address">
                  Address: {customerInfoReceipt.address}
                </div>
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
                        <td className="qty">{receiptDetails.kiloOfBeans}</td>
                        <td className="unit">Kg</td>
                        <td className="item">Arabica Coffee Beans</td>
                        <td className="price">
                          &#8369; {pricesAndDiscounts.unitPrice}.00
                        </td>
                        <td className="amount">
                          &#8369; {pricesAndDiscounts.amount}.00
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="receipt-table-container mt-2 mb-2">
                  <table className="receipt-table-low">
                    <tbody>
                      <tr>
                        <td className="description">Sub Total</td>
                        <td className="amount">
                          &#8369; {pricesAndDiscounts.subTotal}
                        </td>
                      </tr>
                      <tr>
                        <td className="description">VAT 12%</td>
                        <td className="amount">
                          &#8369; {pricesAndDiscounts.vat}0
                        </td>
                      </tr>
                      <tr>
                        <td className="description">PWD/SC Discount</td>
                        <td className="amount">&#8369; 25.00</td>
                      </tr>
                      <tr>
                        <td className="description">Total Amount</td>
                        <td className="amount">
                          &#8369; {pricesAndDiscounts.amount}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="receipt-assisted items-end mt-20">
                  ASSISTED BY: {receiptDetails.sorterName}
                </div>
              </div>
            </div>
            {/* White box for PDF options */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Receipt;
