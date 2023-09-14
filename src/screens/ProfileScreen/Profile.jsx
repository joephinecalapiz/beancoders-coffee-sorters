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

  useEffect(() => {
    fetchUserInfo(); // Fetch user info when the component mounts
  }, []);

  // Update profileData when userInfo changes
  useEffect(() => {
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      name: userInfo.name,
      email: userInfo.email,
    }));
  }, [userInfo]);

  // Update editableContent when userInfo want to edit
  useEffect(() => {
    setEditableContent((prevProfileData) => ({
      ...prevProfileData,
      name: userInfo.name,
      email: userInfo.email,
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

  const [profileData, setProfileData] = useState({
    profilePicture: "assets/beansLogo.png",
    name: userInfo.name,
    email: userInfo.email,
    companyPhoneNumber: "9518052760",
    address: "123 Main St, City",
    companyName: "ABC Corporation",
  });

  const [editableContent, setEditableContent] = useState({
    name: profileData.name,
    email: profileData.email,
    companyName: profileData.companyName,
    companyPhoneNumber: profileData.companyPhoneNumber,
    address: profileData.address,
  });

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
      companyPhoneNumber: editableContent.companyPhoneNumber,
      address: editableContent.address,
    });
  };

  const handleCancelClick = () => {
    setEditing(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditableContent((prevContent) => ({
      ...prevContent,
      [name]: value,
      [email]: value,
      [companyName]: value,
      [companyPhoneNumber]: value,
      [address]: value,
    }));
  };

  const handleProfilePictureClick = () => {
    document.getElementById("profilePictureInput").click();
  };

  return (
    <>
      <div class="max-w-8xl mx-auto pl-16">
        <Sidebar collapsed={navVisible} handleToggleSidebar={toggleSidebar} />
        <Topbar onToggleSidebar={toggleSidebar} />
        <div
          className={`Profile  ${navVisible ? "profile-shift-right" : ""}`}
          //  style={{ backgroundColor: '#d4d4d4' }}
        >
          <div className={`p-5 pl-12 ${navVisible ? "ml-0" : "sm:ml-64"}`}>
            <div className="p-0.5 mb-16 w-full mt-6 relative">
              <h1 className="text-black bg-white mt-10 font-bold text-base p-3 rounded-lg shadow-xl">
                Profile
              </h1>
            </div>
            <div className={`p-5 ${navVisible ? "" : "ml-36"}`}>
              <div class="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden lg:max-w-full">
                <div class="flex flex-col items-center justify-center ">
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
                  <label className="admin-name poppins-font justify-center">
                    {profileData.name}
                  </label>
                  <label className="admin-label poppins-font mb-5 justify-center">
                    Admin
                  </label>
                </div>
              </div>
              <div class="max-w-2xl mt-5 mx-auto overflow-hidden lg:max-w-full">
                <div class="grid grid-cols-1 sm:grid-cols-3 grid-rows-1">
                  <div class="flex items-center justify-center sm:justify-self-start col-span-2">
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
                  <div class="flex items-center justify-center sm:justify-self-end">
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
              <div class="max-w-2xl mt-5 mx-auto overflow-hidden lg:max-w-full">
                <div class="grid grid-cols-1 sm:grid-cols-3 grid-rows-1 gap-2">
                  <div class="max-w-2xl sm:justify-self-start bg-white rounded-xl shadow-lg overflow-hidden lg:max-w-full">
                    <div class="mobile:px-5 mt-5">
                      <div>
                        <div class="px-4 sm:px-0 align-center justify-center">
                          <h3 class="text-base font-semibold leading-7 text-gray-900">
                            Admin Information
                          </h3>
                          <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                            Admin details.
                          </p>
                        </div>
                        <div class="mt-6 border-t border-gray-100">
                          <dl class="divide-y divide-gray-100">
                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt class="text-sm font-semibold leading-6 text-gray-900">
                                Full name
                              </dt>
                              {isEditing ? (
                                <div class="flex sm:col-span-2 sm:mt-0 justify-self-end rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                  <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    autocomplete="name"
                                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder={profileData.name}
                                  />
                                </div>
                              ) : (
                                <dd class="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 justify-self-end">
                                  {profileData.name}
                                </dd>
                              )}
                            </div>
                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt class="text-sm font-semibold leading-6 text-gray-900">
                                Role
                              </dt>
                              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 justify-self-end">
                                Admin
                              </dd>
                            </div>
                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt class="text-sm font-semibold leading-6 text-gray-900">
                                Email address
                              </dt>
                              {isEditing ? (
                                <div class="flex sm:col-span-2 sm:mt-0 justify-self-end rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                  <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    autocomplete="email"
                                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder={profileData.email}
                                  />
                                </div>
                              ) : (
                                <dd class="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 justify-self-end">
                                  {profileData.email}
                                </dd>
                              )}
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="max-w-2xl:mt-5 col-span-2 max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden lg:max-w-full">
                    <div class="mobile:px-5 mt-5">
                      <div>
                        <div class="px-4 sm:px-0 align-center justify-center">
                          <h3 class="text-base font-semibold leading-7 text-gray-900">
                            Company Information
                          </h3>
                          <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                            Company details.
                          </p>
                        </div>
                        <div class="mt-6 border-t border-gray-100">
                          <dl class="divide-y divide-gray-100">
                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt class="text-sm font-semibold leading-6 text-gray-900 align-center self-center">
                                Company Name
                              </dt>
                              {isEditing ? (
                                <div class="flex sm:col-span-2 sm:mt-0 justify-self-end rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                  <input
                                    type="email"
                                    name="companyName"
                                    id="companyName"
                                    autocomplete="companyName"
                                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder={profileData.companyName}
                                  />
                                </div>
                              ) : (
                                <dd class="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 justify-self-end">
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
                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt class="text-sm font-semibold leading-6 text-gray-900">
                                Phone Number
                              </dt>
                              {isEditing ? (
                                <div class="flex sm:col-span-2 sm:mt-0 justify-self-end rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                  <input
                                    type="number"
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    autocomplete="phoneNumber"
                                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder={profileData.companyPhoneNumber}
                                  />
                                </div>
                              ) : (
                                <dd class="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 justify-self-end">
                                  {profileData.companyPhoneNumber}
                                </dd>
                              )}
                            </div>
                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt class="text-sm font-semibold leading-6 text-gray-900">
                                Address
                              </dt>
                              {isEditing ? (
                                <div class="flex sm:col-span-2 sm:mt-0 justify-self-end rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                  <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    autocomplete="address"
                                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder={profileData.address}
                                  />
                                </div>
                              ) : (
                                <dd class="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 justify-self-end">
                                  {profileData.address}
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
