/** @format */

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import api_endpoint from "../../config";
import "react-datepicker/dist/react-datepicker.css";
import UpdateCompanyInfo from "../ModalScreen/UpdateCompanyInfo";
import Activities from "./Activities";
import YesterdayAct from "./YesterdayAct";
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserDetails } from "../../../redux/services/user/userActions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const user_id = useSelector(state => state.auth.user_id);
  const [beanCount, setBeanCount] = useState("");
  const [goodCount, setGoodCount] = useState("");
  const [beanKilo, setBeanKilo] = useState("");
  const [machineiD, setMachineId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userInfo = useSelector(state => state.user.userInfo);

  useEffect(() => {
    dispatch(fetchUserDetails({ token }));
  }, [dispatch]);

  useEffect(() => {
    axios.get(`${api_endpoint}/count/${userInfo.formattedId}/${user_id}`).then((response) => {
      console.log(response.data.badBeans)
      const bean = response.data.badBeans;
      const good = response.data.goodBeans;
      const totalBeans = response.data.totalKg;
      setBeanCount(bean);
      setGoodCount(good);
      setBeanKilo(totalBeans);
    });
  }, []);

  //console.log(goodCount)
  //console.log(beanKilo)

  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  return (
    <>
      <div className="header">
        <div className="md:pl-5 md:pr-5 pr-2 pl-2 pt-0.5 mb-2">
          <h1 className="text-black poppins-font font-bold bg-white dark:text-textTitle dark:bg-container mt-5 text-base p-3 rounded-lg shadow-xl">
            Dashboard
          </h1>
        </div>
      </div>
      <div
        className="p-5"
        style={{
          transition: "margin-left 0.3s ease",
        }}
      >
        <div className="grid grid-cols-1 gap-12 mb-4 ">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-9 ">
            <div className="shadow-xl flex items-center bg-white dark:bg-container justify-center h-28 grid-item">
              <div>
                <h1 className="text-black dark:text-textTitle poppins-font font-medium data-title m-auto ml-5 mr-5">
                  Pieces of Bad Beans
                </h1>
                <h1 className="text-lightBrown dark:text-lightBrown data-size m-auto">
                  {beanCount && beanCount.badBeans !== null
                    ? `${beanCount} pieces`
                    : "0"}
                </h1>
              </div>
            </div>
            <div className="shadow-xl flex items-center bg-white dark:bg-container justify-center h-28 grid-item">
              <div>
                <h1 className="text-black dark:text-textTitle poppins-font font-medium data-title m-auto">
                  Pieces of Good Beans
                </h1>
                <h1 className="text-lightBrown dark:text-lightBrown data-size m-auto">
                  {goodCount && goodCount !== null
                    ? `${goodCount} pieces`
                    : "0"}
                </h1>
              </div>
            </div>
            <div className="shadow-xl flex items-center bg-white dark:bg-container justify-center h-28 grid-item">
              <div>
                <h1 className="text-black dark:text-textTitle poppins-font font-medium data-title m-auto">
                  Total Kilograms
                </h1>
                <h1 className="text-lightBrown dark:text-lightBrown data-size m-auto">
                  {beanKilo && beanKilo !== null
                    ? `${beanKilo} kilograms`
                    : "0"}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="md:pl-5 md:pr-5 pr-2 pl-2 p-5 activities"
        style={{
          transition: "margin-left 0.3s ease",
          marginTop: "-20px",
        }}
      >
        <div>
          {/* <h1 className="text-black poppins-font dark:text-textTitle mt-1 font-bold text-base p-3 rounded-lg shadow-xl">
            Recent Activities
          </h1> */}
          <Activities />
          <YesterdayAct />
        </div>
      </div>
      <UpdateCompanyInfo
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Dashboard;
