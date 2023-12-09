/** @format */

import React, { useState, useEffect } from "react"; // Import useState
import axios from "axios";
import api_endpoint from "../../config";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'

const YesterdayAct = () => {
  const token = useSelector(state => state.auth.token);
  const user_id = useSelector(state => state.auth.user_id);
  const navigate = useNavigate();
  const [beanCounts, setBeanCounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [historyError, setHistoryError] = useState(false);

  useEffect(() => {
    axios
      .get(api_endpoint + "/count", {
      })
      .then((response) => {
        const data = response.data;
        // Get yesterday's date by subtracting one day from the current date
        // const beancounts = new Date().toISOString().split("T")[0];
        const beancounts = data.allBeans;
        const sorted = beancounts.sort((a, b) => b.id - a.id);
        // Filter data to include only records created today
        // const filteredData = sorted
        //   .filter((record) => record.created_at.split("T")[0])
        //   .slice(0, 5); // Limit to the first 5 records

          if (sorted.length === 0) {
            setHistoryError(true);
            setIsLoading(false);
          } else {
            sessionStorage.setItem(
              "beanCount",
              JSON.stringify(sorted)
            );
            setBeanCounts(sorted);
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
    const cachedCustomerData = sessionStorage.getItem("beanCount");
    if (cachedCustomerData) {
      setBeanCounts(JSON.parse(cachedCustomerData));
    }
  }, []);

  return (
    <div className="mt-10 shadow overflow-hidden overflow-x-auto border-b border-gray-200 sm:rounded-lg">
      <div className="max-h-[325px] overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200 customers-table poppins-font items-center">
          <thead>
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
              >
                Beancounts
              </th>
              <th
                scope="col"
                className="px-6 py-3  text-center  text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
              >
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center   text-xs font-medium text-gray-500 uppercase tracking-wider table-header poppins-font"
              ></th>
            </tr>
          </thead>
          <tbody className="bg-white dark:text-textDesc dark:bg-container divide-y divide-gray-200 custom-table">
            {beanCounts.map((beanItems, index) => (
              <tr key={beanItems.id} className="hover:bg-lightBrown hover:text-textTitle">
                <td className="poppins-font text-center">
                  {beanItems.bad} pieces
                </td>
                <td className="poppins-font text-center">
                  Bad
                </td>
                <td className="poppins-font text-center">
                   {/* {new Date(beanItems.updated_at).toLocaleDateString()} */}
                  {new Date(beanItems.updated_at).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    // second: 'numeric'
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          {historyError && (
            <p className="items-center justify-center text-center text-primary dark:text-textTitle">No recent activities yesterday!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default YesterdayAct;
