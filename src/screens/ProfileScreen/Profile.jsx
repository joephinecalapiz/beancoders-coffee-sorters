/** @format */

import React, { useState, useEffect } from "react";
import Topbar from "../../component/Topbar";
import Sidebar from "../../component/Sidebar";
import "../.././css/Sidebar.css";
import "../.././css/dashboard.css";
import "../.././css/profile.css";
import beansLogo from "../../assets/beansLogo.png"; // Import the image
import api_endpoint from "../../config";

const Profile = () => {
  const [navVisible, showNavbar] = useState(true);
  const [isEditing, setEditing] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const [compInfo, setCompInfo] = useState("");
  const [profileData, setProfileData] = useState({
    profilePicture: "assets/beansLogo.png",
    name: userInfo.name,
    email: userInfo.email,
    companyPhoneNumber: compInfo.companyNumber,
    companyLocation: compInfo.companyLocation,
    companyName: compInfo.companyName,
  });

  const [editableContent, setEditableContent] = useState({
    name: profileData.name,
    email: profileData.email,
    companyName: profileData.companyName,
    companyNumber: profileData.companyNumber,
    companyLocation: profileData.companyLocation,
  });

  useEffect(() => {
    fetchUserInfo(); // Fetch user info when the component mounts
    fetchCompanyInfo();
  }, []);

  // Update profileData when userInfo changes
  useEffect(() => {
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      name: userInfo.name,
      email: userInfo.email,
      companyNumber: compInfo.companyNumber,
      companyLocation: compInfo.companyLocation,
      companyName: compInfo.companyName,
    }));
  }, [userInfo]);

  // Update editableContent when userInfo want to edit
  useEffect(() => {
    setEditableContent((prevProfileData) => ({
      ...prevProfileData,
      name: userInfo.name,
      email: userInfo.email,
      companyNumber: compInfo.companyNumber,
      companyLocation: compInfo.companyLocation,
      companyName: compInfo.companyName,
    }));
  }, [userInfo]);

  const fetchUserInfo = async () => {
    let token = localStorage.getItem("token");
    try {
      const response = await fetch(api_endpoint + "/user", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Erro("Failed to fetch user data");
      }
      const data = await response.json();
      setUserInfo(data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchCompanyInfo = async () => {
    try {
      let token = localStorage.getItem("token");
      let user_id = localStorage.getItem("user_id");
      const response = await fetch(api_endpoint + "/fetch-info/" + user_id, {
        headers: {
          Authorization: "Bearer " + token,
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

  const updateCompanyDetails = async (newDetails) => {
    try {
      const token = localStorage.getItem("token");
      const user_id = localStorage.getItem("user_id");
      const response = await fetch(api_endpoint + `/edit-info/${user_id}`, {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDetails),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update company details");
      }
  
      // Handle success response
      console.log("Company details updated successfully");
    } catch (error) {
      console.error("Error updating company details:", error);
    }
  };
  

  const toggleSidebar = () => {
    showNavbar(!navVisible);
  };

  // useEffect(() => {
  //   document.title = "Profile";

  //   if (navVisible) {
  //     document.body.style.overflow = "hidden"; // Disable scrolling
  //   } else {
  //     document.body.style.overflow = "auto"; // Enable scrolling
  //   }

  //   return () => {
  //     // Clean up the effect when the component unmounts
  //     document.body.style.overflow = "auto"; // Enable scrolling
  //   };
  // }, [navVisible]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    setEditing(false);
    setProfileData({
      ...profileData,
      name: editableContent.name,
      email: editableContent.email,
      companyName: editableContent.companyName,
      companyNumber: editableContent.companyNumber,
      companyLocation: editableContent.companyLocation,
    });
    // update the details on the server
  updateCompanyDetails(editableContent);
  };

  const handleCancelClick = () => {
    setEditing(false);
    // Reset the editableContent to match the current profileData
    setEditableContent({
      name: profileData.name,
      email: profileData.email,
      companyName: profileData.companyName,
      companyNumber: profileData.companyNumber,
      companyLocation: profileData.companyLocation,
    });
  };
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditableContent((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
  };
  

  const handleProfilePictureClick = () => {
    document.getElementById("profilePictureInput").click();
  };

  return (
    <>
      <div className="max-w-8xl mx-auto pl-16">
        <Sidebar collapsed={navVisible} handleToggleSidebar={toggleSidebar} />
        <Topbar onToggleSidebar={toggleSidebar} collapsed={navVisible} handleToggleSidebar={toggleSidebar} />
        <div
          className={`Profile  ${navVisible ? "profile-shift-right" : ""}`}
        //  style={{ backgroundColor: '#d4d4d4' }}
        >
          <div className={`p-4 ${navVisible ? "ml-0" : "sm:ml-48"}`}>
            <div className="p-0.5 mb-5 w-full mt-7 relative">
              <h1 className="text-black bg-white dark:text-textTitle dark:bg-container mt-10 font-bold text-base p-3 rounded-lg shadow-xl">
                Profile
              </h1>
            </div>
            <div className={`p-4 ${navVisible ? "ml-0" : ""}`}>
              <div className="max-w-2xl bg-white dark:bg-container rounded-xl shadow-lg overflow-hidden lg:max-w-full">
                <div className="flex flex-col items-center justify-center ">
                  <div className="top relative circular-profile object-none object-top overflow-visible">
                    <label
                      htmlFor="profilePicture"
                      className="profile-picture-label"
                    >
                      <img
                        src={beansLogo}
                        alt="Beans Logo"
                        className="admin-picture"
                        onClick={handleProfilePictureClick}
                      />
                    </label>
                    <input
                      type="file"
                      id="profilePictureInput"
                      name="profilePicture"
                      onChange={handleInputChange}
                      style={{ display: "none" }}
                    />
                  </div>
                  <label className="admin-name text-black dark:text-textTitle poppins-font justify-center">
                    {profileData.name}
                  </label>
                  <label className="admin-label text-black dark:text-textDesc poppins-font mb-5 justify-center">
                    Admin
                  </label>
                </div>
              </div>
              <div className="max-w-2xl mt-5 overflow-hidden lg:max-w-full">
                <div className="grid grid-cols-1 sm:grid-cols-3 grid-rows-1">
                  <div className="flex items-center justify-center sm:justify-self-start col-span-2">
                    <h1
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        fontFamily: "'Poppins', sans-serif",
                      }}
                      className="text-black"
                    >
                      {/* User Information */}
                    </h1>
                  </div>
                  <div className="flex items-center justify-center sm:justify-self-end">
                    {isEditing ? (
                      <div className="profile-edit-buttons">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full mr-2"
                          onClick={handleSaveClick}
                        >
                          Save
                        </button>
                        <button
                          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                          onClick={handleCancelClick}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full"
                        onClick={handleEditClick}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="max-w-2xl mt-5 overflow-hidden lg:max-w-full">
                <div className="grid grid-cols-1 sm:grid-cols-3 grid-rows-1 gap-2">
                  <div className="max-w-2xl sm:justify-self-start bg-white dark:bg-container rounded-xl shadow-lg overflow-hidden lg:max-w-full">
                    <div className="mobile:px-5 mt-5">
                      <div>
                        <div className="px-4 sm:px-0 align-center justify-center">
                          <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-textTitle">
                            Admin Information
                          </h3>
                          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500 dark:text-textDesc">
                            Admin details.
                          </p>
                        </div>
                        <div className="mt-6 border-t border-gray-100">
                          <dl className="divide-y divide-gray-100">
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-semibold leading-6 text-gray-900 dark:text-textTitle">
                                Full name
                              </dt>
                              {isEditing ? (
                                <div className="flex sm:col-span-2 sm:mt-0 justify-self-end rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                  <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    autoComplete="name"
                                    className="block flex-1 border-0 dark:text-textDesc bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder={profileData.name}
                                  />
                                </div>
                              ) : (
                                <dd className="mt-1 text-sm dark:text-textDesc leading-6 sm:col-span-2 sm:mt-0 justify-self-end">
                                  {profileData.name}
                                </dd>
                              )}
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-semibold leading-6 text-gray-900 dark:text-textTitle">
                                Role
                              </dt>
                              <dd className="mt-1 text-sm leading-6 text-gray-900 dark:text-textDesc sm:col-span-2 sm:mt-0 justify-self-end">
                                Admin
                              </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-semibold leading-6 text-gray-900 dark:text-textTitle">
                                Email address
                              </dt>
                              {isEditing ? (
                                <div className="flex sm:col-span-2 sm:mt-0 justify-self-end rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                  <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    autoComplete="email"
                                    className="block flex-1 border-0 dark:text-textDesc bg-transparent py-1.5 pl-1 text-gray-900  placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder={profileData.email}
                                  />
                                </div>
                              ) : (
                                <dd className="mt-1 text-sm leading-6 sm:col-span-2 dark:text-textDesc sm:mt-0 justify-self-end">
                                  {profileData.email}
                                </dd>
                              )}
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="max-w-2xl:mt-5 col-span-2 max-w-2xl bg-white dark:bg-container rounded-xl shadow-lg overflow-hidden lg:max-w-full">
                    <div className="mobile:px-5 mt-5">
                      <div>
                        <div className="px-4 sm:px-0 align-center justify-center">
                          <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-textTitle">
                            Company Information
                          </h3>
                          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500 dark:text-textDesc">
                            Company details.
                          </p>
                        </div>
                        <div className="mt-6 border-t border-gray-100">
                          <dl className="divide-y divide-gray-100">
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-semibold leading-6 text-gray-900 align-center self-center dark:text-textTitle">
                                Company Name
                              </dt>
                              {isEditing ? (
                                <div className="flex sm:col-span-2 sm:mt-0 justify-self-end rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                  <input
                                    type="name"
                                    name="companyName"
                                    id="companyName"
                                    autoComplete="companyName"
                                    value={editableContent.companyName}
                                    onChange={handleInputChange}
                                    className="block flex-1 border-0 bg-transparent dark:text-textDesc py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder={profileData.companyName}
                                  />
                                </div>
                              ) : (
                                <dd className="mt-1 text-sm leading-6 dark:text-textDesc sm:col-span-2 sm:mt-0 justify-self-end">
                                  {profileData.companyName}
                                </dd>
                              )}
                              {/* {isEditing ? (
                              <input
                                type="text"
                                name="address"
                                value={editableContent.companyName}
                                onChange={handleInputChange}
                                className="input-field outline-gray-500 mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 justify-self-end "
                              />

                            ) : (
                              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 justify-self-end">{profileData.companyName}</dd>
                            )} */}
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-semibold leading-6 text-gray-900 dark:text-textTitle">
                                Phone Number
                              </dt>
                              {isEditing ? (
                                <div className="flex sm:col-span-2 sm:mt-0 justify-self-end rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                  <input
                                    type="number"
                                    name="companyNumber"
                                    id="phoneNumber"
                                    autoComplete="phoneNumber"
                                    value={editableContent.companyNumber}
                                    onChange={handleInputChange}
                                    className="block flex-1 border-0 bg-transparent dark:text-textDesc py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder={profileData.companyNumber}
                                  />
                                </div>
                              ) : (
                                <dd className="mt-1 text-sm leading-6 sm:col-span-2 dark:text-textDesc sm:mt-0 justify-self-end">
                                  {profileData.companyNumber}
                                </dd>
                              )}
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-semibold leading-6 text-gray-900 dark:text-textTitle">
                                Address
                              </dt>
                              {isEditing ? (
                                <div className="flex sm:col-span-2 sm:mt-0 justify-self-end rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                  <input
                                    type="text"
                                    name="companyLocation"
                                    id="address"
                                    autoComplete="address"
                                    value={editableContent.companyLocation}
                                    onChange={handleInputChange}
                                    className="block flex-1 border-0 bg-transparent dark:text-textDesc py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder={profileData.companyLocation}
                                  />
                                </div>
                              ) : (
                                <dd className="mt-1 text-sm leading-6 sm:col-span-2 dark:text-textDesc sm:mt-0 justify-self-end">
                                  {profileData.companyLocation}
                                </dd>
                              )}
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>
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

export default Profile;
