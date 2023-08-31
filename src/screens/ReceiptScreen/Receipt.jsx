/** @format */

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import api_endpoint from "../../config";
import Sidebar from "../../component/Sidebar";
import Topbar from "../../component/Topbar";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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
    const printableContent =
      contentRef.current.querySelector(".printable-content");

    if (printableContent) {
      html2canvas(printableContent).then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        // Add a left margin of 10mm (adjust the value as needed)
        const leftMargin = 10;

        pdf.addImage(
          imgData,
          "JPEG",
          leftMargin,
          0,
          pdfWidth - leftMargin,
          pdfHeight
        );
        pdf.save("receipt.pdf");
      });
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
                className="border rounded p-10 mb-10 bg-white"
                style={{ width: "600px", height: "600px" }}
                ref={contentRef}
              >
                <div className="flex flex-col text-black font-bold">
                  <button className="btn" onClick={handleConvertToPDF}>
                    Convert to PDF
                  </button>
                  <div className="printable-content mb-8">
                    <h1 className="text-black font-bold">Receipt</h1>
                    <h2 className="mb-2">Customer Name: {customerId}</h2>
                    <h2 className="mb-2">Date:</h2>
                    <h2 className="mb-2">Kilo beans:</h2>
                    <h2 className="mb-2">Amount:</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Receipt;
