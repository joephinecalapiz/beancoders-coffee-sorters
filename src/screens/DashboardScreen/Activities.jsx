/** @format */

import React, { useState, useEffect } from "react"; // Import useState
import "../.././css/Sidebar.css";
import axios from "axios";
import api_endpoint from "../../config";
import { useNavigate, useParams } from "react-router-dom";

const Activities = () => {
  const navigate = useNavigate();
  const { customerName, customerId } = useParams();
  const [allHistory, setAllHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");
    // const customerId = sessionStorage.getItem("customerId");

    axios
      .get(api_endpoint + "/fetch-histories/" + user_id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const data = response.data;
        sessionStorage.setItem("activityData", JSON.stringify(data.history));
        setAllHistory(data.history);
        setIsLoading(false); // Data fetching is complete
      });
  }, []);

  useEffect(() => {
    const cachedCustomerData = sessionStorage.getItem("activityData");
    if (cachedCustomerData) {
      setAllHistory(JSON.parse(cachedCustomerData));
    }
  }, []);

  return (
    <div className="shadow overflow-hidden overflow-x-auto border-b border-gray-200 sm:rounded-lg">
      <div className="max-h-[450px] overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200 customers-table">
          <thead>
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-start  text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
              >
                Today
              </th>
              <th
                scope="col"
                className="px-6 py-3  text-center  text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
              ></th>
              <th
                scope="col"
                className="px-6 py-3 text-center   text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
              ></th>
              <th
                scope="col"
                className="px-6 py-3 text-center  text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
              ></th>
              <th
                scope="col"
                className="px-6 py-3 text-center  text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
              ></th>
            </tr>
          </thead>
          <tbody className="bg-white dark:text-textTitle dark:bg-container divide-y divide-gray-200 custom-table">
            {allHistory.map((historyItem) => (
              <tr key={historyItem.id}>
                <td className="poppins-font text-center">
                  {new Date(historyItem.date).toLocaleDateString()}
                </td>
                <td className="poppins-font text-center">
                  {historyItem.customerName}
                </td>
                <td className="poppins-font text-center">
                  {historyItem.kiloOfBeans} kilo
                </td>
                <td className="poppins-font text-center">
                  {historyItem.status}
                </td>
                <td className="poppins-font">
                  <button
                    onClick={() => {
                      navigate(`/status/receipt/${historyItem.id}`);
                      // navigate(`/customerstatus/${sorted.customerName}`);
                    }}
                    className="see-more-button focus:outline-none"
                  >
                    Receipt
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Activities;
