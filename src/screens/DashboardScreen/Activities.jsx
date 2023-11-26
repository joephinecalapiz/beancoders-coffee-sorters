/** @format */

import React, { useState, useEffect } from "react"; // Import useState
import axios from "axios";
import api_endpoint from "../../config";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'

const Activities = () => {
  const token = useSelector(state => state.auth.token);
  const user_id = useSelector(state => state.auth.user_id);
  const navigate = useNavigate();
  const [allHistory, setAllHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [historyError, setHistoryError] = useState(false);

  useEffect(() => {
    axios
      .get(api_endpoint + "/fetch-histories/" + user_id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const data = response.data;
        // Get the current date in the format YYYY-MM-DD
        const today = new Date().toISOString().split("T")[0];
        // Filter data to include only records created today
        const filteredData = data.history
          .filter((record) => record.created_at.split("T")[0] === today)
          .slice(0, 5); // Limit to the first 5 records

        if (filteredData.length === 0) {
          setHistoryError(true);
          setIsLoading(false);
        } else {
          sessionStorage.setItem(
            "todayactivityData",
            JSON.stringify(filteredData)
          );
          setAllHistory(filteredData);
          setIsLoading(false); // Data fetching is complete
        }
      })
      .catch((error) => {
        // Assuming 'error' should be used instead of 'err'
        if (error.response && error.response.data.status === 'No Activities Found') {
          setHistoryError(true);
        } else {
          // Handle other errors here
          console.error("Error fetching data:", error);
        }
      });
  }, []);


  useEffect(() => {
    const cachedCustomerData = sessionStorage.getItem("todayactivityData");
    if (cachedCustomerData) {
      setAllHistory(JSON.parse(cachedCustomerData));
      setHistoryError(false)
    }
    if (allHistory == []){
      setHistoryError(true)
    }
  }, []);

  return (
    <div className="shadow overflow-hidden overflow-x-auto border-b border-gray-200 sm:rounded-lg">
      <div className="max-h-[420px] overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200 customers-table poppins-font ">
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
          <tbody className="bg-white dark:text-textDesc dark:bg-container divide-y divide-gray-200 custom-table">
            {allHistory.map((historyItem) => (
              <tr key={historyItem.id} className="hover:bg-lightBrown">
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
                    }}
                    className="text-primary dark:text-secondary underline focus:outline-none"
                  >
                    Receipt
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          {historyError && (
            <p className="items-center justify-center text-center text-primary dark:text-textTitle">No recent activities today!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Activities;
